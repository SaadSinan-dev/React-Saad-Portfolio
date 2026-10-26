import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import './GridRules.css';

/**
 * Column rules for the whole page.
 *
 * Not a decorative "grid background" — these hairlines sit on the same shell
 * and gutters that every section aligns to, so the underlying structure of the
 * layout is simply made visible. Column count steps up with the breakpoint, so
 * the rhythm matches the content grid rather than fighting it.
 *
 * The rules stay fixed. Only the atmospheric layers behind them move, using
 * the existing motion runtime's shared scroll values rather than React state.
 */
export default function GridRules() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const lightY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -64]);
  const lightX = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 28]);
  const contourY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 36]);

  return (
    <div aria-hidden="true" className="portfolio-background pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div className="portfolio-background__light" style={{ x: lightX, y: lightY }} />
      <motion.div className="portfolio-background__contours" style={{ y: contourY }} />
      <div className="shell relative grid h-full grid-cols-2 md:grid-cols-4 xl:grid-cols-6">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className={`h-full border-s border-line/60 ${
              i >= 4 ? 'hidden xl:block' : i >= 2 ? 'hidden md:block' : ''
            }`}
          />
        ))}
        {/* Closes the last column so the rules read as a frame, not a fade-out. */}
        <div className="absolute inset-y-0 end-gutter w-px bg-line/60" />
      </div>
    </div>
  );
}
