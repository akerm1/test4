// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, confirmPasswordReset } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNTDHR67L48F1nPReRs2dSoQ-PxgNKWYM",
  authDomain: "login2-d485e.firebaseapp.com",
  projectId: "login2-d485e",
  storageBucket: "login2-d485e.appspot.com",
  messagingSenderId: "602998933832",
  appId: "1:602998933832:web:a397944522901f3c12cb7d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Extract the query parameters from the URL
const urlParams = new URLSearchParams(window.location.search);
const oobCode = urlParams.get('oobCode');

// Reset password form submission
const resetPasswordForm = document.getElementById('resetPasswordForm');
resetPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;

    const resetPasswordStatus = document.getElementById('resetPasswordStatus');

    if (newPassword !== confirmNewPassword) {
        resetPasswordStatus.textContent = 'Passwords do not match';
        resetPasswordStatus.style.color = 'red';
        return;
    }

    confirmPasswordReset(auth, oobCode, newPassword)
        .then(() => {
            resetPasswordStatus.textContent = 'Password has been reset successfully.';
            resetPasswordStatus.style.color = 'green';
        })
        .catch((error) => {
            console.error(error.message);
            resetPasswordStatus.textContent = 'Error: ' + error.message;
            resetPasswordStatus.style.color = 'red';
        });
});
