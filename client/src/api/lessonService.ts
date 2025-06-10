import Cookies from 'js-cookie';
import axiosInstance from './axiosInstance';
import apiRoutes from './apiRoutes';

interface ILessonBooked {
  teacher: string;
  subject: string;
  selectedHours: number;
  selectedDate?: string;
  selectedTime?: string;
}

export const createLessonBooking = async (
  lessonBooked: ILessonBooked,
): Promise<string> => {
  const token = Cookies.get('token');

  // create a checkout session
  const response = await axiosInstance.post(
    apiRoutes.lessonBooking,
    {
      ...lessonBooked,
    },
    {
      headers: {
        Authorization: `sessionToken ${token}`,
      },
    },
  );

  return response.data.url;
};
