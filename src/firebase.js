import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDR1_G-eYnED4LNMa42paMjCUEdGEkvILE",
  authDomain: "tugas-matkul.firebaseapp.com",
  projectId: "tugas-matkul",
  storageBucket: "tugas-matkul.firebasestorage.app",
  messagingSenderId: "576558778972",
  appId: "1:576558778972:web:e69bea2a0b7ae09de6b499"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);