const PDF_TYPES = new Set(['application/pdf', 'application/x-pdf', 'application/octet-stream', 'binary/octet-stream']);
const RANGE_UNSUPPORTED = new Set([400, 405, 416, 501]);

async function hasPdfHeader(response) {
  const type = response.headers.get('content-type')?.split(';')[0].trim().toLowerCase();
  if ((type && !PDF_TYPES.has(type)) || !response.body) {
    await response.body?.cancel();
    return false;
  }
  const reader = response.body.getReader();
  let header = '';
  try {
    while (header.length < 8) {
      const chunk = await reader.read();
      if (chunk.done) break;
      header += new TextDecoder().decode(chunk.value.subarray(0, 8 - header.length));
    }
  } finally { await reader.cancel(); }
  return /^%PDF-\d\.\d/.test(header);
}

// A range is an optimization, not a requirement of public PDF delivery.
// Providers may reject it or fail CORS preflight while ordinary GET works.
export async function checkCvDelivery(url, { signal, fetchImpl = fetch, timeoutMs = 12000 } = {}) {
  const controller = new AbortController();
  const abort = () => controller.abort(signal?.reason);
  if (signal?.aborted) abort();
  signal?.addEventListener('abort', abort, { once: true });
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    let response;
    try {
      response = await fetchImpl(url, { headers: { Range: 'bytes=0-1023' }, signal: controller.signal, redirect: 'follow' });
    } catch (error) {
      if (controller.signal.aborted) throw error;
      response = await fetchImpl(url, { signal: controller.signal, redirect: 'follow' });
    }
    if (RANGE_UNSUPPORTED.has(response.status)) {
      await response.body?.cancel();
      response = await fetchImpl(url, { signal: controller.signal, redirect: 'follow' });
    }
    if (!response.ok) {
      await response.body?.cancel();
      return { available: false, status: response.status, reason: 'http-error' };
    }
    const available = await hasPdfHeader(response);
    return { available, status: response.status, reason: available ? '' : 'invalid-pdf' };
  } catch {
    return { available: false, status: 0, reason: signal?.aborted ? 'aborted' : 'network-error' };
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', abort);
  }
}

export async function canReadCv(url, options) {
  return (await checkCvDelivery(url, options)).available;
}
