import { useState, useEffect, useCallback } from 'react';
import type { DimensionScores, QuestionMeta, AssertiveType } from '../types/mbti';
import { INITIAL_QUESTIONS } from '../constants/mbti';
import { shuffleArray, calculateResult as calcResult } from '../utils/mbti';

export const useMBTITest = () => {
  const [currentIndex, setCurrentIndex] = useState(-1); // -1: Intro, 0-19: Questions, 20: Result
  const [shuffledQuestions, setShuffledQuestions] = useState<QuestionMeta[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<string | null>(null);
  const [assertiveScore, setAssertiveScore] = useState<AssertiveType>('A');
  const [dimensionScores, setDimensionScores] = useState<DimensionScores | null>(null);
  const [showSpinner, setShowSpinner] = useState(false);

  // Initialize shuffled questions on mount
  useEffect(() => {
    setShuffledQuestions(shuffleArray(INITIAL_QUESTIONS));
  }, []);

  const handleStart = useCallback(() => {
    window.scrollTo(0, 0);
    setAnswers({});
    setShuffledQuestions(shuffleArray(INITIAL_QUESTIONS));
    setCurrentIndex(0);
  }, []);

  const handleAnswer = useCallback((score: number) => {
    const nextIndex = currentIndex + 1;
    const updatedAnswers = { ...answers, [currentIndex]: score };
    setAnswers(updatedAnswers);
    
    // If it's the last question, show loading then results
    if (currentIndex === 19) {
      setShowSpinner(true);
      setTimeout(() => {
        const { type, scores, assertiveness } = calcResult(shuffledQuestions, updatedAnswers);
        setResult(type);
        setDimensionScores(scores);
        setAssertiveScore(assertiveness);
        setCurrentIndex(20);
        
        // Hide spinner after a delay to show off calculations
        setTimeout(() => {
          setShowSpinner(false);
        }, 2200);
      }, 400);
    } else {
      // Small delay for better UX
      setTimeout(() => {
        setCurrentIndex(nextIndex);
      }, 300);
    }
  }, [currentIndex, shuffledQuestions, answers]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  }, [currentIndex]);



  const progress = currentIndex >= 0 && currentIndex < 20 
    ? ((currentIndex + 1) / 20) * 100 
    : currentIndex === 20 ? 100 : 0;

  return {
    currentIndex,
    shuffledQuestions,
    answers,
    result,
    assertiveScore,
    dimensionScores,
    showSpinner,
    progress,
    handleStart,
    handleAnswer,
    handlePrevious,
  };
};
