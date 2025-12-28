import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SidebarMobile.scss';

const SidebarMobile: React.FC = () => {
  const location = useLocation();
  const role = localStorage.getItem('role');

  return (
    <nav className="sidebar-mobile">
      <ul>
        <li className={location.pathname === '/dashboard' ? 'active' : ''}>
          <Link to="/dashboard" title="Zgłoszenia">📃</Link>
        </li>

        {role === 'community' && (
          <li className={location.pathname === '/new-report' ? 'active' : ''}>
            <Link to="/new-report" title="Nowe zgłoszenie">➕</Link>
          </li>
        )}

        <li className={location.pathname === '/history' ? 'active' : ''}>
          <Link to="/history" title="Historia">📜</Link>
        </li>

        <li className={location.pathname === '/settings' ? 'active' : ''}>
          <Link to="/settings" title="Ustawienia">⚙️</Link>
        </li>
      </ul>
    </nav>
  );
};

export default SidebarMobile;
