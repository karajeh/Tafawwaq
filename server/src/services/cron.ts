import { CronJob } from 'cron';
import { updateLessonPayoutStatus } from '../actions/lessonActions';
import logger from '../utils/logger';

const updatePayoutStatus = async () => {
  logger.info('Running payout status update job...');

  try {
    const today = new Date();
    const result = await updateLessonPayoutStatus(today);

    logger.info(`Updated ${result.modifiedCount} lessons to 'Available'.`);
  } catch (error) {
    logger.error('Error updating payout statuses:', error);
  }
};

// Schedule the job at midnight (UTC)
export const updatePayoutStatusJob = new CronJob(
  '0 0 * * *',
  updatePayoutStatus,
);
