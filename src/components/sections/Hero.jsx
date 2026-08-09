import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useLang } from '../../hooks/useLang';
import { personalInfo, heroFacts } from '../../data/portfolio';
import { DUR, EASE, STAGGER, stagger, rise, fade } from '../../lib/motion';
import MaskHeading from '../ui/MaskHeading';
import Magnetic from '../ui/Magnetic';
import { ArrowRight, ArrowDown, FlutterMark } from '../ui/Icons';
import profileImage from '../../assets/profile.png';

const ROLES = {
  en: [
    'Junior Flutter Engineer',
    'Mobile Systems Architect',
    'Software Engineering Student',
    'Scalable Architecture',
  ],
  ar: ['مهندس تطبيقات فلاتر', 'معماري أنظمة موبايل', 'طالب هندسة برمجيات', 'بنية قابلة للتوسع'],
};

const ROLE_INTERVAL = 2600;

/**
 * Rolls through the role list on a fixed cadence. Replaces the previous
 * character-by-character typewriter: same information, one composited
 * transform per change instead of a re-render per keystroke.
 */
function RoleTicker({ roles }) {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), ROLE_INTERVAL);
    return () => clearInterval(id);
  }, [roles.length, reduced]);

  return (
    <span className="mask inline-flex h-[1.4em] items-center align-bottom">
      <motion.span
        key={index}
        initial={reduced ? false : { y: '100%' }}
        animate={{ y: '0%' }}
        transition={{ duration: DUR.lg, ease: EASE.out }}
        className="block"
      >
        {roles[index]}
      </motion.span>
    </span>
  );
}

/** Registration marks at the plate corners — a print convention, not decoration. */
function CornerTicks() {
  const corners = ['start-0 top-0', 'end-0 top-0', 'start-0 bottom-0', 'end-0 bottom-0'];
  return (
    <>
      {corners.map((position) => (
        <span
          key={position}
          aria-hidden="true"
          className={`absolute ${position} h-3 w-3 border-ink/25 ${
            position.includes('top') ? 'border-t' : 'border-b'
          } ${position.includes('start') ? 'border-s' : 'border-e'}`}
        />
      ))}
    </>
  );
}

