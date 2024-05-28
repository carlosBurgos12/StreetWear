<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helper/database.php');
/*
*	Clase para manejar el comportamiento de los datos de la tabla ORDERS.
*/
class OrderHandler
{
    /*
    *   Declaración de atributos para el manejo de datos.
    */
    protected $id = null;
    protected $code = null;
    protected $product = null;
    protected $amount = null;
    protected $imagen = null;


    // Constante para establecer la ruta de las imágenes.
    const RUTA_IMAGEN = '../../images/orders/';

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_order , image_order , order_product , amount ,ordercode 
                FROM orders 
                WHERE order_product LIKE ? OR ordercode LIKE ?
                ORDER BY order_product';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO orders(order_product, ordercode, amount, image_order)
                VALUES(?, ?, ?, ?)';
        $params = array($this->product, $this->code, $this->amount, $this->imagen);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_order, image_order, order_product, ordercode, amount
                FROM orders
                ORDER BY order_product';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_order, order_product, ordercode, amount, image_order
                FROM orders
                WHERE id_order = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function readFilename()
    {
        $sql = 'SELECT image_order
                FROM orders
                WHERE id_order = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE orders
                SET image_order = ?, order_product = ?, ordercode = ?, amount = ?
                WHERE id_order = ?';
        $params = array($this->imagen, $this->product, $this->code, $this->amount,  $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM orders
                WHERE id_order = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
