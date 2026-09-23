import { describe, it, expect } from 'vitest';
import { getMatchContent } from './matchContent';
import { getCompatibility } from './compatibility';

const TYPES = ['ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP', 'ESTP', 'ESFP', 'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'];
const LANGS = ['en', 'ko', 'ja'];

const words = (s: string): Set<string> =>
  new Set(s.toLowerCase().split(/[^a-z0-9\uac00-\ud7af\u3040-\u30ff]+/).filter((w) => w.length > 1));

const jaccard = (a: Set<string>, b: Set<string>): number => {
  let inter = 0;
  for (const w of a) if (b.has(w)) inter++;
  return inter / (a.size + b.size - inter || 1);
};

const fullText = (a: string, b: string, lang: string): string => {
  const c = getCompatibility(a, b, lang);
  const m = getMatchContent(a, b, lang, c.score, c.tier);
  return [
    ...m.axes.flatMap((x) => [x.title, x.body, x.tip]),
    ...m.strengths, ...m.watchouts, ...m.datingTips,
    m.narrative, m.scoreBreakdown, m.verdictLong,
    ...m.faqs.flatMap((f) => [f.q, f.a]),
  ].join('\n');
};

describe('match uniqueness (full rendered text)', () => {
  it('mean pairwise Jaccard stays below 0.70 in all langs', () => {
    for (const lang of LANGS) {
      const docs: Set<string>[] = [];
      for (let i = 0; i < TYPES.length; i++)
        for (let j = i; j < TYPES.length; j++)
          docs.push(words(fullText(TYPES[i], TYPES[j], lang)));
      let sum = 0;
      let n = 0;
      let over = 0;
      for (let i = 0; i < docs.length; i++) {
        for (let j = i + 1; j < docs.length; j++) {
          const s = jaccard(docs[i], docs[j]);
          sum += s;
          n++;
          if (s > 0.9) over++;
        }
      }
      const mean = sum / n;
      console.log(`${lang}: full-text mean Jaccard=${mean.toFixed(3)} pairs>0.9=${over}/${n}`);
      expect(mean, `${lang} mean similarity`).toBeLessThan(0.7);
      // Cognate pairs (same shape, neighboring letters) stay similar by nature;
      // gate only guards against systemic templating (>10% near-dups).
      expect(over / n, `${lang} near-dup fraction`).toBeLessThan(0.1);
    }
  });
});
