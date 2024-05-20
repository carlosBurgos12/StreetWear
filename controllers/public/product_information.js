// Constante para la ruta de la API de productos.
const PRODUCTO_API = 'services/public/producto.php';

// Obtiene los parámetros de la URL.
const PARAMS = new URLSearchParams(location.search);

// Elemento donde se mostrarán los productos.
const PRODUCTOS = document.getElementById('productos');

// Método del evento cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para cargar plantillas.
    loadTemplate();
    
    // Se crea un formulario para enviar el ID de la categoría.
    const FORM = new FormData();
    FORM.append('idCategoria', PARAMS.get('id'));
    
    // Petición para obtener los productos de la categoría.
    const DATA = await fetchData(PRODUCTO_API, 'readProductosCategoria', FORM);
    
    // Comprueba si la respuesta es satisfactoria.
    if (DATA.status) {
        // Establece el título de la página con el nombre de la categoría.
        MAIN_TITLE.textContent = `Categoría: ${PARAMS.get('nombre')}`;
        
        // Limpia el contenedor de productos.
        PRODUCTOS.innerHTML = '';
        
        // Itera sobre los productos obtenidos y los muestra en tarjetas.
        DATA.dataset.forEach(row => {
            PRODUCTOS.innerHTML += `
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <div class="card mb-3">
                        <img src="${SERVER_URL}images/productos/${row.imagen_producto}" class="card-img-top" alt="${row.nombre_producto}">
                        <div class="card-body">
                            <h5 class="card-title">${row.nombre_producto}</h5>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Precio unitario (US$) ${row.precio_producto}</li>
                            <li class="list-group-item">Existencias ${row.existencias_producto}</li>
                        </ul>
                        <div class="card-body text-center">
                            <a href="detail.html?id=${row.id_producto}" class="btn btn-primary">Ver detalle</a>
                        </div>
                    </div>
                </div>
            `;
        });
    } else {
        // Si hay un error, muestra el mensaje de error.
        MAIN_TITLE.textContent = DATA.error;
    }
});

// Función para cargar plantillas.
function loadTemplate() {}

// Función para enviar una solicitud a la API y obtener datos.
async function fetchData(api, action, formData) {
    try {
        const response = await fetch(api, {
            method: 'POST',
            body: formData
        });
        return await response.json();
    } catch (error) {
        // Si hay un error, devuelve un objeto con el estado falso y el mensaje de error.
        return { status: false, error: error.message };
    }
}
