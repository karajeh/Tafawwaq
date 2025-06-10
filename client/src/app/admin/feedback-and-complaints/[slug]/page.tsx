"use client";
import clsx from "clsx";
import { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

export default function Home() {
  const [message, setMessage] = useState("");

  const messages = [
    {
      type: "sender",
      message:
        "Cras sit amet nibh libero, in gravida nulla. Nulla vel met scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.",
      date: "4th July",
      time: "6:00 AM",
      img: "https://plus.unsplash.com/premium_photo-1710911198710-3097c518f0e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      type: "me",
      message:
        "Cras sit amet nibh libero, in gravida nulla. Nulla vel met scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.",
      date: "4th July",
      time: "6:00 AM",
      img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      type: "sender",
      message:
        "Cras sit amet nibh libero, in gravida nulla. Nulla vel met scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.",
      date: "4th July",
      time: "6:00 AM",
      img: "https://plus.unsplash.com/premium_photo-1710911198710-3097c518f0e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

  return (
    <div className="flex flex-col md:gap-5 flex-1 w-full h-full">
      <div className="md:border border-y md:rounded-2xl flex flex-col p-4">
        <div className="flex flex-row justify-between">
          <p className="text-[#3A5377]">Mr Ahmad</p>
          <span className="bg-[#FE98001f] text-[#FE9800] text-[13px] flex items-center justify-center rounded-md px-2.5 py-1.5">
            <p>Pending</p>
          </span>
        </div>
        <p className="text-sm mt-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry...
        </p>
      </div>
      <div className="md:border border-y md:rounded-2xl overflow-hidden w-full h-full flex flex-col p-4 relative">
        {/* Header */}
        <div className="flex items-center gap-3.5 border-b pb-4">
          <Image
            width={36}
            height={36}
            src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
            alt=""
            className="w-9 h-9 rounded-full"
          />
          <div className="text-sm">
            <p className="text-text_primary font-semibold">Mr Ahmad</p>
            <div className="divide-x-2 flex flex-row space-x-2">
              <p className="text-[#606060]">MR. Ahmad</p>
              <p className="text-[#606060] pl-2">21 Feb 2020</p>
              <p className="text-[#606060] pl-2">Last Reply: 24 min ago</p>
            </div>
          </div>

          <button className="absolute top-2 right-2 bg-primary text-xs md:text-sm px-3 md:px-4 rounded-md py-1 text-white">
            Mark As Resolved
          </button>
        </div>

        <div className="flex flex-col justify-between w-full h-full">
          <div className="flex flex-col space-y-4 my-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  message.type === "me" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={clsx(
                    "flex gap-5",
                    message.type === "me" ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <div className="shrink-0 flex flex-col text-xs justify-center items-center text-gray-500">
                    <Image
                      width={36}
                      height={36}
                      src={message.img}
                      alt=""
                      className="w-6 h-6 rounded-full"
                    />
                    <div className="mt-1">{message.date}</div>
                    <div className="mt-1">{message.time}</div>
                  </div>
                  <div
                    className={`${
                      message.type === "me"
                        ? "bg-blue-100 text-blue-900"
                        : "bg-gray-100 text-gray-900"
                    } px-4 py-2 rounded-lg max-w-lg`}
                  >
                    <p className="text-sm">{message.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3.5 border-t pt-4">
            <div className="flex justify-between w-full">
              <div className="flex gap-3 items-center">
                <Smily />
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  type="text"
                  placeholder="Type a message here"
                  className="outline-none"
                />
              </div>
              <div className="flex gap-3 items-center">
                <AttachIcon />
                <MicIcon />
                <div>
                  <PaperAirplaneIcon className="h-7 w-7 text-[#3B1B7C] cursor-pointer -rotate-45 bg-[#3B1B7C2f] p-1.5 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Smily = ({ onClick }: { onClick?: () => void }) => {
  return (
    <svg
      onClick={onClick}
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 20.479C12.6522 20.479 15.1957 19.4254 17.0711 17.5501C18.9464 15.6747 20 13.1312 20 10.479C20 7.82684 18.9464 5.2833 17.0711 3.40794C15.1957 1.53257 12.6522 0.479004 10 0.479004C7.34784 0.479004 4.8043 1.53257 2.92893 3.40794C1.05357 5.2833 0 7.82684 0 10.479C0 13.1312 1.05357 15.6747 2.92893 17.5501C4.8043 19.4254 7.34784 20.479 10 20.479ZM8.75 8.604C8.75 9.639 8.19 10.479 7.5 10.479C6.81 10.479 6.25 9.639 6.25 8.604C6.25 7.569 6.81 6.729 7.5 6.729C8.19 6.729 8.75 7.569 8.75 8.604ZM5.35625 12.4378C5.4998 12.3549 5.67039 12.3324 5.8305 12.3753C5.99061 12.4182 6.12712 12.523 6.21 12.6665C6.59389 13.3319 7.14632 13.8845 7.81166 14.2685C8.47701 14.6525 9.23178 14.8545 10 14.854C10.7682 14.8545 11.523 14.6525 12.1883 14.2685C12.8537 13.8845 13.4061 13.3319 13.79 12.6665C13.8307 12.5949 13.8852 12.532 13.9504 12.4815C14.0155 12.431 14.09 12.3938 14.1696 12.3722C14.2491 12.3507 14.3321 12.345 14.4139 12.3556C14.4956 12.3663 14.5744 12.3929 14.6458 12.4342C14.7172 12.4754 14.7797 12.5303 14.8298 12.5958C14.8799 12.6612 14.9165 12.736 14.9376 12.8157C14.9586 12.8953 14.9637 12.9784 14.9526 13.0601C14.9414 13.1417 14.9142 13.2204 14.8725 13.2915C14.3789 14.1469 13.6687 14.8573 12.8133 15.351C11.958 15.8447 10.9876 16.1045 10 16.104C9.01237 16.1045 8.04204 15.8447 7.18668 15.351C6.33132 14.8573 5.6211 14.1469 5.1275 13.2915C5.04462 13.148 5.02216 12.9774 5.06506 12.8173C5.10796 12.6571 5.2127 12.5206 5.35625 12.4378ZM12.5 10.479C11.81 10.479 11.25 9.639 11.25 8.604C11.25 7.569 11.81 6.729 12.5 6.729C13.19 6.729 13.75 7.569 13.75 8.604C13.75 9.639 13.19 10.479 12.5 10.479Z"
        fill="#8C979A"
      />
    </svg>
  );
};

const AttachIcon = ({ onClick }: { onClick?: () => void }) => {
  return (
    <svg
      onClick={onClick}
      width="14"
      height="22"
      viewBox="0 0 14 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.26172 21.479C3.6772 21.479 0.761719 18.5355 0.761719 14.9165V5.729C0.761719 5.24515 1.15004 4.85406 1.62833 4.85406C2.10679 4.85406 2.4951 5.24515 2.4951 5.729V14.9165C2.4951 17.5695 4.63315 19.729 7.26172 19.729C9.89028 19.729 12.0283 17.5695 12.0283 14.9165V5.29145C12.0283 3.60276 10.6677 2.22906 8.9951 2.22906C7.32234 2.22906 5.96172 3.60276 5.96172 5.29145V14.0416C5.96172 14.7651 6.54491 15.3541 7.26172 15.3541C7.97853 15.3541 8.56172 14.7651 8.56172 14.0416V5.729C8.56172 5.24515 8.95004 4.85406 9.42833 4.85406C9.90679 4.85406 10.2951 5.24515 10.2951 5.729V14.0416C10.2951 15.7302 8.93433 17.104 7.26172 17.104C5.58911 17.104 4.22833 15.7302 4.22833 14.0416V5.29145C4.22833 2.63857 6.36638 0.479004 8.9951 0.479004C11.6237 0.479004 13.7617 2.63857 13.7617 5.29145V14.9165C13.7617 18.5355 10.8462 21.479 7.26172 21.479Z"
        fill="#8C979A"
      />
    </svg>
  );
};
const MicIcon = ({ onClick }: { onClick?: () => void }) => {
  return (
    <svg
      onClick={onClick}
      width="15"
      height="20"
      viewBox="0 0 15 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.76172 12.479C9.42172 12.479 10.7517 11.139 10.7517 9.479L10.7617 3.479C10.7617 1.819 9.42172 0.479004 7.76172 0.479004C6.10172 0.479004 4.76172 1.819 4.76172 3.479V9.479C4.76172 11.139 6.10172 12.479 7.76172 12.479ZM13.0617 9.479C13.0617 12.479 10.5217 14.579 7.76172 14.579C5.00172 14.579 2.46172 12.479 2.46172 9.479H0.761719C0.761719 12.899 3.48172 15.709 6.76172 16.199V19.479H8.76172V16.199C12.0417 15.719 14.7617 12.899 14.7617 9.479H13.0617Z"
        fill="#8C979A"
      />
    </svg>
  );
};
