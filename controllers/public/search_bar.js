$(document).ready(function() {

    $('#search').on('input', function() {
        var searchTerm = $(this).val().toLowerCase();
        $.ajax({
            url: 'search.php',
            type: 'GET',
            data: { query: searchTerm },
            success: function(data) {
                var products = JSON.parse(data);
                $('#product-list').empty();
                products.forEach(function(product) {
                    var productHtml = `
                        <div class="col-md-4">
                            <div class="card">
                                <img src="${product.imagen}" class="card-img-top" alt="${product.nombre}">
                                <div class="card-body">
                                    <h5 class="card-title">${product.nombre}</h5>
                                    <p class="card-text">$${product.precio}</p>
                                    <button class="btn btn-primary add-to-cart" data-id="${product.id}" data-name="${product.nombre}" data-price="${product.precio}" data-image="${product.imagen}">Agregar al carrito</button>
                                </div>
                            </div>
                        </div>
                    `;
                    $('#product-list').append(productHtml);
                });
            }
        });
    });
});
