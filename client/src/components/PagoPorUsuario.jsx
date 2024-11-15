import React, { useEffect, useState } from 'react';
import { obtenerUsuarios, obtenerPagosPorUsuario } from '../utils/api';
import ListaPagos from './ListaPagos';

const PagosPorUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [pagos, setPagos] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await obtenerUsuarios();
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    fetchUsuarios();
  }, []);

  useEffect(() => {
    const fetchPagos = async () => {
      if (usuarioSeleccionado) {
        try {
          const response = await obtenerPagosPorUsuario(usuarioSeleccionado);
          setPagos(response.data);
        } catch (error) {
          console.error('Error al obtener pagos:', error);
        }
      }
    };

    fetchPagos();
  }, [usuarioSeleccionado]);

  const handleUsuarioChange = (e) => {
    setUsuarioSeleccionado(e.target.value);
  };

  return (
    <div>
      <h2>Selecciona un Usuario para Ver sus Pagos</h2>
      <select onChange={handleUsuarioChange} value={usuarioSeleccionado || ''}>
        <option value="" disabled>
          Selecciona un usuario
        </option>
        {usuarios.map((usuario) => (
          <option key={usuario.id_usuario} value={usuario.id_usuario}>
            {usuario.nombre}
          </option>
        ))}
      </select>

      {usuarioSeleccionado && (
        <div>
          <h3>Pagos de {usuarios.find((u) => u.id_usuario === Number(usuarioSeleccionado))?.nombre}</h3>
          <ListaPagos pagos={pagos} />
        </div>
      )}
    </div>
  );
};

export default PagosPorUsuario;
