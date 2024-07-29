<?php
require '../../libraries/fpdf185/fpdf.php'; // Ruta a la librería FPDF
require '../../helper/database.php';

// Crear una clase personalizada que extiende FPDF
class PDF extends FPDF {
    // Encabezado de la página
    function Header() {
        // Logo
        $this->Image('../../imagenes/logo_streetwear.jpg', 10, 6, 30);
        $this->SetFont('Arial', 'B', 14);
        $this->Cell(70); // Mueve a la derecha
        $this->Cell(50, 10, 'Reporte de Categorias', 0, 0, 'C'); // Título
        $this->Ln(20); // Salto de línea
    }

    // Pie de página
    function Footer() {
        $this->SetY(-15); // Posición a 1.5 cm del final
        $this->SetFont('Arial', 'I', 8);
        $this->Cell(0, 10, 'Pagina ' . $this->PageNo(), 0, 0, 'C');
    }

    // Tabla con las categorías
    function CategoriasTable($header, $data) {
        $this->SetFont('Arial', 'B', 12);
        // Ancho de las columnas
        $w = array(20, 50, 120);
        // Cabeceras
        for ($i = 0; $i < count($header); $i++) {
            $this->Cell($w[$i], 7, $header[$i], 1, 0, 'C');
        }
        $this->Ln();
        // Datos
        $this->SetFont('Arial', '', 12);
        foreach ($data as $row) {
            $this->Cell($w[0], 6, $row['idCategoria'], 1);
            $this->Cell($w[1], 6, $row['nombreCategoria'], 1);
            $this->Cell($w[2], 6, $row['descripcionCategoria'], 1);
            $this->Ln();
        }
    }
}

// Consulta SQL para obtener las categorías
$sql = "SELECT idCategoria, nombreCategoria, descripcionCategoria FROM Categorias";
$result = $conn->query($sql);

// Array para almacenar los datos de las categorías
$data = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// Creación del PDF
$pdf = new PDF();
$pdf->AddPage();
$header = array('ID', 'Nombre', 'Descripción');
$pdf->CategoriasTable($header, $data);
$pdf->Output('D', 'reporte_categorias.pdf'); // Descarga el archivo PDF
?>
