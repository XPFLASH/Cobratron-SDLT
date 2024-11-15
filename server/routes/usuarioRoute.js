const express = require('express');
const { crearUsuario, listarUsuarios } = require('../controllers/usuarioController.js');

const router = express.Router();

router.post('/usuarios', crearUsuario);
router.get('/usuarios', listarUsuarios);

module.exports = router;
