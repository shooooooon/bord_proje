import request from 'supertest';
import app from '../src/server';

describe('Slack Learning App API', () => {

  describe('GET /api/categories', () => {
    it('should return all categories', async () => {
      const response = await request(app)
        .get('/api/categories')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('icon');
    });

    it('should return 3 categories', async () => {
      const response = await request(app).get('/api/categories');
      expect(response.body.length).toBe(3);
    });
  });

  describe('GET /api/lessons', () => {
    it('should return all lessons', async () => {
      const response = await request(app)
        .get('/api/lessons')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('title');
      expect(response.body[0]).toHaveProperty('description');
      expect(response.body[0]).toHaveProperty('category');
      expect(response.body[0]).toHaveProperty('content');
    });

    it('should return 6 lessons', async () => {
      const response = await request(app).get('/api/lessons');
      expect(response.body.length).toBe(6);
    });

    it('should filter lessons by category', async () => {
      const response = await request(app)
        .get('/api/lessons?category=basics')
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBe(2);
      response.body.forEach((lesson: any) => {
        expect(lesson.category).toBe('basics');
      });
    });

    it('should return lessons for messages category', async () => {
      const response = await request(app)
        .get('/api/lessons?category=messages')
        .expect(200);

      expect(response.body.length).toBe(2);
    });

    it('should return lessons for advanced category', async () => {
      const response = await request(app)
        .get('/api/lessons?category=advanced')
        .expect(200);

      expect(response.body.length).toBe(2);
    });
  });

  describe('GET /api/lessons/:id', () => {
    it('should return a specific lesson by ID', async () => {
      const response = await request(app)
        .get('/api/lessons/basics-001')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('id', 'basics-001');
      expect(response.body).toHaveProperty('title');
      expect(response.body).toHaveProperty('content');
    });

    it('should return 404 for non-existent lesson', async () => {
      const response = await request(app)
        .get('/api/lessons/non-existent')
        .expect('Content-Type', /json/)
        .expect(404);

      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('code', 'LESSON_NOT_FOUND');
      expect(response.body.error).toContain('レッスンが見つかりません');
    });

    it('should return all lesson details', async () => {
      const response = await request(app)
        .get('/api/lessons/messages-001')
        .expect(200);

      expect(response.body.title).toBe('メッセージの送信と書式');
      expect(response.body.category).toBe('messages');
      expect(response.body.content).toBeInstanceOf(Array);
    });
  });

  describe('POST /api/lessons/:id/quiz', () => {
    it('should return correct for right answer', async () => {
      const response = await request(app)
        .post('/api/lessons/basics-001/quiz')
        .send({ answer: 1 })
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('correct', true);
      expect(response.body).toHaveProperty('explanation');
      expect(response.body).toHaveProperty('correctAnswer', 1);
    });

    it('should return incorrect for wrong answer', async () => {
      const response = await request(app)
        .post('/api/lessons/basics-001/quiz')
        .send({ answer: 0 })
        .expect(200);

      expect(response.body).toHaveProperty('correct', false);
      expect(response.body).toHaveProperty('explanation');
    });

    it('should return 404 for non-existent quiz', async () => {
      const response = await request(app)
        .post('/api/lessons/non-existent/quiz')
        .send({ answer: 0 })
        .expect(404);

      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('code', 'LESSON_NOT_FOUND');
    });

    it('should return 400 for missing answer', async () => {
      const response = await request(app)
        .post('/api/lessons/basics-001/quiz')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('code', 'ANSWER_REQUIRED');
    });
  });

  describe('POST /api/progress', () => {
    const testUserId = 'test-user-' + Date.now();

    it('should save user progress', async () => {
      const response = await request(app)
        .post('/api/progress')
        .send({ userId: testUserId, lessonId: 'basics-001' })
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('completed', 1);
      expect(response.body).toHaveProperty('total', 6);
    });

    it('should not duplicate completed lessons', async () => {
      await request(app)
        .post('/api/progress')
        .send({ userId: testUserId, lessonId: 'basics-001' });

      const response = await request(app)
        .post('/api/progress')
        .send({ userId: testUserId, lessonId: 'basics-001' })
        .expect(200);

      expect(response.body.completed).toBe(1);
    });

    it('should increment completed count for new lesson', async () => {
      const response = await request(app)
        .post('/api/progress')
        .send({ userId: testUserId, lessonId: 'basics-002' })
        .expect(200);

      expect(response.body.completed).toBe(2);
    });

    it('should return 400 for missing userId', async () => {
      const response = await request(app)
        .post('/api/progress')
        .send({ lessonId: 'basics-001' })
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('code', 'USER_ID_REQUIRED');
    });

    it('should return 400 for missing lessonId', async () => {
      const response = await request(app)
        .post('/api/progress')
        .send({ userId: testUserId })
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('code', 'LESSON_ID_REQUIRED');
    });

    it('should return 404 for non-existent lesson', async () => {
      const response = await request(app)
        .post('/api/progress')
        .send({ userId: testUserId, lessonId: 'non-existent-lesson' })
        .expect(404);

      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('code', 'LESSON_NOT_FOUND');
    });
  });

  describe('GET /api/progress/:userId', () => {
    const testUserId2 = 'test-user2-' + Date.now();

    it('should return empty progress for new user', async () => {
      const response = await request(app)
        .get(`/api/progress/${testUserId2}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('completedLessons', []);
      expect(response.body).toHaveProperty('totalLessons', 6);
      expect(response.body).toHaveProperty('progress', 0);
    });

    it('should return progress after completing lessons', async () => {
      await request(app)
        .post('/api/progress')
        .send({ userId: testUserId2, lessonId: 'basics-001' });

      await request(app)
        .post('/api/progress')
        .send({ userId: testUserId2, lessonId: 'basics-002' });

      const response = await request(app)
        .get(`/api/progress/${testUserId2}`)
        .expect(200);

      expect(response.body.completedLessons.length).toBe(2);
      expect(response.body.progress).toBe(33); // 2/6 = 33%
    });

    it('should calculate 100% progress when all lessons completed', async () => {
      const testUserId3 = 'test-user3-' + Date.now();

      const lessonIds = ['basics-001', 'basics-002', 'messages-001', 'messages-002', 'advanced-001', 'advanced-002'];

      for (const lessonId of lessonIds) {
        await request(app)
          .post('/api/progress')
          .send({ userId: testUserId3, lessonId });
      }

      const response = await request(app)
        .get(`/api/progress/${testUserId3}`)
        .expect(200);

      expect(response.body.completedLessons.length).toBe(6);
      expect(response.body.progress).toBe(100);
    });
  });
});
