document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded");

    const grains = [
        { name: "Rice (Basmati)", left: 3.2, total: 5 },
        { name: "Wheat", left: 4.5, total: 5 },
        { name: "Rice (Basmati)", left: 3.2, total: 5 }
    ];

    const listContainer = document.querySelector(".grain-list");
    const totalDisplay = document.getElementById("totalCountDisplay");
    const addBtn = document.getElementById("addBtn");

    // 1. Handle the Add Button Navigation
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            window.location.href = '../../pages/onboarding/add-grain.html';
        });
    }

    // 2. Render the List
    if (listContainer) {
        console.log("List container found, rendering...");
        listContainer.innerHTML = ""; // Clear static items

        grains.forEach(g => {
            const percent = Math.round((g.left / g.total) * 100);
            
            // Create the HTML for each item
            const grainHTML = `
                <div class="grain-item" style="cursor: pointer;">
                    <img src="../../assets/images/illustration.png" alt="${g.name}">
                    <div class="grain-details">
                        <h3>${g.name}</h3>
                        <p class="qty-text">${g.left} kg left</p>
                        <div class="progress-bg">
                            <div class="progress-fill ${percent < 30 ? 'warning' : 'healthy'}" 
                                 style="width:${percent}%"></div>
                        </div>
                    </div>
                </div>`;
            listContainer.innerHTML += grainHTML;
        });

        // 3. Update the Total Count display
        if (totalDisplay) {
            totalDisplay.innerText = grains.length;
            console.log("Total count updated to:", grains.length);
        }

        // 4. Attach click listeners to the NEWLY created items
        const renderedItems = document.querySelectorAll(".grain-item");
        renderedItems.forEach((item, index) => {
            item.addEventListener("click", () => {
                const grainName = item.querySelector("h3").innerText;
                console.log("Clicked on:", grainName);
                alert("Opening details for " + grainName);
            });
        });
    } else {
        console.error("Error: .grain-list container not found in HTML!");
    }
});