const express = require('express');
const { crearPago, listarPagos, listarPagosPorAdeudo, realizarPago } = require('../controllers/pagoController.js');

const router = express.Router();

router.post('/pagos', crearPago);
router.get('/pagos', listarPagos);

router.get('/pagos/:id_adeudo', listarPagosPorAdeudo);
router.patch('/pagos/:id_pago', realizarPago);

module.exports = router;
