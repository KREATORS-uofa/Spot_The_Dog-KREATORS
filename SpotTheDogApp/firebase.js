// run in terminal <npm install firebase>
import { initializeAPP } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlSeUC_Y5h0OqutUESHJX91X3-QLfeiBQ",
  authDomain: "kreaters-b978a.firebaseapp.com",
  databaseURL: "https://kreaters-b978a-default-rtdb.firebaseio.com",
  projectId: "kreaters-b978a",
  storageBucket: "kreaters-b978a.appspot.com",
  messagingSenderId: "65051855985",
  appId: "1:65051855985:web:d6f127ef2abdc40e77dfd0",
  measurementId: "G-W8W04VDHM3",
};

// Initialize Firebase
initializeAPP(firebaseConfig);
export const db = getFirestore();

// initialize the authentication in firebase
// initialize the database in firebase
// change rules in the "cloud firestore" for firestore database
// change rules in storage as well
