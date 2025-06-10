"use client";
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axiosInstance from 'src/api/axiosInstance';
import apiRoutes from 'src/api/apiRoutes';
import { toast } from 'react-toastify';

export interface UserData {
  name: string;
  email: string;
  role: string;
  username: string;
}

export const useUser = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const token = Cookies.get('token');
    if (!token) {
      setLoading(false);
      return null;
    }

    try {
      const response = await axiosInstance.get(apiRoutes.getUserProfile, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setUser(response.data);
        return response.data;
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      toast.error('Failed to fetch user data');
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, fetchUser };
};