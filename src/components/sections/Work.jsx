import { useCallback, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { useLang } from '../../hooks/useLang';
import { usePointerFine } from '../../hooks/useMediaQuery';
import { projects, personalInfo } from '../../data/portfolio';
import { DUR, EASE, SPRING, STAGGER, VIEWPORT, stagger, rise } from '../../lib/motion';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import ProjectSheet from '../work/ProjectSheet';
import { resolveFrames } from '../work/assets';
import { ArrowUpRight, GitHub } from '../ui/Icons';

/**
 * Screenshot that tracks the pointer while a row is hovered.
 *
 * One element for the whole list — position lives in motion values and the
 * source swaps as the active row changes, so hovering never triggers a React
 * render for position.
 */
function HoverPreview({ project, x, y }) {
  const frame = resolveFrames(project?.imageKeys)[0];

  return (
    <AnimatePresence>
      {project && frame && (
        <motion.div
          key={project.id}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-40 w-[9.5rem] origin-center"
          style={{ x, y, translateX: '-50%', translateY: '-50%' }}
          initial={{ opacity: 0, scale: 0.94, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: -2 }}
          exit={{ opacity: 0, scale: 0.94, rotate: -3 }}
          transition={{ duration: DUR.sm, ease: EASE.out }}
        >
          <div className="border border-line-strong bg-base p-1 shadow-2xl shadow-black/25">
            <img
              src={frame}
              alt=""
              className="aspect-[9/19] w-full object-cover"
              draggable={false}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ProjectRow({ project, onOpen }) {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const contactSheet = resolveFrames(project.imageKeys).slice(0, 3);

  return (
    <motion.article variants={rise(reduced, { y: 18 })} data-project-id={project.id}>
      <button
        type="button"
        onClick={() => onOpen(project)}
        data-cursor="open"
        data-cursor-label={t('Open', 'افتح')}
        aria-label={t(
          `Open case sheet — ${project.titleEn}`,
          `افتح تفاصيل المشروع — ${project.titleAr}`
        )}
        className="group relative isolate block w-full border-b border-line py-7 text-start transition-colors duration-500 hover:border-ink sm:py-9"
      >
        {/* Wash that wipes up from the rule on hover. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[calc(var(--gutter)*-0.5)] bottom-0 -z-10 h-0 bg-surface transition-[height] duration-500 ease-out group-hover:h-full"
        />

        <div className="grid gap-x-8 gap-y-3 lg:grid-cols-12 lg:items-baseline">
          <div className="flex items-baseline gap-4 lg:col-span-5">
            <span className="label tabular-nums transition-colors duration-300 group-hover:text-ink">
              {project.index}
            </span>
            {/* Sits between the section heading and body copy in the hierarchy. */}
            <h3 className="text-[clamp(1.5rem,2.6vw,2.25rem)] font-medium leading-none tracking-tight">
              <span className="inline-block transition-transform duration-500 ease-out motion-safe:group-hover:translate-x-2 rtl:motion-safe:group-hover:-translate-x-2">
                {t(project.titleEn, project.titleAr)}
              </span>
            </h3>
          </div>

          <p className="max-w-measure text-sm text-muted lg:col-span-4">
            {t(project.descShortEn, project.descShortAr)}
          </p>

          <div className="flex items-center justify-between gap-4 lg:col-span-3 lg:justify-end">
            <span className="font-mono text-meta text-faint">
              {project.stack.slice(0, 2).join(' · ')}
            </span>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition-all duration-300 ease-out group-hover:text-ink motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" />
          </div>

          {/* Contact sheet — carries the imagery where there is no hover. */}
          <div aria-hidden="true" className="mt-1 flex gap-2 lg:hidden">
            {contactSheet.map((frame) => (
              <img
                key={frame}
                src={frame}
                alt=""
                loading="lazy"
                decoding="async"
                className="aspect-[9/19] w-11 border border-line object-cover sm:w-12"
              />
            ))}
          </div>
        </div>
      </button>
    </motion.article>
  );
}

export default function Work() {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const pointerFine = usePointerFine();

  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const previewX = useSpring(x, SPRING.glide);
  const previewY = useSpring(y, SPRING.glide);

  const previewEnabled = pointerFine && !reduced;

  const handleMove = useCallback(
    (event) => {
      if (!previewEnabled) return;
      x.set(event.clientX);
      y.set(event.clientY);

      // Identify the row from its own dataset — no DOM query per pointer move.
      const row = event.target instanceof Element ? event.target.closest('[data-project-id]') : null;
      const match = row && projects.find((p) => String(p.id) === row.dataset.projectId);
      // Setting the same object is a no-op in React, so this does not re-render
      // while the pointer stays inside one row.
      setHovered(match || null);
    },
    [previewEnabled, x, y]
  );

  const close = useCallback(() => setSelected(null), []);

  return (
    <section id="work" className="relative z-10 py-section">
      <div className="shell">
        <SectionHeader
          index="03"
          label={t('Selected work', 'الأعمال المختارة')}
          lines={t(['My projects,', 'end to end.'], [' مشاريعي،', 'من الفكرة للتنفيذ.'])}
          description={t(
            'Mobile applications designed and built with Flutter. Open any entry for the full record.',
            'تطبيقات موبايل صممتها وبنيتها بـ Flutter. افتح أي مشروع لعرض التفاصيل الكاملة.'
          )}
        />

        <motion.div
          variants={stagger(reduced, { each: STAGGER.base })}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          onMouseMove={handleMove}
          onMouseLeave={() => setHovered(null)}
          className="border-t border-line"
        >
          {projects.map((project) => (
            <ProjectRow key={project.id} project={project} onOpen={setSelected} />
          ))}
        </motion.div>

        <Reveal delay={0.1} className="mt-12 flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-measure-tight text-sm text-muted">
            {t(
              'Every project above is open source. The repositories are on GitHub.',
              'جميع المشاريع أعلاه مفتوحة المصدر، والمستودعات متاحة على GitHub.'
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

      {previewEnabled && <HoverPreview project={hovered} x={previewX} y={previewY} />}

      <AnimatePresence>
        {selected && <ProjectSheet key={selected.id} project={selected} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}
