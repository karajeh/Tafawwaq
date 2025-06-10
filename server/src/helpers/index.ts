import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Response } from 'express';
export const generateToken = (
  userId: string,
  role: string,
  expiresIn = '1d',
): string => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET as string, {
    expiresIn,
  });
};

export const attachToken = (res: Response, token: string) => {
  res.cookie('token', token, {
    httpOnly: false,
    secure: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24,
    domain: ".tafawwaq.com",
    path: '/',
  });
};

export const hashPassword = async (
  password: string,
): Promise<{ hashedPassword: string; salt: string }> => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return { hashedPassword, salt };
};
