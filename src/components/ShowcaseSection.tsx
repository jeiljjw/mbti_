import { useTranslation } from 'react-i18next';

export const ShowcaseSection = () => {
  const { t } = useTranslation();

  return (
    <section className="section">
      <div className="bg-glow-right"></div>
      <div className="container showcase-container">
        <div className="showcase-content">
          <h2 className="section-title">{t('showcase.title')}</h2>
          <p className="section-subtitle">{t('showcase.subtitle')}</p>
        </div>
        
        <div className="showcase-image-wrapper">
          <img 
            src="/mbti_dashboard_mockup.png" 
            alt="Personality Report Dashboard" 
            className="showcase-image"
          />
        </div>
      </div>
    </section>
  );
};
