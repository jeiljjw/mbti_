import { useTranslation } from 'react-i18next';

interface TraitProfileItemProps {
  icon: React.ReactNode;
  traitKey: string;
  scoreValue: number;
}

export const TraitProfileItem = ({ icon, traitKey, scoreValue }: TraitProfileItemProps) => {
  const { t } = useTranslation();
  const isRight = scoreValue < 0;
  // Percentage relative to the dominant side (minimum 50%)
  const percentage = Math.max(51, 50 + (Math.abs(scoreValue) / 10) * 50);
  const traitName = t(`results.trait_names.${traitKey}`);
  
  const barColor = isRight ? 'var(--accent-purple)' : 'var(--accent-green)';
  const glowColor = isRight ? 'var(--accent-purple-glow)' : 'var(--accent-green-glow)';

  return (
    <div className="trait-item" style={{ marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
          <span style={{ color: barColor, fontSize: '1rem' }}>{icon}</span> 
          {traitName}
        </span>
        <span style={{ color: barColor, fontWeight: 700, letterSpacing: '0.05em' }}>{Math.round(percentage)}%</span>
      </div>
      <div className="trait-bar-container" style={{ 
        height: '6px', 
        background: 'rgba(255,255,255,0.03)', 
        borderRadius: '3px',
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div 
          className="trait-bar-fill" 
          style={{ 
            width: `${percentage}%`, 
            height: '100%',
            background: `linear-gradient(90deg, transparent, ${barColor})`,
            borderRadius: '3px',
            boxShadow: `0 0 10px ${glowColor}`,
            transition: 'width 1s ease-out'
          }}
        ></div>
      </div>
    </div>
  );
};
