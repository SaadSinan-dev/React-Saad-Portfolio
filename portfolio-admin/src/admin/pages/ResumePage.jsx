import { useEffect, useRef, useState } from 'react';
import { publishCv, subscribeSiteSettings } from '../../services/site/siteSettingsService';
import { validatePdf } from '../../services/site/pdfValidation';
import { checkPublishedCv } from '../../services/site/cvDelivery';

export default function ResumePage() {
  const [current, setCurrent] = useState(null);
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [readError, setReadError] = useState('');
  const [notice, setNotice] = useState('');
  const [attempt, setAttempt] = useState(0);
  const [delivery, setDelivery] = useState({ url: '', available: false });
  const input = useRef(null);

  useEffect(() => {
    setReadError('');
    return subscribeSiteSettings(data => { setCurrent(data); setReadError(''); }, () => setReadError('The current CV could not be loaded. Check your connection and try again.'));
  }, [attempt]);
  useEffect(() => {
    const url = current?.cvUrl;
    if (!url || !/^https:\/\//i.test(url)) return;
    const controller = new AbortController();
    checkPublishedCv(url, { signal: controller.signal })
      .then(result => { if (!controller.signal.aborted) setDelivery({ url, ...result }); });
    return () => controller.abort();
  }, [current?.cvUrl, attempt]);
  useEffect(() => {
    if (!busy) return;
    const warn = event => { event.preventDefault(); event.returnValue = ''; };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [busy]);

  const choose = event => {
    const next = event.target.files?.[0];
    setNotice('');
    setFile(null);
    const message = next ? validatePdf(next) : '';
    setError(message);
    if (next && !message) setFile(next);
  };
  const submit = async event => {
    event.preventDefault();
    if (!file || busy || !current || readError) return;
    setBusy(true); setError(''); setNotice(''); setProgress(0);
    try {
      const cv = await publishCv(file, current.cvUrl || '', setProgress);
      setCurrent(previous => ({ ...previous, ...cv }));
      setFile(null);
      if (input.current) input.current.value = '';
      setNotice('CV published. Visitors can now download this version.');
    } catch (failure) { setError(failure.message); }
    finally { setBusy(false); }
  };
  const cvUrl = /^https:\/\//i.test(current?.cvUrl || '') ? current.cvUrl : '';
  const updated = current?.cvUpdatedAt?.toDate?.() || (current?.cvUpdatedAt ? new Date(current.cvUpdatedAt) : null);

  return (
    <div className="max-w-5xl">
      <p className="label">Portfolio / Résumé</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Your next introduction.</h1>
      <p className="mt-4 max-w-xl text-sm text-muted">Keep your résumé ready for the next opportunity. Publish one PDF and every CV link on your portfolio follows it.</p>
      {readError && <div role="alert" className="notice mt-6">{readError}<button className="btn btn-outline mt-3" onClick={() => setAttempt(value => value + 1)}>Retry loading</button></div>}
      {error && <div role="alert" className="notice mt-6">{error}</div>}
      {notice && <div role="status" className="notice notice-success mt-6">{notice}</div>}
      <div className="mt-9 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <section className="panel p-6 sm:p-8" aria-busy={!current && !readError}>
          <div className="flex items-center justify-between gap-4"><p className="label">Currently published</p><span className="text-xs text-signal">{cvUrl ? delivery.url !== cvUrl ? 'Checking availability…' : delivery.available ? 'Live on portfolio' : 'Delivery unavailable' : 'Not published'}</span></div>
          <div className="resume-document mt-7" aria-hidden="true"><span>CV</span><span className="font-mono text-xs">PDF</span></div>
          <h2 className="mt-6 break-words text-xl font-semibold">{!current ? 'Loading résumé…' : cvUrl ? current.cvFilename || 'Published résumé.pdf' : 'No CV published yet'}</h2>
          <p className="mt-2 text-sm text-muted">{cvUrl ? `${current.cvSize ? `${(current.cvSize / 1024).toFixed(0)} KB · ` : ''}${updated && !Number.isNaN(updated.getTime()) ? `Updated ${updated.toLocaleDateString(undefined, { dateStyle: 'medium' })}` : 'Available to visitors'}` : 'Your portfolio will show a contact option until you publish a PDF.'}</p>
          {cvUrl && <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline mt-6">Open published PDF <span aria-hidden="true">↗</span></a>}
          {cvUrl && delivery.url === cvUrl && !delivery.available && <p role="status" className="mt-4 text-sm text-muted">The saved file could not be verified as an accessible PDF{delivery.status ? ` (HTTP ${delivery.status})` : ''}. Check your connection and Cloudinary PDF delivery settings. Visitors can request the CV by email.<button type="button" className="link mt-2 block min-h-11" onClick={() => setAttempt(value => value + 1)}>Check again</button></p>}
        </section>
        <form onSubmit={submit} className="panel p-6 sm:p-8">
          <p className="label">{cvUrl ? 'Publish an update' : 'First publication'}</p>
          <h2 className="mt-3 text-2xl font-semibold">{cvUrl ? 'Replace your CV' : 'Upload your CV'}</h2>
          <p className="mt-3 text-sm text-muted">Your current CV stays available until the new document is uploaded, verified, and saved.</p>
          <label className="upload-zone mt-7 block" htmlFor="resume-file"><span className="block text-[1rem] font-medium text-ink">Choose your résumé</span><span id="resume-help" className="mt-1 block text-xs text-muted">PDF only · Up to 4 MB</span><input ref={input} id="resume-file" type="file" accept="application/pdf,.pdf" aria-describedby="resume-help" onChange={choose} disabled={busy} className="mt-5 block w-full text-sm file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-ink file:px-4 file:py-2 file:text-inverse" /></label>
          {file && <p className="mt-4 break-words text-sm"><strong>Ready to publish:</strong> {file.name} <span className="text-muted">({Math.ceil(file.size / 1024)} KB)</span></p>}
          {busy && <div className="mt-5" role="status"><p className="mb-2 text-sm">{progress < 100 ? `Uploading · ${progress}%` : 'Verifying PDF and publishing…'}</p><progress max="100" value={progress} className="w-full accent-current" /></div>}
          <button type="submit" className="btn btn-solid mt-7" disabled={!file || busy || !current || Boolean(readError)}>{busy ? 'Publishing…' : cvUrl ? 'Publish replacement' : 'Publish CV'} <span aria-hidden="true">↗</span></button>
          <p className="mt-4 text-xs leading-relaxed text-faint">Publishing updates the public download immediately. Previous files are retained, so failed uploads never delete your existing résumé.</p>
        </form>
      </div>
    </div>
  );
}
