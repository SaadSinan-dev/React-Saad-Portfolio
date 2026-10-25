import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validatePdf } from '../src/services/site/pdfValidation.js';
import { createHandler } from '../netlify/functions/publish-cv.mjs';

const pdf = Buffer.from('%PDF-1.7\n1 0 obj\n<< /Type /Catalog >>\nendobj\n%%EOF\n');
const env = { VITE_FIREBASE_API_KEY: 'test', VITE_FIREBASE_PROJECT_ID: 'test-project', VITE_CLOUDINARY_CLOUD_NAME: 'test-cloud', CLOUDINARY_API_KEY: 'key', CLOUDINARY_API_SECRET: 'secret' };
const event = (changes = {}) => ({ httpMethod: 'POST', headers: { authorization: 'Bearer test-token' }, body: JSON.stringify({ name: 'Resume.pdf', type: 'application/pdf', base64: pdf.toString('base64'), expectedUrl: 'https://res.cloudinary.com/test-cloud/raw/upload/old.pdf' }), ...changes });

test('PDF validation rejects disguised, empty, oversized and truncated files', () => {
  assert.equal(validatePdf({ name: 'Resume.pdf', type: 'application/pdf', size: pdf.length }, pdf), '');
  for (const file of [{ name: 'x.exe', type: 'application/pdf', size: 50 }, { name: 'x.pdf', type: 'text/html', size: 50 }, { name: 'x.pdf', type: 'application/pdf', size: 0 }, { name: 'x.pdf', type: 'application/pdf', size: 4194305 }]) assert.ok(validatePdf(file, pdf));
  assert.ok(validatePdf({ name: 'x.pdf', type: 'application/pdf', size: 20 }, Buffer.from('<html>not a PDF</html>')));
  assert.ok(validatePdf({ name: 'x.pdf', type: 'application/pdf', size: 10 }, Buffer.from('%PDF-1.7')));
});

function fixture({ role = 'admin', uploadFails = false, deliveryFails = false, deliveryHtml = false, writeFails = false, stale = false, invalidToken = false } = {}) {
  let published = { cvUrl: 'https://res.cloudinary.com/test-cloud/raw/upload/old.pdf', profileImageUrl: 'portrait.jpg' };
  const calls = [];
  const fetchImpl = async (url, options = {}) => {
    calls.push(String(url));
    if (String(url).includes('accounts:lookup')) return Response.json(invalidToken ? {} : { users: [{ localId: 'admin-uid' }] }, { status: invalidToken ? 400 : 200 });
    if (String(url).includes('/users/')) return Response.json({ fields: { role: { stringValue: role } } });
    if (String(url).includes('/site/public') && options.method !== 'PATCH') return Response.json({ fields: { cvUrl: { stringValue: stale ? 'changed.pdf' : published.cvUrl } }, updateTime: '2026-10-23T00:00:00Z' });
    if (String(url).includes('api.cloudinary.com')) {
      assert.equal(options.body.get('type'), 'upload');
      return Response.json(uploadFails ? {} : { secure_url: 'https://res.cloudinary.com/test-cloud/raw/upload/v1/new.pdf', public_id: 'portfolio/cv/new.pdf' }, { status: uploadFails ? 500 : 200 });
    }
    if (String(url).includes('res.cloudinary.com')) return new Response(deliveryFails ? 'blocked' : pdf, { status: deliveryFails ? 401 : 200, headers: { 'Content-Type': deliveryHtml ? 'text/html' : 'application/pdf' } });
    if (options.method === 'PATCH') {
      assert.match(String(url), /currentDocument.updateTime=/);
      assert.deepEqual(new URL(url).searchParams.getAll('updateMask.fieldPaths').sort(), ['cvFilename', 'cvSize', 'cvUpdatedAt', 'cvUrl']);
      if (writeFails) return Response.json({}, { status: 409 });
      const fields = JSON.parse(options.body).fields;
      published = { ...published, cvUrl: fields.cvUrl.stringValue };
      return Response.json({});
    }
    throw new Error(`Unexpected URL ${url}`);
  };
  return { handler: createHandler({ env, fetchImpl }), calls, read: () => published };
}

test('unauthenticated requests never reach storage', async () => {
  const f = fixture();
  assert.equal((await f.handler(event({ headers: {} }))).statusCode, 401);
  assert.equal(f.calls.length, 0);
});
test('unsupported methods and missing server configuration fail safely', async () => {
  const f = fixture();
  assert.equal((await f.handler(event({ httpMethod: 'GET' }))).statusCode, 405);
  assert.equal(f.calls.length, 0);
  assert.equal((await createHandler({ env: {} })(event())).statusCode, 503);
});
test('server enforces the file size even when client validation is bypassed', async () => {
  const f = fixture();
  const bytes = Buffer.alloc(4194305, 32);
  pdf.copy(bytes);
  Buffer.from('%%EOF').copy(bytes, bytes.length - 5);
  const result = await f.handler(event({ body: JSON.stringify({ name: 'large.pdf', type: 'application/pdf', base64: bytes.toString('base64'), expectedUrl: '' }) }));
  assert.equal(result.statusCode, 400);
  assert.ok(!f.calls.some(url => url.includes('cloudinary')));
});
test('invalid tokens and non-admin users cannot publish', async () => {
  for (const options of [{ invalidToken: true }, { role: 'member' }]) {
    const f = fixture(options);
    assert.ok([401, 403].includes((await f.handler(event())).statusCode));
    assert.ok(!f.calls.some(url => url.includes('cloudinary')));
  }
});
test('successful publication stores verified new URL and preserves other settings', async () => {
  const f = fixture();
  assert.equal((await f.handler(event())).statusCode, 200);
  assert.equal(f.read().cvUrl, 'https://res.cloudinary.com/test-cloud/raw/upload/v1/new.pdf');
  assert.equal(f.read().profileImageUrl, 'portrait.jpg');
});
test('storage, delivery, write and concurrent replacement failures preserve published CV', async () => {
  for (const options of [{ uploadFails: true }, { deliveryFails: true }, { deliveryHtml: true }, { writeFails: true }, { stale: true }]) {
    const f = fixture(options);
    assert.ok((await f.handler(event())).statusCode >= 400);
    assert.equal(f.read().cvUrl, 'https://res.cloudinary.com/test-cloud/raw/upload/old.pdf');
  }
});
test('malformed and non-PDF requests never upload', async () => {
  for (const body of ['{', 'null', '[]', JSON.stringify({ name: 'x.pdf', type: 'application/pdf', base64: Buffer.from('not a PDF').toString('base64') })]) {
    const f = fixture();
    assert.equal((await f.handler(event({ body }))).statusCode, 400);
    assert.ok(!f.calls.some(url => url.includes('cloudinary')));
  }
});
