import { createHash, randomUUID } from 'node:crypto';
import { MAX_CV_BYTES, validatePdf } from '../../src/services/site/pdfValidation.js';
import { isPdfContentType } from '../../src/services/site/cvDelivery.js';

class HttpError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}
const fail = (status, message) => { throw new HttpError(status, message); };
const reply = (statusCode, body) => ({ statusCode, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }, body: JSON.stringify(body) });

// Firebase REST calls carry the caller's ID token, so deployed Firestore rules
// still apply. No service-account privilege or browser-supplied role is trusted.
export function createHandler({ env = process.env, fetchImpl = fetch } = {}) {
  return async function publishCv(event) {
    if (event.httpMethod !== 'POST') return reply(405, { error: 'Use POST to publish a CV.' });
    const authorization = event.headers?.authorization || event.headers?.Authorization || '';
    if (!/^Bearer \S+$/.test(authorization)) return reply(401, { error: 'Sign in before publishing a CV.' });
    try {
      const key = env.FIREBASE_WEB_API_KEY || env.VITE_FIREBASE_API_KEY;
      const project = env.VITE_FIREBASE_PROJECT_ID;
      const cloud = env.VITE_CLOUDINARY_CLOUD_NAME;
      if (!key || !project || !cloud || !env.CLOUDINARY_API_KEY || !env.CLOUDINARY_API_SECRET) fail(503, 'CV publishing is not configured on the server. Contact the site administrator.');
      const request = (url, options = {}) => fetchImpl(url, { ...options, signal: AbortSignal.timeout(15000) });
      const identityResponse = await request(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(key)}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ idToken: authorization.slice(7) }),
      });
      if (!identityResponse.ok) fail(401, 'Your session could not be verified. Sign in again.');
      const identity = await identityResponse.json();
      const uid = identity.users?.[0]?.localId;
      if (!uid || identity.users[0].disabled) fail(401, 'Sign in again to publish a CV.');
      const base = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(project)}/databases/(default)/documents`;
      const headers = { Authorization: authorization, 'Content-Type': 'application/json' };
      const roleResponse = await request(`${base}/users/${encodeURIComponent(uid)}`, { headers });
      if (!roleResponse.ok || (await roleResponse.json()).fields?.role?.stringValue !== 'admin') fail(403, 'Only an authorized administrator can publish a CV.');

      if (!event.body || event.body.length > Math.ceil(MAX_CV_BYTES * 4 / 3) + 4096) fail(413, 'The PDF must be 4 MB or smaller.');
      let payload;
      try { payload = JSON.parse(event.body); } catch { fail(400, 'The upload request is invalid.'); }
      if (!payload || typeof payload !== 'object' || Array.isArray(payload) || typeof payload.name !== 'string' || typeof payload.type !== 'string') fail(400, 'The upload request is invalid.');
      if (typeof payload.base64 !== 'string' || !/^[A-Za-z0-9+/]*={0,2}$/.test(payload.base64)) fail(400, 'The PDF upload is invalid.');
      const bytes = Buffer.from(payload.base64, 'base64');
      const validation = validatePdf({ name: payload.name, type: payload.type, size: bytes.length }, bytes);
      if (validation) fail(400, validation);
      if (typeof payload.expectedUrl !== 'string') fail(400, 'Reload the current CV before publishing.');

      const currentResponse = await request(`${base}/site/public`, { headers });
      if (!currentResponse.ok && currentResponse.status !== 404) fail(502, 'Could not read the current CV. Nothing was changed.');
      const current = currentResponse.ok ? await currentResponse.json() : null;
      if ((current?.fields?.cvUrl?.stringValue || '') !== payload.expectedUrl) fail(409, 'The published CV changed in another session. Reload and review it before replacing.');

      const publicId = `portfolio/cv/${randomUUID()}.pdf`;
      const timestamp = String(Math.floor(Date.now() / 1000));
      const signature = createHash('sha1').update(`public_id=${publicId}&timestamp=${timestamp}&type=upload${env.CLOUDINARY_API_SECRET}`).digest('hex');
      const form = new FormData();
      form.append('file', new Blob([bytes], { type: 'application/pdf' }), 'resume.pdf');
      form.append('public_id', publicId);
      form.append('timestamp', timestamp);
      form.append('api_key', env.CLOUDINARY_API_KEY);
      form.append('signature', signature);
      form.append('type', 'upload');
      const uploadedResponse = await request(`https://api.cloudinary.com/v1_1/${encodeURIComponent(cloud)}/raw/upload`, { method: 'POST', body: form });
      if (!uploadedResponse.ok) fail(502, 'Cloudinary could not store the PDF. The current CV is unchanged.');
      const uploaded = await uploadedResponse.json();
      let url;
      try { url = new URL(uploaded.secure_url); } catch { fail(502, 'Storage returned an invalid file address.'); }
      if (url.protocol !== 'https:' || url.hostname !== 'res.cloudinary.com' || !url.pathname.startsWith(`/${cloud}/raw/upload/`) || url.username || url.password) fail(502, 'Storage returned an unexpected file address.');

      // Do not publish a URL that visitors cannot retrieve (Cloudinary accounts
      // may block PDF delivery). Check the actual bytes, not only upload success.
      const delivery = await request(url.href, { redirect: 'error' });
      if (!delivery.ok) {
        const action = [401, 403].includes(delivery.status)
          ? 'Review the CV asset access controls and “Allow delivery of PDF and ZIP files” in Cloudinary product environment Security settings.'
          : delivery.status === 404 ? 'Cloudinary could not find the uploaded PDF.' : 'Cloudinary delivery is temporarily unavailable. Try again later.';
        fail(502, `Public PDF delivery failed (HTTP ${delivery.status}). ${action} The current CV is unchanged.`);
      }
      if (!isPdfContentType(delivery.headers.get('content-type'))) fail(502, 'Storage returned an incorrect PDF content type. The current CV is unchanged.');
      const delivered = Buffer.from(await delivery.arrayBuffer());
      if (!delivered.equals(bytes)) fail(502, 'The stored PDF could not be verified. The current CV is unchanged.');

      const cv = { cvUrl: url.href, cvFilename: payload.name.replace(/[\x00-\x1f\/\\]/g, '_').slice(0, 180), cvSize: bytes.length, cvUpdatedAt: new Date().toISOString() };
      const fields = { cvUrl: { stringValue: cv.cvUrl }, cvFilename: { stringValue: cv.cvFilename }, cvSize: { integerValue: String(cv.cvSize) }, cvUpdatedAt: { timestampValue: cv.cvUpdatedAt } };
      const query = new URLSearchParams();
      Object.keys(fields).forEach(name => query.append('updateMask.fieldPaths', name));
      if (current?.updateTime) query.set('currentDocument.updateTime', current.updateTime);
      else query.set('currentDocument.exists', 'false');
      const saved = await request(`${base}/site/public?${query}`, { method: 'PATCH', headers, body: JSON.stringify({ fields }) });
      if (!saved.ok) fail(saved.status === 409 || saved.status === 400 ? 409 : 502, 'Publishing was not confirmed. Reload the current CV before retrying; existing files are retained.');
      return reply(200, { cv });
    } catch (error) {
      return reply(error.status || 502, { error: error.status ? error.message : 'Publishing could not be confirmed. Check your connection and reload the current CV before retrying.' });
    }
  };
}

export const handler = createHandler();
