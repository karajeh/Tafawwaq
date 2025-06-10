"use client";
import Image from "next/image";
import React from "react";
import avatar from "public/images/session-oversight/avatar.svg";
import Link from "next/link";

type Recording = {
  videoUrl: string;
  subject: string;
  description: string;
  presenterName: string;
  date: string;
};

const recordingsData: Recording[] = [
  {
    videoUrl: "https://www.youtube.com/embed/YSul9yrAvN4?si=SOEHhFIp8ftqKLQN",
    subject: "English",
    description: "How do you create compelling presentations that wow your...",
    presenterName: "Jerome Bell",
    date: "20 Jan 2022",
  },
  {
    videoUrl: "https://www.youtube.com/embed/YSul9yrAvN4?si=SOEHhFIp8ftqKLQN",
    subject: "English",
    description: "How do you create compelling presentations that wow your...",
    presenterName: "Jerome Bell",
    date: "20 Jan 2022",
  },
  {
    videoUrl: "https://www.youtube.com/embed/YSul9yrAvN4?si=SOEHhFIp8ftqKLQN",
    subject: "English",
    description: "How do you create compelling presentations that wow your...",
    presenterName: "Jerome Bell",
    date: "20 Jan 2022",
  },
  {
    videoUrl: "https://www.youtube.com/embed/YSul9yrAvN4?si=SOEHhFIp8ftqKLQN",
    subject: "English",
    description: "How do you create compelling presentations that wow your...",
    presenterName: "Jerome Bell",
    date: "20 Jan 2022",
  },
  {
    videoUrl: "https://www.youtube.com/embed/YSul9yrAvN4?si=SOEHhFIp8ftqKLQN",
    subject: "English",
    description: "How do you create compelling presentations that wow your...",
    presenterName: "Jerome Bell",
    date: "20 Jan 2022",
  },
  {
    videoUrl: "https://www.youtube.com/embed/YSul9yrAvN4?si=SOEHhFIp8ftqKLQN",
    subject: "English",
    description: "How do you create compelling presentations that wow your...",
    presenterName: "Jerome Bell",
    date: "20 Jan 2022",
  },
];

const Recordings: React.FC = () => {
  return (
    <div className="pt-[20px] md:pt-[0px] px-[14px] md:px-[0px] pb-[20px] md:pb-[0px]">
      {/* <h1 className="text-[18px] font-bold">Settings</h1>
      <div>
        <h1 className="mt-[10px]">
          <span className="text-[#FF3939] text-[14px]">Note:</span> The
          recordings will be available on the platform for 20 days.
        </h1>
      </div> */}
      <div className="flex md:gap-[12px] 2xl:gap-[24px] flex-wrap">
        {recordingsData.map((recording, index) => (
          <div
            key={index}
            className="relative mt-[24px] shadow-lg rounded-[16px] px-[14px] pb-[16px] md:w-[350px] 2xl:w-[430px]"
          >
            <div className="relative w-full h-[280px] overflow-hidden rounded-md">
              <Image
                src="https://images.pexels.com/photos/5212648/pexels-photo-5212648.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Video thumbnail"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray bg-opacity-30">
                <button
                  style={{ backgroundColor: "rgba(171, 167, 169, 0.75)" }}
                  className="w-[60px] h-[60px] bg-gray-200 rounded-full flex items-center justify-center shadow-md"
                  onClick={() => window.open(recording.videoUrl, "_blank")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-[24px] h-[24px] text-gray-500"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <h1 className="text-[18px] mt-[32px]">
                Subject name: {recording.subject}
              </h1>
              <h1 className="mt-[8px] text-wrap">
                Description: {recording.description}
              </h1>
            </div>
            <div className="flex mt-[24px] gap-[12px] items-center">
              <Image src={avatar} alt="avatar" className="rounded-full" />
              <div>
                <Link
                  href={`/teacher/resources/${recording.presenterName}`}
                  className="font-semibold text-[14px]"
                >
                  {recording.presenterName}
                </Link>
                <h1 className="font-normal text-[14px]">{recording.date}</h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recordings;
