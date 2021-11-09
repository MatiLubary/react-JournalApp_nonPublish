import 'firebase/firestore';
import 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';
 
 
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA4i7gTVIfpqAT2ifCHKAXPFmN18vWAaRs",
    authDomain: "react-app-course-8988f.firebaseapp.com",
    projectId: "react-app-course-8988f",
    storageBucket: "react-app-course-8988f.appspot.com",
    messagingSenderId: "618460358483",
    appId: "1:618460358483:web:b61e304edb22480516a3a6",
    measurementId: "G-0MGW0EM3V5"
};
 
// Initialize Firebase
// const app = initializeApp(firebaseConfig);

initializeApp(firebaseConfig);

 
const db = getFirestore();
 
const googleAuthProvider = new GoogleAuthProvider();
 
export{
    db,
    googleAuthProvider
}