// Constante para completar la ruta de la API.
const CATEGORIA_API = 'services/admin/categoria.php';
// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');
// Constantes para establecer los elementos de la tabla.
const TABLE_BODY = document.getElementById('tableBody');
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#crearCategoriaModal');
const ELIMINAR_MODAL = new bootstrap.Modal('#eliminarCategoriaModal');
const ACTU_MODAL = new bootstrap.Modal('#editarCategoriaModal');
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('formCreate');
const ACTU_FORM = document.getElementById('updateForm');

const NOMBRE_CATEGORIA = document.getElementById('nombreCategoriaEditar'),
    DESCRIPCION_CATEGORIA = document.getElementById('descripcionCategoriaEditar'),
    IMAGEN_CATEGORIA = document.getElementById('imagenCategoriaEditar');

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Se establece el título del contenido principal.
    loadTemplate();
    // Llamada a la función para llenar la tabla con los registros existentes.
    fillTable();
});

// Método del evento para cuando se envía el formulario de buscar.
SEARCH_FORM.addEventListener('submit', (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    const SEARCH_INPUT = document.getElementById('search').value;
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData();
    FORM.append('search', SEARCH_INPUT);
    if (SEARCH_INPUT === '') {
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
    const nom = document.getElementById('nombreCategoriaCrear').value;
    const desc = document.getElementById('descripcionCategoriaCrear').value;
    FORM.append('nombreCategoria', nom);
    FORM.append('descripcionCategoria', desc);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(CATEGORIA_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL.hide();
        SAVE_FORM.reset();
        document.getElementById('nombreCategoriaCrear').value = '';
        document.getElementById('descripcionCategoriaCrear').value = '';
        document.getElementById('imagenCategoria').value = '';
        
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
    const DATA = await fetchData(CATEGORIA_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            TABLE_BODY.innerHTML += `
                <tr>
                    <td><img src="${SERVER_URL}images/categorias/${row.imagenCategoria}" height="50"></td>
                    <td>${row.nombreCategoria}</td>
                    <td>${row.descripcionCategoria}</td>
                    <td>
                        <button type="button" class="btn btn-warning btn-sm" onclick="openDetailsUpdate(${row.idCategoria})">
                            <img src="../../imagenes/logo_editar.png" alt="" width="50px" height="50px">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button type="button" class="btn btn-danger btn-sm" onclick="openDetailsDelete(${row.idCategoria})">
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
*   Función para preparar el formulario al momento de insertar un registro.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openCreate = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL.show();
    MODAL_TITLE.textContent = 'Crear categoría';
    // Se prepara el formulario.
    SAVE_FORM.reset();
}

let idUpdate;

const openDetailsUpdate = async (id) => {
    
    idUpdate = id;
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idCategoria', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(CATEGORIA_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se prepara el formulario.
        ACTU_FORM.reset();
        // Se muestra la caja de diálogo con su título.
        ACTU_MODAL.show();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        NOMBRE_CATEGORIA.value = ROW.nombreCategoria;
        DESCRIPCION_CATEGORIA.value = ROW.descripcionCategoria;
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

// Método del evento para cuando se envía el formulario de guardar.
ACTU_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    action = 'updateRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(ACTU_FORM);
    const nom = document.getElementById('nombreCategoriaEditar').value;
    const desc = document.getElementById('descripcionCategoriaEditar').value;
    FORM.append('idCategoria', idUpdate);
    FORM.append('nombreCategoria', nom);
    FORM.append('descripcionCategoria', desc);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(CATEGORIA_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        ACTU_MODAL.hide();
        SAVE_FORM.reset();
        document.getElementById('nombreCategoriaEditar').value = '';
        document.getElementById('descripcionCategoriaEditar').value = '';
        document.getElementById('imagenCategoria').value = '';
        
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        fillTable();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

let idDelete;

const openDetailsDelete = (id) => {
    idDelete = id;
    ELIMINAR_MODAL.show();    
}

const delet = async () =>{
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idCategoria', idDelete);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(CATEGORIA_API, 'deleteRow', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        sweetAlert(1, DATA.message, false);
        
        ELIMINAR_MODAL.hide();
        fillTable();
    } else {
        if (DATA.exception === 'Violación de restricción de integridad') {
            sweetAlert(2, 'No se puede eliminar debido a que la categoria tiene varios productos', false);
        }
        else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

/*
*   Función asíncrona para preparar el formulario al momento de actualizar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openUpdate = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('id_Categoria', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(CATEGORIA_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar categoría';
        // Se prepara el formulario.
        SAVE_FORM.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_CATEGORIA.value = ROW.id_Categoria;
        NOMBRE_CATEGORIA.value = ROW.nombre_Categoria;
        DESCRIPCION_CATEGORIA.value = ROW.descripcion_Categoria;
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

/*
*   Función asíncrona para eliminar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openDelete = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar la categoría de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idCategoria', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(CATEGORIA_API, 'deleteRow', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se muestra un mensaje de éxito.
            await sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la tabla para visualizar los cambios.
            fillTable();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

/*
*   Función para abrir un reporte parametrizado de productos de una categoría.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openReport = (id) => {
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(`${SERVER_URL}reports/admin/productos_categoria.php`);
    // Se agrega un parámetro a la ruta con el valor del registro seleccionado.
    PATH.searchParams.append('id_Categoria', id);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}