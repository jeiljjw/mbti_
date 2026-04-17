import type { QuestionMeta } from '../types/mbti';

export const INITIAL_QUESTIONS: QuestionMeta[] = [
  { originalIndex: 0, dimension: 'EI', direction: 1 },
  { originalIndex: 1, dimension: 'EI', direction: -1 },
  { originalIndex: 2, dimension: 'EI', direction: 1 },
  { originalIndex: 3, dimension: 'EI', direction: -1 },
  { originalIndex: 4, dimension: 'EI', direction: -1 },
  { originalIndex: 5, dimension: 'SN', direction: 1 },
  { originalIndex: 6, dimension: 'SN', direction: -1 },
  { originalIndex: 7, dimension: 'SN', direction: 1 },
  { originalIndex: 8, dimension: 'SN', direction: -1 },
  { originalIndex: 9, dimension: 'SN', direction: 1 },
  { originalIndex: 10, dimension: 'TF', direction: 1 },
  { originalIndex: 11, dimension: 'TF', direction: 1 },
  { originalIndex: 12, dimension: 'TF', direction: -1 },
  { originalIndex: 13, dimension: 'TF', direction: 1 },
  { originalIndex: 14, dimension: 'TF', direction: -1 },
  { originalIndex: 15, dimension: 'JP', direction: 1 },
  { originalIndex: 16, dimension: 'JP', direction: -1 },
  { originalIndex: 17, dimension: 'JP', direction: 1 },
  { originalIndex: 18, dimension: 'JP', direction: 1 },
  { originalIndex: 19, dimension: 'JP', direction: -1 },
];

export const FUNCTION_STACK: Record<string, string[]> = {
  ISTJ: ['Si', 'Te', 'Fi', 'Ne'], ISFJ: ['Si', 'Fe', 'Ti', 'Ne'],
  INFJ: ['Ni', 'Fe', 'Ti', 'Se'], INTJ: ['Ni', 'Te', 'Fi', 'Se'],
  ISTP: ['Ti', 'Se', 'Ni', 'Fe'], ISFP: ['Fi', 'Se', 'Ni', 'Te'],
  INFP: ['Fi', 'Ne', 'Si', 'Te'], INTP: ['Ti', 'Ne', 'Si', 'Fe'],
  ESTP: ['Se', 'Ti', 'Fe', 'Ni'], ESFP: ['Se', 'Fi', 'Te', 'Ni'],
  ENFP: ['Ne', 'Fi', 'Te', 'Si'], ENTP: ['Ne', 'Ti', 'Fe', 'Si'],
  ESTJ: ['Te', 'Si', 'Fi', 'Ne'], ESFJ: ['Fe', 'Si', 'Ne', 'Ti'],
  ENFJ: ['Fe', 'Ni', 'Se', 'Ti'], ENTJ: ['Te', 'Ni', 'Se', 'Fi'],
};
