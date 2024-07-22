<?php
require('fpdf/fpdf.php');

// Obtener los detalles del pedido desde la base de datos
require_once('../../models/data/pedido_data.php');
$pedidos = new PedidoData;
$pedidoId = $_SESSION['pedido_id']; // Asume que el ID del pedido se guarda en la sesión

$detallesPedido = $pedidos->getOrderDetails($pedidoId); // Obtén los detalles del pedido

// Crear un nuevo PDF
$pdf = new FPDF();
$pdf->AddPage();
$pdf->SetFont('Arial', 'B', 12);

// Encabezado del documento
$pdf->Cell(0, 10, 'Factura de Compra', 0, 1, 'C');
$pdf->Ln(10);

// Información del cliente
$pdf->Cell(0, 10, 'Cliente: ' . $_SESSION['nombre_Cliente'], 0, 1);
$pdf->Cell(0, 10, 'Email: ' . $_SESSION['correo_Cliente'], 0, 1);
$pdf->Ln(10);

// Encabezado de la tabla de detalles del pedido
$pdf->Cell(40, 10, 'Producto', 1);
$pdf->Cell(30, 10, 'Cantidad', 1);
$pdf->Cell(30, 10, 'Precio Unitario', 1);
$pdf->Cell(30, 10, 'Sub-total', 1);
$pdf->Ln();

// Detalles del pedido
$total = 0;
foreach ($detallesPedido as $detalle) {
    $subtotal = $detalle['precio_producto'] * $detalle['cantidad_Producto'];
    $total += $subtotal;

    $pdf->Cell(40, 10, $detalle['nombre_producto'], 1);
    $pdf->Cell(30, 10, $detalle['cantidad_Producto'], 1);
    $pdf->Cell(30, 10, '$' . number_format($detalle['precio_producto'], 2), 1);
    $pdf->Cell(30, 10, '$' . number_format($subtotal, 2), 1);
    $pdf->Ln();
}

// Total
$pdf->Cell(100, 10, 'Total', 1);
$pdf->Cell(30, 10, '$' . number_format($total, 2), 1);
$pdf->Ln();

// Salida del PDF
$pdf->Output('D', 'Factura_' . $pedidoId . '.pdf');
?>
