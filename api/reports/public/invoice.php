<?php
require_once('../../helpers/report.php');

$pdf = new Report;

// Verifica si se ha proporcionado un ID de pedido
if (isset($_GET['idOrder'])) {
    require_once('../../models/data/order_data.php');
    require_once('../../models/data/cliente_data.php');
    
    $order = new OrderData;
    $cliente = new ClienteData;
    
    if ($order->setId($_GET['idOrder']) && $orderDetails = $order->readOne()) {
        $cliente->setId($orderDetails['id_Cliente']);
        $clientDetails = $cliente->readOne();

        // Inicia el reporte PDF
        $pdf->startReport('Factura para el Pedido ' . $orderDetails['ordercode']);
        
        // Agrega detalles del cliente
        if ($clientDetails) {
            $pdf->setFont('Arial', 'B', 12);
            $pdf->cell(0, 10, 'Detalles del Cliente', 0, 1);
            $pdf->setFont('Arial', '', 11);
            $pdf->cell(0, 10, 'Nombre: ' . $clientDetails['nombre_Cliente'] . ' ' . $clientDetails['apellido_Cliente'], 0, 1);
            $pdf->cell(0, 10, 'Correo: ' . $clientDetails['correo_Cliente'], 0, 1);
            $pdf->cell(0, 10, 'Teléfono: ' . $clientDetails['numero_Cliente'], 0, 1);
            $pdf->cell(0, 10, 'Dirección: ' . $clientDetails['direccion_Cliente'], 0, 1);
            $pdf->ln(10);
        }
        
        // Agrega detalles del pedido
        $pdf->setFont('Arial', 'B', 12);
        $pdf->cell(0, 10, 'Detalles del Pedido', 0, 1);
        $pdf->setFont('Arial', '', 11);
        $pdf->cell(0, 10, 'Código de Pedido: ' . $orderDetails['ordercode'], 0, 1);
        $pdf->cell(0, 10, 'Producto: ' . $orderDetails['order_product'], 0, 1);
        $pdf->cell(0, 10, 'Monto: $' . number_format($orderDetails['amount'], 2), 0, 1);
        $pdf->ln(10);
        
        // Genera el PDF
        $pdf->output('I', 'factura.pdf');
    } else {
        print('Pedido no encontrado');
    }
} else {
    print('No se proporcionó ID de pedido');
}
?>
