"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import AdminContainer from "../../../components/admin-panel/ui/admin-container";
import { Button } from "../../../components/admin-panel/ui/button";
import Image from "next/image";
import {
  ChevronLeft,
  Download,
  Flag,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  AlertCircle,
  Send,
} from "lucide-react";
import { TutorInfo, StudentInfo } from "../../user-interaction/page";
import sessions from "../../../../lib/session_data.json"

interface SessionNote {
  id: string;
  author: "tutor" | "student" | "admin";
  authorName: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
}

interface PerformanceMetric {
  name: string;
  value: number;
  maxValue: number;
  color: string;
}

interface TechnicalIssue {
  type: string;
  timestamp: string;
  description: string;
  severity: "low" | "medium" | "high";
}

interface SessionDetailProps {
  params: {
    id: string;
  };
}

export default function SessionDetail({ params }: SessionDetailProps) {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [note, setNote] = useState("");
  const [isFlagged, setIsFlagged] = useState(false);
  const [adminNotes, setAdminNotes] = useState<SessionNote[]>([]);

  // Fetch session data based on ID
  // In a real application, you would fetch this from an API
  const sessionData = sessions.find((session) => session.id === params.id) || sessions[0];

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const handleSkipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 15);
    }
  };

  const handleSkipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        videoRef.current.duration,
        videoRef.current.currentTime + 15
      );
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleDownload = () => {
    alert(`Downloading recording for session ${sessionData.id}`);
  };

  const handleFlag = () => {
    setIsFlagged(!isFlagged);
  };

  const handleAddNote = () => {
    if (note.trim()) {
      const newNote: SessionNote = {
        id: `note-${adminNotes.length + 1}`,
        author: "admin",
        authorName: "Admin User",
        authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        content: note,
        timestamp: new Date().toISOString(),
      };
      setAdminNotes([...adminNotes, newNote]);
      setNote("");
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleEscalate = () => {
    alert("Issue has been escalated to the senior admin team");
  };

  const performanceMetrics: PerformanceMetric[] = [
    { name: "Engagement", value: 8.5, maxValue: 10, color: "bg-blue-500" },
    { name: "Clarity", value: 9, maxValue: 10, color: "bg-green-500" },
    { name: "Punctuality", value: 10, maxValue: 10, color: "bg-purple-500" },
    { name: "Preparation", value: 8, maxValue: 10, color: "bg-amber-500" },
  ];

  const technicalIssues: TechnicalIssue[] = sessionData.status === "Flagged"
    ? [
      {
        type: "Audio Disruption",
        timestamp: "00:27:15",
        description: "Audio dropped for approximately 45 seconds",
        severity: "medium",
      },
    ]
    : [];

  return (
    <div className="flex flex-col gap-5">
      <AdminContainer
        title={`Session Details: ${sessionData.id}`}
        rightComponent={
          <Button
            onClick={() => router.push('/admin/user-interaction')}
            className="flex items-center gap-1 text-gray-600"
            outline
          >
            <ChevronLeft size={16} />
            Back to Sessions
          </Button>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Session Info & Notes */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            {/* Session Info */}
            <div className="bg-white p-5 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Session Information</h2>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Tutor</h3>
                  <SessionParticipant tutor={sessionData.tutor} />
                </div>
                <div className="border-b pb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Student</h3>
                  <SessionParticipant student={sessionData.student} />
                </div>
                <div className="border-b pb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Date & Time</h3>
                  <p className="text-gray-800">{sessionData.dateTime}</p>
                </div>
                <div className="border-b pb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Duration</h3>
                  <p className="text-gray-800">{sessionData.duration}</p>
                </div>
                <div className="border-b pb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Curriculum</h3>
                  <p className="text-gray-800">{sessionData.curriculum}</p>
                </div>
                <div className="border-b pb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Subject</h3>
                  <p className="text-gray-800">{sessionData.subject}</p>
                </div>
                <div className="pb-2">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
                  <StatusBadge status={sessionData.status} />
                </div>
              </div>
            </div>

            {/* Session Notes */}
            <div className="bg-white p-5 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Session Notes</h2>
              <div className="space-y-4 max-h-80 overflow-y-auto mb-4">
                {sessionNotes.map((note) => (
                  <div key={note.id} className="border-b pb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Image
                        src={note.authorAvatar}
                        alt={note.authorName}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <p className="text-sm font-medium">{note.authorName}</p>
                      <span className="text-xs text-gray-500">
                        ({note.author}) • {new Date(note.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">{note.content}</p>
                  </div>
                ))}
                {adminNotes.map((note) => (
                  <div key={note.id} className="border-b pb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Image
                        src={note.authorAvatar}
                        alt={note.authorName}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <p className="text-sm font-medium">{note.authorName}</p>
                      <span className="text-xs text-gray-500">
                        (admin) • {new Date(note.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">{note.content}</p>
                  </div>
                ))}
              </div>
              <div className="relative">
                <textarea
                  className="w-full border border-gray-300 rounded-md p-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add a note about this session..."
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                ></textarea>
                <button
                  className="absolute right-3 bottom-3 text-blue-600"
                  onClick={handleAddNote}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Middle + Right Column - Video Player & Metrics */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Video Player */}
            <div className="bg-white p-5 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Session Recording</h2>
              <div className="bg-gray-900 rounded-lg overflow-hidden relative aspect-video">
                <video
                  ref={videoRef}
                  className="w-full h-full"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  poster="/api/placeholder/800/450"
                >
                  <source src="https://example.com/sample-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <button
                      onClick={handlePlayPause}
                      className="bg-white bg-opacity-80 rounded-full p-4 text-blue-600 hover:bg-opacity-100 transition"
                    >
                      <Play size={24} />
                    </button>
                  </div>
                )}
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleSkipBackward}
                      className="text-gray-700 hover:text-blue-600"
                    >
                      <SkipBack size={20} />
                    </button>
                    <button
                      onClick={handlePlayPause}
                      className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700"
                    >
                      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                    <button
                      onClick={handleSkipForward}
                      className="text-gray-700 hover:text-blue-600"
                    >
                      <SkipForward size={20} />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleMuteToggle}
                      className="text-gray-700 hover:text-blue-600"
                    >
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-20"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-2">
                  <Button
                    onClick={handleDownload}
                    outline
                    className="text-green-600 border-green-600"
                  >
                    <Download size={16} className="mr-1" /> Download Recording
                  </Button>
                </div>
              </div>
            </div>

            {/* Session Metrics */}
            <div className="bg-white p-5 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Session Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Student Rating */}
                <div className="border rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Student Rating</h3>
                  <div className="flex items-center mb-2">
                    <RatingStars rating={sessionData.rating} />
                  </div>
                  <p className="text-sm text-gray-600 italic">
                    &quot;{sessionFeedback}&quot;
                  </p>
                </div>

                {/* Tutor Performance */}
                <div className="border rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Tutor Performance</h3>
                  <div className="space-y-3">
                    {performanceMetrics.map((metric) => (
                      <div key={metric.name}>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs font-medium text-gray-600">{metric.name}</span>
                          <span className="text-xs font-medium text-gray-800">
                            {metric.value}/{metric.maxValue}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`${metric.color} h-2 rounded-full`}
                            style={{ width: `${(metric.value / metric.maxValue) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technical Issues */}
              <div className="mt-5">
                <h3 className="text-sm font-medium text-gray-500 mb-3">Technical Issues</h3>
                {technicalIssues.length > 0 ? (
                  <div className="border rounded-lg p-4">
                    {technicalIssues.map((issue, index) => (
                      <div key={index} className={index > 0 ? "mt-3 pt-3 border-t" : ""}>
                        <div className="flex items-start gap-2">
                          <AlertCircle
                            size={16}
                            className={
                              issue.severity === "high"
                                ? "text-red-500"
                                : issue.severity === "medium"
                                  ? "text-amber-500"
                                  : "text-blue-500"
                            }
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-sm">{issue.type}</p>
                              <span className="text-xs text-gray-500">at {issue.timestamp}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{issue.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">No technical issues reported for this session.</p>
                )}
              </div>
            </div>

            {/* QA Actions */}
            <div className="bg-white p-5 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Quality Assurance Actions</h2>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleFlag}
                  className={`flex items-center gap-2 ${isFlagged ? "bg-red-600 hover:bg-red-700" : "bg-gray-600 hover:bg-gray-700"
                    }`}
                >
                  <Flag size={16} /> {isFlagged ? "Flagged for Review" : "Flag for Review"}
                </Button>
                <Button
                  onClick={handleEscalate}
                  className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700"
                >
                  <AlertCircle size={16} /> Escalate Issue
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AdminContainer>
    </div>
  );
}

// Reusing components from the provided code
const SessionParticipant = ({ ...data }: { tutor?: TutorInfo; student?: StudentInfo }) => {
  const person = data.tutor || data.student;
  if (!person) return null;

  return (
    <div className="flex items-center gap-3">
      <Image
        width={40}
        height={40}
        alt={`${person.name}'s avatar`}
        src={person.avatar}
        className="w-10 h-10 rounded-lg shrink-0 object-cover"
      />
      <div>
        <p className="text-[#555555] font-normal">{person.name}</p>
        <p className="text-sm text-gray-500">ID: {person.id}</p>
        {data.tutor && <p className="text-sm font-medium text-[#344054]">{data.tutor.department}</p>}
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
          className={`w-5 h-5 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      ))}
      <span className="ml-2 text-lg font-medium text-gray-700">{rating}/5</span>
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

// Sample data for the session feedback
const sessionFeedback = "The tutor was very knowledgeable and explained complex concepts in a way that was easy to understand. I appreciated the extra examples provided to help solidify the material.";

// Sample data for session notes
const sessionNotes: SessionNote[] = [
  {
    id: "note-1",
    author: "tutor",
    authorName: "Dr. John Smith",
    authorAvatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    content: "Started with a review of previous concepts. Student showed good understanding of fundamentals.",
    timestamp: "2025-02-28T10:05:00Z",
  },
  {
    id: "note-2",
    author: "tutor",
    authorName: "Dr. John Smith",
    authorAvatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    content: "Covered differential equations and their applications. Assigned practice problems 3-15 for next session.",
    timestamp: "2025-02-28T10:42:00Z",
  },
  {
    id: "note-3",
    author: "student",
    authorName: "Emma Johnson",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    content: "Really appreciated the explanation of implicit differentiation. Will review the practice problems before next session.",
    timestamp: "2025-02-28T10:50:00Z",
  },
];