const { insertarPago, obtenerPagos } = require('../db/queries/pagoQuerie.js');

const crearPago = async (req, res) => {
  const { id_adeudo, fecha_pago, monto_pago } = req.body;
  try {
    const pago = await insertarPago(id_adeudo, fecha_pago, monto_pago);
    res.status(201).json(pago);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el pago' });
  }
};

const listarPagos = async (req, res) => {
  try {
    const pagos = await obtenerPagos();
    res.status(200).json(pagos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pagos' });
  }
};


module.exports = { crearPago, listarPagos };
