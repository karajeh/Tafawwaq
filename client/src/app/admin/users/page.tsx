"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faEye,
  faTrash,
  faTimes,
  faUserGraduate,
  faChalkboardTeacher,
} from "@fortawesome/free-solid-svg-icons";
import { format as formatDate } from "date-fns";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface User {
  id: string;
  name: string;
  email: string;
  whatsappNumber: string;
  userType: "Student" | "Tutor";
  registrationDate: Date;
  lastActive: Date;
  status: "Active" | "Inactive" | "Suspended";
  avatar: string;
  department?: string;
  slug: string;
  category?: string;
  country: string;
  contactNumber: string;
  language: string;
}

type TableFormat = {
  key: string;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
  showSort: boolean;
  onClick?: () => void;
};

interface ProfileModalProps {
  user: User | null;
  onClose: () => void;
  onDelete: (id: string) => void;
}

const mockStudents: User[] = [
  {
    id: "STU001",
    name: "Alex Johnson",
    email: "alex.j@example.com",
    whatsappNumber: "+1 234 567 8901",
    userType: "Student",
    registrationDate: new Date("2024-01-15"),
    lastActive: new Date("2025-02-28"),
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    slug: "",
    country: "United States",
    contactNumber: "+1 234 567 8901",
    language: "English",
  },
  {
    id: "STU002",
    name: "Maria Garcia",
    email: "maria.g@example.com",
    whatsappNumber: "+1 345 678 9012",
    userType: "Student",
    registrationDate: new Date("2024-02-10"),
    lastActive: new Date("2025-03-01"),
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    slug: "",
    country: "Mexico",
    contactNumber: "+1 345 678 9012",
    language: "Spanish, English",
  },
  {
    id: "STU003",
    name: "James Brown",
    email: "james.b@example.com",
    whatsappNumber: "+1 456 789 0123",
    userType: "Student",
    registrationDate: new Date("2023-11-20"),
    lastActive: new Date("2025-02-20"),
    status: "Inactive",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    slug: "",
    country: "United Kingdom",
    contactNumber: "+1 456 789 0123",
    language: "English",
  },
  {
    id: "STU004",
    name: "Priya Patel",
    email: "priya.p@example.com",
    whatsappNumber: "+1 567 890 1234",
    userType: "Student",
    registrationDate: new Date("2024-01-05"),
    lastActive: new Date("2025-02-15"),
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    slug: "",
    country: "India",
    contactNumber: "+1 567 890 1234",
    language: "English, Hindi",
  },
];

const mockTutors: User[] = [
  {
    id: "TUT001",
    name: "John Doe",
    email: "john.doe@example.com",
    whatsappNumber: "+1 123 456 7890",
    userType: "Tutor",
    registrationDate: new Date("2023-10-15"),
    lastActive: new Date("2025-02-29"),
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    department: "Mathematics",
    slug: "",
    category: "Tutor",
    country: "United States",
    contactNumber: "+1 123 456 7890",
    language: "English",
  },
  {
    id: "TUT002",
    name: "Sarah Miller",
    email: "sarah.m@example.com",
    whatsappNumber: "+1 234 567 8901",
    userType: "Tutor",
    registrationDate: new Date("2023-09-20"),
    lastActive: new Date("2025-03-01"),
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    department: "Physics",
    slug: "",
    category: "Tutor",
    country: "Canada",
    contactNumber: "+1 234 567 8901",
    language: "English, French",
  },
  {
    id: "TUT003",
    name: "Miguel Rodriguez",
    email: "miguel.r@example.com",
    whatsappNumber: "+1 345 678 9012",
    userType: "Tutor",
    registrationDate: new Date("2023-11-05"),
    lastActive: new Date("2025-02-25"),
    status: "Suspended",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    department: "Chemistry",
    slug: "",
    category: "Tutor",
    country: "Spain",
    contactNumber: "+1 345 678 9012",
    language: "Spanish, English",
  },
  {
    id: "TUT004",
    name: "Julie Chen",
    email: "julie.c@example.com",
    whatsappNumber: "+1 456 789 0123",
    userType: "Tutor",
    registrationDate: new Date("2024-01-10"),
    lastActive: new Date("2025-02-28"),
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    department: "Biology",
    slug: "",
    category: "Tutor",
    country: "Singapore",
    contactNumber: "+1 456 789 0123",
    language: "English, Mandarin",
  },
];

const Searchbar = ({
  placeholder,
  onSearch,
}: {
  placeholder: string;
  onSearch: (value: string) => void;
}) => {
  const [value, setValue] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-sm">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full px-4 py-2 pl-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <FontAwesomeIcon
        icon={faSearch  as IconProp}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
    </form>
  );
};

const Text = ({ value }: { value: string }) => {
  return <p className="text-sm text-gray-700">{value}</p>;
};

