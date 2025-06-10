import express from 'express';
import { getProfileController, updateProfileController } from '../controllers/userController';
import { authMiddleware } from '../middlewares';
import { uploadMiddleware } from '../middlewares/multer';

const router = express.Router();

router.put(
  '/update-profile',
  authMiddleware,
  uploadMiddleware,
  updateProfileController,
);

router.get(
  '/get-profile',
  authMiddleware,
  getProfileController,
);

export default router;
