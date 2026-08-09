import { useEffect, useState } from 'react';

const STORAGE_KEY = 'portfolio-theme';

/**
 * Theme state, persisted and reflected on <html> as the `dark` class.
 *
 * The initial value is read from the class the inline script in index.html has
 * already applied, so the hook agrees with the painted page and there is no
 * flash on hydration.
 */
export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    try {
      localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
    } catch {
      /* private mode — the theme simply won't persist */
    }
  }, [isDark]);

  return [isDark, setIsDark];
}
