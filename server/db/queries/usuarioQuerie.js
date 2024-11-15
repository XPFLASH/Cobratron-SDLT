const pool = require('../config.js');

const insertarUsuario = async (nombre, correo, telefono) => {
  const result = await pool.query(
    'INSERT INTO Usuario (nombre, correo, telefono) VALUES ($1, $2, $3) RETURNING *',
    [nombre, correo, telefono]
  );
  return result.rows[0];
};


const obtenerUsuarios = async () => {
  const result = await pool.query('SELECT * FROM Usuario');
  return result.rows;
};

module.exports = { insertarUsuario, obtenerUsuarios };
