import React from 'react';
import './Navbar.scss'
import logo from '../../assets/images/main-section1/logo.svg';

const Navbar: React.FC = () => {
    return (
        <header className="navbar">
            <div className="navbar-left">
                <div className="navbar-logo">
                    <img src={logo} alt="Logo" className='navbar-logo-img'/>
                </div>
                <span className='navbar-logo-text'>Logo</span>
            </div>

            <div className="navbar-links">
                <a href="#" className='navbar-link'>Option 1</a>
                <a href="#" className='navbar-link'>Option 2</a>
                <a href="#" className='navbar-link'>Option 3</a>
            </div>

            <button className="navbar-hamburger" type="button">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </header>
    );
};

export default Navbar;