import mongoose, { Document, Schema } from 'mongoose';

export interface Student extends Document {
  user: mongoose.Schema.Types.ObjectId;
  lname?: string;
  country?: string;
  city?: string;
  age?: string;
  gender?: 'Male' | 'Female' | 'Other';
  birthDate?: Date;
  curriculum?: string;
  subjects?: string[];
  whatsAppPhoneNumber?: string;
  parentWhatsAppPhoneNumber?: string;
  schoolName?: string;
  preferredLanguage?: string;
  notifications?: {
    notifyOnCourseBuy?: boolean;
    notifyOnReviewWrite?: boolean;
    notifyOnComment?: boolean;
    notifyOnLectureDownload?: boolean;
  };
}

const StudentSchema = new Schema<Student>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    lname: { type: String },
    age: { type: String},
    curriculum: { type: String },
    subjects: { type: [String] },
    country: { type: String },
    city: { type: String },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    birthDate: { type: Date },
    whatsAppPhoneNumber: { type: String },
    parentWhatsAppPhoneNumber: { type: String },
    schoolName: { type: String },
    preferredLanguage: { type: String },
    notifications: {
      notifyOnCourseBuy: { type: Boolean, default: false },
      notifyOnReviewWrite: { type: Boolean, default: false },
      notifyOnComment: { type: Boolean, default: false },
      notifyOnLectureDownload: { type: Boolean, default: false },
    },
  },
  {
    timestamps: true,
  },
);

export const StudentModel = mongoose.model<Student>('Student', StudentSchema);
export type StudentDocument = Student;
