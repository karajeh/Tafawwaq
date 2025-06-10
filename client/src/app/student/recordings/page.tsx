// import React from "react";
// import Recordings from "./recordings";
// // import DashboardHeader from "src/app/components/dashboard/DashboardHeader";

// const page = () => {
//   return (
//     <div>
//       {/* <DashboardHeader /> */}
//       <Recordings />
//     </div>
//   );
// };

// export default page;

import React from "react";
// import Image from "next/image";
// import teacher from "../../../../public/images/teacher.png";
import Link from "next/link";

const RecordingsPage = () => {
  const recordings = [
    {
      teacherName: "Aleza",
      subjectName: "English",
      description:
        "How do you create compelling presentations that wow your...",
      date: "20 Jan 2022",
    },
    {
      teacherName: "Nihar",
      subjectName: "Science",
      description:
        "How do you create compelling presentations that wow your...",
      date: "20 Jan 2022",
    },
    {
      teacherName: "Aleza",
      subjectName: "History",
      description:
        "How do you create compelling presentations that wow your...",
      date: "20 Jan 2022",
    },
    {
      teacherName: "Aleza",
      subjectName: "Computer",
      description:
        "How do you create compelling presentations that wow your...",
      date: "20 Jan 2022",
    },
  ];

  return (
    <div className="p-6 px-2  mx-auto">
      <div className="mb-4">
        {/* <h1 className="text-2xl font-bold mb-2">Recordings</h1> */}
        <p className="text-red-500">
          Note: The recordings will be available on the platform for 7 days.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recordings.map((recording, index) => (
          <Link key={index} href="/teacher/recordings/vedios">
            <div
              key={index}
              className="w-full rounded-lg  hover:scale-105 transition-all bg-white shadow-lg "
            >
              <div className="p-6">
                {/* <div className="relative h-72 w-full bg-gray-100 rounded-lg mb-4">
                  <Image
                    src={teacher}
                    alt={`${recording.teacherName} teaching ${recording.subjectName}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div> */}

                <div className="space-y-2">
                  <div className="font-medium text-lg">
                    Teacher name: {recording.teacherName}
                  </div>
                  <div className="font-medium text-lg mb-2">
                    Subject name: {recording.subjectName}
                  </div>
                  {/* <p className="text-gray-500 mb-2">
                    Description: {recording.description}
                  </p>

                  <div className="flex items-center space-x-2 mt-4">
                    <div className="w-9 h-9 rounded-full  bg-gray-200">
                      <Image
                        src={teacher}
                        alt="User avatar"
                        //   width={32}
                        //   height={32}
                        className="object-cover w-9 h-9 rounded-full"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Jerome Bell</span>
                      <span className="text-xs text-gray-500">
                        {recording.date}
                      </span>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecordingsPage;
