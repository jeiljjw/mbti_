// Pop Sticker Lab — per-type color identity + group system.
export type TypeGroup = 'NT' | 'NF' | 'SJ' | 'SP';

export const GROUP_COLORS: Record<TypeGroup, string> = {
  NT: '#a855f7',
  NF: '#34d399',
  SJ: '#38bdf8',
  SP: '#fbbf24',
};

export const GROUP_NAMES: Record<string, Record<TypeGroup, string>> = {
  en: { NT: 'Analysts', NF: 'Diplomats', SJ: 'Sentinels', SP: 'Explorers' },
  ko: { NT: '분석가', NF: '외교관', SJ: '수호자', SP: '탐험가' },
  ja: { NT: '分析家', NF: '外交官', SJ: '番人', SP: '探検家' },
};

interface TypeTheme {
  from: string;
  to: string;
  group: TypeGroup;
}

export const TYPE_THEMES: Record<string, TypeTheme> = {
  INTJ: { from: '#a855f7', to: '#6366f1', group: 'NT' },
  INTP: { from: '#8b5cf6', to: '#22d3ee', group: 'NT' },
  ENTJ: { from: '#c026d3', to: '#7c3aed', group: 'NT' },
  ENTP: { from: '#a855f7', to: '#ec4899', group: 'NT' },
  INFJ: { from: '#34d399', to: '#22d3ee', group: 'NF' },
  INFP: { from: '#4ade80', to: '#a3e635', group: 'NF' },
  ENFJ: { from: '#2dd4bf', to: '#4ade80', group: 'NF' },
  ENFP: { from: '#4ade80', to: '#22d3ee', group: 'NF' },
  ISTJ: { from: '#38bdf8', to: '#6366f1', group: 'SJ' },
  ISFJ: { from: '#38bdf8', to: '#2dd4bf', group: 'SJ' },
  ESTJ: { from: '#60a5fa', to: '#818cf8', group: 'SJ' },
  ESFJ: { from: '#38bdf8', to: '#f472b6', group: 'SJ' },
  ISTP: { from: '#fbbf24', to: '#f97316', group: 'SP' },
  ISFP: { from: '#fbbf24', to: '#ec4899', group: 'SP' },
  ESTP: { from: '#fb923c', to: '#ef4444', group: 'SP' },
  ESFP: { from: '#facc15', to: '#fb7185', group: 'SP' },
};

export const getTypeTheme = (type: string): TypeTheme =>
  TYPE_THEMES[(type || '').toUpperCase()] || { from: '#6ee7b7', to: '#a78bfa', group: 'NF' };

export const gradientFor = (type: string): string => {
  const t = getTypeTheme(type);
  return `linear-gradient(135deg, ${t.from}, ${t.to})`;
};

export const TIER_COLORS: Record<string, string> = {
  excellent: '#4ade80',
  good: '#a3e635',
  average: '#facc15',
  challenging: '#fb923c',
};
