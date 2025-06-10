import { Request, Response } from 'express';
import { Teacher, TeacherModel } from '../db/models/teacher';
import {
  createTeacherOnboardingAction,
  teacherEarningsSummaryAction,
} from '../actions/teacherActions';
import { getDashboardLink, payoutTransfer } from '../services/stripe';
import logger from '../utils/logger';
import { LessonModel } from '../db';
import { AuthenticatedRequest } from '../types/auth';
import { IUser, UserModel } from '../db/models/user';
import { FilterQuery } from 'mongoose';

export const createTeacherOnboardingUrl = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userId } = req as AuthenticatedRequest;
    console.log(userId);

    const { teacherOnboardingUrl } =
      await createTeacherOnboardingAction(userId);

    logger.info(
      `Stripe onboarding URL ${teacherOnboardingUrl} generated for teacher ${userId}`,
    );

    res.status(201).json({ url: teacherOnboardingUrl });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An internal server error occurred' });
  }
};

export const getStripeDashboard = async (req: Request, res: Response) => {
  try {
    const { userId } = req as AuthenticatedRequest;
    const teacher = await TeacherModel.findOne({ user: userId });
    const url = await getDashboardLink(teacher?.connectedAccountId as string);
    res.status(200).json({ url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An internal server error occurred' });
  }
};

// retrieve teacher balance from stripe
export const getTeacherEarningsSummary = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userId } = req as AuthenticatedRequest;
    const teacher = await TeacherModel.findOne({ user: userId });
    const earningsSummary = await teacherEarningsSummaryAction(
      teacher?._id as string,
    );

    res.status(200).json({ earningsSummary });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An internal server error occurred' });
  }
};

