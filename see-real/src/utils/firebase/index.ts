// Import the functions you need from the SDKs you need
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig:FirebaseOptions = {
  apiKey: "AIzaSyDVTe68PNDIXVnFHozWi6mzUu0l5FRPZ6w",
  authDomain: "rss2024-6bba2.firebaseapp.com",
  projectId: "rss2024-6bba2",
  storageBucket: "rss2024-6bba2.appspot.com",
  messagingSenderId: "256846983417",
  appId: "1:256846983417:web:f2a40f4caca0737cb23228",
  measurementId: "G-JG2NV7LHYC"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

export const messaging = () => getMessaging(firebaseapp);

export default firebaseapp;