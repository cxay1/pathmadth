import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import config from './config';
import authRoutes from './routes/auth.routes';
import applicationRoutes from './routes/application.routes';
import jobRoutes from './routes/job.routes';
import jobSeekerRoutes from './routes/jobSeeker.routes';
import employerRoutes from './routes/employer.routes';
import { errorHandler, notFound } from './middleware/error.middleware';

const app: Express = express();

// Middleware
app.use(cors({
  origin: config.clientUrl,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/job-seekers', jobSeekerRoutes);
app.use('/api/employers', employerRoutes);

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    environment: config.nodeEnv,
    timestamp: new Date().toISOString()
  });
});

// 404 handler for unknown routes
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  console.log(`🚀 Server is running on port ${config.port}`);
  console.log(`📊 Environment: ${config.nodeEnv}`);
  console.log(`🌐 Client URL: ${config.clientUrl}`);
  console.log(`📁 Max file size: ${(config.upload.maxFileSize / 1024 / 1024).toFixed(1)}MB`);
});
