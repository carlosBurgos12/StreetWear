<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../../api/helper/database.php');
/*
*	Clase para manejar el comportamiento de los datos de las tablas PEDIDO y DETALLE_PEDIDO.
*/
class PedidoHandler
{
    /*
    *   Declaración de atributos para el manejo de datos.
    */
    protected $id_pedido = null;
    protected $id_detalle = null;
    protected $cliente = null;
    protected $producto = null;
    protected $cantidad = null;
    protected $estado = null;
    protected $fecha_de_inicio = null;
    protected $direccion = null;

    /*
    *   ESTADOS DEL PEDIDO
    *   Pendiente (valor por defecto en la base de datos). Pedido en proceso y se puede modificar el detalle.
    *   Finalizado. Pedido terminado por el cliente y ya no es posible modificar el detalle.
    *   Entregado. Pedido enviado al cliente.
    *   Anulado. Pedido cancelado por el cliente después de ser finalizado.
    */

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */
    // Método para verificar si existe un pedido en proceso con el fin de iniciar o continuar una compra.
    public function getOrder()
    {
        $this->estado = 'Pendiente';
        $sql = 'SELECT id_pedido
                FROM pedido
                WHERE estado_pedido = ? AND id_cliente = ?';
        $params = array($this->estado, $_SESSION['idCliente']);
        if ($data = Database::getRow($sql, $params)) {
            $_SESSION['idPedido'] = $data['id_pedido'];
            return true;
        } else {
            return false;
        }
    }

    // Método para iniciar un pedido en proceso.
    public function startOrder()
    {
        if ($this->getOrder()) {
            return true;
        } else {
            $sql = 'INSERT INTO pedido(direccion_pedido, id_cliente)
                    VALUES((SELECT direccion_cliente FROM cliente WHERE id_cliente = ?), ?)';
            $params = array($_SESSION['idCliente'], $_SESSION['idCliente']);
            // Se obtiene el ultimo valor insertado de la llave primaria en la tabla pedido.
            if ($_SESSION['idPedido'] = Database::getLastRow($sql, $params)) {
                return true;
            } else {
                return false;
            }
        }
    }

    // Método para agregar un producto al carrito de compras.
    public function createRowPedidos()
    {
        $sql = 'INSERT INTO Pedidos(estado_Pedido, id_Cliente)
                VALUES(?, ?)';
        $params = array($this->estado, $_SESSION['idCliente']);
        return Database::executeRow($sql, $params);
    }

    // Método para agregar un producto al carrito de compras.
    public function createDetail()
    {
        // Se realiza una subconsulta para obtener el precio del producto.
        $sql = 'INSERT INTO DetallePedido(cantidad_Producto, id_Pedido, id_Producto)
                VALUES(?, (SELECT id_Pedido FROM Pedidos where id_Cliente = ? AND estado_Pedido = "Carrito"), ?)';
        $params = array($this->cantidad, $_SESSION['idCliente'], $this->producto);
        return Database::executeRow($sql, $params);
    }

    // Método para obtener los productos que se encuentran en el carrito de compras.
    public function readDetail()
    {
        $sql = 'SELECT id_detalle, nombre_producto, detalle_pedido.precio_producto, detalle_pedido.cantidad_producto
                FROM detalle_pedido
                INNER JOIN pedido USING(id_pedido)
                INNER JOIN producto USING(id_producto)
                WHERE id_pedido = ?';
        $params = array($_SESSION['idPedido']);
        return Database::getRows($sql, $params);
    }

    public function verCarrito()
    {
        $sql = 'SELECT *
                FROM Pedidos
                WHERE id_Cliente = ? AND estado_Pedido = "Carrito"';
        $params = array($_SESSION['idCliente']);
        return Database::getRows($sql, $params);
    }

    public function updateRowPedidos()
    {
        $sql = 'UPDATE Pedidos
                SET estado_Pedido = ?, fecha_Registro = NOW(), 
                direccion_Pedido = (SELECT direccion_Cliente FROM Clientes WHERE id_Cliente = ?)
                WHERE id_Cliente = ? AND estado_Pedido = "Carrito"';
        $params = array($this->estado, $_SESSION['idCliente'], $_SESSION['idCliente']);
        return Database::executeRow($sql, $params);
    }

    public function readAllCarrito(){
        $sql = 'SELECT DetallePedido.id_Pedido_Detalle, DetallePedido.cantidad_Producto, nombre_producto, precio_producto, precio_producto * DetallePedido.cantidad_Producto AS precio_total
                FROM DetallePedido
                INNER JOIN Productos ON Productos.id_producto = DetallePedido.id_Producto
                INNER JOIN Pedidos ON Pedidos.id_Pedido = DetallePedido.id_Pedido
                INNER JOIN Clientes ON Clientes.id_Cliente = Pedidos.id_Cliente
                WHERE Clientes.id_Cliente = ? AND estado_Pedido = "Carrito"';
        $params = array($_SESSION['idCliente']);
        return Database::getRows($sql, $params);
    }

    // Método para finalizar un pedido por parte del cliente.
    public function updateStatus()
    {
        $sql = 'UPDATE pedido
                SET estado_pedido = ?
                WHERE id_pedido = ?';
        $params = array($this->estado, $_SESSION['idPedido']);
        return Database::executeRow($sql, $params);
    }

    // Método para actualizar la cantidad de un producto agregado al carrito de compras.
    public function updateDetail()
    {
        $sql = 'UPDATE DetallePedido
                SET cantidad_Producto = ?
                WHERE id_Pedido_Detalle = ?';
        $params = array($this->cantidad, $this->id_detalle);
        return Database::executeRow($sql, $params);
    }

    // Método para eliminar un producto que se encuentra en el carrito de compras.
    public function deleteDetail()
    {
        $sql = 'DELETE FROM DetallePedido
                WHERE id_Pedido_Detalle = ?';
        $params = array($this->id_detalle);
        return Database::executeRow($sql, $params);
    }

    // Método para finalizar un pedido por parte del cliente.
    public function finishOrder()
    {
        $this->estado = 'Finalizado';
        $sql = 'UPDATE pedido
                SET estado_pedido = ?
                WHERE id_pedido = ?';
        $params = array($this->estado, $_SESSION['idPedido']);
        return Database::executeRow($sql, $params);
    }

}
