import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navBar.css'; 
const NavBar = () => {
  return (
    <nav>
      <h1>Cobratron</h1>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/registrar-cliente">Registrar Cliente</Link></li>
        <li><Link to="/ver-registros">Ver Registros</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
