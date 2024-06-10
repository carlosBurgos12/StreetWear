$(document).ready(function(){
    function fetchProducts(){
        var search = $('#search').val();
        var category = $('#category').val();
        var minPrice = $('#minPrice').val();
        var maxPrice = $('#maxPrice').val();
        
        $.ajax({
            url: 'search.php',
            method: 'POST',
            data: {search: search, category: category, minPrice: minPrice, maxPrice: maxPrice},
            success: function(response){
                $('#products').html(response);
            }
        });
    }
    
    $('#search, #category, #minPrice, #maxPrice').on('change keyup', function(){
        fetchProducts();
    });

    fetchProducts();
});
