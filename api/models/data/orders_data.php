<?php
// Se incluye la clase para validar los datos de entrada.
require_once ('../../helper/validator.php');
// Se incluye la clase padre.
require_once ('../../models/handler/orders_handler.php');
/*
 *	Clase para manejar el encapsulamiento de los datos de la tabla ORDERS.
 */
class OrderData extends OrderHandler
{
    /*
     *  Atributos adicionales.
     */
    private $data_error = null;
    private $filename = null;

    /*
     *   Métodos para validar y establecer los datos.
     */
    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            $this->data_error = 'El identificador de la orden es incorrecto';
            return false;
        }
    }

    public function setProduct($value, $min = 2, $max = 50)
    {
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'El nombre del producto debe ser un valor alfanumérico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->product = $value;
            return true;
        } else {
            $this->data_error = 'El nombre del producto debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setCode($value, $min = 2, $max = 250)
    {
        if (Validator::validateMoney($value)) {
            $this->code = $value;
            return true;
        } else {
            $this->data_error = 'El precio debe ser un número positivo';
            return false;
        }
    }

    public function setAmount($value, $min = 2, $max = 250)
    {
        if (Validator::validateMoney($value)) {
            $this->amount = $value;
            return true;
        } else {
            $this->data_error = 'La cantidad debe ser un número positivo';
            return false;
        }
    }

    public function setImagen($file, $filename = null)
    {
        if (Validator::validateImageFile($file, 100)) {
            $this->imagen = Validator::getFileName();
            return true;
        } elseif (Validator::getFileError()) {
            $this->data_error = Validator::getFileError();
            return false;
        } elseif ($filename) {
            $this->imagen = $filename;
            return true;
        } else {
            $this->imagen = 'default.png';
            return true;
        }
    }

    public function setFilename()
    {
        if ($data = $this->readFilename()) {

            $this->filename = $data['image_order'];

            return true;
        } else {
            $this->data_error = 'Orden inexistente';
            return false;
        }
    }

    /*
     *  Métodos para obtener el valor de los atributos adicionales.
     */
    public function getDataError()
    {
        return $this->data_error;
    }

    public function getFilename()
    {
        return $this->filename;
    }
}
