export interface Compatibility {
  pair: [string, string];
  score: number;
  tier: 'excellent' | 'good' | 'average' | 'challenging';
  shared: string[];
  complementary: string[];
  summary: string;
}

export const normalizePair = (a: string, b: string): [string, string] => {
  const [x, y] = [a.toUpperCase(), b.toUpperCase()].sort();
  return [x, y];
};

// Curated top partners per type (also used by TypeDetail).
export const TOP_MATCHES: Record<string, string[]> = {
  ISTJ: ['ESFJ', 'ISFJ', 'ESTJ'], ISFJ: ['ESFJ', 'ISTJ', 'ENFJ'], INFJ: ['ENFP', 'ENTP', 'INFJ'],
  INTJ: ['ENFP', 'ENTP', 'INTJ'], ISTP: ['ESFP', 'ISTP', 'ESTP'], ISFP: ['ESFP', 'ISFP', 'ENFP'],
  INFP: ['ENFJ', 'ENFP', 'INFJ'], INTP: ['ENTJ', 'ENTP', 'INTP'], ESTP: ['ISFP', 'ESTP', 'ESFP'],
  ESFP: ['ISFP', 'ESFP', 'ESTP'], ENFP: ['INFJ', 'INTJ', 'ENFP'], ENTP: ['INFJ', 'INTJ', 'ENTP'],
  ESTJ: ['ISFJ', 'ESTJ', 'ISTJ'], ESFJ: ['ISFJ', 'ESFJ', 'ESTJ'], ENFJ: ['INFP', 'ISFJ', 'ENFJ'],
  ENTJ: ['INTP', 'ENTP', 'ENTJ'],
};

export const getCompatibility = (aRaw: string, bRaw: string, lang = 'en'): Compatibility => {
  const [a, b] = normalizePair(aRaw, bRaw);
  if (a === b) {
    const summary = buildSummary(a, b, 85, 'excellent', [a[0], a[1], a[2], a[3]], [], lang);
    return { pair: [a, b], score: 85, tier: 'excellent', shared: [a[0], a[1], a[2], a[3]], complementary: [], summary };
  }
  let shared = 0;
  const sharedDims: string[] = [];
  const complementary: string[] = [];
  for (let i = 0; i < 4; i++) {
    if (a[i] === b[i]) {
      shared++;
      sharedDims.push(a[i]);
    } else {
      complementary.push(`${a[i]}${b[i]}`);
    }
  }
  let score = 52 + shared * 9;
  if (a[1] === b[1]) score += 4; // same N/S: communication
  if (a[2] === b[2]) score += 3; // same T/F: conflict style
  if (shared === 0) score -= 4; // total opposites need work
  // Intuitive-complement bonus: N–N pairs that differ on T/F (the classic
  // "golden pairs" like ENFP×INTJ, INFJ×ENTP) balance vision with wholeness.
  if (a[1] === 'N' && b[1] === 'N' && a[2] !== b[2] && shared <= 2) score += 10;
  score = Math.max(38, Math.min(98, score));

  const tier: Compatibility['tier'] =
    score >= 82 ? 'excellent' : score >= 68 ? 'good' : score >= 55 ? 'average' : 'challenging';

  const summary = buildSummary(a, b, score, tier, sharedDims, complementary, lang);
  return { pair: [a, b], score, tier, shared: sharedDims, complementary, summary };
};

const TIER_WORD: Record<string, Record<Compatibility['tier'], string>> = {
  en: { excellent: 'Excellent match', good: 'Good match', average: 'Average match', challenging: 'Challenging match' },
  ko: { excellent: '최고의 궁합', good: '좋은 궁합', average: '무난한 궁합', challenging: '노력이 필요한 궁합' },
  ja: { excellent: '最高の相性', good: '良い相性', average: 'まずまずの相性', challenging: '努力が必要な相性' },
};

const buildSummary = (
  a: string, b: string, score: number,
  tier: Compatibility['tier'], shared: string[], complementary: string[], lang: string
): string => {
  const L = TIER_WORD[lang] ? lang : 'en';
  const tierWord = TIER_WORD[L][tier];
  const same = a === b;
  if (L === 'ko') {
    return same
      ? `${a} × ${b} ${score}점 — ${tierWord}. 서로를 가장 잘 이해하는 조합이지만, 같은 약점이 겹칠 수 있어 역할 분담이 중요합니다.`
      : `${a} × ${b} ${score}점 — ${tierWord}. 공통점(${shared.join(', ') || '없음'})은 안정감을 주고, 차이점(${complementary.join(', ') || '없음'})은 서로를 성장시킵니다.`;
  }
  if (L === 'ja') {
    return same
      ? `${a} × ${b} ${score}点 — ${tierWord}。最も理解し合える組み合わせですが、同じ弱点が重なるため役割分担が大切です。`
      : `${a} × ${b} ${score}点 — ${tierWord}。共通点（${shared.join(', ') || 'なし'}）が安定感を生み、違い（${complementary.join(', ') || 'なし'}）が互いを成長させます。`;
  }
  return same
    ? `${a} × ${b}: ${score} — ${tierWord}. You understand each other deeply, but shared blind spots mean clear roles matter.`
    : `${a} × ${b}: ${score} — ${tierWord}. Shared traits (${shared.join(', ') || 'none'}) bring stability; differences (${complementary.join(', ') || 'none'}) help you grow.`;
};
