import { Router, Request, Response } from 'express';
import { lessons, categories } from '../data/lessons';

const router = Router();

// Get all categories
router.get('/categories', (req: Request, res: Response) => {
  res.json(categories);
});

// Get all lessons or filter by category
router.get('/lessons', (req: Request, res: Response) => {
  const category = req.query.category as string;

  if (category) {
    const filteredLessons = lessons.filter(lesson => lesson.category === category);
    res.json(filteredLessons);
  } else {
    res.json(lessons);
  }
});

// Get a specific lesson by ID
router.get('/lessons/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const lesson = lessons.find(l => l.id === id);

  if (lesson) {
    res.json(lesson);
  } else {
    res.status(404).json({ error: 'Lesson not found' });
  }
});

// Submit quiz answer
router.post('/lessons/:id/quiz', (req: Request, res: Response) => {
  const { id } = req.params;
  const { answer } = req.body;

  const lesson = lessons.find(l => l.id === id);

  if (!lesson || !lesson.quiz) {
    return res.status(404).json({ error: 'Quiz not found' });
  }

  const isCorrect = lesson.quiz.correctAnswer === answer;

  res.json({
    correct: isCorrect,
    explanation: lesson.quiz.explanation,
    correctAnswer: lesson.quiz.correctAnswer
  });
});

export default router;
