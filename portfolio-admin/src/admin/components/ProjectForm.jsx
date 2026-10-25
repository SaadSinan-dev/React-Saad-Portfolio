import { useMemo, useState } from 'react';
import ImageUploader from './ImageUploader';
import TechnologyInput from './TechnologyInput';

const inputClass = 'min-h-11 w-full border border-line-strong bg-base px-3 py-2 text-sm text-ink transition-colors placeholder:text-faint focus:border-ink disabled:cursor-not-allowed disabled:opacity-60';
const textareaClass = `${inputClass} min-h-28 resize-y`;

function Field({ label, required, hint, children, group = false }) {
  const Wrapper = group ? 'div' : 'label';
  return (
    <Wrapper className="block">
      <span className="mb-2 flex items-center gap-2 text-sm font-medium text-ink">
        {label}{required && <span aria-hidden="true" className="text-faint">*</span>}
      </span>
      {children}
      {hint && <span className="mt-2 block text-xs text-faint">{hint}</span>}
    </Wrapper>
  );
}

function Section({ eyebrow, title, description, children }) {
  return (
    <section className="border border-line bg-raised p-5 sm:p-6">
      <p className="label">{eyebrow}</p>
      <div className="mt-2 border-b border-line pb-5">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {description && <p className="mt-2 max-w-2xl text-sm text-muted">{description}</p>}
      </div>
      <div className="mt-6 grid gap-5">{children}</div>
    </section>
  );
}

const asLines = (value) => (Array.isArray(value) ? value.join('\n') : '');
const fromLines = (value) => value.split('\n').map((item) => item.trim()).filter(Boolean);
const uniqueUrls = (urls) => [...new Set((Array.isArray(urls) ? urls : []).filter(Boolean))];
const initialImageUrls = (project) =>
  uniqueUrls([project?.imageUrl, ...(Array.isArray(project?.imageUrls) ? project.imageUrls : [])]);

