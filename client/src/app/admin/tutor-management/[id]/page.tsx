"use client";
import { Button } from "../../../components/admin-panel/ui/button";
import Image from "next/image";
import { useParams } from "next/navigation";
import leftArrow from "public/images/tutor-management/left-arrow.svg";
import rightArrow from "public/images/tutor-management/right-arrow.svg";
import file from "public/images/tutor-management/file.svg";
import video from "public/images/tutor-management/video.svg";
import cloud from "public/images/tutor-management/cloud.svg";
import profile from "public/images/tutor-management/profile.svg";
import line from "public/images/tutor-management/line.svg";

import { useEffect, useState } from "react";

// Define the type for tutor data
interface TutorData {
  id: number;
  slug: string;
  requestType: string;
  approved: boolean;
  tutor: {
    name: string;
    department: string;
    teacher: string;
    experience: string;
    studenttype: string;
    language: string;
    hoursperweek: string;
    hoursperweekintafawwaq: string;
    profilefeedback: string;
  };
  generalInfo: {
    username: string;
    email:string;
    country: string;
    gender: string;
    DOB: string;
    whatsapp: string;
    license: string;
  };
  subjectITeach: {
    curriculum: string;
    level: string;
    subject: string;
  };
  educationalBackground: {
    highestDegreeAttained: string;
    major: string;
    university: string;
    cv: string;
  };
  businessAtTafawwaq: {
    hourlyRate: string;
    cancellationNotice: number;
    discountOffers: number;
    Availability: string;
  };
  publicProfile: {
    title: string;
    bio: string;
    avatar: string;
    about: string;
    introductionVideo: string;
  };
  businessContract: {
    firstName: string;
    lastName: string;
  };
}


