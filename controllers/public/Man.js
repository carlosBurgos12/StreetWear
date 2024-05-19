document.addEventListener('DOMContentLoaded', () => {
    loadTemplate();
    initializeNavigation();
    initializeCards();
});

function loadTemplate() {
    // Función para cargar cualquier plantilla necesaria, como encabezados o pies de página.
}

function initializeNavigation() {
    document.getElementById("home").addEventListener("click", function () {
        window.location.href = "index.html";
    });

    document.getElementById("men").addEventListener("click", function () {
        window.location.href = "man.html";
    });

    document.getElementById("women").addEventListener("click", function () {
        window.location.href = "women.html";
    });

    document.getElementById("shoes").addEventListener("click", function () {
        window.location.href = "shoes.html";
    });

    document.getElementById("caps").addEventListener("click", function () {
        window.location.href = "caps.html";
    });

    document.getElementById("kids").addEventListener("click", function () {
        window.location.href = "kids.html";
    });

    document.getElementById("accesories").addEventListener("click", function () {
        window.location.href = "accessories.html";
    });

    document.getElementById("cart").addEventListener("click", function () {
        window.location.href = "cart.html";
    });
}

function initializeCards() {
    document.getElementById("miBoton").addEventListener("click", function () {
        window.location.href = "product_information.html";
    });

    document.getElementById("miBoton2").addEventListener("click", function () {
        window.location.href = "product_information.html";
    });

    document.getElementById("miBoton3").addEventListener("click", function () {
        window.location.href = "product_information.html";
    });

    document.getElementById("miBoton4").addEventListener("click", function () {
        window.location.href = "product_information.html";
    });

    document.getElementById("miBoton5").addEventListener("click", function () {
        window.location.href = "product_information.html";
    });

    document.getElementById("miBoton6").addEventListener("click", function () {
        window.location.href = "product_information.html";
    });
}
