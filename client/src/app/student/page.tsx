"use client";
import { Button } from "../components/admin-panel/ui/button";
import TutorReportViewButton from "../components/student/TutorReportViewButton";
import clsx from "clsx";
import Image from "next/image";
import RecordIcon from "../components/student/RecordIcon";
import MessageIcon from "../components/student/MessageIcon";
import Link from "next/link";
import Calendar from "src/components/booking/Calendar";
import { ButtonProps } from "../components/admin-panel/ui/button";

interface Tutor {
  name: string;
  role: string;
}
const ButtonWithAnimation: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      {...props}
      className={clsx(
        props.className,
        "transition-transform transform hover:scale-105 active:scale-95"
      )}
    >
      {children}
    </Button>
  );
};

export default function Home() {
  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <UpcomingLessons />
          </div>
          <BiologyLessonInfo />
        </div>
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Calendar userType="student" />
          <TutorReportsSection />
        </div>
      </div>
    </div>
  );
}

const UpcomingLessons = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          <i className="fas fa-play text-secondary mr-2"></i>Upcoming Lessons
        </h3>
        <i className="fas fa-chevron-down text-gray-500"></i>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
        {["IGCSE", "IB", "National", "SAT"].map((level, idx) => (
          <LessonCard key={idx} level={level} />
        ))}
      </div>
    </div>
  );
};

interface LessonCardProps {
  level: string;
}

const LessonCard = ({ level }: LessonCardProps) => {
  return (
    <div className="bg-[#f9f9f9] p-4 rounded-lg flex justify-between items-start">
      <div className="space-y-1">
        <p className="text-sm font-bold italic">Typography in UX/UI</p>
        <ul className="list-disc text-xs font-medium flex justify-between pl-4 text-[#7D8DA6]">
          <li>{level}</li>
          <li>10:00 AM</li>
        </ul>
      </div>
      <div className="flex flex-col justify-between items-center gap-1">
        <Link
          href={`/student/upcoming-lesson-details`}
          className="text-secondary font-medium text-[10px]"
        >
          Details
        </Link>
        <ButtonWithAnimation
          color="button_primary"
          className="bg-primary text-white w-full md:py-1 !rounded-lg !text-xs"
        >
          Join class
        </ButtonWithAnimation>
      </div>
    </div>
  );
};

const BiologyLessonInfo = () => {
  return (
    <div className="bg-[#f7f7f7] p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Biology</h3>
        <p className="text-2xl font-semibold">02:30 PM</p>
      </div>
      <ul className="text-xs mt-2 text-[#666666]">
        <li>• Respiratory system</li>
        <li>• Digestive system</li>
      </ul>
      <div className="flex items-center w-full justify-between mt-4 text-[#6E6E76] text-xs">
        <span className="flex items-center gap-2">
          <ClockIcon />2 hrs 45 min
        </span>
        <span className="flex items-center gap-2">
          <ClockIcon />
          03-20-2024
        </span>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex">
          <Image
            src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
            alt="John Doe"
            width={50}
            height={50}
            className="rounded-full mr-2"
          />
          <div>
            <p className="font-medium">John Doe</p>
            <p className="text-xs text-[#666]">@john_doe121</p>
          </div>
        </div>
        <button className="hover:opacity-75">
          <MessageIcon />
        </button>
      </div>
      <ButtonWithAnimation
        color="button_primary"
        className="mt-4 bg-secondary text-white w-full md:py-2.5 rounded-md"
      >
        <RecordIcon />
        Join the lesson
      </ButtonWithAnimation>
    </div>
  );
};

const TutorReportsSection = () => {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 px-4 pt-4">Tutor Reports</h3>
      <div className="space-y-4 overflow-y-scroll h-[60vh]">
        {TutorReports.map((tutor, idx) => (
          <TutorReportCard key={idx} idx={idx} tutor={tutor} />
        ))}
      </div>
    </div>
  );
};

interface TutorReportCardProps {
  tutor: Tutor;
  idx: number;
}

const TutorReportCard = ({ tutor, idx }: TutorReportCardProps) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-between pb-4 px-4 rounded-lg",
        TutorReports.length - 1 !== idx ? "border-b border-slate" : ""
      )}
    >
      <div className="flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
          alt={tutor.name}
          width={64}
          height={64}
          className="rounded-xl object-cover aspect-square"
        />
        <div className="ml-4 text-sm">
          <p className="font-medium">{tutor.name}</p>
          <p className="font-bold text-gray-500">{tutor.role}</p>
        </div>
      </div>
      <TutorReportViewButton />
    </div>
  );
};

const ClockIcon = () => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.33524 0C3.30086 0 0 3.30086 0 7.33524C0 11.3696 3.30086 14.6705 7.33524 14.6705C11.3696 14.6705 14.6705 11.3696 14.6705 7.33524C14.6705 3.30086 11.3696 0 7.33524 0ZM8.123 11.0507H7.08551V8.45266H8.123V11.0507ZM7.08551 5.07068H8.123V7.33524H7.08551V5.07068Z"
        fill="#A3A3A3"
      />
    </svg>
  );
};

const TutorReports: Tutor[] = [
  { name: "John Doe", role: "Math Tutor" },
  { name: "Jane Smith", role: "Science Tutor" },
  { name: "Sam Wilson", role: "English Tutor" },
  { name: "Sam Wilson", role: "English Tutor" },
  { name: "Sam Wilson", role: "English Tutor" },
  { name: "Sam Wilson", role: "English Tutor" },
  { name: "Sam Wilson", role: "English Tutor" },
  { name: "Sam Wilson", role: "English Tutor" },
];
