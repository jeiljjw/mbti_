import type { DimensionScores } from '../types/mbti';

interface RadarChartProps {
  scores: DimensionScores;
}

export const RadarChart = ({ scores }: RadarChartProps) => {
  const size = 260;
  const center = size / 2;
  const radius = 90;

  // Percentage calculation helper: maps -10..10 score to its absolute strength (0-100%)
  const getDisplayData = (score: number, dimension: keyof DimensionScores) => {
    const absScore = Math.abs(score);
    const percentage = Math.round((absScore / 10) * 100);
    
    const traitLabels: Record<string, { pos: string, neg: string }> = {
      EI: { pos: 'Extraversion', neg: 'Introversion' },
      SN: { pos: 'Sensing', neg: 'Intuition' },
      TF: { pos: 'Thinking', neg: 'Feeling' },
      JP: { pos: 'Judging', neg: 'Prospecting' }
    };

    const isPositive = score >= 0;
    const traitName = isPositive ? traitLabels[dimension].pos : traitLabels[dimension].neg;
    const traitCode = isPositive ? dimension[0] : (dimension === 'EI' ? 'I' : dimension === 'SN' ? 'N' : dimension === 'TF' ? 'F' : 'P');
    
    return { traitName, traitCode, percentage };
  };

  const getPoint = (score: number, angle: number) => {
    // Map -10..10 to 0..1 scale for the radar visualization
    // However, for a true radar where 0 is neutral, we might want 0 at center and 10/-10 at edges.
    // Let's keep the current outward-mapping for simplicity but ensure it's balanced.
    const scale = (score + 10) / 20; 
    const r = radius * scale;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const points = [
    getPoint(scores.EI, -Math.PI / 2),
    getPoint(scores.SN, 0),
    getPoint(scores.TF, Math.PI / 2),
    getPoint(scores.JP, Math.PI),
  ];

  const pointsString = points.map(p => `${p.x},${p.y}`).join(' ');

  const eiData = getDisplayData(scores.EI, 'EI');
  const snData = getDisplayData(scores.SN, 'SN');
  const tfData = getDisplayData(scores.TF, 'TF');
  const jpData = getDisplayData(scores.JP, 'JP');

  return (
    <div className="radar-chart-wrapper" style={{ position: 'relative', width: '100%', maxWidth: size, height: 'auto', aspectRatio: '1/1', margin: '0 auto' }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent-green)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--accent-purple)" stopOpacity="0.6" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Circular Grid Lines */}
        {[0.25, 0.5, 0.75, 1].map((rScale) => (
          <circle
            key={rScale}
            cx={center}
            cy={center}
            r={radius * rScale}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
        ))}

        {/* Axes */}
        <line x1={center} y1={center - radius} x2={center} y2={center + radius} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <line x1={center - radius} y1={center} x2={center + radius} y2={center} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        
        {/* Glow behind the polygon */}
        <polygon points={pointsString} fill="url(#radarGradient)" filter="url(#glow)" opacity="0.3" />
        
        {/* Main Polygon */}
        <polygon 
          points={pointsString} 
          fill="url(#radarGradient)" 
          stroke="var(--accent-green-bright)" 
          strokeWidth="2" 
          style={{ filter: 'drop-shadow(0 0 8px var(--accent-green-glow))' }}
        />
        
        {/* Connection Points */}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill="var(--text-primary)" />
        ))}

        {/* Labels from Mockup */}
        <g className="radar-labels" style={{ fontSize: '10px', fontWeight: 600, fill: 'var(--text-secondary)' }}>
          {/* Top: EI */}
          <text x={center} y={center - radius - 25} textAnchor="middle">
            <tspan x={center} dy="0" fill="var(--text-secondary)">{eiData.traitName}</tspan>
            <tspan x={center} dy="12" fill="var(--accent-green)" fontWeight="800">{eiData.traitCode}: {eiData.percentage}%</tspan>
          </text>
          
          {/* Right: SN */}
          <text x={center + radius + 10} y={center} textAnchor="start" dominantBaseline="middle">
            <tspan x={center + radius + 10} dy="-6">{snData.traitName}</tspan>
            <tspan x={center + radius + 10} dy="12" fill="var(--accent-green)" fontWeight="800">{snData.traitCode}: {snData.percentage}%</tspan>
          </text>
          
          {/* Bottom: TF */}
          <text x={center} y={center + radius + 25} textAnchor="middle">
            <tspan x={center} dy="0" fill="var(--accent-purple)" fontWeight="800">{tfData.traitCode}: {tfData.percentage}%</tspan>
            <tspan x={center} dy="12" fill="var(--text-secondary)">{tfData.traitName}</tspan>
          </text>
          
          {/* Left: JP */}
          <text x={center - radius - 10} y={center} textAnchor="end" dominantBaseline="middle">
            <tspan x={center - radius - 10} dy="-6" fill="var(--accent-purple)" fontWeight="800">{jpData.traitCode}: {jpData.percentage}%</tspan>
            <tspan x={center - radius - 10} dy="12">{jpData.traitName}</tspan>
          </text>
        </g>
      </svg>
    </div>
  );
};
