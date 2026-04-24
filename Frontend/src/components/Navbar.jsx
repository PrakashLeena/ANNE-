import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-text">SiteCraft</span>
        </Link>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/templates" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Templates
          </Link>
          <Link to="/features" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Features
          </Link>
          <Link to="/pricing" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Pricing
          </Link>
          <Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            About
          </Link>
          <Link to="/support" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Support
          </Link>
        </div>

        <div className="nav-buttons">
          <Link to="/login" className="nav-link">
            Log In
          </Link>
          <Link to="/signup" className="btn-primary">
            Get Started
          </Link>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
