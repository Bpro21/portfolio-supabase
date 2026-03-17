import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="glass navbar">
      <div className="logo" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
        Portfolio<span className="text-gradient">.</span>
      </div>
      <div className="links" style={{ display: 'flex', gap: '2rem' }}>
        <a href="#hero" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
        <a href="#projects" style={{ color: 'white', textDecoration: 'none' }}>Projects</a>
        <a href="#skills" style={{ color: 'white', textDecoration: 'none' }}>Skills</a>
        <a href="#contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</a>
        <Link to="/login" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Admin</Link>
      </div>
    </nav>
  );
};

export default Navbar;
