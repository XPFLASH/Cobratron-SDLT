const pool = require('../config.js');

const insertarPago = async (id_adeudo, fecha_pago, monto_pago) => {
  const result = await pool.query(
    'INSERT INTO Pagos (id_adeudo, fecha_pago, monto_pago) VALUES ($1, $2, $3) RETURNING *',
    [id_adeudo, fecha_pago, monto_pago]
  );
  return result.rows[0];
};

const obtenerPagos = async () => {
  const result = await pool.query('SELECT * FROM pagos ORDER BY fecha_pago ASC');
  return result.rows;
};

const obtenerPagosPorUsuario = async (id_usuario) => {
  const result = await pool.query(
    `SELECT Pagos.*, Adeudo.nombre AS nombre_adeudo 
     FROM Pagos 
     JOIN Adeudo ON Pagos.id_adeudo = Adeudo.id_adeudo 
     WHERE Adeudo.id_usuario = $1
     ORDER BY Pagos.fecha_pago`,
    [id_usuario]
  );
  return result.rows;
};

module.exports = { insertarPago, obtenerPagos, obtenerPagosPorUsuario };
