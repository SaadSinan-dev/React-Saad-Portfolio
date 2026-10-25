import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signInAdmin } from '../../services/auth/authService';

const publicPortfolioUrl = import.meta.env.VITE_PUBLIC_PORTFOLIO_URL?.trim() || '/';

export default function LoginPage() {
  const { user, isAdmin, loading, configured } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const destination = location.state?.from?.startsWith('/admin') ? location.state.from : '/admin';

  useEffect(() => {
    if (!loading && user && isAdmin) navigate(destination, { replace: true });
  }, [loading, user, isAdmin, navigate, destination]);

  if (!loading && user && isAdmin) return <Navigate to={destination} replace />;

  const submit = async (event) => {
    event.preventDefault();
    if (submitting) return;
    setError('');
    setSubmitting(true);
    try {
      await signInAdmin(email.trim(), password);
      navigate(destination, { replace: true });
    } catch (loginError) {
      const code = loginError?.code || '';
      if (code.includes('invalid-credential') || code.includes('wrong-password') || code.includes('user-not-found')) {
        setError('Email or password is incorrect.');
      } else {
        setError(loginError?.message || 'Unable to sign in.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="grid min-h-screen bg-base px-5 py-12 text-ink sm:px-8">
      <div className="mx-auto grid w-full max-w-5xl items-center gap-10 lg:grid-cols-[1fr_28rem]">
        <div className="hidden lg:block">
          <p className="label label-ink">Portfolio CMS</p>
          <h2 className="mt-5 max-w-xl text-5xl font-semibold leading-[0.98] tracking-[-0.035em]">Good work deserves<br />a good introduction.</h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-muted">A focused workspace for your projects, images, and résumé. Make a change here and keep your public portfolio current.</p>
        </div>

        <section className="w-full border border-line-strong bg-raised p-6 shadow-2xl sm:p-8" aria-labelledby="login-title">
          <p className="label">Secure admin</p>
          <h1 id="login-title" className="mt-3 text-3xl font-semibold tracking-tight">Sign in</h1>
          <p className="mt-2 text-sm text-muted">Welcome back. Sign in with your admin account.</p>

          {!configured && (
            <div role="alert" className="mt-6 border border-line-strong bg-surface p-4 text-sm text-muted">
              Firebase is not configured yet. Add the values from <code className="font-mono text-xs text-ink">.env.example</code> to your local <code className="font-mono text-xs text-ink">.env</code> file first.
            </div>
          )}

          <form onSubmit={submit} className="mt-8 grid gap-5">
            <label className="grid gap-2 text-sm font-medium">
              Email
              <input type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} disabled={submitting || !configured} className="min-h-12 border border-line-strong bg-base px-3 focus:border-ink disabled:opacity-60" />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Password
              <input type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} disabled={submitting || !configured} className="min-h-12 border border-line-strong bg-base px-3 focus:border-ink disabled:opacity-60" />
            </label>
            {error && <p role="alert" className="border border-line bg-surface px-3 py-3 text-sm text-ink">{error}</p>}
            <button type="submit" disabled={submitting || !configured} className="btn btn-solid mt-1 justify-center disabled:opacity-50">{submitting ? 'Signing in…' : 'Sign in to dashboard'}</button>
          </form>

          <a href={publicPortfolioUrl} className="link mt-7 text-xs text-muted">← Back to portfolio</a>
        </section>
      </div>
    </main>
  );
}
