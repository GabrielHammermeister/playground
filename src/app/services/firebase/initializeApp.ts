// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB5KhEAvDgJEBfLc3A9JZQrtnaiBqIMRas",
    authDomain: "playground-next-js.firebaseapp.com",
    projectId: "playground-next-js",
    storageBucket: "playground-next-js.appspot.com",
    messagingSenderId: "8322714253",
    appId: "1:8322714253:web:d6caad37f6fc3342a5f0c4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);