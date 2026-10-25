import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProjectForm from '../components/ProjectForm';
import { createProject, getProject, updateProject } from '../../services/projects/projectService';

export default function ProjectEditorPage({ mode }) {
  const editing = mode === 'edit';
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(editing);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    if (!editing) return undefined;
    let active = true;
    setLoading(true);
    setLoadError('');
    setProject(null);
    getProject(id)
      .then((result) => {
        if (!active) return;
        if (!result) setLoadError('This project does not exist.');
        else setProject(result);
      })
      .catch(() => active && setLoadError('Unable to load this project.'))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [editing, id]);

  const save = async (form, options) => {
    if (editing) await updateProject(id, form, options);
    else await createProject(form, options);
    navigate('/admin/projects', { replace: true, state: { notice: editing ? 'Project updated.' : 'Project created.' } });
  };

  if (loading) {
    return <div className="grid gap-4" aria-label="Loading project"><div className="h-12 w-72 animate-pulse bg-surface" /><div className="h-80 animate-pulse border border-line bg-raised" /><div className="h-80 animate-pulse border border-line bg-raised" /></div>;
  }

  if (loadError) {
    return <div><p className="label">Project editor</p><div role="alert" className="mt-6 border border-line-strong bg-raised p-8"><h1 className="text-2xl font-semibold">Project unavailable</h1><p className="mt-3 text-sm text-muted">{loadError}</p><Link to="/admin/projects" className="btn btn-outline mt-6">Back to projects</Link></div></div>;
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div><p className="label">{editing ? 'Edit project' : 'New project'}</p><h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{editing ? project?.title : 'Add to Work'}</h1><p className="mt-3 max-w-2xl text-sm text-muted">Add the story, screenshots, and links. Your changes appear in the public project collection.</p></div>
        <Link to="/admin/projects" className="btn btn-outline">Cancel</Link>
      </div>
      <ProjectForm key={editing ? id : 'new'} initialProject={project} onSubmit={save} submitLabel={editing ? 'Save changes' : 'Create project'} />
    </div>
  );
}
