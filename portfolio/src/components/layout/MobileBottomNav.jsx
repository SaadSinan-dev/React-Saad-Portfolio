import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLang } from '../../hooks/useLang';
import { SPRING } from '../../lib/motion';
import { Grid, Home, Layers, Mail, Person } from '../ui/Icons';

const ITEMS = [
  { id: 'home', Icon: Home, en: 'Home', ar: 'الرئيسية' },
  { id: 'about', Icon: Person, en: 'About', ar: 'عني' },
  { id: 'stack', Icon: Layers, en: 'Stack', ar: 'التقنيات' },
  { id: 'work', Icon: Grid, en: 'Work', ar: 'الأعمال' },
  { id: 'contact', Icon: Mail, en: 'Contact', ar: 'تواصل' },
];

const IDS = ITEMS.map((item) => item.id);

/**
 * Thumb-reachable navigation for phones only — the header's menu button takes
 * over from `sm` up, so the two never appear together.
 */
export default function MobileBottomNav() {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const [active, setActive] = useState('home');

  useEffect(() => {
    const visible = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });
        const current = IDS.find((id) => visible.has(id));
        if (current) setActive(current);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label={t('Section navigation', 'التنقل بين الأقسام')}
      className="fixed inset-x-0 bottom-0 z-nav border-t border-line bg-base/90 backdrop-blur-md sm:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="flex">
        {ITEMS.map(({ id, Icon, en, ar }) => {
          const isActive = active === id;
          return (
            <li key={id} className="flex-1">
              <a
                href={`#${id}`}
                aria-current={isActive ? 'true' : undefined}
                className={`relative flex h-14 flex-col items-center justify-center gap-1 transition-colors duration-300 ${
                  isActive ? 'text-ink' : 'text-faint'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="bottom-nav-indicator"
                    aria-hidden="true"
                    className="absolute inset-x-4 top-0 h-px bg-ink"
                    transition={reduced ? { duration: 0 } : SPRING.snap}
                  />
                )}
                <Icon className="h-[18px] w-[18px]" />
                <span className="font-mono text-[9px] uppercase tracking-wider">{t(en, ar)}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
