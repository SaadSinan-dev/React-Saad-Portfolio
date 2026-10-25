import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { validatePdf } from './pdfValidation';

export function subscribeSiteSettings(onData, onError) {
  if (!db) { onError(new Error('The portfolio connection is not configured.')); return () => {}; }
  return onSnapshot(doc(db, 'site', 'public'), snapshot => onData(snapshot.exists() ? snapshot.data() : {}), onError);
}

export async function publishCv(file, expectedUrl, onProgress = () => {}) {
  const error = validatePdf(file);
  if (error) throw new Error(error);
  if (!auth?.currentUser) throw new Error('Sign in before publishing a CV.');
  const bytes = new Uint8Array(await file.arrayBuffer());
  const contentError = validatePdf(file, bytes);
  if (contentError) throw new Error(contentError);
  const token = await auth.currentUser.getIdToken();
  let binary = '';
  for (let i = 0; i < bytes.length; i += 8192) binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/.netlify/functions/publish-cv');
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.timeout = 90000;
    xhr.upload.onprogress = event => { if (event.lengthComputable) onProgress(Math.round(event.loaded / event.total * 100)); };
    xhr.onload = () => {
      let result;
      try { result = JSON.parse(xhr.responseText); } catch { reject(new Error('The publishing service is unavailable. Use the deployed admin site or Netlify Dev.')); return; }
      if (xhr.status >= 200 && xhr.status < 300 && result.cv) resolve(result.cv);
      else reject(new Error(result.error || 'The CV could not be published. Reload before trying again.'));
    };
    xhr.onerror = xhr.ontimeout = () => reject(new Error('Connection interrupted. Reload the current CV to check whether publishing completed before retrying.'));
    xhr.onabort = () => reject(new Error('Upload cancelled. Reload the current CV before retrying.'));
    xhr.send(JSON.stringify({ name: file.name, type: file.type, base64: btoa(binary), expectedUrl }));
  });
}
