import { useLearning } from '../context/LearningContext';
import { LessonCard } from './LessonCard';

export const LessonsList = () => {
  const { lessons, currentCategory, categories, loading } = useLearning();

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-20 animate-fade-in">
        <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4" />
        <div className="text-xl text-gray-600 animate-pulse">読み込み中...</div>
      </div>
    );
  }

  const categoryName = currentCategory
    ? categories.find((c) => c.id === currentCategory)?.name
    : 'すべてのレッスン';

  const categoryIcon = currentCategory
    ? categories.find((c) => c.id === currentCategory)?.icon
    : '📚';

  return (
    <div className="animate-fade-in">
      <div className="mb-8 animate-slide-down">
        <div className="flex items-center gap-4 mb-3">
          <div className="text-5xl">{categoryIcon}</div>
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              {categoryName}
            </h2>
            <p className="text-gray-600 mt-1">
              {lessons.length} レッスン
            </p>
          </div>
        </div>
        <div className="h-1 w-24 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson, index) => (
          <LessonCard key={lesson.id} lesson={lesson} index={index} />
        ))}
      </div>

      {lessons.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
          <div className="text-6xl mb-4 opacity-50">📚</div>
          <div className="text-xl text-gray-500 mb-2">このカテゴリーにはレッスンがありません</div>
          <p className="text-sm text-gray-400">他のカテゴリーを選択してください</p>
        </div>
      )}
    </div>
  );
};
