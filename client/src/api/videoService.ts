import Cookies from 'js-cookie';
import axiosInstance from './axiosInstance';
import apiRoutes from './apiRoutes';

interface WhiteboardData {
  whiteboardData: string;
}

export const getVideoToken = async () => {
  const token = Cookies.get('token');
  
  const response = await axiosInstance.get(
    apiRoutes.getVideoToken,
    {
      headers: {
        Authorization: `sessionToken ${token}`,
      },
    }
  );

  return response.data.token;
};

export const validateRoom = async (roomId: string) => {
  const token = Cookies.get('token');
  
  const response = await axiosInstance.post(
    apiRoutes.validateRoom(roomId),
    {},
    {
      headers: {
        Authorization: `sessionToken ${token}`,
      },
    }
  );

  return response.data;
};

export const startRecording = async (roomId: string) => {
  const token = Cookies.get('token');
  
  const response = await axiosInstance.post(
    apiRoutes.startRecording(roomId),
    {},
    {
      headers: {
        Authorization: `sessionToken ${token}`,
      },
    }
  );

  return response.data;
};

export const stopRecording = async (roomId: string) => {
  const token = Cookies.get('token');
  
  const response = await axiosInstance.post(
    apiRoutes.stopRecording(roomId),
    {},
    {
      headers: {
        Authorization: `sessionToken ${token}`,
      },
    }
  );

  return response.data;
};

export const updateWhiteboard = async (meetingId: string, whiteboardData: WhiteboardData) => {
  const token = Cookies.get('token');
  
  const response = await axiosInstance.post(
    apiRoutes.updateWhiteboard(meetingId),
    whiteboardData,
    {
      headers: {
        Authorization: `sessionToken ${token}`,
      },
    }
  );

  return response.data;
};

export const fetchSessions = async (roomId: string) => {
  const token = Cookies.get('token');
  
  const response = await axiosInstance.get(
    apiRoutes.fetchSessions(roomId),
    {
      headers: {
        Authorization: `sessionToken ${token}`,
      },
    }
  );

  return response.data;
};

export const fetchAllRooms = async () => {
  const token = Cookies.get('token');
  
  const response = await axiosInstance.get(
    apiRoutes.fetchAllRooms,
    {
      headers: {
        Authorization: `sessionToken ${token}`,
      },
    }
  );

  return response.data;
};