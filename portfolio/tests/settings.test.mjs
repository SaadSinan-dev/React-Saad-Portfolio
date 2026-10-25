import { test } from 'node:test';
import assert from 'node:assert/strict';
import { publicSettings } from '../src/services/site/settingsMapper.js';
import { canReadCv } from '../src/services/site/cvDelivery.js';

test('published CV uses saved HTTPS reference without bundled fallback', () => {
  assert.equal(publicSettings({ cvUrl: 'https://example.com/new.pdf' }).cvUrl, 'https://example.com/new.pdf');
  assert.equal(publicSettings().cvUrl, '');
});
test('rejects executable, insecure and credential-bearing public URLs', () => {
  for (const cvUrl of ['javascript:alert(1)', 'data:text/html,x', 'http://example.com/x.pdf', 'https://user:secret@example.com/x.pdf', '/old.pdf']) assert.equal(publicSettings({ cvUrl }).cvUrl, '');
});
test('public settings excludes administrative data', () => {
  assert.deepEqual(Object.keys(publicSettings({ privateKey: 'do-not-expose', cvFilename: 'Resume.pdf' })), ['profileImageUrl', 'cvUrl', 'cvFilename']);
});

test('public CV rejects blocked storage, HTML errors and network failure', async () => {
  for (const response of [new Response('', { status: 401 }), new Response('<html>error</html>')]) assert.equal(await canReadCv('https://example.com/cv.pdf', { fetchImpl: async () => response }), false);
  assert.equal(await canReadCv('https://example.com/cv.pdf', { fetchImpl: async () => { throw new Error('offline'); } }), false);
  assert.equal(await canReadCv('https://example.com/cv.pdf', { fetchImpl: async () => new Response('%PDF-1.7', { status: 206, headers: { 'Content-Type': 'application/pdf' } }) }), true);
});
