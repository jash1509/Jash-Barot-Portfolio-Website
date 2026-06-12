import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// All three required keys must be present for Firebase to work
const missingKeys = ['apiKey', 'projectId', 'appId'].filter((k) => !firebaseConfig[k]);
const isFirebaseConfigured = missingKeys.length === 0;

if (!isFirebaseConfigured) {
  console.warn(
    '[Firebase] Missing required environment variables:',
    missingKeys.map((k) => `VITE_FIREBASE_${k.replace(/([A-Z])/g, '_$1').toUpperCase()}`).join(', '),
    '\nMake sure these are set in your Vercel project settings under Settings → Environment Variables.'
  );
}

let app;
let db;
let auth;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    console.log('[Firebase] Initialized successfully. Project:', firebaseConfig.projectId);
  } catch (error) {
    console.error('[Firebase] Initialization failed:', error);
  }
}

export { db, auth };
// dbActive is true only when Firebase initialized without errors
export const dbActive = !!(db);
export default app;
