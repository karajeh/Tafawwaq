'use client';
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LessonRequestCard = ({ lesson }: { lesson: any }) => {
  return (
    <div className="bg-white p-3 md:p-4 rounded-lg shadow-md flex flex-col md:flex-row items-start md:items-center justify-between md:space-x-6 space-y-4 md:space-y-0">
      {/* Profile Section */}
      <div className="flex items-center space-x-4 w-full md:w-auto">
        <Image
          src={lesson.profileImage || "/default-profile.png"}
          width={100}
          height={100}
          alt="Lecturer"
          className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
        />
        <div>
          <h4 className="text-base md:text-lg font-semibold">{lesson.name}</h4>
          <p className="text-xs md:text-sm text-gray-500">{lesson.title}</p>
        </div>
      </div>

      {/* Date & Time Section */}
      <div className="flex flex-row md:flex-col justify-between w-full md:w-auto space-y-0 md:space-y-2 text-gray-600 text-xs md:text-sm">
        <div>
          <p className="font-medium">Select Date & Time</p>
          <div className="flex items-center space-x-2">
            <i className="far fa-calendar-alt text-gray-500"></i>
            <span>{lesson.date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <i className="far fa-clock text-gray-500"></i>
            <span>{lesson.time}</span>
          </div>
        </div>
      </div>
      
      {/* Hours & Actions Section */}
      <div className="flex flex-row md:flex-col items-center md:items-start justify-between w-full md:w-auto space-y-0 md:space-y-2">
        <div className="text-gray-600 text-xs md:text-sm">
          <p>Total hours: {lesson.hours}</p>
        </div>
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-1.5 md:py-2 px-3 md:px-4 rounded-lg text-xs md:text-sm"
          onClick={() => console.log(`Accept lesson: ${lesson.name}`)}
        >
          Accept
        </button>
      </div>
       
      {/* Price & Decline Section */}
      <div className="flex flex-row md:flex-col items-center justify-between w-full md:w-auto space-y-0 md:space-y-2">
        <div className="text-gray-600 text-xs md:text-sm">
          <p>Total Price: ${lesson.price}</p>
        </div>
        <button
          className="bg-red-500 hover:bg-red-600 text-white py-1.5 md:py-2 px-3 md:px-4 rounded-lg text-xs md:text-sm"
          onClick={() => console.log(`Decline lesson: ${lesson.name}`)}
        >
          Decline
        </button>
      </div>
    </div>
  );
};

const LessonRequests = ({ onClose }: { onClose: () => void }) => {
  const lessonRequests = [
    {
      name: "Demi Wilkinson",
      title: "English Lecturer",
      date: "Jan 6, 2022",
      time: "09:00 AM",
      hours: "5 Hours",
      price: "500",
      profileImage:
        "https://images.unsplash.com/photo-1697665682392-d064b7c82304?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "John Doe",
      title: "Mathematics Lecturer",
      date: "Jan 7, 2022",
      time: "11:00 AM",
      hours: "3 Hours",
      price: "300",
      profileImage:
        "https://images.unsplash.com/photo-1697665682392-d064b7c82304?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "Demi Wilkinson",
        title: "English Lecturer",
        date: "Jan 6, 2022",
        time: "09:00 AM",
        hours: "5 Hours",
        price: "500",
        profileImage:
          "https://images.unsplash.com/photo-1697665682392-d064b7c82304?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        name: "John Doe",
        title: "Mathematics Lecturer",
        date: "Jan 7, 2022",
        time: "11:00 AM",
        hours: "3 Hours",
        price: "300",
        profileImage:
          "https://images.unsplash.com/photo-1697665682392-d064b7c82304?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
  ];

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto p-4 md:p-6 rounded-lg shadow-xl relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 md:top-4 md:right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>

        <h3 className="text-2xl font-semibold mb-6">Lesson Requests</h3>
        <div className="space-y-6">
          {lessonRequests.map((lesson, idx) => (
            <LessonRequestCard key={idx} lesson={lesson} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LessonRequests;