const Badge = ({ status }: { status: string }) => {
  const baseClasses = "text-xs font-medium px-2.5 py-0.5 rounded-full";

  const statusClasses = {
    Active: "bg-green-100 text-green-800",
    Inactive: "bg-gray-100 text-gray-800",
    Suspended: "bg-red-100 text-red-800",
  };

  const statusClass =
    statusClasses[status as keyof typeof statusClasses] ||
    statusClasses.Inactive;

  return <span className={`${baseClasses} ${statusClass}`}>{status}</span>;
};

const UserProfile = ({ user }: { user: User }) => {
  return (
    <div className="flex items-center gap-3 w-full justify-center md:justify-start pl-3 md:pl-0">
      <Image
        width={40}
        height={40}
        alt="avatar"
        src={user.avatar}
        className="w-10 h-10 rounded-lg shrink-0 object-cover"
      />
      <div>
        <p className="text-gray-800 font-medium">{user.name}</p>
        <p className="text-sm font-medium text-gray-500">
          {user.userType === "Tutor" && user.department
            ? user.department
            : user.email}
        </p>
      </div>
    </div>
  );
};

const ActionsButtons = ({
  userId,
  onViewProfile,
}: {
  userId: string;
  onViewProfile: (id: string) => void;
}) => {
  return (
    <div className="flex items-center gap-2 w-full justify-center">
      <button
        onClick={() => onViewProfile(userId)}
        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-100 border border-blue-300 rounded-md hover:bg-blue-200 transition-all"
        data-tooltip-id="view-tooltip"
        data-tooltip-content="View Profile"
      >
        <FontAwesomeIcon icon={faEye as IconProp} className="mr-1" />
        <span className="hidden sm:inline">View Profile</span>
      </button>
      <Tooltip id="view-tooltip" />
    </div>
  );
};

