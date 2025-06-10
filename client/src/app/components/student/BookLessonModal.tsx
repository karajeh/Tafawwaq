"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../admin-panel/ui/button";
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "../admin-panel/ui/dropdown";
import { NavbarItem } from "../admin-panel/ui/navbar";
import BookDatePicker from "./BookDatePicker";

const BookLessonModal = ({
  handleClose,
  openBookNow,
}: {
  handleClose: () => void;
  openBookNow: (isOpen: boolean) => void;
  onTimeChange: (time: string) => void;
}) => {
  const [startTime, setStartTime] = useState("09:00 AM");
  const [endTime, setEndTime] = useState("10:00 AM");
  const [selectedHours, setSelectedHours] = useState(1);
  const [date, setDate] = useState("");
  const [localTimeZone, setLocalTimeZone] = useState("");

  useEffect(() => {
    // Get the user's local time zone
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setLocalTimeZone(timeZone);
  }, []);

  // Calculate the number of hours between start and end time
  useEffect(() => {
    if (startTime && endTime) {
      const start = convertTimeToMinutes(startTime);
      const end = convertTimeToMinutes(endTime);

      if (end > start) {
        const hours = Math.ceil((end - start) / 60);
        setSelectedHours(hours);
      } else {
        // If end time is before start time, reset to 1 hour
        setSelectedHours(1);
        // Auto-adjust end time to be 1 hour after start time
        setEndTime(getNextHour(startTime));
      }
    }
  }, [startTime, endTime]);

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

    const formattedDate = `${yyyy}-${mm}-${dd}`;
    setDate(formattedDate);
  }, []);

  // Convert time string (e.g., "09:00 AM") to minutes since midnight
  const convertTimeToMinutes = (timeStr: string) => {
    const [time, period] = timeStr.split(" ");
    const [hoursStr, minutesStr] = time.split(":");

    let hours = Number(hoursStr);
    const minutes = Number(minutesStr);

    if (period === "PM" && hours < 12) {
      hours += 12;
    }
    if (period === "AM" && hours === 12) {
      hours = 0;
    }

    return hours * 60 + minutes;
  };

  // Get the next hour from a given time string
  const getNextHour = (timeStr: string) => {
    const [time, period] = timeStr.split(" ");
    const [h, m] = time.split(":").map(Number);

    let hours = h;
    const minutes = m;

    hours += 1;

    if (hours === 12 && period === "AM") {
      return `${hours}:${minutes.toString().padStart(2, "0")} PM`;
    } else if (hours > 12) {
      return `${hours - 12}:${minutes.toString().padStart(2, "0")} PM`;
    }

    return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  const handleStartTimeChange = (time: string) => {
    setStartTime(time);
    // Auto-adjust end time to be 1 hour after start time
    setEndTime(getNextHour(time));
  };

  const handleEndTimeChange = (time: string) => {
    setEndTime(time);
  };

  // const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedDate = new Date(e.target.value);
  //   const today = new Date();
  //   const dateToday = new Date();
  //   const maxDate = new Date(dateToday.setDate(dateToday.getDate() + 7));
  //   if (selectedDate.getDate() < today.getDate()) {
  //     setDateError("Date cannot be in the past.");
  //     setDate("");
  //   } else if (selectedDate > maxDate) {
  //     setDateError("Date cannot be more than 7 days in the future.");
  //     setDate("");
  //   } else {
  //     setDateError("");
  //     setDate(e.target.value);
  //   }
  // };

  // Calculate total cost based on selected hours
  const hourlyRate = 32; // AED per hour
  const serviceFee = 20; // AED
  const totalHoursCost = selectedHours * hourlyRate;
  const totalCost = totalHoursCost + serviceFee;

  return (
    <div className="">
      <div className="flex flex-col mb-5">
        <h2 className="text-xl font-semibold">Book a Lesson</h2>
        <p className="text-gray-600 text-sm">
          Please update the following fields to book a lesson.
        </p>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-full h-px "></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="block text-sm font-medium mb-2">
            Select preferred date & time
            <p className="ml-10">
              <span className="text-gray">Your Time Zone: {localTimeZone}</span>
            </p>
          </label>

          <div className="relative pb-2">
            <BookDatePicker date={date} setDate={setDate} />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="block text-sm font-medium">Time Range</label>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <label className="text-xs text-gray-500">Start Time</label>
                <Dropdown>
                  <DropdownButton
                    className="flex rounded-xl w-full border border-slate"
                    as={NavbarItem}
                    onClick={(e: { stopPropagation: () => unknown }) =>
                      e.stopPropagation()
                    }
                  >
                    <span className="flex w-full justify-center gap-2 cursor-pointer">
                      {ClockIcon}
                      {startTime}
                    </span>
                  </DropdownButton>
                  <TimeDropdownMenu
                    anchor="bottom end"
                    onTimeChange={handleStartTimeChange}
                  />
                </Dropdown>
              </div>
              <span className="text-gray-500">to</span>
              <div className="flex-1">
                <label className="text-xs text-gray-500">End Time</label>
                <Dropdown>
                  <DropdownButton
                    className="flex rounded-xl w-full border border-slate"
                    as={NavbarItem}
                    onClick={(e: { stopPropagation: () => unknown }) =>
                      e.stopPropagation()
                    }
                  >
                    <span className="flex w-full justify-center gap-2 cursor-pointer">
                      {ClockIcon}
                      {endTime}
                    </span>
                  </DropdownButton>
                  <TimeDropdownMenu
                    anchor="bottom end"
                    onTimeChange={handleEndTimeChange}
                    startTime={startTime}
                  />
                </Dropdown>
              </div>
            </div>
          </div>

          <div className="mt-2">
            <label className="block text-sm font-medium mb-1">
              Selected Hours
            </label>
            <div className="p-2 bg-gray-50 rounded-md border border-gray-200">
              <p className="text-gray-700">
                {selectedHours} hour{selectedHours > 1 ? "s" : ""} ({startTime}{" "}
                - {endTime})
              </p>
            </div>
          </div>

          <TextAreaField label="Description" placeholder="I need help for..." />
        </div>

        <div className="md:pl-3">
          <div className="text-sm text-gray-600 ">
            <CostSummaryItem
              label="Selected hours"
              value={`${selectedHours}`}
            />
            <CostSummaryItem
              label="Total hours cost"
              value={`AED ${totalHoursCost}`}
            />
            <CostSummaryItem label="Service fee" value={`AED ${serviceFee}`} />

            <div className="flex justify-between mt-4">
              <p className="font-semibold text-lg text-gray-600 ">Total Cost</p>
              <p className="text-xl text-gray-600 ">AED {totalCost}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between w-full gap-3">
        <Button
          onClick={handleClose}
          outline
          className="bg-transparent border border-slate !text-[#111111af] sm:py-2 px-4 w-full rounded-md"
        >
          Cancel
        </Button>
        <Button
          color="button_primary"
          onClick={() => openBookNow(true)}
          className="bg-admin_button text-white sm:py-2 px-4 w-full rounded-md"
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default BookLessonModal;

const TextAreaField: React.FC<{
  label: string;
  placeholder: string;
  rows?: number;
}> = ({ label, placeholder, rows = 6 }) => {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium mb-2">{label}</label>
      <textarea
        rows={rows}
        placeholder={placeholder}
        className="w-full px-3 py-2  rounded-md border border-slate text-sm"
      ></textarea>
    </div>
  );
};

const CostSummaryItem: React.FC<{
  label: string;
  value: string;
}> = ({ label, value }) => {
  return (
    <div className="flex justify-between text-gray-600  text-17">
      <p className="font-medium mb-2">{label}</p>
      <p className="mb-4">{value}</p>
    </div>
  );
};

function TimeDropdownMenu({
  anchor,
  onTimeChange,
  startTime,
}: {
  anchor: "top start" | "bottom end";
  onTimeChange: (time: string) => void;
  startTime?: string;
}) {
  const allTimes = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
  ];

  // If startTime is provided, only show times after the start time
  const times = startTime
    ? allTimes.filter((time) => {
        const startMinutes = convertTimeStringToMinutes(startTime);
        const currentMinutes = convertTimeStringToMinutes(time);
        return currentMinutes > startMinutes;
      })
    : allTimes;

  // Helper function to convert time string to minutes for comparison
  function convertTimeStringToMinutes(timeStr: string) {
    const [time, period] = timeStr.split(" ");
    const [h, m] = time.split(":").map(Number);

    let hours = h;
    const minutes = m;

    if (period === "PM" && hours < 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    return hours * 60 + minutes;
  }

  return (
    <DropdownMenu
      className="w-[173px] max-h-[300px] overflow-y-auto"
      anchor={anchor}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()} // Stop click propagation
    >
      {times.map((time) => (
        <React.Fragment key={time}>
          <DropdownItem
            className="dropdown-class"
            key={time}
            onClick={() => onTimeChange(time)}
          >
            <DropdownLabel>{time}</DropdownLabel>
          </DropdownItem>
          <DropdownDivider />
        </React.Fragment>
      ))}
    </DropdownMenu>
  );
}

const ClockIcon = (
  <svg
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.4993 5V10L13.8327 11.6667M18.8327 10C18.8327 14.6024 15.1017 18.3333 10.4993 18.3333C5.89698 18.3333 2.16602 14.6024 2.16602 10C2.16602 5.39763 5.89698 1.66667 10.4993 1.66667C15.1017 1.66667 18.8327 5.39763 18.8327 10Z"
      stroke="#344054"
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
