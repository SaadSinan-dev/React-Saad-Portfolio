export function publicSettings(data = {}) {
  const safeUrl = value => {
    try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password ? url.href : ''; } catch { return ''; }
  };
  return { profileImageUrl: safeUrl(data.profileImageUrl), cvUrl: safeUrl(data.cvUrl), cvFilename: typeof data.cvFilename === 'string' ? data.cvFilename : '' };
}
