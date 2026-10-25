import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkPublishedCv } from '../src/services/site/cvDelivery.js';

const pdf = '%PDF-1.7\n1 0 obj\n<< /Type /Catalog >>\nendobj\n%%EOF\n';
test('admin verifies the PDF body with GET rather than trusting HEAD success', async () => {
  const result = await checkPublishedCv('https://example.com/cv.pdf', { fetchImpl: async (_url, options) => {
    assert.equal(options.method, 'GET');
    return new Response(pdf, { headers: { 'Content-Type': 'application/pdf' } });
  } });
  assert.equal(result.available, true);
});
test('admin rejects HTML success, truncated PDFs, blocked files and network errors', async () => {
  for (const response of [new Response('<html>login</html>'), new Response('%PDF-1.7', { headers: { 'Content-Type': 'application/pdf' } }), new Response('', { status: 401 }), new Response(pdf, { headers: { 'Content-Type': 'text/html' } })]) {
    assert.equal((await checkPublishedCv('https://example.com/cv.pdf', { fetchImpl: async () => response })).available, false);
  }
  assert.equal((await checkPublishedCv('https://example.com/cv.pdf', { fetchImpl: async () => { throw new Error('offline'); } })).available, false);
});
