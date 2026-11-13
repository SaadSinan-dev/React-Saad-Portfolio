import test from 'node:test';
import assert from 'node:assert/strict';
import { createHandler, mapProject } from '../netlify/functions/public-projects.mjs';

const field = (value) => typeof value === 'boolean' ? { booleanValue: value } : typeof value === 'number' ? { integerValue: String(value) } : Array.isArray(value) ? { arrayValue: { values: value.map(field) } } : { stringValue: value };
const document = (id, values) => ({ name: `projects/demo/databases/(default)/documents/projects/${id}`, fields: Object.fromEntries(Object.entries(values).map(([key, value]) => [key, field(value)])) });
const event = (origin = 'https://mashrouak.net') => ({ httpMethod: 'GET', headers: { origin } });

test('new, updated, and deleted Firestore projects become the complete public feed', async () => {
  let records = [document('one', { title: 'First', category: 'web', order: 2 }), document('hidden', { title: 'Draft', status: 'draft' })];
  const handler = createHandler({ env: { VITE_FIREBASE_PROJECT_ID: 'demo', FIREBASE_WEB_API_KEY: 'server-key', URL: 'https://portfolio.example' }, fetchImpl: async () => Response.json({ documents: records }) });
  const read = async () => { const response = await handler(event()); assert.equal(response.statusCode, 200); assert.equal(response.headers['Access-Control-Allow-Origin'], 'https://mashrouak.net'); return JSON.parse(response.body).projects; };
  assert.deepEqual((await read()).map((item) => item.title), ['First']);
  records.push(document('two', { title: 'Second', category: 'mobile', order: 1, imageKeys: ['project2'] }));
  assert.deepEqual((await read()).map((item) => item.title), ['Second', 'First']);
  records[0] = document('one', { title: 'Updated', category: 'web', order: 2 });
  assert.deepEqual((await read()).map((item) => item.title), ['Second', 'Updated']);
  records = records.filter((item) => !item.name.endsWith('/one'));
  assert.deepEqual((await read()).map((item) => item.title), ['Second']);
});

test('optional fields and invalid links are safe, while legacy images resolve', () => {
  const project = mapProject('valid-id', { title: 'Hello', category: 'web', imageKeys: ['project57', 'missing'], liveUrl: 'javascript:alert(1)', githubUrl: 'https://github.com/example/repo' }, 'https://portfolio.example');
  assert.equal(project.shortDescription, '');
  assert.equal(project.liveUrl, '');
  assert.equal(project.images[0], 'https://portfolio.example/project-images/project57.png');
  assert.equal(project.githubUrl, 'https://github.com/example/repo');
  assert.equal(mapProject('draft', { title: 'Draft', published: false }, 'https://portfolio.example'), null);
  assert.equal(mapProject('private', { title: 'Private', visibility: 'private' }, 'https://portfolio.example'), null);
});

test('source failures are errors and never a successful empty feed', async () => {
  const handler = createHandler({ env: { VITE_FIREBASE_PROJECT_ID: 'demo', FIREBASE_WEB_API_KEY: 'server-key' }, fetchImpl: async () => new Response('', { status: 503 }) });
  const response = await handler(event());
  assert.equal(response.statusCode, 502);
  assert.equal(response.headers['Cache-Control'], 'no-store');
  assert.equal((await handler(event('https://untrusted.example'))).statusCode, 403);
});
