<?php
// Se incluye la clase del modelo.
require_once('../../models/data/orders_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $order = new OrderData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $order->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$order->setProduct($_POST['order_product']) or
                    !$order->setCode($_POST['ordercode']) or
                    !$order->setAmount($_POST['amount']) or
                    !$order->setImagen($_FILES['image_order'])
                ) {
                    $result['error'] = $order->getDataError();
                } elseif ($order->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Orden creada correctamente';
                    // Se asigna el estado del archivo después de insertar.
                    $result['fileStatus'] = Validator::saveFile($_FILES['image_order'], $order::RUTA_IMAGEN);
                } else {
                    $result['error'] = 'Ocurrió un problema al crear la orden';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $order->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen ordenes registradas';
                }
                break;
            case 'readOne':
                if (!$order->setId($_POST['id_order'])) {
                    $result['error'] = $order->getDataError();
                } elseif ($result['dataset'] = $order->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Orden inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$order->setId($_POST['id_order']) or
                    !$order->setFilename() or
                    !$order->setProduct($_POST['order_product']) or
                    !$order->setCode($_POST['ordercode']) or
                    !$order->setAmount($_POST['amount']) or
                    !$order->setImagen($_POST['image_order']) or
                    !$order->setImagen($_FILES['image_order'], $order->getFilename())
                ) {
                    $result['error'] = $order->getDataError();
                } elseif ($order->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Orden modificada correctamente';
                    // Se asigna el estado del archivo después de actualizar.
                    $result['fileStatus'] = Validator::changeFile($_FILES['image_order'], $order::RUTA_IMAGEN, $order->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar la orden';
                }
                break;
            case 'deleteRow':
                if (
                    !$order->setId($_POST['id_order']) or
                    !$order->setFilename()
                ) {
                    $result['error'] = $order->getDataError();
                } elseif ($order->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Orden eliminada correctamente';
                    // Se asigna el estado del archivo después de eliminar.
                    $result['fileStatus'] = Validator::deleteFile($order::RUTA_IMAGEN, $order->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar la orden';
                }
        }
        // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
        $result['exception'] = Database::getException();
        // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
        header('Content-type: application/json; charset=utf-8');
        // Se imprime el resultado en formato JSON y se retorna al controlador.
        print(json_encode($result));
    } else {
        print(json_encode('Acceso denegado'));
    }
} else {
    print(json_encode('Recurso no disponible'));
}
