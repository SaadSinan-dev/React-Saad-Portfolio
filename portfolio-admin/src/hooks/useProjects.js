import { useEffect, useState } from 'react';
import { subscribeAdminProjects } from '../services/projects/projectService';

export function useAdminProjects() {
  const [state, setState] = useState({ projects: [], loading: true, error: '' });

  useEffect(() => {
    const unsubscribe = subscribeAdminProjects(
      (projects) => setState({ projects, loading: false, error: '' }),
      () => setState((current) => ({ ...current, loading: false, error: 'Unable to load projects.' }))
    );

    return unsubscribe;
  }, []);

  return state;
}
