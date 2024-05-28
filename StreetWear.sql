
DROP DATABASE IF EXISTS streetweardrop_db;
CREATE DATABASE streetweardrop_db;
USE streetweardrop_db;

CREATE TABLE administrador (
    id_administrador int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre_administrador varchar(50) NOT NULL,
    apellido_administrador varchar(50) NOT NULL,
    correo_administrador varchar(100) NOT NULL,
    alias_administrador varchar(25) NOT NULL,
    clave_administrador varchar(100) NOT NULL,
    imagen_administrador varchar(30) NOT NULL,
    fecha_registro datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


CREATE TABLE Genero (
    id_Genero INT PRIMARY KEY AUTO_INCREMENT,
    nombre_genero VARCHAR(20)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO Genero (id_Genero, nombre_genero) VALUES
(1, 'Masculino'),
(2, 'Femenino'),
(3, 'Otro');

CREATE TABLE Clientes (
    id_Cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre_Cliente VARCHAR(30),
    apellido_Cliente VARCHAR(50),
    numero_Cliente VARCHAR(20),
    correo_Cliente VARCHAR(100),
    direccion_Cliente VARCHAR(200),
    img_Cliente VARCHAR(200),
    estado_Cliente INT,
    clave_Cliente VARCHAR(200),
    id_Genero INT,
    FOREIGN KEY (id_Genero) REFERENCES Genero(id_Genero)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


INSERT INTO Clientes (nombre_cliente, apellido_cliente, numero_cliente, correo_cliente, direccion_cliente, id_Genero) VALUES
('John', 'Doe', '1234567890', 'john@example.com', '123 Street, City, Country', 1),
('Jane', 'Doe', '0987654321', 'jane@example.com', '456 Street, City, Country', 2);

SELECT*FROM Clientes;
	
CREATE TABLE Distribuidores (
    id_Distribuidor INT PRIMARY KEY AUTO_INCREMENT,
    nombre_Distribuidor VARCHAR(50),
    telefono_Distribuidor VARCHAR(20)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO Distribuidores (id_Distribuidor, nombre_Distribuidor, telefono_Distribuidor) VALUES
(1, 'Distribuidor A', '123456789'),
(2, 'Distribuidor B', '987654321');

CREATE TABLE Pedidos (
    id_Pedido INT PRIMARY KEY AUTO_INCREMENT, 
    estado_Pedido VARCHAR(50),
    fecha_Registro DATE,
    id_Cliente INT,
    direccion_Pedido VARCHAR(200),
    FOREIGN KEY (id_Cliente) REFERENCES Clientes(id_Cliente)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO Pedidos (id_Pedido, estado_Pedido, fecha_Registro, id_Cliente, direccion_Pedido) VALUES
(1, 'En proceso', '2024-03-17', 1, '123 Street, City, Country'),
(2, 'Entregado', '2024-03-16', 2, '456 Street, City, Country');

CREATE TABLE Categorias (
    idCategoria INT PRIMARY KEY AUTO_INCREMENT,
    nombreCategoria VARCHAR(30),
    descripcionCategoria VARCHAR(200),
    imagenCategoria VARCHAR(30)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO Categorias (idCategoria, nombreCategoria) VALUES
(1, 'Ropa'),
(2, 'Zapatos'),
(3, 'Gorras'),
(4, 'Accesorios' );

CREATE TABLE TipoProducto (
    id_TipoProducto INT PRIMARY KEY AUTO_INCREMENT,
    nombre_TipoProducto VARCHAR(30)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO TipoProducto (id_TipoProducto, nombre_TipoProducto) VALUES
(1, 'Camiseta'),
(2, 'Zapatos'),
(3, 'Gorra'),
(4, 'Lentes de sol');

CREATE TABLE Productos (
    id_producto INT PRIMARY KEY AUTO_INCREMENT,
    nombre_producto VARCHAR(50),
    cantidad_producto INT,
    descripcion_producto VARCHAR(200),
    precio_producto FLOAT,
    imagen_producto VARCHAR(30),
    color_producto VARCHAR(30),
    idCategoria INT,
    id_TipoProducto INT,
    id_Distribuidor INT,
    FOREIGN KEY (idCategoria) REFERENCES Categorias(idCategoria),
    FOREIGN KEY (id_TipoProducto) REFERENCES TipoProducto(id_TipoProducto),
    FOREIGN KEY (id_Distribuidor) REFERENCES Distribuidores(id_Distribuidor)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO Productos (id_producto, nombre_producto, cantidad_producto, idCategoria, id_TipoProducto, id_Distribuidor) VALUES
(1, 'Camiseta azul Nike', 50, 1, 1, 1),
(2, 'Zapatos Nike', 30, 2, 2, 2),
(3, 'Zapatos Jordan', 30, 2, 2, 2);

CREATE TABLE DetallePedido (
    id_Pedido INT AUTO_INCREMENT,
    id_Producto INT,
    FOREIGN KEY (id_Pedido) REFERENCES Pedidos(id_Pedido),
    FOREIGN KEY (id_Producto) REFERENCES Productos(id_Producto)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE Comentarios (
    id_Comentario INT PRIMARY KEY AUTO_INCREMENT,
    contenido VARCHAR(200),
    id_Pedido INT,
    FOREIGN KEY (id_Pedido) REFERENCES Pedidos(id_Pedido)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE Direcciones (
    id_Direccion INT PRIMARY KEY AUTO_INCREMENT,
    direccion VARCHAR(200),
    id_Cliente INT,
    FOREIGN KEY (id_Cliente) REFERENCES Clientes(id_Cliente)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE TipoUsuario (
    id_TipoUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre_TipoUsuario VARCHAR(100)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO TipoUsuario (id_TipoUsuario, nombre_TipoUsuario) VALUES
(1, 'Administrador'),
(2, 'Trabajador'),
(3, 'Usuario regular');

CREATE TABLE Usuario (
    id_Usuario INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(30),
    nombre_Usuario VARCHAR(60),
    correo_Usuario VARCHAR(40),
    clave_Usuario VARCHAR(20),
    numero_Usuario VARCHAR(20),
    direccion_Usuario VARCHAR(200),
    id_TipoUsuario INT,
    imagen_Usuario VARCHAR(30),
    FOREIGN KEY (id_TipoUsuario) REFERENCES TipoUsuario(id_TipoUsuario)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

ALTER TABLE Clientes
ADD CONSTRAINT fk_Clientes_Genero FOREIGN KEY (id_Genero) REFERENCES Genero(id_Genero);

ALTER TABLE Direcciones
ADD CONSTRAINT fk_Direcciones_Clientes FOREIGN KEY (id_Cliente) REFERENCES Clientes(id_Cliente);

ALTER TABLE Comentarios
ADD CONSTRAINT fk_Comentarios_Pedidos FOREIGN KEY (id_Pedido) REFERENCES Pedidos(id_Pedido);

ALTER TABLE Usuario
ADD CONSTRAINT fk_Usuario_TipoUsuario FOREIGN KEY (id_TipoUsuario) REFERENCES TipoUsuario(id_TipoUsuario);

DELIMITER //
CREATE TRIGGER actualizar_stock_producto
AFTER INSERT ON DetallePedido
FOR EACH ROW
BEGIN
    UPDATE Productos
    SET cantidad_Producto = cantidad_Producto - 1
    WHERE id_Producto = NEW.id_Producto;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER trg_actualizar_cantidad_producto
AFTER INSERT ON DetallePedido
FOR EACH ROW
BEGIN
    UPDATE Productos 
    SET cantidad_Producto = cantidad_Producto - 1 
    WHERE id_Producto = NEW.id_Producto;
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER revisar_cliente_insert
AFTER INSERT ON Clientes
FOR EACH ROW
BEGIN
    INSERT INTO Comentarios (contenido, id_Pedido) VALUES ('Nuevo cliente registrado', NULL);
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER revisar_pedido_update
AFTER UPDATE ON Pedidos
FOR EACH ROW
BEGIN
    INSERT INTO Comentarios (contenido, id_Pedido) VALUES ('El estado del pedido ha sido actualizado', NEW.id_Pedido);
END;
//
DELIMITER ;
