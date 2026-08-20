import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import morgan from 'morgan';
import { errorHandler } from './middleware/errorHandler.js';
import businessRoutes from './routes/business.js';
import servicesRoutes from './routes/services.js';
import projectsRoutes from './routes/projects.js';
import reviewsRoutes from './routes/reviews.js';
import faqsRoutes from './routes/faqs.js';
import leadsRoutes from './routes/leads.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/standard-general-construction';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'standard-general-construction',
    }).then((mongoose) => {
      console.log('MongoDB connected successfully to:', mongoose.connection.db.databaseName);
      return mongoose;
    }).catch((err) => {
      console.error('MongoDB connection error:', err);
      cached.promise = null;
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim().replace(/\/+$/, ''))
  .filter(Boolean);

const corsMiddleware = (req, res, next) => {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Vary', 'Origin');
  }

  if (req.method === 'OPTIONS') {
    if (origin && allowedOrigins.includes(origin)) {
      return res.sendStatus(204);
    }
    return res.sendStatus(403);
  }

  next();
};

export const createApp = async () => {
  const app = express();

  app.set('trust proxy', 1);

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:", "http:"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
        },
      },
      crossOriginEmbedderPolicy: false,
    })
  );

  app.use(corsMiddleware);

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { success: false, message: 'Too many requests, please try again later.' },
  });
  app.use('/api/', limiter);

  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { success: false, message: 'Too many login attempts, please try again later.' },
  });

  app.use(mongoSanitize());
  app.use(express.json({ limit: '10kb' }));
  app.use(morgan('dev'));

  app.use('/api/auth', authLimiter);
  app.use('/api/business', businessRoutes);
  app.use('/api/services', servicesRoutes);
  app.use('/api/projects', projectsRoutes);
  app.use('/api/reviews', reviewsRoutes);
  app.use('/api/faqs', faqsRoutes);
  app.use('/api/leads', leadsRoutes);
  app.use('/api/auth', authRoutes);

  app.get('/api', (req, res) => {
    res.json({ success: true, message: 'API is running' });
  });

  app.get('/api/health', (req, res) => {
    res.json({ success: true, message: 'Server is running', timestamp: new Date().toISOString() });
  });

  app.get('/favicon.ico', (req, res) => {
    res.sendStatus(204);
  });

  app.get('/', (req, res) => {
    res.json({
      success: true,
      name: 'Standard General Construction Inc. API',
      version: '1.0.0',
      message: 'API is running. Use /api for status.',
    });
  });

  app.use('*', (req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
  });

  app.use(errorHandler);

  try {
    await connectDB();
  } catch (err) {
    console.error('Failed to connect to MongoDB on startup:', err);
  }

  return app;
};

const app = await createApp();

if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}

export default app;
