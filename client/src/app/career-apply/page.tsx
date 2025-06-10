import React from "react";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Join our Team - Tafawwaq Tutoring`,
  };
}
export default function CareerApplyPage() {
  return (
    <div>
      <Hero />
      <FormApply />
    </div>
  );
}

import { IoLocationSharp } from "react-icons/io5";
import { TbClockHour4Filled } from "react-icons/tb";
import { MdOutlineWork } from "react-icons/md";

function Hero() {
  return (
    <div>
      <div className=" bg-career_apply_bg py-10 mt-20">
        <div className=" max-w-screen-lg m-auto">
          <div className=" text-header flex items-center flex-col gap-4 ">
            <h1 className=" text-3xl md:text-5xl font-semibold  ">
              Computer teacher
            </h1>
            <div className=" flex  gap-4 flex-wrap font-semibold text-sm">
              <p className=" flex items-center gap-1">
                <IoLocationSharp className=" text-secondary" />
                <span>Remote</span>
              </p>
              <p className=" flex items-center gap-1">
                <MdOutlineWork className=" text-secondary" />
                <span>Full-time</span>
              </p>
              <p className=" flex items-center gap-1">
                <TbClockHour4Filled className=" text-secondary" />
                <span>Posted 8 hours ago</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" max-w-screen-md m-auto py-20 px-4">
        <OverView />
      </div>
    </div>
  );
}

function OverView() {
  return (
    <div>
      <div className=" mb-10">
        <div className=" font-semibold text-header text-xl mb-4">
          Role overview:
        </div>
        <p className="leading-relaxed font-medium text-[#707070] opacity-80 text-sm ">
          We are seeking a dedicated and knowledgeable IT Tutor to join our
          team. The IT Tutor will be responsible for providing expert
          instruction in various IT subjects, helping students to develop strong
          technical skills, and preparing them for success in their academic and
          professional careers.
        </p>
      </div>

      <div className=" mb-8">
        <div className=" font-semibold text-header text-xl mb-4">
          Roles and Responsibilities:
        </div>
        <div className=" mb-2 font-semibold text-[#707070]">
          Instruction and Teaching:
        </div>
        <ul className=" pl-4 list-disc flex flex-col gap-2 leading-relaxed text-[#707070] opacity-80 text-sm ">
          <li>
            Deliver engaging and effective lessons in IT-related subjects such
            as programming, networking, cybersecurity, and database management.
          </li>
          <li>
            Use a variety of teaching methods to accommodate different learning
            styles and ensure all students grasp the material.
          </li>
          <li>
            Provide personalized instruction and tutoring sessions to help
            students overcome challenges and improve their understanding of IT
            concepts
          </li>
          <li>
            Prepare lesson plans, assignments, and assessments that align with
            curriculum standards
          </li>
        </ul>
      </div>

      <div>
        <div className=" font-semibold text-header text-xl mb-4">
          Requirements:
        </div>
        <div className=" mb-2 font-semibold text-[#707070]">Education:</div>
        <ul className=" pl-4 list-disc flex flex-col gap-2 leading-relaxed text-[#707070] opacity-80 text-sm ">
          <li>
            A Bachelor’s degree in Information Technology, Computer Science, or
            a related field
          </li>
          <li>
            A Bachelor’s degree in Information Technology, Computer Science, or
            a related field
          </li>
        </ul>
        <div className=" mb-2 font-semibold text-[#707070]">Experience:</div>
        <ul className=" pl-4 list-disc flex flex-col gap-2 leading-relaxed text-[#707070] opacity-80 text-sm ">
          <li>Proven experience in IT tutoring, teaching, or training.</li>
          <li>
            Practical experience in IT fields such as software development,
            networking, cybersecurity, or systems administration.
          </li>
        </ul>
      </div>
    </div>
  );
}

function FormApply() {
  return (
    <div>
      <div className=" bg-background_blue text-3xl text-header px-4 py-6 text-center font-semibold">
        Apply For This Job
      </div>
      <div className=" max-w-screen-md m-auto py-20 px-4">
        <form className=" p-6 bg-white rounded-md">
          {/* First Name and Last Name */}
          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label
                className="block text-[#66797c] font-bold mb-2"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                className="w-full px-3 py-2 border border-gray/35 rounded-md focus:outline-none  "
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter First Name"
              />
            </div>
            <div className="w-1/2">
              <label
                className="block text-[#66797c] font-bold mb-2"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className="w-full px-3 py-2 border border-gray/35 rounded-md focus:outline-none  "
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter Last Name"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              className="block text-[#66797c] font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-3 py-2 border border-gray/35 rounded-md focus:outline-none  "
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
            />
          </div>
          <div className=" flex gap-4 mb-4 ">
            <div className="w-1/2">
              <label
                className="block text-[#66797c] font-bold mb-2"
                htmlFor="gender"
              >
                Gender
              </label>
              <select
                className="w-full px-3 py-2 border border-gray/35 rounded-md focus:outline-none  "
                id="gender"
                name="gender"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Location */}
            <div className="w-1/2">
              <label
                className="block text-[#66797c] font-bold mb-2"
                htmlFor="location"
              >
                Location
              </label>
              <input
                className="w-full px-3 py-2 border border-gray/35 rounded-md focus:outline-none  "
                type="text"
                id="location"
                name="location"
                placeholder="Enter Location"
              />
            </div>
          </div>
          {/* Gender */}

          {/* Target Base Salary */}
          <div className="mb-4">
            <label
              className="block text-[#66797c] font-bold mb-2"
              htmlFor="salary"
            >
              What is your target base salary for this role?{" "}
              <span className=" text-red-600">*</span>
            </label>
            <input
              className="w-full px-3 py-2 border border-gray/35 rounded-md focus:outline-none  "
              type="text"
              id="salary"
              name="salary"
              placeholder="Enter Target Base Salary"
            />
          </div>

          {/* File Upload */}
          <div className="mb-4">
            <label
              className="block text-[#66797c] font-bold mb-2"
              htmlFor="file"
            >
              Resume <span className=" text-red-600">*</span>
            </label>
            <p className=" text-[#a1a1a1]">
              Attach resume as .pdf, .doc, .docx, .odt, .txt, or .rtf (limit
              5MB) or paste resume
            </p>
            <button
              type="button"
              className=" font-bold py-2 px-4  bg-[#efefef] text-[#707070] mt-4 rounded-md hover:bg-[#dcdcdc] hover:scale-105 transition duration-300 ease-in-out"
            >
              Choose File
            </button>
          </div>
        </form>
        <button className=" mt-8 flex mx-auto bg-primary px-10 md:px-20 text-white text-sm py-3 rounded-md hover:bg-primary-dark hover:scale-105 active:scale-95 transition duration-300 ease-in-out">
          Apply for the position
        </button>
      </div>
    </div>
  );
}
