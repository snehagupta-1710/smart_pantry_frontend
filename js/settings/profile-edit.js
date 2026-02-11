document.addEventListener("DOMContentLoaded", function () {

    // ===== Image Preview =====
    const fileInput = document.getElementById('fileInput');
    const profilePreview = document.getElementById('profilePreview');

    if (fileInput && profilePreview) {
        fileInput.addEventListener('change', function () {
            const file = this.files[0];

            if (file) {
                const reader = new FileReader();

                reader.onload = function (e) {
                    profilePreview.src = e.target.result;
                };

                reader.readAsDataURL(file);
            }
        });
    }

    // ===== Form Submission =====
    const form = document.getElementById('editProfileForm');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const btn = document.querySelector('.save-btn');
            btn.innerText = "Updating...";
            btn.style.opacity = "0.7";

            setTimeout(() => {
                alert("Profile updated successfully!");
                window.location.href = "../../pages/settings/profile.html";
            }, 1000);
        });
    }

});
