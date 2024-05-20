$(document).ready(function() {
    $('.add-to-cart').on('click', function() {
        var productId = $(this).data('id');
        var productName = $(this).data('name');
        var productPrice = $(this).data('price');
        var productImage = $(this).data('image');

        var cart = JSON.parse(localStorage.getItem('cart')) || [];

        var product = {
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage
        };

        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));

        window.location.href = 'cart.html';
    });
});
