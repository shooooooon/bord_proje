import { useLearning } from '../context/LearningContext';

export const Header = () => {
  const { progress } = useLearning();

  return (
    <header className="bg-white shadow-md p-6 mb-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-2">📚 Slack学習アプリ</h1>
        <p className="text-gray-600 mb-6">インタラクティブにSlackの使い方を学ぼう</p>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>学習進捗</span>
            <span className="font-semibold">{progress.progress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-secondary to-success transition-all duration-500"
              style={{ width: `${progress.progress}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
