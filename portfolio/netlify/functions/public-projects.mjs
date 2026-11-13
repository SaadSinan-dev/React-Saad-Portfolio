import projectAssets from './project-assets.mjs';

const text = (value) => typeof value === 'string' ? value.trim() : '';
const list = (value) => Array.isArray(value) ? value.map(text).filter(Boolean).slice(0, 30) : [];
const https = (value) => {
  try {
    const url = new URL(text(value));
    return url.protocol === 'https:' && !url.username && !url.password && !/[\s<>]/.test(text(value)) ? url.href : '';
  } catch { return ''; }
};
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
const visible = (project) => project.published !== false && project.isPublished !== false && project.public !== false && project.isPublic !== false && project.isPrivate !== true && text(project.visibility).toLowerCase() !== 'private' && !['draft', 'archived', 'private', 'unpublished'].includes(text(project.status).toLowerCase());

export function mapProject(id, project, siteUrl) {
  if (!visible(project)) return null;
  const title = text(project.title || project.titleEn);
  if (!id || !title) return null;
  const images = [project.imageUrl, ...(Array.isArray(project.imageUrls) ? project.imageUrls : [])].map(https).filter(Boolean);
  for (const key of list(project.imageKeys)) {
    if (projectAssets[key] && siteUrl) images.push(new URL(projectAssets[key], siteUrl).href);
  }
  return {
    id, title, titleAr: text(project.titleAr),
    shortDescription: text(project.shortDescription || project.descShortEn),
    shortDescriptionAr: text(project.shortDescriptionAr || project.descShortAr),
    description: text(project.description || project.descLongEn),
    descriptionAr: text(project.descriptionAr || project.descLongAr),
    focus: text(project.focus || project.focusEn), focusAr: text(project.focusAr),
    features: list(project.features || project.featuresEn), featuresAr: list(project.featuresAr),
    technologies: list(project.technologies || project.stack),
    category: project.category === 'web' ? 'web' : 'mobile',
    featured: project.featured === true,
    order: Number.isFinite(Number(project.order)) ? Number(project.order) : 0,
    images: [...new Set(images)].slice(0, 20),
    liveUrl: https(project.liveUrl || project.demoUrl),
    githubUrl: https(project.githubUrl || project.codeUrl),
  };
}

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
        const url = new URL(`https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/(default)/documents/projects`);
        url.searchParams.set('key', apiKey);
        url.searchParams.set('pageSize', '100');
        if (pageToken) url.searchParams.set('pageToken', pageToken);
        const response = await fetchImpl(url, { signal: AbortSignal.timeout(25000) });
        if (!response.ok) throw new Error(`Firestore returned ${response.status}`);
        const payload = await response.json();
        for (const document of payload.documents || []) {
          const item = mapProject(document.name?.split('/').pop(), decode(document.fields), env.URL || 'https://saad-dev-portfolio.netlify.app');
          if (item) projects.push(item);
        }
        pageToken = payload.nextPageToken || '';
      } while (pageToken && projects.length < 500);
      projects.sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
      return reply(200, { version: 1, projects }, 'public, max-age=60, s-maxage=60, stale-while-revalidate=300');
    } catch (error) {
      console.error('Public projects feed failed:', error instanceof Error ? error.message : 'Unknown error');
      return reply(502, { error: 'Projects are temporarily unavailable' });
    }
  };
}

export const handler = createHandler();
