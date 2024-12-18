document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.querySelector(".signup-btn");
    const closeButton = document.querySelector(".close-btn");
    const blurOverlay = document.querySelector(".blur-bg-overlay");
    const loginsignuplink = document.querySelector(".form-box .bottom-link a");

    // Toggle popup visibility
    function togglePopup() {
        document.body.classList.toggle("show-popup");
    }

    // Show popup on login button click
    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        togglePopup();
    });

    // Close popup on close button click
    closeButton.addEventListener("click", (e) => {
        e.preventDefault();
        togglePopup();
    });

    // Close popup when clicking outside the form
    blurOverlay.addEventListener("click", togglePopup);

    loginsignuplink.addEventListener("click", (e) => {
        e.preventDefault();
        const popupForm = document.querySelector(".popup-form");
        popupForm.classList[loginsignuplink.id === "signup-link" ? "add" : "remove"]("show-signup");
    });

    document.getElementById('signup-link').addEventListener('click', function() {
        document.querySelector('.form-box.login').style.display = 'none';
        document.querySelector('.form-box.form-details').style.display = 'none';
        document.querySelector('.form-box.signup').style.display = 'block';
        
    });

    document.getElementById('login-link').addEventListener('click', function() {
        document.querySelector('.form-box.signup').style.display = 'none';
        document.querySelector('.form-box.login').style.display = 'block';
    });

    document.querySelector('.close-btn').addEventListener('click', function() {
        document.querySelector('.popup-form').style.display = 'none';
        document.querySelector('.blur-bg-overlay').style.display = 'none';
    });

    document.querySelector('.signup-btn').addEventListener('click', function() {
        document.querySelector('.popup-form').style.display = 'block';
        document.querySelector('.blur-bg-overlay').style.display = 'block';
    });
});
