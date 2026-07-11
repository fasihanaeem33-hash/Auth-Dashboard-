import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9bLuRM9A_eHmiEYgPnB80FV2AbByWLcQ",
  authDomain: "auth-dashboard-a57ec.firebaseapp.com",
  projectId: "auth-dashboard-a57ec",
  storageBucket: "auth-dashboard-a57ec.firebasestorage.app",
  messagingSenderId: "161482624819",
  appId: "1:161482624819:web:4db1fa892b8d0988b8f846",
  measurementId: "G-Z1GXHQCX7B",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;