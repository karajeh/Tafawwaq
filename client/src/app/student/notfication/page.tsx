"use client";
import Link from "next/link";
import { useState } from "react";
import { MdArrowBack } from "react-icons/md";

const NotificationPage = () => {
  const [notifications] = useState([
    {
      id: 1,
      title: "New Message",
      description: "You have received a new message from John Doe",
      time: "2 hours ago",
      isRead: false,
    },
    {
      id: 2,
      title: "Assignment Due",
      description: "Your Math assignment is due tomorrow",
      time: "5 hours ago",
      isRead: true,
    },
    // Add more notifications as needed
  ]);

  const [yesterdayNotifications] = useState([
    {
      id: 3,
      title: "Class Reminder",
      description: "Don't forget your Physics class at 10 AM",
      time: "1 day ago",
      isRead: false,
    },
    {
      id: 4,
      title: "Event Invitation",
      description: "You are invited to the school event next week",
      time: "1 day ago",
      isRead: true,
    },
    // Add more notifications as needed
  ]);

  return (
    <div className=" mx-auto">
      {/* <div className=" text-2xl mb-5">
        Good Morning,<span className="font-bold ml-1">Samantha</span> 😃
      </div> */}

      <Link href={"/student"}>
        <MdArrowBack className="text-2xl mb-5" />
      </Link>

      <div className=" font-semibold text-lg mb-4">Today</div>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg  ${
              notification.isRead ? "bg-gray-50" : "bg-white "
            }`}
          >
            <div className="flex justify-between items-start">
              <div className=" flex gap-4">
                <div className=" w-16 h-16 bg-zinc-400 rounded-lg"></div>
                <div>
                  <h3 className="font-semibold">{notification.title}</h3>
                  <p className="text-gray-600 mt-1">
                    {notification.description}
                  </p>
                </div>
              </div>
              <span className="text-sm text-zinc-400">{notification.time}</span>
            </div>
          </div>
        ))}
      </div>
      <div className=" font-semibold text-lg mb-2 mt-5">Yesterday</div>
      <div className="space-y-4">
        {yesterdayNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg  ${
              notification.isRead ? "bg-gray-50" : "bg-white "
            }`}
          >
            <div className="flex justify-between items-start">
              <div className=" flex gap-4">
                <div className=" w-16 h-16 bg-zinc-400 rounded-lg"></div>
                <div>
                  <h3 className="font-semibold">{notification.title}</h3>
                  <p className="text-gray-600 mt-1">
                    {notification.description}
                  </p>
                </div>
              </div>
              <span className="text-sm text-zinc-400">{notification.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPage;
