import express from 'express';
import cors from 'cors';
import path from 'path';
import lessonsRouter from './routes/lessons';
import progressRouter from './routes/progress';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', lessonsRouter);
app.use('/api', progressRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
