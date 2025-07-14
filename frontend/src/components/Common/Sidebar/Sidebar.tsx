import React from 'react'
import './Sidebar.scss';
import logo from '../../../assets/images/Home/navbar/logo.svg';

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <img src={logo} alt="Logo" />
                <h2>Logo</h2>
            </div>

            <div className="sidebar-menu">
                <ul>
                    <li>📃 Zgłoszenia</li>
                    <li>➕ Nowe zgłoszenie</li>
                    <li>📜 Historia</li>
                    <li>🔔 Powiadomienia</li>
                    <li>⚙️ Ustawienia</li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;