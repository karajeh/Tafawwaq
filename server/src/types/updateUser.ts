export interface CommonUpdateData {
  name?: string;
  email?: string;
  profilePicture?: string;
  bio?: string;
}

export interface StudentUpdateData extends CommonUpdateData {
  country?: string;
  city?: string;
  gender?: 'Male' | 'Female' | 'Other';
  birthDate?: Date;
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

export interface TeacherUpdateData extends CommonUpdateData {
  country?: string;
  city?: string;
  gender?: 'Male' | 'Female' | 'Other';
  birthDate?: Date;
  whatsAppPhoneNumber?: string;
  languageSpoken?: string;
  educationalBackground?: string;
  school?: string;
  availability?: {
    startTime?: string;
    endTime?: string;
    days?: string[];
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
}

export interface BaseUpdateData {
  name?: string;
  email?: string;
  profilePicture?: Buffer;
  bio?: string;
  [key: string]: unknown;
}

export interface UpdateUserInfoData {
  userId: string;
  role: 'Student' | 'Teacher';
  updateData: BaseUpdateData;
}
