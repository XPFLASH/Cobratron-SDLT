const { insertarPago, obtenerPagos, obtenerPagosPorAdeudo } = require('../db/queries/pagoQuerie.js');
const pool = require('../db/config.js');

const crearPago = async (req, res) => {
  const { id_adeudo, fecha_pago, monto_pago } = req.body;
  try {
    const pago = await insertarPago(id_adeudo, fecha_pago, monto_pago);
    res.status(201).json(pago);
  } catch (error) {
    console.error('Error al crear el pago:', error);
    res.status(500).json({ error: 'Error al crear el pago' });
  }
};

const listarPagos = async (req, res) => {
  try {
    const pagos = await obtenerPagos();
    res.status(200).json(pagos);
  } catch (error) {
    console.error('Error al obtener pagos:', error);
    res.status(500).json({ error: 'Error al obtener pagos' });
  }
};

const listarPagosPorAdeudo = async (req, res) => {
  const { id_adeudo } = req.params;
  try {
    const pagos = await obtenerPagosPorAdeudo(id_adeudo);
    res.status(200).json(pagos);
  } catch (error) {
    console.error('Error al obtener los pagos del adeudo:', error);
    res.status(500).json({ message: 'Error al obtener los pagos del adeudo' });
  }
};

const realizarPago = async (req, res) => {
  const { id_pago } = req.params;
  const { monto_pagado } = req.body;

  try {
    const pagoActual = await pool.query('SELECT * FROM pagos WHERE id_pago = $1', [id_pago]);
    if (pagoActual.rowCount === 0) {
      return res.status(404).json({ error: 'Pago no encontrado' });
    }

    const pago = pagoActual.rows[0];

    if (pago.estado === 'Pagado') {
      return res.status(400).json({ error: 'El pago ya ha sido completado' });
    }

    if (monto_pagado < pago.monto_pago) {
      return res.status(400).json({ error: 'El monto pagado no cubre el monto del pago' });
    }

    await pool.query('UPDATE pagos SET estado = $1 WHERE id_pago = $2', ['Pagado', id_pago]);

    const pagosPendientes = await pool.query(
      'SELECT * FROM pagos WHERE id_adeudo = $1 AND estado != $2',
      [pago.id_adeudo, 'Pagado']
    );

    if (pagosPendientes.rowCount === 0) {
      await pool.query('UPDATE adeudo SET estado = $1 WHERE id_adeudo = $2', ['Saldado', pago.id_adeudo]);
    }

    res.status(200).json({ message: 'Pago realizado con éxito' });
  } catch (error) {
    console.error('Error al realizar el pago:', error);
    res.status(500).json({ error: 'Error al realizar el pago' });
  }
};

module.exports = { crearPago, listarPagos, listarPagosPorAdeudo, realizarPago};
