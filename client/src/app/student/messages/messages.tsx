"use client";

import Image from "next/image";
import avatar from "public/images/session-oversight/avatar.svg";

const Messages = () => {
  const messages = [
    {
      id: 1,
      name: "Daniel Berraldi",
      avatar,
      lastMessage: "Sure, I'll explain that concept",
      time: "10:15 AM",
      unread: false,
    },
    {
      id: 2,
      name: "James Atkinson",
      avatar,
      lastMessage: "Let's discuss your progress",
      time: "Yesterday",
      unread: true,
      number: 3,
    },
    {
      id: 3,
      name: "Olivia James",
      avatar,
      lastMessage: "The assignment is due next week",
      time: "Yesterday",
      unread: false,
    },
    {
      id: 4,
      name: "Rodrigo Mendez",
      avatar,
      lastMessage: "I checked your latest submission",
      time: "Wed",
      unread: false,
    },
    {
      id: 5,
      name: "Michael Trippier",
      avatar,
      lastMessage: "Do you have any questions?",
      time: "Tue",
      unread: true,
      number: 2,
    },
  ];

  return (
    <div className="md:w-[376px] p-[24px] bg-[#F7F7F780] rounded-lg h-full shadow-sm">
      <div className="mt-[20px]">
        <div className="relative">
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full p-3 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#A3D154] bg-white"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h1 className="text-[#9a9999] text-[14px] mb-2 ml-[2px]">
          PREVIOUS CHATS
        </h1>
        <div className="space-y-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                message.unread ? "bg-[#F0F7E6]" : "bg-white hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-[12px] flex-1 min-w-0">
                <Image
                  src={message.avatar}
                  alt=""
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <h1
                    className={`text-[15px] ${
                      message.unread ? "font-semibold" : "font-medium"
                    }`}
                  >
                    {message.name}
                  </h1>
                  <p className="text-[13px] text-gray-500 truncate">
                    {message.lastMessage}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[11px] text-gray-500">
                    {message.time}
                  </span>
                  {message.number && (
                    <div className="bg-[#A3D154] rounded-full w-5 h-5 flex items-center justify-center mt-1">
                      <span className="text-[10px] font-bold text-white">
                        {message.number}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messages;
