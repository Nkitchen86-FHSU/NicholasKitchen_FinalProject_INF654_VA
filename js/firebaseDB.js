// Import the functions you need from the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { auth } from "./firebaseConfig.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYKM_V8HbQdlIFNeV3gnj5674c9KJaRK4",
  authDomain: "inventorymanager-fde68.firebaseapp.com",
  projectId: "inventorymanager-fde68",
  storageBucket: "inventorymanager-fde68.firebasestorage.app",
  messagingSenderId: "511912640439",
  appId: "1:511912640439:web:8f108887f87b0be83cb232",
  measurementId: "G-JXEZCHXZ89"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add a item
export async function addItemToFirebase(item) {
  try {
    const docRef = await addDoc(collection(db, "inventory"), {
      ...item,
      owner: item.owner,
      createdAt: serverTimestamp()
    });
    return { id: docRef.id };
  } catch (e) {
    console.error("Error adding item: ", e);
  }
}

export async function getItemsFromFirebase() {
  const user = auth.currentUser;
  if (!user) return [];

  try {
    const querySnapshot = await getDocs(query(collection(db,"inventory"), where("owner", "==", user.uid)));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (e) {
    console.error("Error retrieving items: ", e);
  }
  return [];
}

export async function deleteItemFromFirebase(id) {
  try {
    await deleteDoc(doc(db, "inventory", id));
  } catch (e) {
    console.error("Error deleting item: ", e);
  }
}

export async function updateItemInFirebase(id, updatedData) {
  console.log(updatedData, id);
  try {
    const itemRef = doc(db, "inventory", id);
    console.log(itemRef);
    await updateDoc(itemRef, updatedData);
  } catch (e) {
    console.error("Error updating item: ", e);
  }
}
