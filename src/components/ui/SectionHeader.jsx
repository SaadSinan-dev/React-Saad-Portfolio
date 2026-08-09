import { motion, useReducedMotion } from 'framer-motion';
import { VIEWPORT, drawRule } from '../../lib/motion';
import MaskHeading from './MaskHeading';
import Reveal from './Reveal';

/**
 * The recurring section opener: a monospace index and label sitting above a
 * hairline that draws itself, then the display heading. Left-aligned by
 * design — the asymmetry is what keeps the page from reading as a template.
 */
export default function SectionHeader({ index, label, lines, description, className = '' }) {
  const reduced = useReducedMotion();

  return (
    <header className={`mb-14 sm:mb-20 ${className}`}>
      <Reveal className="flex items-baseline gap-3" y={12}>
        <span className="label label-ink tabular-nums">{index}</span>
        <span className="label">{label}</span>
      </Reveal>

      <motion.div
        className="mt-4 mb-8 h-px origin-[left_center] bg-line rtl:origin-[right_center]"
        variants={drawRule(reduced, { delay: 0.08 })}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      />

      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <MaskHeading
          as="h2"
          lines={lines}
          wrapperClassName="lg:col-span-7"
          className="headline text-h2"
          delay={0.05}
        />

        {description && (
          <Reveal
            as="p"
            delay={0.18}
            className="max-w-measure text-lead text-muted lg:col-span-5 lg:justify-self-end"
          >
            {description}
          </Reveal>
        )}
      </div>
    </header>
  );
}
