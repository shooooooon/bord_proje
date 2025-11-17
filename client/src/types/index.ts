export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: string;
  content: LessonContent[];
  quiz?: Quiz;
}

export interface LessonContent {
  type: 'text' | 'image' | 'code' | 'tip';
  content: string;
  imageUrl?: string;
}

export interface Quiz {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface QuizResult {
  correct: boolean;
  explanation: string;
  correctAnswer: number;
}

export interface ProgressData {
  completedLessons: string[];
  totalLessons: number;
  progress: number;
}
