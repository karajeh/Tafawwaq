"use client";

import { useState, useEffect } from "react";
import AdminContainer from "../../components/admin-panel/ui/admin-container";
import { Text } from "../../components/admin-panel/ui/text";
import AdminTable from "../../components/admin-panel/ui/admin-table";
import { Button } from "../../components/admin-panel/ui/button";
import Image from "next/image";
import {
  ChevronDown,
  Download,
  Eye,
  Play,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  Star,
} from "lucide-react";
import { useRouter } from "next/navigation";
import sessions from "../../../lib/session_data.json";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface TutorInfo {
  id: string;
  name: string;
  avatar: string;
  department: string;
}

interface StudentInfo {
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
  flagReason?: string;
  technicalIssue?: boolean;
  reviewStatus?: "pending" | "in_progress" | "resolved";
}

interface FilterOptions {
  dateRange: string;
  status: string | "All";
  rating: string | "All";
  flagged: boolean;
  reviewStatus?: string | "All";
  technicalIssues?: boolean;
}

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const enrichSessionData = (data: any[]): SessionRecording[] => {
  return data.map(session => ({
    ...session,
    flagReason: session.status === "Flagged"
      ? (session.rating < 3
        ? "Low Rating"
        : Math.random() > 0.5
          ? "Student Complaint"
          : "Technical Issue")
      : undefined,
    technicalIssue: session.status === "Flagged" && Math.random() > 0.7,
    reviewStatus: session.status === "Flagged"
      ? (Math.random() > 0.6 ? "pending" : Math.random() > 0.5 ? "in_progress" : "resolved")
      : undefined
  }));
};