// Teacher payout
export const payoutTeacherWithdraw = async (req: Request, res: Response) => {
  try {
    // Get teacher's Stripe account
    const { userId } = req as AuthenticatedRequest;
    const teacher = await TeacherModel.findOne({ user: userId });

    if (!teacher || !teacher.connectedAccountId) {
      throw new Error('Teacher does not have a connected Stripe account');
    }

    // Find all lessons with available payouts
    const lessons = await LessonModel.find({
      teacher: teacher._id,
      payoutStatus: 'Available',
    });

    if (lessons.length === 0) {
      throw new Error('No available payouts for this teacher');
    }

    // Sum total payout amount
    const totalAmount = lessons.reduce(
      (sum, lesson) => sum + lesson.amountHeldForTeacher,
      0,
    );

    // Get lessons Ids
    const lessonsIds: string[] = lessons.map((lesson) => lesson._id as string);

    if (totalAmount <= 0) {
      throw new Error('No available payouts');
    }

    // Create a single payout to the teacher's account
    const payout = await payoutTransfer({
      amount: totalAmount,
      connectedAccountId: teacher.connectedAccountId,
      teacherId: teacher._id as string,
      lessonsIds,
    });

    logger.info(`Payout teacher successfully ${payout.id}: ${totalAmount}`);

    res.status(201).json({
      message: `Payout teacher successfully`,
      payoutId: payout.id,
      totalAmount,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Payout error: ${errorMessage}`);
    res.status(500).json({ message: errorMessage });
  }
};

export const getTutorsForDropdown = async (req: Request, res: Response) => {
  try {
    const tutors = await TeacherModel.find()
      .select('user subjects lname')
      .populate({
        path: 'user',
        model: UserModel,
        select: 'name profilePicture',
      })
      .lean();

    res.status(200).json(tutors);
  } catch (error) {
    console.error('An error occurred while fetching tutors:', error);
    res.status(500).json({ message: 'Failed to fetch tutors' });
  }
};

export const searchTeachers = async (req: Request, res: Response) => {
  try {
    const {
      selectedCurriculums,
      selectedLevels,
      selectedSubjects,
      priceRange,
      languagesSpoken,
    } = req.body;

    const query: FilterQuery<Teacher> = {};

    query.approvalStatus = 'APPROVED';

    if (selectedSubjects && selectedSubjects.length > 0) {
      query.subjects = { $in: selectedSubjects };
    }

    if (selectedCurriculums && selectedCurriculums.length > 0) {
      query.teaches = {
        $elemMatch: {
          curriculum: { $in: selectedCurriculums },
        },
      };

      if (selectedLevels && selectedLevels.length > 0) {
        query.teaches.$elemMatch.levels = { $in: selectedLevels };
      }
    }

    if (priceRange && priceRange?.length === 2) {
      query['hourlyRate.amount'] = {
        $gte: priceRange[0],
        $lte: priceRange[1],
      };
    }

    if (languagesSpoken && languagesSpoken.length > 0) {
      query.languageSpoken = { $in: languagesSpoken };
    }

    const teachers = await TeacherModel.find(query).populate<{ user: IUser }>(
      'user',
    );

    const getAge = (birthDate: Date) => {
      const birth = new Date(birthDate);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();

      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
      }

      return age.toString();
    };

    // Mapping the data according to front end implementation
    // many thing missing for now such as: isAvailable, rating, hoursTutored, responseTime,
    const tutors = teachers.map((e) => ({
      id: e._id,
      name: e.user.name,
      image: e.user.profilePicture,
      title: e.headline,
      description: e.aboutYou,
      // Mock data
      isAvailable: true,
      // Mock data to be calculated after rating schema implementation
      rating: {
        stars: 5,
        value: 4.5,
        count: 5,
      },
      rate: e.hourlyRate?.amount,
      // Mock data to be calculated
      hoursTutored: 5,
      responseTime: '10 minutes',
      location: e.country,
      memberSince: e.user.createdAt
        ? new Date(e.user.createdAt).toLocaleString('en-US', {
            month: 'long',
            year: 'numeric',
          })
        : 'Unknown',
      tutoringExperience: e.teachingExperience,
      // not defined in user or teacher schema
      age: e.birthDate ? getAge(e.birthDate) : '',
      gender: e.gender,
      language: e.languageSpoken?.join(', ') || 'Not Specified',
      educationLevel: e.educationalBackground?.major,
      teachingGrades: e.teaches?.map((e) => [...e.levels]),
      subjects: e.subjects,
      // Review to be populated from review schema not present at the moment
      review: {
        quote: 'Extremely Amazing and professional tutor',
        details: 'Lorem ipsum dolor sit amet, ac fringilla malesuada.',
        reviewer: 'Rebecca',
      },
    }));

    res.status(200).json({ tutors });
  } catch (error) {
    console.error('An error occurred while fetching tutors:', error);
    res.status(500).json({ message: 'Failed to fetch tutors' });
  }
};

export const getTutors = async (req: Request, res: Response) => {
  try {
    const response = await TeacherModel.find().populate<{ user: IUser }>(
      'user',
    );
    const data = response.map((e) => ({
      id: e._id,
      tutor: {
        name: e.user.name,
        avatar: e.user.profilePicture,
        department: e.educationalBackground?.major,
      },
      slug: '',
      country: e.country,
      contactNumber: e.whatsAppPhoneNumber,
      hourlyRate: e.hourlyRate?.amount,
      language: e.languageSpoken?.join(', '),
      approved: e.approvalStatus
    }));
    res.status(200).json({ data });
  } catch (error) {
        console.error('An error occurred while fetching tutors:', error);
    res.status(500).json({ message: 'Failed to fetch tutors' });
  }
};

export const getCertifiedTutors = async (req: Request, res: Response) => {
  try {
    const response = await TeacherModel.find().populate<{ user: IUser }>(
      'user',
    );
    const data = response.map((e) => ({
      id: e._id,
      tutor: {
        name: e.user.name,
        avatar: e.user.profilePicture,
        department: e.educationalBackground?.major,
      },
      slug: '',
      country: e.country,
      contactNumber: e.whatsAppPhoneNumber,
      totalHourCompleted: '100', // Mock data to be given here
      ratings: '4.7', // mock data to be provided by ratings
      requestType: 'certificate',
      approved: e.approvalStatus,
      isCertified: e.isCertified
    }));
    res.status(200).json({ data });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ message: 'Failed to fetch tutors' });
  }
};

export const approveDisapproveTutor = async (req: Request, res: Response) => {
  try {
    const { value, id } = req.body;

    console.log(value, id)
    //value 0 means false
    if (value === 0) {
     await TeacherModel.updateOne(
        { _id: id },
        { $set: { approvalStatus: 'DISAPPROVED' } },
      );
    }
    //value 1 means true
    if (value === 1) {
       await TeacherModel.updateOne(
        { _id: id },
        { $set: { approvalStatus: 'APPROVED' } },
      );
    }
    res.status(200).json({ message: 'Request Completed' });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ message: 'Failed to fetch tutors' });
  }
};

export const approveCertification = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

   await TeacherModel.updateOne(
      { _id: id },
      { $set: { isCertified: true } },
    );

    res.status(200).json({ message: 'Request Completed' });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ message: 'Failed to fetch tutors' });
  }
};
