import { useLearning } from '../context/LearningContext';

export const Sidebar = () => {
  const { categories, currentCategory, selectCategory } = useLearning();

  return (
    <aside className="w-64 bg-white rounded-lg shadow-md p-6 sticky top-8 h-fit">
      <h2 className="text-xl font-semibold text-primary mb-4">カテゴリー</h2>

      <div className="space-y-2">
        <button
          onClick={() => selectCategory(null)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
            currentCategory === null
              ? 'bg-primary text-white'
              : 'hover:bg-gray-100'
          }`}
        >
          <span className="text-2xl">📚</span>
          <span>すべて</span>
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => selectCategory(category.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              currentCategory === category.id
                ? 'bg-primary text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            <span className="text-2xl">{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </aside>
  );
};
