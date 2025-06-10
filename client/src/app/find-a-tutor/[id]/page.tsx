"use client";
import Image from "next/image";
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  AcademicCapIcon,
  GlobeAltIcon,
  MapPinIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import groupOfPeople from "../../../../public/images/tutor-profile/about-image.png";

import reviews from "../../../lib/reviews_data.json";
import { useParams } from "next/navigation";
import tutorData from "../../../lib/tutors_details.json";
import { useEffect, useState } from "react";

export default function Profile() {
  const { id } = useParams();
  const tutor = tutorData.tutors.find(
    (tutor) => tutor.id === parseInt(id as string, 10)
  );
  const tutorImage = tutor?.image;

  const [displayCount, setDisplayCount] = useState(3);
  useEffect(() => {
    document.title = `${tutor?.name}
     - ${tutor?.subjects} Tutor | Tafawwaq Tutoring`;
  }, [id, tutor?.name, tutor?.subjects]);
  const handleViewAll = () => {
    setDisplayCount(reviews.reviews.length);
  };
  return (
    <div className="mx-auto bg-career_bg min-h-screen py-8 px-4 rounded-lg">
      <div className="bg-white lg:p-16 p-4 rounded-lg shadow-md md:w-5/6 flex flex-col mx-auto">
        <div className="flex w-full flex-col md:flex-row gap-8 md:gap-16 items-center mt-4">
          <div className="w-[20%] flex items-center justify-center">
            <Image
              src={tutorImage || ""}
              alt="Profile Picture"
              className="rounded-full"
              height={456}
              width={456}
            />
          </div>
          <div className="flex gap-3 flex-col items-center md:items-start md:w-[70%]">
            <div className="text-center md:text-left">
              <h1 className="text-xl md:text-2xl text-header font-[500]">
                {tutor?.name}
              </h1>
              <p className="text-gray-600 mt-1 md:whitespace-wrap text-header">
                {tutor?.description}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start items-center space-x-2 md:space-x-4 text-header text-sm mt-2">
                <span>{tutor?.title}</span>
                <span className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 inline-block" /> London, UK
                </span>
                <span className="flex items-center gap-2">
                  <BanknotesIcon className="h-4 w-4 inline-block" />
                  AED {tutor?.rate} / hour
                </span>
                <span className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4 inline-block" />
                  Member Since, Aug 19,2020
                </span>
                {/* <span className="hidden md:inline">•</span> */}
                <span className="flex items-center">
                  <span className="mr-1">⭐</span> {tutor?.rating.value}
                </span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-3 mt-2">
              <button className="bg-none border border-stone-300 text-[#42ABD1] px-6 md:px-8 py-2 rounded-md transition-transform transform hover:scale-105 active:scale-95">
                Message
              </button>
              <button className="bg-secondary text-white px-6 md:px-10 py-3 rounded-md transition-transform transform hover:scale-105 active:scale-95">
                Book a Lesson
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-300 my-12" />
        <div className="flex xl:flex-row flex-col gap-20 justify-between xl:items-start items-center">
          <div className="lg:w-4/6 flex gap-6 flex-col justify-start items-start ">
            <div className="max-w-md pb-8">
              <h2 className="text-2xl font-[500] xl:text-left text-center">
                About
              </h2>
              <div>
                <Image
                  src={groupOfPeople}
                  alt="Introduction video"
                  className="w-full rounded-md"
                  width={800}
                  height={600}
                />
              </div>
              <div className="py-8">
                <p className="text-sm text-stone-400 font-normal">
                  Hello my name is Nicole Wells and web developer from Portland.
                  In pharetra orci dignissim, blandit mi semper, ultricies diam.
                  Suspendisse malesuada suscipit nunc non volutpat. Sed porta
                  nulla id orci laoreet tempor non consequat enim. Sed vitae
                  aliquam velit. Aliquam ante erat, blandit at pretium et,
                  accumsan ac est. Integer vehicula rhoncus molestie. Morbi
                  ornare ipsum sed sem condimentum, et pulvinar tortor luctus.
                  Suspendisse condimentum lorem ut elementum aliquam.
                </p>
                <p className="mt-4 text-sm text-stone-400 font-normal">
                  Mauris nec erat ut libero vulputate pulvinar. Aliquam ante
                  erat, blandit at pretium et, accumsan ac est. Integer vehicula
                  rhoncus molestie. Morbi ornare ipsum sed sem condimentum, et
                  pulvinar tortor luctus. Suspendisse condimentum lorem ut
                  elementum aliquam. Mauris nec erat ut libero vulputate
                  pulvinar.
                </p>
              </div>
            </div>

            <div className="max-w-md pb-8">
              <h3 className="text-3xl font-[500] mb-4">Schedule</h3>
              <div className="w-full flex justify-between gap-5 md:gap-6 md:text-base mb-2 text-[#666666] text-sm">
                <span className="text-gray-700">Monday - Thursday</span>
                <span className="text-gray-500">09:30 AM – 05:00 PM</span>
              </div>
              <div className="flex justify-between gap-5 md:gap-6 md:text-base mb-2 text-[#666666] text-sm">
                <span>Friday</span>
                <span>09:30 AM – 01:00 PM</span>
              </div>
              <div className="flex justify-between gap-5 md:gap-6 md:text-base text-[#666666] text-sm">
                <span className="text-gray-700">Saturday – Sunday</span>
                <span className="text-gray-500">05:45 AM – 08:00 PM</span>
              </div>
            </div>

            <h3 className="text-3xl font-[500] mb-4">Education</h3>

            <div className="px-3 py-8 bg-white border border-stone-100 rounded-lg shadow-md md:min-w-96 md:px-6">
              <div className="flex flex-col md:flex-row items-start mb-10">
                <div className="w-8 h-8 bg-blue-100 text-[#42ABD1] rounded-full flex items-center justify-center mr-4">
                  M
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center md:justify-normal md:gap-6">
                    <h3 className="font-[500]">Bachelors in Fine Arts</h3>
                    <span className="text-xs text-[#42ABD1] bg-blue-100 px-2 py-0.5 rounded-xl">
                      2012 - 2014
                    </span>
                  </div>
                  <a
                    href="#"
                    className="text-[#42ABD1] text-sm hover:underline mb-4 inline-block"
                  >
                    Modern College
                  </a>
                  <p className="text-gray-600 text-sm text-stone-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Proin a ipsum tellus. Interdum et malesuada fames ac ante
                    ipsum primis in faucibus.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start">
                <div className="w-8 h-8 bg-blue-100 text-[#42ABD1] rounded-full flex items-center justify-center mr-4">
                  H
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center md:justify-normal md:gap-6">
                    <h3 className="font-[500]">Computer Science</h3>
                    <span className="text-xs text-[#42ABD1] bg-blue-100 px-2 py-0.5 rounded-xl">
                      2012 - 2014
                    </span>
                  </div>
                  <a
                    href="#"
                    className="text-[#42ABD1] text-sm hover:underline mb-4 inline-block"
                  >
                    Harvard University
                  </a>
                  <p className="text-gray-600 text-sm text-stone-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Proin a ipsum tellus. Interdum et malesuada fames ac ante
                    ipsum primis in faucibus.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-3xl font-[500] mb-4 mt-8">Work & Experience</h3>

            <div className="px-6 py-8 bg-white border border-stone-100 rounded-lg shadow-md md:min-w-96">
              <div className="flex flex-col md:flex-row items-start mb-10">
                <div className="w-8 h-8 bg-blue-100 text-[#42ABD1] rounded-full flex items-center justify-center mr-4">
                  M
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center md:justify-normal md:gap-6">
                    <h3 className="font-[500]">Product Designer</h3>
                    <span className="text-xs text-[#42ABD1] bg-blue-100 px-2 py-0.5 rounded-xl">
                      2012 - 2014
                    </span>
                  </div>
                  <a
                    href="#"
                    className="text-[#42ABD1] text-sm hover:underline mb-4 inline-block"
                  >
                    Modern College
                  </a>
                  <p className="text-gray-600 text-sm text-stone-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Proin a ipsum tellus. Interdum et malesuada fames ac ante
                    ipsum primis in faucibus.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start">
                <div className="w-8 h-8 bg-blue-100 text-[#42ABD1] rounded-full flex items-center justify-center mr-4">
                  H
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center md:justify-normal md:gap-6">
                    <h3 className="font-[500]">Sr UX designer</h3>
                    <span className="text-xs text-[#42ABD1] bg-blue-100 px-2 py-0.5 rounded-xl">
                      2012 - 2014
                    </span>
                  </div>
                  <a
                    href="#"
                    className="text-[#42ABD1] text-sm hover:underline mb-4 inline-block"
                  >
                    Harvard University
                  </a>
                  <p className="text-gray-600 text-sm text-stone-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Proin a ipsum tellus. Interdum et malesuada fames ac ante
                    ipsum primis in faucibus.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-3xl font-[500] mb-4 mt-8">Awards</h3>

            <div className="px-6 py-8 bg-white border border-stone-100 rounded-lg shadow-md md:min-w-96">
              <div className="flex flex-col md:flex-row items-start mb-10">
                <div className="w-8 h-8 bg-blue-100 text-[#42ABD1] rounded-full flex items-center justify-center mr-4">
                  M
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center md:justify-normal md:gap-6">
                    <h3 className="font-[500]">Perfect Attandance Program</h3>
                    <span className="text-xs text-[#42ABD1] bg-blue-100 px-2 py-0.5 rounded-xl">
                      2012 - 2014
                    </span>
                  </div>
                  <a
                    href="#"
                    className="text-[#42ABD1] text-sm hover:underline mb-4 inline-block"
                  >
                    Modern College
                  </a>
                  <p className="text-gray-600 text-sm text-stone-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Proin a ipsum tellus. Interdum et malesuada fames ac ante
                    ipsum primis in faucibus.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start">
                <div className="w-8 h-8 bg-blue-100 text-[#42ABD1] rounded-full flex items-center justify-center mr-4">
                  H
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center md:justify-normal md:gap-6">
                    <h3 className="font-[500]">Top performer recognition</h3>
                    <span className="text-xs text-[#42ABD1] bg-blue-100 px-2 py-0.5 rounded-xl">
                      2012 - 2014
                    </span>
                  </div>
                  <a
                    href="#"
                    className="text-[#42ABD1] text-sm hover:underline mb-4 inline-block"
                  >
                    Harvard University
                  </a>
                  <p className="text-gray-600 text-sm text-stone-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Proin a ipsum tellus. Interdum et malesuada fames ac ante
                    ipsum primis in faucibus.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-6 flex-col justify-start items-center">
            <div className="lg:max-w-sm w-96 p-6 bg-white rounded-lg shadow-md">
              <ul className="space-y-4">
                <li className="flex items-start gap-3 space-x-2">
                  <CalendarIcon className="h-6 w-6 text-[#42ABD1]" />
                  <span className="text-gray-700 text-sm font-[500]">
                    Tutoring Experience:
                    <span className="block">0-2 Years</span>
                  </span>
                </li>
                <li className="flex items-start gap-3 space-x-2">
                  <ClockIcon className="h-6 w-6 text-[#42ABD1]" />
                  <span className="text-gray-700 text-sm font-[500]">
                    Age: <span className="block">28-33 Years</span>
                  </span>
                </li>
                <li className="flex items-start gap-3 space-x-2">
                  <UserIcon className="h-6 w-6 text-[#42ABD1]" />
                  <span className="text-gray-700 text-sm font-[500]">
                    Gender: <span className="block">Female</span>
                  </span>
                </li>
                <li className="flex items-start gap-3 space-x-2">
                  <GlobeAltIcon className="h-6 w-6 text-[#42ABD1]" />
                  <span className="text-gray-700 text-sm font-[500]">
                    Language:
                    <span className="block">English, German, Spanish</span>
                  </span>
                </li>
                <li className="flex items-start gap-3 space-x-2">
                  <AcademicCapIcon className="h-6 w-6 text-[#42ABD1]" />
                  <span className="text-gray-700 text-sm font-[500]">
                    Education Level:
                    <span className="block">Master Degree</span>
                  </span>
                </li>
              </ul>
            </div>

            <div className="lg:max-w-sm w-96 px-6 py-4 bg-white rounded-lg shadow-md">
              <h2 className="font-[500] text-gray-900 mb-3">Teaching Grades</h2>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1.5 text-xs font-[500] bg-[#F1F2F4] text-black rounded-full">
                  Elementary
                </span>
                <span className="px-4 py-1.5 text-xs font-[500] bg-[#F1F2F4] text-black rounded-full">
                  Middle School
                </span>
                <span className="px-4 py-1.5 text-xs font-[500] bg-[#F1F2F4] text-black rounded-full">
                  High School
                </span>
                <span className="px-4 py-1.5 text-xs font-[500] bg-[#F1F2F4] text-black rounded-full">
                  Vocational Training
                </span>
              </div>
            </div>

            <div className="lg:max-w-sm w-96 p-6 bg-white rounded-lg shadow-md">
              <h2 className="font-[500] text-gray-900 mb-3">Subjects</h2>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1.5 text-xs font-[500] bg-[#F1F2F4] text-black  rounded-full">
                  English Speaking
                </span>
                <span className="px-4 py-1.5 text-xs font-[500] bg-[#F1F2F4] text-black  rounded-full">
                  English Listening
                </span>
                <span className="px-4 py-1.5 text-xs font-[500] bg-[#F1F2F4] text-black  rounded-full">
                  English Writing
                </span>
                <span className="px-4 py-1.5 text-xs font-[500] bg-[#F1F2F4] text-black  rounded-full">
                  Vocabulary
                </span>
              </div>
            </div>

            <div className="lg:max-w-sm w-96 p-6 bg-white rounded-lg shadow-md">
              <h2 className="font-[500] text-black mb-6">
                Cancellation Policy
              </h2>
              <p className="text-sm text-[#666666]">
                You&apos;re allowed to cancel for free within
                <strong> 5 days</strong> of your booking date.
              </p>
            </div>
            <div className="lg:max-w-sm w-96 text-header text-lg font-[500]">
              <p className="text-left">{reviews.reviews.length} Reviews</p>
            </div>

            <div className="w-full h-[250vh] flex flex-col gap-4 overflow-y-scroll">
              {reviews.reviews.slice(0, displayCount).map((review, idx) => (
                <div
                  className="lg:max-w-sm w-96 px-4 py-6 bg-white rounded-lg shadow-md"
                  key={idx}
                >
                  <h3 className="font-[500] mb-2">{review.title}</h3>
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {Array.from({ length: review.rating }).map((_, idx) => (
                        <svg
                          key={idx}
                          className="w-4 h-4 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path d="M12 17.27l6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-800">
                      {review.rating}.0
                    </span>
                  </div>
                  <div className="flex items-center mb-4 gap-3">
                    <Image
                      className="w-10 h-10 rounded-full object-cover mr-2"
                      src={review.image}
                      alt={review.name}
                      width={40}
                      height={40}
                    />
                    <div className="w-full flex items-center justify-between">
                      <p className="text-header font-[500]">{review.name}</p>
                      <p className="text-header text-xs font-[500]">
                        {review.date}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-xs text-stone-500 tracking-wide leading-5">
                    {review.text}
                  </p>
                  <a href=" " className="text-secondary text-xs">
                    Read More
                  </a>
                </div>
              ))}
              {displayCount < reviews.reviews.length && (
                <div className="flex justify-center items-center mt-2">
                  <button
                    className="bg-[#42ABD1] text-white px-12 py-4 rounded-md text-lg transition-transform transform hover:scale-105 active:scale-95"
                    onClick={handleViewAll}
                  >
                    View All
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
