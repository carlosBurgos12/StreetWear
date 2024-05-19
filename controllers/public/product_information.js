const PRODUCTO_API = 'services/public/producto.php';
const PARAMS = new URLSearchParams(location.search);
const PRODUCTOS = document.getElementById('productos');

document.addEventListener('DOMContentLoaded', async () => {
    loadTemplate();
    const FORM = new FormData();
    FORM.append('idCategoria', PARAMS.get('id'));
    const DATA = await fetchData(PRODUCTO_API, 'readProductosCategoria', FORM);
    if (DATA.status) {
        MAIN_TITLE.textContent = `Categoría: ${PARAMS.get('nombre')}`;
        PRODUCTOS.innerHTML = '';
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
        MAIN_TITLE.textContent = DATA.error;
    }
});

function loadTemplate() {}

async function fetchData(api, action, formData) {
    try {
        const response = await fetch(api, {
            method: 'POST',
            body: formData
        });
        return await response.json();
    } catch (error) {
        return { status: false, error: error.message };
    }
}
