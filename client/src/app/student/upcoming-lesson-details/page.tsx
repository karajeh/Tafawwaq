"use client";
import { Text } from "../../components/admin-panel/ui/text";
import { Button } from "../../components/admin-panel/ui/button";
import Image from "next/image";
// import StudentNavbar from "../find-a-tutor/student-navbar";sdi km
import RecordIcon from "../../components/student/RecordIcon";
import MessageIcon from "../../components/student/MessageIcon";
import { MdArrowBack } from "react-icons/md";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [deleteConfirmationModal, setDeleteConfirmationModal] =
    useState<boolean>(false);
  const handleCloseConfirmaionModal = () => {
    setDeleteConfirmationModal(false);
  };
  return (
    <div className="flex flex-col gap-5 p-5">
      {/* <StudentNavbar /> */}
      <Link href={"/student"}>
        <MdArrowBack className="text-2xl" />
      </Link>
      <div className="shadow-md p-6 relative overflow-hidden">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-2xl">Biology</h3>
            <div className="flex text-center gap-2">
              <Button
                color="button_primary"
                className="bg-admin_button text-white md:py-2.5"
              >
                <RecordIcon />
                Join the lesson
              </Button>
              <Button
                onClick={() => {
                  setDeleteConfirmationModal(true);
                }}
                color="button_primary"
                className="bg-red-500 text-white md:py-2.5"
              >
                <RecordIcon />
                Cancel
              </Button>
            </div>
          </div>
          <ul className="list-disc pl-5 text-[#666666]">
            <li>Respiratory system</li>
            <li>Digestive system</li>
          </ul>
          <p className="text-[#6E6E76]">
            Lorem Ipsum is a dummy text being used to show the description of
            the problem, student needs help with
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            {TimeInfos.map((timeInfo, index) => (
              <div key={index}>
                {" "}
                {/* Added key prop */}
                <div className="flex items-center gap-1.5">
                  <ClockIcon />
                  <Text>{timeInfo}</Text>
                </div>
              </div>
            ))}
          </div>
          <TeacherInfo
            avatar="https://images.unsplash.com/photo-1727093267255-e9b31b2b35ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2MXx8fGVufDB8fHx8fA%3D%3D"
            teacherName="John Doe"
            teacherUsername="@john_doe121"
          />
        </div>
        {deleteConfirmationModal && (
          <>
            <div className="w-full h-full absolute top-0 left-0 bg-black opacity-70 flex items-center justify-center z-10" />
            <div className="w-full h-full absolute top-0 left-0 bg-transparent flex items-center justify-center z-20">
              <div className="w-[70%] flex flex-col items-center gap-5 p-8 bg-white rounded-lg">
                <h3 className="text-base ">
                  Are you sure you want to cancel this lesson?
                </h3>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={handleCloseConfirmaionModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors border"
                  >
                    No
                  </button>
                  <button
                    onClick={handleCloseConfirmaionModal}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors flex items-center gap-1"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const TimeInfos = ["Monday, 03-20-2024", "2 hrs 45 min", "02:30 PM"];

const ClockIcon = () => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 0C4.05 0 0 4.05 0 9C0 13.95 4.05 18 9 18C13.95 18 18 13.95 18 9C18 4.05 13.95 0 9 0ZM9 2.25C12.735 2.25 15.75 5.265 15.75 9C15.75 12.735 12.735 15.75 9 15.75C5.265 15.75 2.25 12.735 2.25 9C2.25 5.265 5.265 2.25 9 2.25ZM7.875 4.5V9.495L8.235 9.7875L9.36 10.9125L10.125 11.7675L11.745 10.1475L10.89 9.3825L10.125 8.6175V4.545H7.875V4.5Z"
        fill="#A3D154"
      />
    </svg>
  );
};

const TeacherInfo = ({
  teacherName = "John Doe",
  teacherUsername = "@john_doe121",
  avatar = "https://images.unsplash.com/photo-1727093267255-e9b31b2b35ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2MXx8fGVufDB8fHx8fA%3D%3D",
}) => {
  return (
    <div className="flex items-center gap-3 w-full justify-center md:justify-start pl-3 md:pl-0">
      <Image
        width={40}
        height={40}
        alt="Avatar"
        src={avatar}
        className="w-10 h-10 rounded-full shrink-0"
      />
      <div>
        <p className="text-[#555555] font-normal">{teacherName}</p>
        <p className="text-sm font-medium text-[#344054]">{teacherUsername}</p>
      </div>
      <button className="ml-8">
        <MessageIcon />
      </button>
    </div>
  );
};
