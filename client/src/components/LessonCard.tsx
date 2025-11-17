import type { Lesson } from '../types';
import { useLearning } from '../context/LearningContext';

interface LessonCardProps {
  lesson: Lesson;
  index: number;
}

export const LessonCard = ({ lesson, index }: LessonCardProps) => {
  const { selectLesson, progress } = useLearning();
  const isCompleted = progress.completedLessons.includes(lesson.id);

  return (
    <div
      onClick={() => selectLesson(lesson.id)}
      className="group relative bg-white rounded-2xl p-6 cursor-pointer border-2 border-gray-100 hover:border-transparent hover:shadow-strong hover:-translate-y-2 transition-all duration-300 animate-scale-in overflow-hidden"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 ${
        isCompleted
          ? 'bg-gradient-to-br from-success-50 to-success-100'
          : 'bg-gradient-to-br from-primary-50 to-secondary-50 opacity-0 group-hover:opacity-100'
      } transition-opacity duration-300`} />

      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 opacity-20 rounded-bl-full" />

      <div className="relative">
        {isCompleted && (
          <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-success-500 to-success-600 text-white rounded-full flex items-center justify-center font-bold shadow-medium animate-scale-in">
            ✓
          </div>
        )}

        {lesson.quiz && (
          <div className="inline-flex items-center gap-1 mb-3 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold">
            <span>📝</span>
            <span>クイズあり</span>
          </div>
        )}

        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary-700 transition-colors">
          {lesson.title}
        </h3>
        <p className="text-gray-600 leading-relaxed">{lesson.description}</p>

        {/* Arrow indicator */}
        <div className="mt-4 flex items-center gap-2 text-primary-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
          <span>詳しく見る</span>
          <span className="transform group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </div>
  );
};
