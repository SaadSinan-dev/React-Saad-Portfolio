import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
  const { user, isAdmin, loading, configured } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-base px-6 text-ink">
        <div className="w-full max-w-sm border border-line bg-raised p-8 text-center">
          <div className="label label-ink">Admin</div>
          <p className="mt-4 text-sm text-muted">Checking access…</p>
        </div>
      </div>
    );
  }

  if (!configured || !user || !isAdmin) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
