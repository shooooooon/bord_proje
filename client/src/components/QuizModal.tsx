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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-8">
        <h3 className="text-2xl font-bold text-primary mb-6">理解度チェック</h3>

        <div className="mb-6">
          <div className="text-lg font-semibold mb-4">{lesson.quiz.question}</div>

          <div className="space-y-3">
            {lesson.quiz.options.map((option, index) => {
              let optionClasses =
                'p-4 border-2 rounded-lg cursor-pointer transition-all';

              if (quizResult) {
                if (index === quizResult.correctAnswer) {
                  optionClasses += ' border-success bg-green-50';
                } else if (
                  index === selectedAnswer &&
                  !quizResult.correct
                ) {
                  optionClasses += ' border-warning bg-red-50';
                } else {
                  optionClasses += ' border-gray-200';
                }
              } else {
                optionClasses +=
                  index === selectedAnswer
                    ? ' border-secondary bg-blue-50'
                    : ' border-gray-200 hover:border-secondary hover:bg-gray-50';
              }

              return (
                <div
                  key={index}
                  onClick={() => !quizResult && selectAnswer(index)}
                  className={optionClasses}
                >
                  {option}
                </div>
              );
            })}
          </div>
        </div>

        {quizResult && (
          <div
            className={`p-4 rounded-lg mb-6 border-l-4 ${
              quizResult.correct
                ? 'bg-green-50 border-success'
                : 'bg-red-50 border-warning'
            }`}
          >
            <strong>
              {quizResult.correct ? '✓ 正解です！' : '✗ 不正解です'}
            </strong>
            <div className="mt-2 text-gray-700">{quizResult.explanation}</div>
          </div>
        )}

        <div className="flex gap-4 justify-end">
          {!quizResult && (
            <button
              onClick={handleSubmit}
              disabled={submitting || selectedAnswer === null}
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? '送信中...' : '回答する'}
            </button>
          )}

          {quizResult && (
            <button
              onClick={handleNextLesson}
              className="bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-all"
            >
              次のレッスンへ
            </button>
          )}

          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};
