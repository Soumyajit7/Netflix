import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

console.log()

const firebaseConfig = {
    apiKey: process.env.REACT_APP_firebase_apiKey,
    authDomain: "react-netflix-clone-f90bc.firebaseapp.com",
    projectId: "react-netflix-clone-f90bc",
    storageBucket: "react-netflix-clone-f90bc.appspot.com",
    messagingSenderId: "550600922056",
    appId: "1:550600922056:web:bc846e93cad6537138a6fd",
    measurementId: "G-53SQCXM4C2"
};


const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const db = getFirestore(app);