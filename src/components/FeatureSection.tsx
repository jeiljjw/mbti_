import { useTranslation } from 'react-i18next';
import { FiClock, FiTarget, FiZap } from 'react-icons/fi';

const ACCENTS = ['#4ade80', '#a855f7', '#38bdf8'];

export const FeatureSection = () => {
  const { t } = useTranslation();

  const features = [
    { img: '/1.display.webp', title: t('features.f1_title'), desc: t('features.f1_desc'), icon: <FiClock /> },
    { img: '/2.display.webp', title: t('features.f2_title'), desc: t('features.f2_desc'), icon: <FiTarget /> },
    { img: '/3.display.webp', title: t('features.f3_title'), desc: t('features.f3_desc'), icon: <FiZap /> },
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="eyebrow" style={{ marginBottom: '1rem' }}>
          <span className="dot"></span> Why SimpleMBTI
        </div>
        <h2 className="section-title">{t('features.title')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '4rem' }}>
          {features.map((f, i) => (
            <article
              key={i}
              className="sticker glass-panel animate-fadeInUp"
              style={{ animationDelay: `${i * 150}ms`, padding: '2rem', overflow: 'hidden', boxShadow: `0 10px 0 -4px ${ACCENTS[i]}33` }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '2rem', color: ACCENTS[i], filter: `drop-shadow(0 0 12px ${ACCENTS[i]}66)` }}>{f.icon}</span>
                <span className="sticker-index">0{i + 1}</span>
              </div>
              <div style={{ borderRadius: '1rem', overflow: 'hidden', marginBottom: '1.5rem', border: '1px solid var(--glass-border)' }}>
                <img src={f.img} alt={f.title} loading="lazy" decoding="async" style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }} />
              </div>
              <h3 className="font-display" style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{f.title}</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{f.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
