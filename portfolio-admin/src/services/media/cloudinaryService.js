const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME?.trim();
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET?.trim();

export const MAX_PROJECT_IMAGE_BYTES = 8 * 1024 * 1024;
export const ALLOWED_PROJECT_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const isCloudinaryConfigured = Boolean(cloudName && uploadPreset);

export function validateProjectImage(file) {
  if (!(file instanceof File)) return 'Choose a valid image file.';
  if (!ALLOWED_PROJECT_IMAGE_TYPES.includes(file.type)) {
    return 'Use a JPG, PNG, or WEBP image.';
  }
  if (file.size > MAX_PROJECT_IMAGE_BYTES) {
    return 'Images must be 8 MB or smaller.';
  }
  return '';
}

function cloudinaryConfigError() {
  return new Error(
    'Cloudinary image uploads are not configured. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET.'
  );
}

function getResponseBody(xhr) {
  if (xhr.response && typeof xhr.response === 'object') return xhr.response;
  if (!xhr.responseText) return null;
  try {
    return JSON.parse(xhr.responseText);
  } catch {
    return null;
  }
}

export function uploadProjectImage(file, onProgress = () => {}) {
  if (!isCloudinaryConfigured) throw cloudinaryConfigError();

  const validationError = validateProjectImage(file);
  if (validationError) throw new Error(validationError);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  const endpoint = `https://api.cloudinary.com/v1_1/${encodeURIComponent(cloudName)}/image/upload`;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', endpoint);
    xhr.responseType = 'json';
    xhr.timeout = 90000;

    xhr.upload.addEventListener('progress', (event) => {
      if (!event.lengthComputable) return;
      onProgress(Math.round((event.loaded / event.total) * 100));
    });

    xhr.addEventListener('load', () => {
      const body = getResponseBody(xhr);
      if (xhr.status >= 200 && xhr.status < 300 && body?.secure_url) {
        onProgress(100);
        resolve({ imageUrl: body.secure_url });
        return;
      }

      const detail = body?.error?.message;
      reject(new Error(detail ? `Cloudinary upload failed: ${detail}` : 'Cloudinary image upload failed.'));
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Cloudinary image upload failed. Check your connection and try again.'));
    });

    xhr.addEventListener('abort', () => {
      reject(new Error('Cloudinary image upload was cancelled.'));
    });

    xhr.addEventListener('timeout', () => {
      reject(new Error('The image upload timed out. Check your connection and try again.'));
    });

    xhr.send(formData);
  });
}
