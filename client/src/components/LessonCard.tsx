import type { Lesson } from '../types';
import { useLearning } from '../context/LearningContext';

interface LessonCardProps {
  lesson: Lesson;
}

export const LessonCard = ({ lesson }: LessonCardProps) => {
  const { selectLesson, progress } = useLearning();
  const isCompleted = progress.completedLessons.includes(lesson.id);

  return (
    <div
      onClick={() => selectLesson(lesson.id)}
      className="border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-secondary hover:-translate-y-1 transition-all relative"
    >
      {isCompleted && (
        <div className="absolute top-4 right-4 w-8 h-8 bg-success text-white rounded-full flex items-center justify-center font-bold">
          ✓
        </div>
      )}

      <h3 className="text-xl font-semibold text-primary mb-2">{lesson.title}</h3>
      <p className="text-gray-600">{lesson.description}</p>
    </div>
  );
};
