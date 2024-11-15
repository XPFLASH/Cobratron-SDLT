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
export const obtenerPagos = async (id_adeudo) =>  {
      const response = await axios.get(`http://localhost:3001/api/pagos/${id_adeudo}`);
      return response.data; 
  };
export const realizarPago = async (id_pago, monto_pagado) => {
      const response = await axios.patch(`http://localhost:3001/api/pagos/${id_pago}`, { monto_pagado });
      return response.data;
    } 
    

  
  
