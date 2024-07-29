<?php
require('fpdf.php');
require '../../helper/database.php';

// Crear instancia de FPDF
$pdf = new FPDF();
$pdf->AddPage();
$pdf->SetFont('Arial', 'B', 16);

// Título del reporte
$pdf->Cell(0, 10, 'Reporte de Ordenes - StreetWear Drop', 0, 1, 'C');
$pdf->Ln(10);

// Información de órdenes
$pdf->SetFont('Arial', 'B', 14);
$pdf->Cell(0, 10, 'Ordenes', 0, 1, 'L');
$pdf->SetFont('Arial', '', 12);

// Consulta para obtener datos de órdenes
$result = $mysqli->query("SELECT * FROM ordenes");

$pdf->Cell(30, 10, 'ID', 1);
$pdf->Cell(50, 10, 'Código', 1);
$pdf->Cell(60, 10, 'Producto', 1);
$pdf->Cell(30, 10, 'Cantidad', 1);
$pdf->Cell(40, 10, 'Imagen', 1);
$pdf->Ln();

while ($row = $result->fetch_assoc()) {
    $pdf->Cell(30, 10, $row['id_orden'], 1);
    $pdf->Cell(50, 10, $row['codigo_orden'], 1);
    $pdf->Cell(60, 10, $row['producto_orden'], 1);
    $pdf->Cell(30, 10, $row['cantidad_orden'], 1);
    $pdf->Cell(40, 10, $row['imagen_orden'], 1);
    $pdf->Ln();
}

// Cerrar conexión a la base de datos
$mysqli->close();

// Salida del PDF
$pdf->Output();
?>
