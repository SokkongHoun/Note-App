import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPW0WEyErtWTFx9-OlgoDuJenwranl-OE",
  authDomain: "notation-7d008.firebaseapp.com",
  projectId: "notation-7d008",
  storageBucket: "notation-7d008.appspot.com",
  messagingSenderId: "832935291778",
  appId: "1:832935291778:web:d1caca947e040a576afd9b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const notesCollection = collection(db, "notes");
