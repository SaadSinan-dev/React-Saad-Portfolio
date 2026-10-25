import { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navigation = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/projects', label: 'Projects', end: true },
  { to: '/admin/resume', label: 'Résumé / CV' },
  { to: '/admin/projects/new', label: 'Add project' },
  { to: '/admin/account', label: 'Account' },
];

function Navigation({ onNavigate }) {
  return (
    <nav aria-label="Admin navigation" className="grid gap-1">
      {navigation.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex min-h-11 items-center justify-between border px-3 text-sm transition-colors ${
              isActive
                ? 'border-ink bg-ink text-inverse'
                : 'border-transparent text-muted hover:border-line hover:bg-surface hover:text-ink'
            }`
          }
        >
          <span>{item.label}</span>
          <span aria-hidden="true" className="font-mono text-[10px] opacity-60">↗</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = async () => {
    await signOut();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="admin-workspace min-h-screen bg-base text-ink">
      <a href="#admin-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] btn btn-solid">Skip to content</a>
      <header className="sticky top-0 z-50 flex min-h-16 items-center justify-between border-b border-line bg-base/95 px-gutter backdrop-blur md:hidden">
        <div>
          <p className="label label-ink">Portfolio CMS</p>
          <p className="mt-1 text-xs text-faint">Your portfolio workspace</p>
        </div>
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="admin-mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
          className="btn btn-outline px-3 py-2"
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </header>

      {menuOpen && (
        <div id="admin-mobile-nav" className="border-b border-line bg-raised p-gutter md:hidden">
          <Navigation onNavigate={() => setMenuOpen(false)} />
        </div>
      )}

      <div className="md:grid md:min-h-screen md:grid-cols-[16rem_minmax(0,1fr)]">
        <aside className="admin-sidebar hidden border-r border-line bg-raised md:sticky md:top-0 md:flex md:h-screen md:flex-col md:p-6">
          <div className="border-b border-line pb-6">
            <p className="label label-ink">Portfolio CMS</p>
            <p className="mt-2 text-sm text-muted">Your portfolio workspace</p>
          </div>
          <div className="mt-6 flex-1">
            <Navigation />
          </div>
          <div className="border-t border-line pt-5">
            <p className="truncate text-xs text-faint">{user?.email}</p>
            <button type="button" onClick={logout} className="mt-3 text-sm font-medium text-ink link">
              Log out
            </button>
          </div>
        </aside>

        <div className="min-w-0">
          <div className="hidden min-h-16 items-center justify-between border-b border-line px-8 md:flex">
            <p className="label">{location.pathname === '/admin' ? 'Overview' : 'Administration'}</p>
            <button type="button" onClick={logout} className="btn btn-outline py-2">
              Log out
            </button>
          </div>
          <main id="admin-content" className="p-gutter md:p-8 lg:p-10">
            <div className="mx-auto w-full max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
