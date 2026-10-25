// Isolated integration/visual QA. External Firebase and Cloudinary boundaries
// are replaced only in this Playwright context, never in shipped application code.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHandler } from '../netlify/functions/publish-cv.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PACKAGE || 'playwright');
const adminOrigin = process.env.ADMIN_URL || 'http://127.0.0.1:5176';
const publicOrigin = process.env.PUBLIC_URL || 'http://127.0.0.1:5173';
const artifacts = resolve('qa-artifacts');
await mkdir(artifacts, { recursive: true });
const statePath = resolve(artifacts, 'fixture-state.json');
await writeFile(statePath, JSON.stringify({ profileImageUrl: '', cvUrl: '' }));
const readState = async () => JSON.parse(await readFile(statePath, 'utf8'));
const pdfs = new Map();
let version = 0;
let rejectUpload = false;
let rejectProbe = false;
let rangeUnsupported = false;
const fetchImpl = async (url, options = {}) => {
  url = String(url);
  if (url.includes('accounts:lookup')) return Response.json({ users: [{ localId: 'fixture-admin' }] });
  if (url.includes('/users/')) return Response.json({ fields: { role: { stringValue: 'admin' } } });
  if (url.includes('/site/public') && options.method !== 'PATCH') return Response.json({ fields: { cvUrl: { stringValue: (await readState()).cvUrl } }, updateTime: '2026-10-23T00:00:00Z' });
  if (url.includes('api.cloudinary.com')) {
    if (rejectUpload) return Response.json({}, { status: 503 });
    const secure_url = `https://res.cloudinary.com/qa-fixture/raw/upload/v${++version}/resume.pdf`;
    pdfs.set(secure_url, Buffer.from(await options.body.get('file').arrayBuffer()));
    return Response.json({ secure_url });
  }
  if (pdfs.has(url)) return new Response(pdfs.get(url));
  if (options.method === 'PATCH') {
    const fields = JSON.parse(options.body).fields;
    const state = await readState();
    for (const [key, value] of Object.entries(fields)) state[key] = value.stringValue ?? value.timestampValue ?? Number(value.integerValue);
    await writeFile(statePath, JSON.stringify(state));
    return Response.json({ fields });
  }
  throw new Error(`Unexpected service request: ${url}`);
};
const handler = createHandler({ env: { VITE_FIREBASE_API_KEY: 'fixture', VITE_FIREBASE_PROJECT_ID: 'fixture', VITE_CLOUDINARY_CLOUD_NAME: 'qa-fixture', CLOUDINARY_API_KEY: 'fixture', CLOUDINARY_API_SECRET: 'fixture' }, fetchImpl });
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const errors = [];
context.on('page', page => page.on('pageerror', error => errors.push(error.message)));
const subscription = `export function subscribeSiteSettings(onData, onError) { let active = true; const load = () => fetch('/.qa/settings').then(r => r.json()).then(data => { if(active) onData(data); }).catch(onError); load(); const timer = setInterval(load, 150); return () => { active = false; clearInterval(timer); }; }`;

