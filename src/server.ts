import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { lessons, categories } from './data/lessons';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// API Routes

// Get all categories
app.get('/api/categories', (req: Request, res: Response) => {
  res.json(categories);
});

// Get all lessons
app.get('/api/lessons', (req: Request, res: Response) => {
  const category = req.query.category as string;

  if (category) {
    const filteredLessons = lessons.filter(lesson => lesson.category === category);
    res.json(filteredLessons);
  } else {
    res.json(lessons);
  }
});

// Get a specific lesson by ID
app.get('/api/lessons/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const lesson = lessons.find(l => l.id === id);

  if (lesson) {
    res.json(lesson);
  } else {
    res.status(404).json({ error: 'Lesson not found' });
  }
});

// Submit quiz answer
app.post('/api/lessons/:id/quiz', (req: Request, res: Response) => {
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

// Track progress (mock implementation - in real app, would use a database)
const userProgress: { [userId: string]: string[] } = {};

app.post('/api/progress', (req: Request, res: Response) => {
  const { userId, lessonId } = req.body;

  if (!userId || !lessonId) {
    return res.status(400).json({ error: 'Missing userId or lessonId' });
  }

  if (!userProgress[userId]) {
    userProgress[userId] = [];
  }

  if (!userProgress[userId].includes(lessonId)) {
    userProgress[userId].push(lessonId);
  }

  res.json({
    success: true,
    completed: userProgress[userId].length,
    total: lessons.length
  });
});

app.get('/api/progress/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;

  res.json({
    completedLessons: userProgress[userId] || [],
    totalLessons: lessons.length,
    progress: Math.round(((userProgress[userId]?.length || 0) / lessons.length) * 100)
  });
});

// Serve index.html for all other routes (SPA)
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Slack Learning App is running on http://localhost:${PORT}`);
  });
}

export default app;
