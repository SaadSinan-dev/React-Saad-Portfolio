import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getAdminRole, signOutAdmin, subscribeAuth } from '../../services/auth/authService';
import { isFirebaseConfigured } from '../../services/firebase/config';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    let revision = 0;
    const unsubscribe = subscribeAuth(async (nextUser) => {
      if (!active) return;
      const currentRevision = ++revision;
      setUser(nextUser);
      setIsAdmin(false);
      if (nextUser) setLoading(true);

      if (!nextUser) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const allowed = await getAdminRole(nextUser);
        if (active && currentRevision === revision) setIsAdmin(allowed);
      } catch {
        if (active && currentRevision === revision) setIsAdmin(false);
      } finally {
        if (active && currentRevision === revision) setLoading(false);
      }
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({ user, isAdmin, loading, configured: isFirebaseConfigured, signOut: signOutAdmin }),
    [user, isAdmin, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider.');
  return context;
}
