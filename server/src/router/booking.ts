import express from 'express';
import { authMiddleware } from '../middlewares';
import { cancelBookingController, createBookingController, getStudentBookingsController, getTutorBookingsController } from '../controllers/bookingController';

const router = express.Router();

router.post('/create', authMiddleware, createBookingController);
router.get('/student', authMiddleware, getStudentBookingsController);
router.get('/tutor', authMiddleware, getTutorBookingsController);
router.post('/:bookingId/cancel', authMiddleware, cancelBookingController);

export default router;