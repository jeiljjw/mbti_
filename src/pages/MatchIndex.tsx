import { useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { AdSlot } from '../components/AdSlot';
import { useLang } from '../hooks/useLang';
import { getCompatibility } from '../utils/compatibility';
import { GROUP_COLORS, TIER_COLORS, getTypeTheme } from '../constants/theme';

const TYPES = ['ISTJ','ISFJ','INFJ','INTJ','ISTP','ISFP','INFP','INTP','ESTP','ESFP','ENFP','ENTP','ESTJ','ESFJ','ENFJ','ENTJ'];
const POPULAR: [string, string][] = [
  ['ENFP', 'INTJ'], ['INFP', 'ENFJ'], ['ENTP', 'INFJ'],
  ['INTP', 'ENTJ'], ['ISFJ', 'ESFJ'], ['ISTJ', 'ESTJ'],
];

const STR: Record<string, Record<string, string>> = {
  en: { title: 'Compatibility Finder', sub: 'Pick two types — or browse the full 16×16 matrix.', me: 'Me', you: 'Partner', swap: '⇄ Swap', view: 'View compatibility', popular: 'Popular pairs', matrix: 'Full matrix', self: 'self' },
  ko: { title: '궁합 파인더', sub: '두 유형을 고르거나 16×16 전체 매트릭스를 둘러보세요.', me: '나', you: '상대', swap: '⇄ 바꾸기', view: '궁합 보기', popular: '인기 궁합', matrix: '전체 매트릭스', self: '자기' },
  ja: { title: '相性ファインダー', sub: '2つのタイプを選ぶか、16×16マトリクスから探せます。', me: '自分', you: '相手', swap: '⇄ 入れ替え', view: '相性を見る', popular: '人気の相性', matrix: '全マトリクス', self: '自身' },
};

const pairSlug = (a: string, b: string) => [a.toLowerCase(), b.toLowerCase()].sort().join('-');

const MatchIndex = () => {
  const lang = useLang();
  const navigate = useNavigate();
  const s = STR[lang] || STR.en;
  const [me, setMe] = useState<string | null>(null);
  const [you, setYou] = useState<string | null>(null);

  const go = () => {
    if (me && you) navigate(`/${lang}/match/${pairSlug(me, you)}`);
  };

  const renderPicker = (value: string | null, set: (t: string) => void, label: string) => (
    <div>
      <h3 style={{ marginBottom: '1rem', fontSize: '1rem', color: 'var(--text-secondary)' }}>{label}</h3>
      <div className="picker-grid">
        {TYPES.map(t => {
          const active = value === t;
          const c = GROUP_COLORS[getTypeTheme(t).group];
          return (
            <button
              key={t}
              onClick={() => set(t)}
              className="btn btn-sm"
              aria-pressed={active}
              style={{
                padding: '0 4px',
                fontWeight: 800,
                background: active ? c : 'rgba(255,255,255,0.04)',
                color: active ? '#0a0a0f' : 'var(--text-primary)',
                border: `1px solid ${active ? c : 'var(--glass-border)'}`,
                boxShadow: active ? `0 4px 16px -4px ${c}88` : 'none',
              }}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="legal-page">
      <SEO
        title={s.title}
        description={s.sub}
        keywords="MBTI 궁합, MBTI相性, MBTI compatibility, 커플 궁합"
        path="/match"
        lang={lang}
      />
      <div className="legal-container" style={{ maxWidth: 1000 }}>
        <header className="legal-header" style={{ textAlign: 'center' }}>
          <h1 className="legal-title font-display">{s.title}</h1>
          <p className="legal-last-updated">{s.sub}</p>
        </header>

        <div className="legal-content">
          <section className="legal-section glass-panel legal-section-card">
            <div className="match-picker-layout">
              {renderPicker(me, setMe, s.me)}
              <button
                className="btn btn-glass btn-sm"
                onClick={() => { setMe(you); setYou(me); }}
                style={{ marginTop: '2.8rem' }}
                aria-label="swap"
              >
                {s.swap}
              </button>
              {renderPicker(you, setYou, s.you)}
            </div>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button className="btn btn-primary btn-lg btn-block" onClick={go} disabled={!me || !you} style={{ maxWidth: 420, margin: '0 auto', opacity: me && you ? 1 : 0.55 }}>
                {me && you ? `${me} × ${you} — ${s.view}` : s.view}
              </button>
            </div>
          </section>

          <section className="legal-section glass-panel legal-section-card">
            <h2>{s.popular}</h2>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {POPULAR.map(([a, b]) => {
                const c = getCompatibility(a, b);
                return (
                  <Link key={`${a}-${b}`} to={`/${lang}/match/${pairSlug(a, b)}`} className="btn btn-glass btn-sm">
                    {a} × {b} <strong style={{ color: TIER_COLORS[c.tier], marginLeft: '0.4rem' }}>{c.score}</strong>
                  </Link>
                );
              })}
            </div>
          </section>

          <AdSlot slot="match-index-mid" />

          <section className="legal-section glass-panel legal-section-card" style={{ overflow: 'hidden' }}>
            <h2>{s.matrix}</h2>
            <div className="matrix-scroll" role="region" aria-label={s.matrix} tabIndex={0}>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(17, minmax(44px, 1fr))`, gap: 4, minWidth: 720 }}>
              <div />
              {TYPES.map(t => (
                <div key={t} style={{ fontSize: '0.65rem', fontWeight: 800, textAlign: 'center', color: 'var(--text-secondary)' }}>{t}</div>
              ))}
              {TYPES.map(row => (
                <Fragment key={row}>
                  <div key={`h-${row}`} style={{ fontSize: '0.65rem', fontWeight: 800, display: 'flex', alignItems: 'center', color: 'var(--text-secondary)' }}>{row}</div>
                  {TYPES.map(col => {
                    const c = getCompatibility(row, col);
                    const self = row === col;
                    return (
                      <Link
                        key={`${row}-${col}`}
                        to={`/${lang}/match/${pairSlug(row, col)}`}
                        title={`${row} × ${col}: ${c.score}`}
                        style={{
                          aspectRatio: '1',
                          borderRadius: 8,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          textDecoration: 'none',
                          color: self ? 'var(--text-secondary)' : '#0a0a0f',
                          background: self ? 'rgba(255,255,255,0.04)' : TIER_COLORS[c.tier],
                          opacity: self ? 1 : 0.55 + (c.score / 100) * 0.45,
                        }}
                      >
                        {self ? '·' : c.score}
                      </Link>
                    );
                  })}
                </Fragment>
              ))}
            </div>
            </div>
          </section>
          <AdSlot slot="match-index-bottom" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MatchIndex;
