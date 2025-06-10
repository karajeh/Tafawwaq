import express from 'express';
import {
  createTeacherOnboardingUrl,
  getStripeDashboard,
  getTeacherEarningsSummary,
  payoutTeacherWithdraw,
  getTutorsForDropdown,
  searchTeachers,
  getTutors,
  getCertifiedTutors,
  approveDisapproveTutor,
  approveCertification,
} from '../controllers/teacherController';
import { authMiddleware } from '../middlewares';

const router = express.Router();

router.post('/onboarding-account', authMiddleware, createTeacherOnboardingUrl);
router.get('/stripe-dashboard', authMiddleware, getStripeDashboard);
router.get('/earnings-summary', authMiddleware, getTeacherEarningsSummary);
router.post('/teacher-withdraw', authMiddleware, payoutTeacherWithdraw);
router.get('/dropdown', getTutorsForDropdown);
router.post('/search', searchTeachers)
router.get('/get-tutors', getTutors)
router.get('/get-certified-tutors', getCertifiedTutors )
router.post('/approve-disapprove-tutor', approveDisapproveTutor)
router.post('/approve-certification', approveCertification)


export default router;
