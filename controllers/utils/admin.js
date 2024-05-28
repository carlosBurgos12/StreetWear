/*
*   Controlador de uso general en las páginas web del sitio privado.
*   Sirve para manejar la plantilla del encabezado y pie del documento.
*/

// Constante para completar la ruta de la API.
const USER_API = 'services/admin/administrador.php';
// Constante para establecer el elemento del contenido principal.
const MAIN = document.querySelector('main');

/*  Función asíncrona para cargar el encabezado y pie del documento.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const loadTemplate = async () => {
    // Petición para obtener en nombre del usuario que ha iniciado sesión.
    const DATA = await fetchData(USER_API, 'getUser');
    // Se verifica si el usuario está autenticado, de lo contrario se envía a iniciar sesión.
    if (DATA.session) {
        // Se comprueba si existe un alias definido para el usuario, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se agrega el encabezado de la página web antes del contenido principal.
            MAIN.insertAdjacentHTML('beforebegin', `
            <header>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div class="container">

                        <button class="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav ml-auto">
                                <li id="home" class="nav-item active">
                                    <a class="nav-link" href="home.html"> Home <span class="sr-only"></span></a>
                                </li>

                                <li id="Categories" class="nav-item">
                                    <a class="nav-link" href="crud_categories.html"> Categories </a>
                                </li>


                                <li id="Admin" class="nav-item">
                                    <a class="nav-link" href="crud_admin.html"> Admin </a>
                                </li>

                                <li id="Worker" class="nav-item">
                                    <a class="nav-link" href="crud_orders.html"> Orders </a>
                                </li>

                                <li id="Clients" class="nav-item">
                                    <a class="nav-link" href="crud_clients.html"> Clients </a>
                                </li>

                                <li id="Products" class="nav-item">
                                    <a class="nav-link" href="crud_products.html"> Products </a>
                                </li>

                                <li id="cerrarSesion" class="nav-item">
                                    <a class="nav-link" onclick="logOut()"> Log Out </a>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            `);
            // Se agrega el pie de la página web después del contenido principal.
            MAIN.insertAdjacentHTML('afterend', `
                <footer class="footer mt-auto py-3">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-4">
                                <h5>Navigation</h5>
                                <p id="homeFooter">Home</p>
                                <script>
                                    // Asignar el evento de clic al botón
                                    document.getElementById('homeFooter').addEventListener('click', function () {
                                        // Redireccionar al usuario a la otra página
                                        window.location.href = 'home.html';
                                    });
                                </script>
                                <p id="CategoriesFooter">Categories</p>
                                <script>
                                    // Asignar el evento de clic al botón
                                    document.getElementById('CategoriesFooter').addEventListener('click', function () {
                                        // Redireccionar al usuario a la otra página
                                        window.location.href = 'crud_categories.html';
                                    });

                                </script>
                                <p id="AdminFooter">Admin</p>
                                <script>
                                    // Asignar el evento de clic al botón
                                    document.getElementById('AdminFooter').addEventListener('click', function () {
                                        // Redireccionar al usuario a la otra página
                                        window.location.href = 'crud_admin.html';
                                    });
                                </script>
                                <p id="WorkersFooter">Workers</p>
                                <script>
                                    // Asignar el evento de clic al botón
                                    document.getElementById('WorkersFooter').addEventListener('click', function () {
                                        // Redireccionar al usuario a la otra página
                                        window.location.href = 'crud_workers.html';
                                    });
                                </script>
                                <p id="ClientsFooter">Clients</p>
                                <script>
                                    // Asignar el evento de clic al botón
                                    document.getElementById('ClientsFooter').addEventListener('click', function () {
                                        // Redireccionar al usuario a la otra página
                                        window.location.href = 'crud_clients.html';
                                    });
                                </script>
                                <p id="ProductFooter">Products</p>
                                <script>
                                    // Asignar el evento de clic al botón
                                    document.getElementById('ProductFooter').addEventListener('click', function () {
                                        // Redireccionar al usuario a la otra página
                                        window.location.href = 'crud_products.html';
                                    });
                                </script>

                            </div>
                            <div class="col-md-4">
                                <h5>Talk to us</h5>
                                <p>streetwear_support@gmail.com</p>
                                <p>+503 7581-7784</p>
                            </div>
                            <div class="col-md-4">
                                <h5>Follow Us</h5>
                                <p>@StreetWear_Drop</p>
                            </div>
                        </div>
                    </div>
                </footer>
            `);
        } else {
            sweetAlert(3, DATA.error, false, 'index.html');
        }
    } else {
        // Se comprueba si la página web es la principal, de lo contrario se direcciona a iniciar sesión.
        if (location.pathname.endsWith('index.html')) {
            // Se agrega el encabezado de la página web antes del contenido principal.
            MAIN.insertAdjacentHTML('beforebegin', `
                <header>
                    <nav class="navbar fixed-top bg-body-tertiary">
                        <div class="container">
                            <a class="navbar-brand" href="index.html">
                                <h1>StreetWear</h1>
                            </a>
                        </div>
                    </nav>
                </header>
            `);
            // Se agrega el pie de la página web después del contenido principal.
            MAIN.insertAdjacentHTML('afterend', `
            <footer class="footer mt-auto py-3">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6">
                            <h5>Talk to us</h5>
                            <p>streetwear_support@gmail.com</p>
                            <p>+503 7581-7784</p>
                        </div>
                        <div class="col-md-6">
                            <h5>Follow Us</h5>
                            <p>@StreetWear_Drop</p>
                        </div>
                    </div>
                </div>
            </footer>
            `);
        } else {
            location.href = 'index.html';
        }
    }
}