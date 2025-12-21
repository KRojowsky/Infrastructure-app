import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.scss';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleMenu = () => setIsOpen(prev => !prev);
    const closeMenu = () => setIsOpen(false);

    const handleScrollLink = (id: string) => {
        closeMenu();
        if (location.pathname !== '/') {
            navigate(`/#${id}`);
        } else {
            const element = document.getElementById(id);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="navbar">
            <div className="navbar-left">
                <Link to="/" className="navbar-logo" onClick={closeMenu}>
                    <span className="navbar-logo-text">InfraFix</span>
                </Link>
            </div>

            <nav className={`navbar-links ${isOpen ? 'open' : ''}`}>
                <button className="navbar-link" onClick={() => handleScrollLink('how-it-works')}>
                    Jak to działa?
                </button>

                <button className="navbar-link" onClick={() => handleScrollLink('air-quality')}>
                    Monitoring jakości powietrza
                </button>

                <Link to="/login" className="navbar-link" onClick={closeMenu}>
                    Logowanie
                </Link>

                <Link to="/register" className="navbar-link" onClick={closeMenu}>
                    Rejestracja
                </Link>
            </nav>

            <button
                className={`navbar-hamburger ${isOpen ? 'open' : ''}`}
                type="button"
                onClick={toggleMenu}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
        </header>
    );
};

export default Navbar;
