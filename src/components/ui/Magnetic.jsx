import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { SPRING } from '../../lib/motion';
import { usePointerFine } from '../../hooks/useMediaQuery';

/**
 * Pulls its child a short distance toward the pointer.
 *
 * Deliberately weak (default 22% of the offset, capped by the element's own
 * size) — the effect should register as responsiveness, not as a toy. Inert on
 * touch devices and under `prefers-reduced-motion`, where it renders a plain
 * wrapper with no listeners attached at all.
 */
export default function Magnetic({ children, strength = 0.22, className = '' }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const pointerFine = usePointerFine();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING.glide);
  const springY = useSpring(y, SPRING.glide);

  const enabled = pointerFine && !reduced;

  const handleMove = (event) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  if (!enabled) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
}
