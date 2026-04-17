import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-left">
            <Link to="/" className="footer-brand">
              <img src="/favicon.svg" alt="Simple MBTI Logo" className="footer-logo" />
              <span className="footer-title">Simple MBTI</span>
            </Link>
            <p className="footer-copyright">{t('footer.copyright', { lng: 'en' })}</p>
          </div>
          
          <div className="footer-right">
            <div className="footer-links">
              <Link to="/privacy" className="footer-link-btn">{t('footer.privacy', { lng: 'en' })}</Link>
              <Link to="/terms" className="footer-link-btn">{t('footer.terms', { lng: 'en' })}</Link>
              <Link to="/about" className="footer-link-btn">{t('footer.about', { lng: 'en' })}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
