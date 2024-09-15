import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Header.css';

const Header: React.FC = () => {
  return (
    <header>
      <nav className="navbar">
        {/* Logo à esquerda */}
        <div className="logo-container">
          <NavLink to="/">
            <img
              src="https://img.icons8.com/color-glass/48/apple-music.png"
              alt="Logo"
              className="logo"
              aria-label="Home"
            />
          </NavLink>
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
              Search
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/curated-music"
              className={({ isActive }) => (isActive ? 'active' : '')}
              aria-current="page"
            >
              Curated Music
            </NavLink>
          </li>
        </ul>

        {/* Botão para acessar favoritos */}
        <div className="button-container">
          <NavLink to="/favorites">
            <button className="custom-button" aria-label="My Favorites">My Favs</button>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
