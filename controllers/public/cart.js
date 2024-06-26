// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'CART';
});



// Declaraciones de constantes para los elementos del DOM
const PEDIDO_API = 'services/public/carrito.php';
const TABLE_BODY = document.getElementById('tableBody');
const ITEM_MODAL = new bootstrap.Modal('#itemModal');
const ITEM_FORM = document.getElementById('itemForm');

document.addEventListener('DOMContentLoaded', () => {
    readDetail();
});

ITEM_FORM.addEventListener('submit', async (event) => {
    event.preventDefault();
    const FORM = new FormData(ITEM_FORM);
    FORM.append('idDetallesPedido', idPedido);
    const DATA = await fetchData(PEDIDO_API, 'updateRow', FORM);
    if (DATA.status) {
        readDetail();
        ITEM_MODAL.hide();
        sweetAlert(1, DATA.message, true);
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

let total = 0; // Variable para almacenar el total del pedido

async function readDetail() {
    const DATA = await fetchData(PEDIDO_API, 'readAll');
    if (DATA.status) {
        TABLE_BODY.innerHTML = '';
        let subtotal = 0;
        DATA.dataset.forEach(row => {
        subtotal = row.precio_producto * row.cantidad_Producto;
        total += subtotal;
        TABLE_BODY.innerHTML += `
            <tr>
                <td>${row.nombre_producto}</td>
                <td>${row.cantidad_Producto}</td>
                <td>${row.precio_producto}</td>
                <td>${subtotal.toFixed(2)}</td>
                <td>
                    <button type="button" onclick="openUpdate(${row.id_Pedido_Detalle}, ${row.cantidad_Producto})" class="btn btn-info">
                        <i class="bi bi-plus-slash-minus"></i>
                    </button>
                    <button type="button" onclick="openDelete(${row.id_Pedido_Detalle})" class="btn btn-danger">
                        <i class="bi bi-cart-dash"></i>
                    </button>
                </td>
            </tr>
        `;

        });
        document.getElementById('totalPedido').textContent = `Total: $${total.toFixed(2)}`;
    } else {
        const DATA0 = await fetchData(PEDIDO_API, 'verCarrito');

        if (DATA0.status) {
            TABLE_BODY.innerHTML = '';
            let subtotal = 0;
            total += subtotal;
            TABLE_BODY.innerHTML += `
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        
                    </td>
                </tr>
            `;

            document.getElementById('totalPedido').innerHTML = `Total: $${0}`;
        }
        else {
            const FORM1 = new FormData();
            FORM1.append('estado_pedido', 'Carrito');
            const DATA2 = await fetchData(PEDIDO_API, 'createRow', FORM1);

            if (DATA2.status) {
                TABLE_BODY.innerHTML = '';
                let subtotal = 0;
                    total += subtotal;
                    TABLE_BODY.innerHTML += `
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                
                            </td>
                        </tr>
                    `;

                sweetAlert(4, DATA.error, true);
                document.getElementById('totalPedido').innerHTML = `Total: $${0}`;
            } else {
                sweetAlert(4, DATA.error, true);
                document.getElementById('totalPedido').innerHTML = `Total: $${0}`;
            }

            if (DATA2 === 'Acceso denegado') {
                await sweetAlert(4, 'Debe de iniciar sesión', true);
                location.href = 'index.html';
            }
        }
    }
}

let idPedido = 0;
let cantidad = 0;

window.openUpdate = (id, quantity) => {
    ITEM_MODAL.show();
    idPedido = id;
    document.getElementById('cant').value = quantity;
}

// Definición de la función asíncrona para cancelar y cerrar el modal.
const botonCancelar = async () => {
    ITEM_MODAL.hide();

}

window.openDelete = async (id) => {
    const RESPONSE = await confirmAction('¿Está seguro de remover el producto?');
    if (RESPONSE) {
        const FORM = new FormData();
        FORM.append('idDetallesPedido', id);
        const DATA = await fetchData(PEDIDO_API, 'deleteDetail', FORM);
        if (DATA.status) {
            await sweetAlert(1, DATA.message, true);
            readDetail();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

window.finishOrder = async () => {
    const RESPONSE = await confirmAction('¿Está seguro de finalizar el pedido?');
    if (RESPONSE) {
        const DATA = await fetchData(PEDIDO_API, 'finishOrder');
        if (DATA.status) {
            sweetAlert(1, DATA.message, true, 'index.html');
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

// Función para realizar la compra
const comprar = async () => {
    if (total === 0) {
        sweetAlert(3, 'No hay productos en el carrito', false);
    }
    else {
        // 1. Crear el objeto FormData
        const FORM1 = new FormData();
        FORM1.append('estado_pedido', 'Pendiente');

        // 2. Realizar la petición para update
        const DATA = await fetchData(PEDIDO_API, 'update', FORM1);

        if (DATA.status) {
            await sweetAlert(1, 'Se ha comprado con exito, espera tu paquete', false);
            readDetail(); // Vuelve a cargar la tabla
        } else {
            if (DATA === 'Acceso denegado') {
                await sweetAlert(3, 'Debes de iniciar sesión', false);
                location.href = 'index.html';
            }
            else {
                sweetAlert(3, DATA.error, false);

            }
        }

    }
}