export default function Hero() {
  const { t, lang, isRTL } = useLang();
  const reduced = useReducedMotion();
  const plateRef = useRef(null);

  // Portrait drifts slightly slower than the page — depth without a scroll library.
  const { scrollYProgress } = useScroll({
    target: plateRef,
    offset: ['start end', 'end start'],
  });
  const plateY = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-4%', '6%']);

  return (
    <section
      id="home"
      className="relative z-10 flex min-h-[100svh] flex-col justify-center pb-20 pt-[calc(var(--nav-h)+3rem)]"
    >
      <div className="shell w-full">
        <div className="grid gap-y-14 lg:grid-cols-12 lg:gap-x-10">
          {/* ── Statement ───────────────────────────────────────────────── */}
          <div className="lg:col-span-7">
            <motion.div
              variants={stagger(reduced, { each: STAGGER.base })}
              initial="hidden"
              animate="visible"
              className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2"
            >
              <motion.span variants={fade(reduced)} className="label flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  {!reduced && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
                  )}
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
                </span>
                {t(personalInfo.availableEn, personalInfo.availableAr)}
              </motion.span>

              <motion.span variants={fade(reduced)} className="label">
                {t(personalInfo.location, personalInfo.locationAr)}
              </motion.span>
            </motion.div>

            <MaskHeading
              as="h1"
              animate="mount"
              delay={0.1}
              lines={t(['Saad Sinan'], ['سعد سنان'])}
              className="display text-display"
            />

            <motion.div
              variants={stagger(reduced, { each: STAGGER.base, delay: 0.5 })}
              initial="hidden"
              animate="visible"
              className="mt-8"
            >
              <motion.div
                variants={rise(reduced, { y: 14 })}
                /* Wraps rather than overflows: below `sm` the ticker takes its
                   own line instead of competing with the role for width. */
                className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line pt-5"
              >
                <FlutterMark className="h-3.5 w-3.5 shrink-0 text-faint" />
                <h2 className="text-[clamp(1.25rem,2vw,1.75rem)] font-medium leading-tight">
                  {t(personalInfo.titleEn, personalInfo.titleAr)}
                </h2>
                <span aria-hidden="true" className="hidden h-4 w-px bg-line-strong sm:block" />
                <p className="w-full font-mono text-meta text-muted sm:w-auto" aria-live="off">
                  <RoleTicker roles={ROLES[lang] ?? ROLES.en} />
                </p>
              </motion.div>

              <motion.p
                variants={rise(reduced, { y: 14 })}
                className="mt-7 max-w-measure text-lead text-muted"
              >
                {t(personalInfo.bioEn, personalInfo.bioAr)}
              </motion.p>

              <motion.div
                variants={rise(reduced, { y: 14 })}
                className="mt-10 flex flex-wrap items-center gap-3"
              >
                <Magnetic>
                  <a href="#work" className="btn btn-solid group">
                    {t('Selected work', 'الأعمال المختارة')}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </a>
                </Magnetic>

                <Magnetic>
                  <a href="#contact" className="btn btn-outline">
                    {t('Get in touch', 'تواصل معي')}
                  </a>
                </Magnetic>
              </motion.div>
            </motion.div>
          </div>

          {/* ── Portrait plate + spec facts ─────────────────────────────── */}
          <motion.div
            ref={plateRef}
            variants={stagger(reduced, { each: STAGGER.base, delay: 0.35 })}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 lg:col-start-8 lg:pt-16 xl:col-span-4 xl:col-start-9"
          >
            <motion.figure variants={fade(reduced)} className="group max-w-[19rem] lg:ms-auto">
              <div className="relative border border-line bg-surface p-2 transition-colors duration-500 ease-out group-hover:border-line-strong">
                <div className="portrait-mount relative aspect-[4/5] overflow-hidden bg-graphite-200 dark:bg-graphite-900">
                  {/* Hover scale lives on this wrapper rather than the image:
                      Framer owns the image's inline `transform`, so a utility
                      class there would be overwritten on every frame. */}
                  <div className="h-full w-full transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]">
                    <motion.img
                      src={profileImage}
                      alt={`${personalInfo.nameEn} — portrait`}
                      width={640}
                      height={800}
                      /* Lowercase: React 18 passes unknown camelCase props through
                         with a warning, but not this attribute correctly. */
                      fetchpriority="high"
                      decoding="async"
                      className="portrait-plate h-full w-full object-cover object-top"
                      // Scale lives here, not in a class: Framer writes `transform`
                      // inline, which would override a Tailwind scale utility.
                      style={{ y: plateY, scale: 1.08 }}
                      initial={reduced ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
                      animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                      transition={{ duration: 1.2, ease: EASE.out, delay: 0.45 }}
                    />
                  </div>
                </div>
                <CornerTicks />
              </div>

              <figcaption className="label mt-3 leading-relaxed transition-colors duration-300 ease-out group-hover:text-muted">
                {t(personalInfo.taglineEn, personalInfo.taglineAr)}
              </figcaption>
            </motion.figure>

            <motion.dl
              variants={fade(reduced)}
              className="mt-10 max-w-[19rem] border-t border-line lg:ms-auto"
            >
              {heroFacts.map((fact) => (
                <div
                  key={fact.keyEn}
                  className="group/fact flex items-baseline justify-between gap-4 border-b border-line py-2.5 transition-colors duration-300 ease-out hover:border-line-strong"
                >
                  <dt className="label transition-colors duration-300 ease-out group-hover/fact:text-ink">
                    {t(fact.keyEn, fact.keyAr)}
                  </dt>
                  <dd className="text-end font-mono text-meta text-ink">
                    {t(fact.valueEn, fact.valueAr)}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll cue ────────────────────────────────────────────────────── */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: DUR.lg }}
        className="shell mt-16 hidden items-center gap-3 text-faint transition-colors duration-300 hover:text-ink lg:flex"
        aria-label={t('Scroll to about', 'انتقل إلى نبذة عني')}
      >
        <span className="label">{t('Scroll', 'مرّر')}</span>
        <motion.span
          animate={reduced ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
