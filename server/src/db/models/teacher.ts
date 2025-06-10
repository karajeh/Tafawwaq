import mongoose, { Schema, Document } from 'mongoose';

export interface Teacher extends Document {
  user: mongoose.Schema.Types.ObjectId;
  headline?: string;
  aboutYou?: string;
  lname?: string;
  country?: string;
  city?: string;
  teachingExperience?: string;
  studentPreferences?: string[];
  hoursPerWeekOutsideTafawwaq?: string;
  preferredHoursPerWeekInTafawwaq?: string;
  consentToUseProfileInMarketing?: boolean;
  gender?: 'Male' | 'Female' | 'Other';
  birthDate?: Date;
  whatsAppPhoneNumber?: string;
  languageSpoken?: string[];
  educationalBackground?: {
    highestDegree?: string;
    major?: string;
    universityName?: string;
  };
  school?: string;

  availability?: {
    [day: string]: {
      startTime: string;
      endTime: string;
      isOff?: boolean;
    };
  };
  hourlyRate?: {
    amount?: number;
    currency?: string;
  };
  cancellationNotice?: {
    amount?: number;
    period?: 'Hours' | 'Days';
  };
  subjects?: string[];
  notifications?: {
    notifyOnCourseBuy?: boolean;
    notifyOnReviewWrite?: boolean;
    notifyOnComment?: boolean;
    notifyOnLectureDownload?: boolean;
  };
  connectedAccountId?: string;
  isConnectedAccount?: boolean;
  approvalStatus: string;
  isCertified: boolean;
  teaches?: {
    curriculum: string;
    levels: string[];
  }[];
}

const TeacherSchema = new Schema<Teacher>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    headline: { type: String },
    aboutYou: { type: String },
    lname: { type: String },
    country: { type: String },
    city: { type: String },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    birthDate: { type: Date },
    whatsAppPhoneNumber: { type: String },
    languageSpoken: { type: [String] },
    educationalBackground: {
      highestDegree: { type: String },
      major: { type: String },
      universityName: { type: String },
    },
    studentPreferences: { type: [String] },
    teachingExperience: { type: String },
    hoursPerWeekOutsideTafawwaq: {
      type: String,
      enum: ['0', '1-5', '6-10', '11-20', '21-35', '35+'],
    },
    preferredHoursPerWeekInTafawwaq: {
      type: String,
      enum: ['0', '1-5', '6-10', '11-20', '21-35', '35+'],
    },
    consentToUseProfileInMarketing: {
      type: Boolean,
    },
    school: { type: String },
    availability: {
      type: Map,
      of: {
        startTime: { type: String },
        endTime: { type: String },
        isOff: { type: Boolean, default: false }
      },

    },
    hourlyRate: {
      amount: { type: Number },
      currency: { type: String },
    },
    cancellationNotice: {
      amount: { type: Number, min: 1 },
      period: { type: String, enum: ['Hours', 'Days'] },
    },
    subjects: { type: [String] },
    notifications: {
      notifyOnCourseBuy: { type: Boolean, default: false },
      notifyOnReviewWrite: { type: Boolean, default: false },
      notifyOnComment: { type: Boolean, default: false },
      notifyOnLectureDownload: { type: Boolean, default: false },
    },
    connectedAccountId: { type: String },
    isConnectedAccount: { type: Boolean, default: false },
    approvalStatus: {type: String, enum: ['PENDING', 'APPROVED', 'DISAPPROVED'], default: 'PENDING'},
    isCertified: {type: Boolean, default: false},
    teaches: [
      {
        curriculum: { type: String, required: true },
        levels: [{ type: String, required: true }],
      },
    ],
  },
  {
    timestamps: true,
  },
);

TeacherSchema.index({ 'availability.days': 1 });
TeacherSchema.index({ 'teaches.curriculum': 1 });
TeacherSchema.index({ 'teaches.levels': 1 });
TeacherSchema.index({ user: 1 });
TeacherSchema.index({ subjects: 1 });
TeacherSchema.index({ lname: 1 });

export const TeacherModel = mongoose.model<Teacher>('Teacher', TeacherSchema);
export type TeacherDocument = Teacher;
