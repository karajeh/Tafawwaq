"use client";
import React, { useState } from "react";
import Image from "next/image";
import AddNotesModal from "./AddNotesModal";
import CreateProgressReportModal from "./CreateProgressReportModal";
import St1 from "public/images/teacher/my-students/Student1.svg";
import St2 from "public/images/teacher/my-students/Student2.svg";
import St3 from "public/images/teacher/my-students/Student3.svg";
const StudentsTable = () => {
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);

  const students = [
    { name: "Daniel Berraldi", subject: "stats", avatar: St1 },
    { name: "Olivia James", subject: "Math", avatar: St2 },
    { name: "Michael Trippier", subject: "Eng", avatar: St3 },
    { name: "Michael Trippier", subject: "Comp", avatar: St3 },
    { name: "Michael Trippier", subject: "Comp", avatar: St3 },
    { name: "Michael Trippier", subject: "Comp", avatar: St3 },
    { name: "Justinus Bieber", subject: "Comp", avatar: St3 },
  ];

  return (
    <>
      {isNotesModalOpen && (
        <AddNotesModal onClose={() => setIsNotesModalOpen(false)} />
      )}
      {isProgressModalOpen && (
        <CreateProgressReportModal
          onClose={() => setIsProgressModalOpen(false)}
        />
      )}

      <h2 className="text-2xl font-semibold mt-10 mb-5 text-gray-800">
        All Students
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-lg mb-3 ">
        <table className="w-[97%] mx-auto table-auto my-5">
          {/* Table Header */}
          <thead>
            <tr className="uppercase text-sm leading-normal text-gray bg-lightGray">
              <th className="py-3 px-6 text-left font-medium rounded-l-2xl ">
                Student
              </th>
              <th className="py-3 px-6 text-left font-medium">Actions</th>
              <th className="py-3 px-6 text-left font-medium">Date</th>
              <th className="py-3 px-6 text-left font-medium">Time</th>
              <th className="py-3 px-6 text-left font-medium">Duration</th>
              <th className="py-3 px-6 text-left font-medium">Subject</th>
              <th className="py-3 px-6 text-left font-medium rounded-r-2xl">
                Notes
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-gray-700 text-sm font-light">
            {students.map((student, index) => (
              <tr
                key={index}
                // className="border-b border-gray-200 hover:bg-gray-50"
              >
                {/* Student Info */}
                <td className="py-3 px-6 flex items-center">
                  <Image
                    src={student.avatar}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full mr-3"
                    alt={student.name}
                  />
                  <span className="font-medium text-gray-800">
                    {student.name}
                  </span>
                </td>

                {/* Action Buttons */}
                <td className="py-3 px-6">
                  <div className="inline-flex space-x-2">
                    <button
                      onClick={() => setIsNotesModalOpen(true)}
                      className="border-2 border-sky_text text-sky_text  font-normal  px-3 py-1 rounded-md text-xs hover:bg-blue-50 transition whitespace-nowrap"
                    >
                      Add Notes
                    </button>
                    <button
                      onClick={() => setIsProgressModalOpen(true)}
                      className="border-2 border-sky_text  text-sky_text  font-normal  font-weight: 400 px-3 py-1 rounded-md text-xs hover:bg-blue-50 transition whitespace-nowrap"
                    >
                      Create Report
                    </button>
                  </div>
                </td>

                {/* Date */}
                <td className="py-3 px-6 whitespace-nowrap">
                  <span>12-03-24</span>
                </td>

                {/* Time */}
                <td className="py-3 px-6 whitespace-nowrap">
                  <span>12:23 pm</span>
                </td>

                {/* Duration */}
                <td className="py-3 px-6 whitespace-nowrap">
                  <span>3 hrs 12 min</span>
                </td>

                {/* Subject */}
                <td className="py-3 px-6">
                  <span className="text-gray-800">{student.subject}</span>
                </td>

                {/* Notes */}
                <td className="py-3 px-6">
                  <span className="text-gray-500">
                    Lorem ipsum dolor sit amet is a dummy text used in printing
                    industry...
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StudentsTable;
