import { useTranslation } from 'react-i18next';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  const { t, i18n } = useTranslation();

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-background-image"></div>
      </div>
      <div className="bg-glow"></div>
      <div className="container animate-fadeInUp">
        <h1>
          {i18n.t('hero.title', { lng: 'en' })}
        </h1>
        <p className="delay-100 animate-fadeInUp">{t('hero.subtitle')}</p>
        <div className="hero-buttons delay-200 animate-fadeInUp">
          <Link to="/test" className="btn btn-glass">
            {t('hero.button')} <FiArrowRight style={{ marginLeft: '8px' }} />
          </Link>
        </div>
      </div>
    </section>
  );
};
