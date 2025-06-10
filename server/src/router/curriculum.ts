import express from 'express';
import {
  getAvailableCurriculums,
  getAvailableLevels
} from '../controllers/curriculumController';
// import { authMiddleware } from '../middlewares';

const router = express.Router();

router.get('/', getAvailableCurriculums);
router.get('/:curriculum/levels', getAvailableLevels);

export default router;