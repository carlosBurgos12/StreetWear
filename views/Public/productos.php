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

$sql = "SELECT * FROM Productos";
$result = $conn->query($sql);

$productos = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $productos[] = $row;
    }
} 

$conn->close();

header('Content-Type: application/json');
echo json_encode($productos);
?>