const ProfileModal: React.FC<ProfileModalProps> = ({
  user,
  onClose,
  onDelete,
}) => {
  const [deleteConfirmationModal, setDeleteConfirmationModal] =
    useState<boolean>(false);
  const handleCloseConfirmaionModale = () => {
    setDeleteConfirmationModal(false);
  };

  if (!user) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">User Profile</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FontAwesomeIcon icon={faTimes as IconProp} size="lg" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 mb-6">
            <div className="flex-shrink-0">
              <Image
                src={user.avatar}
                alt={user.name}
                width={100}
                height={100}
                className="rounded-lg object-cover w-24 h-24"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-semibold text-gray-800">
                {user.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge status={user.status} />
                <span className="flex items-center gap-1 text-gray-600 text-sm">
                  {user.userType === "Student" ? (
                    <FontAwesomeIcon
                      icon={faUserGraduate as IconProp}
                      className="text-blue-500"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faChalkboardTeacher as IconProp}
                      className="text-green-500"
                    />
                  )}
                  {user.userType}
                </span>
              </div>
              {user.userType === "Tutor" && user.department && (
                <p className="text-gray-600 mt-1">{user.department}</p>
              )}
              <p className="text-gray-500 mt-1">{user.country}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">User ID</p>
              <p className="text-sm font-medium">{user.id}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-sm">{user.email}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">
                WhatsApp Number
              </p>
              <p className="text-sm">{user.whatsappNumber}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">
                Contact Number
              </p>
              <p className="text-sm">{user.contactNumber}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Language</p>
              <p className="text-sm">{user.language}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">
                Registration Date
              </p>
              <p className="text-sm">
                {formatDate(user.registrationDate, "PPP")}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Last Active</p>
              <p className="text-sm">{formatDate(user.lastActive, "PPP")}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Status</p>
              <Badge status={user.status} />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 border-t pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                setDeleteConfirmationModal(true);
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors flex items-center gap-1"
            >
              <FontAwesomeIcon icon={faTrash as IconProp} />
              Delete Profile
            </button>
          </div>
        </div>
        {deleteConfirmationModal && (
          <>
            <div className="w-full h-full absolute top-0 left-0 bg-black opacity-70 flex items-center justify-center z-10" />
            <div className="w-full h-full absolute top-0 left-0 bg-transparent flex items-center justify-center z-20">
              <div className="w-[70%] flex flex-col items-center gap-5 p-8 bg-white rounded-lg">
                <h3 className="text-base ">
                  Are you sure that you want to delete this profile?
                </h3>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={handleCloseConfirmaionModale}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors border"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      onDelete(user.id);
                      onClose();
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors flex items-center gap-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

const AdminContainer = ({
  children,
  title,
  rightComponent,
  icon,
}: {
  children: React.ReactNode;
  title: string;
  rightComponent?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-4 sm:mb-0">
          {icon}
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>
        {rightComponent}
      </div>
      <div>{children}</div>
    </div>
  );
};

const AdminTable = ({
  data,
  format,
  onViewProfile,
}: {
  data: User[];
  format: TableFormat[];
  onViewProfile: (id: string) => void;
}) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  if (isMobile) {
    return (
      <div className="divide-y divide-gray-200">
        {data.map((item, index) => (
          <div key={index} className="p-4">
            <UserProfile user={item} />
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-gray-500">Category</p>
                <p className="text-sm">{item.category || item.userType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Country</p>
                <p className="text-sm">{item.country}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Status</p>
                <Badge status={item.status} />
              </div>
              <div>
                <p className="text-xs text-gray-500">Last Active</p>
                <p className="text-sm">{formatDate(item.lastActive, "PP")}</p>
              </div>
            </div>
            <div className="mt-3">
              <ActionsButtons userId={item.id} onViewProfile={onViewProfile} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {format.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div className="flex items-center gap-1">
                  {column.title}
                  {column.showSort && (
                    <svg
                      className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                      />
                    </svg>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {format.map((column, colIndex) => {
                if (column.key === "actions") {
                  return (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                      <ActionsButtons
                        userId={item.id}
                        onViewProfile={onViewProfile}
                      />
                    </td>
                  );
                }

                if (column.key === "name") {
                  return (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                      <UserProfile user={item} />
                    </td>
                  );
                }

                if (column.key === "status") {
                  return (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                      <Badge status={item.status} />
                    </td>
                  );
                }

                if (
                  column.key === "registrationDate" ||
                  column.key === "lastActive"
                ) {
                  return (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                      <Text
                        value={formatDate(
                          item[column.key as keyof User] as Date,
                          "PP"
                        )}
                      />
                    </td>
                  );
                }

                return (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                    <Text
                      value={String(item[column.key as keyof User] || "")}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function UsersManagement() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [students, setStudents] = useState<User[]>(mockStudents);
  const [tutors, setTutors] = useState<User[]>(mockTutors);
  const [studentSearch, setStudentSearch] = useState("");
  const [tutorSearch, setTutorSearch] = useState("");

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      student.email.toLowerCase().includes(studentSearch.toLowerCase()) ||
      student.id.toLowerCase().includes(studentSearch.toLowerCase())
  );

  const filteredTutors = tutors.filter(
    (tutor) =>
      tutor.name.toLowerCase().includes(tutorSearch.toLowerCase()) ||
      tutor.email.toLowerCase().includes(tutorSearch.toLowerCase()) ||
      tutor.id.toLowerCase().includes(tutorSearch.toLowerCase())
  );

  const handleViewProfile = (id: string) => {
    const user =
      [...students, ...tutors].find((user) => user.id === id) || null;
    setSelectedUser(user);
  };

  const handleDeleteUser = (id: string) => {
    // In a real application, you would make an API call here
    setStudents((prev) => prev.filter((student) => student.id !== id));
    setTutors((prev) => prev.filter((tutor) => tutor.id !== id));
  };

  const studentTableFormat: TableFormat[] = [
    {
      key: "name",
      title: "Name",
      component: UserProfile,
      showSort: true,
    },
    {
      key: "country",
      title: "Country",
      component: Text,
      showSort: true,
    },
    {
      key: "status",
      title: "Status",
      component: Badge,
      showSort: true,
    },
    {
      key: "registrationDate",
      title: "Registration Date",
      component: Text,
      showSort: true,
    },
    {
      key: "lastActive",
      title: "Last Active",
      component: Text,
      showSort: true,
    },
    {
      key: "actions",
      title: "Actions",
      component: ActionsButtons,
      showSort: false,
    },
  ];

  const tutorTableFormat: TableFormat[] = [
    {
      key: "name",
      title: "Name",
      component: UserProfile,
      showSort: true,
    },
    {
      key: "country",
      title: "Country",
      component: Text,
      showSort: true,
    },
    {
      key: "department",
      title: "Department",
      component: Text,
      showSort: true,
    },
    {
      key: "status",
      title: "Status",
      component: Badge,
      showSort: true,
    },
    {
      key: "lastActive",
      title: "Last Active",
      component: Text,
      showSort: true,
    },
    {
      key: "actions",
      title: "Actions",
      component: ActionsButtons,
      showSort: false,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* <h1 className="text-3xl font-bold text-gray-800 mb-8">Users Management</h1> */}

      <div className="flex flex-col gap-8">
        {/* Students Section */}
        <AdminContainer
          title="Students"
          icon={
            <FontAwesomeIcon icon={faUserGraduate as IconProp} className="text-blue-500" />
          }
          rightComponent={
            <Searchbar
              placeholder="Search students..."
              onSearch={setStudentSearch}
            />
          }
        >
          <AdminTable
            data={filteredStudents}
            format={studentTableFormat}
            onViewProfile={handleViewProfile}
          />
        </AdminContainer>

        {/* Tutors Section */}
        <AdminContainer
          title="Tutors"
          icon={
            <FontAwesomeIcon
              icon={faChalkboardTeacher as IconProp}
              className="text-green-500"
            />
          }
          rightComponent={
            <Searchbar
              placeholder="Search tutors..."
              onSearch={setTutorSearch}
            />
          }
        >
          <AdminTable
            data={filteredTutors}
            format={tutorTableFormat}
            onViewProfile={handleViewProfile}
          />
        </AdminContainer>
      </div>

      {/* Profile Modal */}
      {selectedUser && (
        <ProfileModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onDelete={handleDeleteUser}
        />
      )}
    </div>
  );
}
