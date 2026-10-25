import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db, isFirebaseConfigured } from '../firebase/config';

export function subscribeAuth(callback) {
  if (!isFirebaseConfigured || !auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

export async function signInAdmin(email, password) {
  if (!auth || !db) throw new Error('Firebase is not configured.');
  const credential = await signInWithEmailAndPassword(auth, email, password);
  const roleSnapshot = await getDoc(doc(db, 'users', credential.user.uid));

  if (!roleSnapshot.exists() || roleSnapshot.data().role !== 'admin') {
    await signOut(auth);
    throw new Error('This account is not authorized for the admin dashboard.');
  }

  return credential.user;
}

export async function getAdminRole(user) {
  if (!user || !db) return false;
  const roleSnapshot = await getDoc(doc(db, 'users', user.uid));
  return roleSnapshot.exists() && roleSnapshot.data().role === 'admin';
}

export async function signOutAdmin() {
  if (auth) await signOut(auth);
}
