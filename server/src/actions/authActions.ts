import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import { StudentModel } from '../db/models/student';
import { TeacherModel } from '../db/models/teacher';
import { TeacherDocument } from '../db/models/teacher';
import { StudentDocument } from '../db/models/student';
import { UserModel } from '../db/models/user';
import { generateToken, hashPassword } from '../helpers';
import { LoginData, RegisterAdminData, RegisterData } from '../types/auth';
import { User } from '../types/user';
import { log } from 'console';
const RESET_TOKEN_EXPIRATION = '1h';
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD,
  },
});
export const registerUserAction = async (data: RegisterData) => {
  const { email, username, password, name, role } = data;

  const existingUser = await UserModel.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new Error('Email or username already in use.');
  }

  const { hashedPassword, salt } = await hashPassword(password);

  const newUser = await UserModel.create({
    email,
    username,
    name,
    role,
    authentication: {
      password: hashedPassword,
      salt,
    },
  });

  let roleSpecificDoc: TeacherDocument | StudentDocument | null = null;
  if (role === 'Teacher') {
    // const connectedAccountId = await generateConnectedAccountID(email);
    roleSpecificDoc = await TeacherModel.create({
      user: newUser._id,
      // connectedAccountId,
    });
  } else if (role === 'Student') {
    roleSpecificDoc = await StudentModel.create({ user: newUser._id });
  }

  if (roleSpecificDoc && roleSpecificDoc._id) {
    newUser.roleId = roleSpecificDoc._id as mongoose.Types.ObjectId;
    await newUser.save();
  } else {
    throw new Error('Failed to create role-specific document.');
  }

  const sessionToken = generateToken(
    (newUser._id as mongoose.Types.ObjectId).toString(),
    newUser.role,
  );
  newUser.authentication.sessionToken = sessionToken;
  await newUser.save();

  return newUser;
};

export const loginUserAction = async ({
  usernameOrEmail,
  password,
}: LoginData) => {
  const user = (await UserModel.findOne({
    $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
  }).select('+authentication.password +authentication.salt')) as User | null;

  if (!user) throw new Error('User not found');

  const isPasswordValid = await bcrypt.compare(
    password,
    user.authentication.password,
  );
  if (!isPasswordValid) throw new Error('Wrong Password');
  const sessionToken = generateToken(
    (user._id as mongoose.Types.ObjectId).toString(),
    user.role,
  );
  log('Dsd');
  user.authentication.sessionToken = sessionToken;
  await user.save();

  return { user };
};

export const logoutUserAction = async (userId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  user.authentication.sessionToken = undefined;
  await user.save();
  return { message: 'Logout successful' };
};

export const registerAdminAction = async (data: RegisterAdminData) => {
  const { email, username, password, name } = data;
  const existingUser = await UserModel.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new Error('Email or username already in use.');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newAdmin = await UserModel.create({
    email,
    username,
    name,
    role: 'Admin',
    authentication: {
      password: hashedPassword,
      salt,
    },
  });

  return newAdmin;
};

export const sendResetPasswordEmail = async (email: string) => {
  const user = (await UserModel.findOne({ email })) as User;
  if (!user) throw new Error('User not found.');

  const resetToken = generateToken(
    user._id.toString(),
    user.role,
    RESET_TOKEN_EXPIRATION,
  );

  const resetLink = `http://yourdomain.com/reset-password?token=${resetToken}`;
  const mailOptions = {
    from: process.env.EMAIL_ID,
    to: email,
    subject: 'Password Reset',
    text: `Please reset your password by clicking the following link: ${resetLink}`,
  };

  await transporter.sendMail(mailOptions);
};

export const resetPasswordAction = async (
  token: string,
  newPassword: string,
) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };
    const user = await UserModel.findById(decoded.userId);
    if (!user) throw new Error('Invalid token or user does not exist.');

    const { hashedPassword, salt } = await hashPassword(newPassword);
    user.authentication.password = hashedPassword;
    user.authentication.salt = salt;
    await user.save();
  } catch (error) {
    console.error('Error during password reset:', error);
    throw new Error('Invalid or expired token.');
  }
};
