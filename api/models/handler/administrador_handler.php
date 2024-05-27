<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../helper/validator.php');    
/*
 *  Clase para manejar el comportamiento de los datos de la tabla administrador.
 */
class AdministradorHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $nombre = null;
    protected $apellido = null;
    protected $correo = null;
    protected $alias = null;
    protected $clave = null;

    /*
     *  Métodos para gestionar la cuenta del administrador.
     */
    public function checkUser($username, $password)
    {
        $sql = 'SELECT id_Usuario, username, clave_Usuario
                FROM Usuario
                WHERE username = ?';
        $params = array($username);
        if (!($data = Database::getRow($sql, $params))) {
            return false;
        } elseif (password_verify($password, $data['clave_administrador'])) {
            $_SESSION['id_Usuario'] = $data['id_Usuario'];
            $_SESSION['username'] = $data['username'];
            return true;
        } else {
            return false;
        }
    }

    public function checkPassword($password)
    {
        $sql = 'SELECT clave_Usuario
                FROM Usuario
                WHERE id_Usuario = ?';
        $params = array($_SESSION['id_Usuario']);
        $data = Database::getRow($sql, $params);
        // Se verifica si la contraseña coincide con el hash almacenado en la base de datos.
        if (password_verify($password, $data['clave_Usuario'])) {
            return true;
        } else {
            return false;
        }
    }

    public function changePassword()
    {
        $sql = 'UPDATE Usuario
                SET clave_Usuario = ?
                WHERE id_Usuario = ?';
        $params = array($this->clave, $_SESSION['id_Usuario']);
        return Database::executeRow($sql, $params);
    }

    public function readProfile()
    {
        $sql = 'SELECT id_Usuario, nombre_Usuario, correo_Usuario, username
                FROM Usuario
                WHERE id_Usuario = ?';
        $params = array($_SESSION['id_Usuario']);
        return Database::getRow($sql, $params);
    }

    public function editProfile()
    {
        $sql = 'UPDATE Usuario
                SET nombre_Usuario = ?,, correo_Usuario = ?, username = ?
                WHERE id_Usuario = ?';
        $params = array($this->nombre, $this->apellido, $this->correo, $this->alias, $_SESSION['id_Usuario']);
        return Database::executeRow($sql, $params);
    }

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_Usuario, nombre_Usuario, correo_Usuario, username
                FROM Usuario
                WHERE  nombre_Usuario LIKE ?
                ORDER BY nombre_Usuario';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO Usuario(nombre_Usuario, correo_Usuario, username, clave_Usuario)
                VALUES(?, ?, ?, ?, ?)';
        $params = array($this->nombre, $this->apellido, $this->correo, $this->alias, $this->clave);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_Usuario, nombre_Usuario, correo_Usuario, username
                FROM Usuario
                ORDER BY nombre_Usuario';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_Usuario, nombre_Usuario, correo_Usuario, username
                FROM Usuario
                WHERE id_Usuario = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE Usuario
                SET nombre_Usuario = ?, correo_Usuario = ?
                WHERE id_Usuario = ?';
        $params = array($this->nombre, $this->apellido, $this->correo, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM Usuario
                WHERE id_Usuario = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
