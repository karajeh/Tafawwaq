import express from 'express';
import { authMiddleware } from '../middlewares';
import { createBookingController, fetchAllRoomsController, fetchSessionsController, getTokenController, startRecordingController, stopRecordingController, validateRoomController } from '../controllers/videosdkController';

const router = express.Router();

router.post('/create-booking',
  authMiddleware,
  createBookingController,
);

router.get('/get-token',
  authMiddleware,
  getTokenController
);

router.post('/validate-room/:roomId',
  authMiddleware,
  validateRoomController
);

router.get('/fetch-rooms',
  authMiddleware,
  fetchAllRoomsController
);

router.get('/fetch-sessions',
  authMiddleware,
  fetchSessionsController
);

router.post('/start-recording/:roomId',
  authMiddleware,
  startRecordingController
);

router.post('/stop-recording/:roomId',
  authMiddleware,
  stopRecordingController
);
// router.post('/update-whiteboard/:meetingId', updateWhiteboardController);

export default router;