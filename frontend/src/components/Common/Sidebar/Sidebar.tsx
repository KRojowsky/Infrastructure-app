import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.scss';
import logo from '../../../assets/images/Home/navbar/logo.png';

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Logo" />
        <h2>InfraFix</h2>
      </div>

      <nav className="sidebar-menu">
        <ul>
          <li className={location.pathname === '/dashboard' ? 'active' : ''}>
            <Link to="/dashboard">📃 Zgłoszenia</Link>
          </li>
          <li className={location.pathname === '/new-report' ? 'active' : ''}>
            <Link to="/new-report">➕ Nowe zgłoszenie</Link>
          </li>
          <li className={location.pathname === '/history' ? 'active' : ''}>
            <Link to="/history">📜 Historia</Link>
          </li>
          <li>
            <Link to="/notifications">🔔 Powiadomienia</Link>
          </li>
          <li>
            <Link to="/settings">⚙️ Ustawienia</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
