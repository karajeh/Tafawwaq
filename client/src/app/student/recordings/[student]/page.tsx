import React from "react";
import { Clock } from "lucide-react";
import Image from "next/image";
import profile from "public/images/teacher.png";
import less from "public/images/less.png";

type Props = {
  params: {
    teacher: string;
  };
};

const TeacherPage = ({ params }: Props) => {
  const teacherName = decodeURIComponent(params.teacher);

  const lessonData = [
    {
      number: "01",
      title: "Title of the subject",
      description:
        "Description: How do you create compelling presentations that wow your...",
    },
    {
      number: "01",
      title: "Title of the subject",
      description:
        "Description: How do you create compelling presentations that wow your...",
    },
    {
      number: "01",
      title: "Title of the subject",
      description:
        "Description: How do you create compelling presentations that wow your...",
    },
    {
      number: "01",
      title: "Title of the subject",
      description:
        "Description: How do you create compelling presentations that wow your...",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 pt-0">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl">Good Morning, <span className=" font-semibold">Samantha 😊</span></h1>
      </div>

      {/* Recordings Section */}
      <div>
        <h2 className="text-lg font-medium mb-2">Recordings</h2>
        <p className="text-sm text-red-500 mb-4">
          Note: The recordings will be available on the platform for 20 days.
        </p>

        {/* Main Content Layout */}
        <div className="lg:flex lg:gap-6">
          {/* Left Side - Main Video */}
          <div className="lg:flex-1">
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src={profile}
                alt="Teacher"
                className="w-full h-full object-cover bg-slate"
              />
              {/* <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg">
                <div className="w-8 h-8 flex items-center justify-center">
                  <div className="w-0 h-0 border-l-8 border-l-gray-800 border-y-transparent border-y-4 ml-1" />
                </div>
              </button> */}
            </div>

            {/* Teacher Info */}
            <div className="mt-4">
              <div className=" flex items-center justify-between mb-4 text-xl ">
                <p className="font-medium mb-2">Teacher name: {teacherName}</p>
                <p className="font-medium mb-2">Subject name: English</p>
              </div>

              <p className=" text-lg text-[#475467] text-gray-600">
                Description: How do you create compelling presentations that wow
                your...
              </p>
            </div>
          </div>

          {/* Right Side - Lesson List */}
          <div className="lg:w-[400px] space-y-4">
            {lessonData.map((lesson, index) => (
              <div key={index} className="bg-white rounded-lg pb-4  flex gap-4">
                <div className="relative  w-32 h-32 flex-shrink-0">
                  <Image
                    src={less}
                    alt={`Lesson ${lesson.number}`}
                    className="w-full h-full object-cover rounded-lg "
                  />
                </div>
                <div className="flex-1 ">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm mb-2">lesson: {lesson.number}</p>
                    <Clock className="w-4 h-4 text-gray-500" />
                  </div>
                  <h3 className="font-medium my-2">{lesson.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {lesson.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherPage;
