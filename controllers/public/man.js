// Método del evento para cuando el documento ha cargado.
const PRODUCTO_API = 'services/public/producto.php';
const CONTENEDOR = document.getElementById('productos');

document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Llamada a la función para que carguen los productos.
    cargarProductos();
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'MEN’S WEAR';
});

async function cargarProductos() {
    // Petición para obtener las categorías disponibles.
    const DATA = await fetchData(PRODUCTO_API, 'readAll');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se inicializa el contenedor de categorías.
        CONTENEDOR.innerHTML = '';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            CONTENEDOR.innerHTML += `
            <div class="producto col-sm-12 col-md-6 col-lg-3 m-3 border card">
                <img src="${SERVER_URL}images/productos/${row.imagen_producto}" alt="${row.nombre_producto}">
                <h2>${row.nombre_producto}</h2>
                <p>${row.descripcion_producto}</p>
                <p>$${row.precio_producto}</p>
                <a href="product_information.html?id=${row.id_producto}">Ver más</a>
            </div>
            </div>
        `;
        });
    } else {
        console.log(DATA.error);
    }
}

// Método para realizar la búsqueda de productos.
async function searchRow() {
    // Constante con el valor del campo de búsqueda.
    const searchQuery = event.target.value.trim();
    const form = new FormData();
    form.append('search', searchQuery);

    try {
        if (searchQuery === '') {
            cargarProductos()
        }
        else {
            // Realizar la solicitud al servidor PHP con fetchData
            const data = await fetchData(PRODUCTO_API, 'searchRows', form);

            if (data.status) {
                // Limpiar el contenedor de productos
                CONTENEDOR.innerHTML = '';

                // Mostrar los productos encontrados
                data.dataset.forEach(row => {
                    CONTENEDOR.innerHTML += `
                <div class="producto col-sm-12 col-md-6 col-lg-3 m-3 border card">
                    <img src="${SERVER_URL}images/productos/${row.imagen_producto}" alt="${row.nombre_producto}">
                    <h2>${row.nombre_producto}</h2>
                    <p>${row.descripcion_producto}</p>
                    <p>$${row.precio_producto}</p>
                    <a href="product_information.html?id=${row.id_producto}">Ver más</a>
                </div>
                `;
                });

                // Mostrar mensaje de resultados encontrados
                console.log(data.message);
            } else {
                // Mostrar mensaje de error o sin resultados
                sweetAlert(2, DATA.error, false);
            }
        }
    } catch (error) {
        sweetAlert(2, error, false);
    }
}


