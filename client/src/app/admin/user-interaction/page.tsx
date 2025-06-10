"use client";

import { useState } from "react";
import AdminContainer from "../../components/admin-panel/ui/admin-container";
import { Text } from "../../components/admin-panel/ui/text";
import AdminTable from "../../components/admin-panel/ui/admin-table";
import { Button } from "../../components/admin-panel/ui/button";
import Image from "next/image";
import { ChevronDown, Eye,  } from "lucide-react";
import { useRouter } from "next/navigation";
import sessions from "../../../lib/session_data.json";

export interface TutorInfo {
  id: string;
  name: string;
  avatar: string;
  department: string;
}

export interface StudentInfo {
  id: string;
  name: string;
  avatar: string;
}

interface SessionRecording {
  id: string;
  tutor: TutorInfo;
  student: StudentInfo;
  dateTime: string;
  curriculum: string;
  subject: string;
  duration: string;
  rating: number;
  status: string;
}

export interface FilterOptions {
  dateRange: string;
  status: string | "All";
  rating: string | "All";
  flagged: boolean;
}

export default function SessionRecordings() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: "all",
    status: "All",
    rating: "All",
    flagged: false,
  });

  const [filteredData, setFilteredData] = useState<SessionRecording[]>(sessions);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterData(query, filters);
  };

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    filterData(searchQuery, updatedFilters);
  };

  const filterData = (query: string, filterOptions: FilterOptions) => {
    let filtered = [...sessions];

    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filtered = filtered.filter(
        (session) =>
          session.tutor.name.toLowerCase().includes(lowercaseQuery) ||
          session.student.name.toLowerCase().includes(lowercaseQuery) ||
          session.id.toLowerCase().includes(lowercaseQuery) ||
          session.subject.toLowerCase().includes(lowercaseQuery) ||
          session.curriculum.toLowerCase().includes(lowercaseQuery)
      );
    }

    if (filterOptions.status !== "All") {
      filtered = filtered.filter((session) => session.status === filterOptions.status);
    }

    if (filterOptions.rating !== "All") {
      filtered = filtered.filter((session) => session.rating === Number(filterOptions.rating));
    }

    if (filterOptions.flagged) {
      filtered = filtered.filter((session) => session.status === "Flagged");
    }

    if (filterOptions.dateRange === "week") {
      filtered = filtered.slice(0, 5);
    } else if (filterOptions.dateRange === "month") {
      filtered = filtered.slice(0, 8);
    }

    setFilteredData(filtered);
  };

  return (
    <div className="flex flex-col gap-5">
      <AdminContainer
        rightComponent={
          <div className="flex flex-col md:flex-row gap-3 w-full">
            <CustomSearchbar
              placeholder="Search by session ID, tutor, student, subject..."
              onChange={(value) => handleSearch(value)}
            />
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <select
                  className="appearance-none px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white pr-8"
                  value={filters.dateRange}
                  onChange={(e) => handleFilterChange({ dateRange: e.target.value })}
                >
                  <option value="all">All Time</option>
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last Month</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>

              <div className="relative">
                <select
                  className="appearance-none px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white pr-8"
                  value={filters.status}
                  onChange={(e) => handleFilterChange({ status: e.target.value as string | "All" })}
                >
                  <option value="All">All Status</option>
                  <option value="Completed">Completed</option>
                  <option value="Canceled">Canceled</option>
                  <option value="Flagged">Flagged</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>

              <div className="relative">
                <select
                  className="appearance-none px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white pr-8"
                  value={filters.rating}
                  onChange={(e) => handleFilterChange({ rating: e.target.value })}
                >
                  <option value="All">All Ratings</option>
                  <option value="1">1 Star</option>
                  <option value="2">2 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="5">5 Stars</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="flagged"
                  checked={filters.flagged}
                  onChange={(e) => handleFilterChange({ flagged: e.target.checked })}
                  className="mr-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="flagged" className="text-sm text-gray-700">Flagged Only</label>
              </div>
            </div>
          </div>
        }
        title="Session Recordings"
      >
        <AdminTable data={filteredData} format={sessionTableFormat} />
      </AdminContainer>
    </div>
  );
}

