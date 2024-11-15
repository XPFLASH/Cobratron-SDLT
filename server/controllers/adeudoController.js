const { insertarAdeudo, obtenerAdeudos } = require('../db/queries/adeudoQuerie.js');

const crearAdeudo = async (req, res) => {
  const { id_usuario, nombre, fecha_inicial, fecha_final, cantidad_frecuencia, tipo_frecuencia, monto_total } = req.body;
  try {
    const adeudo = await insertarAdeudo(id_usuario, nombre, fecha_inicial,fecha_final, cantidad_frecuencia, tipo_frecuencia, monto_total);
    res.status(201).json(adeudo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el adeudo' });
  }
};

const listarAdeudos = async (req, res) => {
  try {
    const adeudos = await obtenerAdeudos();
    res.status(200).json(adeudos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener adeudos' });
  }
};

module.exports = { crearAdeudo, listarAdeudos };
