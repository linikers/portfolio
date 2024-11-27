import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCjo2qckQOdWe9JDPwqxNTBvhpnHRzjbFM",
  authDomain: "portfoliolinikers.firebaseapp.com",
  projectId: "portfoliolinikers",
  storageBucket: "portfoliolinikers.firebasestorage.app",
  messagingSenderId: "537302382611",
  appId: "1:537302382611:web:40cd9a2390bf0ca76c27e6",
  measurementId: "G-DGMR5208SP"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);