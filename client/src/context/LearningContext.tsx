import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Lesson, Category, ProgressData } from '../types';
import * as api from '../api';

interface LearningContextType {
  categories: Category[];
  lessons: Lesson[];
  currentLesson: Lesson | null;
  currentCategory: string | null;
  progress: ProgressData;
  loading: boolean;
  error: string | null;
  selectCategory: (categoryId: string | null) => void;
  selectLesson: (lessonId: string) => void;
  markLessonComplete: (lessonId: string) => Promise<void>;
  refreshProgress: () => Promise<void>;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};

export const LearningProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [progress, setProgress] = useState<ProgressData>({
    completedLessons: [],
    totalLessons: 0,
    progress: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await api.fetchCategories();
        setCategories(data);
      } catch (err) {
        setError('Failed to load categories');
        console.error(err);
      }
    };

    loadCategories();
  }, []);

  // Load progress on mount
  useEffect(() => {
    refreshProgress();
  }, []);

  // Load lessons when category changes
  useEffect(() => {
    const loadLessons = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.fetchLessons(currentCategory || undefined);
        setLessons(data);
      } catch (err) {
        setError('Failed to load lessons');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (currentCategory !== null) {
      loadLessons();
    }
  }, [currentCategory]);

  const selectCategory = (categoryId: string | null) => {
    setCurrentCategory(categoryId);
    setCurrentLesson(null);
  };

  const selectLesson = async (lessonId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.fetchLesson(lessonId);
      setCurrentLesson(data);
    } catch (err) {
      setError('Failed to load lesson');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const markLessonComplete = async (lessonId: string) => {
    try {
      await api.saveProgress(lessonId);
      await refreshProgress();
    } catch (err) {
      setError('Failed to save progress');
      console.error(err);
    }
  };

  const refreshProgress = async () => {
    try {
      const data = await api.fetchProgress();
      setProgress(data);
    } catch (err) {
      console.error('Failed to load progress:', err);
    }
  };

  const value: LearningContextType = {
    categories,
    lessons,
    currentLesson,
    currentCategory,
    progress,
    loading,
    error,
    selectCategory,
    selectLesson,
    markLessonComplete,
    refreshProgress,
  };

  return <LearningContext.Provider value={value}>{children}</LearningContext.Provider>;
};
