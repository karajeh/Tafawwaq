import Cookies from "js-cookie";
import axiosInstance from "./axiosInstance";
import apiRoutes from "./apiRoutes";

export interface IProfile {
  name?: string;
  username?: string;
  email?: string;
  lname?: string;
  headline?: string;
  aboutYou?: string;
  bio?: string;
  country?: string;
  city?: string;
  teachingExperience?: string;
  studentPreferences?: string[];
  hoursPerWeekOutsideTafawwaq?: string;
  preferredHoursPerWeekInTafawwaq?: string;
  consentToUseProfileInMarketing?: boolean;
  gender?: "Male" | "Female" | "Other";
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
    };
  };
  hourlyRate?: {
    amount?: number;
    currency?: string;
  };
  cancellationNotice?: {
    amount?: number;
    period?: "Hours" | "Days";
  };
  subjects?: string[];
  notifications?: {
    notifyOnCourseBuy?: boolean;
    notifyOnReviewWrite?: boolean;
    notifyOnComment?: boolean;
    notifyOnLectureDownload?: boolean;
  };
  teaches?: {
    curriculum: string;
    levels?: string[];
  }[];
}

export interface IStudent {
  username?: string;
  lname?: string;
  country?: string;
  city?: string;
  age?: string;
  gender?: "Male" | "Female" | "Other";
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

export const updateProfile = async (
  profile: IProfile | IStudent,
): Promise<string> => {
  const token = Cookies.get("token");
  const response = await axiosInstance.put(
    apiRoutes.updateUserProfile,
    {
      ...profile,
    },
    {
      headers: {
        Authorization: `sessionToken ${token}`,
      },
    },

  );

  return response.data;
};
