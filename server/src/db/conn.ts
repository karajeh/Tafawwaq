import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../utils/logger';

dotenv.config();

const MONGO_URL = process.env.DB_URL;
if (!MONGO_URL) {
  logger.error(
    'MongoDB connection string (DB_URL) is missing in environment variables.',
  );
  process.exit(1);
}

const connectDB = async (): Promise<void> => {
  mongoose.Promise = Promise;

  try {
    await mongoose.connect(MONGO_URL);

    logger.info('Successfully connected to MongoDB');
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${(error as Error).message}`);
    process.exit(1);
  }

  mongoose.connection.on('connected', () => {
    logger.info('Mongoose connected to DB');
  });

  mongoose.connection.on('error', (err) => {
    logger.error(`Mongoose connection error: ${err}`);
  });

  mongoose.connection.on('disconnected', () => {
    logger.warn('Mongoose disconnected from DB');
  });
};

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  logger.info('Mongoose connection closed due to app termination');
  process.exit(0);
});

export default connectDB;
