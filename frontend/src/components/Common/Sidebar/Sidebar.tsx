import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.scss';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const role = localStorage.getItem('role');

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>InfraFix</h2>
      </div>

      <nav className="sidebar-menu">
        <ul>
          <li className={location.pathname === '/dashboard' ? 'active' : ''}>
            <Link to="/dashboard">📃 Zgłoszenia</Link>
          </li>

          {role === 'community' && (
            <li className={location.pathname === '/new-report' ? 'active' : ''}>
              <Link to="/new-report">➕ Nowe zgłoszenie</Link>
            </li>
          )}

          <li className={location.pathname === '/history' ? 'active' : ''}>
            <Link to="/history">📜 Historia</Link>
          </li>

          <li className={location.pathname === '/settings' ? 'active' : ''}>
            <Link to="/settings">⚙️ Ustawienia</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
