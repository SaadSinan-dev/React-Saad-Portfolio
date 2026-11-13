import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { storedProjectToPortfolioProject } from './projectMapper';

export function subscribePublicProjects(onData, onError) {
  if (!db) {
    onError(new Error('Portfolio is unavailable'));
    return () => {};
  }
  let stop;
  let timer;
  let active = true;
  function listen() {
    if (!active) return;
    stop = onSnapshot(
      collection(db, 'publicProjects'),
      { includeMetadataChanges: true },
      (snapshot) => {
        if (snapshot.metadata.fromCache && snapshot.empty) return;
        const projects = snapshot.docs.map((item) => {
          const project = item.data();
          return storedProjectToPortfolioProject(item.id, {
            ...project,
            imageUrls: project.images,
          });
        });
        onData(projects, { source: 'firestore' });
      },
      (error) => {
        if (!active) return;
        onError(error);
        timer = setTimeout(listen, 15000);
      },
    );
  }
  listen();
  return () => {
    active = false;
    stop?.();
    clearTimeout(timer);
  };
}
