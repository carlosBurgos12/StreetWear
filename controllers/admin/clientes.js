// Constante para completar la ruta de la API.
const CLIENTES_API = 'services/admin/clientes.php';
// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');
// Constantes para establecer los elementos de la tabla.
const TABLE_BODY = document.getElementById('tableBody');
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#crearClientModal');
const ELIMINAR_MODAL = new bootstrap.Modal('#eliminarClientModal');
const ACTU_MODAL = new bootstrap.Modal('#editarClientModal');
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('formCreate');
const ACTU_FORM = document.getElementById('updateForm');

const NOMBRE_CLIENT_EDITAR = document.getElementById('nombreClientEditar');
const APELLIDO_CLIENT_EDITAR = document.getElementById('apellidoClientEditar');
const NUMERO_CLIENT_EDITAR = document.getElementById('numeroClientEditar');
const EMAIL_CLIENT_EDITAR = document.getElementById('emailClientEditar');
const DIRECCION_CLIENTE_EDITAR = document.getElementById('direccionClienteEditar');
const IMAGEN_CLIENT_EDITAR = document.getElementById('imagenClientEditar');


// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    loadTemplate();

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
    const DATA = await fetchData(CLIENTES_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            TABLE_BODY.innerHTML += `
                <tr>
                    <td><img src="${SERVER_URL}images/clientes/${row.img_Cliente}" height="50"></td>
                    <td>${row.nombre_Cliente} ${row.apellido_Cliente}</td>
                    <td>${row.numero_Cliente}</td>
                    <td>${row.direccion_Cliente}</td>
                    <td>${row.correo_Cliente}</td>
                    <td>
                        <button type="button" class="btn btn-warning btn-sm" onclick="openUpdate(${row.id_Cliente})">
                            <img src="../../imagenes/logo_editar.png" alt="" width="50px" height="50px">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button type="button" class="btn btn-danger btn-sm" onclick="openDetailsDelete(${row.id_Cliente})">
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


// Método del evento para cuando se envía el formulario de guardar.
SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    FORM.append('estado', 1);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(CLIENTES_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL.hide();
        SAVE_FORM.reset();
        document.getElementById('imagenClient').value = '';

        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        fillTable();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

document.getElementById('telefonoClient').addEventListener('input', function () {
    var telefonoInput = this.value.replace(/[^0-9]/g, ''); // Elimina caracteres no numéricos
    if (telefonoInput.length > 4) {
        telefonoInput = telefonoInput.substring(0, 4) + '-' + telefonoInput.substring(4, 8);
    }
    this.value = telefonoInput;
});

document.getElementById('numeroClientEditar').addEventListener('input', function () {
    var telefonoInput = this.value.replace(/[^0-9]/g, ''); // Elimina caracteres no numéricos
    if (telefonoInput.length > 4) {
        telefonoInput = telefonoInput.substring(0, 4) + '-' + telefonoInput.substring(4, 8);
    }
    this.value = telefonoInput;
});

let idDelete;

const openDetailsDelete = (id) => {
    idDelete = id;
    ELIMINAR_MODAL.show();
}


const delet = async () => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idCliente', idDelete);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(CLIENTES_API, 'deleteRow', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        sweetAlert(1, DATA.message, true);
        ELIMINAR_MODAL.hide();
        fillTable();
    } else {
        if (DATA.exception === 'Violación de restricción de integridad') {
            sweetAlert(2, 'No se puede eliminar debido a que el cliente tiene pedidos', false);
        }
        else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

let idActu;

const openUpdate = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idCliente', id);
    idActu = id;
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(CLIENTES_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        ACTU_MODAL.show();
        // Se prepara el formulario.
        ACTU_FORM.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        NOMBRE_CLIENT_EDITAR.value = ROW.nombre_Cliente;
        APELLIDO_CLIENT_EDITAR.value = ROW.apellido_Cliente;
        EMAIL_CLIENT_EDITAR.value = ROW.correo_Cliente;
        NUMERO_CLIENT_EDITAR.value = ROW.numero_Cliente;
        DIRECCION_CLIENTE_EDITAR.value = ROW.direccion_Cliente;

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
    FORM.append('idCliente', idActu);

    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(CLIENTES_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        ACTU_MODAL.hide();
        ACTU_FORM.reset();
        document.getElementById('imagenClientEditar').value = '';
        
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        fillTable();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});