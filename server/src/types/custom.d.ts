declare global {
  namespace Express {
    export interface Request {
      userId: string;
      role: string;
      file?: {
        buffer: Buffer;
        mimetype: string;
        originalname: string;
      };
    }
  }
}

export {};