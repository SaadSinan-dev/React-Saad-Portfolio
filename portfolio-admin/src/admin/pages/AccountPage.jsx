import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AccountPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const logout = async () => {
    await signOut();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="max-w-3xl">
      <p className="label">Account</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Admin access</h1>
      <p className="mt-3 text-sm text-muted">Manage your signed-in administrator account and securely end your session.</p>

      <section className="mt-8 border border-line bg-raised p-6">
        <dl className="grid gap-5 sm:grid-cols-[8rem_1fr] sm:items-baseline">
          <dt className="label">Email</dt><dd className="break-all text-sm">{user?.email || '—'}</dd>
          <dt className="label">User ID</dt><dd className="break-all font-mono text-xs text-muted">{user?.uid || '—'}</dd>
          <dt className="label">Role</dt><dd className="text-sm">Admin</dd>
        </dl>
        <div className="mt-7 border-t border-line pt-6"><button type="button" onClick={logout} className="btn btn-outline">Log out</button></div>
      </section>
    </div>
  );
}