export default function QADashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: "all",
    status: "All",
    rating: "All",
    flagged: false,
    reviewStatus: "All",
    technicalIssues: false,
  });

  const [enrichedData, setEnrichedData] = useState<SessionRecording[]>([]);
  const [filteredData, setFilteredData] = useState<SessionRecording[]>([]);
  const [activeDateRange, setActiveDateRange] = useState("week");

  useEffect(() => {
    const enriched = enrichSessionData(sessions);
    setEnrichedData(enriched);
    setFilteredData(enriched);
  }, []);

  const calculateMetrics = () => {
    const totalSessions = enrichedData.length;
    const flaggedSessions = enrichedData.filter(session => session.status === "Flagged").length;
    const averageRating = enrichedData.length > 0
      ? (enrichedData.reduce((sum, session) => sum + session.rating, 0) / totalSessions).toFixed(1)
      : "0";
    const technicalIssues = enrichedData.filter(session => session.technicalIssue).length;

    const pendingReviews = enrichedData.filter(session =>
      session.status === "Flagged" && session.reviewStatus === "pending"
    ).length;

    return {
      totalSessions,
      flaggedSessions,
      averageRating,
      technicalIssues,
      pendingReviews
    };
  };

  const metrics = calculateMetrics();

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
    let filtered = [...enrichedData];

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

    if (filterOptions.reviewStatus !== "All") {
      filtered = filtered.filter((session) => session.reviewStatus === filterOptions.reviewStatus);
    }

    if (filterOptions.technicalIssues) {
      filtered = filtered.filter((session) => session.technicalIssue);
    }

    if (filterOptions.dateRange === "week") {
      filtered = filtered.slice(0, 5);
    } else if (filterOptions.dateRange === "month") {
      filtered = filtered.slice(0, 8);
    }

    setFilteredData(filtered);
  };

  const getChartData = () => {
    const ratingsData = [
      { name: '1 Star', count: enrichedData.filter(s => s.rating === 1).length },
      { name: '2 Stars', count: enrichedData.filter(s => s.rating === 2).length },
      { name: '3 Stars', count: enrichedData.filter(s => s.rating === 3).length },
      { name: '4 Stars', count: enrichedData.filter(s => s.rating === 4).length },
      { name: '5 Stars', count: enrichedData.filter(s => s.rating === 5).length },
    ];

    const statusData = [
      { name: 'Completed', value: enrichedData.filter(s => s.status === 'Completed').length },
      { name: 'Flagged', value: enrichedData.filter(s => s.status === 'Flagged').length },
      { name: 'Canceled', value: enrichedData.filter(s => s.status === 'Canceled').length },
    ];

    const COLORS = ['#4CAF50', '#FFC107', '#F44336'];

    const trendData = [
      { name: 'Mon', sessions: 30, flagged: 5 },
      { name: 'Tue', sessions: 42, flagged: 8 },
      { name: 'Wed', sessions: 38, flagged: 3 },
      { name: 'Thu', sessions: 45, flagged: 7 },
      { name: 'Fri', sessions: 40, flagged: 4 },
      { name: 'Sat', sessions: 25, flagged: 2 },
      { name: 'Sun', sessions: 20, flagged: 1 },
    ];

    return { ratingsData, statusData, COLORS, trendData };
  };

  const { ratingsData, statusData, COLORS, trendData } = getChartData();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">QA Dashboard</h1>
          <p className="text-gray-500">Monitor session quality and address flagged content</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-blue-600 text-white flex items-center gap-2">
            <Download size={16} />
            <span className="hidden md:inline">Export Report</span>
          </Button>
          <div className="relative">
            <select
              className="appearance-none px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white pr-8"
              value={activeDateRange}
              onChange={(e) => setActiveDateRange(e.target.value)}
            >
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="quarter">Last Quarter</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Sessions"
          value={metrics.totalSessions}
          icon={<Calendar className="w-8 h-8 text-blue-600" />}
          trend={{ value: 12, isPositive: true }}
          color="blue"
        />
        <MetricCard
          title="Flagged Sessions"
          value={metrics.flaggedSessions}
          icon={<AlertTriangle className="w-8 h-8 text-amber-500" />}
          trend={{ value: 3, isPositive: false }}
          color="amber"
        />
        <MetricCard
          title="Average Rating"
          value={metrics.averageRating}
          icon={<Star className="w-8 h-8 text-purple-600" />}
          trend={{ value: 0.2, isPositive: true }}
          color="purple"
        />
        <MetricCard
          title="Technical Issues"
          value={metrics.technicalIssues}
          icon={<AlertCircle className="w-8 h-8 text-red-500" />}
          trend={{ value: 2, isPositive: false }}
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm col-span-1">
          <h2 className="font-semibold text-gray-800 mb-2">Session Status</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm col-span-1">
          <h2 className="font-semibold text-gray-800 mb-2">Rating Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm col-span-1">
          <h2 className="font-semibold text-gray-800 mb-2">Weekly Trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sessions" stroke="#8884d8" />
                <Line type="monotone" dataKey="flagged" stroke="#ff7300" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <AdminContainer
        title="Flagged Sessions"
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
                  value={filters.reviewStatus}
                  onChange={(e) => handleFilterChange({ reviewStatus: e.target.value })}
                >
                  <option value="All">All Review Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="technicalIssues"
                  checked={filters.technicalIssues}
                  onChange={(e) => handleFilterChange({ technicalIssues: e.target.checked })}
                  className="mr-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="technicalIssues" className="text-sm text-gray-700">Technical Issues Only</label>
              </div>
            </div>
          </div>
        }
      >
        <AdminTable data={filteredData.filter(s => s.status === "Flagged")} format={flaggedSessionsTableFormat} />
      </AdminContainer>

      <AdminContainer
        title="All Sessions"
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
            </div>
          </div>
        }
      >
        <AdminTable data={filteredData} format={sessionTableFormat} />
      </AdminContainer>
    </div>
  );
}

