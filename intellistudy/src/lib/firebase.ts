import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // 

const firebaseConfig = {
  apiKey: "AIzaSyA3I_uYdXmWgNXySFvFm94OBTzLiRvT0C8",
  authDomain: "intellistudy-53a0e.firebaseapp.com",
  projectId: "intellistudy-53a0e",
  storageBucket: "intellistudy-53a0e.firebasestorage.app",
  messagingSenderId: "28415232127",
  appId: "1:28415232127:web:5e45bee1c0d16539ad174a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }; 
export type { User } from "firebase/auth";
