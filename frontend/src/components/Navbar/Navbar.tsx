import React, { useState } from 'react';
import './Navbar.scss';
import logo from '../../assets/images/navbar/logo.svg';

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
                <span className='navbar-logo-text'>Logo</span>
            </div>

            <nav className={`navbar-links ${isOpen ? 'open' : ''}`}>
                <a href="#" className='navbar-link'>Option 1</a>
                <a href="#" className='navbar-link'>Option 2</a>
                <a href="#" className='navbar-link'>Option 3</a>
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