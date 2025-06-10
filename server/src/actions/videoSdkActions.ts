/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { BookingModel } from '../db/models/booking';
import { BookingCreateData, MeetingResponse } from '../types/booking';

type RecordingResponse = {
    recordingUrl?: string;
};

const VIDEOSDK_API_KEY = process.env.VIDEOSDK_API_KEY as string;
const VIDEOSDK_SECRET_KEY = process.env.VIDEOSDK_SECRET_KEY as string;
const BASE_URL = 'https://api.videosdk.live/v2';

if (!VIDEOSDK_API_KEY || !VIDEOSDK_SECRET_KEY) {
    throw new Error('Required environment variables are not set');
}

const generateToken = (): string => {
    return jwt.sign(
        { apikey: VIDEOSDK_API_KEY, permissions: ['allow_join', 'allow_mod'] },
        VIDEOSDK_SECRET_KEY,
        { expiresIn: '24h', algorithm: 'HS256' }
    );
};

export const createMeeting = async (bookingCreateData: BookingCreateData, userId: string): Promise<any> => {
    const token = generateToken();
    const response = await axios.post<MeetingResponse>(`${BASE_URL}/rooms`, {}, {
        headers: { Authorization: token, 'Content-Type': 'application/json' },
    });

    const { roomId, id: meetingId } = response.data;
    const { startTime, endTime }: BookingCreateData = bookingCreateData;
    const booking = new BookingModel({
        userId,
        hostId: userId,
        meetingId,
        roomId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        status: 'scheduled',
    });
    await booking.save();

    return booking;
};

export const validateMeeting = async (meetingId: string): Promise<boolean> => {
    const token = generateToken();
    const response = await axios.get(`${BASE_URL}/rooms/${meetingId}`, {
        headers: { Authorization: token, 'Content-Type': 'application/json' },
    });
    return !!response.data;
};

export const generateTokenAction = async (): Promise<string> => {
    return generateToken();
};

export const startRecording = async (roomId: string): Promise<RecordingResponse> => {
    const token = generateToken();
    const transcription = {
        enabled: true,
        summary: {
            enabled: true,
            prompt:
                "Write summary in sections like Title, Agenda, Speakers, Action Items, Outlines, Notes and Summary",
        },
    };
    const config = {
      layout: {
        type: "GRID",
        priority: "SPEAKER",
        gridSize: 4,
      },
      theme: "DARK",
      mode: "video-and-audio",
      quality: "high",
      orientation: "landscape",
    };
    const response = await axios.post<RecordingResponse>(`${BASE_URL}/recordings/start`, {
        roomId: roomId,
        transcription: transcription,
        config: config,
        webhookUrl: null,
        awsDirPath: null,
    }, {
        headers: { Authorization: token, 'Content-Type': 'application/json' },
    });
    if (response.data) {
        await BookingModel.findOneAndUpdate({ roomId }, { recordingUrl: response.data }, { new: true });
    }

    return response.data;
};

export const stopRecording = async (roomId: string): Promise<RecordingResponse> => {
    const token = generateToken();
    const response = await axios.post<RecordingResponse>(`${BASE_URL}/recordings/end`, { roomId: roomId }, {
        headers: { Authorization: token, 'Content-Type': 'application/json' },
    });
    if (response.data.recordingUrl) {
        await BookingModel.findOneAndUpdate(
            { roomId },
            { recordingUrl: response.data.recordingUrl },
            { new: true }
        );
    }
    return response.data;
};

export const updateWhiteboardData = async (meetingId: string, whiteboardData: string): Promise<void> => {
    await BookingModel.findOneAndUpdate(
        { meetingId },
        { whiteboardData },
        { new: true }
    );
};

export const fetchAllRooms = async (): Promise<any[]> => {
    try {
        const token = generateToken();
        const response = await axios.get(`${BASE_URL}/rooms`, {
            headers: { Authorization: token, 'Content-Type': 'application/json' },
        });

        if (response.status === 200) {
            return response.data;
        }

        return [];
    } catch (error) {
        console.error('Error fetching rooms:', error);
        return [];
    }
};

export const fetchSessions = async (roomId: string, page: number = 1, perPage: number = 20): Promise<any> => {
    const token = generateToken();
    const url = `${BASE_URL}/sessions/?roomId=${roomId}&page=${page}&perPage=${perPage}`;
    const response = await axios.get(url, {
        headers: { Authorization: token, 'Content-Type': 'application/json' },
    });

    if (response.status !== 200) {
        throw new Error(`Failed to fetch sessions: ${response.statusText}`);
    }

    return response.data;
};

export const fetchRecordings = async (roomId: string): Promise<any> => {
    const token = generateToken();
    const response = await axios.get(`${BASE_URL}/recordings?roomId=${roomId}`, {
        headers: { Authorization: token, 'Content-Type': 'application/json' },
    });
    return response.data;
};

export const fetchRecordingById = async (recordingId: string): Promise<any> => {
    const token = generateToken();
    const response = await axios.get(`${BASE_URL}/recordings/${recordingId}`, {
        headers: { Authorization: token, 'Content-Type': 'application/json' },
    });
    return response.data;
};
