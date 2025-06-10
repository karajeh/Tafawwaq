import mongoose, { Document } from 'mongoose';
export interface User extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  username: string;
  email: string;
  profilePicture?: string;
  bio?: string;
  role: 'Admin' | 'Student' | 'Mentor';
  roleId?: mongoose.Schema.Types.ObjectId;
  googleId?: string;
  isGoogleAccount?: boolean;
  authentication: {
    password: string;
    salt: string;
    sessionToken?: string;
  };
}
