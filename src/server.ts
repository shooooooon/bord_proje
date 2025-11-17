import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import { lessons, categories } from './data/lessons';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Error handling for malformed JSON
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({
      error: 'リクエストの形式が正しくありません',
      details: '有効なJSON形式でリクエストしてください',
      code: 'INVALID_JSON'
    });
  }
  next(err);
});

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
    res.status(404).json({
      error: 'レッスンが見つかりません',
      details: `ID「${id}」に対応するレッスンが存在しません`,
      code: 'LESSON_NOT_FOUND'
    });
  }
});

// Submit quiz answer
app.post('/api/lessons/:id/quiz', (req: Request, res: Response) => {
  const { id } = req.params;
  const { answer } = req.body;

  const lesson = lessons.find(l => l.id === id);

  if (!lesson) {
    return res.status(404).json({
      error: 'レッスンが見つかりません',
      details: `ID「${id}」に対応するレッスンが存在しません`,
      code: 'LESSON_NOT_FOUND'
    });
  }

  if (!lesson.quiz) {
    return res.status(404).json({
      error: 'クイズが見つかりません',
      details: 'このレッスンにはクイズがありません',
      code: 'QUIZ_NOT_FOUND'
    });
  }

  if (answer === undefined || answer === null) {
    return res.status(400).json({
      error: '回答が選択されていません',
      details: '有効な回答を選択してください',
      code: 'ANSWER_REQUIRED'
    });
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

  if (!userId) {
    return res.status(400).json({
      error: 'ユーザーIDが指定されていません',
      details: 'リクエストにuserIdを含めてください',
      code: 'USER_ID_REQUIRED'
    });
  }

  if (!lessonId) {
    return res.status(400).json({
      error: 'レッスンIDが指定されていません',
      details: 'リクエストにlessonIdを含めてください',
      code: 'LESSON_ID_REQUIRED'
    });
  }

  const lesson = lessons.find(l => l.id === lessonId);
  if (!lesson) {
    return res.status(404).json({
      error: 'レッスンが見つかりません',
      details: `ID「${lessonId}」に対応するレッスンが存在しません`,
      code: 'LESSON_NOT_FOUND'
    });
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

// 404 handler for API routes
app.use('/api/*', (req: Request, res: Response) => {
  res.status(404).json({
    error: 'エンドポイントが見つかりません',
    details: `「${req.originalUrl}」は存在しません`,
    code: 'ENDPOINT_NOT_FOUND'
  });
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    error: 'サーバーエラーが発生しました',
    details: process.env.NODE_ENV === 'development' ? err.message : '予期しないエラーが発生しました。しばらくしてから再度お試しください。',
    code: 'INTERNAL_SERVER_ERROR'
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
