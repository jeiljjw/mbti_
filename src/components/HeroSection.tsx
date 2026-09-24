import { useTranslation } from 'react-i18next';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useLangLink } from '../hooks/useLang';
import { TYPE_THEMES, GROUP_COLORS } from '../constants/theme';

const CODES = Object.keys(TYPE_THEMES);

const SECONDARY: Record<string, string> = {
  en: 'See matches',
  ko: '궁합 보기',
  ja: '相性を見る',
};

export const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const l = useLangLink();
  const lang = (['ko', 'ja'].includes(i18n.language) ? i18n.language : 'en') as 'ko' | 'ja' | 'en';

  const chips = [...CODES, ...CODES]; // duplicate for seamless loop

  return (
    <section className="hero" style={{ flexDirection: 'column', gap: '2.5rem' }}>
      <div className="hero-background">
        <div className="hero-background-image"></div>
      </div>
      <div className="aurora aurora-a"></div>
      <div className="aurora aurora-b"></div>
      <div className="container animate-fadeInUp" style={{ zIndex: 1 }}>
        <div className="eyebrow" style={{ marginBottom: '1.5rem' }}>
          <span className="dot"></span> 2-min MBTI lab · KO / EN / JA
        </div>
        <h1>
          {t('hero.title')}
        </h1>
        <p className="delay-100 animate-fadeInUp">{t('hero.subtitle')}</p>
        <div className="hero-buttons delay-200 animate-fadeInUp">
          <Link to={l('/test')} className="btn btn-primary btn-lg">
            {t('hero.button')} <FiArrowRight style={{ marginLeft: '2px' }} />
          </Link>
          <Link to={l('/match')} className="btn btn-glass btn-lg">
            {SECONDARY[lang]}
          </Link>
        </div>
        <div className="stat-row delay-300 animate-fadeInUp">
          <div className="stat-item">
            <div className="stat-num">16</div>
            <div className="stat-label">Types</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">136</div>
            <div className="stat-label">Matches</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">6</div>
            <div className="stat-label">Guides</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">3</div>
            <div className="stat-label">Languages</div>
          </div>
        </div>
      </div>
      <div className="marquee" aria-hidden>
        <div className="marquee-track">
          {chips.map((code, i) => {
            const theme = TYPE_THEMES[code];
            return (
              <Link
                key={`${code}-${i}`}
                to={l(`/type/${code.toLowerCase()}`)}
                className="type-chip"
                tabIndex={-1}
              >
                <span className="swatch" style={{ background: GROUP_COLORS[theme.group], boxShadow: `0 0 10px ${GROUP_COLORS[theme.group]}` }}></span>
                {code}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
