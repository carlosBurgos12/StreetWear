<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "streetweardrop_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$search = $_POST['search'] ?? '';
$category = $_POST['category'] ?? '';
$minPrice = $_POST['minPrice'] ?? 0;
$maxPrice = $_POST['maxPrice'] ?? 1000000;

$sql = "SELECT * FROM Productos WHERE nombre_producto LIKE ? AND precio_producto BETWEEN ? AND ?";
$params = ["%$search%", $minPrice, $maxPrice];

if ($category != '') {
    $sql .= " AND idCategoria = ?";
    $params[] = $category;
}

$stmt = $conn->prepare($sql);

if ($category != '') {
    $stmt->bind_param("sdds", ...$params);
} else {
    $stmt->bind_param("sdd", ...$params);
}

$stmt->execute();
$result = $stmt->get_result();

$output = '';
while($row = $result->fetch_assoc()) {
    $output .= '
    <div class="col-md-4 product-card">
        <div class="card">
            <img src="images/' . $row['imagen_producto'] . '" class="card-img-top" alt="' . $row['nombre_producto'] . '">
            <div class="card-body">
                <h5 class="card-title">' . $row['nombre_producto'] . '</h5>
                <p class="card-text">Descripción: ' . $row['descripcion_producto'] . '</p>
                <p class="card-text">Precio: $' . $row['precio_producto'] . '</p>
                <p class="card-text">Talla: ' . $row['talla_producto'] . '</p>
                <p class="card-text">Color: ' . $row['color_producto'] . '</p>
            </div>
        </div>
    </div>
    ';
}

echo $output;

$conn->close();
?>
