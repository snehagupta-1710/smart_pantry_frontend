document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("grainForm");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            alert("Grain saved successfully ✅");

            window.location.href = "../../pages/grain/grain-list.html";
        });
    }

});
