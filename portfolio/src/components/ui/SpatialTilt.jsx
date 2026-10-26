import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePointerFine, useReducedMotion } from '../../hooks/useMediaQuery';
import { SPRING } from '../../lib/motion';

/** Small physical response, driven by motion values rather than React renders. */
export default function SpatialTilt({ children, className = '', strength = 4 }) {
  const reduced = useReducedMotion();
  const fine = usePointerFine();
  const bounds = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, SPRING.glide);
  const rotateY = useSpring(y, SPRING.glide);
  const enabled = fine && !reduced;

  useEffect(() => {
    if (!enabled) { x.set(0); y.set(0); }
  }, [enabled, x, y]);

  return (
    <div className={`spatial-stage ${className}`}
      onPointerEnter={enabled ? (event) => { bounds.current = event.currentTarget.getBoundingClientRect(); } : undefined}
      onPointerMove={enabled ? (event) => {
        const rect = bounds.current;
        if (!rect || event.pointerType === 'touch') return;
        const clamp = (value) => Math.max(-1, Math.min(1, value));
        x.set(-clamp((event.clientY - rect.top) / rect.height * 2 - 1) * strength);
        y.set(clamp((event.clientX - rect.left) / rect.width * 2 - 1) * strength);
      } : undefined}
      onPointerLeave={() => { x.set(0); y.set(0); bounds.current = null; }}>
      <motion.div className="spatial-surface" style={enabled ? { rotateX, rotateY } : undefined}>
        {children}
      </motion.div>
    </div>
  );
}
