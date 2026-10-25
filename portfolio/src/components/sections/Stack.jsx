import { useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLang } from '../../hooks/useLang';
import { LEVELS, STACK_TABS, stackCategories } from '../../data/stack';
import { DUR, EASE } from '../../lib/motion';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';

function countSkills(category) {
  return category.core.length + category.groups.reduce((sum, group) => sum + group.items.length, 0);
}

function LevelLabel({ level }) {
  const { t } = useLang();
  const spec = level ? LEVELS[level] : null;

  if (!spec) return null;

  return <span className="label whitespace-nowrap">{t(spec.en, spec.ar)}</span>;
}

function CoreSkill({ item, index }) {
  const { t } = useLang();

  return (
    <article className="group border-t border-line py-6 sm:py-7">
      <div className="mb-5 flex items-start justify-between gap-4">
        <span className="label tabular-nums">{String(index + 1).padStart(2, '0')}</span>
        <LevelLabel level={item.level} />
      </div>

      <h4 className="text-[clamp(1.35rem,2.2vw,2rem)] font-medium leading-none tracking-tight">
        <span className="inline-block transition-transform duration-300 ease-out motion-safe:group-hover:-translate-y-0.5">
          {t(item.nameEn, item.nameAr)}
        </span>
      </h4>
      <p className="mt-3 max-w-measure-tight text-sm text-muted">
        {t(item.descEn, item.descAr)}
      </p>
    </article>
  );
}

function SkillRow({ item }) {
  const { t } = useLang();
  const hasLevel = Boolean(item.level);

  return (
    <div className="group grid grid-cols-1 items-baseline gap-x-6 gap-y-1 border-b border-line py-4 transition-colors duration-300 hover:bg-surface sm:grid-cols-12 sm:py-3.5">
      <h4 className={`text-sm font-medium ${hasLevel ? 'sm:col-span-4 lg:col-span-3' : 'sm:col-span-4'}`}>
        <span className="inline-block transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-1 rtl:motion-safe:group-hover:-translate-x-1">
          {t(item.nameEn, item.nameAr)}
        </span>
      </h4>

      <p className={`text-sm text-muted ${hasLevel ? 'sm:col-span-5 lg:col-span-6' : 'sm:col-span-8'}`}>
        {t(item.descEn, item.descAr)}
      </p>

      {hasLevel && (
        <div className="mt-1 sm:col-span-3 sm:mt-0 sm:text-end">
          <LevelLabel level={item.level} />
        </div>
      )}
    </div>
  );
}

function SkillGroup({ group }) {
  const { t } = useLang();

  return (
    <section
      className="grid gap-x-10 gap-y-4 py-8 lg:grid-cols-12"
      aria-labelledby={`stack-${group.id}`}
    >
      <header className="lg:col-span-3">
        <div className="flex items-baseline gap-3 lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
          <span className="label tabular-nums">{group.index}</span>
          <h3 id={`stack-${group.id}`} className="text-sm font-medium tracking-tight">
            {t(group.titleEn, group.titleAr)}
          </h3>
        </div>
      </header>

      <div className="border-t border-line lg:col-span-9">
        {group.items.map((item) => (
          <SkillRow key={item.nameEn} item={item} />
        ))}
      </div>
    </section>
  );
}

export default function Stack() {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState('web');
  const tabRefs = useRef([]);

  const category = stackCategories[activeCategory];
  const totalSkills = countSkills(category);

  const selectCategory = useCallback((id) => {
    setActiveCategory(id);
  }, []);

  const handleTabKeyDown = useCallback((event, index) => {
    let nextIndex = null;

    if (event.key === 'ArrowRight') nextIndex = (index + 1) % STACK_TABS.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + STACK_TABS.length) % STACK_TABS.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = STACK_TABS.length - 1;

    if (nextIndex === null) return;

    event.preventDefault();
    const nextCategory = STACK_TABS[nextIndex].id;
    selectCategory(nextCategory);
    tabRefs.current[nextIndex]?.focus();
  }, [selectCategory]);

  return (
    <section id="stack" className="relative z-10 py-section">
      <div className="shell">
        <SectionHeader
          index="02"
          label={t('Stack', 'التقنيات')}
          lines={t(['Technical capability,', 'curated by discipline.'], ['قدرات تقنية،', 'مرتّبة حسب التخصص.'])}
          description={t(
            'A focused view of the technologies and engineering practices I use across full-stack web and mobile product development.',
            'عرض مركز للتقنيات والممارسات الهندسية التي أستخدمها في تطوير منتجات الويب المتكاملة وتطبيقات الموبايل.'
          )}
        />

        <Reveal
          role="tablist"
          aria-label={t('Stack categories', 'فئات التقنيات')}
          className="mb-8 flex items-center gap-6 border-b border-line sm:mb-10"
        >
          {STACK_TABS.map((tab, index) => {
            const active = activeCategory === tab.id;

            return (
              <button
                key={tab.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                id={`stack-tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={`stack-panel-${tab.id}`}
                tabIndex={active ? 0 : -1}
                onClick={() => selectCategory(tab.id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className={`label relative min-h-11 py-3 transition-colors duration-300 hover:text-ink ${
                  active ? 'label-ink' : ''
                }`}
              >
                {t(tab.labelEn, tab.labelAr)}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-px h-px origin-center bg-ink transition-transform duration-300 ${
                    active ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            );
          })}
        </Reveal>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeCategory}
            id={`stack-panel-${activeCategory}`}
            role="tabpanel"
            aria-labelledby={`stack-tab-${activeCategory}`}
            tabIndex={0}
            initial={{ opacity: 0, y: reduced ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -6 }}
            transition={{ duration: reduced ? DUR.xs : DUR.sm, ease: EASE.out }}
          >
            <div className="grid gap-x-10 gap-y-5 border-y border-line py-6 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-3">
                <span className="label label-ink">
                  {t(activeCategory === 'web' ? 'Web' : 'Mobile', activeCategory === 'web' ? 'ويب' : 'موبايل')}
                </span>
              </div>

              <div className="lg:col-span-5">
                <h3 className="text-h3 font-medium tracking-tight">
                  {t(category.titleEn, category.titleAr)}
                </h3>
              </div>

              <div className="lg:col-span-4 lg:text-end">
                <span className="label">
                  {t(
                    `${totalSkills} capabilities · ${category.groups.length} specialist groups`,
                    `${totalSkills} قدرة · ${category.groups.length} مجموعات تخصصية`
                  )}
                </span>
              </div>
            </div>

            <div className="grid gap-x-10 gap-y-6 py-10 lg:grid-cols-12 lg:items-start lg:py-12">
              <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:col-span-3 lg:self-start">
                <span className="label label-ink">{t('Core capabilities', 'القدرات الأساسية')}</span>
                <p className="mt-4 max-w-measure-tight text-sm text-muted">
                  {t(category.descriptionEn, category.descriptionAr)}
                </p>
              </div>

              <div className="grid gap-x-8 md:grid-cols-2 lg:col-span-9">
                {category.core.map((item, index) => (
                  <CoreSkill key={item.nameEn} item={item} index={index} />
                ))}
              </div>
            </div>

            <div className="border-t border-line pt-8">
              <div className="flex flex-wrap items-baseline justify-between gap-4 pb-2">
                <span className="label label-ink">{t('Specialized', 'تخصصات داعمة')}</span>
                <span className="label">{t('Supporting skills', 'مهارات داعمة')}</span>
              </div>

              <div className="divide-y divide-line">
                {category.groups.map((group) => (
                  <SkillGroup key={group.id} group={group} />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
