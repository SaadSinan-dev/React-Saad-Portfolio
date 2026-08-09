import { motion, useReducedMotion } from 'framer-motion';
import { useLang } from '../../hooks/useLang';
import { stackGroups, LEVELS } from '../../data/stack';
import { STAGGER, VIEWPORT, stagger, rise } from '../../lib/motion';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';

const TOTAL_ITEMS = stackGroups.reduce((sum, group) => sum + group.items.length, 0);

/**
 * Three segments, filled to the item's level. A quantity read at a glance,
 * with the word alongside it — no colour coding, no pill.
 */
function LevelMeter({ level }) {
  const { t } = useLang();
  const spec = LEVELS[level] ?? LEVELS.Intermediate;

  return (
    <span className="flex items-center justify-end gap-2.5">
      <span className="label whitespace-nowrap">{t(spec.en, spec.ar)}</span>
      <span
        className="flex shrink-0 gap-[3px]"
        role="img"
        aria-label={`${t(spec.en, spec.ar)} — ${spec.steps}/3`}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`h-[9px] w-[3px] transition-colors duration-300 ${
              i < spec.steps ? 'bg-ink' : 'bg-line-strong'
            }`}
          />
        ))}
      </span>
    </span>
  );
}

function StackRow({ item }) {
  const { t } = useLang();
  const reduced = useReducedMotion();

  return (
    <motion.div
      variants={rise(reduced, { y: 12 })}
      className="group grid grid-cols-1 items-baseline gap-x-6 gap-y-1 border-b border-line py-4 transition-colors duration-300 hover:bg-surface sm:grid-cols-12 sm:py-3.5"
    >
      <h4 className="text-sm font-medium sm:col-span-4 lg:col-span-3">
        <span className="inline-block transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-1 rtl:motion-safe:group-hover:-translate-x-1">
          {t(item.nameEn, item.nameAr)}
        </span>
      </h4>

      <p className="text-sm text-muted sm:col-span-5 lg:col-span-6">
        {t(item.descEn, item.descAr)}
      </p>

      <div className="mt-1 sm:col-span-3 sm:mt-0">
        <LevelMeter level={item.level} />
      </div>
    </motion.div>
  );
}

function StackGroup({ group }) {
  const { t } = useLang();
  const reduced = useReducedMotion();

  return (
    <motion.section
      variants={stagger(reduced, { each: STAGGER.tight })}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className="grid gap-x-10 gap-y-4 py-8 lg:grid-cols-12"
      aria-labelledby={`stack-${group.id}`}
    >
      <motion.header variants={rise(reduced, { y: 12 })} className="lg:col-span-3">
        <div className="flex items-baseline gap-3 lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
          <span className="label tabular-nums">{group.index}</span>
          <h3 id={`stack-${group.id}`} className="text-sm font-medium tracking-tight">
            {t(group.titleEn, group.titleAr)}
          </h3>
        </div>
      </motion.header>

      <div className="border-t border-line lg:col-span-9">
        {group.items.map((item) => (
          <StackRow key={item.nameEn} item={item} />
        ))}
      </div>
    </motion.section>
  );
}

export default function Stack() {
  const { t } = useLang();

  return (
    <section id="stack" className="relative z-10 py-section">
      <div className="shell">
        <SectionHeader
          index="02"
          label={t('Stack', 'التقنيات')}
          lines={t(['Technical index'], ['الفهرس التقني'])}
          description={t(
            'The tools I reach for, grouped by the part of the system they belong to.',
            'الأدوات التي أعمل بها، مرتّبة حسب موقعها في بنية التطبيق.'
          )}
        />

        <Reveal className="flex items-center justify-between border-y border-line py-3">
          <span className="label">
            {t(`${TOTAL_ITEMS} entries`, `${TOTAL_ITEMS} عنصراً`)}
          </span>
          <span className="label">
            {t(`${stackGroups.length} groups`, `${stackGroups.length} مجموعات`)}
          </span>
        </Reveal>

        <div className="divide-y divide-line">
          {stackGroups.map((group) => (
            <StackGroup key={group.id} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}
