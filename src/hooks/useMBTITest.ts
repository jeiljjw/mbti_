import { useState, useEffect, useCallback, useRef } from 'react';
import type { DimensionScores, AssertiveType } from '../types/mbti';
import { getQuestionsForMode, MODE_COUNTS, type BankQuestion, type TestMode } from '../data/questions';
import { calculateResult as calcResult } from '../utils/mbti';
import { trackEvent } from '../utils/analytics';

const STORAGE_KEY = 'simplembti-test-progress-v2';
const STORAGE_VERSION = 2;

interface SavedProgress {
  v: number;
  lang: string;
  mode: TestMode;
  questions: BankQuestion[];
  answers: Record<number, number>;
  index: number;
}

export const useMBTITest = (lang: string) => {
  // -2: mode select, -1: intro, 0..n-1: questions, n: result
  const [currentIndex, setCurrentIndex] = useState(-2);
  const [mode, setMode] = useState<TestMode | null>(null);
  const [questions, setQuestions] = useState<BankQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<string | null>(null);
  const [assertiveScore, setAssertiveScore] = useState<AssertiveType>('A');
  const [dimensionScores, setDimensionScores] = useState<DimensionScores | null>(null);
  const [showSpinner, setShowSpinner] = useState(false);
  // Guards double-advance from rapid clicks / held-down keys during transition.
  const transitioning = useRef(false);

  const total = questions.length || MODE_COUNTS.standard;

  // Restore in-progress session (same lang only)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as SavedProgress;
        if (saved.v === STORAGE_VERSION && saved.lang === lang && Array.isArray(saved.questions) && saved.questions.length > 0) {
          setMode(saved.mode);
          setQuestions(saved.questions);
          setAnswers(saved.answers || {});
          setCurrentIndex(typeof saved.index === 'number' ? saved.index : -2);
          return;
        }
      }
    } catch {
      // ignore corrupt storage
    }
    setCurrentIndex(-2);
  }, [lang]);

  // Persist in-progress answers
  useEffect(() => {
    try {
      if (mode && currentIndex >= 0 && currentIndex < total && questions.length > 0) {
        const payload: SavedProgress = { v: STORAGE_VERSION, lang, mode, questions, answers, index: currentIndex };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      }
    } catch {
      // non-fatal
    }
  }, [currentIndex, questions, answers, mode, lang, total]);

  const clearStorage = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const handleSelectMode = useCallback((m: TestMode) => {
    clearStorage();
    transitioning.current = false;
    setMode(m);
    setAnswers({});
    setResult(null);
    setDimensionScores(null);
    setQuestions(getQuestionsForMode(lang, m));
    setCurrentIndex(-1);
    window.scrollTo(0, 0);
  }, [lang]);

  const handleStart = useCallback(() => {
    window.scrollTo(0, 0);
    trackEvent('test_start', { mode: mode || 'unknown', lang });
    clearStorage();
    transitioning.current = false;
    setAnswers({});
    if (mode) setQuestions(getQuestionsForMode(lang, mode));
    setCurrentIndex(0);
  }, [lang, mode]);

  const handleAnswer = useCallback((score: number) => {
    if (currentIndex < 0 || currentIndex >= total) return;
    if (transitioning.current) return;
    transitioning.current = true;
    const nextIndex = currentIndex + 1;
    const updatedAnswers = { ...answers, [currentIndex]: score };
    setAnswers(updatedAnswers);

    if (currentIndex === total - 1) {
      setShowSpinner(true);
      setTimeout(() => {
        const { type, scores, assertiveness } = calcResult(questions, updatedAnswers);
        setResult(type);
        setDimensionScores(scores);
        setAssertiveScore(assertiveness);
        setCurrentIndex(total);
        clearStorage();
        trackEvent('test_complete', { result_type: type, mode: mode || 'unknown', lang });
        setTimeout(() => setShowSpinner(false), 1200);
        transitioning.current = false;
      }, 350);
    } else {
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        transitioning.current = false;
      }, 220);
    }
  }, [currentIndex, questions, answers, total, mode, lang]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
    else if (currentIndex === 0) setCurrentIndex(-1);
  }, [currentIndex]);

  const handleBackToModes = useCallback(() => {
    clearStorage();
    setMode(null);
    setQuestions([]);
    setAnswers({});
    setResult(null);
    setCurrentIndex(-2);
  }, []);

  const progress = currentIndex >= 0 && currentIndex < total
    ? ((currentIndex + 1) / total) * 100
    : currentIndex === total ? 100 : 0;

  return {
    currentIndex,
    total,
    mode,
    questions,
    answers,
    result,
    assertiveScore,
    dimensionScores,
    showSpinner,
    progress,
    handleSelectMode,
    handleStart,
    handleAnswer,
    handlePrevious,
    handleBackToModes,
  };
};
