import { initializeApp, getApps, getApp } from 'firebase/app'
// import firebase from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import 'firebase/analytics';
// import 'firebase/auth';
// import 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

export const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY_ID,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com`,
    databaseURL: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
    storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com`,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
// if ( !firebase.getApps.length) {
//     firebase.initializeApp(firebaseConfig);
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
        // const app = firebase.getApp();
    getAnalytics(app);
}    
// }
// const auth = firebase.auth();
// const db = firebase.getFirestore();

export { auth, db };
export default app;