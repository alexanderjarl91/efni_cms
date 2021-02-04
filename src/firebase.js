import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyB_aN3ousoDrcg6VmXR6DzKe9SOCZvk56Q",
//   authDomain: "efni-cms.firebaseapp.com",
//   projectId: "efni-cms",
//   storageBucket: "efni-cms.appspot.com",
//   messagingSenderId: "47309262747",
//   appId: "1:47309262747:web:3439cc6d4a9be2c4051b3e",
//   measurementId: "G-BKG324Y7C0",
// };

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const fire = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();

export default fire;
