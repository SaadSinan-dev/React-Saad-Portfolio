import { motion, useReducedMotion } from 'framer-motion';
import { useLang } from '../../hooks/useLang';
import { personalInfo, principles } from '../../data/portfolio';
import { DUR, EASE, STAGGER, VIEWPORT, stagger, rise } from '../../lib/motion';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import ResumeLink from '../ui/ResumeLink';

function PrincipleRow({ item, position }) {
  const { t } = useLang();
  const reduced = useReducedMotion();

  return (
    <motion.li
      variants={rise(reduced, { y: 14 })}
      className="group flex items-baseline gap-5 border-b border-line py-4 sm:gap-8"
    >
      <span className="label tabular-nums transition-colors duration-300 group-hover:text-ink">
        {position}
      </span>
      <span className="text-lead text-muted transition-all duration-300 ease-out group-hover:text-ink motion-safe:group-hover:translate-x-1 rtl:motion-safe:group-hover:-translate-x-1">
        {t(item.en, item.ar)}
      </span>
    </motion.li>
  );
}

export default function About() {
  const { t } = useLang();
  const reduced = useReducedMotion();

  // The identity block: the same facts the old terminal printed, set as a spec
  // sheet instead of a simulated shell.
  const identity = [
    { keyEn: 'Name', keyAr: 'الاسم', valueEn: personalInfo.nameEn, valueAr: personalInfo.nameAr },
    {
      keyEn: 'Discipline',
      keyAr: 'التخصص',
      valueEn: personalInfo.roleEn,
      valueAr: personalInfo.roleAr,
    },
    {
      keyEn: 'Focus',
      keyAr: 'التركيز',
      valueEn: 'Web & cross-platform applications',
      valueAr: 'الويب والتطبيقات متعددة المنصات',
    },
    {
      keyEn: 'Status',
      keyAr: 'الحالة',
      valueEn: personalInfo.availableEn,
      valueAr: personalInfo.availableAr,
      signal: true,
    },
  ];

  return (
    <section id="about" className="relative z-10 py-section">
      <div className="shell">
        <SectionHeader
          index="01"
          label={t('About', 'عني')}
          lines={t(['Beyond the code'], ['ما وراء الكود'])}
        />

        {/* ── Lead statement ─────────────────────────────────────────────
            Set as a paragraph, not a masked heading: it is long enough that
            authored line breaks would fight the viewport. */}
        <Reveal
          as="p"
          className="headline max-w-[26ch] text-h2 font-normal sm:max-w-[30ch]"
        >
          {t(
            'Software Engineering student building considered experiences across web and mobile.',
            'طالب هندسة برمجيات أبني تجارب مدروسة للويب والموبايل.'
          )}
        </Reveal>

        <Reveal as="p" delay={0.15} className="mt-8 max-w-measure text-lead text-muted">
          {t(personalInfo.bioEn, personalInfo.bioAr)}
        </Reveal>

        {/* ── Principles / identity ──────────────────────────────────────── */}
        <div className="mt-12 grid gap-14 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-7">
            <Reveal className="label mb-6">{t('How I work', 'أسلوب العمل')}</Reveal>

            <motion.ul
              variants={stagger(reduced, { each: STAGGER.base })}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="border-t border-line"
            >
              {principles.map((item, i) => (
                <PrincipleRow
                  key={item.en}
                  item={item}
                  position={String(i + 1).padStart(2, '0')}
                />
              ))}
            </motion.ul>

            <Reveal delay={0.2}>
              <ResumeLink className="mt-8" />
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal className="label mb-6">{t('Identity', 'الهوية')}</Reveal>

            <motion.dl
              variants={stagger(reduced, { each: STAGGER.tight })}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="border-t border-line"
            >
              {identity.map((row) => (
                <motion.div
                  key={row.keyEn}
                  variants={rise(reduced, { y: 10, duration: DUR.md })}
                  className="flex items-baseline justify-between gap-4 border-b border-line py-3.5"
                >
                  <dt className="label">{t(row.keyEn, row.keyAr)}</dt>
                  <dd className="flex items-center gap-2 text-end text-sm">
                    {row.signal && (
                      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                    )}
                    <span className={row.signal ? 'text-signal' : 'text-ink'}>
                      {t(row.valueEn, row.valueAr)}
                    </span>
                  </dd>
                </motion.div>
              ))}
            </motion.dl>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: DUR.lg, ease: EASE.out, delay: 0.25 }}
              className="mt-6 font-mono text-meta leading-relaxed text-faint"
            >
              {t(
                `${personalInfo.location} — ${personalInfo.availableEn.toLowerCase()}.`,
                `${personalInfo.locationAr} — ${personalInfo.availableAr}.`
              )}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
