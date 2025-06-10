import mongoose, { Schema, Document } from 'mongoose';

export interface ILesson extends Document {
  subject: string;
  teacher: mongoose.Types.ObjectId;
  student: mongoose.Types.ObjectId;
  date: Date;
  duration: number;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  totalCost: number;
  studentServiceFee: number;
  platformFee: number;
  amountHeldForTeacher: number;
  payoutStatus: 'Pending' | 'Available' | 'Transferred';
  payoutAvailableDate: Date;
  stripeSessionId?: string;
  stripePaymentIntentId?: string;
}

const LessonSchema: Schema<ILesson> = new mongoose.Schema(
  {
    subject: { type: String, required: true },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: { type: Date, required: true },
    duration: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Scheduled', 'Completed', 'Cancelled'],
      default: 'Scheduled',
    },
    totalCost: { type: Number, required: true },
    studentServiceFee: { type: Number, required: true },
    platformFee: { type: Number, required: true },
    amountHeldForTeacher: { type: Number, required: true },
    payoutStatus: {
      type: String,
      enum: ['Pending', 'Available', 'Transferred'],
      default: 'Pending',
    },
    payoutAvailableDate: { type: Date, required: true },
    stripeSessionId: { type: String, required: false },
    stripePaymentIntentId: { type: String, required: false },
  },
  {
    timestamps: true,
  },
);

export const LessonModel = mongoose.model<ILesson>('Lesson', LessonSchema);
