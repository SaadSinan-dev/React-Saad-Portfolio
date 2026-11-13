import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase/config';
import { projects as legacyProjects } from '../../data/portfolio';
import { legacyProjectToStoredProject, storedProjectToPortfolioProject } from './projectMapper';

const COLLECTION = 'projects';

export function subscribePublicProjects(onData, onError) {
  if (!isFirebaseConfigured || !db) {
    const fallback = legacyProjects
      .map((project) => storedProjectToPortfolioProject(
        `legacy-${project.id}`,
        legacyProjectToStoredProject(project)
      ))
      .sort((a, b) => a.order - b.order);
    onData(fallback, { source: 'local-fallback' });
    return () => {};
  }

  const projectsQuery = query(collection(db, COLLECTION), orderBy('order', 'asc'));
  return onSnapshot(
    projectsQuery,
    (snapshot) => {
      onData(
        snapshot.docs.filter((snapshotDoc) => {
          const data = snapshotDoc.data();
          return data.published !== false && data.isPublished !== false && data.public !== false && data.isPublic !== false && data.isPrivate !== true && String(data.visibility || '').toLowerCase() !== 'private' && !['draft', 'archived', 'private', 'unpublished'].includes(String(data.status || '').toLowerCase());
        }).map((snapshotDoc) =>
          storedProjectToPortfolioProject(snapshotDoc.id, snapshotDoc.data())
        ),
        { source: 'firestore' }
      );
    },
    onError
  );
}
