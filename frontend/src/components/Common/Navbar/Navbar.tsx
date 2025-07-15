import React from 'react';
import logo from '../../../assets/images/Home/navbar/logo.png';
import './Navbar.scss';

const Navbar: React.FC = () => {
    return (
        <header className='navbar'>
            <div className="navbar-logo">
                <img src={logo} alt="Logo" />
            </div>
            <div className="navbar-center">
                <select className="navbar-filter">
                    <option>Status</option>
                    <option value="pending">Oczekujące</option>
                    <option value="in-progress">W trakcie</option>
                    <option value="done">Zakończone</option>
                </select>

                <select className="navbar-filter">
                    <option>Priorytet</option>
                    <option value="low">Niski</option>
                    <option value="medium">Średni</option>
                    <option value="high">Wysoki</option>
                </select>
            </div>

            <div className="navbar-right">
                <img src="https://randomuser.me/api/portraits/men/75.jpg" className='navbar-avatar'/>
                <span>Jan Kowalski</span>
            </div>
        </header>
    );
};

export default Navbar;