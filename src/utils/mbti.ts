import type { DimensionScores, QuestionMeta, MBTIResult, AssertiveType } from '../types/mbti';

export const calculateResult = (
  shuffledQuestions: Pick<QuestionMeta, 'dimension' | 'direction'>[],
  finalAnswers: Record<number, number>
): MBTIResult => {
  const scores: DimensionScores = { EI: 0, SN: 0, TF: 0, JP: 0 };

  shuffledQuestions.forEach((q, index) => {
    // NOTE: ?? (not ||) so that neutral 0 answers are preserved correctly.
    const answer = finalAnswers[index] ?? 0;
    scores[q.dimension] += answer * q.direction;
  });

  const type =
    (scores.EI >= 0 ? 'E' : 'I') +
    (scores.SN >= 0 ? 'S' : 'N') +
    (scores.TF >= 0 ? 'T' : 'F') +
    (scores.JP >= 0 ? 'J' : 'P');

  // TODO(Phase 1): replace totalSum heuristic with dedicated A/T items.
  // Kept for backward compat; result UI must not over-claim assertiveness.
  let totalSum = 0;
  shuffledQuestions.forEach((_, index) => {
    totalSum += finalAnswers[index] ?? 0;
  });
  const assertiveness: AssertiveType = totalSum >= 0 ? 'A' : 'T';

  return { type, scores, assertiveness };
};

export const dimensionPercent = (score: number, perDimension: number): number => {
  // score range: [-2*perDimension, +2*perDimension]. Map to 0..100.
  const max = 2 * Math.max(1, perDimension);
  return Math.round(((score + max) / (2 * max)) * 100);
};

export const shuffleArray = <T,>(array: T[]): T[] => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};
