<?php
session_start();

// Conexión a la base de datos
$conn = new mysqli('localhost', 'root', 'contraseña', 'streetweardrop_db.sql');

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $productId = $_POST['id'];
    
    // Aquí se agregará el producto al carrito
    // Esto podría implicar agregar el producto a una variable de sesión o una tabla en la base de datos

    // Ejemplo usando sesión:
    if (!isset($_SESSION['cart'])) {
        $_SESSION['cart'] = array();
    }

    // Agregar el producto al carrito
    array_push($_SESSION['cart'], $productId);

    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido']);
}

$conn->close();
?>
