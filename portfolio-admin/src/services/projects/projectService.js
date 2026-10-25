import {
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { uploadProjectImage } from '../media/cloudinaryService';

const COLLECTION = 'projects';

function sanitizeProjectInput(input) {
  return {
    title: input.title.trim(),
    titleAr: input.titleAr?.trim() || '',
    shortDescription: input.shortDescription.trim(),
    shortDescriptionAr: input.shortDescriptionAr?.trim() || '',
    description: input.description?.trim() || input.shortDescription.trim(),
    descriptionAr: input.descriptionAr?.trim() || '',
    focus: input.focus?.trim() || '',
    focusAr: input.focusAr?.trim() || '',
    features: Array.isArray(input.features) ? input.features.filter(Boolean) : [],
    featuresAr: Array.isArray(input.featuresAr) ? input.featuresAr.filter(Boolean) : [],
    technologies: Array.isArray(input.technologies) ? input.technologies.filter(Boolean) : [],
    liveUrl: input.liveUrl?.trim() || '',
    githubUrl: input.githubUrl?.trim() || '',
    category: input.category === 'web' ? 'web' : 'mobile',
    featured: Boolean(input.featured),
    order: Number(input.order),
  };
}

function uniqueUrls(urls) {
  return [...new Set((Array.isArray(urls) ? urls : []).filter(Boolean))];
}

function projectImageUrls(project) {
  return uniqueUrls([
    project?.imageUrl,
    ...(Array.isArray(project?.imageUrls) ? project.imageUrls : []),
  ]);
}

function normalizeFiles(imageFiles, imageFile) {
  if (Array.isArray(imageFiles)) return imageFiles.filter(Boolean);
  return imageFile ? [imageFile] : [];
}

async function uploadProjectImages(files, onUploadProgress = () => {}) {
  if (!files.length) return [];

  const uploadedUrls = [];
  for (let index = 0; index < files.length; index += 1) {
    const uploaded = await uploadProjectImage(files[index], (fileProgress) => {
      const overall = Math.round(((index + fileProgress / 100) / files.length) * 100);
      onUploadProgress(overall);
    });
    uploadedUrls.push(uploaded.imageUrl);
  }

  onUploadProgress(100);
  return uploadedUrls;
}

export function subscribeAdminProjects(onData, onError) {
  if (!db) {
    onError?.(new Error('Firebase is not configured.'));
    return () => {};
  }

  const projectsQuery = query(collection(db, COLLECTION), orderBy('order', 'asc'));
  return onSnapshot(
    projectsQuery,
    (snapshot) => {
      onData(snapshot.docs.map((snapshotDoc) => ({ id: snapshotDoc.id, ...snapshotDoc.data() })));
    },
    onError
  );
}

export async function getProject(projectId) {
  if (!db) throw new Error('Firebase is not configured.');
  const snapshot = await getDoc(doc(db, COLLECTION, projectId));
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
}

export async function createProject(input, { imageFiles, imageFile, onUploadProgress } = {}) {
  if (!db) throw new Error('Firebase is not configured.');
  const projectRef = doc(collection(db, COLLECTION));
  const files = normalizeFiles(imageFiles, imageFile);

  // Upload every selected image first. Firestore is not written unless the full
  // batch succeeds, so a partial upload cannot corrupt the project document.
  const uploadedUrls = uniqueUrls(await uploadProjectImages(files, onUploadProgress));

  await setDoc(projectRef, {
    ...sanitizeProjectInput(input),
    imageUrl: uploadedUrls[0] || '',
    imageUrls: uploadedUrls,
    imageKeys: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return projectRef.id;
}

export async function updateProject(
  projectId,
  input,
  { imageFiles, imageFile, existingImageUrls, imagesChanged = false, onUploadProgress } = {}
) {
  if (!db) throw new Error('Firebase is not configured.');
  const projectRef = doc(db, COLLECTION, projectId);
  const currentSnapshot = await getDoc(projectRef);
  if (!currentSnapshot.exists()) throw new Error('This project no longer exists.');

  const current = currentSnapshot.data();
  const files = normalizeFiles(imageFiles, imageFile);
  const hasImageChanges = imagesChanged || files.length > 0;

  let imageUpdate = {};
  if (hasImageChanges) {
    const retainedUrls = Array.isArray(existingImageUrls)
      ? uniqueUrls(existingImageUrls)
      : projectImageUrls(current);

    // New uploads are appended to the retained gallery. If any upload fails,
    // this throws before Firestore changes, leaving the existing project safe.
    const uploadedUrls = await uploadProjectImages(files, onUploadProgress);
    const finalUrls = uniqueUrls([...retainedUrls, ...uploadedUrls]);

    imageUpdate = {
      imageUrl: finalUrls[0] || '',
      imageUrls: finalUrls,
      imagePath: deleteField(),
      imageKeys: [],
    };
  }

  await updateDoc(projectRef, {
    ...sanitizeProjectInput(input),
    ...imageUpdate,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProject(project) {
  if (!db) throw new Error('Firebase is not configured.');
  await deleteDoc(doc(db, COLLECTION, project.id));
}
