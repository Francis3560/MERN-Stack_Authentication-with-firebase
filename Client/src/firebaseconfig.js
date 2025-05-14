import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCJgxeHXbY7xDRS61AhkuuW2BI1hfpuL7o",
  authDomain: "tweet-analytica.firebaseapp.com",
  projectId: "tweet-analytica",
  storageBucket: "tweet-analytica.firebasestorage.app",
  messagingSenderId: "642062098119",
  appId: "1:642062098119:web:942a39509d5be1e69468e2",
  measurementId: "G-E4RRW5LRPW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new TwitterAuthProvider();

export const signInWithTwitter = () => {
  return signInWithPopup(auth, provider);
};

export { app, auth, analytics };
