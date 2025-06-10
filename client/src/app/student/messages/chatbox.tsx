"use client";

import { useState } from "react";
import Image from "next/image";
import avatar from "public/images/session-oversight/avatar.svg";
import threedot from "public/images/session-oversight/threedot.svg";
import seen from "public/images/student/seen.svg";
import upImage from "public/images/student/upImage.svg";

const Chatbox = () => {
  const [copyStatus, setCopyStatus] = useState<string>("");

  const username = "@ilkayolivier";

  const copyUsername = () => {
    navigator.clipboard
      .writeText(username)
      .then(() => {
        setCopyStatus("Copied!");
        setTimeout(() => setCopyStatus(""), 2000); // Clear the status after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        setCopyStatus("Failed to copy");
      });
  };

  return (
    <div className="p-[16px] md:p-[24px] shadow-lg rounded-[16px] bg-white">
      <div className="p-3 bg-red-100 text-red-700 rounded-lg mb-4 text-sm">
        <strong>WARNING:</strong> Please{" "}
        <strong>
          do not share any personal information, including phone numbers, email
          addresses, or any other sensitive data
        </strong>
        . Any attempts to share such information will be automatically detected,
        and may result in strict disciplinary actions, including{" "}
        <strong>permanent bans</strong>.
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[12px] text-[#3F3F44] font-medium">
          <Image
            src={avatar}
            alt=""
            className="w-[50px] h-[50px] rounded-full"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-semibold">Ilkay Olivier</h1>
              <span className="text-gray-500 text-sm">@ilkayolivier</span>
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={copyUsername}
                title="Copy username"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                </svg>
                {copyStatus && (
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {copyStatus}
                  </span>
                )}
              </button>
            </div>
            <div className="flex items-center gap-[4px]">
              <div className="p-1 bg-[#A3D154] w-2 rounded-full">
                <h1></h1>
              </div>
              <h1 className="text-sm text-gray-500">Online</h1>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[22px]">
          <Image src={threedot} alt="" />
        </div>
      </div>
      <hr className="border-t border-[#c0bebe] mt-[20px]" />

      <div className="h-[400px] overflow-y-auto py-4">
        <div className="mt-[20px]">
          <div className="flex items-center justify-end">
            <div className="px-[24px] py-[12px] bg-[#A3D154] rounded-tl-[8px] rounded-tr-[8px] rounded-bl-[8px] max-w-[80%]">
              <h1 className="text-[#FFFFFF] text-[14px]">
                Hey there! How can I help you today with your course material?
              </h1>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <div className="mt-[8px] flex items-center gap-[10px]">
              <h1 className="text-[12px] text-[#a09e9e]">10:15 AM</h1>
              <Image src={seen} alt="" />
            </div>
          </div>
        </div>

        <div className="mt-[20px]">
          <div className="flex items-center">
            <div className="px-[24px] py-[12px] bg-[#F1F1F1] rounded-tl-[8px] rounded-tr-[8px] rounded-br-[8px] max-w-[80%]">
              <h1 className="text-[#737272] text-[14px]">
                I&apos;m having trouble understanding the concept from last
                week&apos;s lecture. Can you explain it again?
              </h1>
            </div>
          </div>
          <div className="flex items-center">
            <div className="mt-[8px] flex items-center gap-[10px]">
              <h1 className="text-[12px] text-[#a09e9e]">10:17 AM</h1>
            </div>
          </div>
        </div>

        <div className="mt-[20px]">
          <div className="flex items-center justify-end">
            <div className="px-[24px] py-[12px] bg-[#A3D154] rounded-tl-[8px] rounded-tr-[8px] rounded-bl-[8px] max-w-[80%]">
              <h1 className="text-[#FFFFFF] text-[14px]">
                Of course! Let me break it down for you. The key point from last
                week was about how different learning methodologies affect
                comprehension and retention.
              </h1>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <div className="mt-[8px] flex items-center gap-[10px]">
              <h1 className="text-[12px] text-[#a09e9e]">10:20 AM</h1>
              <Image src={seen} alt="" />
            </div>
          </div>
        </div>

        <div className="mt-[40px]">
          <div className="flex items-center gap-[10px]">
            <h1 className="text-[#959494]">Typing</h1>
            <div className="flex items-center gap-[3px]">
              <div className="p-1 bg-[#cccdcb] w-2 h-2 rounded-full animate-bounce"></div>
              <div
                className="p-1 bg-[#cccdcb] w-2 h-2 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="p-1 bg-[#cccdcb] w-2 h-2 rounded-full animate-bounce"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <ChatInput />
    </div>
  );
};

export default Chatbox;

function ChatInput() {
  return (
    <div className="p-3 bg-[#FBFBFB] rounded-lg mt-[20px] border border-gray-200">
      <input
        type="text"
        placeholder="Type a message..."
        className="flex-1 p-2 bg-transparent outline-none w-full text-gray-700"
      />
      <div className="flex items-center justify-between mt-[16px]">
        <div className="flex items-center gap-3 ml-2">
          <button className="text-gray-400 hover:text-gray-600 transition-all">
            <Image src={upImage} alt="" />
          </button>
        </div>
        <button className="px-5 py-2 text-white bg-[#A3D154] rounded-md hover:bg-[#8cbf4a] transition-transform transform hover:scale-105 active:scale-95 font-medium">
          Send
        </button>
      </div>
    </div>
  );
}
