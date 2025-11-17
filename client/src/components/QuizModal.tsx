import { useEffect } from 'react';
import { useQuiz } from '../hooks/useQuiz';
import { useLearning } from '../context/LearningContext';
import type { Lesson } from '../types';

interface QuizModalProps {
  lesson: Lesson;
  onClose: () => void;
}

export const QuizModal = ({ lesson, onClose }: QuizModalProps) => {
  const { markLessonComplete, lessons, selectLesson } = useLearning();
  const {
    selectedAnswer,
    quizResult,
    submitting,
    selectAnswer,
    submitAnswer,
    reset,
  } = useQuiz();

  useEffect(() => {
    reset();
  }, [lesson.id]);

  if (!lesson.quiz) return null;

  const handleSubmit = async () => {
    try {
      const result = await submitAnswer(lesson.id);
      if (result.correct) {
        await markLessonComplete(lesson.id);
      }
    } catch (error) {
      alert('回答を選択してください');
    }
  };

  const handleNextLesson = () => {
    const currentIndex = lessons.findIndex((l) => l.id === lesson.id);
    if (currentIndex < lessons.length - 1) {
      selectLesson(lessons[currentIndex + 1].id);
      onClose();
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-8 shadow-strong animate-scale-in max-h-[90vh] overflow-y-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="text-4xl">📝</div>
          <div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              理解度チェック
            </h3>
            <p className="text-gray-600 text-sm mt-1">正解するとレッスンが完了します</p>
          </div>
        </div>

        <div className="mb-8">
          <div className="text-xl font-bold text-gray-800 mb-6 p-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl border border-primary-100">
            {lesson.quiz.question}
          </div>

          <div className="space-y-4">
            {lesson.quiz.options.map((option, index) => {
              let optionClasses =
                'relative p-5 border-2 rounded-2xl cursor-pointer transition-all duration-300 ';

              if (quizResult) {
                if (index === quizResult.correctAnswer) {
                  optionClasses += ' border-success-500 bg-gradient-to-br from-success-50 to-success-100 shadow-medium';
                } else if (
                  index === selectedAnswer &&
                  !quizResult.correct
                ) {
                  optionClasses += ' border-warning-500 bg-gradient-to-br from-red-50 to-red-100';
                } else {
                  optionClasses += ' border-gray-200 opacity-50';
                }
              } else {
                optionClasses +=
                  index === selectedAnswer
                    ? ' border-secondary-500 bg-gradient-to-br from-blue-50 to-secondary-50 shadow-soft scale-105'
                    : ' border-gray-200 hover:border-secondary-400 hover:bg-gray-50 hover:shadow-soft hover:scale-105';
              }

              return (
                <div
                  key={index}
                  onClick={() => !quizResult && selectAnswer(index)}
                  className={optionClasses}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      index === selectedAnswer && !quizResult
                        ? 'border-secondary-500 bg-secondary-500'
                        : index === quizResult?.correctAnswer
                        ? 'border-success-500 bg-success-500'
                        : 'border-gray-300'
                    }`}>
                      {index === selectedAnswer && !quizResult && (
                        <div className="w-3 h-3 bg-white rounded-full" />
                      )}
                      {index === quizResult?.correctAnswer && (
                        <span className="text-white text-xs font-bold">✓</span>
                      )}
                    </div>
                    <span className="font-medium text-gray-800">{option}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {quizResult && (
          <div
            className={`p-6 rounded-2xl mb-8 border-l-4 shadow-soft animate-slide-up ${
              quizResult.correct
                ? 'bg-gradient-to-br from-success-50 to-green-50 border-success-500'
                : 'bg-gradient-to-br from-red-50 to-warning-50 border-warning-500'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">
                {quizResult.correct ? '🎉' : '💭'}
              </span>
              <strong className="text-xl">
                {quizResult.correct ? '正解です！素晴らしい！' : 'もう一度確認しましょう'}
              </strong>
            </div>
            <p className="text-gray-700 leading-relaxed pl-12">{quizResult.explanation}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-3 justify-end pt-4 border-t border-gray-200">
          {!quizResult && (
            <button
              onClick={handleSubmit}
              disabled={submitting || selectedAnswer === null}
              className="flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-xl font-bold shadow-medium hover:shadow-glow-primary hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {submitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>送信中...</span>
                </>
              ) : (
                <>
                  <span>回答する</span>
                  <span className="text-xl">→</span>
                </>
              )}
            </button>
          )}

          {quizResult && (
            <button
              onClick={handleNextLesson}
              className="flex items-center gap-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-8 py-4 rounded-xl font-bold shadow-medium hover:shadow-glow-secondary hover:-translate-y-1 transition-all"
            >
              <span>次のレッスンへ</span>
              <span className="text-xl">→</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-200 transition-all"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};
