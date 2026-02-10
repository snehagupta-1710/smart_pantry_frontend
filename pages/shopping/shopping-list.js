async function loadShoppingList() {
  try {
    const res = await fetch("http://127.0.0.1:3000/api/shopping", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    const items = await res.json();

    const list = document.getElementById("shoppingList");
    list.innerHTML = "";

    if (items.length === 0) {
      list.innerHTML = "<li>No items to buy 🎉</li>";
      return;
    }

    items.forEach(item => {
      const li = document.createElement("li");
      li.innerText = `${item.name} (${item.quantity} ${item.unit})`;
      list.appendChild(li);
    });
  } catch (err) {
    console.error("Shopping list load error", err);
  }
}

document.addEventListener("DOMContentLoaded", loadShoppingList);
