const { insertarUsuario, obtenerUsuarios } = require('../db/queries/usuarioQuerie.js');

const crearUsuario = async (req, res) => {
  const { nombre, correo, telefono } = req.body;
  try {
    const usuario = await insertarUsuario(nombre, correo, telefono);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await obtenerUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

module.exports = { crearUsuario, listarUsuarios };
