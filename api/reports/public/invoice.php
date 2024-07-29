<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helper/report.php');
// Obtener los detalles del pedido desde la base de datos
require_once('../../models/data/pedido_data.php');
$pedidos = new PedidoData;

// Crear un nuevo PDF
$pdf = new Report();
$pdf->startReportPublic('Factura del carrito');
$detallesPedido = $pedidos->readAllCarrito(); // Obtén los detalles del pedido
$pdf->SetFont('Arial', 'B', 12);

// Encabezado del documento
$pdf->Cell(0, 10, 'Factura de Compra', 0, 1, 'C');
$pdf->Ln(10);

// Información del cliente
//$pdf->Cell(0, 10, 'Cliente: ' . $_SESSION['nombre_Cliente'], 0, 1);
$pdf->Cell(0, 10, 'Email: ' . $_SESSION['correoCliente'], 0, 1);
$pdf->Ln(10);

// Encabezado de la tabla de detalles del pedido
$pdf->Cell(40, 10, 'Producto', 1);
$pdf->Cell(30, 10, 'Cantidad', 1);
$pdf->Cell(30, 10, 'Precio Unitario ', 1);
$pdf->Cell(30, 10, 'Sub-total', 1);
$pdf->Ln();

// Detalles del pedido
$total = 0;
foreach ($detallesPedido as $detalle) {
    $subtotal = $detalle['precio_producto'] * $detalle['cantidad_Producto'];
    $total += $subtotal;

    $pdf->Cell(40, 10, $detalle['nombre_producto'], 1, 0);
    $pdf->Cell(30, 10, $detalle['cantidad_Producto'], 1, 0);
    $pdf->Cell(30, 10, '$' . number_format($detalle['precio_producto'], 2), 1, 0);
    $pdf->Cell(30, 10, '$' . number_format($subtotal, 2), 1, 1);
}

// Total
$pdf->Cell(100, 10, 'Total', 1);
$pdf->Cell(30, 10, '$' . number_format($total, 2), 1);
$pdf->Ln();

// Salida del PDF
$pdf->Output('D', 'Factura.pdf');
?>
