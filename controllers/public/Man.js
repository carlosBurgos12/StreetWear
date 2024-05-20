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
    // Añadir evento de clic al elemento "home"
    document.getElementById('home').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // Añadir eventos de clic a los elementos del menú
    ['men', 'women', 'shoes', 'caps', 'kids', 'accesories', 'cart'].forEach(itemId => {
        document.getElementById(itemId).addEventListener('click', () => {
            // Redirigir a la página correspondiente al hacer clic en un elemento del menú
            window.location.href = itemId + '.html';
        });
    });
}

/**
 * Función para inicializar las tarjetas de productos. Añade eventos de clic a los botones de productos.
 */
function initializeCards() {
    // IDs de los botones de productos
    const buttons = ['miBoton', 'miBoton2', 'miBoton3', 'miBoton4', 'miBoton5', 'miBoton6'];

    // Añadir eventos de clic a los botones de productos
    buttons.forEach(buttonId => {
        document.getElementById(buttonId).addEventListener('click', () => {
            // Redirigir a la página de información del producto al hacer clic en un botón
            window.location.href = 'product_information.html';
        });
    });
}