export default function ProjectForm({ initialProject, onSubmit, submitLabel }) {
  const defaults = useMemo(() => ({
    title: initialProject?.title || '',
    titleAr: initialProject?.titleAr || '',
    shortDescription: initialProject?.shortDescription || '',
    shortDescriptionAr: initialProject?.shortDescriptionAr || '',
    description: initialProject?.description || '',
    descriptionAr: initialProject?.descriptionAr || '',
    focus: initialProject?.focus || '',
    focusAr: initialProject?.focusAr || '',
    featuresText: asLines(initialProject?.features),
    featuresArText: asLines(initialProject?.featuresAr),
    category: initialProject?.category === 'web' ? 'web' : 'mobile',
    technologies: Array.isArray(initialProject?.technologies) ? initialProject.technologies : [],
    liveUrl: initialProject?.liveUrl || '',
    githubUrl: initialProject?.githubUrl || '',
    featured: Boolean(initialProject?.featured),
    order: Number.isFinite(Number(initialProject?.order)) ? Number(initialProject.order) : 1,
  }), [initialProject]);

  const [form, setForm] = useState(defaults);
  const [existingImageUrls, setExistingImageUrls] = useState(() => initialImageUrls(initialProject));
  const [imageFiles, setImageFiles] = useState([]);
  const [imagesChanged, setImagesChanged] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const validate = () => {
    if (!form.title.trim()) return 'Title is required.';
    if (!['mobile', 'web'].includes(form.category)) return 'Choose a valid category.';
    if (!Number.isInteger(Number(form.order)) || Number(form.order) < 0) return 'Display order must be a whole number of zero or greater.';
    if (form.liveUrl && !isValidUrl(form.liveUrl)) return 'Live URL must be a valid http(s) URL.';
    if (form.githubUrl && !isValidUrl(form.githubUrl)) return 'GitHub URL must be a valid http(s) URL.';
    return '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (saving) return;
    setSuccess('');
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setSaving(true);
    setUploadProgress(0);
    try {
      await onSubmit({
        ...form,
        features: fromLines(form.featuresText),
        featuresAr: fromLines(form.featuresArText),
      }, {
        imageFiles,
        existingImageUrls,
        imagesChanged,
        onUploadProgress: setUploadProgress,
      });
      setSuccess('Saved successfully.');
      setImageFiles([]);
    } catch (submitError) {
      setError(projectSaveMessage(submitError));
    } finally {
      setSaving(false);
      setUploadProgress(0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6" noValidate>
      {error && <div role="alert" className="border border-line-strong bg-surface px-4 py-3 text-sm text-ink">{error}</div>}
      {success && <div role="status" className="border border-line-strong bg-surface px-4 py-3 text-sm text-ink">{success}</div>}

      <Section eyebrow="01" title="Basic information" description="Introduce your project clearly. Add a short summary and the details behind the work.">
        <div className="grid gap-5 lg:grid-cols-2">
          <Field label="Title" required><input className={inputClass} value={form.title} disabled={saving} onChange={(event) => update('title', event.target.value)} /></Field>
          <Field label="Arabic title" hint="Optional. English is used as fallback when empty."><input dir="rtl" className={inputClass} value={form.titleAr} disabled={saving} onChange={(event) => update('titleAr', event.target.value)} /></Field>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <Field label="Short description" hint="Recommended. May be blank for migrated records whose description was not supplied."><textarea className={textareaClass} value={form.shortDescription} disabled={saving} onChange={(event) => update('shortDescription', event.target.value)} /></Field>
          <Field label="Arabic short description"><textarea dir="rtl" className={textareaClass} value={form.shortDescriptionAr} disabled={saving} onChange={(event) => update('shortDescriptionAr', event.target.value)} /></Field>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <Field label="Full description"><textarea className={textareaClass} value={form.description} disabled={saving} onChange={(event) => update('description', event.target.value)} /></Field>
          <Field label="Arabic full description"><textarea dir="rtl" className={textareaClass} value={form.descriptionAr} disabled={saving} onChange={(event) => update('descriptionAr', event.target.value)} /></Field>
        </div>
      </Section>

      <Section eyebrow="02" title="Visual" description="Project images are uploaded to Cloudinary. The first image remains the public cover.">
        <ImageUploader
          currentImageUrls={existingImageUrls}
          files={imageFiles}
          onFilesChange={(files) => {
            setImageFiles(files);
            setImagesChanged(true);
          }}
          onCurrentImagesChange={(urls) => {
            setExistingImageUrls(urls);
            setImagesChanged(true);
          }}
          disabled={saving}
          uploadProgress={uploadProgress}
        />
      </Section>

      <Section eyebrow="03" title="Technologies & detail" description="Choose the technologies and engineering decisions that best explain the project.">
        <Field label="Technologies" group><TechnologyInput value={form.technologies} onChange={(value) => update('technologies', value)} disabled={saving} /></Field>
        <div className="grid gap-5 lg:grid-cols-2">
          <Field label="Features" hint="One feature per line."><textarea className={textareaClass} value={form.featuresText} disabled={saving} onChange={(event) => update('featuresText', event.target.value)} /></Field>
          <Field label="Arabic features" hint="One feature per line."><textarea dir="rtl" className={textareaClass} value={form.featuresArText} disabled={saving} onChange={(event) => update('featuresArText', event.target.value)} /></Field>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <Field label="Engineering focus"><textarea className={textareaClass} value={form.focus} disabled={saving} onChange={(event) => update('focus', event.target.value)} /></Field>
          <Field label="Arabic engineering focus"><textarea dir="rtl" className={textareaClass} value={form.focusAr} disabled={saving} onChange={(event) => update('focusAr', event.target.value)} /></Field>
        </div>
      </Section>

      <Section eyebrow="04" title="Links">
        <div className="grid gap-5 lg:grid-cols-2">
          <Field label="Live URL" hint="Optional http(s) URL."><input type="url" className={inputClass} value={form.liveUrl} disabled={saving} onChange={(event) => update('liveUrl', event.target.value)} placeholder="https://…" /></Field>
          <Field label="GitHub URL" hint="Optional http(s) URL."><input type="url" className={inputClass} value={form.githubUrl} disabled={saving} onChange={(event) => update('githubUrl', event.target.value)} placeholder="https://github.com/…" /></Field>
        </div>
      </Section>

      <Section eyebrow="05" title="Portfolio settings">
        <div className="grid gap-5 lg:grid-cols-2">
          <Field label="Category" required>
            <select className={inputClass} value={form.category} disabled={saving} onChange={(event) => update('category', event.target.value)}>
              <option value="mobile">Mobile</option>
              <option value="web">Web</option>
            </select>
          </Field>
          <Field label="Display order" required hint="Lower numbers appear first within the public Work category.">
            <input type="number" min="0" step="1" className={inputClass} value={form.order} disabled={saving} onChange={(event) => update('order', event.target.value)} />
          </Field>
        </div>
        <label className="flex min-h-12 items-center gap-3 border border-line bg-base px-4 py-3">
          <input type="checkbox" checked={form.featured} disabled={saving} onChange={(event) => update('featured', event.target.checked)} className="h-4 w-4 accent-current" />
          <span><span className="block text-sm font-medium">Featured</span><span className="mt-0.5 block text-xs text-faint">Show a Featured label on this project in the public portfolio.</span></span>
        </label>
      </Section>

      <div className="sticky bottom-4 z-20 flex flex-wrap items-center justify-between gap-4 border border-line-strong bg-raised/95 p-4 shadow-xl backdrop-blur">
        <p className="text-xs text-faint">Fields marked * are required.</p>
        <button type="submit" disabled={saving} className="btn btn-solid min-w-32 justify-center disabled:opacity-50">{saving ? 'Saving…' : submitLabel}</button>
      </div>
    </form>
  );
}

function projectSaveMessage(error) {
  const code = error?.code || '';
  if (code.includes('permission-denied') || code.includes('unauthorized')) return 'You are not authorized to save this project.';
  if (code.includes('unavailable') || code.includes('network')) return 'The service is temporarily unavailable. Check your connection and try again.';
  return error?.message || 'Unable to save this project.';
}

function isValidUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}
