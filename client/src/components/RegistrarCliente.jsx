import React, { useState, useEffect } from 'react';
import { crearUsuario, crearAdeudo, crearPago } from '../utils/api.js';
import '../styles/registrarClientes.css'; 

const RegistrarCliente = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [nombreAdeudo, setNombreAdeudo] = useState('');
  const [fechaInicial, setFechaInicial] = useState('');
  const [fechaFinal, setFechaFinal] = useState('');
  const [montoTotal, setMontoTotal] = useState('');
  const [montoPorPago, setMontoPorPago] = useState('');
  const [frecuencia, setFrecuencia] = useState('Mensual');
  const [cantidadFrecuencia, setCantidadFrecuencia] = useState(1);

  useEffect(() => {
    if (fechaInicial && montoTotal && cantidadFrecuencia) {
      const calculadoMontoPorPago = montoTotal / cantidadFrecuencia;
      setMontoPorPago(calculadoMontoPorPago.toFixed(2));

      const fechasDePago = generarFechasDePago();
      setFechaFinal(fechasDePago[fechasDePago.length - 1]);
    }
  }, [fechaInicial, montoTotal, frecuencia, cantidadFrecuencia]);

  const generarFechasDePago = () => {
    const fechasDePago = [];
    let fecha = new Date(fechaInicial);

    for (let i = 0; i < cantidadFrecuencia; i++) {
      fechasDePago.push(new Date(fecha).toISOString().split('T')[0]);

      switch (frecuencia) {
        case 'Semanal':
          fecha.setDate(fecha.getDate() + 7);
          break;
        case 'Mensual':
          fecha.setMonth(fecha.getMonth() + 1);
          break;
        case 'Trimestral':
          fecha.setMonth(fecha.getMonth() + 3);
          break;
        case 'Semestral':
          fecha.setMonth(fecha.getMonth() + 6);
          break;
        case 'Anual':
          fecha.setFullYear(fecha.getFullYear() + 1);
          break;
        default:
          break;
      }
    }

    return fechasDePago;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const usuario = await crearUsuario({ nombre, correo, telefono });

      // Crear adeudo asociado al usuario
      const adeudo = await crearAdeudo({
        id_usuario: usuario.data.id_usuario,
        nombre: nombreAdeudo,
        fecha_inicial: fechaInicial,
        fecha_final: fechaFinal,
        cantidad_frecuencia: cantidadFrecuencia,
        tipo_frecuencia: frecuencia,
        monto_total: montoTotal,
        monto_por_pago: montoPorPago,
      });

      // Generar y enviar pagos al backend
      const fechasDePago = generarFechasDePago();
      const pagos = fechasDePago.map((fecha) => ({
        id_adeudo: adeudo.data.id_adeudo,
        fecha_pago: fecha,
        monto_pago: montoPorPago,
        estado: 'Pendiente'
      }));
      
      await Promise.all(pagos.map(async (pago) => {
        await crearPago(pago);
      }));

      alert('Cliente, adeudo y pagos registrados con éxito');
      setNombre('');
      setCorreo('');
      setTelefono('');
      setNombreAdeudo('');
      setFechaInicial('');
      setFechaFinal('');
      setMontoTotal('');
      setMontoPorPago('');
      setFrecuencia('Mensual');
      setCantidadFrecuencia(1);
    } catch (error) {
      console.error('Error al registrar el cliente, adeudo o pagos:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <h2>Registrar Cliente y Adeudo</h2>

    <h3>Datos del Cliente</h3>
    <div className="form-row">
      <div className="form-field">
        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      </div>
      <div className="form-field">
        <input type="email" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
      </div>
      <div className="form-field">
        <input type="text" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
      </div>
    </div>

    <h3>Detalles del Adeudo</h3>
    <div className="form-row">
      <div className="form-field">
        <input type="text" placeholder="Nombre del Adeudo" value={nombreAdeudo} onChange={(e) => setNombreAdeudo(e.target.value)} required />
      </div>
      <div className="form-field">
        <input type="date" value={fechaInicial} onChange={(e) => setFechaInicial(e.target.value)} required />
      </div>
      <div className="form-field">
        <input type="number" placeholder="Monto Total" value={montoTotal} onChange={(e) => setMontoTotal(e.target.value)} required />
      </div>
    </div>

    <div className="form-row">
      <div className="form-field">
        <select value={frecuencia} onChange={(e) => setFrecuencia(e.target.value)}>
          <option value="Semanal">Semanal</option>
          <option value="Mensual">Mensual</option>
          <option value="Trimestral">Trimestral</option>
          <option value="Semestral">Semestral</option>
          <option value="Anual">Anual</option>
        </select>
      </div>
      <div className="form-field">
        <input type="number" placeholder="Cantidad de Frecuencia" value={cantidadFrecuencia} onChange={(e) => setCantidadFrecuencia(e.target.value)} required />
      </div>
    </div>

    <h3>Resumen del Adeudo</h3>
    <div className="form-row">
      <div className="form-field">
        <label>Fecha Final Calculada:</label>
        <input type="text" value={fechaFinal} readOnly />
      </div>
      <div className="form-field">
        <label>Monto por Pago Calculado:</label>
        <input type="text" value={montoPorPago} readOnly />
      </div>
    </div>

    <button type="submit">Registrar Cliente</button>
  </form>
  );
};

export default RegistrarCliente;
