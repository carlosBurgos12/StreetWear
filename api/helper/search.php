<?php
// Conexión a la base de datos
$conn = new mysqli('localhost', 'usuario', 'contraseña', 'streetweardrop_db');

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$searchTerm = $_GET['query'];
$sql = "SELECT * FROM productos WHERE nombre LIKE '%$searchTerm%'";
$result = $conn->query($sql);

$productos = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $productos[] = $row;
    }
}

echo json_encode($productos);
$conn->close();
?>
