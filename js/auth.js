import { auth } from "./firebaseConfig.js";
import {onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
import { loadItems, syncItems } from "./ui.js";

export let currentUser = null;

document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logout-btn");

    // Ensure user is authenticated
    onAuthStateChanged(auth, (user) => {
        if (user) {
            currentUser = user;
            console.log("User ID: ", user.uid);
            console.log("Email: ", user.email);
            console.log("Name: ", user.name);

            if (logoutBtn) {
                logoutBtn.style.display = "block";
            }
            loadItems();
            syncItems();
        } else {
            console.log("No user is currently signed in.");
            window.location.href = "./pages/auth.html";
        }
    })

    // Logout functionality
    if (logoutBtn) {
        logoutBtn.addEventListener("click", async () => {
            try {
                await signOut(auth);
                M.toast({ html: "Logout successful!" });
                window.location.href = "./pages/auth.html"
            } catch (error) {
                M.toast({ html: error.message });
            }
        });
    }
});