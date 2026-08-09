import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'portfolio-lang';
const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* private mode — language simply won't persist */
    }
  }, [lang]);

  /** Picks the value for the active language. Works for any type, not just strings. */
  const t = useCallback((en, ar) => (lang === 'ar' ? ar : en), [lang]);

  const value = useMemo(
    () => ({ lang, setLang, t, isRTL: lang === 'ar' }),
    [lang, t]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) throw new Error('useLang must be used within <LangProvider>');
  return context;
}
