import { useLearning } from '../context/LearningContext';

export const WelcomeScreen = () => {
  const { selectCategory } = useLearning();

  const features = [
    {
      icon: '📖',
      title: 'ステップバイステップ',
      description: '段階的に学習できる構成',
      gradient: 'from-blue-400 to-blue-600',
    },
    {
      icon: '✅',
      title: 'クイズで理解度チェック',
      description: '各レッスン後にクイズで確認',
      gradient: 'from-green-400 to-green-600',
    },
    {
      icon: '🎯',
      title: '進捗管理',
      description: '学習の進み具合を可視化',
      gradient: 'from-purple-400 to-purple-600',
    },
  ];

  return (
    <div className="text-center py-12 px-6 animate-fade-in">
      <div className="mb-12 animate-slide-down">
        <div className="inline-block mb-6">
          <div className="text-7xl animate-bounce-soft">🎓</div>
        </div>
        <h2 className="text-5xl font-bold bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 bg-clip-text text-transparent mb-4">
          Slack学習アプリへようこそ！
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          このアプリでは、Slackの基本的な使い方から応用機能まで、
          <span className="font-semibold text-primary-600">インタラクティブ</span>
          に学習できます。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-2xl p-8 shadow-soft border-2 border-gray-100 hover:border-transparent hover:shadow-strong hover:-translate-y-2 transition-all duration-300 animate-scale-in overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Background gradient on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

            <div className="relative">
              <div className="text-7xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>

            {/* Decorative corner */}
            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-bl-full`} />
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-6">
        <button
          onClick={() => selectCategory(null)}
          className="group relative bg-gradient-to-r from-primary-600 to-primary-700 text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-strong hover:shadow-glow-primary hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000" />

          <span className="relative flex items-center gap-3">
            学習を始める
            <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
          </span>
        </button>

        <p className="text-sm text-gray-500 flex items-center gap-2">
          <span className="animate-pulse">✨</span>
          まずはカテゴリーを選んで学習を開始しましょう
          <span className="animate-pulse">✨</span>
        </p>
      </div>
    </div>
  );
};
