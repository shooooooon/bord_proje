import { Router, Request, Response } from 'express';
import { lessons } from '../data/lessons';

const router = Router();

// In-memory storage for user progress
// In production, this should be replaced with a database
const userProgress: { [userId: string]: string[] } = {};

// Save user progress
router.post('/progress', (req: Request, res: Response) => {
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

// Get user progress
router.get('/progress/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;

  res.json({
    completedLessons: userProgress[userId] || [],
    totalLessons: lessons.length,
    progress: Math.round(((userProgress[userId]?.length || 0) / lessons.length) * 100)
  });
});

export default router;
