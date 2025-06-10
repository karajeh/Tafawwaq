import express from 'express';
import authRoutes from './auth';
import userRoutes from './user';
import videoRoutes from './videosdk'
import lessonRoutes from './lesson';
import teacherRoutes from './teacher';
import bookingRouter from "./booking"
import curriculumRoutes from "./curriculum"
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/videosdk', videoRoutes);
router.use('/lesson', lessonRoutes);
router.use('/teacher', teacherRoutes);
router.use('/booking', bookingRouter);
router.use('/curriculum', curriculumRoutes);

export default router;
