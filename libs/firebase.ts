// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxGGM048ZYyGlM6IeK7KNbH-MZ1QabtuE",
  authDomain: "e-shop-vid-fcf0c.firebaseapp.com",
  projectId: "e-shop-vid-fcf0c",
  storageBucket: "e-shop-vid-fcf0c.appspot.com",
  messagingSenderId: "507379600413",
  appId: "1:507379600413:web:6445a51f5bb2cbb2984af4"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;