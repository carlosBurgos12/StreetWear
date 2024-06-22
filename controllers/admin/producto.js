// Constantes para completar las rutas de la API.
const PRODUCTO_API = 'services/admin/producto.php';
// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('buscar');
// Constantes para establecer el contenido de la tabla.
const TABLE_BODY = document.getElementById('tableBody');
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#crearProductModal'),
    UPDATE_MODAL = new bootstrap.Modal('#editarProductModal'),
    DELETE_MODAL = new bootstrap.Modal('#eliminarProductModal');
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('create'),
    UPDATE_FORM = document.getElementById('update'),
    COLOR_PRODUCTO = document.getElementById('colorProductEditar'),
    NOMBRE_PRODUCTO = document.getElementById('nombreProductEditar'),
    DESCRIPCION_PRODUCTO = document.getElementById('descripcionProductActualizar'),
    PRECIO_PRODUCTO = document.getElementById('precioProductEditar');

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    loadTemplate();
    // Llamada a la función para llenar la tabla con los registros existentes.
    fillTable();
});

// Método del evento para cuando se envía el formulario de buscar.
SEARCH_FORM.addEventListener('submit', (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();

    const busqueda = document.getElementById('search').value;

    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SEARCH_FORM);
    if (busqueda === '') {
        fillTable();
    }
    else {
        // Llamada a la función para llenar la tabla con los resultados de la búsqueda.
        fillTable(FORM);
    }
});

// Método del evento para cuando se envía el formulario de guardar.
SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(PRODUCTO_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        fillTable();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

/*
*   Función asíncrona para llenar la tabla con los registros disponibles.
*   Parámetros: form (objeto opcional con los datos de búsqueda).
*   Retorno: ninguno.
*/
const fillTable = async (form = null) => {
    // Se inicializa el contenido de la tabla.
    TABLE_BODY.innerHTML = '';
    // Se verifica la acción a realizar.
    (form) ? action = 'searchRows' : action = 'readAll';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(PRODUCTO_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se establece un icono para el estado del producto.
            (row.estado_producto) ? icon = 'bi bi-eye-fill' : icon = 'bi bi-eye-slash-fill';
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            TABLE_BODY.innerHTML += `
                <tr>
                    <td><img src="${SERVER_URL}images/productos/${row.imagen_producto}" alt="Image" style="width: 100px; height: 100px;"></td>
                    <td>${row.nombre_producto}</td>
                    <td>${row.descripcion_producto}</td>
                    <td>$${row.precio_producto}</td>
                    <td>${row.color_producto}</td>
                    <td>
                        <button type="button" class="btn btn-warning btn-sm" onclick="openDetails(${row.id_producto})">
                            <img src="../../imagenes/logo_editar.png" alt="" width="50px" height="50px">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button type="button" class="btn btn-danger btn-sm" onclick="openDelete(${row.id_producto})">
                            <img src="../../imagenes/logo_eliminar.png" alt="" width="50px" height="50px">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
    } else {
        sweetAlert(4, DATA.error, true);
    }
}

/*
*   Función asíncrona para preparar el formulario al momento de actualizar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
let updateId;

const openDetails = async (id) =>{
    updateId = id;
    const FORM = new FormData();
    FORM.append('idProducto', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(PRODUCTO_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se prepara el formulario.
        UPDATE_FORM.reset();
        // Se muestra la caja de diálogo con su título.
        UPDATE_MODAL.show();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        NOMBRE_PRODUCTO.value = ROW.nombre_producto;
        DESCRIPCION_PRODUCTO.value = ROW.descripcion_producto;
        PRECIO_PRODUCTO.value = ROW.precio_producto;
        COLOR_PRODUCTO.value = ROW.color_producto;

    } else {
        sweetAlert(2, DATA.error, false);
    }
}

// Método del evento para cuando se envía el formulario de guardar.
UPDATE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    action = 'updateRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(UPDATE_FORM);
    FORM.append('idProducto', updateId);
    FORM.append('nombreProduct', NOMBRE_PRODUCTO.value);
    FORM.append('descripcionProductoEditar', DESCRIPCION_PRODUCTO.value);
    FORM.append('colorProduct', COLOR_PRODUCTO.value);
    FORM.append('precioProduct', PRECIO_PRODUCTO.value);

    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(PRODUCTO_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        UPDATE_MODAL.hide();
        UPDATE_FORM.reset();
        NOMBRE_PRODUCTO.value = '';
        DESCRIPCION_PRODUCTO.value = '';
        COLOR_PRODUCTO.value = '';
        PRECIO_PRODUCTO.value = '';
        document.getElementById('imagen').value = '';
        
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        fillTable();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

/*
*   Función asíncrona para eliminar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
let idDelete;
const openDelete = async (id) => {
    idDelete = id;
    DELETE_MODAL.show();    
}

const delet = async () =>{
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idProducto', idDelete);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(PRODUCTO_API, 'deleteRow', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        sweetAlert(1, DATA.message, true);
        DELETE_MODAL.hide();
        fillTable();
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

/*
*   Función para abrir un reporte automático de productos por categoría.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openReport = () => {
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(`${SERVER_URL}reports/admin/productos.php`);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}
