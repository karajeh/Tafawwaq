"use client";

import AdminContainer from "../../components/admin-panel/ui/admin-container";
import { Text } from "../../components/admin-panel/ui/text";
import AdminTable from "../../components/admin-panel/ui/admin-table";
import { Button } from "../../components/admin-panel/ui/button";
import Searchbar from "../../components/admin-panel/ui/Searchbar";
import { Badge, BadgeProps } from "../../components/admin-panel/ui/badge";
import Paginations from "../../components/student/Paginations";

export default function Home() {
  return (
    <div className=" flex flex-col gap-5">
      <AdminContainer
        rightComponent={
          <>
            <Searchbar placeholder="Search user here..." />
            <button className=" hover:opacity-75 border bg-[#f9f9f9] rounded-3xl px-4 py-2 text-sm flex gap-2 text-text_primary items-center">
              <SortIcon />
              <p>Sort</p>
            </button>
          </>
        }
        showCount={null}
        title="Complaints Management"
        footer={<Paginations />}
      >
        <AdminTable data={tableDataUser} format={tableFormatUser} />
      </AdminContainer>
    </div>
  );
}
const ActionsButtons = ({ }) => {
  return (
    <div className="flex items-center gap-3 w-full justify-center">
      <Button
        href={`/admin/feedback-and-complaints/1`}
        outline
        className=" text-secondary cursor-pointer border-secondary"
      >
        Reply
      </Button>
    </div>
  );
};

const CutomBadge = ({ type }: { type: string }) => {
  const color = (): BadgeProps["color"] => {
    switch (type) {
      case "Pending":
        return "yellow";
      case "To-Do":
        return "purple";
      case "Resolved":
        return "teal";
      default:
        return "teal";
    }
  };

  return <Badge color={color()}>{type}</Badge>;
};

const tableFormatUser = [
  {
    key: "name",
    title: "UserName",
    component: Text,
    showSort: true,
    onclick: () => console.log("clicked"),
  },
  {
    key: "disputeComingTime",
    title: "Dispute Coming Time",
    component: Text,
    showSort: true,
    onclick: () => console.log("clicked"),
  },
  {
    key: "status",
    title: "Status",
    component: CutomBadge,
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

export type TableFormatUser = (typeof tableFormatUser)[number];

const tableDataUser = [
  {
    name: "Arlene McCoy",
    slug: "",
    disputeComingTime: "16/08/2013",
    status: {
      type: "Pending",
    },
  },
  {
    name: "Arlene McCoy",
    slug: "",
    disputeComingTime: "16/08/2013",
    status: {
      type: "To-Do",
    },
  },
  {
    name: "Arlene McCoy",
    slug: "",
    disputeComingTime: "16/08/2013",
    status: {
      type: "Resolved",
    },
  },
];

export type TableDataUser = (typeof tableDataUser)[number];

const SortIcon = () => {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.03414 5.45898L11.5142 2.979L13.9941 5.45898"
        stroke="#3A5377"
        stroke-width="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.5137 14.979L11.5137 2.979"
        stroke="#3A5377"
        stroke-width="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.9668 12.4993L4.48678 14.9792L2.0068 12.4993"
        stroke="#3A5377"
        stroke-width="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.48828 2.979L4.48828 14.979"
        stroke="#3A5377"
        stroke-width="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
