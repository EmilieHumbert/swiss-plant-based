import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_I,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const app = firebase.app();
const auth = firebase.auth();
const db = firebase.firestore();
const now = firebase.firestore.Timestamp.now();
const storage = firebase.storage();
export { auth, db, now, storage };
console.log(app.name ? 'Firebase Mode Activated!' : 'Firebase not working :(');
