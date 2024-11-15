import React, { useEffect, useState } from 'react';
import { obtenerUsuarios, obtenerAdeudos, obtenerPagos, crearAdeudo, crearPago } from '../utils/api.js';
import '../styles/verRegistro.css';

const VerRegistros = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [adeudos, setAdeudos] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [selectedAdeudo, setSelectedAdeudo] = useState(null);
  const [mostrarFormularioAdeudo, setMostrarFormularioAdeudo] = useState(false);
  const [nuevoAdeudo, setNuevoAdeudo] = useState({
    nombre: '',
    fechaInicial: '',
    montoTotal: '',
    frecuencia: 'Mensual',
    cantidadFrecuencia: 1,
    montoPorPago: '',
    fechaFinal: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuariosData = await obtenerUsuarios();
        const adeudosData = await obtenerAdeudos();
        setUsuarios(usuariosData.data);
        setAdeudos(adeudosData.data);
      } catch (error) {
        console.error('Error al obtener registros:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (nuevoAdeudo.fechaInicial && nuevoAdeudo.montoTotal && nuevoAdeudo.cantidadFrecuencia) {
      const calculadoMontoPorPago = nuevoAdeudo.montoTotal / nuevoAdeudo.cantidadFrecuencia;
      setNuevoAdeudo((prev) => ({
        ...prev,
        montoPorPago: calculadoMontoPorPago.toFixed(2),
        fechaFinal: calcularFechaFinal()
      }));
    }
  }, [nuevoAdeudo.fechaInicial, nuevoAdeudo.montoTotal, nuevoAdeudo.frecuencia, nuevoAdeudo.cantidadFrecuencia]);

  const calcularFechaFinal = () => {
    let fecha = new Date(nuevoAdeudo.fechaInicial);
    for (let i = 0; i < nuevoAdeudo.cantidadFrecuencia; i++) {
      switch (nuevoAdeudo.frecuencia) {
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
    return fecha.toISOString().split('T')[0];
  };

  const obtenerAdeudosPorUsuario = (id_usuario) => {
    return adeudos.filter(adeudo => adeudo.id_usuario === id_usuario);
  };

  const handleUsuarioClick = (usuario) => {
    setSelectedUsuario(usuario);
    setSelectedAdeudo(null);
    setMostrarFormularioAdeudo(false);
    setPagos([]);
  };

  const handleAdeudoClick = async (adeudo) => {
    try {
      const pagosData = await obtenerPagos(adeudo.id_adeudo);
      setPagos(Array.isArray(pagosData) ? pagosData : []);
      setSelectedAdeudo(adeudo);
    } catch (error) {
      console.error('Error al obtener pagos:', error);
      setPagos([]);
    }
  };
  
  const handleNuevoAdeudoChange = (e) => {
    const { name, value } = e.target;
    setNuevoAdeudo({ ...nuevoAdeudo, [name]: value });
  };

  const generarFechasDePago = () => {
    const fechasDePago = [];
    let fecha = new Date(nuevoAdeudo.fechaInicial);

    for (let i = 0; i < nuevoAdeudo.cantidadFrecuencia; i++) {
      fechasDePago.push(new Date(fecha).toISOString().split('T')[0]);

      switch (nuevoAdeudo.frecuencia) {
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

  const handleGenerarNuevoAdeudo = async (e) => {
    e.preventDefault();
    try {
      const adeudoCreado = await crearAdeudo({
        id_usuario: selectedUsuario.id_usuario,
        nombre: nuevoAdeudo.nombre,
        fecha_inicial: nuevoAdeudo.fechaInicial,
        monto_total: nuevoAdeudo.montoTotal,
        tipo_frecuencia: nuevoAdeudo.frecuencia,
        cantidad_frecuencia: nuevoAdeudo.cantidadFrecuencia,
        monto_por_pago: nuevoAdeudo.montoPorPago,
        fecha_final: nuevoAdeudo.fechaFinal,
      });

      const fechasDePago = generarFechasDePago();
      const pagos = fechasDePago.map((fecha) => ({
        id_adeudo: adeudoCreado.data.id_adeudo,
        fecha_pago: fecha,
        monto_pago: nuevoAdeudo.montoPorPago,
        estado: 'Pendiente'
      }));

      await Promise.all(pagos.map(async (pago) => await crearPago(pago)));

      alert('Nuevo adeudo y pagos creados con éxito');
      setMostrarFormularioAdeudo(false);
      setNuevoAdeudo({
        nombre: '',
        fechaInicial: '',
        montoTotal: '',
        frecuencia: 'Mensual',
        cantidadFrecuencia: 1,
        montoPorPago: '',
        fechaFinal: ''
      });

      const adeudosData = await obtenerAdeudos();
      setAdeudos(adeudosData.data);
      setPagos([]);

    } catch (error) {
      console.error('Error al crear el nuevo adeudo o los pagos:', error);
    }
  };

  return (
    <div className="ver-registros-container">
      <h2>Registros de Clientes y Adeudos</h2>

      {!selectedUsuario ? (
        <ul className="usuario-list">
          {usuarios.map(usuario => (
            <li key={usuario.id_usuario} onClick={() => handleUsuarioClick(usuario)} className="usuario-item">
              {usuario.nombre}
            </li>
          ))}
        </ul>
      ) : selectedAdeudo ? (
        <div className="adeudo-details">
          <button onClick={() => setSelectedAdeudo(null)}>Volver a los Adeudos</button>
          <h3>Detalles del Adeudo</h3>
          <p>Nombre: {selectedAdeudo.nombre}</p>
          <p>Monto Total: ${selectedAdeudo.monto_total}</p>
          <p>Frecuencia: {selectedAdeudo.tipo_frecuencia}</p>
          <h4>Pagos</h4>
          <ul className="pagos-list">
            {Array.isArray(pagos) && pagos.length > 0 ? (
              pagos.map(pago => (
                <li key={pago.id_pago}>
                  Fecha: {new Date(pago.fecha_pago).toLocaleDateString()} - Monto: ${pago.monto_pago} - Estado: {pago.estado}
                </li>
              ))
            ) : (
              <li>No hay pagos para este adeudo</li>
            )}
          </ul>

        </div>
      ) : (
        <div className="usuario-details">
          <button onClick={() => setSelectedUsuario(null)}>Volver a Usuarios</button>
          <h3>{selectedUsuario.nombre}</h3>
          <p>Correo: {selectedUsuario.correo}</p>
          <p>Teléfono: {selectedUsuario.telefono}</p>
          <button onClick={() => setMostrarFormularioAdeudo(true)}>Generar Nuevo Adeudo</button>

          {mostrarFormularioAdeudo && (
            <form onSubmit={handleGenerarNuevoAdeudo} className="nuevo-adeudo-form">
              <h4>Nuevo Adeudo</h4>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre del Adeudo"
                value={nuevoAdeudo.nombre}
                onChange={handleNuevoAdeudoChange}
                required
              />
              <input
                type="date"
                name="fechaInicial"
                placeholder="Fecha Inicial"
                value={nuevoAdeudo.fechaInicial}
                onChange={handleNuevoAdeudoChange}
                required
              />
              <input
                type="number"
                name="montoTotal"
                placeholder="Monto Total"
                value={nuevoAdeudo.montoTotal}
                onChange={handleNuevoAdeudoChange}
                required
              />
              <select name="frecuencia" value={nuevoAdeudo.frecuencia} onChange={handleNuevoAdeudoChange}>
                <option value="Semanal">Semanal</option>
                <option value="Mensual">Mensual</option>
                <option value="Trimestral">Trimestral</option>
                <option value="Semestral">Semestral</option>
                <option value="Anual">Anual</option>
              </select>
              <input
                type="number"
                name="cantidadFrecuencia"
                placeholder="Cantidad de Frecuencia"
                value={nuevoAdeudo.cantidadFrecuencia}
                onChange={handleNuevoAdeudoChange}
                required
              />
              <div>
                <label>Fecha Final Calculada:</label>
                <input type="text" value={nuevoAdeudo.fechaFinal} readOnly />
              </div>
              <div>
                <label>Monto por Pago Calculado:</label>
                <input type="text" value={nuevoAdeudo.montoPorPago} readOnly />
              </div>
              <button type="submit">Crear Adeudo</button>
            </form>
          )}

          <h4>Adeudos:</h4>
          <ul className="adeudos-list">
            {obtenerAdeudosPorUsuario(selectedUsuario.id_usuario).map(adeudo => (
              <li key={adeudo.id_adeudo} onClick={() => handleAdeudoClick(adeudo)}>
                {adeudo.nombre} - Monto Total: ${adeudo.monto_total}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VerRegistros;
