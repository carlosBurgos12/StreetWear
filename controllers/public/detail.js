// Constantes para completar la ruta de la API.
const PRODUCTO_API = 'services/public/producto.php';
const PEDIDO_API = 'services/public/carrito.php';
// Constante tipo objeto para obtener los parámetros disponibles en la URL.
const PARAMS = new URLSearchParams(location.search);
// Constante para establecer el formulario de agregar un producto al carrito de compras.
const SHOPPING_FORM = document.getElementById('shoppingForm');



// Método del eventos para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Constante tipo objeto con los datos del producto seleccionado.
    const FORM = new FormData();
    FORM.append('idProducto', PARAMS.get('id'));
    // Petición para solicitar los datos del producto seleccionado.
    const DATA = await fetchData(PRODUCTO_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        console.log(DATA.dataset.id_producto);
        // Se colocan los datos en la página web de acuerdo con el producto seleccionado previamente.
        document.getElementById('imagenProducto').src = SERVER_URL.concat('images/productos/', DATA.dataset.imagen_producto);
        document.getElementById('nombreProducto').textContent = DATA.dataset.nombre_producto;
        document.getElementById('descripcionProducto').textContent = DATA.dataset.descripcion_producto;
        document.getElementById('precioProducto').textContent = DATA.dataset.precio_producto;
        document.getElementById('existenciasProducto').textContent = DATA.dataset.cantidad_producto;
        document.getElementById('producto').value = DATA.dataset.id_producto;
    } else {
        console.log(DATA.error);
        // Se limpia el contenido cuando no hay datos para mostrar.
        document.getElementById('detalle').innerHTML = '';
    }
});

// Evento para abrir el modal al hacer clic en el botón "Add to Cart".
document.getElementById('addToCartBtn').addEventListener('click', function () {
    var myModal = new bootstrap.Modal(document.getElementById('shoppingFormModal'), {
        keyboard: false
    });
    myModal.show();
});

// Método del evento para cuando se envía el formulario de agregar un producto al carrito.
SHOPPING_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SHOPPING_FORM);

    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(PEDIDO_API, 'createDetallePedido', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se constata si el cliente ha iniciado sesión.
    if (DATA.status) {
        sweetAlert(1, DATA.message, false, 'cart.html');
    } else if (DATA.session) {
        if (DATA.exception === 'No se puede realizar la operación: Stock insuficiente.') {
            sweetAlert(2, 'No se puede realizar la operación: Stock insuficiente.', false);
        }
        else{
            sweetAlert(2, DATA.error, false);

        }
    } else {
        sweetAlert(3, DATA.error, true, 'login.html');
    }
    var myModal = bootstrap.Modal.getInstance(document.getElementById('shoppingFormModal'));
    myModal.hide();
});
