import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Header.css';

const Header: React.FC = () => {
  return (
    <header>
      <nav className="navbar">
        {/* Logo à esquerda */}
        <div className="logo-container">
          <img
            src="https://img.icons8.com/color-glass/48/apple-music.png"
            alt="Logo"
            className="logo"
          />
        </div>

        {/* Links centralizados */}
        <ul className="nav-links">
          <li>
            <NavLink
              to="/playlists"
              className={({ isActive }) => (isActive ? 'active' : '')}
              aria-current="page"
            >
              Playlists
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/search"
              className={({ isActive }) => (isActive ? 'active' : '')}
              aria-current="page"
            >
              Buscar Música
            </NavLink>
          </li>
        </ul>

        {/* Botão para acessar favoritos */}
        <div className="button-container">
          <NavLink to="/favorites">
            <button className="custom-button">Favorite Playlists</button>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
