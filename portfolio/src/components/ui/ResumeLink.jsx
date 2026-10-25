import { useLang } from '../../hooks/useLang';
import { useSiteSettings } from '../../hooks/useSiteSettings';
import { Document, ArrowUpRight } from './Icons';
import { personalInfo } from '../../data/portfolio';

export default function ResumeLink({ className = '' }) {
  const { t } = useLang();
  const { cvUrl, cvAvailable, cvChecking, loading } = useSiteSettings();
  if (loading || cvChecking) return <span role="status" aria-live="polite" className={`btn btn-outline ${className}`}>{t('Checking CV…', 'جارٍ التحقق من السيرة الذاتية…')}</span>;
  if (!cvUrl || !cvAvailable) return <a href={`mailto:${personalInfo.email}?subject=${encodeURIComponent('CV request — Saad Sinan')}`} className={`btn btn-outline ${className}`} title={t('The public PDF is unavailable. Open an email to request the current CV.', 'ملف السيرة الذاتية غير متاح حالياً. افتح رسالة بريد لطلب النسخة الحالية.')}><Document className="h-4 w-4" />{cvUrl ? t('CV unavailable — email me', 'السيرة غير متاحة — راسلني') : t('Request CV by email', 'اطلب السيرة عبر البريد')}</a>;
  return <a href={cvUrl} target="_blank" rel="noopener noreferrer" className={`btn btn-outline ${className}`}><Document className="h-4 w-4" />{t('View / download CV', 'عرض / تنزيل السيرة الذاتية')}<ArrowUpRight className="h-4 w-4" /></a>;
}
