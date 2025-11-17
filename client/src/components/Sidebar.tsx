import { useLearning } from '../context/LearningContext';

export const Sidebar = () => {
  const { categories, currentCategory, selectCategory } = useLearning();

  return (
    <aside className="w-72 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-soft border border-gray-100 p-6 sticky top-8 h-fit animate-slide-up">
      <div className="mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent mb-2">
          カテゴリー
        </h2>
        <div className="h-1 w-16 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full" />
      </div>

      <div className="space-y-3">
        <button
          onClick={() => selectCategory(null)}
          className={`group w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 ${
            currentCategory === null
              ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-medium scale-105'
              : 'hover:bg-gray-100 hover:scale-105 hover:shadow-soft'
          }`}
        >
          <div className={`text-3xl transition-transform duration-300 ${
            currentCategory === null ? '' : 'group-hover:scale-110'
          }`}>
            📚
          </div>
          <span className="font-semibold">すべて</span>
          {currentCategory === null && (
            <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
          )}
        </button>

        {categories.map((category, index) => (
          <button
            key={category.id}
            onClick={() => selectCategory(category.id)}
            className={`group w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 ${
              currentCategory === category.id
                ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-medium scale-105'
                : 'hover:bg-gray-100 hover:scale-105 hover:shadow-soft'
            }`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className={`text-3xl transition-transform duration-300 ${
              currentCategory === category.id ? '' : 'group-hover:scale-110'
            }`}>
              {category.icon}
            </div>
            <span className="font-semibold">{category.name}</span>
            {currentCategory === category.id && (
              <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
            )}
          </button>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl border border-primary-100">
        <p className="text-sm text-gray-700 leading-relaxed">
          💡 <span className="font-semibold">Tip:</span> カテゴリーを選択して、効率的に学習を進めましょう！
        </p>
      </div>
    </aside>
  );
};
