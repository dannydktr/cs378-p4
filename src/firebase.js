// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmhM78qADoDaTcUS7zvCXETp-wyB0Ojyc",
  authDomain: "cs378-p4-c52da.firebaseapp.com",
  databaseURL: "https://cs378-p4-c52da-default-rtdb.firebaseio.com",
  projectId: "cs378-p4-c52da",
  storageBucket: "cs378-p4-c52da.appspot.com",
  messagingSenderId: "111128522029",
  appId: "1:111128522029:web:1b21d6c5a46800be3bf7a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();