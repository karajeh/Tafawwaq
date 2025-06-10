"use client";
import React, { useEffect, useState } from "react";
import ScheduleALesson from "./main-dashboard/ScheduleALesson";
import LessonRequests from "./main-dashboard/LessonRrequest";
import { Bell } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const DashboardHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [heading, setHeading] = useState<string>("");
  const pathname = usePathname();
  const lastPart = pathname.split("/").pop();
  // console.log(lastPart);
  const [greeting, setGreeting] = useState("");
  // Add state for lesson request count
  const [lessonRequestCount, setLessonRequestCount] = useState(4); // Example count

  // For Teacher
  useEffect(() => {
    if (pathname === "/teacher/my-stats") {
      setHeading("My Stats");
    } else if (pathname === "/teacher/my-students") {
      setHeading("My Students");
    } else if (pathname === "/teacher/recordings") {
      setHeading("Recordings");
    } else if (pathname === "/teacher/resources") {
      setHeading("Resources");
    } else if (pathname === "/teacher/my-account") {
      setHeading("My Account");
    } else if (pathname === "/teacher/settings") {
      setHeading("Settings");
    } else if (pathname === "/teacher/my-schedule") {
      setHeading("My Schedule");
    } else if (pathname === "/teacher/lesson-details") {
      setHeading("Lesson Details");
    } else if (pathname === "/teacher/payment") {
      setHeading("");
    } else if (pathname === "/teacher/message") {
      setHeading("Messages");
    }
  }, [pathname]);

  // For Student
  useEffect(() => {
    if (pathname === "/student/messages") {
      setHeading("Messages");
    } else if (pathname === "/student/payments") {
      setHeading("My Payment Details");
    } else if (pathname === "/student/recordings") {
      setHeading("Recordings");
    } else if (pathname === "/student/resources") {
      setHeading("Resources");
    } else if (pathname === "/student/my-account") {
      setHeading("My Account");
    } else if (pathname === "/student/settings") {
      setHeading("Settings");
    } else if (pathname === "/student/find-a-tutor") {
      setHeading("Available Tutors :");
    } else if (pathname === "/student/upcoming-lesson-details") {
      setHeading("My Lesson Details :");
    } else if (pathname === "/student/notfication") {
      setHeading("My Notifications :");
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname === "/admin/tutor-management") {
      setHeading("Tutor Management");
    } else if (pathname === "/admin/content-creation") {
      setHeading("Content Creation");
    } else if (pathname === "/admin/session-oversight") {
      setHeading("Session Oversight");
    } else if (pathname === "/admin/user-interaction") {
      setHeading("User Interaction");
    } else if (pathname === "/admin/users") {
      setHeading("Users Management");
    } else if (pathname === "/admin/insights-and-reporting") {
      setHeading("Insights And Reporting");
    } else if (pathname === "/admin/feedback-and-complaints") {
      setHeading("Feedback And Complaint");
    } else if (pathname === "/admin/find-a-tutor") {
      setHeading("Available Tutors :");
    } else if (pathname === "/admin/import-to-backup") {
      setHeading("Import to Backup");
    }
  }, [pathname]);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour <= 12) {
      setGreeting("Good Morning");
    } else if (currentHour > 12 && currentHour <= 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  // Use the existing notifications array for the notification count
  const notifications = [
    { id: 1, message: "Your lesson has been scheduled.", time: "10:30 AM" },
    { id: 2, message: "New message from your tutor.", time: "11:00 AM" },
    { id: 3, message: "Payment received.", time: "12:15 PM" },
    { id: 4, message: "Lesson reminder.", time: "1:00 PM" },
  ];

  // Effect to update lesson request count (simulated here)
  useEffect(() => {
    // For student path, set lesson request count
    if (pathname.startsWith("/student")) {
      // Example: fetchLessonRequestCount().then(count => setLessonRequestCount(count))
      setLessonRequestCount(4);
    }
  }, [pathname]);

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Cast the target to an HTMLDivElement
    const target = e.target as HTMLDivElement;

    // Close modal if background is clicked
    if (target.id === "modal-overlay") {
      setIsModalOpen(false);
    }
  };

  const handleNotificationClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.id === "notification-overlay") {
      setIsNotificationOpen(false);
    }
  };

  let buttonText = "";
  let buttonColor = "";
  let ModalContent = null;

  if (pathname === "/teacher") {
    buttonText = "Schedule a Lesson";
    buttonColor = "bg-[#42ABD1] text-white";
    ModalContent = ScheduleALesson;
  } else if (pathname === "/student") {
    buttonText = "Lesson Requests";
    buttonColor = "bg-[#A3D154] text-white";
    ModalContent = LessonRequests;
  }

  return (
    <div>
      {/* Notification Modal */}
      {isNotificationOpen && (
        <div
          id="notification-overlay"
          className="fixed inset-0 z-50 flex justify-center  items-center bg-opacity-50 backdrop-blur-sm overflow-hidden"
          onClick={handleNotificationClick}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-fit border border-gray-300">
            <h2 className="text-lg font-bold mb-4 text-primary">
              Notifications
            </h2>
            <ul className="space-y-2 mb-7">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className="p-2 w-full bg-gray-100 rounded-md shadow-sm flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div className=" bg-gray mr-5 rounded-full w-10 h-10"></div>
                    <div className=" text-nowrap">{notification.message}</div>
                  </div>
                  <div className="text-zinc-400 text-sm ml-5">
                    {notification.time}
                  </div>
                </li>
              ))}
            </ul>
            <Link
              href={
                pathname.startsWith("/teacher")
                  ? "/teacher/notfication"
                  : "/student/notfication"
              }
              className="bg-primary text-white py-2 px-4 rounded transition duration-300"
              onClick={() => setIsNotificationOpen(false)}
            >
              View all notifications
            </Link>
          </div>
        </div>
      )}
      {/* Dialog Modal */}
      {isModalOpen && ModalContent && (
        <div
          id="modal-overlay"
          className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-50 backdrop-blur-sm overflow-hidden"
          onClick={handleBackgroundClick}
        >
          <ModalContent onClose={() => setIsModalOpen(false)} />
        </div>
      )}

      <div className="flex justify-between items-center mt-3 w-full ">
        <div className="text-xs sm:text-lg lg:text-2xl">
          {pathname == "/teacher" ||
          pathname == "/student" ||
          pathname == "/student/onboarding" ||
          pathname == "/teacher/onboarding" ||
          pathname == "/admin" ? (
            <>
              {greeting} <span>Samantha</span>
            </>
          ) : (
            heading
          )}
        </div>
        <div className="flex items-center gap-2 sm:gap-4 translate-x-6">
          {!pathname.startsWith("/admin") &&
            ((pathname.startsWith("/teacher") && lastPart === "teacher") ||
              (pathname.startsWith("/student") && lastPart === "student")) && (
              <>
                {buttonText && (
                  <div className="relative">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className={`${buttonColor} px-3 py-2 sm:px-6 sm:py-3 rounded-md text-xs sm:text-base`}
                    >
                      {buttonText}
                    </button>
                    {/* Lesson Request Notification Badge */}
                    {pathname === "/student" && lessonRequestCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {lessonRequestCount}
                      </span>
                    )}
                  </div>
                )}
                <div className="relative">
                  <Bell
                    className="text-gray-600 w-8 h-8 sm:w-7 sm:h-7 cursor-pointer"
                    onClick={() => setIsNotificationOpen(true)}
                  />
                  {/* Notification Badge */}
                  {notifications.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </div>
              </>
            )}
          {pathname.startsWith("/teacher/onboarding") && (
            <div className="relative">
              <Bell className="text-gray-600 w-5 h-5 sm:w-6 sm:h-6" />
              {/* Notification Badge for onboarding */}
              {notifications.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
