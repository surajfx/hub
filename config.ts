import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPZ39YnVkITns2UpnPM6LzSw1lPDDrZGQ",
  authDomain: "surajfx3-731fb.firebaseapp.com",
  databaseURL: "https://surajfx3-731fb-default-rtdb.firebaseio.com",
  projectId: "surajfx3-731fb",
  storageBucket: "surajfx3-731fb.firebasestorage.app",
  messagingSenderId: "346279566901",
  appId: "1:346279566901:web:32d331a9051da9caa55b7c",
  measurementId: "G-80CTS299RN"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
export default app;
