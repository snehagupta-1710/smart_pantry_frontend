document.getElementById('grainForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simple validation feedback
    const btn = document.querySelector('.save-btn');
    btn.innerText = "Saving...";
    btn.style.opacity = "0.7";

    setTimeout(() => {
        alert("Grain saved to your Pantry!");
        window.location.href = "../../pages/grain/grain-list.html"; // Adjust to your next screen
    }, 1000);
});const total = Number(grain.totalQuantity);
const current = Number(grain.currentQuantity);

// safety check
if (!total || total <= 0) return;

// used quantity
const usedQty = total - current;

// percentage calculations
let usedPercent = (usedQty / total) * 100;
let remainingPercent = (current / total) * 100;

// clamp values
usedPercent = Math.min(100, Math.max(0, usedPercent));
remainingPercent = Math.min(100, Math.max(0, remainingPercent));

// update text
usedText.innerText = `${Math.round(usedPercent)}% Used`;
remainingText.innerText = `${current} kg of ${total} kg`;
