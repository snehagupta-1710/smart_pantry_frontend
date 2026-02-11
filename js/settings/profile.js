// Simple Logout Interaction
document.querySelector('.logout').addEventListener('click', function() {
    if(confirm("Do you want to logout?")) {
        console.log("User logged out");
        // window.location.href = "login.html";
    }
});

// Edit Profile Trigger
document.querySelector('.edit-profile-btn').addEventListener('click', function() {
    alert("Switching to edit mode...");
});document.addEventListener("DOMContentLoaded", function () {

    const logoutBtn = document.querySelector('.logout');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            const confirmLogout = confirm("Do you want to logout?");
            
            if (confirmLogout) {
                window.location.href = "../../pages/auth/login.html";
            }
        });
    }

});
