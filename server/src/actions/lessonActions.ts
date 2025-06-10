import { LessonModel } from '../db';

interface ICreateLesson {
  subject: string;
  teacherId: string;
  studentId: string;
  date: Date;
  duration: number;
  totalCost: number;
  studentServiceFee: number;
  platformFee: number;
  amountHeldForTeacher: number;
  payoutAvailableDate: Date;
  stripeSessionId: string;
  stripePaymentIntentId: string;
}

export const createLessonAction = async ({
  subject,
  teacherId,
  studentId,
  date,
  duration,
  totalCost,
  studentServiceFee,
  platformFee,
  amountHeldForTeacher: teacherPayout,
  payoutAvailableDate,
  stripeSessionId,
  stripePaymentIntentId,
}: ICreateLesson) => {
  const newLesson = await LessonModel.create({
    subject,
    teacher: teacherId,
    student: studentId,
    date: new Date(date),
    duration: Number(duration),
    totalCost: Number(totalCost),
    studentServiceFee: Number(studentServiceFee),
    platformFee: Number(platformFee),
    amountHeldForTeacher: Number(teacherPayout),
    payoutStatus: 'Pending',
    payoutAvailableDate,
    stripeSessionId,
    stripePaymentIntentId,
  });

  return newLesson;
};

export const updateLessonPayoutStatus = async (date: Date) => {
  const lessons = await LessonModel.updateMany(
    { payoutStatus: 'Pending', payoutAvailableDate: { $lte: date } },
    { $set: { payoutStatus: 'Available' } },
  );

  return lessons;
};

export const markPayoutsAsTransferred = async (
  teacherId: string,
  lessonIds: string[],
) => {
  return await LessonModel.updateMany(
    { _id: { $in: lessonIds }, teacher: teacherId, payoutStatus: 'Available' },
    { payoutStatus: 'Transferred' },
  );
};
