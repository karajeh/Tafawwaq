"use client";

import AdminContainer from "../../../components/admin-panel/ui/admin-container";
import { Text } from "../../../components/admin-panel/ui/text";
import AdminTable from "../../../components/admin-panel/ui/admin-table";
import Image from "next/image";

export default function Sessions() {
  return (
    <div className="flex flex-col gap-5 mt-[20px]">
      <AdminContainer
        rightComponent={<></>
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

const ProfileDisplay = ({ name, avatar, department }: { name: string; avatar: string; department: string }) => {
  return (
    <div className="flex items-center gap-3 w-full justify-center md:justify-start pl-3 md:pl-0">
      <Image width={40} height={40} alt="Avatar" src={avatar} className="w-10 h-10 rounded-lg shrink-0" />
      <div>
        <p className=" text-[#555555] font-normal">{name}</p>
        <p className=" text-sm font-medium text-[#344054]">{department}</p>
      </div>
    </div>
  );
};

const tableFormatCert = [
  { key: "id", title: "#ID", component: Text, showSort: true },
  { key: "tutor", title: "Tutor", component: ProfileDisplay, showSort: true },
  { key: "student", title: "Student", component: ProfileDisplay, showSort: true },
  { key: "ratings", title: "Tutor Ratings", component: Text, showSort: true },
  { key: "curriculum", title: "Curriculum", component: Text, showSort: true },
  { key: "subject", title: "Subject", component: Text, showSort: true },
  { key: "actions", title: "Actions", component: ActionsButton, showSort: false },
];

const tableDataCert = [
  {
    id: "1001",
    tutor: { name: "John Doe", avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", department: "Mathematics" },
    student: { name: "Jane Smith", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", department: "Science" },
    ratings: "4.5",
    curriculum: "Algebra Basics",
    subject: "Mathematics",
  },
  {
    id: "1002",
    tutor: { name: "Alice Johnson", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", department: "Physics" },
    student: { name: "Bob Martin", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", department: "Engineering" },
    ratings: "4.8",
    curriculum: "Newtonian Mechanics",
    subject: "Physics",
  },
];
