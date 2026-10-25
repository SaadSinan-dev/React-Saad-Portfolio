import { createContext, useContext, useEffect, useState } from 'react';
import { subscribeSiteSettings } from '../services/site/siteSettingsService';
import { checkCvDelivery } from '../services/site/cvDelivery';

const SettingsContext = createContext({ profileImageUrl: '', cvUrl: '', loading: true, error: false });
export function SiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState({ profileImageUrl: '', cvUrl: '', loading: true, error: false });
  const [delivery, setDelivery] = useState({ url: '', available: false, reason: '' });
  const [deliveryAttempt, setDeliveryAttempt] = useState(0);
  useEffect(() => subscribeSiteSettings(
    data => setSettings({ ...data, loading: false, error: false }),
    () => setSettings(current => ({ ...current, loading: false, error: true }))
  ), []);
  useEffect(() => {
    const retry = () => setDeliveryAttempt(value => value + 1);
    window.addEventListener('online', retry);
    window.addEventListener('focus', retry);
    return () => {
      window.removeEventListener('online', retry);
      window.removeEventListener('focus', retry);
    };
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    if (settings.cvUrl) checkCvDelivery(settings.cvUrl, { signal: controller.signal }).then(result => {
      if (!controller.signal.aborted) setDelivery({ url: settings.cvUrl, ...result });
    });
    return () => controller.abort();
  }, [settings.cvUrl, deliveryAttempt]);
  return <SettingsContext.Provider value={{ ...settings, cvAvailable: delivery.url === settings.cvUrl && delivery.available, cvChecking: Boolean(settings.cvUrl && delivery.url !== settings.cvUrl), cvDeliveryReason: delivery.url === settings.cvUrl ? delivery.reason : '' }}>{children}</SettingsContext.Provider>;
}
export const useSiteSettings = () => useContext(SettingsContext);
