/*
*   Controlador de uso general en las páginas web del sitio privado.
*   Sirve para manejar la plantilla del encabezado y pie del documento.
*/

// Constante para completar la ruta de la API.
const USER_API = 'admin/administrador.php';
// Constante para establecer el elemento del contenido principal.
const MAIN = document.querySelector('main');
MAIN.style.paddingTop = '75px';
MAIN.style.paddingBottom = '100px';
MAIN.classList.add('container');
// Se establece el título de la página web.
document.querySelector('title').textContent = 'StreetWear - Dashboard';
// Constante para establecer el elemento del título principal.
const MAIN_TITLE = document.getElementById('mainTitle');
MAIN_TITLE.classList.add('text-center', 'py-3');

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
            
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ml-auto">
                            <li id="home" class="nav-item active">
                                <a class="nav-link" href="#"> Home <span class="sr-only"></span></a>
                            </li>
                            <script>   // Asignar el evento de clic al label
                                document.getElementById('home').addEventListener('click', function () {
                                    // Redireccionar al usuario a la otra página
                                    window.location.href = 'home.html';
                                });</script>
            
                            <li id="Categories" class="nav-item">
                                <a class="nav-link" href="#"> Categories </a>
                            </li>
                            <script>
                                // Asignar el evento de clic al label
                                document.getElementById('Categories').addEventListener('click', function () {
                                    // Redireccionar al usuario a la otra página
                                    window.location.href = 'crud_categories.html';
                                });
                            </script>
            
            
                            <li id="Admin" class="nav-item">
                                <a class="nav-link" href="#"> Admin </a>
                            </li>
                            <script>
                                // Asignar el evento de clic al label
                                document.getElementById('Admin').addEventListener('click', function () {
                                    // Redireccionar al usuario a la otra página
                                    window.location.href = 'crud_admin.html';
                                });
                            </script>
                            <li id="Worker" class="nav-item">
                                <a class="nav-link" href="#"> Orders </a>
                            </li>
                            <script>
                                // Asignar el evento de clic al label
                                document.getElementById('Worker').addEventListener('click', function () {
                                    // Redireccionar al usuario a la otra página
                                    window.location.href = 'crud_orders.html';
                                });
                            </script>
                            <li id="Clients" class="nav-item">
                                <a class="nav-link" href="#"> Clients </a>
                            </li>
                            <script> // Asignar el evento de clic al label
                                document.getElementById('Clients').addEventListener('click', function () {
                                    // Redireccionar al usuario a la otra página
                                    window.location.href = 'crud_clients.html';
                                });</script>
                            <li id="Products" class="nav-item">
                                <a class="nav-link" href="#"> Products </a>
                            </li>
                            <script> // Asignar el evento de clic al label
                                document.getElementById('Products').addEventListener('click', function () {
                                    // Redireccionar al usuario a la otra página
                                    window.location.href = 'crud_products.html';
                                });</script>
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
                        <p>Home</p>
    
                        <p>Men</p>
    
                        <p>Women</p>
    
                        <p">Shoes</p>
    
                            <p">Caps</p>
    
                                <p>Kids</p>
                                <p>Accessories</p>
    
    
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
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container">
            
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ml-auto">
                            <li id="home" class="nav-item active">
                                <a class="nav-link" href="#"> Home <span class="sr-only"></span></a>
                            </li>
                            <script>   // Asignar el evento de clic al label
                                document.getElementById('home').addEventListener('click', function () {
                                    // Redireccionar al usuario a la otra página
                                    window.location.href = 'home.html';
                                });</script>
            
                            <li id="Categories" class="nav-item">
                                <a class="nav-link" href="#"> Categories </a>
                            </li>
                            <script>
                                // Asignar el evento de clic al label
                                document.getElementById('Categories').addEventListener('click', function () {
                                    // Redireccionar al usuario a la otra página
                                    window.location.href = 'crud_categories.html';
                                });
                            </script>
            
            
                            <li id="Admin" class="nav-item">
                                <a class="nav-link" href="#"> Admin </a>
                            </li>
                            <script>
                                // Asignar el evento de clic al label
                                document.getElementById('Admin').addEventListener('click', function () {
                                    // Redireccionar al usuario a la otra página
                                    window.location.href = 'crud_admin.html';
                                });
                            </script>
                            <li id="Worker" class="nav-item">
                                <a class="nav-link" href="#"> Orders </a>
                            </li>
                            <script>
                                // Asignar el evento de clic al label
                                document.getElementById('Worker').addEventListener('click', function () {
                                    // Redireccionar al usuario a la otra página
                                    window.location.href = 'crud_orders.html';
                                });
                            </script>
                            <li id="Clients" class="nav-item">
                                <a class="nav-link" href="#"> Clients </a>
                            </li>
                            <script> // Asignar el evento de clic al label
                                document.getElementById('Clients').addEventListener('click', function () {
                                    // Redireccionar al usuario a la otra página
                                    window.location.href = 'crud_clients.html';
                                });</script>
                            <li id="Products" class="nav-item">
                                <a class="nav-link" href="#"> Products </a>
                            </li>
                            <script> // Asignar el evento de clic al label
                                document.getElementById('Products').addEventListener('click', function () {
                                    // Redireccionar al usuario a la otra página
                                    window.location.href = 'crud_products.html';
                                });</script>
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
                        <p>Home</p>
    
                        <p>Men</p>
    
                        <p>Women</p>
    
                        <p">Shoes</p>
    
                            <p">Caps</p>
    
                                <p>Kids</p>
                                <p>Accessories</p>
    
    
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
            location.href = 'index.html';
        }
    }
}