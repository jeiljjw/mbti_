import { useTranslation } from 'react-i18next';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useLangLink } from '../hooks/useLang';

export const CTASection = () => {
  const { t } = useTranslation();
  const l = useLangLink();

  return (
    <section className="section cta-section cta-fullscreen">
      <div className="hero-background">
        <div className="hero-background-image"></div>
      </div>
      <div className="container">
        <div className="cta-box glass-panel">
          <h2 className="section-title">{t('cta.title')}</h2>
          <Link to={l('/test')} className="btn btn-primary btn-lg">
            {t('cta.button')} <FiArrowRight style={{ marginLeft: '2px' }} />
          </Link>
        </div>
      </div>
    </section>
  );
};
