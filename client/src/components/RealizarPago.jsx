import React, { useState } from 'react';
import { realizarPago } from '../utils/api.js';

const PagoItem = ({ pago, onPagoRealizado }) => {
  const [montoPagado, setMontoPagado] = useState('');

  const handlePago = async () => {
    if (!montoPagado || montoPagado < pago.monto_pago) {
      alert('Por favor ingresa un monto válido (Ejem. 100.00)');
      return;
    }

    const resultado = await realizarPago(pago.id_pago, montoPagado);

    if (resultado) {
      alert('Pago realizado con éxito');
      onPagoRealizado(); // Refresca los datos después del pago
    } else {
      alert('Error al realizar el pago');
    }
  };

  return (
    <li>
      Fecha: {new Date(pago.fecha_pago).toLocaleDateString()} - Monto: ${pago.monto_pago} - Estado: {pago.estado}
      {pago.estado === 'Pendiente' && (
        <div>
          <input
            type="number"
            placeholder="Monto a pagar"
            value={montoPagado}
            onChange={(e) => setMontoPagado(e.target.value)}
          />
          <button onClick={handlePago}>Pagar</button>
        </div>
      )}
    </li>
  );
};

export default PagoItem;
