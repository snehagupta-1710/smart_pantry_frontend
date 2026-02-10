document.querySelector('.alert-card').addEventListener('click', function() {
    const confirmation = confirm("Are you sure? This will permanently remove all tracked items and history.");
    if (confirmation) {
        alert("Pantry data cleared successfully.");
    }
});

// Syncing Toggles (Optional)
const toggles = document.querySelectorAll('input[type="checkbox"]');
toggles.forEach(toggle => {
    toggle.addEventListener('change', function() {
        console.log("Setting changed: ", this.checked);
    });
});