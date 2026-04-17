export interface DimensionScores {
  EI: number;
  SN: number;
  TF: number;
  JP: number;
}

export interface QuestionMeta {
  originalIndex: number;
  dimension: keyof DimensionScores;
  direction: number;
}

export type AssertiveType = 'A' | 'T';

export interface MBTIResult {
  type: string;
  scores: DimensionScores;
  assertiveness: AssertiveType;
}
