import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import 'firebase/analytics';

export const firebaseConfig = {
    apiKey: "AIzaSyCjo2qckQOdWe9JDPwqxNTBvhpnHRzjbFM",
    authDomain: "portfoliolinikers.firebaseapp.com",
    projectId: "portfoliolinikers",
    storageBucket: "portfoliolinikers.firebasestorage.app",
    messagingSenderId: "537302382611",
    appId: "1:537302382611:web:40cd9a2390bf0ca76c27e6",
    measurementId: "G-DGMR5208SP"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    getAnalytics(app);
}    

export { auth, db };
export default app;