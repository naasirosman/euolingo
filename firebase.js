// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEXfYBTdOc8C49Eun4PrtK1YsLsJnsfvs",
  authDomain: "euolingo-9215a.firebaseapp.com",
  projectId: "euolingo-9215a",
  storageBucket: "euolingo-9215a.appspot.com",
  messagingSenderId: "284012366137",
  appId: "1:284012366137:web:da1e54d8e8be0077b4c0e8",
  measurementId: "G-VKHMDKFV69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
