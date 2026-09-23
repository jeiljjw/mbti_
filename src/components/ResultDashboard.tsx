import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FiHexagon, FiLayers, FiAperture, FiBarChart2, FiSmile, FiEye, FiHeart, FiActivity, FiFlag, FiStar, FiHome, FiDownload, FiLink, FiBriefcase } from 'react-icons/fi';
import type { DimensionScores, AssertiveType } from '../types/mbti';
import { FUNCTION_STACK } from '../constants/mbti';
import { RadarChart } from './RadarChart';
import { TraitProfileItem } from './TraitProfileItem';
import { AdSlot } from './AdSlot';
import { useLang } from '../hooks/useLang';
import { trackEvent } from '../utils/analytics';
import { getTypeDetail } from '../data/typeDetails';
import { getTypeTheme, gradientFor } from '../constants/theme';
import { drawShareCard, downloadDataUrl, shareLinks } from '../utils/shareCard';

interface ResultDashboardProps {
  result: string;
  assertiveScore: AssertiveType;
  dimensionScores: DimensionScores;
}

export const ResultDashboard = ({ result, assertiveScore, dimensionScores }: ResultDashboardProps) => {
  const { t } = useTranslation();
  const lang = useLang();
  const navigate = useNavigate();
  const [showDetail, setShowDetail] = useState(false);
  const [cardBusy, setCardBusy] = useState(false);
  const detail = getTypeDetail(result, lang);
  const theme = getTypeTheme(result);
  const typeName = t(`results.types.${result}.name`);
  const keywordsRaw: unknown = t(`results.types.${result}.keywords`, { returnObjects: true });
  const keywords = Array.isArray(keywordsRaw) ? (keywordsRaw as string[]) : [];
  const shareUrl = `https://www.simplembti.com/${lang}/r/${result.toLowerCase()}`;
  const links = shareLinks(shareUrl, `${result} ${typeName} — SimpleMBTI`);

  const copyLink = async () => {
    trackEvent('share_click', { result_type: result, method: 'copy_link' });
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      // clipboard unavailable — still count the intent
    }
  };

  const downloadCard = async () => {
    trackEvent('share_click', { result_type: result, method: 'card_download' });
    setCardBusy(true);
    try {
      const url = await drawShareCard(result, typeName, keywords, lang, { from: theme.from, to: theme.to });
      downloadDataUrl(url, `simplembti-${result.toLowerCase()}.png`);
    } finally {
      setCardBusy(false);
    }
  };

  return (
    <div className="test-result animate-fadeInUp" style={{ padding: '0' }}>
      {/* Header outside the main card */}
      <header className="report-header" style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.8rem', letterSpacing: '0.3em', color: 'var(--text-secondary)', marginBottom: '0.75rem', opacity: 0.8 }}>MBTI® PERSONALITY RESULT</p>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 900, marginBottom: '0.5rem', lineHeight: 1.2 }}>
          YOUR TYPE: <span className="text-gradient">{result}</span> <br />
          <span style={{ fontSize: '0.6em', opacity: 0.9, letterSpacing: '0.1em', display: 'block', marginTop: '0.5rem' }}>
            {typeName.toUpperCase()}
          </span>
        </h1>
      </header>

      {/* Main Dashboard Container */}
      <div className="premium-glass" style={{ padding: 'clamp(1rem, 5vw, 2rem)', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.06)' }}>

        {/* Top Control Bar */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem', padding: '0 0.5rem' }}>
          <div style={{ fontSize: 'clamp(0.9rem, 3vw, 1.1rem)', fontWeight: 700, letterSpacing: '0.05em', textAlign: 'center' }}>
            <span style={{ color: 'var(--accent-green-bright)' }}>{result}</span> | {t(`results.trait_names.${result[0]}`)} {t(`results.trait_names.${result[1]}`)} {t(`results.trait_names.${result[2]}`)} {t(`results.trait_names.${result[3]}`)}
          </div>
        </div>

        {/* Summary (always visible) */}
        <div className="report-dashboard-grid">
          <div className="dashboard-column dashboard-column-center" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', gridColumn: '1 / -1' }}>
            <article className="dashboard-card glass-panel sticker" style={{ padding: '2.5rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: 'fit-content', borderColor: `${theme.from}55`, boxShadow: `0 12px 0 -6px ${theme.from}44, 0 8px 32px 0 rgba(0,0,0,0.37)` }}>
              <div style={{ fontSize: '4.5rem', color: theme.from, marginBottom: '1rem', filter: `drop-shadow(0 0 20px ${theme.from}88)` }}><FiAperture /></div>
              <h2 className="font-display" style={{ fontSize: '5rem', fontWeight: 800, letterSpacing: '0.02em', marginBottom: '0rem', marginTop: '-1rem', background: gradientFor(result), WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {result}
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', fontWeight: 500, letterSpacing: '0.05em' }}>
                {typeName} | {t(`results.trait_names.${result[0]}`)} {t(`results.trait_names.${result[1]}`)} {t(`results.trait_names.${result[2]}`)} {t(`results.trait_names.${result[3]}`)}
              </p>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {keywords.map((k: string) => (
                  <span key={k} className="char-tag" style={{ fontSize: '0.75rem', opacity: 0.8 }}>✦ {k}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '2rem' }}>
                <button className="btn btn-primary" onClick={downloadCard} disabled={cardBusy} style={{ padding: '0.9rem 1.8rem' }}>
                  <FiDownload /> {cardBusy ? '...' : lang === 'ko' ? '카드 저장' : lang === 'ja' ? 'カード保存' : 'Save card'}
                </button>
                <button className="btn btn-glass" onClick={copyLink} style={{ padding: '0.9rem 1.8rem' }}>
                  <FiLink /> {lang === 'ko' ? '링크 복사' : lang === 'ja' ? 'リンクをコピー' : 'Copy link'}
                </button>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', fontSize: '0.85rem' }}>
                <a href={links.x} target="_blank" rel="noreferrer" onClick={() => trackEvent('share_click', { result_type: result, method: 'x' })} style={{ color: 'var(--text-secondary)' }}>X</a>
                <a href={links.line} target="_blank" rel="noreferrer" onClick={() => trackEvent('share_click', { result_type: result, method: 'line' })} style={{ color: 'var(--text-secondary)' }}>LINE</a>
              </div>
              <button className="btn btn-glass" onClick={() => setShowDetail(v => !v)} style={{ marginTop: '1.5rem' }}>
                {showDetail ? (lang === 'ko' ? '간략히 보기 ▲' : 'Show less ▲') : (lang === 'ko' ? '상세 리포트 보기 ▼' : lang === 'ja' ? '詳細レポート ▼' : 'Full report ▼')}
              </button>
            </article>
          </div>
        </div>

        {/* Detail (toggle) */}
        {showDetail && (
          <div className="report-dashboard-grid" style={{ marginTop: '1.5rem' }}>
            {/* Left Column: Dichotomies & Functions */}
            <div className="dashboard-column" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <article className="dashboard-card glass-panel" style={{ padding: '1.5rem', flex: 1 }}>
                <h3 className="dashboard-card-title" style={{ fontSize: '0.9rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FiHexagon style={{ color: 'var(--accent-green)' }} /> {t('results.labels.dichotomies').toUpperCase()}
                </h3>
                <RadarChart scores={dimensionScores} />
              </article>

              <article className="dashboard-card glass-panel" style={{ padding: '1.5rem' }}>
                <h3 className="dashboard-card-title" style={{ fontSize: '0.9rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FiLayers style={{ color: 'var(--accent-purple)' }} /> {t('results.labels.functions').toUpperCase()}
                </h3>
                <div className="function-stack-list" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {FUNCTION_STACK[result]?.map((func, i) => (
                    <span key={func} className={`function-tag ${i === 0 ? 'dom' : ''}`} style={{
                      padding: '0.4rem 0.8rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      background: i === 0 ? 'var(--gradient-green)' : 'rgba(255,255,255,0.05)',
                      color: i === 0 ? 'var(--bg-dark)' : 'var(--text-primary)',
                      boxShadow: i === 0 ? '0 0 15px var(--accent-green-glow)' : 'none'
                    }}>
                      {func} {i === 0 ? '(D)' : i === 1 ? '(A)' : i === 2 ? '(T)' : '(I)'}
                    </span>
                  ))}
                </div>
              </article>
            </div>

            {/* Center Column: Description + Strengths/Weaknesses + Careers */}
            <div className="dashboard-column dashboard-column-center" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <article className="dashboard-card glass-panel" style={{ padding: '1.75rem', textAlign: 'left', flex: 1 }}>
                <h3 className="dashboard-card-title" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{typeName} ({result})</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{t(`results.types.${result}.desc`)}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div>
                    <h4 style={{ fontSize: '0.8rem', color: 'var(--accent-green)', marginBottom: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t('results.labels.strengths')}</h4>
                    <ul style={{ fontSize: '0.85rem', color: 'var(--text-primary)', paddingLeft: '0', listStyle: 'none' }}>
                      {detail.strengths.map(s => <li key={s} style={{ marginBottom: '0.4rem' }}>• {s}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.8rem', color: 'var(--accent-purple)', marginBottom: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t('results.labels.weaknesses')}</h4>
                    <ul style={{ fontSize: '0.85rem', color: 'var(--text-primary)', paddingLeft: '0', listStyle: 'none' }}>
                      {detail.weaknesses.map(w => <li key={w} style={{ marginBottom: '0.4rem' }}>• {w}</li>)}
                    </ul>
                  </div>
                </div>
              </article>

              <article className="dashboard-card glass-panel" style={{ padding: '1.5rem', textAlign: 'left' }}>
                <h4 style={{ fontSize: '0.8rem', color: 'var(--accent-green)', marginBottom: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FiBriefcase /> {t('results.labels.career')}
                </h4>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {detail.careers.map(c => (
                    <span key={c} className="char-tag" style={{ fontSize: '0.8rem' }}>{c}</span>
                  ))}
                </div>
              </article>
            </div>

            {/* Right Column: Trait Profile & Characteristics */}
            <div className="dashboard-column" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <article className="dashboard-card glass-panel" style={{ padding: '1.5rem' }}>
                <h3 className="dashboard-card-title" style={{ fontSize: '0.9rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FiBarChart2 style={{ color: 'var(--accent-green)' }} /> {t('results.labels.traits').toUpperCase()}
                </h3>
                <div>
                  <TraitProfileItem icon={<FiSmile />} traitKey={result[0]} scoreValue={dimensionScores.EI} />
                  <TraitProfileItem icon={<FiEye />} traitKey={result[1]} scoreValue={dimensionScores.SN} />
                  <TraitProfileItem icon={<FiHeart />} traitKey={result[2]} scoreValue={dimensionScores.TF} />
                  <TraitProfileItem icon={<FiActivity />} traitKey={result[3]} scoreValue={dimensionScores.JP} />
                  <TraitProfileItem icon={<FiFlag />} traitKey={assertiveScore} scoreValue={assertiveScore === 'A' ? 5 : -5} />
                </div>
              </article>

              <article className="dashboard-card glass-panel" style={{ padding: '1.5rem', flex: 1 }}>
                <h3 className="dashboard-card-title" style={{ fontSize: '0.9rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FiStar style={{ color: 'var(--accent-purple)' }} /> {t('results.labels.characteristics').toUpperCase()}
                </h3>
                <div className="characteristic-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                  {detail.traits.map(trait => (
                    <div key={trait} style={{
                      fontSize: '0.75rem',
                      padding: '0.5rem',
                      borderRadius: '0.5rem',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}>
                      <span style={{ color: 'var(--accent-purple)', fontSize: '0.5rem' }}>●</span> {trait}
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        )}
      </div>

      <AdSlot slot="result-bottom" />

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn btn-primary" onClick={() => { trackEvent('result_back_home', { result_type: result }); navigate(`/${lang}`); }} style={{ padding: '1rem 2.5rem', gap: '0.75rem' }}>
          <FiHome /> {lang === 'ko' ? '홈으로' : lang === 'ja' ? 'ホームへ' : 'Back to Home'}
        </button>
        <button className="btn btn-glass" onClick={() => navigate(`/${lang}/type/${result.toLowerCase()}`)} style={{ padding: '1rem 2.5rem' }}>
          {lang === 'ko' ? '타입 심층 보기' : lang === 'ja' ? 'タイプ詳細' : 'Type deep-dive'}
        </button>
      </div>
    </div>
  );
};
