import React, { useState } from 'react';
import './Navbar.scss';
import logo from '../../../assets/images/Home/navbar/logo.png';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    }

    return (
        <header className="navbar">
            <div className="navbar-left">
                <div className="navbar-logo">
                    <img src={logo} alt="Logo" className='navbar-logo-img'/>
                </div>
                <span className='navbar-logo-text'>InfraFix</span>
            </div>

            <nav className={`navbar-links ${isOpen ? 'open' : ''}`}>
                <a href="#how-it-works" className='navbar-link' onClick={() => setIsOpen(false)}>Jak to działa?</a>
                <a href="#air-quality" className='navbar-link' onClick={() => setIsOpen(false)}>Monitoring jakości powietrza</a>
                 <a href="/login" className='navbar-link'>Logowanie</a>
                <a href="#" className='navbar-link'>Rejestracja</a>
            </nav>

            <button className={`navbar-hamburger ${isOpen ? 'open' : ''}`}  type="button" onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </button>
        </header>
    );
};

export default Navbar;
