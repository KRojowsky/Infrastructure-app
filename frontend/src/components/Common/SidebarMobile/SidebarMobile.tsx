import React from 'react';
import './SidebarMobile.scss';

const SidebarMobile: React.FC = () => {
  return (
    <nav className="sidebar-mobile">
      <ul>
        <li>📃</li>
        <li>➕</li>
        <li>📜</li>
        <li>🔔</li>
        <li>⚙️</li>
        <li>📊</li>
      </ul>
    </nav>
  );
};

export default SidebarMobile;
