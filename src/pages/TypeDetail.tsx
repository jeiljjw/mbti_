import { Link, useParams } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { AdSlot } from '../components/AdSlot';
import { useLang } from '../hooks/useLang';
import { getTypeDetail } from '../data/typeDetails';
import { getTypeOverview } from '../data/typeOverviews';
import { getGrip, getGrowthForType, getTypeFaqs, getTypeSpotlight } from '../utils/typeContent';
import { FUNCTION_STACK } from '../constants/mbti';
import { gradientFor, GROUP_COLORS, GROUP_NAMES, getTypeTheme } from '../constants/theme';
import { TOP_MATCHES, getCompatibility } from '../utils/compatibility';
import { useTranslation } from 'react-i18next';
import NotFound from './NotFound';

const KNOWN = ['ISTJ','ISFJ','INFJ','INTJ','ISTP','ISFP','INFP','INTP','ESTP','ESFP','ENFP','ENTP','ESTJ','ESFJ','ENFJ','ENTJ'];

const STR: Record<string, Record<string, string>> = {
  en: { deep: 'In depth', strengths: 'Strengths', weaknesses: 'Growth edges', growth: 'How to grow', functions: 'Function stack', grip: 'Under stress (grip)', love: 'In love', work: 'At work', careers: 'Best-fit careers', top: 'Best matches', hard: 'Challenging pairs', faq: 'Type FAQ', cta: 'Find my type', same: 'same', diff: 'different' },
  ko: { deep: '심층 분석', strengths: '강점', weaknesses: '보완점', growth: '성장 팁', functions: '인지 기능 스택', grip: '스트레스와 그립', love: '연애 스타일', work: '일 스타일', careers: '잘 맞는 직업', top: '최고 궁합', hard: '험난한 궁합', faq: '타입 FAQ', cta: '나는 무슨 유형? 테스트하기', same: '공통', diff: '다름' },
  ja: { deep: '深掘り', strengths: '強み', weaknesses: '成長点', growth: '成長ヒント', functions: '認知機能スタック', grip: 'ストレスとグリップ', love: '恋愛スタイル', work: '仕事スタイル', careers: '向いている職業', top: '最高の相性', hard: '険しい相性', faq: 'タイプFAQ', cta: '自分のタイプを診断', same: '共通', diff: '違い' },
};

const pairSlug = (a: string, b: string) => [a.toLowerCase(), b.toLowerCase()].sort().join('-');

