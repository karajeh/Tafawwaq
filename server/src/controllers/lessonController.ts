import { Request, Response } from 'express';
import logger from '../utils/logger';
import { AuthenticatedRequest } from '../types/auth';
import { ILessonBooked } from '../types/lesson';
import { createCheckoutSessions } from '../services/stripe';
import { StudentModel } from '../db/models/student';
import { TeacherModel } from '../db/models/teacher';
import { IUser } from '../db/models/user';

export const createLessonBooking = async (req: Request, res: Response) => {
  try {
    const { userId } = req as AuthenticatedRequest;
    const lessonBooked = req.body as ILessonBooked;

    const student = await StudentModel.findOne({ user: userId });

    if (!student) {
      throw new Error('Student not found');
    }

    const teacher = await TeacherModel.findById(lessonBooked.teacher).populate<{
      user: IUser;
    }>('user', 'name');

    if (!teacher) {
      throw new Error('Teacher not found');
    }

    const sessionUrl = await createCheckoutSessions({
      subject: lessonBooked.subject,
      teacherId: lessonBooked.teacher,
      studentId: userId,
      tutorName: teacher.user.name,
      date: new Date(),
      selectedHours: lessonBooked.selectedHours,
      hourPrice: teacher.hourlyRate?.amount as number,
    });

    logger.info(`New checkout session url created: ${sessionUrl}`);

    res.status(201).json({ url: sessionUrl });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Lesson booking error: ${errorMessage}`);
    res.status(500).json({ message: 'An internal server error occurred' });
  }
};
