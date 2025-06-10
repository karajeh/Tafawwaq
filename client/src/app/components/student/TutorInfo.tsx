import React from "react";
import Tags from "./Tags";
import Rating from "./Rating";
import Image from "next/image";
import { TutorCardProps } from "../TutorCard";
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  AcademicCapIcon,
  GlobeAltIcon,
  MapPinIcon,
  BookOpenIcon,
  ClipboardIcon,
} from '@heroicons/react/24/outline';

const InfoItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <li className="flex items-start gap-3 space-x-2 my-3 w-1/2">
    {icon}
    <span className="text-gray-700 text-sm font-[500]">
    <span className=" font-bold">{label}</span>: <span className="block">{value}</span>
    </span>
  </li>
);
const InfoArrayItem: React.FC<{ icon: React.ReactNode; label: string; value: string[] }> = ({ icon, label, value }) => { 
  
  return(
  <li className="flex items-start gap-3 space-x-2 my-3 w-1/2">
    {icon}
    <span className="text-gray-700 text-sm font-[500] w-3/4">
      <span className=" font-bold">{label}</span>: <span className="block">{value.join(', ')}</span>
    </span>
  </li>
)};
const TutorInfo: React.FC<TutorCardProps> = (props) => {
  const {
    name,
    image,
    rating,
    title,
    description,
    rate,
    location,
    memberSince,
    tutoringExperience,
    age,
    gender,
    language,
    educationLevel,
    teachingGrades,
    subjects,
  } = props;

  return (
    <div className="w-full">
      <div className="flex items-start gap-4">
        <Image
          src={image}
          alt="Tutor"
          className="rounded-md aspect-square w-full max-w-[177px] object-cover"
          width={100}
          height={100}
        />
        <div>
          <h1 className="text-2xl font-semibold">{name}</h1>
          <p className="text-secondary text-lg font-medium">{title}</p>
          <p className="text-2xl font-semibold mt-1">AED {rate}/hr</p>
          <Tags tags={["English", "French", "Spanish", "Italian"]} />
          <Rating rating={rating.value} reviews={rating.count} />
        </div>
      </div>
      <p className="text-gray-600 mt-2 text-sm">
        {description}
      </p>
      <div className="w-full p-6 bg-white rounded-lg shadow-md mt-4 mx-auto">
        <ul className="flex flex-wrap">
          <InfoItem icon={<MapPinIcon className="h-6 w-6 text-[#42ABD1]" />} label="Location" value={location} />
          <InfoItem icon={<ClockIcon className="h-6 w-6 text-[#42ABD1]" />} label="Member Since" value={memberSince} />
          <InfoItem icon={<CalendarIcon className="h-6 w-6 text-[#42ABD1]" />} label="Tutoring Experience" value={tutoringExperience} />
          <InfoItem icon={<ClockIcon className="h-6 w-6 text-[#42ABD1]" />} label="Age" value={age} />
          <InfoItem icon={<UserIcon className="h-6 w-6 text-[#42ABD1]" />} label="Gender" value={gender} />
          <InfoItem icon={<GlobeAltIcon className="h-6 w-6 text-[#42ABD1]" />} label="Language" value={language} />
          <InfoItem icon={<AcademicCapIcon className="h-6 w-6 text-[#42ABD1]" />} label="Education Level" value={educationLevel} />
          <InfoArrayItem icon={<ClipboardIcon className="h-6 w-6 text-[#42ABD1]" />} label="Teaching Grades" value={teachingGrades} />
          <InfoArrayItem icon={<BookOpenIcon className="h-6 w-6 text-[#42ABD1]" />} label="Subjects" value={subjects} />
        </ul>
      </div>
    </div>
  );
};

export default TutorInfo;
