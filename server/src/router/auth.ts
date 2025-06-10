import express from 'express';
import {
  loginUser,
  logoutUser,
  registerAdmin,
  registerUser,
  requestPasswordReset,
  resetPassword,
} from '../controllers/authController';
import { authMiddleware } from '../middlewares';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', authMiddleware, logoutUser);
router.post('/register-admin', registerAdmin);
router.post('/request-password-reset', authMiddleware, requestPasswordReset);
router.post('/reset-password', authMiddleware, resetPassword);
export default router;
