import type { DimensionScores } from '../types/mbti';
import { shuffleArray } from '../utils/mbti';
import enBank from './questions.en.json';
import koBank from './questions.ko.json';
import jaBank from './questions.ja.json';

export interface BankQuestion {
  id: string;
  dimension: keyof DimensionScores;
  direction: 1 | -1;
  text: string;
}

export type TestMode = 'lite' | 'standard' | 'deep';
export const MODE_COUNTS: Record<TestMode, number> = { lite: 12, standard: 24, deep: 48 };
export const MODE_MINUTES: Record<TestMode, number> = { lite: 2, standard: 5, deep: 10 };

const BANKS: Record<string, BankQuestion[]> = {
  en: enBank as BankQuestion[],
  ko: koBank as BankQuestion[],
  ja: jaBank as BankQuestion[],
};

export const getBank = (lang: string): BankQuestion[] =>
  BANKS[lang] || BANKS.en;

/** Balanced subset: equal questions per dimension, ±directions interleaved. */
export const getQuestionsForMode = (lang: string, mode: TestMode): BankQuestion[] => {
  const bank = getBank(lang);
  const perDim = MODE_COUNTS[mode] / 4;
  const dims: (keyof DimensionScores)[] = ['EI', 'SN', 'TF', 'JP'];
  const picked: BankQuestion[] = [];
  dims.forEach((dim, di) => {
    const pos = shuffleArray(bank.filter((q) => q.dimension === dim && q.direction === 1));
    const neg = shuffleArray(bank.filter((q) => q.dimension === dim && q.direction === -1));
    const half = Math.floor(perDim / 2);
    // Alternate which side gets the odd slot so lite (3/dim) stays balanced overall.
    const takePos = perDim % 2 === 0 ? half : di % 2 === 0 ? half + 1 : half;
    picked.push(...pos.slice(0, takePos), ...neg.slice(0, perDim - takePos));
  });
  return shuffleArray(picked);
};
