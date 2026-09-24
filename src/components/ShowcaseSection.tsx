import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useLangLink } from '../hooks/useLang';
import { GROUP_COLORS, GROUP_NAMES } from '../constants/theme';
import type { TypeGroup } from '../constants/theme';

export const ShowcaseSection = () => {
  const { t, i18n } = useTranslation();
  const l = useLangLink();
  const lang = (['ko', 'ja'].includes(i18n.language) ? i18n.language : 'en') as 'ko' | 'ja' | 'en';
  const groups: TypeGroup[] = ['NT', 'NF', 'SJ', 'SP'];

  return (
    <section className="section">
      <div className="bg-glow-right"></div>
      <div className="container showcase-container">
        <div className="showcase-content">
          <h2 className="section-title">{t('showcase.title')}</h2>
          <p className="section-subtitle">{t('showcase.subtitle')}</p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {groups.map(g => (
              <span key={g} className="type-chip" style={{ borderColor: `${GROUP_COLORS[g]}55` }}>
                <span className="swatch" style={{ background: GROUP_COLORS[g], boxShadow: `0 0 10px ${GROUP_COLORS[g]}` }}></span>
                {GROUP_NAMES[lang][g]}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {['INTJ', 'ENFP', 'ISTJ', 'ESFP'].map(code => (
              <Link key={code} to={l(`/type/${code.toLowerCase()}`)} className="btn btn-glass btn-sm">
                {code}
              </Link>
            ))}
          </div>
        </div>

        <div className="showcase-image-wrapper sticker" style={{ borderRadius: '1.75rem' }}>
          <img
            src="/mbti_dashboard_mockup.display.webp"
            alt="Personality Report Dashboard"
            className="showcase-image"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
};
