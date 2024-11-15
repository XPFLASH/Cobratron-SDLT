-- Tabla Usuario: Almacena los datos del usuario
CREATE TABLE IF NOT EXISTS Usuario (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(15)
);

-- Tabla Adeudo: Registra los adeudos de cada usuario con sus detalles
CREATE TABLE IF NOT EXISTS Adeudo (
    id_adeudo SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES Usuario(id_usuario) ON DELETE CASCADE,
    nombre VARCHAR(100) NOT NULL,
    fecha_inicial DATE NOT NULL,
    fecha_final DATE,
    cantidad_frecuencia INT NOT NULL,
    tipo_frecuencia VARCHAR(20) CHECK (tipo_frecuencia IN ('Semanal', 'Mensual', 'Trimestral', 'Semestral', 'Anual')),
    monto_total DECIMAL(10, 2) NOT NULL,
    estado VARCHAR(10) DEFAULT 'Pendiente' CHECK (estado IN ('Pendiente', 'Saldado'))
);

-- Tabla Pagos: Almacena los pagos de cada adeudo con sus fechas y estado
CREATE TABLE IF NOT EXISTS Pagos (
    id_pago SERIAL PRIMARY KEY,
    id_adeudo INT REFERENCES Adeudo(id_adeudo) ON DELETE CASCADE,
    fecha_pago DATE NOT NULL,
    monto_pago DECIMAL(10, 2) NOT NULL,
    estado VARCHAR(10) DEFAULT 'Pendiente' CHECK (estado IN ('Pendiente', 'Pagado'))
);

