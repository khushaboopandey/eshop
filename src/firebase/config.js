import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBvjk79opdgTV8-GGyIbChp-Y4AApxsOwU",
  authDomain: "eshop-d90ec.firebaseapp.com",
  projectId: "eshop-d90ec",
  storageBucket: "eshop-d90ec.appspot.com",
  messagingSenderId: "939731246918",
  appId: "1:939731246918:web:60604d7da298814dd18f47",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
