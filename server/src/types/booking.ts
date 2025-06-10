export interface BookingCreateData {
    startTime: Date;
    endTime: Date;
}

export interface BookingUpdateData {
    status?: 'scheduled' | 'completed' | 'cancelled';
    recordingUrl?: string;
    whiteboardData?: string;
}

export interface BookingDetails {
    _id: string;
    userId: string;
    hostId: string;
    meetingId: string;
    roomId: string;
    startTime: Date;
    endTime: Date;
    status: 'scheduled' | 'completed' | 'cancelled';
    recordingUrl?: string;
    whiteboardData?: string;
}

export interface MeetingData {
    meetingId: string;
    roomId: string;
    recordingUrl?: string;
}

export interface MeetingResponse {
    roomId: string;
    id: string;
    apiKey: string;
    webhook: {
        events: string[];
    };
    disabled: boolean;
    autoCloseConfig: {
        type: string;
    };
    createdAt: string;
    updatedAt: string;
    links: {
        get_room: string;
        get_session: string;
    };
}
