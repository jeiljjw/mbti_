import { Link, useParams } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { AdSlot } from '../components/AdSlot';
import { useLang } from '../hooks/useLang';
import { getCompatibility, normalizePair, TOP_MATCHES } from '../utils/compatibility';
import { getMatchContent } from '../utils/matchContent';
import { TIER_COLORS, GROUP_COLORS, getTypeTheme } from '../constants/theme';
import NotFound from './NotFound';

const KNOWN = ['ISTJ','ISFJ','INFJ','INTJ','ISTP','ISFP','INFP','INTP','ESTP','ESFP','ENFP','ENTP','ESTJ','ESFJ','ENFJ','ENTJ'];

const TIER_LABEL: Record<string, Record<string, string>> = {
  en: { excellent: 'Excellent', good: 'Good', average: 'Average', challenging: 'Needs work' },
  ko: { excellent: '최고', good: '좋음', average: '무난', challenging: '노력 필요' },
  ja: { excellent: '最高', good: '良い', average: 'まずまず', challenging: '努力が必要' },
};

const STR: Record<string, Record<string, string>> = {
  en: { analysis: 'At a glance', axes: 'Dimension-by-dimension', strengths: 'Strengths', watchouts: 'Watch out for', dating: 'Dating & communication guide', verdict: 'Verdict', faq: 'Pair FAQ', related: 'Related pairs', types: 'Type profiles', cta: 'Check my match', tip: 'Tip' },
  ko: { analysis: '한눈에 보기', axes: '지표별 심층 분석', strengths: '강점', watchouts: '주의점', dating: '데이트·소통 가이드', verdict: '총평', faq: '궁합 FAQ', related: '관련 궁합', types: '유형 프로필', cta: '내 궁합 확인하기', tip: '팁' },
  ja: { analysis: '概要', axes: '指標別の深掘り', strengths: '強み', watchouts: '注意点', dating: 'デート・対話ガイド', verdict: '総評', faq: '相性FAQ', related: '関連の相性', types: 'タイプ詳細', cta: '自分の相性を診断', tip: 'ヒント' },
};

const TIER_OG: Record<string, string> = {
  excellent: 'https://www.simplembti.com/og/match-excellent.png',
  good: 'https://www.simplembti.com/og/match-good.png',
  average: 'https://www.simplembti.com/og/match-average.png',
  challenging: 'https://www.simplembti.com/og/match-challenging.png',
};

const pairSlug = (a: string, b: string) => [a.toLowerCase(), b.toLowerCase()].sort().join('-');

