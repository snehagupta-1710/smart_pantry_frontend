/* =========================
   GLOBAL STATE
========================= */
let grains = [];

/* =========================
   NORMALIZE DATA (VERY IMPORTANT)
========================= */
function normalizeGrain(g) {
  const total = Number(g.totalQuantity) || 0;
  const current = Math.min(Number(g.currentQuantity) || 0, total);

  return {
    _id: g._id,
    name: g.name || "Item",
    totalQuantity: total,
    currentQuantity: current,
    dailyUsage: Number(g.dailyUsage) || 0,
    reminderDays: Number(g.reminderDays) || 0,
    lastUpdated: g.lastUpdated || new Date().toISOString()
  };
}

/* =========================
   ON LOAD – AUTH + FETCH
========================= */
document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "../../pages/auth/login.html";
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/grains", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();
    grains = data.map(normalizeGrain);

    renderList();
  } catch (err) {
    console.error("Load error:", err);
  }
});

/* =========================
   LIST VIEW
========================= */
function renderList() {
  const list = document.getElementById("inventoryList");
  if (!list) return;

  list.innerHTML = grains.map((g, index) => {
    const usedPercent =
      g.totalQuantity > 0
        ? Math.round(
            ((g.totalQuantity - g.currentQuantity) / g.totalQuantity) * 100
          )
        : 0;

    const color =
      usedPercent > 70 ? "red" :
      usedPercent > 40 ? "yellow" :
      "green";

    return `
      <div class="inventory-item" onclick="openDetailPage(${index})">
        <div class="item-name">
          <div class="dot ${color}"></div>
          <h3>${g.name}</h3>
        </div>
        <div class="item-qty">
          <span class="value">${g.currentQuantity}</span>
          <span class="unit">kg</span>
        </div>
      </div>
    `;
  }).join("");

  document.getElementById("totalCount").innerText =
    `${grains.length} Items`;
}

/* =========================
   DETAIL VIEW
========================= */
function openDetailPage(index) {
  const g = grains[index];

  const usedPercent =
    g.totalQuantity > 0
      ? Math.round(
          ((g.totalQuantity - g.currentQuantity) / g.totalQuantity) * 100
        )
      : 0;

  const detailView = document.getElementById("detailView");
  const listView = document.getElementById("listView");

  detailView.innerHTML = `
    <header class="top-nav">
      <button class="back-btn" onclick="closeDetailPage()"><button class="back-btn" onclick="history.back()">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button></button>
      <h1>${g.name}</h1>
    </header>

    <div class="usage-circle"
      style="background: conic-gradient(
        #8BC34A ${usedPercent}%,
        #e0e0e0 ${usedPercent}% 100%
      );">
      <span>${usedPercent}%</span>
      <small>Used</small>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <span class="stat-label">Remaining</span>
        <div class="stat-value">${g.currentQuantity} kg</div>
        <small>of ${g.totalQuantity} kg</small>
      </div>

      <div class="stat-card">
        <span class="stat-label">Reminder</span>
        <div class="stat-value">${g.reminderDays} Days</div>
        <small>Reminder Set</small>
      </div>
    </div>

    <small style="margin-left:8px;">
      Daily use ${g.dailyUsage} kg
    </small>

    <div class="info-row">
      <span>📅 Last Updated</span>
      <b>${new Date(g.lastUpdated).toDateString()}</b>
    </div>

    <button class="detail-btn btn-edit"
      onclick="editQuantity('${g._id}', ${index})">
      ✎ Update Remaining Stock
    </button>

    <button class="detail-btn btn-refill"
      onclick="editReminder('${g._id}', ${index})">
      📅 Set Reminder
    </button>
  `;

  listView.classList.add("hidden");
  detailView.classList.remove("hidden");
}

/* =========================
   BACK
========================= */
function closeDetailPage() {
  document.getElementById("detailView").classList.add("hidden");
  document.getElementById("listView").classList.remove("hidden");
}

/* =========================
   EDIT QUANTITY
========================= */
async function editQuantity(id, index) {
  const input = prompt(
    "Enter new quantity (kg):",
    grains[index].currentQuantity
  );
  if (input === null) return;

  const qty = Number(input);
  if (isNaN(qty) || qty < 0) {
    alert("Invalid quantity");
    return;
  }

  const token = localStorage.getItem("token");

  const res = await fetch(`http://localhost:5000/api/grains/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ currentQuantity: qty })
  });

  const updated = normalizeGrain(await res.json());
  grains[index] = updated;

  openDetailPage(index);
  renderList();
}

/* =========================
   EDIT REMINDER
========================= */
async function editReminder(id, index) {
  const input = prompt(
    "Remind me after how many days?",
    grains[index].reminderDays
  );
  if (input === null) return;

  const days = Number(input);
  if (isNaN(days) || days < 0) {
    alert("Invalid days");
    return;
  }

  const token = localStorage.getItem("token");

  const res = await fetch(`http://localhost:5000/api/grains/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ reminderDays: days })
  });

  const updated = normalizeGrain(await res.json());
  grains[index] = updated;

  openDetailPage(index);
}