await context.route('**/.qa/settings', async route => route.fulfill({ json: await readState() }));
await context.route('https://res.cloudinary.com/qa-fixture/**', async route => {
  const bytes = pdfs.get(route.request().url());
  if (rejectProbe && route.request().headers().range) return route.fulfill({ status: 503, body: '' });
  if (rangeUnsupported && route.request().headers().range) return route.fulfill({ status: 416, body: '' });
  await route.fulfill({ status: bytes ? 200 : 404, contentType: 'application/pdf', headers: { 'Access-Control-Allow-Origin': '*' }, body: bytes || '' });
});
await context.route('**/.netlify/functions/publish-cv', async route => {
  const request = route.request();
  const result = await handler({ httpMethod: request.method(), headers: request.headers(), body: request.postData() });
  await route.fulfill({ status: result.statusCode, headers: result.headers, body: result.body });
});
await context.route('**/src/admin/context/AuthContext.jsx*', route => route.fulfill({ contentType: 'application/javascript', body: `export function AuthProvider({children}) { return children; } export const useAuth = () => ({user:{uid:'fixture-admin',email:'admin@example.test'},isAdmin:true,loading:false,configured:true,signOut:async()=>{}});` }));
await context.route('**/src/services/site/siteSettingsService.js*', async route => {
  if (route.request().url().startsWith(publicOrigin)) return route.fulfill({ contentType: 'application/javascript', body: subscription });
  const source = await readFile(new URL('../src/services/site/siteSettingsService.js', import.meta.url), 'utf8');
  const publish = source.slice(source.indexOf('export async function publishCv'));
  await route.fulfill({ contentType: 'application/javascript', body: `import {validatePdf} from '/src/services/site/pdfValidation.js'; const auth={currentUser:{getIdToken:async()=>'fixture-token'}}; ${subscription}\n${publish}` });
});
const admin = await context.newPage();
const publicPage = await context.newPage();
try {
  await admin.goto(`${adminOrigin}/admin/resume`);
  await admin.getByText('No CV published yet').waitFor();
  await publicPage.goto(publicOrigin);
  await publicPage.getByRole('link', { name: 'Request CV by email' }).first().waitFor();
  assert.match(await publicPage.getByRole('link', { name: 'Request CV by email' }).first().getAttribute('href'), /^mailto:/);
  await admin.locator('#resume-file').setInputFiles({ name: 'fake.pdf', mimeType: 'application/pdf', buffer: Buffer.from('not a PDF') });
  await admin.getByRole('button', { name: 'Publish CV', exact: false }).click();
  await admin.getByRole('alert').filter({ hasText: 'complete PDF' }).waitFor();
  assert.equal((await readState()).cvUrl, '');
  const original = await readFile(new URL('../../portfolio/src/assets/CV.pdf', import.meta.url));
  await admin.locator('#resume-file').setInputFiles({ name: 'Resume-first.pdf', mimeType: 'application/pdf', buffer: original });
  await admin.getByRole('button', { name: 'Publish CV', exact: false }).click();
  await admin.getByRole('status').filter({ hasText: 'CV published' }).waitFor();
  const firstUrl = (await readState()).cvUrl;
  await admin.reload();
  await admin.getByRole('heading', { name: 'Resume-first.pdf' }).waitFor();
  rejectProbe = true;
  await publicPage.reload();
  await publicPage.getByRole('link', { name: 'CV unavailable — email me' }).first().waitFor();
  rejectProbe = false;
  await publicPage.evaluate(() => window.dispatchEvent(new Event('online')));
  await publicPage.getByRole('link', { name: 'View / download CV' }).first().waitFor();
  assert.equal(await publicPage.getByRole('link', { name: 'View / download CV' }).first().getAttribute('href'), firstUrl);
  const replacement = Buffer.concat([original, Buffer.from('\n% QA replacement\n')]);
  await admin.locator('#resume-file').setInputFiles({ name: 'Resume-updated.pdf', mimeType: 'application/pdf', buffer: replacement });
  await admin.getByRole('button', { name: 'Publish replacement', exact: false }).click();
  await admin.getByRole('status').filter({ hasText: 'CV published' }).waitFor();
  const secondUrl = (await readState()).cvUrl;
  assert.notEqual(firstUrl, secondUrl);
  await publicPage.reload();
  await publicPage.getByRole('link', { name: 'View / download CV' }).first().waitFor();
  const links = await publicPage.getByRole('link', { name: 'View / download CV' }).evaluateAll(nodes => nodes.map(node => node.href));
  assert.ok(links.length >= 2 && links.every(url => url === secondUrl));
  for (let index = 0; index < links.length; index += 1) {
    const popupPromise = publicPage.waitForEvent('popup');
    let receiveDownload;
    const downloadPromise = new Promise(resolve => { receiveDownload = resolve; });
    const watchPopup = popup => popup.once('download', receiveDownload);
    context.once('page', watchPopup);
    publicPage.once('download', receiveDownload);
    await publicPage.getByRole('link', { name: 'View / download CV' }).nth(index).click();
    const popup = await popupPromise;
    let timeout;
    const download = await Promise.race([downloadPromise, new Promise((_, reject) => { timeout = setTimeout(() => reject(new Error('CV link did not download its PDF')), 12000); })]).finally(() => clearTimeout(timeout));
    assert.equal(download.url(), secondUrl);
    assert.deepEqual(await readFile(await download.path()), replacement);
    publicPage.removeListener('download', receiveDownload);
    await popup.close();
  }
  rangeUnsupported = true;
  await publicPage.reload();
  await publicPage.getByRole('link', { name: 'View / download CV' }).first().waitFor();
  rangeUnsupported = false;
  const downloaded = await publicPage.evaluate(async url => Array.from(new Uint8Array(await (await fetch(url)).arrayBuffer())), secondUrl);
  assert.deepEqual(Buffer.from(downloaded), replacement);
  rejectUpload = true;
  await admin.locator('#resume-file').setInputFiles({ name: 'Will-fail.pdf', mimeType: 'application/pdf', buffer: original });
  await admin.getByRole('button', { name: 'Publish replacement', exact: false }).click();
  await admin.getByRole('alert').filter({ hasText: 'current CV is unchanged' }).waitFor();
  assert.equal((await readState()).cvUrl, secondUrl);
  await admin.screenshot({ path: resolve(artifacts, 'cv-desktop.png') });
  await admin.setViewportSize({ width: 390, height: 844 });
  await admin.screenshot({ path: resolve(artifacts, 'cv-mobile.png'), fullPage: true });
  assert.equal(await admin.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  await admin.getByRole('button', { name: 'Menu', exact: true }).click();
  await admin.getByRole('link', { name: 'Add project', exact: false }).last().click();
  await admin.getByRole('button', { name: 'Create project' }).click();
  await admin.getByRole('alert').filter({ hasText: 'Title is required' }).waitFor();
  await admin.screenshot({ path: resolve(artifacts, 'editor-mobile.png'), fullPage: true });
  assert.equal(await admin.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  await admin.setViewportSize({ width: 1440, height: 1000 });
  await admin.goto(`${adminOrigin}/admin`);
  await admin.getByRole('heading', { name: 'A home for your work.' }).waitFor();
  await admin.locator('[aria-busy="false"]').waitFor();
  await admin.screenshot({ path: resolve(artifacts, 'dashboard-desktop.png') });
  await admin.goto(`${adminOrigin}/admin/projects`);
  await admin.getByRole('heading', { name: 'Manage work' }).waitFor();
  await admin.locator('.project-admin-row').first().waitFor();
  for (const width of [1440, 1024, 768, 390]) {
    await admin.setViewportSize({ width, height: 900 });
    assert.equal(await admin.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Project list overflow at ${width}`);
  }
  await admin.getByRole('button', { name: 'Delete', exact: true }).first().click();
  await admin.getByRole('alertdialog').waitFor();
  assert.equal(await admin.getByRole('alertdialog').evaluate(el => el.contains(document.activeElement)), true);
  await admin.keyboard.press('Escape');
  assert.equal(await admin.getByRole('alertdialog').count(), 0);
  await admin.locator('#project-search').fill('no-such-project-qa');
  await admin.getByText('No matching projects').waitFor();
  await admin.locator('#project-search').fill('');
  await admin.screenshot({ path: resolve(artifacts, 'projects-mobile.png') });
  await admin.goto(`${adminOrigin}/admin/account`);
  await admin.getByRole('heading', { name: 'Admin access' }).waitFor();
  assert.equal(await admin.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  await admin.screenshot({ path: resolve(artifacts, 'account-mobile.png') });
  assert.deepEqual(errors, []);
  console.log('PASS: isolated browser CV upload, refresh, replacement, opening every public CV link, downloaded bytes, unsupported Range fallback, failed upload preservation, mobile CV/editor, and required-field validation. External services were simulated.');
} finally { await browser.close(); }
