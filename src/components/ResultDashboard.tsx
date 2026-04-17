import { useTranslation } from 'react-i18next';
import { FiHexagon, FiLayers, FiAperture, FiBarChart2, FiSmile, FiEye, FiHeart, FiActivity, FiFlag, FiStar, FiHome } from 'react-icons/fi';
import type { DimensionScores, AssertiveType } from '../types/mbti';
import { FUNCTION_STACK } from '../constants/mbti';
import { RadarChart } from './RadarChart';
import { TraitProfileItem } from './TraitProfileItem';

interface ResultDashboardProps {
  result: string;
  assertiveScore: AssertiveType;
  dimensionScores: DimensionScores;
}

export const ResultDashboard = ({ result, assertiveScore, dimensionScores }: ResultDashboardProps) => {
  const { t } = useTranslation();

  return (
    <div className="test-result animate-fadeInUp" style={{ padding: '0' }}>
      {/* Header outside the main card */}
      <header className="report-header" style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.8rem', letterSpacing: '0.3em', color: 'var(--text-secondary)', marginBottom: '0.75rem', opacity: 0.8 }}>MBTI® PERSONALITY RESULT</p>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 900, marginBottom: '0.5rem', lineHeight: 1.2 }}>
          YOUR TYPE: <span className="text-gradient">{result}</span> <br />
          <span style={{ fontSize: '0.6em', opacity: 0.9, letterSpacing: '0.1em', display: 'block', marginTop: '0.5rem' }}>
            {t(`results.types.${result}.name`).toUpperCase()}
          </span>
        </h1>
      </header>

      {/* Main Dashboard Container */}
      <div className="premium-glass" style={{ padding: 'clamp(1rem, 5vw, 2rem)', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.06)' }}>
        
        {/* Top Control Bar - Only Title */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem', padding: '0 0.5rem' }}>
          <div style={{ fontSize: 'clamp(0.9rem, 3vw, 1.1rem)', fontWeight: 700, letterSpacing: '0.05em', textAlign: 'center' }}>
            <span style={{ color: 'var(--accent-green-bright)' }}>{result}</span> | {t(`results.trait_names.${result[0]}`)} {t(`results.trait_names.${result[1]}`)} {t(`results.trait_names.${result[2]}`)} {t(`results.trait_names.${result[3]}`)}
          </div>
        </div>

        <div className="report-dashboard-grid">
          
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

          {/* Center Column: Type Hero & Description */}
          <div className="dashboard-column dashboard-column-center" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <article className="dashboard-card glass-panel" style={{ padding: '2.5rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: 'fit-content' }}>
              <div style={{ fontSize: '4.5rem', color: 'var(--accent-green)', marginBottom: '1rem', filter: 'drop-shadow(0 0 20px var(--accent-green-glow))' }}><FiAperture /></div>
              <h2 style={{ fontSize: '5rem', fontWeight: 900, letterSpacing: '0.05em', marginBottom: '0rem', marginTop: '-1rem' }} className="text-gradient">
                {result}
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', fontWeight: 500, letterSpacing: '0.05em' }}>
                {t(`results.types.${result}.name`)} | {t(`results.trait_names.${result[0]}`)} {t(`results.trait_names.${result[1]}`)} {t(`results.trait_names.${result[2]}`)} {t(`results.trait_names.${result[3]}`)}
              </p>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {(t(`results.types.${result}.keywords`, { returnObjects: true }) as any[]).map((k: any) => (
                  <span key={k} className="char-tag" style={{ fontSize: '0.75rem', opacity: 0.8 }}>✦ {k}</span>
                ))}
              </div>
            </article>

            <article className="dashboard-card glass-panel" style={{ padding: '1.75rem', textAlign: 'left', flex: 1 }}>
               <h3 className="dashboard-card-title" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{t(`results.types.${result}.name`)} ({result})</h3>
               <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{t(`results.types.${result}.desc`)}</p>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div>
                    <h4 style={{ fontSize: '0.8rem', color: 'var(--accent-green)', marginBottom: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>STRENGTHS</h4>
                    <ul style={{ fontSize: '0.85rem', color: 'var(--text-primary)', paddingLeft: '0', listStyle: 'none' }}>
                      <li style={{ marginBottom: '0.4rem' }}>• Charming</li>
                      <li style={{ marginBottom: '0.4rem' }}>• Creative</li>
                      <li style={{ marginBottom: '0.4rem' }}>• Perceptive</li>
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.8rem', color: 'var(--accent-purple)', marginBottom: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>WEAKNESSES</h4>
                    <ul style={{ fontSize: '0.85rem', color: 'var(--text-primary)', paddingLeft: '0', listStyle: 'none' }}>
                      <li style={{ marginBottom: '0.4rem' }}>• Unfocused</li>
                      <li style={{ marginBottom: '0.4rem' }}>• Sensitive</li>
                      <li style={{ marginBottom: '0.4rem' }}>• Seeking Approval</li>
                    </ul>
                  </div>
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
                {['Independent', 'Logical', 'Focused', 'Strategic', 'Empathetic', 'Emotional'].map(trait => (
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
      </div>

      <div style={{ marginTop: '3.5rem', display: 'flex', gap: '1.25rem', justifyContent: 'center' }}>
        <button className="btn btn-primary" onClick={() => (window.location.href = '/')} style={{ padding: '1rem 2.5rem', gap: '0.75rem' }}>
          <FiHome /> Back to Home
        </button>
      </div>
    </div>
  );
};
