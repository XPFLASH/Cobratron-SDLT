const pool = require('../config.js');

const insertarPago = async (id_adeudo, fecha_pago, monto_pago) => {
  const result = await pool.query(
    'INSERT INTO pagos (id_adeudo, fecha_pago, monto_pago) VALUES ($1, $2, $3) RETURNING *',
    [id_adeudo, fecha_pago, monto_pago]
  );
  return result.rows[0];
};

const obtenerPagos = async () => {
  const result = await pool.query('SELECT * FROM pagos ORDER BY fecha_pago ASC');
  return result.rows;
};

const obtenerPagosPorAdeudo = async (id_adeudo) => {
  const result = await pool.query('SELECT * FROM pagos WHERE id_adeudo = $1 ORDER BY fecha_pago', [id_adeudo]);
  return result.rows;
};

module.exports = { insertarPago, obtenerPagos, obtenerPagosPorAdeudo,};
