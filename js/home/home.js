document.addEventListener("DOMContentLoaded", async () => {

  /* ======================
      AUTH CHECK
  ====================== */
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "../../pages/auth/login.html";
    return;
  }

  /* ======================
      FETCH GRAINS
  ====================== */
  try {
   const res = await fetch("http://127.0.0.1:3000/api/grains", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});

let grains = await res.json();
grains = grains.map(normalizeGrain); // 🔥 IMPORTANT


    renderOverview(grains);
    renderHomeGrains(grains);

  } catch (err) {
    console.error("Error loading grains:", err);
  }

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
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      desktopSidebar.classList.toggle("open");
    });

    document.addEventListener("click", (e) => {
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
  window.location.href = `../../pages/grain/grain-list.html?id=${id}`;
}
