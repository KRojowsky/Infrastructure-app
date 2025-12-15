import React from 'react';
import { Link } from 'react-router-dom';
import './SidebarMobile.scss';

const SidebarMobile: React.FC = () => {
  return (
    <nav className="sidebar-mobile">
      <ul>
        <li>
          <Link to="/dashboard">📃</Link>
        </li>
        <li>
          <Link to="/new-report">➕</Link>
        </li>
        <li>📜</li>
        <li>🔔</li>
        <li>⚙️</li>
        <li>📊</li>
      </ul>
    </nav>
  );
};

export default SidebarMobile;
