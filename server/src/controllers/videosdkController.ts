/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from 'express';
import mongoose from 'mongoose';
import { BookingModel } from '../db/models/booking';
import * as meetingActions from '../actions/videoSdkActions';
import { BookingCreateData } from '../types/booking';

interface AuthenticatedRequest extends Request {
  userId: string;
  role: 'Student' | 'Teacher';
}

export const createBookingController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req as AuthenticatedRequest;
    const bookingCreateData: BookingCreateData = req.body;

    if (!bookingCreateData.startTime || !bookingCreateData.endTime) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    if (!mongoose.isValidObjectId(userId)) {
      res.status(400).json({ error: 'Invalid user or host ID' });
      return;
    }

    const booking = await meetingActions.createMeeting(bookingCreateData, userId);

    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

export const validateRoomController = async (req: Request, res: Response): Promise<any> => {
  try {
    const { roomId } = req.params;
    const roomValid = await meetingActions.validateMeeting(roomId);

    if (!roomValid) {
      return res.status(404).json({ message: 'Room not found or invalid' });
    }

    return res.status(200).json({ message: 'Room is valid and active' });
  } catch (error) {
    console.error('Error validating room:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const startRecordingController: RequestHandler = async (req, res) => {
  try {
    const { roomId } = req.params;

    const { recordingUrl } = await meetingActions.startRecording(roomId);

    res.status(200).json({ recordingUrl });
  } catch (error) {
    console.error('Error starting recording:', error);
    res.status(500).json({ error: 'Failed to start recording' });
  }
};

export const stopRecordingController: RequestHandler = async (req, res) => {
  try {
    const { roomId } = req.params;

    const { recordingUrl } = await meetingActions.stopRecording(roomId);

    if (recordingUrl) {
      await BookingModel.findOneAndUpdate({ roomId }, { recordingUrl }, { new: true });
    }

    res.status(200).json({ recordingUrl });
  } catch (error) {
    console.error('Error stopping recording:', error);
    res.status(500).json({ error: 'Failed to stop recording' });
  }
};

export const updateWhiteboardController: RequestHandler = async (req, res) => {
  try {
    const { meetingId } = req.params;
    const { whiteboardData } = req.body;

    await meetingActions.updateWhiteboardData(meetingId, whiteboardData);

    res.status(200).json({ message: 'Whiteboard data updated' });
  } catch (error) {
    console.error('Error updating whiteboard data:', error);
    res.status(500).json({ error: 'Failed to update whiteboard data' });
  }
};


export const fetchAllRoomsController = async (req: Request, res: Response): Promise<any> => {
  try {
    const rooms = await meetingActions.fetchAllRooms();

    if (!rooms || rooms.length === 0) {
      return res.status(404).json({ message: 'No rooms found' });
    }

    return res.status(200).json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const fetchSessionsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roomId } = req.query;

    if (!roomId) {
      res.status(400).json({ error: 'Missing required query parameters: roomId, customRoomId, token' });
      return;
    }

    const sessions = await meetingActions.fetchSessions(roomId as string);
    res.status(200).json(sessions);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
};

export const getTokenController = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = await meetingActions.generateTokenAction();
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).json({ error: 'Failed to generate token' });
  }
};

export const fetchRecordingsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roomId } =  req.params;


    if (!roomId) {
      res.status(400).json({ error: 'roomId is required' });
      return;
    }

    const recordings = await meetingActions.fetchRecordings(roomId as string);


    res.status(200).json(recordings);
  } catch (error) {
    console.error('Error fetching recordings:', error);
    res.status(500).json({ error: 'Failed to fetch recordings' });
  }
};

export const fetchRecordingByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { recordingId } = req.params;

    if (!recordingId) {
      res.status(400).json({ error: 'recordingId is required' });
      return;
    }

    const recording = await meetingActions.fetchRecordingById(recordingId);
    res.status(200).json(recording);
  } catch (error) {
    console.error('Error fetching recording:', error);
    res.status(500).json({ error: 'Failed to fetch recording' });
  }
};