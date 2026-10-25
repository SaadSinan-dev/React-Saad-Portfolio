import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { publicSettings } from './settingsMapper';

const SITE_COLLECTION = 'site';
const PUBLIC_SETTINGS_DOCUMENT = 'public';
const EMPTY_SETTINGS = { profileImageUrl: '', cvUrl: '' };

export function subscribeSiteSettings(onData, onError) {
  if (!db) {
    onData(EMPTY_SETTINGS);
    return () => {};
  }

  return onSnapshot(
    doc(db, SITE_COLLECTION, PUBLIC_SETTINGS_DOCUMENT),
    (snapshot) => {
      if (!snapshot.exists()) {
        onData(EMPTY_SETTINGS);
        return;
      }

      const data = snapshot.data();
      onData(publicSettings(data));
    },
    onError
  );
}
