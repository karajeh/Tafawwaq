"use client";
import React, { useEffect, useState } from "react";
import { format, startOfWeek, addDays } from "date-fns";
import {
  BookingDetails,
  getStudentBookings,
  getTutorBookings,
  isBookingAccessible,
} from "src/api/bookingService";
import { getVideoToken, validateRoom } from "src/api/videoService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Accordion from "../Accordion";

interface CalendarProps {
  userType: "student" | "teacher";
}

const Calendar: React.FC<CalendarProps> = ({ userType }) => {
  const [bookings, setBookings] = useState<BookingDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const selectedDate = new Date();
  useEffect(() => {
    const fetchWeeklyBookings = async () => {
      try {
        setIsLoading(true);
        // setError(null);

        const startDate = startOfWeek(selectedDate);
        const endDate = addDays(startDate, 7);

        const bookingsData =
          userType === "student"
            ? await getStudentBookings({ startDate, endDate })
            : await getTutorBookings({ startDate, endDate });

        setBookings(bookingsData);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        // setError("Failed to load bookings. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchWeeklyBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType]);

  // const fetchWeeklyBookings = async () => {
  //   if(isLoading){
  //     return;
  //   }
  //   try {
  //     setIsLoading(true);

  //     const startDate = startOfWeek(selectedDate);
  //     const endDate = addDays(startDate, 7);

  //     const bookingsData =
  //       userType === 'student'
  //         ? await getStudentBookings({ startDate, endDate })
  //         : await getTutorBookings({ startDate, endDate });

  //     setBookings(bookingsData);
  //   } catch (error) {
  //     console.error('Error fetching bookings:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const getDateForWeek = (dayOffset: number): number => {
    const today = new Date();
    const date = new Date(today.setDate(today.getDate() + dayOffset));
    return date.getDate();
  };

  const getFullDayName = (dayOffset: number): string => {
    const today = new Date();
    const date = new Date(today.setDate(today.getDate() + dayOffset));
    return date.toLocaleString("en-US", { weekday: "long" });
  };

  const handleJoinMeeting = async (booking: BookingDetails) => {
    // console.log(setSelectedDate);
    console.log(isLoading);
    // console.log(error);
    try {
      if (!isBookingAccessible(new Date(booking.startTime))) {
        toast.warning(
          "This lesson is only accessible 5 minutes before the start time"
        );
        return;
      }

      // Validate room first
      await validateRoom(booking.roomId);

      // Get token if room is valid
      const token = await getVideoToken();

      // Open meeting room in new window
      window.open(`/meeting-room/${booking.roomId}?token=${token}`, "_blank");
    } catch (error) {
      toast.error("Failed to join meeting");
      console.error("Error joining meeting:", error);
    }
  };
  return (
    <div className="bg-white rounded-lg lg:col-span-2 shadow-md overflow-hidden p-2 sm:p-4">
      <div className="flex justify-between items-center mb-2 sm:mb-4">
        <h3 className="text-base sm:text-lg font-semibold">Weekly Calendar</h3>
      </div>

      {/* Mobile Layout */}
      <div className="block sm:hidden">
        <div className="space-y-3">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => {
            const date = getDateForWeek(idx - new Date().getDay());
            const fullDayName = getFullDayName(idx - new Date().getDay());
            const bookingsForDay = bookings.filter(
              (booking) => new Date(booking.startTime).getDate() === date
            );

            return (
              <div key={idx} className="bg-gray-50 p-3 rounded-lg border">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-sm">{fullDayName}</h4>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {date}
                  </span>
                </div>

                <div className="space-y-2">
                  {/* Static demo lessons */}
                  <Accordion
                    accMainWrapper={"!h-auto"}
                    accHeaderClass={
                      "bg-[#A3D154] p-2 rounded-md hover:bg-[#92c142] transition-colors"
                    }
                    accBody={
                      <>
                        <div className="space-y-1">
                          <p className="text-sm">
                            <strong>Subject:</strong> Chemistry
                          </p>
                          <p className="text-xs text-gray-600">
                            Duration: 1 hour
                          </p>
                        </div>
                      </>
                    }
                    accheader={"01:20 PM"}
                    isOpen={false}
                    accBodyClass="-mt-[2px] px-2 pt-3 pb-2 bg-white/80 rounded-b-md"
                  />

                  {(idx === 2 || idx === 4) && (
                    <Accordion
                      accMainWrapper={"!h-auto"}
                      accHeaderClass={
                        "bg-[#A3D154] p-2 rounded-md hover:bg-[#92c142] transition-colors"
                      }
                      accBody={
                        <>
                          <div className="space-y-1">
                            <p className="text-sm">
                              <strong>Subject:</strong> Physics
                            </p>
                            <p className="text-xs text-gray-600">
                              Duration: 1 hour
                            </p>
                          </div>
                        </>
                      }
                      accheader={"01:20 PM"}
                      isOpen={false}
                      accBodyClass="-mt-[2px] px-2 pt-3 pb-2 bg-white/80 rounded-b-md"
                    />
                  )}

                  {/* Dynamic bookings */}
                  {bookingsForDay.map((booking) => (
                    <Accordion
                      key={booking._id}
                      accMainWrapper={"!h-auto"}
                      accHeaderClass={
                        "bg-[#A3D154] p-2 rounded-md hover:bg-[#92c142] transition-colors"
                      }
                      accBody={
                        <>
                          <div className="space-y-2">
                            <p className="text-sm font-medium">
                              Lesson Details
                            </p>
                            <button
                              onClick={() => handleJoinMeeting(booking)}
                              className="w-full text-xs bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600 transition-colors"
                            >
                              Join Meeting
                            </button>
                          </div>
                        </>
                      }
                      accheader={format(new Date(booking.startTime), "h:mm a")}
                      isOpen={false}
                      accBodyClass="-mt-[2px] px-2 pt-3 pb-2 bg-white/80 rounded-b-md"
                    />
                  ))}

                  {bookingsForDay.length === 0 &&
                    idx !== 0 &&
                    idx !== 2 &&
                    idx !== 4 && (
                      <p className="text-xs text-gray-500 italic">
                        No lessons scheduled
                      </p>
                    )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop Layout - UNTOUCHED */}
      <div className="hidden sm:block">
        {/* Calendar Days Header */}
        <div className="grid grid-cols-7 text-center text-xs sm:text-sm text-gray-500 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => {
            const date = getDateForWeek(idx - new Date().getDay());
            const fullDayName = getFullDayName(idx - new Date().getDay());
            return (
              <div key={idx} className="py-1 sm:py-2">
                <p className="font-semibold text-xs sm:text-sm">{date}</p>
                <p className="text-[10px] sm:text-sm truncate">{fullDayName}</p>
              </div>
            );
          })}
        </div>

        {/* Calendar Grid */}
        <div className="mt-2 sm:mt-4 grid grid-cols-1 sm:grid-cols-7 gap-1 sm:gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => {
            const date = getDateForWeek(idx - new Date().getDay());
            const bookingsForDay = bookings.filter(
              (booking) => new Date(booking.startTime).getDate() === date
            );

            return (
              <div
                key={idx}
                className="bg-opacity-50 bg-gray-300 p-2 sm:p-4 rounded-lg shadow-md h-[100px] sm:h-[300px]"
              >
                <div className="h-full flex flex-col justify-center items-center">
                  {/* <p className="text-sm sm:text-lg font-semibold">{day}</p> */}
                  <div>
                    <Accordion
                      accMainWrapper={"!h-auto mb-1"}
                      accHeaderClass={"bg-[#A3D154] p-1 rounded-md"}
                      accBody={
                        <>
                          <ul>
                            <li className="text-sm">
                              <strong>Subject:</strong> Chemistry
                            </li>
                          </ul>
                        </>
                      }
                      accheader={"01:20 pm"}
                      isOpen={true}
                      accBodyClass="-mt-[3px] px-1 pt-2 pb-1"
                    />

                    {idx === 2 || idx === 4 ? (
                      <>
                        <Accordion
                          accMainWrapper={"!h-auto mb-1"}
                          accHeaderClass={"bg-[#A3D154] p-1 rounded-md"}
                          accBody={
                            <>
                              <ul>
                                <li className="text-sm">
                                  <strong>Subject:</strong> Physics
                                </li>
                              </ul>
                            </>
                          }
                          accheader={"01:20 pm"}
                          isOpen={true}
                          accBodyClass="-mt-[3px] px-1 pt-2 pb-1"
                        />
                      </>
                    ) : null}
                  </div>

                  {bookingsForDay.map((booking) => (
                    <div
                      key={booking._id}
                      className="text-[10px] sm:text-xs bg-opacity-60 p-1 sm:p-2 rounded-lg mt-2 w-full max-w-[200px]"
                      style={{ backgroundColor: "#a2d154" }}
                    >
                      <p className="font-semibold">
                        {booking.status === "scheduled"
                          ? "Scheduled Lesson"
                          : "Completed Lesson"}
                      </p>
                      <p>
                        {format(new Date(booking.startTime), "h:mm a")} -{" "}
                        {format(new Date(booking.endTime), "h:mm a")}
                      </p>
                      <button onClick={() => handleJoinMeeting(booking)}>
                        Join Meeting
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
