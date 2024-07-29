<?php
require('fpdf/fpdf.php');
require '../../helper/database.php';

if ($mysqli->connect_error) {
    die("Conexión fallida: " . $mysqli->connect_error);
}

// Crear instancia de FPDF
$pdf = new FPDF();
$pdf->AddPage();
$pdf->SetFont('Arial', 'B', 16);

// Título del reporte
$pdf->Cell(0, 10, 'Reporte General de Administrador - StreetWear Drop', 0, 1, 'C');
$pdf->Ln(10);

// Información de administradores
$pdf->SetFont('Arial', 'B', 14);
$pdf->Cell(0, 10, 'Administradores', 0, 1, 'L');
$pdf->SetFont('Arial', '', 12);

// Consulta para obtener datos de administradores
$result = $mysqli->query("SELECT * FROM administrador");

$pdf->Cell(30, 10, 'ID', 1);
$pdf->Cell(50, 10, 'Nombre', 1);
$pdf->Cell(50, 10, 'Apellido', 1);
$pdf->Cell(60, 10, 'Correo', 1);
$pdf->Cell(40, 10, 'Alias', 1);
$pdf->Ln();

while ($row = $result->fetch_assoc()) {
    $pdf->Cell(30, 10, $row['id_administrador'], 1);
    $pdf->Cell(50, 10, $row['nombre_administrador'], 1);
    $pdf->Cell(50, 10, $row['apellido_administrador'], 1);
    $pdf->Cell(60, 10, $row['correo_administrador'], 1);
    $pdf->Cell(40, 10, $row['alias_administrador'], 1);
    $pdf->Ln();
}

// Información de clientes
$pdf->Ln(10);
$pdf->SetFont('Arial', 'B', 14);
$pdf->Cell(0, 10, 'Clientes', 0, 1, 'L');
$pdf->SetFont('Arial', '', 12);

$result = $mysqli->query("SELECT * FROM Clientes");

$pdf->Cell(30, 10, 'ID', 1);
$pdf->Cell(50, 10, 'Nombre', 1);
$pdf->Cell(50, 10, 'Apellido', 1);
$pdf->Cell(40, 10, 'Correo', 1);
$pdf->Cell(60, 10, 'Dirección', 1);
$pdf->Ln();

while ($row = $result->fetch_assoc()) {
    $pdf->Cell(30, 10, $row['id_Cliente'], 1);
    $pdf->Cell(50, 10, $row['nombre_Cliente'], 1);
    $pdf->Cell(50, 10, $row['apellido_Cliente'], 1);
    $pdf->Cell(40, 10, $row['correo_Cliente'], 1);
    $pdf->Cell(60, 10, $row['direccion_Cliente'], 1);
    $pdf->Ln();
}

// Información de productos
$pdf->Ln(10);
$pdf->SetFont('Arial', 'B', 14);
$pdf->Cell(0, 10, 'Productos', 0, 1, 'L');
$pdf->SetFont('Arial', '', 12);

$result = $mysqli->query("SELECT * FROM Productos");

$pdf->Cell(30, 10, 'ID', 1);
$pdf->Cell(50, 10, 'Nombre', 1);
$pdf->Cell(40, 10, 'Descripción', 1);
$pdf->Cell(30, 10, 'Precio', 1);
$pdf->Cell(30, 10, 'Cantidad', 1);
$pdf->Ln();

while ($row = $result->fetch_assoc()) {
    $pdf->Cell(30, 10, $row['id_producto'], 1);
    $pdf->Cell(50, 10, $row['nombre_producto'], 1);
    $pdf->Cell(40, 10, $row['descripcion_producto'], 1);
    $pdf->Cell(30, 10, $row['precio_producto'], 1);
    $pdf->Cell(30, 10, $row['cantidad_producto'], 1);
    $pdf->Ln();
}

// Cerrar conexión a la base de datos
$mysqli->close();

// Salida del PDF
$pdf->Output();
?>
