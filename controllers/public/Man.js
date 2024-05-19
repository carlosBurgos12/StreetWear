document.addEventListener('DOMContentLoaded', () => {
    loadTemplate();
    initializeNavigation();
    initializeCards();
});

/**
 * Función para cargar cualquier plantilla necesaria, como encabezados o pies de página.
 */
function loadTemplate() {
    // Aquí puedes agregar el código para cargar las plantillas
}

/**
 * Función para inicializar la navegación. Añade eventos de clic a los elementos del menú.
 */
function initializeNavigation() {
    document.getElementById('home').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    document.getElementById('men').addEventListener('click', () => {
        window.location.href = 'man.html';
    });

    document.getElementById('women').addEventListener('click', () => {
        window.location.href = 'women.html';
    });

    document.getElementById('shoes').addEventListener('click', () => {
        window.location.href = 'shoes.html';
    });

    document.getElementById('caps').addEventListener('click', () => {
        window.location.href = 'caps.html';
    });

    document.getElementById('kids').addEventListener('click', () => {
        window.location.href = 'kids.html';
    });

    document.getElementById('accesories').addEventListener('click', () => {
        window.location.href = 'accessories.html';
    });

    document.getElementById('cart').addEventListener('click', () => {
        window.location.href = 'cart.html';
    });
}

/**
 * Función para inicializar las tarjetas de productos. Añade eventos de clic a los botones de productos.
 */
function initializeCards() {
    const buttons = ['miBoton', 'miBoton2', 'miBoton3', 'miBoton4', 'miBoton5', 'miBoton6'];

    buttons.forEach(buttonId => {
        document.getElementById(buttonId).addEventListener('click', () => {
            window.location.href = 'product_information.html';
        });
    });
}
