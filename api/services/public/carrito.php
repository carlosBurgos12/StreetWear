<?php
// Se incluye la clase del modelo.
require_once('../../models/data/pedido_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    
    // Se instancia la clase correspondiente.
    $pedidos = new PedidoData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'error' => null, 'exception' => null, 'dataset' => null);
    // Se verifica si existe una sesión iniciada como cliente para realizar las acciones correspondientes.
    if (isset($_SESSION['idCliente'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un cliente ha iniciado sesión.
        switch ($_GET['action']) {
                // Acción para agregar un producto al carrito de compras.
                case 'createDetallePedido':
                    // Validar y procesar los datos del formulario para crear un nuevo registro
                    $_POST = Validator::validateForm($_POST);
                    // Verificar si todos los datos necesarios son válidos
                    if (
                        !$pedidos->setProducto($_POST['producto']) or
                        !$pedidos->setCantidad($_POST['cantidad'])
                    ) {
                        // Si algún dato no es válido, se asigna un mensaje de error
                        $result['error'] = $pedidos->getDataError();
                    } elseif ($result['dataset'] = $pedidos->createDetail()) {
                        $result['status'] = 1;
                        $result['message'] = 'Se ha creado correctamente el detalle pedido';
                    } else {
                        $result['error'] = 'ERROR no se pudo agregar';
                    }
                    break;
    
            // CREAR
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                // Verificar si todos los datos necesarios son válidos
                if (
                    !$pedidos->setEstadoPedido($_POST['estado_pedido'])
                ) {
                    // Si algún dato no es válido, se asigna un mensaje de error
                    $result['error'] = $pedidos->getDataError();
                } elseif ($pedidos->createRowPedidos()) {
                    // Si se crea el registro correctamente, se establece el estado como éxito y se crea un mensaje
                    $result['status'] = 1;
                    $result['message'] = 'Carrito creado correctamente';
                } else {
                    // Si ocurre un problema al crear el pedido, se asigna un mensaje de error
                    $result['error'] = 'Ocurrió un problema al crear el carrito';
                }
                break;

            // LEER TODOS
            case 'readAll':
                if ($result['dataset'] = $pedidos->readAllCarrito()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen carrito del cliente';
                }
                break;

            case 'verCarrito':
                if ($result['dataset'] = $pedidos->verCarrito()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen carrito del cliente';
                }
                break;

            // ACTUALIZAR
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                // Verificar si todos los datos necesarios son válidos
                if (
                    !$pedidos->setIdDetalle($_POST['idDetallesPedido']) or
                    !$pedidos->setCantidad($_POST['cant']) 
                ) {
                    // Si algún dato no es válido, se asigna un mensaje de error
                    $result['error'] = $pedidos->getDataError();
                } elseif ($pedidos->updateDetail()) {
                    // Si se actualiza el registro correctamente, se establece el estado como éxito y se crea un mensaje
                    $result['status'] = 1;
                    $result['message'] = 'Carrito actualizado correctamente';
                } else {
                    // Si ocurre un problema al actualizar el pedido, se asigna un mensaje de error
                    $result['error'] = 'Ocurrió un problema al actualizar el carrito';
                }
                break;

            // CAMBIAR ESTADO DEL PEDIDO
            case 'update':
                $_POST = Validator::validateForm($_POST);
                // Verificar si todos los datos necesarios son válidos
                if (
                    !$pedidos->setEstadoPedido($_POST['estado_pedido']) 
                ) {
                    // Si algún dato no es válido, se asigna un mensaje de error
                    $result['error'] = $pedidos->getDataError();
                } elseif ($pedidos->updateRowPedidos()) {
                    // Si se actualiza el registro correctamente, se establece el estado como éxito y se crea un mensaje
                    $result['status'] = 1;
                    $result['message'] = 'Estado del pedido actualizado correctamente';
                } else {
                    // Si ocurre un problema al actualizar el estado del pedido, se asigna un mensaje de error
                    $result['error'] = 'Ocurrió un problema al actualizar el estado del pedido';
                }
                break;

            // ELIMINAR
            case 'deleteDetail':
                if (!$pedidos->setIdDetalle($_POST['idDetallesPedido'])) {
                    $result['error'] = $pedidos->getDataError();
                } elseif ($pedidos->deleteDetail()) {
                    $result['status'] = 1;
                    $result['message'] = 'Carrito eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el carrito';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
    } else {
        $result['error'] = 'Acción no disponible fuera de la sesión';
    }
    // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
    $result['exception'] = Database::getException();
    // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
    header('Content-type: application/json; charset=utf-8');
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}
