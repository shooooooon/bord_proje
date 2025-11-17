import { useState } from 'react';
import type { QuizResult } from '../types';
import * as api from '../api';

export const useQuiz = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const selectAnswer = (index: number) => {
    setSelectedAnswer(index);
  };

  const submitAnswer = async (lessonId: string) => {
    if (selectedAnswer === null) {
      throw new Error('No answer selected');
    }

    setSubmitting(true);
    try {
      const result = await api.submitQuizAnswer(lessonId, selectedAnswer);
      setQuizResult(result);
      return result;
    } catch (err) {
      console.error('Failed to submit quiz:', err);
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setSelectedAnswer(null);
    setQuizResult(null);
  };

  return {
    selectedAnswer,
    quizResult,
    submitting,
    selectAnswer,
    submitAnswer,
    reset,
  };
};
