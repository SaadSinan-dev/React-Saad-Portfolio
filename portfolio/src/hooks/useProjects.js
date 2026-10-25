import { useEffect, useState } from 'react';
import { subscribePublicProjects } from '../services/projects/projectService';

export function usePublicProjects() {
  const [state, setState] = useState({ projects: [], loading: true, error: '', source: '' });

  useEffect(() => {
    const unsubscribe = subscribePublicProjects(
      (projects, metadata = {}) => {
        setState({ projects, loading: false, error: '', source: metadata.source || 'firestore' });
      },
      () => {
        setState((current) => ({
          ...current,
          loading: false,
          error: 'Projects are temporarily unavailable. Please try again later.',
        }));
      }
    );

    return unsubscribe;
  }, []);

  return state;
}
