import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ALLOWED_PROJECT_IMAGE_TYPES,
  MAX_PROJECT_IMAGE_BYTES,
  validateProjectImage,
} from '../../services/media/cloudinaryService';

const fileKey = (file) => `${file.name}:${file.size}:${file.lastModified}`;

export default function ImageUploader({
  currentImageUrls = [],
  files = [],
  onFilesChange,
  onCurrentImagesChange,
  disabled,
  uploadProgress,
}) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [error, setError] = useState('');

  const existingImages = useMemo(
    () => (Array.isArray(currentImageUrls) ? currentImageUrls.filter(Boolean) : []),
    [currentImageUrls]
  );

  useEffect(() => {
    const nextPreviews = files.map((file) => ({ file, url: URL.createObjectURL(file) }));
    setPreviewUrls(nextPreviews);
    return () => nextPreviews.forEach(({ url }) => URL.revokeObjectURL(url));
  }, [files]);

  const acceptFiles = (fileList) => {
    const incoming = Array.from(fileList || []);
    if (!incoming.length) return;

    for (const file of incoming) {
      const validationError = validateProjectImage(file);
      if (validationError) {
        setError(`${file.name}: ${validationError}`);
        return;
      }
    }

    const known = new Set(files.map(fileKey));
    const uniqueIncoming = incoming.filter((file) => {
      const key = fileKey(file);
      if (known.has(key)) return false;
      known.add(key);
      return true;
    });

    setError('');
    if (uniqueIncoming.length) onFilesChange([...files, ...uniqueIncoming]);
  };

  const onDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    acceptFiles(event.dataTransfer.files);
  };

  const removeExisting = (index) => {
    onCurrentImagesChange(existingImages.filter((_, imageIndex) => imageIndex !== index));
  };

  const removeSelected = (index) => {
    onFilesChange(files.filter((_, fileIndex) => fileIndex !== index));
  };

  const totalImages = existingImages.length + previewUrls.length;

  return (
    <div className="grid gap-4">
      <div>
        <button
          type="button"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          onDragEnter={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragOver={(event) => event.preventDefault()}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`flex min-h-44 w-full flex-col items-center justify-center border border-dashed p-6 text-center transition-colors ${
            dragging ? 'border-ink bg-surface' : 'border-line-strong bg-base hover:bg-surface'
          } disabled:cursor-not-allowed disabled:opacity-50`}
        >
          <span className="text-sm font-medium text-ink">Drop images here or choose files</span>
          <span className="mt-2 text-xs text-faint">
            JPG, PNG or WEBP · max {MAX_PROJECT_IMAGE_BYTES / 1024 / 1024} MB each
          </span>
        </button>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="sr-only"
          accept={ALLOWED_PROJECT_IMAGE_TYPES.join(',')}
          disabled={disabled}
          onChange={(event) => {
            acceptFiles(event.target.files);
            event.target.value = '';
          }}
        />

        {error && (
          <p role="alert" className="mt-3 text-sm text-red-700 dark:text-red-300">
            {error}
          </p>
        )}

        {typeof uploadProgress === 'number' && uploadProgress > 0 && uploadProgress < 100 && (
          <div className="mt-4" aria-live="polite">
            <div className="mb-1 flex justify-between text-xs text-faint">
              <span>Uploading images</span><span>{uploadProgress}%</span>
            </div>
            <div className="h-1 overflow-hidden bg-line">
              <div className="h-full bg-ink transition-[width]" style={{ width: `${uploadProgress}%` }} />
            </div>
          </div>
        )}
      </div>

      {totalImages > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {existingImages.map((url, index) => (
            <div key={`${url}-${index}`} className="border border-line bg-surface p-2">
              <div className="relative">
                <img src={url} alt={`Existing project image ${index + 1}`} className="aspect-[4/3] w-full object-cover" />
                {index === 0 && (
                  <span className="absolute start-2 top-2 bg-base/90 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-ink backdrop-blur-sm">
                    Cover
                  </span>
                )}
              </div>
              <button
                type="button"
                className="link mt-2 text-xs"
                disabled={disabled}
                onClick={() => removeExisting(index)}
              >
                Remove image
              </button>
            </div>
          ))}

          {previewUrls.map(({ file, url }, index) => {
            const overallIndex = existingImages.length + index;
            return (
              <div key={fileKey(file)} className="border border-line bg-surface p-2">
                <div className="relative">
                  <img src={url} alt={`Selected project image ${overallIndex + 1}`} className="aspect-[4/3] w-full object-cover" />
                  {overallIndex === 0 && (
                    <span className="absolute start-2 top-2 bg-base/90 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-ink backdrop-blur-sm">
                      Cover
                    </span>
                  )}
                </div>
                <div className="mt-2 flex items-center justify-between gap-3 text-xs">
                  <span className="truncate text-muted">{file.name}</span>
                  <button type="button" className="link shrink-0" disabled={disabled} onClick={() => removeSelected(index)}>
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid min-h-28 place-items-center border border-line bg-surface text-xs text-faint">
          No images selected
        </div>
      )}

      <p className="text-xs text-faint">Images keep this order. The first image is used as the project cover.</p>
    </div>
  );
}
