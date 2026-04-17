import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Link } from 'react-router-dom';

export const Navbar = () => {
  const { i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

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
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link to="/" className="nav-brand">
          <img src="/favicon.svg" alt="Simple MBTI Logo" className="nav-logo" />
          <span>{i18n.t('navbar.logo', { lng: 'en' })}</span>
        </Link>
        <div className="nav-links">
          <NavLink to="/" className="nav-link">{i18n.t('navbar.home', { lng: 'en' })}</NavLink>
          <NavLink to="/blog" className="nav-link">{i18n.t('navbar.blog', { lng: 'en' })}</NavLink>
          <button className="lang-toggle" onClick={toggleLanguage}>
            {i18n.language === 'ko' ? 'EN' : 'KO'}
          </button>
        </div>
      </div>
    </nav>
  );
};
