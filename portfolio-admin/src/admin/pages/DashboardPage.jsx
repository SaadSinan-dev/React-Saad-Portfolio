import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import { useAdminProjects } from '../../hooks/useProjects';

export default function DashboardPage() {
  const { projects, loading, error } = useAdminProjects();
  const stats = {
    total: projects.length,
    mobile: projects.filter((project) => project.category === 'mobile').length,
    web: projects.filter((project) => project.category === 'web').length,
    featured: projects.filter((project) => project.featured).length,
  };
  const recent = [...projects]
    .sort((a, b) => timestampValue(b.updatedAt) - timestampValue(a.updatedAt))
    .slice(0, 5);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="label">Dashboard</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">A home for your work.</h1>
          <p className="mt-3 max-w-2xl text-sm text-muted">Manage the projects and résumé that introduce you to the world.</p>
        </div>
        <Link to="/admin/projects/new" className="btn btn-solid">Add project <span aria-hidden="true">＋</span></Link>
      </div>

      {error && <div role="alert" className="mt-8 border border-line-strong bg-surface p-4 text-sm">{error}</div>}

      <Link to="/admin/resume" className="resume-shortcut mt-8 flex flex-wrap items-center justify-between gap-5 p-6"><div><p className="label">Your professional introduction</p><h2 className="mt-2 text-xl font-semibold">Keep your résumé up to date</h2><p className="mt-2 text-sm text-muted">Preview your published PDF or upload a replacement.</p></div><span className="btn btn-outline">Manage CV ↗</span></Link>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-busy={loading}>
        <StatCard label="Total projects" value={loading ? '—' : stats.total} hint="All categories" />
        <StatCard label="Mobile" value={loading ? '—' : stats.mobile} hint="Public Mobile tab" />
        <StatCard label="Web" value={loading ? '—' : stats.web} hint="Public Web tab" />
        <StatCard label="Featured" value={loading ? '—' : stats.featured} hint="Highlighted in your portfolio" />
      </div>

      <section className="mt-8 border border-line bg-raised">
        <div className="flex items-center justify-between border-b border-line p-5 sm:p-6">
          <div><p className="label">Activity</p><h2 className="mt-2 text-xl font-semibold">Recently updated</h2></div>
          <Link to="/admin/projects" className="link text-sm">Manage all</Link>
        </div>
        {loading ? (
          <div className="grid gap-px bg-line" aria-label="Loading projects">
            {[0, 1, 2].map((item) => <div key={item} className="h-16 animate-pulse bg-raised" />)}
          </div>
        ) : recent.length ? (
          <div className="divide-y divide-line">
            {recent.map((project) => (
              <Link key={project.id} to={`/admin/projects/${project.id}/edit`} className="grid gap-2 p-5 transition-colors hover:bg-surface sm:grid-cols-[1fr_auto] sm:items-center">
                <div><p className="font-medium">{project.title}</p><p className="mt-1 text-xs text-faint">{project.category} · order {project.order}</p></div>
                <span className="text-xs text-muted">{formatTimestamp(project.updatedAt)}</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-sm text-muted">Your collection starts here. Add your first project to introduce your work.</div>
        )}
      </section>
    </div>
  );
}

function timestampValue(value) {
  if (!value) return 0;
  if (typeof value.toMillis === 'function') return value.toMillis();
  if (typeof value.seconds === 'number') return value.seconds * 1000;
  return 0;
}

function formatTimestamp(value) {
  const millis = timestampValue(value);
  if (!millis) return 'Not available';
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(millis));
}
