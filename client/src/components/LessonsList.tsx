import { useLearning } from '../context/LearningContext';
import { LessonCard } from './LessonCard';

export const LessonsList = () => {
  const { lessons, currentCategory, categories, loading } = useLearning();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-xl text-gray-600">読み込み中...</div>
      </div>
    );
  }

  const categoryName = currentCategory
    ? categories.find((c) => c.id === currentCategory)?.name
    : 'すべてのレッスン';

  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-6">{categoryName}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>

      {lessons.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          このカテゴリーにはレッスンがありません
        </div>
      )}
    </div>
  );
};