const MatchDetail = () => {
  const { pair = '' } = useParams<{ pair: string }>();
  const lang = useLang();
  const s = STR[lang] || STR.en;
  const parts = pair.toUpperCase().split('-');
  const valid = parts.length === 2 && parts.every(p => KNOWN.includes(p));
  if (!valid) return <NotFound />;

  const [a, b] = normalizePair(parts[0], parts[1]);
  const c = getCompatibility(a, b, lang);
  const content = getMatchContent(a, b, lang, c.score, c.tier);
  const labels = TIER_LABEL[lang] || TIER_LABEL.en;
  const canonical = `${a.toLowerCase()}-${b.toLowerCase()}`;
  const tierColor = TIER_COLORS[c.tier];

  const related = [
    ...(TOP_MATCHES[a] || []).filter(t => t !== b).slice(0, 2).map(t => normalizePair(a, t)),
    ...(TOP_MATCHES[b] || []).filter(t => t !== a).slice(0, 2).map(t => normalizePair(b, t)),
  ].filter(([x, y], i, arr) => arr.findIndex(([p, q]) => p === x && q === y) === i).slice(0, 4);

  return (
    <div className="legal-page">
      <SEO
        title={`${a} × ${b} ${lang === 'ko' ? '궁합' : lang === 'ja' ? '相性' : 'Compatibility'} ${c.score}/100 — ${labels[c.tier]}`}
        description={`${a}와 ${b}의 MBTI 궁합 ${c.score}점(${labels[c.tier]}). ${content.narrative}`.slice(0, 160)}
        keywords={`MBTI 궁합, ${a} ${b} 궁합, MBTI compatibility, ${a} ${b} match, MBTI相性, 커플 궁합`}
        image={TIER_OG[c.tier] || 'https://www.simplembti.com/og/match.png'}
        path={`/match/${canonical}`}
        lang={lang}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: content.faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }}
      />
      <div className="legal-container" style={{ maxWidth: 900 }}>
        <header className="legal-header" style={{ textAlign: 'center' }}>
          <h1 className="legal-title font-display">{a} × {b}</h1>
          <div style={{ height: 10, borderRadius: 9999, background: 'rgba(255,255,255,0.07)', overflow: 'hidden', maxWidth: 420, margin: '1.5rem auto 0' }}>
            <div style={{ width: `${c.score}%`, height: '100%', borderRadius: 9999, background: `linear-gradient(90deg, ${GROUP_COLORS[getTypeTheme(a).group]}, ${tierColor})` }} />
          </div>
          <p style={{ fontSize: '3rem', fontWeight: 900, margin: '1rem 0 0', color: tierColor, fontFamily: 'var(--font-display)', textShadow: `0 0 40px ${tierColor}55` }}>
            {c.score}<span style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>/100</span>
          </p>
          <p className="legal-last-updated">{labels[c.tier]}</p>
        </header>
        <div className="legal-content">
          <section className="legal-section glass-panel legal-section-card">
            <h2>{s.analysis}</h2>
            <p style={{ lineHeight: 1.9, fontWeight: 600 }}>{content.narrative}</p>
            <p style={{ lineHeight: 1.9, marginTop: '0.75rem' }}>{c.summary}</p>
            <p style={{ lineHeight: 1.9, marginTop: '0.75rem', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>{content.scoreBreakdown}</p>
            <div className="axis-grid-4" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0.6rem', marginTop: '1.25rem' }}>
              {[0, 1, 2, 3].map(i => (
                <div key={i} style={{ padding: '0.8rem 0.4rem', borderRadius: '0.75rem', background: a[i] === b[i] ? 'rgba(110,231,183,0.08)' : 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
                  <div style={{ fontWeight: 800 }}>{a[i]} × {b[i]}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                    {a[i] === b[i] ? (lang === 'ko' ? '공통' : lang === 'ja' ? '共通' : 'Same') : (lang === 'ko' ? '다름' : lang === 'ja' ? '違い' : 'Different')}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="legal-section glass-panel legal-section-card">
            <h2>{s.axes}</h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {content.axes.map(ax => (
                <article key={ax.axis} style={{ padding: '1.25rem 1.5rem', borderRadius: '1rem', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
                    <strong style={{ color: 'var(--accent-green)' }}>{ax.axis}</strong>
                    <strong>{ax.aLetter} × {ax.bLetter}</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {ax.same ? (lang === 'ko' ? '공통 — ' : lang === 'ja' ? '共通 — ' : 'Shared — ') : (lang === 'ko' ? '다름 — ' : lang === 'ja' ? '違い — ' : 'Different — ')}{ax.title}
                    </span>
                  </div>
                  <p style={{ lineHeight: 1.9 }}>{ax.body}</p>
                  <p style={{ marginTop: '0.6rem', color: 'var(--text-primary)' }}>💡 <strong>{s.tip}:</strong> {ax.tip}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="legal-section glass-panel legal-section-card">
            <h2>{s.strengths} · {s.watchouts}</h2>
            <div className="split-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {content.strengths.map(t => <li key={t} style={{ marginBottom: '0.7rem', lineHeight: 1.7 }}>✅ {t}</li>)}
              </ul>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {content.watchouts.map(t => <li key={t} style={{ marginBottom: '0.7rem', lineHeight: 1.7 }}>⚠️ {t}</li>)}
              </ul>
            </div>
          </section>

          <AdSlot slot="match-mid" />

          <section className="legal-section glass-panel legal-section-card">
            <h2>{s.dating}</h2>
            <ol>
              {content.datingTips.map(t => <li key={t} style={{ marginBottom: '0.8rem', lineHeight: 1.8 }}>{t}</li>)}
            </ol>
          </section>

          <section className="legal-section glass-panel legal-section-card">
            <h2>{s.verdict}</h2>
            <p style={{ lineHeight: 2 }}>{content.verdictLong}</p>
          </section>

          <section className="legal-section glass-panel legal-section-card">
            <h2>{s.faq}</h2>
            {content.faqs.map(f => (
              <div key={f.q} style={{ marginBottom: '1.25rem' }}>
                <p><strong>Q. {f.q}</strong></p>
                <p>A. {f.a}</p>
              </div>
            ))}
          </section>

          <section className="legal-section glass-panel legal-section-card">
            <h2>{s.related}</h2>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              {related.map(([x, y]) => {
                const rc = getCompatibility(x, y);
                return (
                  <Link key={`${x}-${y}`} to={`/${lang}/match/${pairSlug(x, y)}`} className="btn btn-glass btn-sm">
                    {x} × {y} <strong style={{ color: TIER_COLORS[rc.tier], marginLeft: '0.4rem' }}>{rc.score}</strong>
                  </Link>
                );
              })}
            </div>
            <h2 style={{ marginTop: '2rem' }}>{s.types}</h2>
            <div className="action-stack action-stack-mobile">
              <Link to={`/${lang}/type/${a.toLowerCase()}`} className="btn btn-glass">{a}</Link>
              <Link to={`/${lang}/type/${b.toLowerCase()}`} className="btn btn-glass">{b}</Link>
              <Link to={`/${lang}/test`} className="btn btn-primary">{s.cta}</Link>
            </div>
          </section>
          <AdSlot slot="match-bottom" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MatchDetail;
