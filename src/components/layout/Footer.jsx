import { motion, useReducedMotion } from 'framer-motion';
import { useLang } from '../../hooks/useLang';
import { personalInfo } from '../../data/portfolio';
import { STAGGER, VIEWPORT, stagger, rise } from '../../lib/motion';
import { NAV_LINKS } from './Navbar';
import MaskHeading from '../ui/MaskHeading';
import Reveal from '../ui/Reveal';
import Magnetic from '../ui/Magnetic';
import { ArrowRight, ArrowUpRight, GitHub, LinkedIn, Mail } from '../ui/Icons';

const SOCIALS = [
  { label: 'GitHub', href: personalInfo.github, Icon: GitHub },
  { label: 'LinkedIn', href: personalInfo.linkedin, Icon: LinkedIn },
  { label: 'Email', href: `mailto:${personalInfo.email}`, Icon: Mail },
];

export default function Footer() {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-line pt-section">
      <div className="shell pb-28 sm:pb-12">
        {/* ── Closing statement ──────────────────────────────────────────── */}
        <div className="grid gap-10 pb-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal className="label mb-6">{t('Open to opportunities', 'متاح للفرص')}</Reveal>
            <MaskHeading
              as="h2"
              /* Short lines only — each one has to fit at 375px unbroken. */
              lines={t(
                ["Let's build", 'something', 'remarkable.'],
                ['لنبنِ شيئاً', 'استثنائياً.']
              )}
              className="headline text-h1"
            />
          </div>

          <Reveal delay={0.15} className="lg:col-span-4 lg:justify-self-end">
            <Magnetic>
              <a href={`mailto:${personalInfo.email}`} className="btn btn-solid group">
                {t('Start a project', 'ابدأ مشروعاً')}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </a>
            </Magnetic>
          </Reveal>
        </div>

        {/* ── Directory ──────────────────────────────────────────────────── */}
        <motion.div
          variants={stagger(reduced, { each: STAGGER.base })}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid gap-12 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-12"
        >
          <motion.div variants={rise(reduced, { y: 14 })} className="lg:col-span-5">
            <p className="text-sm font-semibold">{t(personalInfo.nameEn, personalInfo.nameAr)}</p>
            <p className="label mt-1.5">{t(personalInfo.titleEn, personalInfo.titleAr)}</p>
            <p className="mt-5 max-w-measure-tight text-sm text-muted">
              {t(personalInfo.taglineEn, personalInfo.taglineAr)}
            </p>
          </motion.div>

          <motion.nav
            variants={rise(reduced, { y: 14 })}
            aria-label={t('Footer navigation', 'روابط التذييل')}
            className="lg:col-span-3"
          >
            <p className="label mb-5">{t('Index', 'الفهرس')}</p>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="group inline-flex items-baseline gap-3 text-sm text-muted transition-colors duration-300 hover:text-ink"
                  >
                    <span className="font-mono text-[10px] tabular-nums text-faint">
                      {link.index}
                    </span>
                    <span className="link">{t(link.en, link.ar)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.div variants={rise(reduced, { y: 14 })} className="lg:col-span-4">
            <p className="label mb-5">{t('Connect', 'تواصل')}</p>
            <ul className="space-y-2.5">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={label === 'Email' ? undefined : '_blank'}
                    rel={label === 'Email' ? undefined : 'noreferrer noopener'}
                    className="group inline-flex items-center gap-3 text-sm text-muted transition-colors duration-300 hover:text-ink"
                  >
                    <Icon className="h-3.5 w-3.5 text-faint transition-colors duration-300 group-hover:text-ink" />
                    {label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* ── Colophon ───────────────────────────────────────────────────── */}
        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label">
            © {year} {t(personalInfo.nameEn, personalInfo.nameAr)}
          </p>

          <div className="flex items-center gap-6">
            <p className="label hidden md:block">React · Tailwind · Framer Motion</p>
            <a href="#home" className="label transition-colors duration-300 hover:text-ink">
              {t('Back to top ↑', 'العودة للأعلى ↑')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
