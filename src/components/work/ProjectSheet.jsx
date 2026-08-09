import { motion, useReducedMotion } from 'framer-motion';
import { DUR, SPRING } from '../../lib/motion';
import { useLang } from '../../hooks/useLang';
import { useDialog } from '../../hooks/useDialog';
import { resolveFrames } from './assets';
import MediaCarousel from './MediaCarousel';
import { ArrowUpRight, Close, GitHub } from '../ui/Icons';

/**
 * The case sheet for one project: screenshots on one side, the written record
 * on the other. Everything shown here comes from the project's own entry in
 * data/portfolio.js.
 */
export default function ProjectSheet({ project, onClose }) {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const dialogRef = useDialog(onClose);

  const title = t(project.titleEn, project.titleAr);
  const frames = resolveFrames(project.imageKeys);
  const features = t(project.featuresEn, project.featuresAr);
  const headingId = `project-${project.id}-title`;

  return (
    <div className="fixed inset-0 z-overlay flex items-end justify-center sm:items-center sm:p-6">
      {/* Backdrop */}
      <motion.button
        type="button"
        aria-label={t('Close', 'إغلاق')}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: DUR.sm }}
        className="absolute inset-0 cursor-default bg-base/85 backdrop-blur-md"
      />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        tabIndex={-1}
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: '4%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, y: '4%' }}
        transition={reduced ? { duration: DUR.sm } : SPRING.sheet}
        className="relative flex max-h-[94dvh] w-full max-w-5xl flex-col border border-line bg-base shadow-2xl shadow-black/20 outline-none sm:max-h-[86vh] sm:flex-row"
      >
        {/* ── Header rail ──────────────────────────────────────────────── */}
        <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between border-b border-line bg-base/90 px-4 py-2.5 backdrop-blur-sm sm:px-5">
          <span className="label tabular-nums">
            {project.index} / {t('Case', 'مشروع')}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('Close', 'إغلاق')}
            className="-me-2 flex h-10 w-10 items-center justify-center text-muted transition-colors hover:text-ink"
          >
            <Close className="h-4 w-4" />
          </button>
        </div>

        {/* ── Screens ──────────────────────────────────────────────────── */}
        {/* `border-e` is logical — it already sits on the correct side in RTL. */}
        <div className="shrink-0 border-line bg-surface pb-5 pt-14 sm:w-[15rem] sm:border-e sm:pb-6 lg:w-[17rem]">
          <div className="mx-auto w-[8.5rem] border border-line-strong bg-base p-1 sm:w-[10.5rem] lg:w-[12rem]">
            <MediaCarousel frames={frames} title={title} />
          </div>
          <p className="label mt-3 text-center">
            {t(`${frames.length} screens`, `${frames.length} لقطات`)}
          </p>
        </div>

        {/* ── Record ───────────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-8 pt-16 sm:px-8 sm:pt-16">
          <h2 id={headingId} className="headline text-h2">
            {title}
          </h2>

          <p className="mt-5 max-w-measure text-lead text-muted">
            {t(project.descLongEn, project.descLongAr)}
          </p>

          <section className="mt-9">
            <h3 className="label mb-4 border-b border-line pb-2">
              {t('What it does', 'الوظائف')}
            </h3>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-1.5 sm:grid-cols-2">
              {features.map((feature) => (
                <li key={feature} className="flex items-baseline gap-2.5 text-sm text-muted">
                  <span aria-hidden="true" className="h-px w-2.5 shrink-0 translate-y-[-0.3em] bg-line-strong" />
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-9">
            <h3 className="label mb-4 border-b border-line pb-2">
              {t('Engineering focus', 'التركيز الهندسي')}
            </h3>
            <p className="max-w-measure text-sm text-muted">{t(project.focusEn, project.focusAr)}</p>
          </section>

          <section className="mt-9">
            <h3 className="label mb-4 border-b border-line pb-2">{t('Stack', 'التقنيات')}</h3>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {project.stack.map((tech) => (
                <li key={tech} className="font-mono text-meta text-ink">
                  {tech}
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-solid group justify-center sm:justify-start"
            >
              {t('Open live demo', 'عرض مباشر')}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-outline justify-center sm:justify-start"
            >
              <GitHub className="h-4 w-4" />
              {t('Source code', 'الكود المصدري')}
            </a>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
