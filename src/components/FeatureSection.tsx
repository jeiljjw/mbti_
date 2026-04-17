import { useTranslation } from 'react-i18next';
import { FiClock, FiTarget, FiZap } from 'react-icons/fi';

export const FeatureSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      img: '/1.webp',
      title: t('features.f1_title'),
      desc: t('features.f1_desc')
    },
    {
      img: '/2.webp',
      title: t('features.f2_title'),
      desc: t('features.f2_desc')
    },
    {
      img: '/3.webp',
      title: t('features.f3_title'),
      desc: t('features.f3_desc')
    }
  ];

  return (
    <section className="section section-light">
      <div className="container">
        <h2 className="section-title">{t('features.title')}</h2>
        <div className="features-container">
          {features.map((f, i) => (
            <div key={i} className="feature-row animate-fadeInUp" style={{ animationDelay: `${i * 150}ms` }}>
              <div className="feature-image-wrapper">
                <img src={f.img} alt={f.title} className="feature-img" />
              </div>
              <div className="feature-text-content">
                <div className="feature-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                  {i === 0 && <FiClock />}
                  {i === 1 && <FiTarget />}
                  {i === 2 && <FiZap />}
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
