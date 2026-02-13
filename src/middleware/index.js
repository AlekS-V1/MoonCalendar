import rateLimit from 'express-rate-limit';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

// 1. Rate limit — захист від спаму
export const searchLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 хвилина
  max: 20, // максимум 20 запитів за хвилину
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});

export const heavyLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many heavy requests, slow down.' },
});

// 2. CORS — дозволяємо доступ з фронту
export const corsMiddleware = cors({
  origin: ['http://localhost:3000', 'https://mooncalendar-6y3u.onrender.com/'],
  methods: ['GET'],
  allowedHeaders: ['Content-Type'],
});

// 3. Helmet — захист HTTP заголовків
export const securityMiddleware = helmet({
  crossOriginResourcePolicy: false,
});

// 4. Compression — gzip для швидкості
export const compressionMiddleware = compression();
