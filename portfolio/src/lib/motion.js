/**
 * Motion system.
 *
 * Every animated value in the site resolves from these tokens — no ad-hoc
 * durations or easings in components. The rules:
 *
 *   · Only `transform` and `opacity` animate (compositor-only, no reflow).
 *   · Entrances move a short distance quickly; exits are shorter still.
 *   · Staggers are small enough to read as one gesture, not a queue.
 *   · Every variant factory takes `reduced` and collapses to a plain fade
 *     (or nothing) when the user has asked for less motion.
 */

// ─── Easing ───────────────────────────────────────────────────────────────────
// `out` is the house curve: fast departure, long settle. `inOut` is reserved
// for elements that both arrive and leave (modals, drawers).
export const EASE = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.76, 0, 0.24, 1],
  soft: [0.33, 1, 0.68, 1],
};

// ─── Duration (seconds) ───────────────────────────────────────────────────────
export const DUR = {
  xs: 0.16,
  sm: 0.26,
  md: 0.46,
  lg: 0.76,
  xl: 1.1,
};

// ─── Stagger (seconds between children) ───────────────────────────────────────
export const STAGGER = {
  tight: 0.035,
  base: 0.06,
  loose: 0.1,
};

// ─── Springs ──────────────────────────────────────────────────────────────────
export const SPRING = {
  /** UI that must feel immediate: toggles, active indicators. */
  snap: { type: 'spring', stiffness: 420, damping: 34, mass: 0.7 },
  /** Larger travel: panels, cursor ring, magnetic pull. */
  glide: { type: 'spring', stiffness: 200, damping: 26, mass: 0.9 },
  /** Heavy surfaces: modal sheets. */
  sheet: { type: 'spring', stiffness: 260, damping: 32, mass: 1 },
};

// ─── Scroll trigger ───────────────────────────────────────────────────────────
/** Fires once, slightly before the element is fully on screen. */
export const VIEWPORT = { once: true, margin: '0px 0px -12% 0px' };

// ═══════════════════════════════════════════════════════════════════════════
// Variants
// ═══════════════════════════════════════════════════════════════════════════

/** Vertical rise. The workhorse for blocks of content. */
export const rise = (reduced, { y = 20, duration = DUR.lg, delay = 0 } = {}) => ({
  hidden: { opacity: 0, y: reduced ? 0 : y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: reduced ? DUR.sm : duration, ease: EASE.out, delay },
  },
});

/**
 * Line mask: the child slides up from behind a clipped edge. Used for
 * headings, where each line is wrapped in `.mask`.
 */
export const maskLine = (reduced, { duration = DUR.xl, delay = 0 } = {}) => ({
  hidden: { y: reduced ? 0 : '110%', opacity: reduced ? 0 : 1 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: reduced ? DUR.sm : duration, ease: EASE.out, delay },
  },
});

/** Horizontal entry — respects reading direction. */
export const slideIn = (reduced, { x = 16, duration = DUR.md, delay = 0 } = {}) => ({
  hidden: { opacity: 0, x: reduced ? 0 : x },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: reduced ? DUR.sm : duration, ease: EASE.out, delay },
  },
});

export const fade = (reduced, { duration = DUR.md, delay = 0 } = {}) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: reduced ? DUR.sm : duration, ease: EASE.out, delay },
  },
});

/** A rule that draws itself along the inline axis. */
export const drawRule = (reduced, { duration = DUR.xl, delay = 0 } = {}) => ({
  hidden: { scaleX: reduced ? 1 : 0, opacity: reduced ? 0 : 1 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: reduced ? DUR.sm : duration, ease: EASE.out, delay },
  },
});

/** Parent orchestrator. Children opt in by declaring `hidden`/`visible`. */
export const stagger = (reduced, { each = STAGGER.base, delay = 0 } = {}) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: reduced ? 0 : each,
      delayChildren: reduced ? 0 : delay,
    },
  },
});
