import { NextFunction, RequestHandler, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import logger from '../utils/logger';
import { AuthenticatedRequest } from '../types/auth';
import { IncomingHttpHeaders } from 'http';

export const authMiddleware: RequestHandler = (
  req,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = (req.headers as IncomingHttpHeaders).authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    logger.warn('Authentication failed: Token missing in request headers');
    res.status(401).json({ message: 'Authentication token missing' });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload & {
      userId: string;
      role: string;
    };

    (req as AuthenticatedRequest).userId = decoded.userId;
    (req as AuthenticatedRequest).role = decoded.role;

    logger.info(`User authenticated: ${decoded.userId}`);
    next();
  } catch {
    logger.warn('Authentication failed: Invalid or expired token');
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const authorizeRoles = (...allowedRoles: string[]): RequestHandler => {
  return (req, res: Response, next: NextFunction) => {
    const { role, userId } = req as AuthenticatedRequest;

    if (!role) {
      logger.warn('Authorization failed: No role found in request');
      res.status(403).json({ message: 'No role found, access denied' });
      return;
    }

    if (!allowedRoles.includes(role)) {
      logger.warn(
        `Authorization failed: User ${userId} with role ${role} attempted to access a restricted route`,
      );
      res
        .status(403)
        .json({ message: 'Access denied: insufficient permissions' });
      return;
    }

    logger.info(
      `Authorization successful: User ${userId} with role ${role} granted access`,
    );
    next();
  };
};

