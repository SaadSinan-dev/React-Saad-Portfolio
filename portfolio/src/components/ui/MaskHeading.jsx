import { motion, useReducedMotion } from 'framer-motion';
import { VIEWPORT, maskLine, stagger, STAGGER } from '../../lib/motion';

/**
 * Headline that reveals line by line from behind a clipped edge.
 *
 * Lines are authored explicitly rather than measured at runtime — the layout
 * stays deterministic across breakpoints and languages, and there is no
 * measure/reflow pass on scroll.
 *
 * @param {Array<React.ReactNode>} lines  one entry per visual line
 */
export default function MaskHeading({
  as: Tag = 'h2',
  lines,
  className = '',
  /** Applied to the outer element — this is what participates in a parent grid. */
  wrapperClassName = '',
  lineClassName = '',
  delay = 0,
  animate = 'inView',
}) {
  const reduced = useReducedMotion();

  const trigger =
    animate === 'mount'
      ? { initial: 'hidden', animate: 'visible' }
      : { initial: 'hidden', whileInView: 'visible', viewport: VIEWPORT };

  return (
    <motion.div
      className={wrapperClassName}
      variants={stagger(reduced, { each: STAGGER.loose, delay })}
      {...trigger}
    >
      <Tag className={className}>
        {lines.map((line, i) => (
          // The wrapper clips; the inner span is what actually travels.
          <span key={i} className={`mask ${lineClassName}`}>
            <motion.span
              className="block"
              variants={maskLine(reduced)}
              // Descenders would otherwise be shaved off by the clip.
              style={{ paddingBottom: '0.12em', marginBottom: '-0.12em' }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </Tag>
    </motion.div>
  );
}
