/* =========================
   GLOBAL STATE (Frontend Only)
========================= */
let grains = [
  {
    _id: "1",
    name: "Basmati Rice",
    totalQuantity: 5,
    currentQuantity: 3.2,
    dailyUsage: 0.2,
    reminderDays: 5,
    lastUpdated: new Date().toISOString()
  },
  {
    _id: "2",
    name: "Wheat",
    totalQuantity: 6,
    currentQuantity: 4.5,
    dailyUsage: 0.3,
    reminderDays: 7,
    lastUpdated: new Date().toISOString()
  },
  {
    _id: "3",
    name: "Toor Dal",
    totalQuantity: 3,
    currentQuantity: 1.2,
    dailyUsage: 0.1,
    reminderDays: 3,
    lastUpdated: new Date().toISOString()
  }
];

/* =========================
   ON LOAD
========================= */
document.addEventListener("DOMContentLoaded", () => {
  renderList();
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
      <button class="back-btn" onclick="closeDetailPage()">
        <button class="back-btn" onclick="history.back()">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
      </button>
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
      onclick="editQuantity(${index})">
      ✎ Update Remaining Stock
    </button>

    <button class="detail-btn btn-refill"
      onclick="editReminder(${index})">
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
   EDIT QUANTITY (Frontend Only)
========================= */
function editQuantity(index) {
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

  grains[index].currentQuantity = qty;
  grains[index].lastUpdated = new Date().toISOString();

  openDetailPage(index);
  renderList();
}

/* =========================
   EDIT REMINDER (Frontend Only)
========================= */
function editReminder(index) {
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

  grains[index].reminderDays = days;
  openDetailPage(index);
}
