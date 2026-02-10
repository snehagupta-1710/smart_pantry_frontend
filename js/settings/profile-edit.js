// Image Preview Logic
const fileInput = document.getElementById('fileInput');
const profilePreview = document.getElementById('profilePreview');

fileInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profilePreview.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});

// Form Submission
document.getElementById('editProfileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show a quick feedback
    const btn = document.querySelector('.save-btn');
    btn.innerText = "Updating...";
    btn.style.opacity = "0.7";

    setTimeout(() => {
        alert("Profile updated successfully!");
        window.location.href = "profile.html";
    }, 1000);
});