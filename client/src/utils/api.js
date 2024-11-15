import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

// Usuarios
export const crearUsuario = (data) => axios.post(`${API_URL}/usuarios`, data);
export const obtenerUsuarios = () => axios.get(`${API_URL}/usuarios`);

// Adeudos
export const crearAdeudo = (data) => axios.post(`${API_URL}/adeudos`, data);
export const obtenerAdeudos = () => axios.get(`${API_URL}/adeudos`);

// Pagos
export const crearPago = (data) => axios.post(`${API_URL}/pagos`, data);

export const obtenerPagosPorUsuario = (id_usuario) => axios.get(`${API_URL}/usuarios/${id_usuario}/pagos`);

export const obtenerPagos = async (id_adeudo) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/pagos/${id_adeudo}`);
      return response.data; 
    } catch (error) {
      console.error('Error al obtener pagos:', error);
      return [];
    }
  };
  
