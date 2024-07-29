<?php
require('../../resources/fpdf/fpdf.php');
require('../../helper/database.php'); 

class PDF extends FPDF {
    // Header
    function Header() {
        // Logo
        $this->Image('../../imagenes/Logo_streetwear.jpg',10,6,30);
        // Arial bold 15
        $this->SetFont('Arial','B',15);
        // Mover a la derecha
        $this->Cell(80);
        // Título
        $this->Cell(30,10,'Client Report',0,1,'C');
        // Salto de línea
        $this->Ln(20);
    }

    // Footer
    function Footer() {
        // Posición a 1.5 cm del final
        $this->SetY(-15);
        // Arial italic 8
        $this->SetFont('Arial','I',8);
        // Número de página
        $this->Cell(0,10,'Page '.$this->PageNo().'/{nb}',0,0,'C');
    }
}

// Crear instancia de la clase heredada
$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->AddPage();
$pdf->SetFont('Arial','B',12);

// Encabezados de columna
$header = array('Name', 'Phone Number', 'Address', 'Email');
$w = array(40, 30, 70, 50); // Ancho de las columnas

// Añadir encabezados de tabla
foreach($header as $key => $col){
    $pdf->Cell($w[$key], 7, $col, 1);
}
$pdf->Ln();

// Consultar clientes desde la base de datos
$sql = "SELECT nombre, numero_telefono, direccion, correo_electronico FROM clientes"; // Ajusta la consulta a tu esquema de BD
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Iterar sobre cada fila
    while($row = $result->fetch_assoc()) {
        $pdf->Cell($w[0], 6, $row['nombre'], 1);
        $pdf->Cell($w[1], 6, $row['numero_telefono'], 1);
        $pdf->Cell($w[2], 6, $row['direccion'], 1);
        $pdf->Cell($w[3], 6, $row['correo_electronico'], 1);
        $pdf->Ln();
    }
} else {
    $pdf->Cell(0,10,'No clients found',0,1);
}

$conn->close();
$pdf->Output();
?>
