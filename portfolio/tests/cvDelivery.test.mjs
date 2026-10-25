import { test } from 'node:test';
import assert from 'node:assert/strict';
import { canReadCv } from '../src/services/site/cvDelivery.js';

const url = 'https://example.com/current.pdf';
const pdf = (status = 200, type = 'application/pdf') => new Response('%PDF-1.7\nbody\n%%EOF', { status, headers: { 'Content-Type': type } });

test('falls back to a normal GET when the provider rejects Range', async () => {
  const requests = [];
  const available = await canReadCv(url, { fetchImpl: async (_url, options) => {
    requests.push(options);
    return options.headers?.Range ? new Response('', { status: 416 }) : pdf();
  } });
  assert.equal(available, true);
  assert.equal(requests.length, 2);
  assert.equal(requests[1].headers?.Range, undefined);
});

test('normal GET recovers when Range causes a browser network/CORS failure', async () => {
  assert.equal(await canReadCv(url, { fetchImpl: async (_url, options) => {
    if (options.headers?.Range) throw new TypeError('Failed to fetch');
    return pdf();
  } }), true);
});

test('accepts valid PDFs when Range is ignored or generic binary MIME is used', async () => {
  for (const type of ['application/pdf', 'application/pdf; charset=binary', 'application/octet-stream']) {
    assert.equal(await canReadCv(url, { fetchImpl: async () => pdf(200, type) }), true);
  }
});

test('HTTP errors and HTML responses never become a downloadable PDF', async () => {
  for (const status of [401, 403, 404, 500]) {
    assert.equal(await canReadCv(url, { fetchImpl: async () => new Response('', { status }) }), false);
  }
  assert.equal(await canReadCv(url, { fetchImpl: async () => pdf(200, 'text/html') }), false);
  assert.equal(await canReadCv(url, { fetchImpl: async () => new Response('<html>login</html>', { headers: { 'Content-Type': 'application/pdf' } }) }), false);
});

test('PDF header may arrive across streamed chunks', async () => {
  assert.equal(await canReadCv(url, { fetchImpl: async () => new Response(new ReadableStream({
    start(controller) { controller.enqueue(new TextEncoder().encode('%PD')); controller.enqueue(new TextEncoder().encode('F-1.7')); controller.close(); }
  }), { headers: { 'Content-Type': 'application/pdf' }, status: 206 }) }), true);
});

test('passes redirect handling through to fetch and validates the delivered bytes', async () => {
  assert.equal(await canReadCv(url, { fetchImpl: async (_url, options) => {
    assert.equal(options.redirect, 'follow');
    return pdf();
  } }), true);
});
