import type { DimensionScores, QuestionMeta, MBTIResult, AssertiveType } from '../types/mbti';

export const calculateResult = (
  shuffledQuestions: QuestionMeta[],
  finalAnswers: Record<number, number>
): MBTIResult => {
  const scores: DimensionScores = { EI: 0, SN: 0, TF: 0, JP: 0 };
  let totalSum = 0;

  shuffledQuestions.forEach((q, index) => {
    const answer = finalAnswers[index] || 0;
    scores[q.dimension] += answer * q.direction;
    totalSum += answer;
  });

  const type =
    (scores.EI >= 0 ? 'E' : 'I') +
    (scores.SN >= 0 ? 'S' : 'N') +
    (scores.TF >= 0 ? 'T' : 'F') +
    (scores.JP >= 0 ? 'J' : 'P');

  const assertiveness: AssertiveType = totalSum >= 0 ? 'A' : 'T';

  return { type, scores, assertiveness };
};

export const shuffleArray = <T,>(array: T[]): T[] => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};
