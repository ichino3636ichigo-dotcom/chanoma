import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore';
import { firebaseConfig } from '../firebaseConfig';

// 設定がまだ貼り付けられていない間は、ページ側で「準備中」を表示する
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId
);

let auth = null;
let db = null;

if (isFirebaseConfigured) {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  try {
    // 電波の弱い茶室でも書けるよう、端末内にも保存して後で同期する
    db = initializeFirestore(app, {
      localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
    });
  } catch {
    db = getFirestore(app);
  }
}

export const googleProvider = new GoogleAuthProvider();
export { auth, db };
