import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import { useAdminProjects } from '../../hooks/useProjects';
import { deleteProject } from '../../services/projects/projectService';

const FILTERS = ['all', 'web', 'mobile', 'featured'];

export default function ProjectsPage() {
  const { projects, loading, error } = useAdminProjects();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [actionError, setActionError] = useState('');
  const [notice, setNotice] = useState(location.state?.notice || '');

  const visibleProjects = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesFilter = filter === 'all' || (filter === 'featured' ? project.featured : project.category === filter);
      const haystack = `${project.title || ''} ${project.shortDescription || ''} ${project.description || ''}`.toLowerCase();
      return matchesFilter && (!needle || haystack.includes(needle));
    });
  }, [projects, query, filter]);

  const confirmDelete = async () => {
    if (!pendingDelete || deleting) return;
    setDeleting(true);
    setActionError('');
    try {
      await deleteProject(pendingDelete);
      setPendingDelete(null);
      setNotice('Project deleted.');
    } catch {
      setActionError('The project could not be deleted. Nothing else was changed.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div><p className="label">Projects</p><h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Manage work</h1><p className="mt-3 max-w-2xl text-sm text-muted">Search, filter, edit, and control the order used by the public Mobile/Web tabs.</p></div>
        <Link to="/admin/projects/new" className="btn btn-solid">Add project <span aria-hidden="true">＋</span></Link>
      </div>

      {(error || actionError) && <div role="alert" className="mt-6 border border-line-strong bg-surface p-4 text-sm">{error || actionError}</div>}
      {notice && <div role="status" className="mt-6 flex items-center justify-between gap-4 border border-line-strong bg-surface p-4 text-sm"><span>{notice}</span><button type="button" onClick={() => setNotice('')} className="link text-xs">Dismiss</button></div>}

      <div className="mt-8 grid gap-4 border border-line bg-raised p-4 2xl:grid-cols-[minmax(0,1fr)_auto] 2xl:items-center">
        <label className="sr-only" htmlFor="project-search">Search projects</label>
        <input id="project-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by title or description…" className="min-h-11 w-full border border-line-strong bg-base px-3 text-sm focus:border-ink" />
        <div className="flex flex-wrap gap-2" aria-label="Project filters">
          {FILTERS.map((item) => <button key={item} type="button" onClick={() => setFilter(item)} aria-pressed={filter === item} className={`min-h-10 border px-3 text-xs font-medium capitalize transition-colors ${filter === item ? 'border-ink bg-ink text-inverse' : 'border-line-strong bg-base text-muted hover:text-ink'}`}>{item}</button>)}
        </div>
      </div>

      <div className="mt-6 border border-line bg-raised">
        <div className="hidden grid-cols-[4rem_minmax(10rem,1.4fr)_5rem_4rem_minmax(8rem,1fr)_7rem_7rem] gap-4 border-b border-line px-5 py-3 text-xs text-faint 2xl:grid">
          <span>Image</span><span>Project</span><span>Category</span><span>Order</span><span>Technologies</span><span>Dates</span><span className="text-end">Actions</span>
        </div>
        {loading ? (
          <div className="grid gap-px bg-line">{[0, 1, 2, 3].map((item) => <div key={item} className="h-24 animate-pulse bg-raised" />)}</div>
        ) : visibleProjects.length ? (
          <div className="divide-y divide-line">
            {visibleProjects.map((project) => <ProjectAdminRow key={project.id} project={project} onDelete={() => setPendingDelete(project)} />)}
          </div>
        ) : (
          <div className="p-10 text-center"><p className="font-medium">No matching projects</p><p className="mt-2 text-sm text-muted">Try another filter or add a new project.</p></div>
        )}
      </div>

      <ConfirmDialog open={Boolean(pendingDelete)} title={`Delete “${pendingDelete?.title || 'project'}”?`} description="This removes the Firestore record. Hosted image assets are not deleted automatically. This action cannot be undone." confirmLabel="Delete project" busy={deleting} onCancel={() => setPendingDelete(null)} onConfirm={confirmDelete} />
    </div>
  );
}

function ProjectAdminRow({ project, onDelete }) {
  const thumbnail = project.imageUrl || '';
  return (
    <article className="project-admin-row grid gap-4 p-5 2xl:grid-cols-[4rem_minmax(10rem,1.4fr)_5rem_4rem_minmax(8rem,1fr)_7rem_7rem] 2xl:items-center">
      <div className="h-16 w-16 overflow-hidden border border-line bg-surface">
        {thumbnail ? <img src={thumbnail} alt="" className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center font-mono text-[9px] text-faint">NO IMG</div>}
      </div>
      <div><h2 className="font-medium">{project.title}</h2><p className="mt-1 line-clamp-2 text-xs text-muted">{project.shortDescription}</p>{project.featured && <span className="mt-2 inline-block border border-line px-2 py-0.5 text-[10px] uppercase tracking-wider text-faint">Featured</span>}</div>
      <div><span className="2xl:hidden text-xs text-faint">Category · </span><span className="text-sm capitalize">{project.category}</span></div>
      <div><span className="2xl:hidden text-xs text-faint">Order · </span><span className="font-mono text-sm">{project.order}</span></div>
      <p className="text-xs text-muted">{(project.technologies || []).slice(0, 4).join(' · ') || '—'}</p>
      <div className="text-xs text-faint"><span className="block">Created {formatDate(project.createdAt)}</span><span className="mt-1 block">Updated {formatDate(project.updatedAt)}</span></div>
      <div className="flex gap-3 2xl:justify-end"><Link to={`/admin/projects/${project.id}/edit`} className="link text-sm">Edit</Link><button type="button" onClick={onDelete} className="link text-sm">Delete</button></div>
    </article>
  );
}

function formatDate(value) {
  if (!value) return '—';
  const millis = typeof value.toMillis === 'function' ? value.toMillis() : (value.seconds || 0) * 1000;
  return millis ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(millis)) : '—';
}
