import { Request } from "express";

export interface RegisterData {
  email: string;
  username: string;
  password: string;
  name: string;
  role: 'Teacher' | 'Student';
}
export interface LoginData {
  usernameOrEmail: string;
  password: string;
}
export interface RegisterAdminData {
  email: string;
  username: string;
  password: string;
  name: string;
}

export interface AuthenticatedRequest extends Request {
  userId: string;
  role: string;
}

