document.addEventListener("DOMContentLoaded", function () {

  /* ======================
      FRONTEND DUMMY DATA
  ====================== */
  const grains = [
    {
      _id: "1",
      name: "Basmati Rice",
      totalQuantity: 5,
      currentQuantity: 3.2,
      dailyUsage: 0.2
    },
    {
      _id: "2",
      name: "Wheat",
      totalQuantity: 5,
      currentQuantity: 1,
      dailyUsage: 0.3
    },
    {
      _id: "3",
      name: "Toor Dal",
      totalQuantity: 3,
      currentQuantity: 2.5,
      dailyUsage: 0.1
    }
  ];

  renderOverview(grains);
  renderHomeGrains(grains);

  /* ======================
      OVERVIEW STATS
  ====================== */
  function renderOverview(grains) {
    const totalEl = document.getElementById("totalItems");
    const lowEl = document.getElementById("lowStock");
    const refillEl = document.getElementById("refillItems");

    if (!totalEl || !lowEl || !refillEl) return;

    totalEl.innerText = grains.length;

    const lowStock = grains.filter(
      g => g.currentQuantity <= g.dailyUsage * 3
    ).length;

    lowEl.innerText = lowStock;
    refillEl.innerText = lowStock;
  }

  /* ======================
      HOME PANTRY (MAX 3)
  ====================== */
  function renderHomeGrains(grains) {
    const list = document.querySelector(".grain-list");
    if (!list) return;

    list.innerHTML = "";

    grains.slice(0, 3).forEach(g => {

      const percent = Math.round(
        (g.currentQuantity / g.totalQuantity) * 100
      );

      list.innerHTML += `
        <div class="grain-item" onclick="openGrain('${g._id}')">
          <img src="../../assets/images/illustration.png" alt="${g.name}">

          <div class="grain-details">
            <div class="name-row">
              <h3>${g.name}</h3>
              ${percent < 30 ? `<span class="badge low">Low stock</span>` : ""}
            </div>

            <p class="qty-text">${g.currentQuantity} kg left</p>

            <div class="progress-row">
              <span>${percent}% Remaining</span>
              <span>${g.currentQuantity}kg/${g.totalQuantity}kg</span>
            </div>

            <div class="progress-bg">
              <div class="progress-fill ${percent < 30 ? "warning" : "healthy"}"
                   style="width:${percent}%">
              </div>
            </div>
          </div>
        </div>
      `;
    });
  }

  /* ======================
      SIDEBAR TOGGLE
  ====================== */
  const hamburger = document.getElementById("hamburger");
  const desktopSidebar = document.getElementById("desktopSidebar");

  if (hamburger && desktopSidebar) {
    hamburger.addEventListener("click", function (e) {
      e.stopPropagation();
      desktopSidebar.classList.toggle("open");
    });

    document.addEventListener("click", function (e) {
      if (
        !desktopSidebar.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        desktopSidebar.classList.remove("open");
      }
    });
  }

});

/* ======================
    OPEN GRAIN DETAIL
====================== */
function openGrain(id) {
  window.location.href = "../../pages/grain/grain-list.html";
}
