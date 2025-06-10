import { Request, Response } from 'express';
import { BookingModel } from '../db/models/booking';
import { createMeeting } from '../actions/videoSdkActions';
import { AuthenticatedRequest } from '../types/auth';

export const createBookingController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req as AuthenticatedRequest;
    const { startTime, endTime, tutorId } = req.body;

    if (!startTime || !endTime || !tutorId) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }

    const booking = await createMeeting({ startTime, endTime }, userId);

    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

export const getStudentBookingsController = async (req: Request, res: Response) => {
  try {
    const { userId } = req as AuthenticatedRequest;
    const { startDate, endDate } = req.query;

    const bookings = await BookingModel.find({
      userId,
      startTime: { $gte: new Date(startDate as string), $lte: new Date(endDate as string) }
    }).sort({ startTime: 1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching student bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

export const getTutorBookingsController = async (req: Request, res: Response) => {
  try {
    const { userId } = req as AuthenticatedRequest;
    const { startDate, endDate } = req.query;

    const bookings = await BookingModel.find({
      hostId: userId,
      startTime: { $gte: new Date(startDate as string), $lte: new Date(endDate as string) }
    }).sort({ startTime: 1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching tutor bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

export const cancelBookingController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req as AuthenticatedRequest;
    const { bookingId } = req.params;

    const booking = await BookingModel.findOneAndUpdate(
      { _id: bookingId, userId, status: 'scheduled' },
      { status: 'cancelled' },
      { new: true }
    );

    if (!booking) {
        res.status(404).json({ error: 'Booking not found or already cancelled' });
        return
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ error: 'Failed to cancel booking' });
  }
};