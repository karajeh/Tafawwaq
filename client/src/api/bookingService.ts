import Cookies from 'js-cookie';
import axiosInstance from './axiosInstance';
import apiRoutes from './apiRoutes';

interface TimeRange {
  startDate: Date;
  endDate: Date;
}

interface BookingCreateData {
  startTime: Date;
  endTime: Date;
  tutorId: string;
}
export interface BookingDetails {
    _id: string;
    userId: string;
    hostId: string;
    meetingId: string;
    roomId: string;
    startTime: Date;
    endTime: Date;
    status: 'scheduled' | 'completed' | 'cancelled';
    recordingUrl?: string;
    whiteboardData?: string;
    createdAt: string;
    updatedAt: string;
}

export const getStudentBookings = async (timeRange: TimeRange) => {
  const token = Cookies.get('token');
  
  const response = await axiosInstance.get(
    `${apiRoutes.getStudentBookings}?startDate=${timeRange.startDate.toISOString()}&endDate=${timeRange.endDate.toISOString()}`,
    {
      headers: {
        Authorization: `sessionToken ${token}`,
      },
    }
  );

  return response.data;
};

export const getTutorBookings = async (timeRange: TimeRange) => {
  const token = Cookies.get('token');
  
  const response = await axiosInstance.get(
    `${apiRoutes.getTutorBookings}?startDate=${timeRange.startDate.toISOString()}&endDate=${timeRange.endDate.toISOString()}`,
    {
      headers: {
        Authorization: `sessionToken ${token}`,
      },
    }
  );

  return response.data;
};

export const createBooking = async (bookingData: BookingCreateData) => {
  const token = Cookies.get('token');
  
  const response = await axiosInstance.post(
    apiRoutes.createBooking,
    bookingData,
    {
      headers: {
        Authorization: `sessionToken ${token}`,
      },
    }
  );

  return response.data;
};

export const cancelBooking = async (bookingId: string) => {
  const token = Cookies.get('token');
  
  const response = await axiosInstance.post(
    apiRoutes.cancelBooking(bookingId),
    {},
    {
      headers: {
        Authorization: `sessionToken ${token}`,
      },
    }
  );

  return response.data;
};

// Helper function to check if a booking is accessible (within 5 minutes of start time)
export const isBookingAccessible = (startTime: Date): boolean => {
  const now = new Date();
  const bookingStart = new Date(startTime);
  const timeDiff = Math.abs(now.getTime() - bookingStart.getTime());
  return timeDiff <= 5 * 60 * 1000; // 5 minutes in milliseconds
};