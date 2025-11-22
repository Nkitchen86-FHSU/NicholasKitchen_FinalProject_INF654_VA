import { auth, db } from "./firebaseConfig.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
    const userNameElement = document.getElementById("user-name");
    const userEmailElement = document.getElementById("user-email");

    // Listen for authentication changes
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // Get user details
            const userId = user.uid;
            try {
                // Reference to user's account in Firestore
                const userRef = doc(db, "users", userId);
                const userDoc = await getDoc(userRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    userNameElement.textContent = userData.name || "Anonymous";
                    userEmailElement.textContent = userData.email;
                } else {
                    console.error("No user document found!");
                }
            } catch (error) {
                console.error("Error fetching user details: ", error);
            }
        } else {
            window.location.href = "./pages/auth.html";
        }
    });
});