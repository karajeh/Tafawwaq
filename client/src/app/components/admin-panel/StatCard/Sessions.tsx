"use client";

import AdminContainer from "../ui/admin-container";
import { Text } from "../ui/text";
import AdminTable from "../ui/admin-table";
import Image from "next/image";
import Link from "next/link";

export default function Sessions() {
  return (
    <div className="flex flex-col gap-5 mt-[20px]">
      <AdminContainer
        rightComponent={
          <Link href="/admin/sessions/active" className="underline text-text_primary hover:opacity-75 transition-opacity duration-200">
            View all
          </Link>
        }
        title="Total Active Sessions"
      >
        <AdminTable data={tableDataCert} format={tableFormatCert} />
      </AdminContainer>
    </div>
  );
}

const ActionsButton = () => {
  return (
    <div className="flex items-center gap-3 w-full justify-center">
      <button className="border border-[#A3D154] text-[#A3D154] px-3 py-1 rounded transition-transform transform hover:scale-105 active:scale-95">
        Join Session
      </button>
    </div>
  );
};

// Reusable component for both Tutor and Student profiles
const ProfileDisplayTutor = ({ ...data }) => {
  const { name, avatar, department } = data.tutor;
  return (
    <div className="flex items-center gap-3 w-full justify-center md:justify-start pl-3 md:pl-0">
      <Image
        width={40}
        height={40}
        alt="Avatar"
        src={avatar}
        className="w-10 h-10 rounded-lg shrink-0"
      />
      <div>
        <p className=" text-[#555555] font-normal">{name}</p>
        <p className=" text-sm font-medium text-[#344054]">{department}</p>
      </div>
    </div>
  );
};

const ProfileDisplayStudent = ({ ...data }) => {
  const { name, avatar, department } = data.student;
  return (
    <div className="flex items-center gap-3 w-full justify-center md:justify-start pl-3 md:pl-0">
      <Image
        width={40}
        height={40}
        alt="Avatar"
        src={avatar}
        className="w-10 h-10 rounded-lg shrink-0"
      />
      <div>
        <p className=" text-[#555555] font-normal">{name}</p>
        <p className=" text-sm font-medium text-[#344054]">{department}</p>
      </div>
    </div>
  );
};

// Define the table format and specify the component for each field
const tableFormatCert = [
  {
    key: "totalHourCompleted",
    title: "#ID",
    component: Text,
    showSort: true,
    onclick: () => console.log("clicked"),
  },
  {
    key: "tutor",
    title: "Tutor Name",
    component: ProfileDisplayTutor,
    showSort: true,
    onclick: () => console.log("clicked"),
  },
  {
    key: "student",
    title: "Student Name",
    component: ProfileDisplayStudent,
    showSort: true,
    onclick: () => console.log("clicked"),
  },
  {
    key: "ratings",
    title: "Tutor Ratings",
    component: Text,
    showSort: true,
    onclick: () => console.log("clicked"),
  },
  {
    key: "actions",
    title: "Actions",
    component: ActionsButton,
    showSort: false,
    onclick: () => console.log("clicked"),
  },
];

export type TableFormatCert = (typeof tableFormatCert)[number];

// Mock data to include student information
const tableDataCert = [
  {
    tutor: {
      name: "John Doe",
      avatar:
        "https://images.unsplash.com/photo-1727093267255-e9b31b2b35ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2MXx8fGVufDB8fHx8fA%3D%3D",
      department: "Mathematics",
    },
    student: {
      name: "Jane Smith",
      avatar:
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1MHx8fGVufDB8fHx8fA%3D%3D",
      department: "Science",
    },
    totalHourCompleted: "100",
    ratings: "4.5",
  },
  // Additional data objects
];

export type TableDataCert = (typeof tableDataCert)[number];