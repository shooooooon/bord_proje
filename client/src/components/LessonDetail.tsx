import { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { QuizModal } from './QuizModal';
import type { LessonContent } from '../types';

export const LessonDetail = () => {
  const { currentLesson, selectCategory, progress, markLessonComplete } = useLearning();
  const [showQuiz, setShowQuiz] = useState(false);

  if (!currentLesson) return null;

  const isCompleted = progress.completedLessons.includes(currentLesson.id);

  const renderContent = (item: LessonContent, index: number) => {
    switch (item.type) {
      case 'text':
        return (
          <div
            key={index}
            className="mb-6 p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 shadow-soft animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <p className="text-gray-700 leading-relaxed">{item.content}</p>
          </div>
        );
      case 'code':
        return (
          <div
            key={index}
            className="mb-6 p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border-l-4 border-secondary-400 shadow-medium animate-slide-up overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="text-gray-400 text-xs ml-2">コード</span>
            </div>
            <pre className="font-mono text-sm text-gray-100 whitespace-pre-wrap leading-relaxed">
              {item.content}
            </pre>
          </div>
        );
      case 'tip':
        return (
          <div
            key={index}
            className="mb-6 p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 border-l-4 border-amber-400 shadow-soft animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">💡</span>
              <div>
                <p className="font-semibold text-amber-900 mb-2">ヒント</p>
                <p className="text-gray-700 leading-relaxed">{item.content}</p>
              </div>
            </div>
          </div>
        );
      case 'image':
        return item.imageUrl ? (
          <div
            key={index}
            className="mb-6 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <img
              src={item.imageUrl}
              alt="Lesson"
              className="max-w-full rounded-2xl shadow-medium border border-gray-200"
            />
          </div>
        ) : null;
      default:
        return null;
    }
  };

  const handleComplete = async () => {
    await markLessonComplete(currentLesson.id);
  };

  return (
    <div className="max-w-4xl animate-fade-in">
      <button
        onClick={() => selectCategory(null)}
        className="flex items-center gap-2 text-secondary-600 mb-8 hover:text-secondary-700 font-semibold transition-colors group"
      >
        <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
        レッスン一覧に戻る
      </button>

      <div className="mb-10 animate-slide-down">
        {isCompleted && (
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-success-500 to-success-600 text-white rounded-full shadow-medium animate-scale-in">
            <span className="text-xl">✓</span>
            <span className="font-semibold">完了済み</span>
          </div>
        )}
        <h2 className="text-5xl font-bold bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 bg-clip-text text-transparent mb-4">
          {currentLesson.title}
        </h2>
        <p className="text-xl text-gray-600 leading-relaxed">{currentLesson.description}</p>
      </div>

      <div className="mb-10">
        {currentLesson.content.map((item, index) => renderContent(item, index))}
      </div>

      <div className="flex flex-wrap gap-4 p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 shadow-soft">
        {currentLesson.quiz && (
          <button
            onClick={() => setShowQuiz(true)}
            className="flex items-center gap-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-xl font-bold shadow-medium hover:shadow-glow-primary hover:-translate-y-1 transition-all"
          >
            <span className="text-2xl">📝</span>
            <span>理解度チェック</span>
          </button>
        )}

        {!isCompleted && (
          <button
            onClick={handleComplete}
            className="flex items-center gap-3 bg-white text-gray-700 border-2 border-gray-300 px-8 py-4 rounded-xl font-bold hover:border-success-500 hover:text-success-600 hover:shadow-soft hover:-translate-y-1 transition-all"
          >
            <span className="text-2xl">✓</span>
            <span>完了にする</span>
          </button>
        )}

        {isCompleted && !currentLesson.quiz && (
          <div className="flex items-center gap-3 text-success-600 font-bold px-8 py-4">
            <span className="text-3xl">🎉</span>
            <span>このレッスンは完了しました！</span>
          </div>
        )}
      </div>

      {showQuiz && currentLesson.quiz && (
        <QuizModal
          lesson={currentLesson}
          onClose={() => setShowQuiz(false)}
        />
      )}
    </div>
  );
};
