import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { DUR, EASE, SPRING } from '../../lib/motion';
import { usePointerFine } from '../../hooks/useMediaQuery';

/**
 * A small monochrome cursor: a precise dot that replaces the OS pointer, and a
 * ring that lags behind it on a spring.
 *
 * States come from `data-cursor` on any element:
 *   data-cursor="link"           → ring tightens
 *   data-cursor="open" + label   → ring expands and carries a monospace label
 *
 * `mix-blend-difference` means it inverts against whatever graphite it sits on,
 * so it stays legible in both themes without a single colour value.
 *
 * Inert on touch and under reduced motion — the OS cursor is left alone and no
 * listeners are attached.
 */
export default function CustomCursor() {
  const pointerFine = usePointerFine();
  const reduced = useReducedMotion();
  const enabled = pointerFine && !reduced;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, SPRING.glide);
  const ringY = useSpring(y, SPRING.glide);

  const [state, setState] = useState('default');
  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (!enabled) return undefined;

    document.documentElement.classList.add('cursor-hidden');

    const onMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);

      const target = event.target instanceof Element ? event.target : null;
      const zone = target?.closest('[data-cursor]');

      if (zone) {
        setState(zone.getAttribute('data-cursor') || 'default');
        setLabel(zone.getAttribute('data-cursor-label') || '');
      } else if (target?.closest('a, button, [role="button"], input, textarea, select')) {
        setState('link');
        setLabel('');
      } else {
        setState('default');
        setLabel('');
      }
    };

    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      document.documentElement.classList.remove('cursor-hidden');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const isOpen = state === 'open';
  const ringSize = isOpen ? 72 : state === 'link' ? 34 : 26;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-cursor"
      style={{ mixBlendMode: 'difference' }}
    >
      {/* Both layers pin to `left-0 top-0` — physical, never the logical `start-0`.
          Pointer events report viewport coordinates, which don't flip with `dir`.
          Without an explicit `left`, a fixed box falls back to its static position,
          and under `dir="rtl"` that anchors to the right edge — putting the cursor
          a full viewport width off-screen the moment Arabic is selected. */}
      {/* Ring — trails on a spring, carries the label. */}
      <motion.div
        className="fixed left-0 top-0 flex items-center justify-center rounded-full border border-white/70"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.86 : 1,
        }}
        transition={{ ...SPRING.snap, opacity: { duration: DUR.sm } }}
      >
        {isOpen && label && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.sm, ease: EASE.out }}
            className="font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-white"
          >
            {label}
          </motion.span>
        )}
      </motion.div>

      {/* Dot — tracks the pointer exactly; this is the functional cursor. */}
      <motion.div
        className="fixed left-0 top-0 h-[5px] w-[5px] rounded-full bg-white"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible && !isOpen ? 1 : 0, scale: pressed ? 0.6 : 1 }}
        transition={{ duration: DUR.xs, ease: EASE.out }}
      />
    </div>
  );
}
