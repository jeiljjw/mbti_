import { describe, it, expect } from 'vitest';
import { getCompatibility } from './compatibility';
// @ts-expect-error untyped shared script (single source of truth, see scripts/score.mjs)
import { scoreOf } from '../../scripts/score.mjs';

const TYPES = ['ISTJ','ISFJ','INFJ','INTJ','ISTP','ISFP','INFP','INTP','ESTP','ESFP','ENFP','ENTP','ESTJ','ESFJ','ENFJ','ENTJ'];

describe('score parity (TS engine vs prerender script)', () => {
  it('matches on all 136 pairs', () => {
    for (let i = 0; i < TYPES.length; i++) {
      for (let j = i; j < TYPES.length; j++) {
        expect(scoreOf(TYPES[i], TYPES[j]), `${TYPES[i]}x${TYPES[j]}`).toBe(
          getCompatibility(TYPES[i], TYPES[j]).score
        );
      }
    }
  });
});
