// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import { getFirestore } from "firebase/firestore/lite";
import firebase from "firebase/compat/app";

// Your web app's Firebase configuration
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

const app = initializeApp(firebaseConfig);

const authentication = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { authentication };
export const db = getFirestore(app);
export { firebase };
