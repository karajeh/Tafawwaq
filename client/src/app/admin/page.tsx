"use client";

import AdminContainer from "../components/admin-panel/ui/admin-container";
import { Text } from "../components/admin-panel/ui/text";
import AdminTable from "../components/admin-panel/ui/admin-table";
import { Button } from "../components/admin-panel/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  approveCertification,
  approveDisapproveTutor,
  CertificationRequestTutors,
  getCertificationTutors,
  getTutors,
  TutorsData,
} from "src/api/teacherService";

export default function Home() {
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
  const [tutors, setTutors] = useState<TutorsData[]>([]);
  const [certTutors, setCertTutors] = useState<CertificationRequestTutors[]>(
    []
  );

  const fetchRequiredData = async () => {
    try {
      setIsLoadingData(true);
      const tutors = await getTutors();
      const certificationTutors = await getCertificationTutors();

      setTutors(tutors.data);
      setCertTutors(certificationTutors.data);
    } catch (error) {
      setIsLoadingData(false);
      console.error("Error fetching tutors:", error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleApproveTutor = async (rowData: TutorsData) => {
    try {
      await approveDisapproveTutor(1, rowData.id);
      setTutors((prev) =>
        prev.map((t) =>
          t.id === rowData.id ? { ...t, approved: "APPROVED" } : t
        )
      );
    } catch (error) {
      setTutors((prev) =>
        prev.map((t) =>
          t.id === rowData.id ? { ...t, approved: "PENDING" } : t
        )
      );
      console.error("Approval failed:", error);
    }
  };

  const handleRejectTutor = async (rowData: TutorsData) => {
    try {
      await approveDisapproveTutor(0, rowData.id);
      setTutors((prev) =>
        prev.map((t) =>
          t.id === rowData.id ? { ...t, approved: "DISAPPROVED" } : t
        )
      );
    } catch (error) {
      console.error("Rejection failed:", error);
      setTutors((prev) =>
        prev.map((t) =>
          t.id === rowData.id ? { ...t, approved: "PENDING" } : t
        )
      );
    }
  };

  const handleCertificationApprove = async (
    rowData: CertificationRequestTutors
  ) => {
    try {
      await approveCertification(rowData.id);
      setCertTutors((prev) =>
        prev.map((t) =>
          t.id === rowData.id ? { ...t, isCertified: true } : t
        )
      );
    } catch (error) {
      console.error("Certification failed:", error);
    }
  };

  const tableFormatTutor = getTableFormatTutor(
    handleApproveTutor,
    handleRejectTutor
  );
  const tableFormatCert = getTableFormatCert(handleCertificationApprove);

  useEffect(() => {
    fetchRequiredData();
  }, []);

  return (
    <div className=" flex flex-col gap-5">
      <AdminContainer
        rightComponent={
          <Link
            href={"/admin/all-tutor-requests"}
            className=" underline text-text_primary hover:opacity-75"
          >
            View all
          </Link>
        }
        title="Tutor Request List"
      >
        {!isLoadingData ? (
          <AdminTable data={tutors} format={tableFormatTutor} />
        ) : (
          <div className="mr-3">Loading...</div>
        )}
      </AdminContainer>
      <AdminContainer
        rightComponent={
          <Link
            href="/admin/all-certification-requests"
            className=" underline text-text_primary hover:opacity-75"
          >
            View all
          </Link>
        }
        title="Certification Requests"
      >
        {!isLoadingData ? (
          <AdminTable data={certTutors} format={tableFormatCert} />
        ) : (
          <div className="mr-3">Loading...</div>
        )}
      </AdminContainer>
    </div>
  );
}

const ActionsButtons = ({
  rowData,
  onApprove,
  onReject,
}: {
  rowData: TutorsData;
  onApprove: (rowData: TutorsData) => void;
  onReject: (rowData: TutorsData) => void;
}) => {
  return (
    <div className="flex items-center gap-3 w-full justify-center">
      {/* Reject button conditional rendering according to status  */}

      {rowData.approved === "PENDING" ? (
        <Button
          color="button_primary"
          className=" bg-primary cursor-pointer"
          onClick={() => onApprove(rowData)}
        >
          Approve
        </Button>
      ) : rowData.approved === "APPROVED" ? (
        <Button
          outline
          className=" text-primary cursor-pointer"
          disabled={true}
        >
          Approved
        </Button>
      ) : rowData.approved === "DISAPPROVED" ? (
        <Button
          outline
          className=" text-primary cursor-pointer"
          disabled={true}
        >
          Approve
        </Button>
      ) : null}

      {/* Reject button conditional rendering according to status  */}
      {rowData.approved === "PENDING" ? (
        <Button
          outline
          className=" text-primary cursor-pointer"
          onClick={() => onReject(rowData)}
        >
          Reject
        </Button>
      ) : rowData.approved === "APPROVED" ? (
        <Button
          outline
          className=" text-primary cursor-pointer"
          disabled={true}
        >
          Reject
        </Button>
      ) : rowData.approved === "DISAPPROVED" ? (
        <Button
          outline
          className=" text-primary cursor-pointer"
          disabled={true}
        >
          Rejected
        </Button>
      ) : null}
    </div>
  );
};

const ActionsButtonsCert = ({
  rowData,
  onApprove,
}: {
  rowData: CertificationRequestTutors;
  onApprove: (rowData: CertificationRequestTutors) => void;
}) => {
  return (
    <div className="flex items-center gap-3 w-full justify-center">
      {!rowData.isCertified ? (
        <Button
          color="button_primary"
          className=" bg-primary cursor-pointer"
          onClick={() => onApprove(rowData)}
        >
          Approve
        </Button>
      ) : (
        <Button
          color="button_primary"
          className=" bg-primary cursor-pointer"
          disabled={true}
        >
          Certified
        </Button>
      )}
    </div>
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

const getTableFormatTutor = (
  onApprove: (rowData: TutorsData) => void,
  onReject: (rowData: TutorsData) => void
) => [
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
    component: ({ rowData }: { rowData: TutorsData }) => (
      <ActionsButtons
        rowData={rowData}
        onApprove={onApprove}
        onReject={onReject}
      />
    ),
    showSort: false,
    propName: "rowData",
  },
];

const getTableFormatCert = (
  onApprove: (rowData: CertificationRequestTutors) => void
) => [
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
    component: ({ rowData }: { rowData: CertificationRequestTutors }) => (
      <ActionsButtonsCert rowData={rowData} onApprove={onApprove} />
    ),
    showSort: false,
    propName: "rowData",
  },
];

// const tableDataTutor = [
//   {
//     id: 1,
//     tutor: {
//       name: "John Doe",
//       avatar:
//         "https://images.unsplash.com/photo-1727093267255-e9b31b2b35ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2MXx8fGVufDB8fHx8fA%3D%3D",
//       department: "Mathematics",
//     },
//     slug: "",
//     country: "United States",
//     contactNumber: "+1 123 456 7890",
//     hourlyRate: "$50",
//     language: "English",
//     requestType: "tutor",
//     approved: true,
//   },
//   {
//     id: 2,
//     tutor: {
//       name: "Jane Smith",
//       avatar:
//         "https://images.unsplash.com/photo-1453396450673-3fe83d2db2c4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       department: "Physics",
//     },
//     slug: "",
//     country: "Canada",
//     contactNumber: "+1 234 567 8901",
//     hourlyRate: "$60",
//     language: "French, English",
//     requestType: "tutor",
//     approved: true,
//   },
//   {
//     id: 3,
//     tutor: {
//       name: "Emma Brown",
//       avatar:
//         "https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       department: "Chemistry",
//     },
//     slug: "",
//     country: "United Kingdom",
//     contactNumber: "+44 789 456 1230",
//     hourlyRate: "$55",
//     language: "English",
//     requestType: "tutor",
//     approved: false,
//   },
//   {
//     id: 4,
//     tutor: {
//       name: "Liam Wilson",
//       avatar:
//         "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHV0b3J8ZW58MHx8MHx8fDA%3D%3D",
//       department: "Biology",
//     },
//     slug: "",
//     country: "Australia",
//     contactNumber: "+61 987 654 3210",
//     hourlyRate: "$45",
//     language: "English",
//     requestType: "tutor",
//     approved: false,
//   },
//   {
//     id: 5,
//     tutor: {
//       name: "Olivia Taylor",
//       avatar:
//         "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       department: "History",
//     },
//     slug: "",
//     country: "New Zealand",
//     contactNumber: "+64 654 321 0987",
//     hourlyRate: "$48",
//     language: "English",
//     requestType: "tutor",
//     approved: false,
//   },
// ];

// export type TableDataTutor = (typeof tableDataTutor)[number];
// const tableDataCert = [
//   {
//     id: 1,
//     tutor: {
//       name: "John Doe",
//       avatar:
//         "https://images.unsplash.com/photo-1727093267255-e9b31b2b35ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2MXx8fGVufDB8fHx8fA%3D%3D",
//       department: "Mathematics",
//     },
//     slug: "",
//     country: "United States",
//     contactNumber: "+1 123 456 7890",
//     totalHourCompleted: "100",
//     ratings: "4.5",
//     requestType: "certificate",
//     approved: true,
//   },
//   {
//     id: 2,
//     tutor: {
//       name: "Jane Smith",
//       avatar:
//         "https://images.unsplash.com/photo-1453396450673-3fe83d2db2c4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       department: "Physics",
//     },
//     slug: "",
//     country: "Canada",
//     contactNumber: "+1 234 567 8901",
//     totalHourCompleted: "120",
//     ratings: "4.7",
//     requestType: "certificate",
//     approved: true,
//   },
//   {
//     id: 3,
//     tutor: {
//       name: "Emma Brown",
//       avatar:
//         "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       department: "Chemistry",
//     },
//     slug: "",
//     country: "United Kingdom",
//     contactNumber: "+44 789 456 1230",
//     totalHourCompleted: "90",
//     ratings: "4.6",
//     requestType: "certificate",
//     approved: false,
//   },
//   {
//     id: 4,
//     tutor: {
//       name: "Liam Wilson",
//       avatar:
//         "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHV0b3J8ZW58MHx8MHx8fDA%3D%3D",
//       department: "Biology",
//     },
//     slug: "",
//     country: "Australia",
//     contactNumber: "+61 987 654 3210",
//     totalHourCompleted: "110",
//     ratings: "4.8",
//     requestType: "certificate",
//     approved: false,
//   },
//   {
//     id: 5,
//     tutor: {
//       name: "Olivia Taylor",
//       avatar:
//         "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       department: "History",
//     },
//     slug: "",
//     country: "New Zealand",
//     contactNumber: "+64 654 321 0987",
//     totalHourCompleted: "130",
//     ratings: "4.9",
//     requestType: "certificate",
//     approved: false,
//   },
// ];

// export type TableDataCert = (typeof tableDataCert)[number];
