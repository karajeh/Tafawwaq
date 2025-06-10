'use client';
import React, { useEffect, useState } from 'react';
import {
  Book,
  Clock,
  MessageSquareText,
  TrendingUp,
  Video,
} from 'lucide-react';
import Image from 'next/image';
import DashboardPNG from 'public/images/main-dashboard/dashboard.jpeg';
import calendar from 'public/images/main-dashboard/calendar.svg';
import clock from 'public/images/main-dashboard/clock.svg';
import {
  getTeacherEarningsSummary,
  getTeacherOnboardingUrl,
  teacherWithdraw,
} from 'src/api/teacherService';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

// balance typescript type from stripe, only get the types form (available, instant_variable, pending)
interface IEarnings {
  earningsAvailable: number;
  earningsInReview: number;
  earningsToday: number;
}

// import Image1 from "public/images/main-dashboard/img1.png";
// import Image2 from "public/images/main-dashboard/img2.png";
// import Image3 from "public/images/main-dashboard/img3.png";
// const upcomingLessons = [
//   {
//     title: "Get Started with Figjam",
//     name: "Student Name",
//     hours: "2.5",
//     image: Image1,
//   },
//   {
//     title: "Get Started with Figjam",
//     name: "Student Name",
//     hours: "2.5",
//     image: Image2,
//   },
//   {
//     title: "Get Started with Figjam",
//     name: "Student Name",
//     hours: "2.5",
//     image: Image3,
//   },
// ];
interface LessonDetail {
  studentProfile: string;
  subject: string;
  curriculum: string;
  statement: string;
  time: string;
  day: string;
}