export default function Home() {
  const { id } = useParams();
  const [tutorData, setTutorData] = useState<TutorData | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [profileMenu, setProfileMenu] = useState<boolean>(false);

  useEffect(() => {
    const getTutor = () => {
      const index = tableDataTutor.findIndex(
        (tut) => tut.id === parseInt(id as string)
      );
      setCurrentIndex(index);
      setTutorData(tableDataTutor[index]);
    };
    getTutor();
  }, [id]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? tableDataTutor.length - 1 : prevIndex - 1
    );
    setTutorData(tableDataTutor[currentIndex]);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % tableDataTutor.length);
    setTutorData(tableDataTutor[currentIndex]);
  };

  if (!tutorData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="w-full bg-[#E4E4E4] p-12 flex items-center justify-between relative">
        <Image
          src={leftArrow}
          alt="left-arrow"
          width={30}
          height={30}
          className="cursor-pointer"
          onClick={handlePrevious}
        />
        <Image
          src={rightArrow}
          alt="right-arrow"
          width={30}
          height={30}
          className="cursor-pointer"
          onClick={handleNext}
        />
        <div className="px-3 absolute md:bottom-[-60%] bottom-[-100%] right-0 w-full flex md:flex-row flex-col gap-2 md:justify-between justify-center md:items-end items-center">
          <div className="flex md:flex-row flex-col items-center justify-center gap-2">
            <div className="h-28 w-28 rounded-lg relative">
              <Image
                src={tutorData?.publicProfile.avatar}
                alt="avatar"
                layout="fill"
                className="cursor-pointer rounded-lg object-cover object-center"
                onClick={() => setProfileMenu(!profileMenu)}
              />
              {profileMenu && (
                <div className="absolute md:bottom-0 bottom-[-80%] md:right-[-130%] right-0 bg-white rounded shadow-lg z-50 p-2">
                  <div className="flex flex-col justify-center gap-2 cursor-pointer">
                    <div className="cursor-pointer flex items-center gap-1">
                      <Image src={cloud} alt="cloud" width={18} height={18} />
                      <h4 className="text-black text-xs">Download Picture</h4>
                    </div>
                    <Image src={line} alt="line" layout="fill" />
                    <div className="cursor-pointer flex items-center gap-1">
                      <Image
                        src={profile}
                        alt="profile"
                        width={16}
                        height={16}
                      />
                      <h4 className="text-black text-xs">Change Picture</h4>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1 items-center md:items-start md:self-end">
              <h3 className="text-black text-lg font-semibold">
                {tutorData?.tutor.name}
              </h3>
              <h4 className="text-[#94A5AB] text-xs">
                {tutorData?.tutor.department} Teacher
              </h4>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Button
              color="button_primary"
              className="bg-green-500 cursor-pointer"
            >
              Approve
            </Button>
            <Button
              color="button_primary"
              className="bg-red-500 cursor-pointer"
            >
              Decline
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-wrap gap-4 md:mt-20 mt-32">
        <div className="flex flex-col p-1 gap-1 border border-[#94A5AB] rounded-lg">
          <h4 className="text-[#94A5AB] text-xs">
            Have you ever been a teacher?
          </h4>
          <h4 className="text-black text-xs">{tutorData.tutor.teacher}</h4>
        </div>
        <div className="flex flex-col p-1 gap-1 border border-[#94A5AB] rounded-lg">
          <h4 className="text-[#94A5AB] text-xs">
            How many years of tutoring experience do you have?
          </h4>
          <h4 className="text-black text-xs">{tutorData.tutor.experience}</h4>
        </div>
        <div className="flex flex-col p-1 gap-1 border border-[#94A5AB] rounded-lg">
          <h4 className="text-[#94A5AB] text-xs">
            Which type of students do you like to teach?
          </h4>
          <h4 className="text-black text-xs">{tutorData.tutor.studenttype}</h4>
        </div>
        <div className="flex flex-col p-1 gap-1 border border-[#94A5AB] rounded-lg">
          <h4 className="text-[#94A5AB] text-xs">
            In which languages can you teach?
          </h4>
          <h4 className="text-black text-xs">{tutorData.tutor.language}</h4>
        </div>
        <div className="flex flex-col p-1 gap-1 border border-[#94A5AB] rounded-lg">
          <h4 className="text-[#94A5AB] text-xs">
            How many hours per week do you tutor outside of Tafawwaq?
          </h4>
          <h4 className="text-black text-xs">{tutorData.tutor.hoursperweek}</h4>
        </div>
        <div className="flex flex-col p-1 gap-1 border border-[#94A5AB] rounded-lg">
          <h4 className="text-[#94A5AB] text-xs">
            Ideally, how many hours per week would you like to tutor in
            Tafawwaq?
          </h4>
          <h4 className="text-black text-xs">
            {tutorData.tutor.hoursperweekintafawwaq}
          </h4>
        </div>
        <div className="flex flex-col p-1 gap-1 border border-[#94A5AB] rounded-lg">
          <h4 className="text-[#94A5AB] text-xs">
            Can we use your profile and feedbacks in our marketing materials?
          </h4>
          <h4 className="text-black text-xs">
            {tutorData.tutor.profilefeedback}
          </h4>
        </div>
      </div>
      {/* General Information */}
      <h2 className="text-black text-base">General Information</h2>
      <div className="w-full flex flex-wrap gap-4">
        <div className="flex flex-col p-1 gap-1 border border-[#94A5AB] rounded-lg">
          <h4 className="text-[#94A5AB] text-xs">username</h4>
          <h4 className="text-black text-xs">
            {tutorData.generalInfo.username}
          </h4>
        </div>
        <div className="flex flex-col p-1 gap-1 border border-[#94A5AB] rounded-lg">
          <h4 className="text-[#94A5AB] text-xs">email</h4>
          <h4 className="text-black text-xs">
            {tutorData.generalInfo.email}
          </h4>
        </div>
        <div className="flex flex-col p-1 gap-1 border border-[#94A5AB] rounded-lg">
          <h4 className="text-[#94A5AB] text-xs">Country</h4>
          <h4 className="text-black text-xs">
            {tutorData.generalInfo.country}
          </h4>
        </div>
        <div className="flex flex-col p-1 gap-1 border border-[#94A5AB] rounded-lg">
          <h4 className="text-[#94A5AB] text-xs">Gender</h4>
          <h4 className="text-black text-xs">{tutorData.generalInfo.gender}</h4>
        </div>
        <div className="flex flex-col p-1 gap-1 border border-[#94A5AB] rounded-lg">
          <h4 className="text-[#94A5AB] text-xs">Date of birth</h4>
          <h4 className="text-black text-xs">{tutorData.generalInfo.DOB}</h4>
        </div>
        <div className="flex flex-col p-1 gap-1 border border-[#94A5AB] rounded-lg">
          <h4 className="text-[#94A5AB] text-xs">Whatsapp Number</h4>
          <h4 className="text-black text-xs">
            {tutorData.generalInfo.whatsapp}
          </h4>
        </div>
        <div className="flex items-center justify-center border overflow-hidden border-[#94A5AB] rounded-lg">
          <div className="flex flex-col gap-1 p-1">
            <h4 className="text-[#94A5AB] text-xs">
              UAE private tutor-MOHRE permit/license?
            </h4>
            <h4 className="text-black text-xs">
              {tutorData.generalInfo.license}
            </h4>
          </div>
          <div className="flex items-center justify-center gap-1 p-1 h-full bg-primary">
            <Image src={file} alt="file" width={18} height={18} />
            <h4 className="text-xs text-white">View File</h4>
          </div>
        </div>
      </div>
      {/* Subjects I Teach */}
      <h2 className="text-black text-base">Subjects I Teach</h2>
      <div className="w-full flex flex-wrap gap-4">
        <div className="flex flex-col p-1 gap-1 border border-[#94A5AB] rounded-lg">
          <h4 className="text-[#94A5AB] text-xs">Curriculum</h4>
          <h4 className="text-black text-xs">
            {tutorData.subjectITeach.curriculum}
          </h4>
        </div>
        <div className="flex flex-col p-1 gap-1 border border-[#94A5AB] rounded-lg">
          <h4 className="text-[#94A5AB] text-xs">Level</h4>
          <h4 className="text-black text-xs">
            {tutorData.subjectITeach.level} Level
          </h4>
        </div>
        <div className="flex flex-col p-1 gap-1 border border-[#94A5AB] rounded-lg">
          <h4 className="text-[#94A5AB] text-xs">Subject</h4>
          <h4 className="text-black text-xs">
            {tutorData.subjectITeach.subject}
          </h4>
        </div>
      </div>
      {/* Educational Background */}
      <h2 className="text-black text-base">Educational Background</h2>
      <div className="w-full flex flex-wrap gap-4">
        <div className="flex flex-col p-1 gap-1 border border-[#94A5AB] rounded-lg">
          <h4 className="text-[#94A5AB] text-xs">Highest Degree Attained</h4>
          <h4 className="text-black text-xs">
            {tutorData.educationalBackground.highestDegreeAttained}
          </h4>
        </div>
        <div className="flex flex-col p-1 gap-1 border border-[#94A5AB] rounded-lg">
          <h4 className="text-[#94A5AB] text-xs">Major</h4>
          <h4 className="text-black text-xs">
            {tutorData.educationalBackground.major}
          </h4>
        </div>
        <div className="flex flex-col p-1 gap-1 border border-[#94A5AB] rounded-lg">
          <h4 className="text-[#94A5AB] text-xs">University Name</h4>
          <h4 className="text-black text-xs">
            {tutorData.educationalBackground.university}
          </h4>
        </div>
        <div className="flex items-center justify-center border overflow-hidden border-[#94A5AB] rounded-lg">
          <div className="flex flex-col gap-1 p-1">
            <h4 className="text-[#94A5AB] text-xs">CV</h4>
            <h4 className="text-black text-xs">
              {tutorData.educationalBackground.cv}
            </h4>
          </div>
          <div className="flex items-center justify-center gap-1 p-1 h-full bg-primary">
            <Image src={file} alt="file" width={18} height={18} />
            <h4 className="text-xs text-white">View File</h4>
          </div>
        </div>
      </div>
      {/* Business at Tafawwaq */}
      <h2 className="text-black text-base">Business at Tafawwaq</h2>
      <div className="w-full flex flex-wrap gap-4">
        <div className="flex flex-col p-1 gap-1 border border-[#94A5AB] rounded-lg">
          <h4 className="text-[#94A5AB] text-xs">Hourly Rate</h4>
          <h4 className="text-black text-xs">
            {tutorData.businessAtTafawwaq.hourlyRate}
          </h4>
        </div>
        <div className="flex flex-col p-1 gap-1 border border-[#94A5AB] rounded-lg">
          <h4 className="text-[#94A5AB] text-xs">Discount Offer</h4>
          <h4 className="text-black text-xs">
            {tutorData.businessAtTafawwaq.discountOffers}
          </h4>
        </div>
        <div className="flex flex-col p-1 gap-1 border border-[#94A5AB] rounded-lg">
          <h4 className="text-[#94A5AB] text-xs">Cancellation Notice</h4>
          <h4 className="text-black text-xs">
            {tutorData.businessAtTafawwaq.cancellationNotice} Days
          </h4>
        </div>
        <div className="flex flex-col p-1 gap-1 border border-[#94A5AB] rounded-lg">
          <h4 className="text-[#94A5AB] text-xs">Availability</h4>
          <h4 className="text-black text-xs">
            {tutorData.businessAtTafawwaq.Availability}
          </h4>
        </div>
      </div>
      {/* Public Profile */}
      <h2 className="text-black text-base">Public Profile</h2>
      <div className="w-full flex flex-wrap gap-4">
        <div className="flex flex-col p-1 gap-1 border border-[#94A5AB] rounded-lg">
          <h4 className="text-[#94A5AB] text-xs">Title</h4>
          <h4 className="text-black text-xs">
            {tutorData.publicProfile.title}
          </h4>
        </div>
        <div className="flex flex-col p-1 gap-1 border border-[#94A5AB] rounded-lg">
          <h4 className="text-[#94A5AB] text-xs">Bio</h4>
          <h4 className="text-black text-xs">{tutorData.publicProfile.bio}</h4>
        </div>
        <div className="flex flex-col p-1 gap-1 border border-[#94A5AB] rounded-lg">
          <h4 className="text-[#94A5AB] text-xs">About the Tutor</h4>
          <h4 className="text-black text-xs">
            {tutorData.publicProfile.about}
          </h4>
        </div>
        <div className="flex items-center justify-center border overflow-hidden border-[#94A5AB] rounded-lg">
          <div className="flex flex-col gap-1 p-1">
            <h4 className="text-[#94A5AB] text-xs">Introduction Video</h4>
            <h4 className="text-black text-xs">
              {tutorData.publicProfile.introductionVideo}
            </h4>
          </div>
          <div className="flex items-center justify-center gap-1 p-1 h-full bg-primary">
            <Image src={video} alt="file" width={15} height={15} />
            <h4 className="text-xs text-white">Play Video</h4>
          </div>
        </div>
      </div>
      {/* Tafawwaq Tutor Contract */}
      <h2 className="text-black text-base">Tafawwaq Tutor Contract</h2>
      <div className="w-full flex flex-wrap gap-4">
        <div className="flex flex-col p-1 gap-1 border border-[#94A5AB] rounded-lg">
          <h4 className="text-[#94A5AB] text-xs">First Name</h4>
          <h4 className="text-black text-xs">
            {tutorData.businessContract.firstName}
          </h4>
        </div>
        <div className="flex flex-col p-1 gap-1 border border-[#94A5AB] rounded-lg">
          <h4 className="text-[#94A5AB] text-xs">Last Name</h4>
          <h4 className="text-black text-xs">
            {tutorData.businessContract.lastName}
          </h4>
        </div>
      </div>
    </div>
  );
}


const tableDataTutor: TutorData[] = [
  {
    id: 1,
    slug: "",
    requestType: "tutor",
    approved: true,

    tutor: {
      name: "John Doe",
      department: "Mathematics",
      teacher: "Yes",
      experience: "5-10",
      studenttype: "High School",
      language: "English",
      hoursperweek: "11-20",
      hoursperweekintafawwaq: "35+",
      profilefeedback: "Yes",
    },
    generalInfo: {
      username: "jhondoe123",
      email:"jhondoe123@gmail.com",
      country: "The Bahamas",
      gender: "Male",
      DOB: "19/08/1987",
      whatsapp: "+201028840504",
      license: "license.pdf",
    },
    subjectITeach: {
      curriculum: "Singapore Curriculum",
      level: "Secondary",
      subject: "Math",
    },
    educationalBackground: {
      highestDegreeAttained: "Associate Degree",
      major: "Biology",
      university: "Abertay University GB",
      cv: "jhon doe - teacher.pdf",
    },
    businessAtTafawwaq: {
      hourlyRate: "$50",
      cancellationNotice: 2,
      discountOffers: 4,
      Availability:
        "Monday - Friday From 09:00 AM To 05:30PM Saturday and Sunday Closed",
    },
    publicProfile: {
      title:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      avatar:
        "https://images.unsplash.com/photo-1727093267255-e9b31b2b35ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2MXx8fGVufDB8fHx8fA%3D%3D",
      about:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",

      introductionVideo: "video001.mp4",
    },
    businessContract: {
      firstName: "Waleed",
      lastName: "Suleman",
    },
  },
  {
    id: 2,
    slug: "",
    requestType: "tutor",
    approved: true,

    tutor: {
      name: "Jane Smith",
      department: "Physics",
      teacher: "Yes",
      experience: "5-10",
      studenttype: "High School",
      language: "English",
      hoursperweek: "11-20",
      hoursperweekintafawwaq: "35+",
      profilefeedback: "Yes",
    },
    generalInfo: {
      username: "jhondoe123",
      email:"jhondoe123@gmail.com",
      country: "The Bahamas",
      gender: "Male",
      DOB: "19/08/1987",
      whatsapp: "+201028840504",
      license: "license.pdf",
    },
    subjectITeach: {
      curriculum: "Singapore Curriculum",
      level: "Secondary",
      subject: "Math",
    },
    educationalBackground: {
      highestDegreeAttained: "Associate Degree",
      major: "Biology",
      university: "Abertay University GB",
      cv: "jhon doe - teacher.pdf",
    },
    businessAtTafawwaq: {
      hourlyRate: "$50",
      cancellationNotice: 2,
      discountOffers: 4,
      Availability:
        "Monday - Friday From 09:00 AM To 05:30PM Saturday and Sunday Closed",
    },
    publicProfile: {
      title:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      avatar:
        "https://images.unsplash.com/photo-1453396450673-3fe83d2db2c4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      about:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",

      introductionVideo: "video001.mp4",
    },
    businessContract: {
      firstName: "Waleed",
      lastName: "Suleman",
    },
  },
  {
    id: 3,
    slug: "",
    requestType: "tutor",
    approved: false,

    tutor: {
      name: "Emma Brown",
      department: "Chemistry",
      teacher: "Yes",
      experience: "5-10",
      studenttype: "High School",
      language: "English",
      hoursperweek: "11-20",
      hoursperweekintafawwaq: "35+",
      profilefeedback: "Yes",
    },
    generalInfo: {
      username: "jhondoe123",
      email:"jhondoe123@gmail.com",
      country: "The Bahamas",
      gender: "Male",
      DOB: "19/08/1987",
      whatsapp: "+201028840504",
      license: "license.pdf",
    },
    subjectITeach: {
      curriculum: "Singapore Curriculum",
      level: "Secondary",
      subject: "Math",
    },
    educationalBackground: {
      highestDegreeAttained: "Associate Degree",
      major: "Biology",
      university: "Abertay University GB",
      cv: "jhon doe - teacher.pdf",
    },
    businessAtTafawwaq: {
      hourlyRate: "$50",
      cancellationNotice: 2,
      discountOffers: 4,
      Availability:
        "Monday - Friday From 09:00 AM To 05:30PM Saturday and Sunday Closed",
    },
    publicProfile: {
      title:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      avatar:
        "https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      about:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",

      introductionVideo: "video001.mp4",
    },
    businessContract: {
      firstName: "Waleed",
      lastName: "Suleman",
    },
  },
  {
    id: 4,
    slug: "",
    requestType: "tutor",
    approved: true,

    tutor: {
      name: "Liam Wilson",
      department: "Biology",
      teacher: "Yes",
      experience: "5-10",
      studenttype: "High School",
      language: "English",
      hoursperweek: "11-20",
      hoursperweekintafawwaq: "35+",
      profilefeedback: "Yes",
    },
    generalInfo: {
      username: "jhondoe123",
      email:"jhondoe123@gmail.com",
      country: "The Bahamas",
      gender: "Male",
      DOB: "19/08/1987",
      whatsapp: "+201028840504",
      license: "license.pdf",
    },
    subjectITeach: {
      curriculum: "Singapore Curriculum",
      level: "Secondary",
      subject: "Math",
    },
    educationalBackground: {
      highestDegreeAttained: "Associate Degree",
      major: "Biology",
      university: "Abertay University GB",
      cv: "jhon doe - teacher.pdf",
    },
    businessAtTafawwaq: {
      hourlyRate: "$50",
      cancellationNotice: 2,
      discountOffers: 4,
      Availability:
        "Monday - Friday From 09:00 AM To 05:30PM Saturday and Sunday Closed",
    },
    publicProfile: {
      title:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      avatar:
        "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHV0b3J8ZW58MHx8MHx8fDA%3D%3D",
      about:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",

      introductionVideo: "video001.mp4",
    },
    businessContract: {
      firstName: "Waleed",
      lastName: "Suleman",
    },
  },
  {
    id: 5,
    slug: "",
    requestType: "tutor",
    approved: false,
    tutor: {
      name: "Olivia Taylor",
      department: "History",
      teacher: "Yes",
      experience: "5-10",
      studenttype: "High School",
      language: "English",
      hoursperweek: "11-20",
      hoursperweekintafawwaq: "35+",
      profilefeedback: "Yes",
    },
    generalInfo: {
      username: "jhondoe123",
      email:"jhondoe123@gmail.com",
      country: "The Bahamas",
      gender: "Male",
      DOB: "19/08/1987",
      whatsapp: "+201028840504",
      license: "license.pdf",
    },
    subjectITeach: {
      curriculum: "Singapore Curriculum",
      level: "Secondary",
      subject: "Math",
    },
    educationalBackground: {
      highestDegreeAttained: "Associate Degree",
      major: "Biology",
      university: "Abertay University GB",
      cv: "jhon doe - teacher.pdf",
    },
    businessAtTafawwaq: {
      hourlyRate: "$50",
      cancellationNotice: 2,
      discountOffers: 4,
      Availability:
        "Monday - Friday From 09:00 AM To 05:30PM Saturday and Sunday Closed",
    },
    publicProfile: {
      title:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      avatar:
        "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      about:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",

      introductionVideo: "video001.mp4",
    },
    businessContract: {
      firstName: "Waleed",
      lastName: "Suleman",
    },
  },
];
