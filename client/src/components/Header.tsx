import { useLearning } from '../context/LearningContext';

export const Header = () => {
  const { progress } = useLearning();

  return (
    <header className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 shadow-strong mb-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse-soft" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto p-8">
        <div className="flex items-center gap-3 mb-3 animate-slide-down">
          <div className="text-5xl animate-bounce-soft">📚</div>
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight">
              Slack学習アプリ
            </h1>
            <p className="text-primary-100 text-lg mt-1">
              インタラクティブにSlackの使い方を学ぼう
            </p>
          </div>
        </div>

        <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 shadow-medium animate-fade-in">
          <div className="flex justify-between items-center mb-3">
            <span className="text-white font-semibold text-sm tracking-wide">学習進捗</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">{progress.progress}%</span>
              {progress.progress === 100 && (
                <span className="text-2xl animate-bounce-soft">🎉</span>
              )}
            </div>
          </div>
          <div className="relative w-full h-3 bg-white/20 rounded-full overflow-hidden shadow-inner">
            <div
              className="absolute inset-0 bg-gradient-to-r from-secondary-400 via-success-400 to-success-500 transition-all duration-700 ease-out shadow-glow-success"
              style={{ width: `${progress.progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-shimmer animate-pulse-soft" />
            </div>
            {progress.progress > 0 && (
              <div
                className="absolute top-0 h-full w-1 bg-white/50 rounded-full blur-sm transition-all duration-700"
                style={{ left: `${progress.progress}%` }}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
