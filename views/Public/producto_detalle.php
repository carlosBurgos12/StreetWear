<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "streetweardrop_db";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$id = $_GET['id'];
$sql = "SELECT * FROM Productos WHERE id_producto = $id";
$result = $conn->query($sql);

$producto = null;
if ($result->num_rows > 0) {
    $producto = $result->fetch_assoc();
} 

$conn->close();

header('Content-Type: application/json');
echo json_encode($producto);
?>