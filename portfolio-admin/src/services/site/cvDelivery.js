import { MAX_CV_BYTES, validatePdf } from './pdfValidation.js';

export function isPdfContentType(value) {
  const type = value?.split(';')[0].trim().toLowerCase();
  return !type || ['application/pdf', 'application/x-pdf', 'application/octet-stream', 'binary/octet-stream'].includes(type);
}

// Admin status must describe a retrievable document, not merely a successful HEAD.
export async function checkPublishedCv(url, { signal, fetchImpl = fetch } = {}) {
  const controller = new AbortController();
  const abort = () => controller.abort();
  if (signal?.aborted) abort();
  signal?.addEventListener('abort', abort, { once: true });
  const timer = setTimeout(abort, 12000);
  try {
    const response = await fetchImpl(url, { method: 'GET', redirect: 'follow', signal: controller.signal });
    if (!response.ok || !isPdfContentType(response.headers.get('content-type')) || !response.body) {
      await response.body?.cancel();
      return { available: false, status: response.status };
    }
    const reader = response.body.getReader();
    const chunks = [];
    let size = 0;
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.length;
        if (size > MAX_CV_BYTES) return { available: false, status: response.status };
        chunks.push(value);
      }
    } finally { await reader.cancel(); }
    const bytes = new Uint8Array(size);
    let offset = 0;
    chunks.forEach(chunk => { bytes.set(chunk, offset); offset += chunk.length; });
    const error = validatePdf({ name: 'resume.pdf', type: 'application/pdf', size }, bytes);
    return { available: !error, status: response.status };
  } catch { return { available: false, status: 0 }; }
  finally { clearTimeout(timer); signal?.removeEventListener('abort', abort); }
}
