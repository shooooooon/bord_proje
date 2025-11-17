import { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { QuizModal } from './QuizModal';
import type { LessonContent } from '../types';

export const LessonDetail = () => {
  const { currentLesson, selectCategory, progress, markLessonComplete } = useLearning();
  const [showQuiz, setShowQuiz] = useState(false);

  if (!currentLesson) return null;

  const isCompleted = progress.completedLessons.includes(currentLesson.id);

  const renderContent = (item: LessonContent) => {
    const baseClasses = 'mb-6 p-4 rounded-lg';

    switch (item.type) {
      case 'text':
        return (
          <div key={item.content} className={`${baseClasses} bg-gray-50`}>
            {item.content}
          </div>
        );
      case 'code':
        return (
          <div
            key={item.content}
            className={`${baseClasses} bg-gray-100 border-l-4 border-secondary font-mono whitespace-pre-wrap text-sm`}
          >
            {item.content}
          </div>
        );
      case 'tip':
        return (
          <div
            key={item.content}
            className={`${baseClasses} bg-yellow-50 border-l-4 border-warning`}
          >
            <span className="font-bold">💡 </span>
            {item.content}
          </div>
        );
      case 'image':
        return item.imageUrl ? (
          <div key={item.content} className={baseClasses}>
            <img
              src={item.imageUrl}
              alt="Lesson"
              className="max-w-full rounded-lg"
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
    <div className="max-w-4xl">
      <button
        onClick={() => selectCategory(null)}
        className="text-secondary mb-6 hover:underline"
      >
        ← レッスン一覧に戻る
      </button>

      <div className="mb-8">
        <h2 className="text-4xl font-bold text-primary mb-2">
          {currentLesson.title}
        </h2>
        <p className="text-xl text-gray-600">{currentLesson.description}</p>
      </div>

      <div className="mb-8">
        {currentLesson.content.map((item, index) => (
          <div key={index}>{renderContent(item)}</div>
        ))}
      </div>

      <div className="flex gap-4">
        {currentLesson.quiz && (
          <button
            onClick={() => setShowQuiz(true)}
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-800 transition-all"
          >
            理解度チェック
          </button>
        )}

        {!isCompleted && (
          <button
            onClick={handleComplete}
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
          >
            完了にする
          </button>
        )}

        {isCompleted && (
          <span className="text-success font-bold flex items-center gap-2 px-6 py-3">
            ✓ 完了済み
          </span>
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
