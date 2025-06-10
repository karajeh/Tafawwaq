import { Request, RequestHandler, Response } from 'express';
import { getProfileAction, updateProfileAction } from '../actions/userActions';
import { UpdateUserInfoData } from '../types/updateUser';

interface AuthenticatedRequest extends Request {
  userId: string;
  role: 'Student' | 'Teacher';
  file?: Express.Multer.File;
}

export const updateProfileController: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userId, role } = req as AuthenticatedRequest;

    const updateData: UpdateUserInfoData = {
      userId,
      role,
      updateData: req.body || {},
    };

    const file = (req as AuthenticatedRequest).file;
    if (file) {
      updateData.updateData.profilePicture = file.buffer;
    }

    const result = await updateProfileAction(updateData);
    res.status(200).json(result);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    res.status(400).json({ error: errorMessage });
  }
};

export const getProfileController: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userId, role } = req as AuthenticatedRequest;

    const result = await getProfileAction({ userId, role });
    res.status(200).json(result);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    res.status(400).json({ error: errorMessage });
  }
};
