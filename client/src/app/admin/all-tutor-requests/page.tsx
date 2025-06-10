"use client";

import AdminContainer from "../../components/admin-panel/ui/admin-container";
import { Text } from "../../components/admin-panel/ui/text";
import AdminTable from "../../components/admin-panel/ui/admin-table";
import { Button } from "../../components/admin-panel/ui/button";
import Image from "next/image";
// import { CircleIcon } from "../../components/student/BookLessonButton";
import { useEffect, useState } from "react";
import Searchbar from "src/app/components/admin-panel/ui/Searchbar";

export default function AllTutors() {
  const [pendingDataTutor, setPendingDataTutor] = useState<TableDataTutor[]>(
    []
  );
  const [approvedDataTutor, setApprovedDataTutor] = useState<TableDataTutor[]>(
    []
  );
  useEffect(() => {
    setPendingDataTutor(tableDataTutor.filter((data) => !data.approved));
    setApprovedDataTutor(tableDataTutor.filter((data) => data.approved));
  }, []);

  return (
    <div className=" flex flex-col gap-5">
      <AdminContainer
        title="Tutor Request List"
        rightComponent={<Searchbar placeholder="Search tutors here..." />}
      >
        <AdminTable data={pendingDataTutor} format={tableFormatTutor} />
      </AdminContainer>
      <AdminContainer
        title="Approved Tutor Requests"
        rightComponent={<Searchbar placeholder="Search tutors here..." />}
      >
        <AdminTable
          data={approvedDataTutor}
          format={tableFormatApprovedTutor}
        />
      </AdminContainer>
    </div>
  );
}
const ActionsButtons = () => {
  return (
    <div className="flex items-center gap-3 w-full justify-center">
      <Button color="button_primary" className=" bg-primary cursor-pointer">
        Approve
      </Button>
    </div>
  );
};
const ActionsButtonsApprovedTutors = () => {
  return (
    // <div className="flex items-center gap-3 w-full justify-center">

    // </div>
    <div></div>
  );
};

const ActionProfile = ({ ...data }) => {
  const { name, avatar, department } = data.tutor;

  return (
    <div className="flex items-center gap-3">
      <Image
        width={40}
        height={40}
        alt="Avatar"
        src={avatar}
        className="w-10 h-10 rounded-lg"
      />
      <div>
        <p className=" text-[#555555] font-normal">{name}</p>
        <p className=" text-sm font-medium  text-[#344054]">{department}</p>
      </div>
    </div>
  );
};

const tableFormatTutor = [
  {
    key: "tutor",
    title: "Tutor",
    component: ActionProfile,
    showSort: true,
    onclick: () => console.log("clicked"),
  },
  {
    key: "country",
    title: "Country",
    component: Text,
    showSort: true,
    onclick: () => console.log("clicked"),
  },
  {
    key: "contactNumber",
    title: "Contact Number",
    component: Text,
    showSort: true,
    onclick: () => console.log("clicked"),
  },
  {
    key: "hourlyRate",
    title: "Hourly Rate",
    component: Text,
    showSort: true,
    onclick: () => console.log("clicked"),
  },
  {
    key: "language",
    title: "Language",
    component: Text,
    showSort: true,
    onclick: () => console.log("clicked"),
  },
  {
    key: "actions",
    title: "Actions",
    component: ActionsButtons,
    showSort: false,
    onclick: () => console.log("clicked"),
  },
];
const tableFormatApprovedTutor = [
  {
    key: "tutor",
    title: "Tutor",
    component: ActionProfile,
    showSort: true,
    onclick: () => console.log("clicked"),
  },
  {
    key: "country",
    title: "Country",
    component: Text,
    showSort: true,
    onclick: () => console.log("clicked"),
  },
  {
    key: "contactNumber",
    title: "Contact Number",
    component: Text,
    showSort: true,
    onclick: () => console.log("clicked"),
  },
  {
    key: "hourlyRate",
    title: "Hourly Rate",
    component: Text,
    showSort: true,
    onclick: () => console.log("clicked"),
  },
  {
    key: "language",
    title: "Language",
    component: Text,
    showSort: true,
    onclick: () => console.log("clicked"),
  },
  {
    key: "actions",
    title: "Actions",
    component: ActionsButtonsApprovedTutors,
    showSort: false,
    onclick: () => console.log("clicked"),
  },
];

export type TableFormatTutor = (typeof tableFormatTutor)[number];

const tableDataTutor = [
  {
    id: 1,
    tutor: {
      name: "John Doe",
      avatar:
        "https://images.unsplash.com/photo-1727093267255-e9b31b2b35ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2MXx8fGVufDB8fHx8fA%3D%3D",
      department: "Mathematics",
    },
    slug: "",
    country: "United States",
    contactNumber: "+1 123 456 7890",
    hourlyRate: "$50",
    language: "English",
    requestType: "tutor",
    approved: true,
  },
  {
    id: 2,
    tutor: {
      name: "Jane Smith",
      avatar:
        "https://images.unsplash.com/photo-1453396450673-3fe83d2db2c4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      department: "Physics",
    },
    slug: "",
    country: "Canada",
    contactNumber: "+1 234 567 8901",
    hourlyRate: "$60",
    language: "French, English",
    requestType: "tutor",
    approved: true,
  },
  {
    id: 3,
    tutor: {
      name: "Emma Brown",
      avatar:
        "https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      department: "Chemistry",
    },
    slug: "",
    country: "United Kingdom",
    contactNumber: "+44 789 456 1230",
    hourlyRate: "$55",
    language: "English",
    requestType: "tutor",
    approved: false,
  },
  {
    id: 4,
    tutor: {
      name: "Liam Wilson",
      avatar:
        "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHV0b3J8ZW58MHx8MHx8fDA%3D%3D",
      department: "Biology",
    },
    slug: "",
    country: "Australia",
    contactNumber: "+61 987 654 3210",
    hourlyRate: "$45",
    language: "English",
    requestType: "tutor",
    approved: false,
  },
  {
    id: 5,
    tutor: {
      name: "Olivia Taylor",
      avatar:
        "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      department: "History",
    },
    slug: "",
    country: "New Zealand",
    contactNumber: "+64 654 321 0987",
    hourlyRate: "$48",
    language: "English",
    requestType: "tutor",
    approved: false,
  },
];

export type TableDataTutor = (typeof tableDataTutor)[number];
