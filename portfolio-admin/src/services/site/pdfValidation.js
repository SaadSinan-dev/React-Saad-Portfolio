export const MAX_CV_BYTES = 4 * 1024 * 1024;

export function validatePdf(file, bytes) {
  if (!file || !/\.pdf$/i.test(file.name || '') || file.type !== 'application/pdf') return 'Choose a PDF document.';
  if (!file.size) return 'The PDF is empty.';
  if (file.size > MAX_CV_BYTES) return 'The PDF must be 4 MB or smaller.';
  if (bytes) {
    const header = new TextDecoder().decode(bytes.slice(0, 8));
    const ending = new TextDecoder().decode(bytes.slice(-1024));
    if (!/^%PDF-\d\.\d/.test(header) || !ending.includes('%%EOF')) return 'This file is not a complete PDF. Export it as PDF and try again.';
  }
  return '';
}
