document.addEventListener("DOMContentLoaded", function () {

    // ===== Clear Pantry Data =====
    const alertCard = document.querySelector('.alert-card');

    if (alertCard) {
        alertCard.addEventListener('click', function () {
            const confirmation = confirm(
                "Are you sure? This will permanently remove all tracked items and history."
            );

            if (confirmation) {
                alert("Pantry data cleared successfully.");
            }
        });
    }

    // ===== Toggle Switch Logging =====
    const toggles = document.querySelectorAll('input[type="checkbox"]');

    toggles.forEach(toggle => {
        toggle.addEventListener('change', function () {
            console.log("Setting changed:", this.checked);
        });
    });

});
