import type { Lesson, Category, QuizResult, ProgressData } from '../types';

const API_BASE = '/api';

// Generate a unique user ID for tracking progress
export const getUserId = (): string => {
  let userId = localStorage.getItem('slack-learning-user-id');
  if (!userId) {
    userId = 'user-' + Math.random().toString(36).substring(2, 11);
    localStorage.setItem('slack-learning-user-id', userId);
  }
  return userId;
};

// Fetch all categories
export const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_BASE}/categories`);
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
};

// Fetch lessons (optionally filtered by category)
export const fetchLessons = async (categoryId?: string): Promise<Lesson[]> => {
  const url = categoryId
    ? `${API_BASE}/lessons?category=${categoryId}`
    : `${API_BASE}/lessons`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch lessons');
  return response.json();
};

// Fetch a specific lesson by ID
export const fetchLesson = async (lessonId: string): Promise<Lesson> => {
  const response = await fetch(`${API_BASE}/lessons/${lessonId}`);
  if (!response.ok) throw new Error('Failed to fetch lesson');
  return response.json();
};

// Submit quiz answer
export const submitQuizAnswer = async (
  lessonId: string,
  answer: number
): Promise<QuizResult> => {
  const response = await fetch(`${API_BASE}/lessons/${lessonId}/quiz`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ answer }),
  });
  if (!response.ok) throw new Error('Failed to submit quiz answer');
  return response.json();
};

// Save user progress
export const saveProgress = async (lessonId: string): Promise<void> => {
  const userId = getUserId();
  const response = await fetch(`${API_BASE}/progress`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, lessonId }),
  });
  if (!response.ok) throw new Error('Failed to save progress');
};

// Fetch user progress
export const fetchProgress = async (): Promise<ProgressData> => {
  const userId = getUserId();
  const response = await fetch(`${API_BASE}/progress/${userId}`);
  if (!response.ok) throw new Error('Failed to fetch progress');
  return response.json();
};
