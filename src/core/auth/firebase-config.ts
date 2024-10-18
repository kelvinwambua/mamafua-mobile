// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDViSSsvXvW5KY2j_gYn0OF_IZUhWLpYQA",
  authDomain: "mama-ce31a.firebaseapp.com",
  projectId: "mama-ce31a",
  storageBucket: "mama-ce31a.appspot.com",
  messagingSenderId: "943022455012",
  appId: "1:943022455012:web:9325592c3ee8b23daf94f1",
  measurementId: "G-Z7TK4Q3Q6D"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
