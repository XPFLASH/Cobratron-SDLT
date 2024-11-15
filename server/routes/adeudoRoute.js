const express = require('express');
const { crearAdeudo, listarAdeudos } = require('../controllers/adeudoController.js');

const router = express.Router();

router.post('/adeudos', crearAdeudo);
router.get('/adeudos', listarAdeudos); 

module.exports = router;
