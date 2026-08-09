import { motion, useReducedMotion } from 'framer-motion';
import { useLang } from '../../hooks/useLang';
import { personalInfo } from '../../data/portfolio';
import { STAGGER, VIEWPORT, stagger, rise } from '../../lib/motion';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import MaskHeading from '../ui/MaskHeading';
import { ArrowUpRight, GitHub, LinkedIn, Mail, WhatsApp } from '../ui/Icons';

/** Strips protocol and trailing slash so URLs read as plain handles. */
const asHandle = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

const CHANNELS = [
  {
    labelEn: 'Email',
    labelAr: 'البريد',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    Icon: Mail,
    external: false,
  },
  {
    labelEn: 'WhatsApp',
    labelAr: 'واتساب',
    value: personalInfo.whatsapp,
    href: `https://wa.me/${personalInfo.whatsapp.replace(/\D/g, '')}`,
    Icon: WhatsApp,
    external: true,
  },
  {
    labelEn: 'LinkedIn',
    labelAr: 'لينكد إن',
    value: asHandle(personalInfo.linkedin),
    href: personalInfo.linkedin,
    Icon: LinkedIn,
    external: true,
  },
  {
    labelEn: 'GitHub',
    labelAr: 'جيت هاب',
    value: asHandle(personalInfo.github),
    href: personalInfo.github,
    Icon: GitHub,
    external: true,
  },
];

function ChannelRow({ channel }) {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const { Icon, external } = channel;

  return (
    <motion.li variants={rise(reduced, { y: 12 })}>
      <a
        href={channel.href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer noopener' : undefined}
        className="group flex items-center gap-4 border-b border-line py-4 transition-colors duration-300 hover:border-ink"
      >
        <Icon className="h-4 w-4 shrink-0 text-faint transition-colors duration-300 group-hover:text-ink" />

        <span className="label w-24 shrink-0 transition-colors duration-300 group-hover:text-ink">
          {t(channel.labelEn, channel.labelAr)}
        </span>

        <span
          dir="ltr"
          className="flex-1 truncate text-start text-sm text-muted transition-all duration-300 ease-out group-hover:text-ink motion-safe:group-hover:translate-x-1 rtl:motion-safe:group-hover:-translate-x-1"
        >
          {channel.value}
        </span>

        <ArrowUpRight className="h-4 w-4 shrink-0 text-faint opacity-0 transition-all duration-300 ease-out group-hover:opacity-100 motion-safe:group-hover:-translate-y-0.5" />
      </a>
    </motion.li>
  );
}

export default function Contact() {
  const { t } = useLang();
  const reduced = useReducedMotion();

  return (
    <section id="contact" className="relative z-10 py-section">
      <div className="shell">
        <SectionHeader
          index="04"
          label={t('Contact', 'تواصل')}
          lines={t(['Get in touch'], ['ابدأ التواصل'])}
          description={t(
            "Have a project in mind or want to collaborate? I'd love to hear from you.",
            'هل لديك مشروع أو تريد التعاون؟ أنا هنا للاستماع.'
          )}
        />

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-x-10">
          {/* ── Direct line ────────────────────────────────────────────── */}
          <div className="lg:col-span-7">
            <Reveal className="label mb-5">{t('Write to me', 'راسلني')}</Reveal>

            <a
              href={`mailto:${personalInfo.email}`}
              dir="ltr"
              className="group block w-fit max-w-full"
            >
              <MaskHeading
                as="span"
                lines={[personalInfo.email]}
                className="headline block break-words text-[clamp(1.35rem,4.4vw,2.75rem)] leading-tight"
              />
              <span
                aria-hidden="true"
                className="mt-2 block h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
            </a>

            <motion.dl
              variants={stagger(reduced, { each: STAGGER.base, delay: 0.15 })}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="mt-12 max-w-md"
            >
              <motion.div
                variants={rise(reduced, { y: 12 })}
                className="flex items-center justify-between gap-4 border-b border-line py-3"
              >
                <dt className="label">{t('Availability', 'التوفر')}</dt>
                <dd className="flex items-center gap-2 text-sm text-signal">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-signal" />
                  {t('Currently available for new projects', 'متاح حالياً لمشاريع جديدة')}
                </dd>
              </motion.div>

              <motion.div
                variants={rise(reduced, { y: 12 })}
                className="flex items-center justify-between gap-4 border-b border-line py-3"
              >
                <dt className="label">{t('Response', 'الرد')}</dt>
                <dd className="text-sm text-muted">
                  {t('Usually within 24 hours', 'عادةً خلال 24 ساعة')}
                </dd>
              </motion.div>

              <motion.div
                variants={rise(reduced, { y: 12 })}
                className="flex items-center justify-between gap-4 border-b border-line py-3"
              >
                <dt className="label">{t('Located', 'المقر')}</dt>
                <dd className="text-sm text-muted">
                  {t(personalInfo.location, personalInfo.locationAr)}
                </dd>
              </motion.div>
            </motion.dl>
          </div>

          {/* ── Channels ───────────────────────────────────────────────── */}
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal className="label mb-5">{t('Elsewhere', 'قنوات أخرى')}</Reveal>

            <motion.ul
              variants={stagger(reduced, { each: STAGGER.base })}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="border-t border-line"
            >
              {CHANNELS.map((channel) => (
                <ChannelRow key={channel.labelEn} channel={channel} />
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