const CustomSearchbar = ({ placeholder, onChange }: { placeholder: string; onChange: (value: string) => void }) => {
  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

const SessionParticipant = ({ tutor, student }: { tutor?: TutorInfo; student?: StudentInfo }) => {
  const person = tutor || student;
  if (!person) return null;

  return (
    <div className="flex items-center gap-3 w-full justify-center md:justify-start pl-3 md:pl-0">
      <Image
        width={40}
        height={40}
        alt={`${person.name}'s avatar`}
        src={person.avatar}
        className="w-10 h-10 rounded-lg shrink-0 object-cover"
      />
      <div>
        <p className="text-[#555555] font-normal">{person.name}</p>
        {tutor && (
          <p className="text-sm font-medium text-[#344054]">{tutor.department}</p>
        )}
      </div>
    </div>
  );
};

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-300"
            }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      ))}
      <span className="ml-1 text-sm font-medium text-gray-700">{rating}/5</span>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const colors = {
    Completed: "bg-green-100 text-green-800",
    Canceled: "bg-gray-100 text-gray-800",
    Flagged: "bg-red-100 text-red-800",
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"}`}>
      {status}
    </span>
  );
};

const SessionActions = ({ sessionId }: { sessionId: string }) => {
  const router = useRouter();

  // const handlePlay = (id: string) => {
  //   console.log(`Playing session ${id}`);
  // };

  // const handleDownload = (id: string) => {
  //   console.log(`Downloading session ${id}`);
  // };

  // const handleDelete = (id: string) => {
  //   console.log(`Deleting session ${id}`);
  // };

  const handleViewDetails = (id: string) => {
    router.push(`/admin/session-recordings/${id}`);
  };

  return (
    <div className="flex items-center gap-2 w-full justify-center">
      {/* <Button
        outline
        className="text-blue-600 border-blue-600 p-2"
        onClick={() => handlePlay(sessionId)}
      >
        <Play size={16} />
      </Button>
      <Button
        outline
        className="text-green-600 border-green-600 p-2"
        onClick={() => handleDownload(sessionId)}
      >
        <Download size={16} />
      </Button> */}
      <Button
        outline
        className="text-purple-600 border-purple-600 p-2"
        onClick={() => handleViewDetails(sessionId)}
      >
        <Eye size={16} />
      </Button>
      {/* <Button
        className="bg-red-500 text-white p-2"
        onClick={() => handleDelete(sessionId)}
      >
        <Trash2 size={16} />
      </Button> */}
    </div>
  );
};

const sessionTableFormat = [
  {
    key: "id",
    title: "Session ID",
    component: Text,
    showSort: true,
    onclick: () => console.log("Sorted by ID"),
  },
  {
    key: "tutor",
    title: "Tutor",
    component: SessionParticipant,
    showSort: true,
    onclick: () => console.log("Sorted by Tutor"),
  },
  {
    key: "student",
    title: "Student",
    component: SessionParticipant,
    showSort: true,
    onclick: () => console.log("Sorted by Student"),
  },
  {
    key: "dateTime",
    title: "Date & Time",
    component: Text,
    showSort: true,
    onclick: () => console.log("Sorted by Date & Time"),
  },
  {
    key: "curriculum",
    title: "Curriculum",
    component: Text,
    showSort: true,
    onclick: () => console.log("Sorted by Curriculum"),
  },
  {
    key: "subject",
    title: "Subject",
    component: Text,
    showSort: true,
    onclick: () => console.log("Sorted by Subject"),
  },
  {
    key: "duration",
    title: "Duration",
    component: Text,
    showSort: true,
    onclick: () => console.log("Sorted by Duration"),
  },
  {
    key: "rating",
    title: "Rating",
    component: RatingStars,
    propName: "rating",
    showSort: true,
    onclick: () => console.log("Sorted by Rating"),
  },
  {
    key: "status",
    title: "Status",
    component: StatusBadge,
    propName: "status",
    showSort: true,
    onclick: () => console.log("Sorted by Status"),
  },
  {
    key: "actions",
    title: "Actions",
    component: ({ id }: { id: string }) => <SessionActions sessionId={id} />,
    showSort: false,
  },
];
