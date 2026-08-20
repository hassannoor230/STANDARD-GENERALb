import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
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

const app = express();

// Trust proxy headers (required for express-rate-limit and secure cookies behind
// Vercel / Render / Nginx reverse proxies).
app.set('trust proxy', 1);

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:", "http:"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map(origin => origin.trim().replace(/\/+$/, ''))
  .filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

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

app.use('/api/v1/business', businessRoutes);
app.use('/api/v1/services', servicesRoutes);
app.use('/api/v1/projects', projectsRoutes);
app.use('/api/v1/reviews', reviewsRoutes);
app.use('/api/v1/faqs', faqsRoutes);
app.use('/api/v1/leads', leadsRoutes);
app.use('/api/v1/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({
    success: true,
    name: 'Standard General Construction Inc. API',
    version: '1.0.0',
    message: 'API is running. Use /api/health for status.',
  });
});

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running', timestamp: new Date().toISOString() });
});

// 404 for any non-API or unknown routes
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/standard-general-construction')
  .then(() => {
    console.log('MongoDB connected successfully to:', mongoose.connection.db.databaseName);
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
