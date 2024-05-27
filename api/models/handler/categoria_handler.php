<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helper/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla CATEGORIA.
 */
class CategoriaHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $nombre = null;
    protected $descripcion = null;
    protected $imagen = null;

    // Constante para establecer la ruta de las imágenes.
    const RUTA_IMAGEN = '../../images/categorias/';

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT idCategoria, nombreCategoria, imagenCategoria, descripcionCategoria
                FROM Categorias
                WHERE nombreCategoria LIKE ? OR descripcionCategoria LIKE ?
                ORDER BY nombreCategoria';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO Categorias(nombreCategoria, imagenCategoria, descripcionCategoria)
                VALUES(?, ?, ?)';
        $params = array($this->nombre, $this->imagen, $this->descripcion);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT idCategoria, nombreCategoria, descripcionCategoria, imagenCategoria
                FROM Categorias
                ORDER BY nombreCategoria';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT idCategoria, nombreCategoria, descripcionCategoria, imagenCategoria
                FROM Categorias
                WHERE idCategoria = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function readFilename()
    {
        $sql = 'SELECT imagenCategoria
                FROM Categorias
                WHERE idCategoria = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE Categorias
                SET imagenCategoria = ?, nombreCategoria = ?, descripcionCategoria = ?
                WHERE idCategoria = ?';
        $params = array($this->imagen, $this->nombre, $this->descripcion, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM Categorias
                WHERE idCategoria = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