const MainDashboard: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<LessonDetail | null>(
    null,
  );
  const [earnings, setEarnings] = useState<IEarnings>({
    earningsToday: 0,
    earningsAvailable: 0,
    earningsInReview: 0,
  });
  const router = useRouter();

  const openModal = (lesson: LessonDetail) => {
    setSelectedLesson(lesson);
    setModalIsOpen(true);
  };

  console.log('selectedLesson', selectedLesson);
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedLesson(null);
  };

  const dummyLessonDetail = {
    studentProfile: 'John Doe',
    subject: 'Learn Figma From Scratch',
    curriculum: 'Basic',
    statement:
      'Lorem ipsum is a dummy text being used to show the description of the problem, student needs help with',
    time: '10:00 AM',
    day: 'Monday',
  };

  const handleAccountOnboarding = async () => {
    const onboardingUrl = await getTeacherOnboardingUrl();
    router.push(onboardingUrl);
  };

  const handleTeacherWithdraw = async () => {
    const withdraw = await teacherWithdraw();
    toast.success(withdraw.message);
  };

  // get teacher balance using the api on useEffect
  useEffect(() => {
    const fetchBalance = async () => {
      const earnings = await getTeacherEarningsSummary();
      setEarnings(earnings);
    };
    fetchBalance();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* BIO Session */}
        <div className="col-span-1 xl:col-span-6">
          <div className="relative h-full overflow-hidden rounded-lg shadow-xl">
            <Image
              src={DashboardPNG}
              alt="BIO Session background"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute inset-0 bg-[#A3D154] opacity-80"></div>
            <div className="relative p-6 text-white text-center flex flex-col items-center justify-center h-full">
              <h2 className="text-xl font-semibold mb-2">
                Your BIO Session will begin in
              </h2>
              <div className="text-4xl xl:text-6xl font-bold mb-2">
                00:12:58
              </div>
              <p className="mb-4">45 min session</p>
              <button className="text-white bg-[#A3D154] px-4 py-2 mx-auto rounded-md flex items-center gap-2">
                <Video />
                Join the lesson
              </button>
            </div>
          </div>
        </div>

        {/* Upcoming Lessons */}
        {/* <div className="col-span-1 xl:col-span-4">
          <div className="bg-white p-6 rounded-lg shadow-md h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl text-[#42ABD1] font-semibold">
                Upcoming lessons
              </h2>
              <a href="#" className="text-[#5DADE2] hover:underline">
                View All
              </a>
            </div>
            <div className="space-y-4">
              {upcomingLessons.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Image
                    src={item.image}
                    alt="Logo"
                    width={512}
                    height={512}
                    className="w-12 h-12 bg-gray-200 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-[#3F3F44]">{item.name}</p>
                  </div>
                  <div className="ml-auto">
                    <p className="text-sm text-[#3F3F444D]">
                      {item.hours} Hours
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}

        {/* Earnings */}
        <div className="col-span-1 xl:col-span-6 hidden xl:block">
          <div className="bg-white rounded-lg shadow-md h-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl text-[#66797C]">Your Earnings</h2>
                <TrendingUp className="text-black" />
              </div>
              <div className="flex flex-col gap-2 xl:gap-0 xl:flex-row justify-between">
                <div>
                  <p className="text-lg text-[#3F3F44]">Today Earning</p>
                  <p className="text-4xl text-[#3F3F44]">
                    {earnings.earningsToday.toFixed(2) + '$'}
                  </p>
                </div>
                {/* <div>
                  <p className="text-lg text-[#3F3F44]">Pending</p>
                  <p className="text-4xl text-[#A3D154]">$58</p>
                </div> */}
                <div>
                  <p className="text-lg text-[#3F3F44]">In Review</p>
                  <p className="text-4xl text-[#3F3F44]">
                    {earnings.earningsInReview.toFixed(2) + '$'}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#3F3F44] flex items-center justify-between text-white rounded-b-lg px-6 py-3">
              <div className="flex flex-col justify-between items-center mb-2">
                <p className="text-[#FEFEFEB2] text-xl">Available</p>
                <p className="text-4xl text-[#42ABD1] ">
                  {earnings.earningsAvailable.toFixed(2) + '$'}
                </p>
              </div>
              <div className="space-x-4">
                {/* Based on teacher connected account we should display each button accordingly  */}
                <button
                  className="w-40 bg-[#A3D154] text-[#3F3F44] rounded-lg py-2 font-semibold"
                  onClick={handleTeacherWithdraw}
                >
                  Withdraw
                </button>
                <button
                  className="w-40 bg-[#A3D154] text-[#3F3F44] rounded-lg py-2 font-semibold"
                  onClick={handleAccountOnboarding}
                >
                  Connect Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Requests */}
      <div className="mt-6 shadow-md rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-[#66797C] font-semibold">
            Upcoming Lessons
          </h2>
          <a href="#" className="text-[#5DADE2] hover:underline">
            View All
          </a>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-36">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">John Doe</h3>
                <MessageSquareText className="text-gray-500" size={20} />
              </div>
              <p className="text-sm text-[#6E6E76] mb-2">
                Lorem ipsum is a dummy text being used to show the description
                of the problem, student needs help with
              </p>
              <h4 className="tracking-normal text-[#3F3F44] text-xl mb-2">
                Learn figma From scratch
              </h4>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-[#E5F7FD] text-[#3F3F44] px-4 py-1 rounded-full">
                  Basic
                </span>
              </div>
              <div className="flex items-center justify-between my-3">
                <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                  <div className="text-sm flex items-center gap-1">
                    <Book color="#A3D154" size={20} /> 23 Lessons
                  </div>
                  <div className="text-sm flex items-center gap-1">
                    <Clock color="#A3D154" size={20} /> 23 hrs
                  </div>
                </div>
                <p className="text-xl md:text-3xl text-[#3F3F44] mb-2">$257</p>
              </div>
              <div className="flex gap-2">
                <button
                  className="flex-1 bg-[#42ABD1] text-white py-1 rounded-full text-xs"
                  onClick={() => openModal(dummyLessonDetail)}
                >
                  View Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Earnings for small screens */}
      <div className="block xl:hidden mt-6">
        <div className="bg-white rounded-lg shadow-md h-full">
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl text-[#66797C]">Your Earnings</h2>
              <TrendingUp className="text-black" />
            </div>
            <div className="flex flex-col gap-2 xl:gap-0 xl:flex-row justify-between">
              <div>
                <p className="text-lg text-[#3F3F44]">Today Earning</p>
                <p className="text-4xl text-[#3F3F44]">$15,010</p>
              </div>
              <div>
                <p className="text-lg text-[#3F3F44]">Pending</p>
                <p className="text-4xl text-[#A3D154]">$58</p>
              </div>
              <div>
                <p className="text-lg text-[#3F3F44]">In Review</p>
                <p className="text-4xl text-[#3F3F44]">$70</p>
              </div>
            </div>
          </div>
          <div className="bg-[#3F3F44] flex items-center justify-between text-white rounded-b-lg px-6 py-3">
            <div className="flex flex-col justify-between items-center mb-2">
              <p className="text-[#FEFEFEB2] text-xl">Available</p>
              <p className="text-4xl text-[#42ABD1] ">$167</p>
            </div>
            <button className="w-40 bg-[#A3D154] text-[#3F3F44] rounded-lg py-2 font-semibold">
              Withdraw
            </button>
          </div>
        </div>
      </div>

      {modalIsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Lesson Detail</h2>
            <div className="flex gap-24">
              <div>
                <p className="text-gray text-sm font-medium">Demi Wikinson</p>
                <p className="text-gray text-sm">
                  <strong>English</strong>
                </p>
              </div>
              <div>
                <p className="text-gray text-sm font-medium">Curriculum</p>
                <p className="text-gray text-sm">
                  <strong>Basic</strong>
                </p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray text-sm">
                <strong>Satement</strong>
              </p>
              <p className="text-gray text-sm font-medium">
                Lorem ipsum is a dummy text being used to show the description
                of the problem, student needs help with
              </p>
            </div>
            <div>
              <p className="text-gray text-sm font-medium mt-4">Time</p>
              <div className="flex gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Image
                    src={calendar}
                    alt="calendar"
                    width={20}
                    height={20}
                    color="#a2a8b1"
                  ></Image>
                  <p className="text-gray text-sm font-semibold">Jan 6, 2022</p>
                </div>
                <div className="flex items-center gap-1">
                  <Image
                    src={clock}
                    alt="clock"
                    width={20}
                    height={20}
                    color="#a2a8b1"
                  ></Image>
                  <p className="text-gray text-sm font-semibold">09:00 AM</p>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                className="mt-4 bg-[#A3D154] text-white px-5 py-1 rounded-md font-semibold"
                onClick={closeModal}
              >
                Join Now
              </button>
              <button
                className="mt-4 bg-[#f5f2f3] text-black px-7 py-1 rounded-md border-2 border-[#c7c4c4] font-semibold"
                onClick={closeModal}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainDashboard;
