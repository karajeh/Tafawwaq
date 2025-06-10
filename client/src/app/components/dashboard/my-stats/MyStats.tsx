"use client";
import {
  BadgeDollarSign,
  GraduationCap,
  Home,
  ShoppingBag,
} from "lucide-react";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  Tooltip,
} from "recharts";

const subjectData = [
  { subject: "Math", totalLessons: 70 },
  { subject: "Eng", totalLessons: 40 },
  { subject: "Comp", totalLessons: 75 },
  { subject: "Acc", totalLessons: 85 },
  { subject: "His", totalLessons: 65 },
  { subject: "Eng", totalLessons: 70 },
  { subject: "Eng", totalLessons: 40 },
  { subject: "Math", totalLessons: 60 },
  { subject: "Eng", totalLessons: 85 },
  { subject: "His", totalLessons: 65 },
  { subject: "Urdu", totalLessons: 60 },
  { subject: "Isl", totalLessons: 50 },
];
const studentsFeedback = [
  {
    name: "Daniel Berraidi",
    rating: 4.0,
    feedback:
      "lorem ipsum dolor sit amet is a dummy text used in printing industry...",
  },
  {
    name: "Daniel Berraidi",
    rating: 3.0,
    feedback:
      "lorem ipsum dolor sit amet is a dummy text used in printing industry...",
  },
];
const peakHoursData = [
  { day: "Mon", noOfLessons: 35, days: 60 },
  { day: "Tues", noOfLessons: 25, days: 40 },
  { day: "Wed", noOfLessons: 55, days: 35 },
  { day: "Thur", noOfLessons: 35, days: 52 },
  { day: "Fri", noOfLessons: 15, days: 20 },
];

export default function StatsDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="p-4">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-md p-4">
          <div className="flex items-start justify-between">
            <div>
              <ShoppingBag />
              <div className="text-md mt-4 leading-tight">
                Total Number of <br />
                Sessions Conducted
              </div>
            </div>
            <div className="flex flex-col items-center h-full justify-center">
              <div className="text-[#42ABD1] text-2xl mb-2">2,714</div>
              <div className="mt-2">
                <svg width="40" height="20" viewBox="0 0 40 20">
                  <path
                    d="M0 10 L10 5 L20 15 L30 8 L40 12"
                    stroke="#ff4d4f"
                    fill="none"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-4">
          <div className="flex items-start justify-between">
            <div>
              <BadgeDollarSign />
              <div className="text-md mt-4 leading-tight">
                Sessions Conducted <br />
                This Week:
              </div>
            </div>
            <div className="flex flex-col items-center h-full justify-center">
              <div className="text-[#42ABD1] text-2xl mb-2">$32,821</div>
              <div className="mt-2">
                <svg width="40" height="20" viewBox="0 0 40 20">
                  <path
                    d="M0 10 L10 5 L20 15 L30 8 L40 12"
                    stroke="#90EE90"
                    fill="none"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-4">
          <div className="flex items-start justify-between">
            <div>
              <Home />
              <div className="text-md mt-4 leading-tight">
                Average Session <br />
                Duration:
              </div>
            </div>
            <div className="flex flex-col items-center h-full justify-center">
              <div className="text-[#42ABD1] text-2xl mb-2">75%</div>
              <div className="mt-2">
                <svg width="40" height="20" viewBox="0 0 40 20">
                  <path
                    d="M0 10 L10 5 L20 15 L30 8 L40 12"
                    stroke="#90EE90"
                    fill="none"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid - Modified Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subject Statistics */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-gray-700 font-medium mb-4 sm:mb-0">
              Subject-Specific Statistics:
            </h2>
            <div className="flex flex-wrap items-center gap-4 sm:gap-8">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#42ABD1]"></div>
                <span className="text-sm text-gray-600">Total Lessons</span>
              </div>
              <select className="rounded-lg px-3 py-1.5 text-sm text-gray-600 outline-none">
                <option>Last 12 Month</option>
              </select>
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={subjectData}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                barCategoryGap={20}
              >
                <CartesianGrid strokeDasharray="1" vertical={false} />
                <XAxis dataKey="subject" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Bar
                  dataKey="totalLessons"
                  fill="#42ABD1"
                  radius={[5, 5, 5, 5]}
                  stackId="a"
                  barSize={10}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Peak Hours Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-gray-700 font-medium mb-6">
            Peak Hours And days
          </h2>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#42ABD1]"></div>
              <span className="text-sm text-gray-600">Number of Lessons</span>
            </div>
          </div>
          <div className="h-[250px] ">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={peakHoursData}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                barCategoryGap={20}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <Tooltip cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Bar
                  dataKey="noOfLessons"
                  fill="#42ABD1"
                  radius={[0, 0, 5, 5]}
                  stackId="a"
                  barSize={50}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Average Session Duration */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-gray-700 font-medium">
              Average Session Duration
            </h2>
            <button className="text-gray-400">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </button>
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="relative">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Accounting</span>
                  <span className="text-gray-600">1.5 hours</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full">
                  <div
                    className="h-full bg-[#A3D154] rounded-full"
                    style={{
                      width: i === 0 ? "100%" : i === 1 ? "100%" : "60%",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rating Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 flex items-center justify-start">
          <div>
            <div className="mb-4">
              <GraduationCap className="text-[#42ABD1] font-light" size={60} />
            </div>
            <h3 className="font-medium text-xl text-[#3F3F44] mb-2">
              Average Rating:
            </h3>
            <div className="flex items-center gap-2">
              <div className="flex tracking-widest text-2xl text-yellow-400 mb-2">
                {"★".repeat(5)}
              </div>
              <div className="text-md text-[#1C1D1D] font-medium mb-1">4.8</div>
            </div>
            <button
              className="bg-[#42ABD1] text-white px-3.5 py-1 rounded-lg"
              onClick={openModal}
            >
              View Detail
            </button>
          </div>
          {isModalOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center"
              onClick={closeModal}
            >
              <div
                className=" p-8 rounded-md text-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="overflow-x-auto shadow-lg rounded-lg mb-3 ">
                  <table className="w-[97%] mx-auto table-auto my-5">
                    {/* Table Header */}
                    <thead>
                      <tr className="uppercase text-sm leading-normal text-gray bg-lightGray">
                        <th className="py-3 px-6 text-center font-medium ">
                          Student
                        </th>
                        <th className="py-3 px-6 text-center font-medium">
                          Rating
                        </th>
                        <th className="py-3 px-6 text-center   font-medium">
                          Feedback
                        </th>
                      </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="text-gray-700 bg-white text-sm font-light">
                      {studentsFeedback.map((student, index) => (
                        <tr
                          key={index}
                          // className="border-b border-gray-200 hover:bg-gray-50"
                        >
                          {/* Student Info */}
                          <td className="py-3 px-6 flex items-center">
                            <span className="font-medium text-gray-800">
                              {student.name}
                            </span>
                          </td>

                          {/* Date */}
                          <td className="py-3 px-6 whitespace-nowrap">
                            <span>{student.rating.toFixed(1)}</span>
                          </td>

                          {/* Notes */}
                          <td className="py-3 px-6">
                            <span className="text-gray-500">
                              {student.feedback}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
