import { describe, it, expect } from 'vitest';
import { getCompatibility, normalizePair, TOP_MATCHES } from './compatibility';

const TYPES = ['ISTJ','ISFJ','INFJ','INTJ','ISTP','ISFP','INFP','INTP','ESTP','ESFP','ENFP','ENTP','ESTJ','ESFJ','ENFJ','ENTJ'];

describe('compatibility engine', () => {
  it('scores all 136 pairs within range and symmetric', () => {
    for (let i = 0; i < TYPES.length; i++) {
      for (let j = i; j < TYPES.length; j++) {
        const c1 = getCompatibility(TYPES[i], TYPES[j]);
        const c2 = getCompatibility(TYPES[j], TYPES[i]);
        expect(c1.score).toBeGreaterThanOrEqual(38);
        expect(c1.score).toBeLessThanOrEqual(98);
        expect(c1.score).toBe(c2.score);
        expect(c1.pair).toEqual([TYPES[i], TYPES[j]].sort() as [string, string]);
      }
    }
  });

  it('same type is fixed at 85/excellent', () => {
    for (const t of TYPES) {
      const c = getCompatibility(t, t);
      expect(c.score).toBe(85);
      expect(c.tier).toBe('excellent');
    }
  });

  it('golden pairs score in the good band or better', () => {
    for (const [a, b] of [['ENFP', 'INTJ'], ['ENTP', 'INFJ'], ['INFP', 'ENFJ'], ['INTP', 'ENTJ']]) {
      expect(getCompatibility(a, b).score).toBeGreaterThanOrEqual(68);
    }
  });

  it('curated top matches are all in the good band or better', () => {
    for (const [t, ms] of Object.entries(TOP_MATCHES)) {
      for (const m of ms) {
        expect(getCompatibility(t, m).score, `${t}x${m}`).toBeGreaterThanOrEqual(68);
      }
    }
  });

  it('normalizePair is order-independent', () => {
    expect(normalizePair('intj', 'enfp')).toEqual(['ENFP', 'INTJ']);
  });

  it('full matrix snapshot', () => {
    const rows: string[] = [];
    for (let i = 0; i < TYPES.length; i++)
      for (let j = i; j < TYPES.length; j++)
        rows.push(`${TYPES[i]}x${TYPES[j]}=${getCompatibility(TYPES[i], TYPES[j]).score}`);
    expect(rows.join(',')).toMatchSnapshot();
  });
});
