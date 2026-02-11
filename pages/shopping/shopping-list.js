document.addEventListener("DOMContentLoaded", function () {
        const inventory = [
    {
        id: "P1",
        name: "Wheat (5kg)",
        search: "wheat+5kg",
        base: 480,
        img: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=100"
    },
    {
        id: "P2",
        name: "Basmati Rice (5kg)",
        search: "basmati+rice+5kg",
        base: 580,
        img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100"
    }
];

  

    const stores = [
        { name: "Blinkit", url: "https://blinkit.com/s/?q=" },
        { name: "Zepto", url: "https://www.zeptonow.com/search?query=" }
    ];

    function renderList() {
        const list = document.getElementById("shopping-list");
        list.innerHTML = "";

        inventory.forEach(item => {

            let html = `
                <div class="item-card">
                    <div class="card-top">
                        <div>
                            <h3>${item.name}</h3>
                            <div class="low-stock">
                                ⚠ Low stock : 200g Left
                            </div>
                        </div>
                        <img src="${item.img}" class="item-img">
                    </div>

                    <div class="price-list">
            `;

            stores.forEach(store => {
                const price = Math.round(item.base * (0.95 + Math.random() * 0.1));
                const discount = Math.floor(Math.random() * 40) + 10;

                html += `
                    <div class="platform-row">
                        <div class="platform-info">
                            <span>${store.name}</span>
                            <small>${discount}% OFF</small>
                            <div class="price">₹${price}</div>
                        </div>

                        <a href="${store.url}${item.search}"
                           target="_blank"
                           class="buy-btn">
                           Buy now
                        </a>
                    </div>
                `;
            });

            html += `</div></div>`;
            list.innerHTML += html;
        });

        renderCustomItems();
    }

    function renderCustomItems() {
        const custom = JSON.parse(localStorage.getItem("customItems")) || [];
        const container = document.getElementById("shopping-list");

        if (custom.length > 0) {
            container.innerHTML += `<h3 class="custom-title">Custom Items</h3>`;
        }

        custom.forEach((item, index) => {
            container.innerHTML += `
                <div class="custom-item">
                    <div>
                        <input type="checkbox">
                        <span>${item}</span>
                    </div>
                    <button onclick="removeCustom(${index})">✕</button>
                </div>
            `;
        });
    }

    window.removeCustom = function(index) {
        let custom = JSON.parse(localStorage.getItem("customItems")) || [];
        custom.splice(index, 1);
        localStorage.setItem("customItems", JSON.stringify(custom));
        renderList();
    };

    document.getElementById("addBtn").addEventListener("click", function () {
        const input = document.getElementById("customInput");
        const value = input.value.trim();

        if (!value) return;

        let custom = JSON.parse(localStorage.getItem("customItems")) || [];
        custom.push(value);
        localStorage.setItem("customItems", JSON.stringify(custom));

        input.value = "";
        renderList();
    });

    renderList();
});
