import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';
import './Navbar.css';

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/#services' },
  { label: 'Leadership', to: '/leadership' },
  { label: 'FAQ', to: '/#faq' },
  { label: 'Careers', to: '/#careers' },
  { label: 'Contact Us', to: '/contact' },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <header className={`igo-header ${isScrolled ? 'is-scrolled' : ''}`}>
      {/* Utility bar */}
      <div className="igo-topbar">
        <div className="igo-container igo-topbar__inner">
          <a href="tel:+917397789803"><Phone size={14} aria-hidden /> +91 73977 89803</a>
          <a href="mailto:bd1@igogroups.com"><Mail size={14} aria-hidden /> bd1@igogroups.com</a>
        </div>
      </div>

      {/* Main nav */}
      <nav className="igo-nav" aria-label="Main navigation">
        <div className="igo-container igo-nav__inner">
          <Link to="/" className="igo-logo" onClick={() => { close(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <img src="/images/logo.png" alt="IGO Agritech Farms" />
            <span className="igo-logo__text">
              <strong>IGO</strong>
              <small>Agritech Farms</small>
            </span>
          </Link>

          <ul className="igo-menu">
            {NAV_ITEMS.map(item => (
              <li key={item.label}>
                <Link to={item.to} className="igo-link">{item.label}</Link>
              </li>
            ))}
          </ul>

          <Link to="/contact" className="igo-cta">Free Consultation</Link>

          <button
            type="button"
            className="igo-toggle"
            onClick={() => setIsOpen(o => !o)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="igo-mobile-menu"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div id="igo-mobile-menu" className={`igo-mobile ${isOpen ? 'is-open' : ''}`}>
          <ul>
            {NAV_ITEMS.map(item => (
              <li key={item.label}>
                <Link to={item.to} onClick={close}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <Link to="/contact" className="igo-cta igo-cta--block" onClick={close}>Free Consultation</Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
