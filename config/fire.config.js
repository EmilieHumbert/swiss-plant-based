import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

export const firebaseConfig = global.Cypress
 ? {
  apiKey: global.Cypress.env('NEXT_PUBLIC_FIREBASE_API_KEY'),
  authDomain: global.Cypress.env('NEXT_PUBLIC_FIREBASE_AUTHDOMAIN'),
  projectId: global.Cypress.env('NEXT_PUBLIC_FIREBASE_PROJECT_ID'),
  storageBucket: global.Cypress.env('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: global.Cypress.env('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'),
  appId: global.Cypress.env('NEXT_PUBLIC_FIREBASE_APP_ID'),
  measurementId: global.Cypress.env('NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID'),
 }
 : {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const app = firebase.app();
const auth = firebase.auth();
const now = firebase.firestore.Timestamp.now();
const storage = firebase.storage();
const credential = firebase.auth.EmailAuthProvider.credential;
export { auth, now, storage, credential };
console.log(app.name ? "Firebase Mode Activated!" : "Firebase not working :(");
