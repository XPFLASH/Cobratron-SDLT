const pool = require('../config.js');

const insertarAdeudo = async (id_usuario, nombre, fecha_inicial, fecha_final, cantidad_frecuencia, tipo_frecuencia, monto_total) => {
  const result = await pool.query(
    `INSERT INTO Adeudo (id_usuario, nombre, fecha_inicial, fecha_final, cantidad_frecuencia, tipo_frecuencia, monto_total) 
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [id_usuario, nombre, fecha_inicial, fecha_final, cantidad_frecuencia, tipo_frecuencia, monto_total]
  );
  return result.rows[0];
};

const obtenerAdeudos = async () => {
  const result = await pool.query('SELECT * FROM Adeudo');
  return result.rows;
};

module.exports = { insertarAdeudo, obtenerAdeudos };
