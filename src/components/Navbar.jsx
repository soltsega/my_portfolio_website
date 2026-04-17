import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/#projects' },
    { name: 'Credentials', path: '/credentials' },
    { name: 'About', path: '/#about' },
  ];

  return (
    <nav className={`navbar glass ${scrolled ? 'scrolled' : ''}`} role="navigation">
      <div className="container nav-content">
        <Link to="/" className="logo">
          SOLOMON <span className="gradient-text">TSEGA</span>
        </Link>

        {/* Mobile menu button */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <ul className={`nav-links ${isOpen ? 'active' : ''}`} role="menubar">
          {navLinks.map((link) => (
            <li key={link.name} role="none">
              <a href={link.path} role="menuitem" onClick={() => setIsOpen(false)}>
                {link.name}
              </a>
            </li>
          ))}
          <li role="none">
            <a href="/#contact" className="btn primary" onClick={() => setIsOpen(false)}>
              Say Hello
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
