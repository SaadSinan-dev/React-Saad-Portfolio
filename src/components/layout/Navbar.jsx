import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { useLang } from '../../hooks/useLang';
import { DUR, EASE, SPRING } from '../../lib/motion';
import { Close, Menu, Moon, Sun } from '../ui/Icons';

export const NAV_LINKS = [
  { id: 'about', index: '01', en: 'About', ar: 'عني' },
  { id: 'stack', index: '02', en: 'Stack', ar: 'التقنيات' },
  { id: 'work', index: '03', en: 'Work', ar: 'الأعمال' },
  { id: 'contact', index: '04', en: 'Contact', ar: 'تواصل' },
];

const SECTION_IDS = ['home', ...NAV_LINKS.map((link) => link.id)];

/**
 * Tracks which section owns the viewport.
 *
 * A band across the middle of the screen decides the winner, so the indicator
 * changes at a predictable point rather than whenever a tall section's edge
 * happens to cross. IntersectionObserver means no scroll handler and no layout
 * reads.
 */
function useActiveSection() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const visible = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });
        // Keep document order so overlapping sections resolve to the topmost.
        const current = SECTION_IDS.find((id) => visible.has(id));
        if (current) setActive(current);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

function ThemeToggle({ isDark, setIsDark }) {
  const { t } = useLang();

  return (
    <button
      type="button"
      onClick={() => setIsDark((value) => !value)}
      aria-label={
        isDark ? t('Switch to light theme', 'التبديل للوضع الفاتح') : t('Switch to dark theme', 'التبديل للوضع الداكن')
      }
      aria-pressed={isDark}
      className="flex h-10 w-10 items-center justify-center border border-line text-muted transition-colors duration-300 hover:border-ink hover:text-ink sm:h-9 sm:w-9"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={{ opacity: 0, rotate: -45 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 45 }}
          transition={{ duration: DUR.xs, ease: EASE.out }}
          className="flex"
        >
          {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

function LangToggle() {
  const { lang, setLang } = useLang();
  const next = lang === 'en' ? 'ar' : 'en';

  return (
    <button
      type="button"
      onClick={() => setLang(next)}
      aria-label={`Switch to ${next === 'ar' ? 'Arabic' : 'English'}`}
      className="flex h-10 items-center gap-1.5 border border-line px-2.5 font-mono text-[11px] font-medium uppercase tracking-widest text-muted transition-colors duration-300 hover:border-ink hover:text-ink sm:h-9"
    >
      <span className={lang === 'en' ? 'text-ink' : ''}>EN</span>
      <span aria-hidden="true" className="text-line-strong">
        /
      </span>
      <span className={lang === 'ar' ? 'text-ink' : ''}>AR</span>
    </button>
  );
}

export default function Navbar({ isDark, setIsDark }) {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const active = useActiveSection();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (event) => event.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <motion.header
      initial={reduced ? false : { y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ...SPRING.glide, delay: 0.1 }}
      className={`fixed inset-x-0 top-0 z-nav border-b transition-colors duration-500 ${
        scrolled || menuOpen
          ? 'border-line bg-base/85 backdrop-blur-md supports-[backdrop-filter]:bg-base/70'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="shell flex h-[var(--nav-h)] items-center justify-between gap-6">
        {/* ── Wordmark ─────────────────────────────────────────────────── */}
        <a href="#home" className="group flex items-baseline gap-2.5" aria-label={t('Saad Sinan — home', 'سعد سنان — الرئيسية')}>
          <span className="text-sm font-semibold tracking-tight">Saad Sinan</span>
          <span className="hidden h-3 w-px bg-line-strong sm:block" aria-hidden="true" />
          <span className="label hidden sm:block">{t('Flutter Dev', 'مطور فلاتر')}</span>
        </a>

        {/* ── Desktop nav ──────────────────────────────────────────────── */}
        <nav aria-label={t('Sections', 'الأقسام')} className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={`group relative flex items-baseline gap-2 px-3 py-2 text-sm transition-colors duration-300 ${
                  isActive ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                <span className="font-mono text-[10px] tabular-nums text-faint transition-colors duration-300 group-hover:text-muted">
                  {link.index}
                </span>
                {t(link.en, link.ar)}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    aria-hidden="true"
                    className="absolute inset-x-3 -bottom-px h-px bg-ink"
                    transition={SPRING.snap}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* ── Controls ─────────────────────────────────────────────────── */}
        <div className="flex items-center gap-2">
          <LangToggle />
          <ThemeToggle isDark={isDark} setIsDark={setIsDark} />

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? t('Close menu', 'إغلاق القائمة') : t('Open menu', 'فتح القائمة')}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            /* Phones get the bottom bar instead — no duplicate navigation. */
            className="hidden h-9 w-9 items-center justify-center border border-line text-muted transition-colors duration-300 hover:border-ink hover:text-ink sm:flex lg:hidden"
          >
            {menuOpen ? <Close className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* ── Reading progress ───────────────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[-1px] h-px origin-left bg-ink"
        style={{ scaleX: progress, direction: 'ltr' }}
      />

      {/* ── Mobile sheet ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label={t('Sections', 'الأقسام')}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: DUR.md, ease: EASE.inOut }}
            className="overflow-hidden border-t border-line bg-base lg:hidden"
          >
            <ul className="shell py-2">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.045, duration: DUR.md, ease: EASE.out }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={closeMenu}
                    aria-current={active === link.id ? 'true' : undefined}
                    className={`flex items-baseline gap-4 border-b border-line py-4 transition-colors duration-300 ${
                      active === link.id ? 'text-ink' : 'text-muted'
                    }`}
                  >
                    <span className="label tabular-nums">{link.index}</span>
                    <span className="text-lead">{t(link.en, link.ar)}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