const TypeDetail = () => {
  const { type = '' } = useParams<{ type: string }>();
  const lang = useLang();
  const s = STR[lang] || STR.en;
  const groupLang = (['ko', 'ja'].includes(lang) ? lang : 'en') as 'ko' | 'ja' | 'en';
  const { t } = useTranslation();
  const code = (type || '').toUpperCase();
  const known = KNOWN.includes(code);
  if (!known) return <NotFound />;
  const detail = getTypeDetail(code, lang);
  const overview = known ? getTypeOverview(code, lang) : null;
  const theme = getTypeTheme(code);
  const groupColor = GROUP_COLORS[theme.group];
  const name = known ? (t(`results.types.${code}.name`) as string) : code;
  const desc = known ? (t(`results.types.${code}.desc`) as string) : '';
  const keywordsRaw: unknown = known ? t(`results.types.${code}.keywords`, { returnObjects: true }) : [];
  const keywords = Array.isArray(keywordsRaw) ? (keywordsRaw as string[]) : [];
  const grip = known ? getGrip(code, lang) : null;
  const growth = known ? getGrowthForType(code, theme.group, lang) : [];
  const spotlight = known ? getTypeSpotlight(code, lang) : '';
  const faqs = known ? getTypeFaqs(code, lang) : [];
  const hard = known
    ? KNOWN.filter(x => x !== code)
        .map(x => ({ x, score: getCompatibility(code, x).score }))
        .sort((p, q) => p.score - q.score)
        .slice(0, 2)
    : [];

  return (
    <div className="legal-page">
      <SEO
        title={known ? `${code} ${name}` : 'Type'}
        description={known ? `${code} (${name}): ${desc} ${overview?.overview[0] || ''}`.slice(0, 160) : 'Personality type page.'}
        keywords={`${code}, MBTI ${code}, ${name}, MBTI test, MBTI compatibility, MBTI ${lang === 'ko' ? '성격 유형' : lang === 'ja' ? '性格タイプ' : 'personality type'}`}
        image={known ? `https://www.simplembti.com/og/${code.toLowerCase()}.png` : undefined}
        path={known ? `/type/${code.toLowerCase()}` : '/'}
        lang={lang}
      />
      <div className="legal-container" style={{ maxWidth: 900 }}>
        <header className="legal-header" style={{ textAlign: 'center' }}>
          <span className="type-chip" style={{ borderColor: `${groupColor}55`, marginBottom: '1rem' }}>
            <span className="swatch" style={{ background: groupColor, boxShadow: `0 0 10px ${groupColor}` }}></span>
            {GROUP_NAMES[groupLang][theme.group]}
          </span>
          <h1 className="legal-title font-display" style={{ background: gradientFor(code), WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{known ? `${code} · ${name}` : 'Unknown type'}</h1>
          <p className="legal-last-updated">{known ? desc : ''}</p>
          {known && (
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.5rem' }}>
              {keywords.map(k => <span key={k} className="char-tag">✦ {k}</span>)}
            </div>
          )}
        </header>
        {known && detail && overview && grip && (
          <div className="legal-content">
            <section className="legal-section glass-panel legal-section-card">
              <h2>{s.deep}</h2>
              {overview.overview.map((p, i) => <p key={i} style={{ lineHeight: 2 }}>{p}</p>)}
              <p style={{ lineHeight: 2, marginTop: '1rem', fontWeight: 600 }}>{spotlight}</p>
            </section>

            <section className="legal-section glass-panel legal-section-card">
              <h2>{s.strengths} · {s.weaknesses}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {detail.strengths.map(x => <li key={x} style={{ marginBottom: '0.5rem' }}>✅ {x}</li>)}
                </ul>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {detail.weaknesses.map(x => <li key={x} style={{ marginBottom: '0.5rem' }}>🔧 {x}</li>)}
                </ul>
              </div>
            </section>

            <section className="legal-section glass-panel legal-section-card">
              <h2>{s.growth}</h2>
              <ol>
                {growth.map(g => <li key={g} style={{ marginBottom: '0.7rem', lineHeight: 1.8 }}>{g}</li>)}
              </ol>
            </section>

            <section className="legal-section glass-panel legal-section-card">
              <h2>{s.functions}</h2>
              <p style={{ marginBottom: '1rem' }}>{(FUNCTION_STACK[code] || []).join(' → ')}</p>
              <h2 style={{ marginTop: '2rem' }}>{s.grip} ({grip.inferior})</h2>
              <p><strong>⚡ </strong>{grip.trigger}</p>
              <p><strong>🌀 </strong>{grip.grip}</p>
              <p><strong>💡 </strong>{grip.recovery}</p>
            </section>

            <AdSlot slot="type-mid" />

            <section className="legal-section glass-panel legal-section-card">
              <h2>{s.love}</h2>
              <p style={{ lineHeight: 2 }}>{overview.love}</p>
            </section>

            <section className="legal-section glass-panel legal-section-card">
              <h2>{s.work}</h2>
              <p style={{ lineHeight: 2 }}>{overview.work}</p>
            </section>

            <section className="legal-section glass-panel legal-section-card">
              <h2>{s.careers}</h2>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {detail.careers.map(c => <span key={c} className="char-tag">{c}</span>)}
              </div>
            </section>

            <section className="legal-section glass-panel legal-section-card">
              <h2>{s.top}</h2>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {(TOP_MATCHES[code] || []).map(m => (
                  <Link key={m} to={`/${lang}/match/${pairSlug(code, m)}`} className="btn btn-glass" style={{ padding: '0.8rem 1.4rem' }}>
                    {code} × {m}
                  </Link>
                ))}
              </div>
              <h2 style={{ marginTop: '2rem' }}>{s.hard}</h2>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {hard.map(({ x, score }) => (
                  <Link key={x} to={`/${lang}/match/${pairSlug(code, x)}`} className="btn btn-glass" style={{ padding: '0.8rem 1.4rem' }}>
                    {code} × {x} <strong style={{ marginLeft: '0.4rem', opacity: 0.8 }}>{score}</strong>
                  </Link>
                ))}
              </div>
            </section>

            <section className="legal-section glass-panel legal-section-card">
              <h2>{s.faq}</h2>
              {faqs.map(f => (
                <div key={f.q} style={{ marginBottom: '1.25rem' }}>
                  <p><strong>Q. {f.q}</strong></p>
                  <p>A. {f.a}</p>
                </div>
              ))}
            </section>

            <section className="legal-section glass-panel legal-section-card" style={{ textAlign: 'center' }}>
              <Link to={`/${lang}/test`} className="btn btn-primary">{s.cta}</Link>
            </section>
            <AdSlot slot="type-bottom" />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default TypeDetail;
