import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import http from 'http';
import connectDB from './db/conn';
import logger from './utils/logger';
import router from './router';
import stripeRouter from './router/stripe';
import { updatePayoutStatusJob } from './services/cron';

dotenv.config();

const app: Application = express();
const server = http.createServer(app);

const PORT: number = parseInt(process.env.PORT || '4000', 10);

app.use(
  cors({
    origin: [process.env.FRONTEND_URL || 'https://tafawwaq.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  }),
);
app.use('/api/stripe', stripeRouter);
app.use(compression());
app.use(cookieParser());

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use((req: Request, res: Response) => {
  logger.warn(`404 - Not Found - ${req.originalUrl}`);
  res.status(404).json({ message: 'Route not found' });
});

app.use((err: Error, req: Request, res: Response) => {
  logger.error(`500 - Server Error - ${err.message}`);
  res.status(500).json({ message: 'An internal server error occurred' });
});

// Start payout status update job
updatePayoutStatusJob.start();

server.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});
