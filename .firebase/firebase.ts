// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAppCheck, initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getAnalytics } from "firebase/analytics";
import { getPerformance } from "firebase/performance";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8n_LRKPyXI3ZkMCs_2jPbVH9s1UKRb1g",
  authDomain: "uhspace-4c14a.firebaseapp.com",
  projectId: "uhspace-4c14a",
  storageBucket: "uhspace-4c14a.appspot.com",
  messagingSenderId: "849364322589",
  appId: "1:849364322589:web:b228ba440a3e00cb9739f4",
  measurementId: "G-LPW1RZT6RS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Conditionally initialize App Check in the browser only
if (typeof window !== 'undefined') {
    // Only run this code in the client environment
    if (process.env.NODE_ENV === 'production') {
        // Initialize App Check in production mode
        const appCheck = initializeAppCheck(app, {
            provider: new ReCaptchaV3Provider("6LcJWEQqAAAAAEfCiznvAGfn0VnjxawwpbDSdAYB"), // Use your site key here
            isTokenAutoRefreshEnabled: true, // Optional: enables token auto-refresh
        });
    } else {
        // Optionally log or handle development mode here
        console.log("App Check is disabled in development mode.");
    }
}

let analytics;
if (typeof window !== 'undefined') {
    // Ensure Analytics is only initialized in the client environment
    analytics = getAnalytics(app);
}

let perf;
if (typeof window !== 'undefined') {
   // Initialize Performance Monitoring and get a reference to the service
   perf = getPerformance(app);
}

// Initialize services
export const auth = getAuth(app);  // Exporting Firebase Authentication
export const firestore = getFirestore(app); // Export Firestore
export const storage = getStorage(app); // Export Firebase Storage
export { analytics, perf }; // Export Analytics if needed