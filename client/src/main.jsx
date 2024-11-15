import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/home';
import RegistrarCliente from './components/RegistrarCliente';
import VerRegistros from './components/VerRegistros';
import PagosPorUsuario from './components/PagoPorUsuario';

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <Router>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registrar-cliente" element={<RegistrarCliente />} />
          <Route path="/ver-registros" element={<VerRegistros />} />
          <Route path="/ver-pagos" element={<PagosPorUsuario />} />
        </Routes>
      </main>
    </Router>
  </StrictMode>,
)
