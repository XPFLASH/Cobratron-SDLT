const express = require('express');
const { crearPago, listarPagos } = require('../controllers/pagoController.js');
const { obtenerPagosPorUsuario } = require('../db/queries/pagoQuerie.js');
const pool = require('../db/config.js');

const router = express.Router();

router.post('/pagos', crearPago);       
router.get('/pagos', listarPagos); 

router.get('/usuarios/:id_usuario/pagos', async (req, res) => {
    const { id_usuario } = req.params;
    try {
      const pagos = await obtenerPagosPorUsuario(id_usuario);
      res.status(200).json(pagos);
    } catch (error) {
      console.error('Error al obtener los pagos:', error);
      res.status(500).json({ error: 'Error al obtener los pagos' });
    }
  });


router.get('/pagos/:id_adeudo', async (req, res) => {
  const { id_adeudo } = req.params;
  try {
   
    const pagos = await pool.query('SELECT * FROM pagos WHERE id_adeudo = $1', [id_adeudo]);
    res.json(pagos.rows);
  } catch (error) {
    console.error('Error al obtener pagos:', error);
    res.status(500).json({ message: 'Error al obtener pagos' });
  }
});



module.exports = router;
