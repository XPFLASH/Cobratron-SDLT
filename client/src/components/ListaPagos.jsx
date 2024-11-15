import React from 'react';

const ListaPagos = ({ pagos }) => {
  if (pagos.length === 0) {
    return <p>No hay pagos registrados para este usuario.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Fecha de Pago</th>
          <th>Nombre del Adeudo</th>
          <th>Monto</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {pagos.map((pago) => (
          <tr key={pago.id_pago}>
            <td>{new Date(pago.fecha_pago).toLocaleDateString()}</td>
            <td>{pago.nombre_adeudo}</td>
            <td>${pago.monto_pago}</td>
            <td>{pago.estado}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListaPagos;
