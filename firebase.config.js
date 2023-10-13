// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSEe4k_vf1-KvAvTk1Uj1zSfL563DMyD8",
  authDomain: "bar-code-e4b9d.firebaseapp.com",
  projectId: "bar-code-e4b9d",
  storageBucket: "bar-code-e4b9d.appspot.com",
  messagingSenderId: "86744558392",
  appId: "1:86744558392:web:7842441a3d991e3b6dafcd",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
