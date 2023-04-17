// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyA8W5WNrZ40pGRvyYEJDLbP5Cksa3dh1_Q",
  authDomain: "react-native-recipes-ccd06.firebaseapp.com",
  databaseURL: "https://react-native-recipes-ccd06-default-rtdb.firebaseio.com",
  projectId: "react-native-recipes-ccd06",
  storageBucket: "react-native-recipes-ccd06.appspot.com",
  messagingSenderId: "368031575868",
  appId: "1:368031575868:web:251ab77597dd50b5947839",
  measurementId: "G-7J37NYSFCR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);