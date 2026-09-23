import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Link, useNavigate, useParams } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { isSupportedLang, SUPPORTED_LANGS } from '../i18n';

export const Navbar = () => {
  const { i18n, t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const cur = isSupportedLang(lang) ? lang : (isSupportedLang(i18n.language) ? i18n.language : 'en');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cycleLanguage = () => {
    const idx = SUPPORTED_LANGS.indexOf(cur as (typeof SUPPORTED_LANGS)[number]);
    const next = SUPPORTED_LANGS[(idx + 1) % SUPPORTED_LANGS.length];
    const rest = window.location.pathname.replace(/^\/(ko|en|ja)(\/|$)/, '/');
    const target = `/${next}${rest === '/' ? '' : rest}`;
    void i18n.changeLanguage(next);
    try {
      localStorage.setItem('simplembti-lang', next);
    } catch {
      // ignore
    }
    navigate(target);
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link to={`/${cur}`} className="nav-brand" onClick={closeMenu}>
          <img src="/favicon.svg" alt="Simple MBTI Logo" className="nav-logo" />
          <span>{t('navbar.logo')}</span>
        </Link>

        <button className="menu-toggle" onClick={toggleMenu} aria-label="menu">
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>

        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <NavLink to={`/${cur}`} end className="nav-link" onClick={closeMenu}>{t('navbar.home')}</NavLink>
          <NavLink to={`/${cur}/test`} className="nav-link" onClick={closeMenu}>
            {cur === 'ko' ? '테스트' : cur === 'ja' ? '診断' : 'Test'}
          </NavLink>
          <NavLink to={`/${cur}/match`} className="nav-link" onClick={closeMenu}>
            {cur === 'ko' ? '궁합' : cur === 'ja' ? '相性' : 'Match'}
          </NavLink>
          <NavLink to={`/${cur}/blog`} className="nav-link" onClick={closeMenu}>{t('navbar.blog')}</NavLink>
          <button className="lang-toggle" onClick={cycleLanguage} title="language">
            {cur.toUpperCase()} ▾
          </button>
        </div>
      </div>
    </nav>
  );
};
