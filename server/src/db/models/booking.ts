import mongoose, { Schema, Document } from 'mongoose';

export interface Booking extends Document {
  userId: mongoose.Types.ObjectId;
  hostId: mongoose.Types.ObjectId;
  meetingId: string;
  roomId: string;
  startTime: Date;
  endTime: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  recordingUrl?: string;
  whiteboardData?: string;
}

const BookingSchema: Schema<Booking> = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    hostId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    meetingId: { type: String, required: true },
    roomId: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
    recordingUrl: { type: String },
    whiteboardData: { type: String },
  },
  { timestamps: true }
);

export const BookingModel = mongoose.model<Booking>('Booking', BookingSchema);
export type BookingDocument = Booking;
