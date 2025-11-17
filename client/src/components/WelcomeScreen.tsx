import { useLearning } from '../context/LearningContext';

export const WelcomeScreen = () => {
  const { selectCategory } = useLearning();

  return (
    <div className="text-center py-12 px-6">
      <h2 className="text-4xl font-bold text-primary mb-4">
        Slack学習アプリへようこそ！
      </h2>
      <p className="text-xl text-gray-600 mb-12">
        このアプリでは、Slackの基本的な使い方から応用機能まで、インタラクティブに学習できます。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="border-2 border-gray-200 rounded-lg p-8 hover:border-primary hover:-translate-y-1 transition-all">
          <span className="text-6xl block mb-4">📖</span>
          <h3 className="text-xl font-semibold text-primary mb-2">
            ステップバイステップ
          </h3>
          <p className="text-gray-600">段階的に学習できる構成</p>
        </div>

        <div className="border-2 border-gray-200 rounded-lg p-8 hover:border-primary hover:-translate-y-1 transition-all">
          <span className="text-6xl block mb-4">✅</span>
          <h3 className="text-xl font-semibold text-primary mb-2">
            クイズで理解度チェック
          </h3>
          <p className="text-gray-600">各レッスン後にクイズで確認</p>
        </div>

        <div className="border-2 border-gray-200 rounded-lg p-8 hover:border-primary hover:-translate-y-1 transition-all">
          <span className="text-6xl block mb-4">🎯</span>
          <h3 className="text-xl font-semibold text-primary mb-2">進捗管理</h3>
          <p className="text-gray-600">学習の進み具合を可視化</p>
        </div>
      </div>

      <button
        onClick={() => selectCategory(null)}
        className="bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-800 hover:-translate-y-1 transition-all shadow-lg"
      >
        学習を始める
      </button>
    </div>
  );
};
