import { useCallback, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion';
import { useLang } from '../../hooks/useLang';
import { personalInfo } from '../../data/portfolio';
import { usePublicProjects } from '../../hooks/useProjects';
import { STAGGER, VIEWPORT, stagger, rise } from '../../lib/motion';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import ProjectSheet from '../work/ProjectSheet';
import { resolveProjectFrames } from '../work/assets';
import { ArrowUpRight, GitHub } from '../ui/Icons';

const WORK_CATEGORIES = [
  { id: 'mobile', labelEn: 'Mobile', labelAr: 'موبايل' },
  { id: 'web', labelEn: 'Web', labelAr: 'ويب' },
];

function ProjectRow({ project, onOpen }) {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const frames = resolveProjectFrames(project).slice(0, project.category === 'web' ? 1 : 3);
  return (
    <motion.article variants={rise(reduced, { y: 18 })} className="project-card" data-project-id={project.id}>
      <button type="button" onClick={() => onOpen(project)} className="project-preview group" aria-label={t(`Explore ${project.titleEn}`, `استكشف ${project.titleAr}`)}>
        <div className={`project-frames ${project.category === 'web' ? 'project-frames-web' : ''}`}>
          {frames.length ? frames.map((frame, index) => <img key={frame} src={frame} alt="" loading="lazy" decoding="async" className={`project-frame project-frame-${index}`} />) : <span className="text-3xl font-semibold text-muted">{t(project.titleEn, project.titleAr)}</span>}
        </div>
        <span className="project-open">{t('Explore project', 'استكشف المشروع')} <ArrowUpRight className="h-4 w-4" /></span>
      </button>
      <div className="pt-6">
        <div className="mb-3 flex items-center justify-between gap-3"><span className="label">{project.index} / {project.category === 'web' ? t('Web product', 'منتج ويب') : t('Flutter application', 'تطبيق Flutter')}</span>{project.featured && <span className="label text-signal">{t('Featured', 'مميز')}</span>}</div>
        <button type="button" className="text-start" onClick={() => onOpen(project)}><h3 className="text-[clamp(1.5rem,2.4vw,2rem)] font-semibold tracking-tight">{t(project.titleEn, project.titleAr)}</h3></button>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{t(project.descShortEn, project.descShortAr)}</p>
        <p className="mt-4 font-mono text-xs leading-relaxed text-faint">{project.stack.slice(0, 4).join(' / ')}</p>
        <div className="mt-5 flex flex-wrap items-center gap-5 border-t border-line pt-4 text-sm">
          <button type="button" onClick={() => onOpen(project)} className="link min-h-11 font-medium">{t('Case study', 'تفاصيل المشروع')} ↗</button>
          {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="link min-h-11 inline-flex items-center">{t('Live demo', 'عرض مباشر')} ↗</a>}
          {project.codeUrl && <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="link min-h-11 inline-flex items-center gap-2"><GitHub className="h-4 w-4" />{t('Source', 'المصدر')}</a>}
        </div>
      </div>
    </motion.article>
  );
}

function WorkLoadingState() {
  return (
    <div aria-label="Loading projects" aria-busy="true">
      {[0, 1, 2].map((item) => (
        <div key={item} className="grid min-h-28 animate-pulse gap-4 border-b border-line py-7 sm:py-9 lg:grid-cols-12 lg:items-center">
          <div className="h-7 bg-surface lg:col-span-5" />
          <div className="h-4 bg-surface lg:col-span-4" />
          <div className="h-3 bg-surface lg:col-span-3" />
        </div>
      ))}
    </div>
  );
}

function WorkMessage({ children }) {
  return (
    <div className="border-b border-line py-12 text-center sm:py-16">
      <p className="text-sm text-muted">{children}</p>
    </div>
  );
}

export default function Work() {
  const { t } = useLang();
  const reduced = useReducedMotion();

  const { projects, loading, error } = usePublicProjects();

  const [activeCategory, setActiveCategory] = useState('mobile');
  const [selected, setSelected] = useState(null);
  const tabRefs = useRef([]);

  const filteredProjects = projects
    .filter((project) => project.category === activeCategory)
    .sort((a, b) => a.order - b.order)
    .map((project, index) => ({
      ...project,
      index: String(index + 1).padStart(2, '0'),
    }));

  const close = useCallback(() => setSelected(null), []);

  const selectCategory = useCallback((category) => {
    setActiveCategory(category);
  }, []);

  const handleTabKeyDown = useCallback((event, index) => {
    let nextIndex = null;

    if (event.key === 'ArrowRight') nextIndex = (index + 1) % WORK_CATEGORIES.length;
    if (event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + WORK_CATEGORIES.length) % WORK_CATEGORIES.length;
    }
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = WORK_CATEGORIES.length - 1;

    if (nextIndex === null) return;

    event.preventDefault();
    const nextCategory = WORK_CATEGORIES[nextIndex].id;
    selectCategory(nextCategory);
    tabRefs.current[nextIndex]?.focus();
  }, [selectCategory]);

  return (
    <section id="work" className="relative z-10 py-section">
      <div className="shell">
        <SectionHeader
          index="03"
          label={t('Selected work', 'الأعمال المختارة')}
          lines={t(['My projects,', 'end to end.'], [' مشاريعي،', 'من الفكرة للتنفيذ.'])}
          description={t(
            'Web products and Flutter applications. Explore the interface, the architecture, and the decisions behind each project.',
            'منتجات ويب وتطبيقات Flutter. استكشف الواجهات والبنية والقرارات وراء كل مشروع.'
          )}
        />

        <div
          role="tablist"
          aria-label={t('Project categories', 'فئات المشاريع')}
          className="mb-6 flex items-center gap-6 border-b border-line sm:mb-8"
        >
          {WORK_CATEGORIES.map((category, index) => {
            const active = activeCategory === category.id;

            return (
              <button
                key={category.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                id={`work-tab-${category.id}`}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={`work-projects-panel-${category.id}`}
                tabIndex={active ? 0 : -1}
                onClick={() => selectCategory(category.id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className={`label relative min-h-11 py-3 transition-colors duration-300 hover:text-ink ${
                  active ? 'label-ink' : ''
                }`}
              >
                {t(category.labelEn, category.labelAr)}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-px h-px origin-center bg-ink transition-transform duration-300 ${
                    active ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            );
          })}
        </div>

        <motion.div
          key={activeCategory}
          id={`work-projects-panel-${activeCategory}`}
          role="tabpanel"
          aria-labelledby={`work-tab-${activeCategory}`}
          variants={stagger(reduced, { each: STAGGER.base })}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="project-grid"
        >
          {loading ? (
            <WorkLoadingState />
          ) : error ? (
            <WorkMessage>{t('Projects are temporarily unavailable. Please try again later.', 'المشاريع غير متاحة مؤقتًا. يرجى المحاولة لاحقًا.')}</WorkMessage>
          ) : filteredProjects.length ? (
            filteredProjects.map((project) => (
              <ProjectRow key={project.id} project={project} onOpen={setSelected} />
            ))
          ) : (
            <WorkMessage>{t(
              activeCategory === 'web' ? 'No web projects available yet.' : 'No mobile projects available yet.',
              activeCategory === 'web' ? 'لا توجد مشاريع ويب متاحة حاليًا.' : 'لا توجد مشاريع موبايل متاحة حاليًا.'
            )}</WorkMessage>
          )}
        </motion.div>

        <Reveal delay={0.1} className="mt-12 flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-measure-tight text-sm text-muted">
            {t(
              'More code, experiments, and ongoing work live on GitHub.',
              'المزيد من المشاريع والتجارب والأعمال المستمرة على GitHub.'
            )}
          </p>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer noopener"
            className="btn btn-outline group"
          >
            <GitHub className="h-4 w-4" />
            {t('View GitHub profile', 'حسابي على GitHub')}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </div>


      <AnimatePresence>
        {selected && <ProjectSheet key={selected.id} project={selected} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}
