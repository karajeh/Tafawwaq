// 1. Generate teacher account ID
// 2. Create a Stripe account onboarding link
// 3. Retrieve teacher balance from Stripe

import { LessonModel } from '../db';
import { TeacherModel } from '../db/models/teacher';
import { IUser } from '../db/models/user';
import {
  generateConnectedAccountID,
  getConnectedAccountOnboardingUrl,
} from '../services/stripe';

// Create a stripe connected account for a teacher
export const createTeacherOnboardingAction = async (userId: string) => {
  // Get teacher and select email from user model
  const teacher = await TeacherModel.findOne({ user: userId }).populate<{
    user: IUser;
  }>('user', 'email');

  if (!teacher) {
    throw new Error('Teacher not found.');
  }

  // If teacher exists and teacher does not have a connected id create a connected account
  if (!teacher.connectedAccountId) {
    const accountId = await generateConnectedAccountID(teacher.user.email);
    teacher.connectedAccountId = accountId;
    await teacher.save();
  }

  // If user is connected
  if (teacher.isConnectedAccount) {
    throw new Error('Teacher is already completed onboarding');
  }

  // get teacher stripe onboarding link
  const teacherOnboardingUrl = await getConnectedAccountOnboardingUrl(
    teacher?.connectedAccountId as string,
  );

  return { teacherOnboardingUrl };
};

// When teacher account linked to stripe, update the teacher isConnectedAccount
export const updateConnectedTeacherAction = async (
  accountId: string,
  isConnectedAccount: boolean,
) => {
  const teacher = await TeacherModel.findOne({ connectedAccountId: accountId });

  if (!teacher) {
    throw new Error('Teacher not found');
  }

  teacher.isConnectedAccount = isConnectedAccount;
  await teacher.save();
};

// Get teacher finances insights
export const teacherEarningsSummaryAction = async (teacherId: string) => {
  const today = new Date().toISOString().split('T')[0];

  const earnings = await LessonModel.aggregate([
    {
      $match: { teacher: teacherId },
    },
    {
      $group: {
        _id: null,
        earningsToday: {
          $sum: {
            $cond: [
              { $eq: [{ $substr: ['$createdAt', 0, 10] }, today] }, // Compare only the date part
              '$amountHeldForTeacher',
              0,
            ],
          },
        },
        earningsInReview: {
          $sum: {
            $cond: [
              { $eq: ['$payoutStatus', 'Pending'] },
              '$amountHeldForTeacher',
              0,
            ],
          },
        },
        earningsAvailable: {
          $sum: {
            $cond: [
              { $eq: ['$payoutStatus', 'Available'] },
              '$amountHeldForTeacher',
              0,
            ],
          },
        },
      },
    },
  ]);

  return earnings.length > 0
    ? earnings[0]
    : { earningsToday: 0, earningsInReview: 0, earningsAvailable: 0 };
};
