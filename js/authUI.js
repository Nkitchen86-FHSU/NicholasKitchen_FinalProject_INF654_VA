import { auth } from "./firebaseConfig.js"
import {onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

// DOM hooks for nav and sidebar
const navWelcome = document.getElementById("nav-welcome");
const navProfile = document.getElementById("nav-profile");
const navLogout = document.getElementById("nav-logout");
const navLogin = document.getElementById("nav-login");

const sideWelcome = document.getElementById("side-welcome");
const sideProfile = document.getElementById("side-profile");
const sideLogout = document.getElementById("side-logout");
const sideLogin = document.getElementById("side-login");

const logoutLink = document.getElementById("logout-link");
const sideLogoutLink = document.getElementById("side-logout-link");

// Wait until authentication is detected
onAuthStateChanged(auth, (user) => {
    const isAuthPage = window.location.pathname.includes("auth.html");

    if (user) {
        // Redirect when signed in
        if (isAuthPage) {
            window.location.href = "/";
        }

        const name = user.displayName || "User";

        // Populate welcome text
        if (navWelcome) {
            navWelcome.textContent = `Welcome, ${name}`;
            navWelcome.style.display = "block";
        }
        if (sideWelcome) {
            sideWelcome.textContent = `Welcome, ${name}`;
            sideWelcome.style.display = "block";
        }

        // Show authenticated nav links
        navProfile?.style?.setProperty("display", "block");
        navLogout?.style?.setProperty("display", "block");
        navLogin?.style?.setProperty("display", "none");

        sideProfile?.style?.setProperty("display", "block");
        sideLogout?.style?.setProperty("display", "block");
        sideLogin?.style?.setProperty("display", "none");
    } else {
        // Redirect protected pages to auth.html
        const isProtected = !isAuthPage && !window.location.pathname.includes("about.html") && !window.location.pathname.includes("contact.html");

        if (isProtected) {
            window.location.href = "./pages/auth.html";
        }

        // Show login button
        navWelcome?.style?.setProperty("display", "none");
        navProfile?.style?.setProperty("display", "none");
        navLogout?.style?.setProperty("display", "none");
        navLogin?.style?.setProperty("display", "block");

        sideWelcome?.style?.setProperty("display", "none");
        sideProfile?.style?.setProperty("display", "none");
        sideLogout?.style?.setProperty("display", "none");
        sideLogin?.style?.setProperty("display", "block");
    }
});

// Logout functionality
logoutLink?.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "/pages/auth.html";
});

sideLogoutLink?.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "/pages/auth.html";
})

// Logout functionality for profile page
document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", async () => {
            try {
                await signOut(auth);
                M.toast({ html: "Logout successful!" });
                window.location.href = "/pages/auth.html"
            } catch (error) {
                M.toast({ html: error.message });
            }
        });
    }
});