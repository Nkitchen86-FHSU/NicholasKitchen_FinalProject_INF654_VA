import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
import {
    getMessaging,
    getToken,
    onMessage
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "AIzaSyBYKM_V8HbQdlIFNeV3gnj5674c9KJaRK4",
  authDomain: "inventorymanager-fde68.firebaseapp.com",
  projectId: "inventorymanager-fde68",
  storageBucket: "inventorymanager-fde68.firebasestorage.app",
  messagingSenderId: "511912640439",
  appId: "1:511912640439:web:8f108887f87b0be83cb232",
  measurementId: "G-JXEZCHXZ89"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const messaging = getMessaging(app);

export { db, auth, messaging, getToken, onMessage };