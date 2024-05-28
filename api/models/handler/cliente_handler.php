<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../../api/helper/database.php');

/*
*	Clase para manejar el comportamiento de los datos de la tabla CLIENTES.
*/
class ClienteHandler
{
    /*
    *   Declaración de atributos para el manejo de datos.
    */
    protected $id = null;
    protected $nombre = null;
    protected $apellido = null;
    protected $correo = null;
    protected $direccion = null;
    protected $numero = null;
    protected $idGenero = null;
    protected $clave = null;
    protected $estado = null;
    protected $imagen = null;

    const RUTA_IMAGEN = '../../images/clientes/';

    /*
    *   Métodos para gestionar la cuenta del cliente.
    */
    public function checkUser($mail, $password)
    {
        $sql = 'SELECT id_Cliente, correo_Cliente, clave_Cliente, estado_Cliente
                FROM Clientes
                WHERE correo_Cliente = ?';
        $params = array($mail);
        $data = Database::getRow($sql, $params);
        if ($data && password_verify($password, $data['clave_Cliente'])) {
            $this->id = $data['id_Cliente'];
            $this->correo = $data['correo_Cliente'];
            $this->estado = $data['estado_Cliente'];
            return true;
        } else {
            return false;
        }
    }

    public function checkStatus()
    {
        if ($this->estado) {
            $_SESSION['idCliente'] = $this->id;
            $_SESSION['correoCliente'] = $this->correo;
            return true;
        } else {
            return false;
        }
    }

    public function changePassword()
    {
        $sql = 'UPDATE Clientes
                SET clave_Cliente = ?
                WHERE id_Cliente = ?';
        $params = array($this->clave, $this->id);
        return Database::executeRow($sql, $params);
    }


    public function readFilename()
    {
        $sql = 'SELECT img_Cliente
                FROM Clientes
                WHERE id_Cliente = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function editProfile()
    {
        $sql = 'UPDATE Clientes
                SET nombre_Cliente = ?, apellido_Cliente = ?, correo_Cliente = ?, direccion_Cliente = ?, numero_Cliente = ?, id_Genero = ?
                WHERE id_Cliente = ?';
        $params = array($this->nombre, $this->apellido, $this->correo, $this->direccion, $this->numero, $this->idGenero, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function changeStatus()
    {
        $sql = 'UPDATE Clientes
                SET estado_Cliente = ?
                WHERE id_Cliente = ?';
        $params = array($this->estado, $this->id);
        return Database::executeRow($sql, $params);
    }

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_Cliente, nombre_Cliente, apellido_Cliente, correo_Cliente, direccion_Cliente, numero_Cliente
                FROM Clientes
                WHERE apellido_Cliente LIKE ? OR nombre_Cliente LIKE ? OR correo_Cliente LIKE ?
                ORDER BY apellido_Cliente';
        $params = array($value, $value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO Clientes(
                nombre_Cliente, 
                apellido_Cliente, 
                correo_Cliente, 
                direccion_Cliente, 
                img_Cliente, 
                numero_Cliente, 
                estado_Cliente, 
                id_Genero, 
                clave_Cliente
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        $params = array(
            $this->nombre,
            $this->apellido,
            $this->correo,
            $this->direccion,
            $this->imagen,
            $this->numero,
            1, 
            $this->idGenero,
            $this->clave
        );
        return Database::executeRow($sql, $params);
    }


    public function readAll()
    {
        $sql = 'SELECT id_Cliente, nombre_Cliente, apellido_Cliente, correo_Cliente, img_Cliente, direccion_Cliente, numero_Cliente, estado_Cliente
                FROM Clientes
                ORDER BY apellido_Cliente';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_Cliente, nombre_Cliente, apellido_Cliente, correo_Cliente, img_Cliente, direccion_Cliente, numero_Cliente, estado_Cliente, id_Genero
                FROM Clientes
                WHERE id_Cliente = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE Clientes
                SET nombre_Cliente = ?, apellido_Cliente = ?, correo_Cliente = ?, direccion_Cliente = ?, img_Cliente = ?, numero_Cliente = ?
                WHERE id_Cliente = ?';
        $params = array($this->nombre, $this->apellido, $this->correo, $this->direccion, $this->imagen, $this->numero, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM Clientes
                WHERE id_Cliente = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function checkDuplicate($value)
    {
        $sql = 'SELECT id_Cliente
                FROM Clientes
                WHERE correo_Cliente = ?
                AND id_Cliente <> ?;';
        $params = array($value);
        return Database::getRow($sql, $params);
    }
}
