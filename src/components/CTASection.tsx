import { useTranslation } from 'react-i18next';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export const CTASection = () => {
  const { t } = useTranslation();

  return (
    <section className="section cta-section cta-fullscreen">
      <div className="hero-background">
        <div className="hero-background-image"></div>
      </div>
      <div className="container">
        <div className="cta-box glass-panel">
          <h2 className="section-title">{t('cta.title')}</h2>
          <Link to="/test" className="btn btn-glass" style={{ marginTop: '2rem' }}>
            {t('cta.button')} <FiArrowRight style={{ marginLeft: '8px' }} />
          </Link>
        </div>
      </div>
    </section>
  );
};