const MetricCard = ({ title, value, icon, trend, color }: MetricCardProps) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    amber: "bg-amber-50 text-amber-600",
    purple: "bg-purple-50 text-purple-600",
    red: "bg-red-50 text-red-600",
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {trend && (
            <p className={`text-xs mt-2 ${trend.isPositive ? 'text-green-600' : 'text-red-600'} flex items-center`}>
              {trend.isPositive ? '↑' : '↓'} {trend.value.toString()}
              <span className="ml-1">from last period</span>
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${colorClasses[color as keyof typeof colorClasses]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

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

const ReviewStatusBadge = ({ status }: { status?: string }) => {
  if (!status) return null;

  const colors = {
    pending: "bg-yellow-100 text-yellow-800",
    in_progress: "bg-blue-100 text-blue-800",
    resolved: "bg-green-100 text-green-800",
  };

  const labels = {
    pending: "Pending Review",
    in_progress: "In Progress",
    resolved: "Resolved",
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"}`}>
      {labels[status as keyof typeof labels]}
    </span>
  );
};

const FlagReasonBadge = ({ reason }: { reason?: string }) => {
  if (!reason) return null;

  const colors = {
    "Low Rating": "bg-red-100 text-red-800",
    "Student Complaint": "bg-orange-100 text-orange-800",
    "Technical Issue": "bg-purple-100 text-purple-800",
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${colors[reason as keyof typeof colors] || "bg-gray-100 text-gray-800"}`}>
      {reason}
    </span>
  );
};

const SessionActions = ({ sessionId }: { sessionId: string }) => {
  const router = useRouter();

  const handlePlay = (id: string) => {
    console.log(`Playing session ${id}`);
  };

  const handleDownload = (id: string) => {
    console.log(`Downloading session ${id}`);
  };

  const handleDelete = (id: string) => {
    console.log(`Deleting session ${id}`);
  };

  const handleViewDetails = (id: string) => {
    router.push(`/admin/session-recordings/${id}`);
  };

  return (
    <div className="flex items-center gap-2 w-full justify-center">
      <Button
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
      </Button>
      <Button
        outline
        className="text-purple-600 border-purple-600 p-2"
        onClick={() => handleViewDetails(sessionId)}
      >
        <Eye size={16} />
      </Button>
      <Button
        className="bg-red-500 text-white p-2"
        onClick={() => handleDelete(sessionId)}
      >
        <Trash2 size={16} />
      </Button>
    </div>
  );
};

const FlaggedSessionActions = ({ session }: { session: SessionRecording }) => {
  const router = useRouter();

  const handleReview = (id: string) => {
    router.push(`/admin/session-recordings/${id}`);
  };

  const handleResolve = (id: string) => {
    console.log(`Resolving flagged session ${id}`);
  };

  const handleReassign = (id: string) => {
    console.log(`Reassigning review for session ${id}`);
  };

  return (
    <div className="flex items-center gap-2 w-full justify-center">
      <Button
        outline
        className="text-blue-600 border-blue-600 p-2"
        onClick={() => handleReview(session.id)}
      >
        <Eye size={16} />
      </Button>
      {session.reviewStatus !== "resolved" && (
        <Button
          className="bg-green-500 text-white p-2"
          onClick={() => handleResolve(session.id)}
        >
          <CheckCircle size={16} />
        </Button>
      )}
      {session.reviewStatus === "pending" && (
        <Button
          outline
          className="text-amber-600 border-amber-600 p-2"
          onClick={() => handleReassign(session.id)}
        >
          <Clock size={16} />
        </Button>
      )}
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
    component: SessionActions,
    propName: "sessionId",
    showSort: false,
  },
];

const flaggedSessionsTableFormat = [
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
    key: "subject",
    title: "Subject",
    component: Text,
    showSort: true,
    onclick: () => console.log("Sorted by Subject"),
  },
  {
    key: "flagReason",
    title: "Flag Reason",
    component: FlagReasonBadge,
    propName: "reason",
    showSort: true,
    onclick: () => console.log("Sorted by Flag Reason"),
  },
  {
    key: "reviewStatus",
    title: "Review Status",
    component: ReviewStatusBadge,
    propName: "status",
    showSort: true,
    onclick: () => console.log("Sorted by Review Status"),
  },
  {
    key: "actions",
    title: "Actions",
    component: FlaggedSessionActions,
    propName: "session",
    showSort: false,
  },
];