import { RequestHandler } from 'express';
import * as authActions from '../actions/authActions';
import logger from '../utils/logger';
import { AuthenticatedRequest } from '../types/auth';
import { attachToken } from '../helpers';

export const registerUser: RequestHandler = async (req, res) => {
  try {
    const { email, username, password, name, role } = req.body;
    const user = await authActions.registerUserAction({
      email,
      username,
      password,
      name,
      role,
    });

    logger.info(`User registered as ${user.role}: ${user.username}`);
    attachToken(res, user.authentication.sessionToken!);
    res
      .status(201)
      .json({ message: `${user.role} registered successfully`, user });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Registration error: ${errorMessage}`);
    res.status(400).json({ message: errorMessage });
  }
};

export const loginUser: RequestHandler = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;
    const { user } = await authActions.loginUserAction({
      usernameOrEmail,
      password,
    });

    logger.info(`User logged in: ${user.username}`);
    attachToken(res, user.authentication.sessionToken!);
    res.status(200).json({ message: 'Login successful', user });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Login error: ${errorMessage}`);
    res.status(401).json({ message: 'Invalid username/email or password' });
  }
};

export const logoutUser: RequestHandler = async (req, res) => {
  try {
    const { userId } = req as AuthenticatedRequest;

    await authActions.logoutUserAction(userId);

    logger.info(`User logged out: ${userId}`);
    res.status(200).json({ message: 'Logout successful' });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Logout error: ${errorMessage}`);
    res.status(500).json({ message: 'Logout failed' });
  }
};

export const registerAdmin: RequestHandler = async (req, res) => {
  try {
    const { email, username, password, name } = req.body;
    const newAdmin = await authActions.registerAdminAction({
      email,
      username,
      password,
      name,
    });
    logger.info(`Admin registered: ${newAdmin.username}`);
    res
      .status(201)
      .json({ message: 'Admin registered successfully', user: newAdmin });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Admin registration error: ${errorMessage}`);
    res.status(400).json({ message: errorMessage });
  }
};

export const requestPasswordReset: RequestHandler = async (req, res) => {
  const { email } = req.body;
  try {
    await authActions.sendResetPasswordEmail(email);
    logger.info(`Password reset email sent to: ${email}`);
    res.status(200).json({ message: 'Password reset email sent.' });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Error sending password reset email: ${errorMessage}`);
    res.status(400).json({ message: errorMessage });
  }
};

export const resetPassword: RequestHandler = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    await authActions.resetPasswordAction(token, newPassword);
    logger.info('Password reset successful');
    res.status(200).json({ message: 'Password reset successful.' });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Password reset error: ${errorMessage}`);
    res.status(400).json({ message: errorMessage });
  }
};
