"use client";

import AdminContainer from "../../components/admin-panel/ui/admin-container";
import { Text } from "../../components/admin-panel/ui/text";
import AdminTable from "../../components/admin-panel/ui/admin-table";
import { Button } from "../../components/admin-panel/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import Searchbar from "src/app/components/admin-panel/ui/Searchbar";

export default function AllTCertificates() {
  const [pendingDataCert, setPendingDataCert] = useState<TableDataCert[]>([]);
  const [approvedDataCert, setApprovedDataCert] = useState<TableDataCert[]>([]);
  useEffect(() => {
    setPendingDataCert(tableDataCert.filter((data) => !data.approved));
    setApprovedDataCert(tableDataCert.filter((data) => data.approved));
  }, []);

  return (
    <div className=" flex flex-col gap-5">
      <AdminContainer
        title="Certification Requests"
        rightComponent={<Searchbar placeholder="Search certificates here..." />}
      >
        <AdminTable data={pendingDataCert} format={tableFormatCert} />
      </AdminContainer>
      <AdminContainer
        title="Approved Certification Requests"
        rightComponent={<Searchbar placeholder="Search certificates here..." />}
      >
        <AdminTable data={approvedDataCert} format={tableFormatApprovedCert} />
      </AdminContainer>
    </div>
  );
}
const ActionsButtonsCert = () => {
  return (
    <div className="flex items-center gap-3 w-full justify-center">
      <Button color="button_primary" className=" bg-primary cursor-pointer">
        Approve
      </Button>
      <Button outline className=" text-primary cursor-pointer">
        Reject
      </Button>
    </div>
  );
};
const ActionsButtonsApprovedCert = () => {
  return (
    // <div className="flex items-center gap-3 w-full justify-center">

    // </div>
    <div />
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

const tableFormatCert = [
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
    key: "totalHourCompleted",
    title: "Total Hour Completed",
    component: Text,
    showSort: true,
    onclick: () => console.log("clicked"),
  },
  {
    key: "ratings",
    title: "Ratings",
    component: Text,
    showSort: true,
    onclick: () => console.log("clicked"),
  },

  {
    key: "actions",
    title: "Actions",
    component: ActionsButtonsCert,
    showSort: false,
    onclick: () => console.log("clicked"),
  },
];

export type TableFormatCert = (typeof tableFormatCert)[number];

const tableFormatApprovedCert = [
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
    key: "totalHourCompleted",
    title: "Total Hour Completed",
    component: Text,
    showSort: true,
    onclick: () => console.log("clicked"),
  },
  {
    key: "ratings",
    title: "Ratings",
    component: Text,
    showSort: true,
    onclick: () => console.log("clicked"),
  },

  {
    key: "actions",
    title: "Actions",
    component: ActionsButtonsApprovedCert,
    showSort: false,
    onclick: () => console.log("clicked"),
  },
];

const tableDataCert = [
  {
    id:1,
    tutor: {
      name: "John Doe",
      avatar:
        "https://images.unsplash.com/photo-1727093267255-e9b31b2b35ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2MXx8fGVufDB8fHx8fA%3D%3D",
      department: "Mathematics",
    },
    slug: "",
    country: "United States",
    contactNumber: "+1 123 456 7890",
    totalHourCompleted: "100",
    ratings: "4.5",
    requestType: "certificate",
    approved: true,
  },
  {
    id:2,
    tutor: {
      name: "Jane Smith",
      avatar:
        "https://images.unsplash.com/photo-1453396450673-3fe83d2db2c4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      department: "Physics",
    },
    slug: "",
    country: "Canada",
    contactNumber: "+1 234 567 8901",
    totalHourCompleted: "120",
    ratings: "4.7",
    requestType: "certificate",
    approved: true,
  },
  {
    id:3,
    tutor: {
      name: "Emma Brown",
      avatar:
        "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      department: "Chemistry",
    },
    slug: "",
    country: "United Kingdom",
    contactNumber: "+44 789 456 1230",
    totalHourCompleted: "90",
    ratings: "4.6",
    requestType: "certificate",
    approved: false,
  },
  {
    id:4,
    tutor: {
      name: "Liam Wilson",
      avatar:
        "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHV0b3J8ZW58MHx8MHx8fDA%3D%3D",
      department: "Biology",
    },
    slug: "",
    country: "Australia",
    contactNumber: "+61 987 654 3210",
    totalHourCompleted: "110",
    ratings: "4.8",
    requestType: "certificate",
    approved: false,
  },
  {
    id:5,
    tutor: {
      name: "Olivia Taylor",
      avatar:
        "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      department: "History",
    },
    slug: "",
    country: "New Zealand",
    contactNumber: "+64 654 321 0987",
    totalHourCompleted: "130",
    ratings: "4.9",
    requestType: "certificate",
    approved: false,
  },
];

export type TableDataCert = (typeof tableDataCert)[number];
