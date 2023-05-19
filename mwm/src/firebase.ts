// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUSxQql_5xlhIWDVsOTQhIjy4cClqzTIs",
  authDomain: "mwm-mozi.firebaseapp.com",
  projectId: "mwm-mozi",
  storageBucket: "mwm-mozi.appspot.com",
  messagingSenderId: "276451200517",
  appId: "1:276451200517:web:f90172b4a292d75785966c",
  measurementId: "G-WT0H567E73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);