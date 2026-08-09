import { useSyncExternalStore } from 'react';

/**
 * Subscribes to a media query without re-render churn.
 * `useSyncExternalStore` keeps the value consistent across concurrent renders
 * and gives us a correct server/first-paint value for free.
 */
export function useMediaQuery(query) {
  const subscribe = (onChange) => {
    const mql = window.matchMedia(query);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  };

  const getSnapshot = () => window.matchMedia(query).matches;

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/**
 * True only for devices with a precise pointer that can hover — the gate for
 * every cursor-driven interaction (custom cursor, magnetic pull, hover previews).
 */
export function usePointerFine() {
  return useMediaQuery('(hover: hover) and (pointer: fine)');
}
