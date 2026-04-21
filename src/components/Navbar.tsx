import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Link } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';

export const Navbar = () => {
  const { i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'ko' ? 'en' : 'ko';
    i18n.changeLanguage(newLang);
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link to="/" className="nav-brand" onClick={closeMenu}>
          <img src="/favicon.svg" alt="Simple MBTI Logo" className="nav-logo" />
          <span>{i18n.t('navbar.logo', { lng: 'en' })}</span>
        </Link>
        
        <button className="menu-toggle" onClick={toggleMenu}>
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>

        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <NavLink to="/" className="nav-link" onClick={closeMenu}>{i18n.t('navbar.home', { lng: 'en' })}</NavLink>
          <NavLink to="/blog" className="nav-link" onClick={closeMenu}>{i18n.t('navbar.blog', { lng: 'en' })}</NavLink>
          <button className="lang-toggle" onClick={toggleLanguage}>
            {i18n.language === 'ko' ? 'EN' : 'KO'}
          </button>
        </div>
      </div>
    </nav>
  );
};
