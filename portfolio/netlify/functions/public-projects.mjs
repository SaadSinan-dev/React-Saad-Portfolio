export { mapProject } from '../../../shared/public-project.mjs';
import { mapProject } from '../../../shared/public-project.mjs';
const firestoreValue = (value) => {
  if (!value || typeof value !== 'object') return null;
  if ('stringValue' in value) return value.stringValue;
  if ('booleanValue' in value) return value.booleanValue;
  if ('integerValue' in value) return Number(value.integerValue);
  if ('doubleValue' in value) return Number(value.doubleValue);
  if ('timestampValue' in value) return value.timestampValue;
  if ('arrayValue' in value) return (value.arrayValue.values || []).map(firestoreValue);
  if ('mapValue' in value) return Object.fromEntries(Object.entries(value.mapValue.fields || {}).map(([key, item]) => [key, firestoreValue(item)]));
  return null;
};
const decode = (fields) => Object.fromEntries(Object.entries(fields || {}).map(([key, value]) => [key, firestoreValue(value)]));
export function createHandler({ env = process.env, fetchImpl = fetch } = {}) {
  return async (event) => {
    const origin = event.headers?.origin || event.headers?.Origin || '';
    const allowed = new Set(['https://mashrouak.net', 'https://www.mashrouak.net', 'http://localhost:5173', ...(env.PUBLIC_PROJECTS_ORIGINS || '').split(',').map((item) => item.trim()).filter(Boolean)]);
    const cors = { Vary: 'Origin', ...(allowed.has(origin) ? { 'Access-Control-Allow-Origin': origin } : {}) };
    const reply = (statusCode, body, cache = 'no-store') => ({ statusCode, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': cache, ...cors }, body: JSON.stringify(body) });
    if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: { ...cors, 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' }, body: '' };
    if (event.httpMethod !== 'GET') return reply(405, { error: 'Method not allowed' });
    if (origin && !allowed.has(origin)) return reply(403, { error: 'Origin not allowed' });
    const projectId = env.VITE_FIREBASE_PROJECT_ID;
    const apiKey = env.FIREBASE_WEB_API_KEY || env.VITE_FIREBASE_API_KEY;
    if (!projectId || !apiKey) return reply(503, { error: 'Projects feed is not configured' });
    try {
      const projects = [];
      let pageToken = '';
      do {
        const url = new URL(`https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/(default)/documents/publicProjects`);
        url.searchParams.set('key', apiKey);
        url.searchParams.set('pageSize', '100');
        if (pageToken) url.searchParams.set('pageToken', pageToken);
        const response = await fetchImpl(url, { signal: AbortSignal.timeout(25000) });
        if (!response.ok) throw new Error(`Firestore returned ${response.status}`);
        const payload = await response.json();
        for (const document of payload.documents || []) {
          const fields = decode(document.fields);
          const item = mapProject(document.name?.split('/').pop(), { ...fields, imageUrls: fields.images }, env.URL || 'https://saad-dev-portfolio.netlify.app');
          if (item) projects.push(item);
        }
        pageToken = payload.nextPageToken || '';
      } while (pageToken);
      projects.sort((a, b) => Number(b.featured) - Number(a.featured) || a.order - b.order || a.id.localeCompare(b.id));
      return reply(200, { version: 1, projects }, 'no-store');
    } catch (error) {
      console.error('Public projects feed failed:', error instanceof Error ? error.message : 'Unknown error');
      return reply(502, { error: 'Projects are temporarily unavailable' });
    }
  };
}

export const handler = createHandler();
