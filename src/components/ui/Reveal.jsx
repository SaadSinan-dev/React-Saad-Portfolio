import { motion, useReducedMotion } from 'framer-motion';
import { VIEWPORT, rise } from '../../lib/motion';

/**
 * Scroll-triggered entrance for a block of content.
 * Fires once, collapses to a short fade under `prefers-reduced-motion`.
 */
export default function Reveal({
  as = 'div',
  y,
  delay = 0,
  duration,
  className = '',
  children,
  ...rest
}) {
  const reduced = useReducedMotion();
  const Component = motion[as] ?? motion.div;

  return (
    <Component
      className={className}
      variants={rise(reduced, { y, delay, duration })}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      {...rest}
    >
      {children}
    </Component>
  );
}
