import express from 'express';
import { createLessonBooking } from '../controllers/lessonController';
import { authMiddleware } from '../middlewares';

const router = express.Router();

router.post('/booking', authMiddleware, createLessonBooking);

export default router;
