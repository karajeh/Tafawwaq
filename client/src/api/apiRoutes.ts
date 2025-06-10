import { getTutors } from "./teacherService";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.tafawwaq.com";


const apiRoutes = {
  // Auth routes
  login: `${BASE_URL}/api/auth/login`,
  register: `${BASE_URL}/api/auth/register`,
  logout: `${BASE_URL}/api/auth/logout`,
  resetPassword: (token: string) =>
    `${BASE_URL}/api/auth/reset-password?token=${token}`,
  getUserProfile: `${BASE_URL}/api/user/get-profile`,
  updateUserProfile: `${BASE_URL}/api/user/update-profile`,

  // lesson routes
  lessonBooking: `${BASE_URL}/api/lesson/booking`,

  // teacher routes
  teacherOnboarding: `${BASE_URL}/api/teacher/onboarding-account`,
  teacherDashboard: `${BASE_URL}/api/teacher/stripe-dashboard`,
  teacherEarningsSummary: `${BASE_URL}/api/teacher/earnings-summary`,
  teacherWithdraw: `${BASE_URL}/api/teacher/teacher-withdraw`,
  getTutorsForDropdown: `${BASE_URL}/api/teacher/dropdown`,
  searchTeachers: `${BASE_URL}/api/teacher/search`,
  getTutors: `${BASE_URL}/api/teacher/get-tutors`,
  getCertifiedTutors: `${BASE_URL}/api/teacher/get-certified-tutors`,
  approveDisapproveTutor:`${BASE_URL}/api/teacher/approve-disapprove-tutor`,
  approveCertification: `${BASE_URL}/api/teacher/approve-certification`,

  //Booking
  getStudentBookings: `${BASE_URL}/api/booking/student`,
  getTutorBookings: `${BASE_URL}/api/booking/tutor`,
  createBooking: `${BASE_URL}/api/booking/create`,
  updateBooking: (bookingId: string) => `${BASE_URL}/api/booking/${bookingId}`,
  cancelBooking: (bookingId: string) => `${BASE_URL}/api/booking/${bookingId}/cancel`,
  // VideoSDK routes
  getVideoToken: `${BASE_URL}/api/videosdk/get-token`,
  validateRoom: (roomId: string) => `${BASE_URL}/api/videosdk/validate-room/${roomId}`,
  startRecording: (roomId: string) => `${BASE_URL}/api/videosdk/start-recording/${roomId}`,
  stopRecording: (roomId: string) => `${BASE_URL}/api/videosdk/stop-recording/${roomId}`,
  updateWhiteboard: (meetingId: string) => `${BASE_URL}/api/videosdk/update-whiteboard/${meetingId}`,
  fetchSessions: (roomId: string) => `${BASE_URL}/api/videosdk/sessions/${roomId}`,
  fetchAllRooms: `${BASE_URL}/api/videosdk/rooms`,
  // Curriculum routes
  getAvailableCurriculums: `${BASE_URL}/api/curriculum`,
  getAvailableLevels: (curriculum: string) =>
    `${BASE_URL}/api/curriculum/${encodeURIComponent(curriculum)}/levels`,
};

export default apiRoutes;
