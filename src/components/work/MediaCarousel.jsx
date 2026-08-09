import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { DUR, EASE } from '../../lib/motion';
import { ChevronLeft, ChevronRight } from '../ui/Icons';

const ADVANCE_MS = 3600;
const RESUME_AFTER_MS = 7000;
const SWIPE_THRESHOLD = 44;

const slide = {
  enter: (direction) => ({ opacity: 0, x: direction > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit: (direction) => ({ opacity: 0, x: direction > 0 ? -40 : 40 }),
};

/**
 * Screenshot viewer for a single project.
 *
 * Advances on its own, pauses for a while after any manual input, and supports
 * arrow keys and touch swipes. The timer is torn down whenever it is paused, so
 * an off-screen or idle carousel costs nothing.
 */
export default function MediaCarousel({ frames, title }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();

  const resumeTimer = useRef(null);
  const touchStartX = useRef(null);
  const total = frames.length;

  const holdAutoplay = useCallback(() => {
    setPaused(true);
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), RESUME_AFTER_MS);
  }, []);

  const go = useCallback(
    (step) => {
      setDirection(step);
      setIndex((current) => (current + step + total) % total);
      holdAutoplay();
    },
    [total, holdAutoplay]
  );

  const jumpTo = useCallback(
    (next) => {
      setDirection(next > index ? 1 : -1);
      setIndex(next);
      holdAutoplay();
    },
    [index, holdAutoplay]
  );

  useEffect(() => {
    if (total <= 1 || paused || reduced) return undefined;
    const id = setInterval(() => {
      setDirection(1);
      setIndex((current) => (current + 1) % total);
    }, ADVANCE_MS);
    return () => clearInterval(id);
  }, [total, paused, reduced]);

  useEffect(() => () => clearTimeout(resumeTimer.current), []);

  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(1);
    }
  };

  const onTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const onTouchEnd = (event) => {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) go(delta < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  const dots = useMemo(() => Array.from({ length: total }, (_, i) => i), [total]);

  if (!total) {
    return <div className="aspect-[9/19] w-full bg-surface" aria-hidden="true" />;
  }

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={`${title} — screenshots`}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="group/media relative aspect-[9/19] w-full overflow-hidden bg-graphite-900"
    >
      <AnimatePresence custom={direction} mode="popLayout" initial={false}>
        <motion.img
          key={index}
          src={frames[index]}
          alt={`${title} — screen ${index + 1} of ${total}`}
          custom={direction}
          variants={slide}
          initial={reduced ? false : 'enter'}
          animate="center"
          exit={reduced ? { opacity: 0 } : 'exit'}
          transition={{ duration: DUR.sm, ease: EASE.out }}
          draggable={false}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      {total > 1 && (
        <>
          {/* Advance progress — restarts with each frame, hidden while paused. */}
          {!paused && !reduced && (
            <motion.div
              key={`progress-${index}`}
              className="absolute inset-x-0 top-0 z-20 h-px origin-left bg-white/70"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: ADVANCE_MS / 1000, ease: 'linear' }}
            />
          )}

          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous screenshot"
            className="absolute start-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-all duration-200 hover:bg-black/70 focus-visible:opacity-100 sm:opacity-0 sm:group-hover/media:opacity-100"
          >
            <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
          </button>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next screenshot"
            className="absolute end-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-all duration-200 hover:bg-black/70 focus-visible:opacity-100 sm:opacity-0 sm:group-hover/media:opacity-100"
          >
            <ChevronRight className="h-4 w-4 rtl:rotate-180" />
          </button>

          <div className="absolute inset-x-0 bottom-3 z-20 flex items-center justify-center gap-1.5">
            {dots.map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => jumpTo(i)}
                aria-label={`Go to screenshot ${i + 1}`}
                aria-current={i === index}
                /* Visually a 3px bar; the target itself stays 24px tall. */
                className="flex h-6 items-center px-1.5"
              >
                <span
                  className={`block h-[3px] rounded-full transition-all duration-300 ${
                    i === index ? 'w-5 bg-white' : 'w-[3px] bg-white/45'
                  }`}
                />
              </button>
            ))}
          </div>

          <span className="pointer-events-none absolute end-3 top-3 z-20 bg-black/45 px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-white backdrop-blur-sm">
            {index + 1}/{total}
          </span>
        </>
      )}
    </div>
  );
}
