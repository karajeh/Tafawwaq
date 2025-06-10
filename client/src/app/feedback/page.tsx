"use client";
import React, { useEffect, useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";

const Feedback = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.title = `Give us a Feedback - Tafawwaq Tutoring`;
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Submit logic here
    console.log({
      userName,
      email,
      message,
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-career_bg">
      <div className="mt-14 shadow-box rounded-lg py-10 px-6 md:px-14 bg-white max-w-lg w-full">
        <h2 className="text-3xl  font-[550] text-center text-header mb-6">
          Your Voice Matters
        </h2>

        <form onSubmit={handleSubmit}>
          {/* User Name Field */}
          <InputField
            label="Full Name"
            labelClasses="text-4xl text-[#1A1A1A]"
            type="text"
            id="userName"
            className="border border-[#DDDDE1] outline-none"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="John Doe"
            required
          />

          {/* Email Field */}
          <InputField
            label="Email"
            type="email"
            id="email"
            className="border border-[#DDDDE1] outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="johndoe@gmail.com"
            required
          />

          {/* Message Field */}
          <div className="mb-4">
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-[#1A1A1A]"
            >
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="mt-1 w-full px-3 py-3 border resize-none border-[#DDDDE1] rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-black placeholder-gray-600"
              rows={5}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6 bg-[#40A8CD] text-sm rounded-lg transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
            <Button classNames="rounded-lg" label="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
