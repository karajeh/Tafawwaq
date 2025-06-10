import Cookies from "js-cookie";
import apiRoutes from "./apiRoutes";
import axiosInstance from "./axiosInstance";

interface SearchInterface {
  selectedCurriculums?: string[];
  selectedLevels: string[];
  selectedSubjects: string[];
  priceRange: number[];
  languageSpoken?: string[];
  selectedLanguages?: string[];
}

export interface Tutor {
  id: string;
  name: string;
  image: string;
  title: string;
  description: string;
  isAvailable: boolean;
  rating: {
    stars: number;
    value: number;
    count: number;
  };
  rate: number;
  hoursTutored: number;
  responseTime: string;
  location: string;
  memberSince: string;
  tutoringExperience: string;
  age: string;
  gender: string;
  language: string;
  educationLevel: string;
  teachingGrades: string[];
  subjects: string[];
  review: {
    quote: string;
    details: string;
    reviewer: string;
  };
}

export interface CertificationRequestTutors {
  id: string;
  slug: string;
  tutor: {
    name: string;
    avatar: string;
    department: string;
  };
  country: string;
  contactNumber: string;
  totalHourComplete: string;
  ratings: string;
  requestType: string;
  approved: string;
  isCertified: boolean;
}

export interface TutorsData {
  id: string;
  slug: string;
  tutor: {
    name: string;
    avatar: string;
    department: string;
  };
  country: string;
  contactNumber: string;
  hourlyRate: string;
  requestType: string;
  language: string;
  approved: string;
}

export const getTeacherOnboardingUrl = async () => {
  const token = Cookies.get("token");

  const response = await axiosInstance.post(
    apiRoutes.teacherOnboarding,
    {},
    {
      headers: {
        Authorization: `sessionToken ${token}`,
      },
    }
  );
  console.log(response);

  return response.data.url;
};

export const getStripeDashboard = async () => {
  const token = Cookies.get("token");
  const response = await axiosInstance.get(apiRoutes.teacherDashboard, {
    headers: {
      Authorization: `sessionToken ${token}`,
    },
  });

  return response.data.url;
};

export const getTeacherEarningsSummary = async () => {
  const token = Cookies.get("token");
  const response = await axiosInstance.get(apiRoutes.teacherEarningsSummary, {
    headers: {
      Authorization: `sessionToken ${token}`,
    },
  });

  return response.data.earningsSummary;
};

export const teacherWithdraw = async () => {
  const token = Cookies.get("token");
  const response = await axiosInstance.post(
    apiRoutes.teacherWithdraw,
    {},
    {
      headers: {
        Authorization: `sessionToken ${token}`,
      },
    }
  );

  return response.data;
};

export const searchTeachers = async (body: SearchInterface) => {
  const token = Cookies.get("token");
  const response = await axiosInstance.post(apiRoutes.searchTeachers, {
    ...body,
  });

  return response.data;
};

export const getTutors = async () => {
  const token = Cookies.get("token");
  //to be sent in auth header
  const response = await axiosInstance.get(apiRoutes.getTutors);

  return response.data;
};

export const getCertificationTutors = async () => {
  const token = Cookies.get("token");
  //to be sent in auth header
  const response = await axiosInstance.get(apiRoutes.getCertifiedTutors);

  return response.data;
};

export const approveDisapproveTutor = async (value: number, id: string) => {
  const token = Cookies.get("token");
  //to be sent in auth header
  const response = await axiosInstance.post(apiRoutes.approveDisapproveTutor, {
    value,
    id,
  });

  return response.data;
};

export const approveCertification = async (id: string) => {
  const token = Cookies.get("token");
  //to be sent in auth header
  const response = await axiosInstance.post(apiRoutes.approveCertification, {
    id,
  });

  return response.data;
};
