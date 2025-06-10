"use client";
import type { FormEvent } from "react";
import { useState } from "react";
import Recordings from "./recordings";
import Image from "next/image";
import { FaBars } from "react-icons/fa";
// import Button from "../components/Button";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import InputField from "src/app/components/InputField";
import Page from "src/app/best-practices/page";
const faqData = [
  {
    question: "What is Tafawwaq?",
    answer:
      "Tafawwaq is an online platform dedicated to providing personalized, one-on-one private tutoring sessions. Our mission is to connect students with qualified tutors across a range of educational curriculums including IGCSE, IB, SAT, National, and Languages through 1:1 sessions. We offer a secure, completely automated, seamless, and engaging online learning environment with many features such as an in-app video conference, virtual whiteboard coupled with interactive tools like polls & quizzes, flexible scheduling, and recorded sessions. Our platform is designed to cater to students from middle school through high school, and language learners of any background.",
  },
  {
    question: "How do I find a tutor?",
    answer: `Finding a tutor on Tafawwaq is simple! Go to the "Find a Tutor" page, select your preferred curriculum and subject, and browse through the list of available tutors. You can view each tutor's profile to learn about their qualifications. Once you find the right match, check their availability and book a session directly on the platform.`,
  },
  {
    question: "How do I book a session?",
    answer:
      "Booking a tutoring session on Tafawwaq is simple and convenient. Just create an account on our platform, browse through our list of qualified tutors, select the one that best fits your needs, choose a suitable time slot, and book your session right from the website.",
  },
  {
    question: "Is my information secure?",
    answer:
      "At Tafawwaq, we take data security and privacy very seriously. Our platform is built with robust security measures to ensure that your personal information is kept safe and confidential. We use advanced encryption technology to protect all user data and transactions, providing you with a secure online learning environment.",
  },
  {
    question: "What if I need to reschedule?",
    answer:
      "We understand that unexpected circumstances may arise that require you to reschedule your tutoring session. Tafawwaq offers flexible rescheduling depending on each tutor's cancellation policy. We strive to accommodate your needs and make the rescheduling process as smooth as possible.",
  },
  {
    question: "As a tutor, what commission will Tafawwaq take from my lessons?",
    answer:
      "Tafawwaq believes in fair compensation for our tutors and transparent pricing for our students. We take a competitive commission rate of 35% from each session booked on our platform, which allows us to maintain and enhance the quality of our services.",
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept Apple Pay and Credit/Debit Cards.",
  },
  {
    question: "Are the tutors qualified?",
    answer:
      "Yes, all tutors on Tafawwaq are thoroughly vetted and qualified in their respective fields. We ensure that each tutor meets our stringent criteria for expertise, experience, and teaching proficiency before being listed on our platform. You can have confidence in the qualifications and capabilities of the tutors available on Tafawwaq.",
  },
];

const teamMembers = [
  {
    id: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

const buttonStyles = `
  transition duration-300 ease-in-out transform hover:scale-105 active:scale-95
`;

// interface ResourcesProps {}

const Resources = () => {
  const [selectedResource, setSelectedResource] =
    useState<string>("Video Conference");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [userName, setUserName] = useState("Abeeda Alex");
  const [email, setEmail] = useState("student@email.com");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Submit logic here
    console.log({
      userName,
      email,
      message,
    });
  };
  const resources = [
    // "PORTAL VIDEO",
    // "TUTORIAL",
    "Video Conference",
    "Virtual Whiteboard",
    "Best Practices",
    "FAQ",
    "Contact Us",
    "Feedback/Suggestion",
    "Report an issue",
  ];
  // const [selectedFile, setSelectedFile] = useState(null);

  // const handleFileUpload = (e: any) => {
  //   setSelectedFile(e.target.files[0]);
  // };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="md:flex gap-[16px] px-[10px] md:px-[20px] mt-[30px] pb-[30px] md:pb-[50px]">
      {/* Hamburger menu for mobile */}
      <div className="md:hidden flex items-center justify-end mr-[20px]">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={buttonStyles}
        >
          <FaBars className="text-2xl text-[#3A5377] " />
        </button>
      </div>

      {/* Resources Menu */}
      {isMenuOpen && (
        <div className=" absolute top-[70px] left-0 w-full shadow-lg z-10 md:hidden px-[20px] pb-[20px] bg-white">
          {resources.map((resource, index) => (
            <h1
              key={index}
              className={`mt-[10px] p-2 rounded-[10px] cursor-pointer ${
                selectedResource === resource
                  ? "bg-[#00ADEF] text-[#FFFFFF]"
                  : "hover:bg-[#00ADEF] hover:text-[#FFFFFF]"
              }`}
              onClick={() => {
                setSelectedResource(resource);
                setIsMenuOpen(false);
              }}
            >
              {resource}
            </h1>
          ))}
        </div>
      )}

      {/* Sidebar for larger screens */}
      <div className="md:w-[212px] md:flex-shrink-0 p-1 text-[#3A5377] hidden md:block">
        {resources.map((resource, index) => (
          <h1
            key={index}
            className={`mt-[10px] p-2 rounded-[10px] cursor-pointer ${
              selectedResource === resource
                ? "bg-[#00ADEF] text-[#FFFFFF]"
                : "hover:bg-[#00ADEF] hover:text-[#FFFFFF]"
            }`}
            onClick={() => setSelectedResource(resource)} // Set selected resource on click
          >
            {resource}
          </h1>
        ))}
      </div>

      {/* Recordings section */}
      <div className="flex-1 ">
        {/* New  */}
        {/* <Recordings /> */}
        {selectedResource === "FAQ" && (
          <div className="md:w-3/4 w-full md:ml-8 p-6 rounded-md shadow-md">
            <div className="flex justify-center pb-4 items-center flex-col">
              <h1 className="text-2xl font-semibold text-center text-gray-800">
                Frequently Asked Questions
              </h1>
              <p className="text-stone-500 mt-2 text-center">
                Everything you need to know about the product and billing.
              </p>
            </div>

            <div className="mt-6">
              {faqData.map((item, index) => (
                <div key={index}>
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <div className="flex justify-between items-center">
                          <DisclosureButton className="group flex-1 text-left cursor-pointer">
                            {item.question}
                          </DisclosureButton>
                          <DisclosureButton className="w-5 h-5 flex items-center justify-center rounded-full border border-stone-300 cursor-pointer">
                            {open ? (
                              <MinusIcon className="w-4 h-4 text-stone-400" />
                            ) : (
                              <PlusIcon className="w-4 h-4 text-stone-400" />
                            )}
                          </DisclosureButton>
                        </div>
                        <DisclosurePanel className="mt-2 text-stone-500">
                          {item.answer}
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>
                  {index < faqData.length - 1 && (
                    <hr className="my-6 border-t border-stone-300" />
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-8 bg-white py-6 rounded-md">
              <div className="flex justify-center items-center py-2 -space-x-0.5">
                <dt className="sr-only">Team Members</dt>
                {teamMembers.map((teamMember) => (
                  <dd key={teamMember.id}>
                    <Image
                      width={60}
                      height={60}
                      alt=""
                      src={teamMember.imageUrl}
                      className="h-9 w-9 rounded-full bg-gray-50 ring-2 ring-white"
                    />
                  </dd>
                ))}
              </div>
              <p className="text-gray-500 font-bold text-xl">
                Still have questions?
              </p>
              <p className="text-stone-500 my-1">
                Can&apos;t find the answer you&apos;re looking for? Please chat
                with our friendly team.
              </p>
              <button
                className={`bg-[#A3D154] text-white px-6 py-2 rounded-md mt-4 ${buttonStyles}`}
              >
                Get in touch
              </button>
            </div>
          </div>
        )}
        {selectedResource === "Best Practices" && <Page />}
        {selectedResource === "Feedback/Suggestion" && (
          <div className="md:w-3/4 w-full md:ml-8 rounded-md shadow-md ">
            <div className="flex flex-col justify-start pb-4 items-center ">
              <div className="flex items-center justify-center  bg-gray-100">
                <div className=" shadow-box rounded-lg py-10 px-6 md:px-14 bg-white max-w-lg w-full">
                  <h2 className="text-4xl font-semibold text-center text-header mb-6">
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
                    <div className="mt-6 bg-[#40A8CD] rounded-lg">
                      <button
                        type="submit"
                        className={`w-full py-3 text-white ${buttonStyles}`}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
        {selectedResource === "Contact Us" && (
          <div className="md:w-3/4 w-full md:ml-8 rounded-md shadow-md ">
            <div className="flex flex-col justify-start pb-4 items-center ">
              <div className="bg-white shadow-xl backdrop-blur-2xl rounded-xl p-6 w-[500px] max-w-[80%]">
                <form className="flex flex-col gap-6 ">
                  <div className=" text-left">
                    <label className=" mb-2 block " htmlFor="email">
                      Your Email
                    </label>
                    <input
                      className=" border w-full rounded-xl px-2 py-3 bg-transparent"
                      type="text"
                      id="email"
                      value={email}
                    />
                  </div>
                  <div className=" text-left">
                    <label className=" mb-2 block " htmlFor="name">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={userName}
                      className=" border w-full  rounded-xl px-2 py-3  bg-transparent"
                    />
                  </div>

                  <div className=" text-left">
                    <label className=" mb-2 block " htmlFor="name">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="border w-full rounded-xl px-2 py-3 bg-transparent h-40 resize-none"
                      id="name"
                      placeholder="Start typing..."
                    />
                  </div>
                  <button
                    className={`bg-[#f3f3f3] text-black p-3 rounded-xl ${buttonStyles}`}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
        {selectedResource === "Report an issue" && (
          <div className="md:w-3/4 w-full px-5 md:ml-8 rounded-md shadow-md ">
            <div className="flex flex-col justify-start pb-4 items-center ">
              <h1 className="text-2xl font-bold text-left mb-6">
                Report a Problem
              </h1>
              <p>
                Use this page to report technical problems, account issues, or
                any concerns related to your experience with Tafawwaq. Our team
                will review and respond promptly
              </p>
              <br />
              <form className="space-y-6 w-full">
                {/* Dropdown */}
                <div>
                  <label htmlFor="" className="font-semibold">
                    What can we help you with?
                  </label>
                  <select className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300">
                    <option value="">Report a bug</option>
                    <option value="category1">Recommend Something</option>
                    <option value="category2">Other</option>
                  </select>
                </div>

                {/* Textarea */}
                <div>
                  <label htmlFor="" className="font-semibold">
                    Please describe your issue
                  </label>
                  <textarea
                    className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                    placeholder="Enter your details here..."
                  ></textarea>
                </div>
                {/* File Upload */}
                <div className="flex w-full flex-col items-center xl:items-start xl:flex-row justify-evenly">
                  <div className="w-4/5 xl:w-5/12 flex flex-col gap-6">
                    <div className="bg-[#F2F4F5] p-5 rounded-md">
                      <p className="font-semibold text-lg">
                        Upload additional documents
                      </p>
                      <p>Upload any documents that can describe your issue</p>
                      <div className="border-dashed border-2  border-shade p-6 rounded-lg text-center bg-[#ECFDE2] mb-4 mt-2">
                        <input
                          type="file"
                          id="fileInput"
                          className="hidden "
                          accept="image/*,.pdf,.mp4,audio/mov"
                        />
                        <label
                          htmlFor="fileInput"
                          className="text-header font-semibold cursor-pointer "
                        >
                          <svg
                            width="38"
                            height="33"
                            viewBox="0 0 38 33"
                            fill="none"
                            className="m-auto"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19.5648 7.38519C19.4895 7.63779 19.6334 7.90324 19.8858 7.97853L19.9357 7.99342L19.9379 7.99094C20.1747 8.03384 20.4096 7.89205 20.4792 7.65718C21.1131 5.52709 23.1103 4.03904 25.3355 4.03904C25.5989 4.03904 25.8125 3.82537 25.8125 3.56195C25.8125 3.29851 25.5989 3.08485 25.3355 3.08485C22.6008 3.08485 20.3027 4.90561 19.5648 7.38519ZM19.5648 7.38519L19.6426 7.40839M19.5648 7.38519C19.5648 7.38521 19.5648 7.38522 19.5648 7.38524L19.6426 7.40839M19.6426 7.40839C19.5801 7.61795 19.6994 7.83825 19.909 7.90075L19.6426 7.40839Z"
                              fill="#A3D154"
                              stroke="#F9FFF9"
                              strokeWidth="0.162324"
                            />
                            <path
                              d="M30.8781 22.9626H28.5026C28.284 22.9626 28.1067 22.7853 28.1067 22.5667C28.1067 22.3481 28.284 22.1707 28.5026 22.1707H30.8781C34.1527 22.1707 36.817 19.5064 36.817 16.2319C36.817 12.9573 34.1527 10.293 30.8781 10.293H30.821C30.7062 10.293 30.597 10.2432 30.5218 10.1564C30.4466 10.0696 30.4126 9.95448 30.429 9.84079C30.4644 9.59419 30.4822 9.34645 30.4822 9.10523C30.4822 6.26731 28.1731 3.95817 25.3351 3.95817C24.2311 3.95817 23.1782 4.30319 22.2901 4.95618C22.095 5.09956 21.8179 5.03593 21.705 4.82128C19.1901 0.0323021 12.6213 -0.610809 9.21566 3.55518C7.78102 5.31026 7.21734 7.59332 7.66903 9.81847C7.7188 10.0642 7.53073 10.2933 7.28102 10.2933H7.12236C3.84781 10.2933 1.18349 12.9576 1.18349 16.2322C1.18349 19.5067 3.84781 22.1711 7.12236 22.1711H9.49788C9.71649 22.1711 9.89381 22.3484 9.89381 22.567C9.89381 22.7856 9.7165 22.9629 9.49788 22.9629H7.12236C3.4111 22.9629 0.391602 19.9434 0.391602 16.2321C0.391602 12.625 3.24394 9.67138 6.81156 9.50848C6.47644 7.19993 7.11727 4.87132 8.60254 3.05406C12.2487 -1.40659 19.2363 -0.906612 22.1902 4.06734C23.1325 3.47656 24.2108 3.16664 25.335 3.16664C28.7733 3.16664 31.4979 6.09311 31.2595 9.51217C34.7942 9.71042 37.6087 12.6485 37.6087 16.2319C37.6087 19.9434 34.5892 22.9626 30.8779 22.9626L30.8781 22.9626Z"
                              fill="#A3D154"
                            />
                            <path
                              d="M8.96767 22.3436C8.96767 27.8463 13.4444 32.323 18.9471 32.323C24.4498 32.323 28.9265 27.8462 28.9265 22.3436C28.9265 16.8408 24.4498 12.3642 18.9471 12.3642C13.4443 12.3642 8.96767 16.8409 8.96767 22.3436ZM9.92202 22.3436C9.92202 17.3673 13.9707 13.3185 18.9471 13.3185C23.9233 13.3185 27.9721 17.3672 27.9721 22.3436C27.9721 27.3198 23.9233 31.3686 18.9471 31.3686C13.9708 31.3686 9.92202 27.3199 9.92202 22.3436Z"
                              fill="#A3D154"
                              stroke="#F9FFF9"
                              strokeWidth="0.162324"
                            />
                            <path
                              d="M18.7577 26.3263C18.7577 26.5312 18.9239 26.6974 19.1287 26.6974C19.3336 26.6974 19.4998 26.5315 19.4998 26.3263V18.7899C19.4998 18.585 19.3336 18.4188 19.1287 18.4188C18.9239 18.4188 18.7577 18.585 18.7577 18.7899V26.3263Z"
                              fill="#A3D154"
                              stroke="#483EA8"
                              strokeWidth="0.162324"
                            />
                            <path
                              d="M19.1283 19.3146L17.0719 21.3711C17.0718 21.3711 17.0718 21.3711 17.0718 21.3711C17.0718 21.3711 17.0718 21.3711 17.0718 21.3712C16.927 21.5161 16.692 21.5161 16.5471 21.3712C16.4021 21.2262 16.4021 20.9914 16.5471 20.8464L18.8659 18.5276L18.866 18.5275L18.9233 18.5849L19.1283 19.3146ZM19.1283 19.3146L21.1849 21.3712C21.2572 21.4435 21.3524 21.4798 21.4472 21.4798L19.1283 19.3146Z"
                              fill="#A3D154"
                              stroke="#483EA8"
                              strokeWidth="0.162324"
                            />
                          </svg>
                          Drag & Drop file or{" "}
                          <span className="text-secondary ">Browse</span>
                          <p className="font-normal my-3 ">
                            accepted formats : PNG, JPG, PDF, mp4, MOV
                          </p>
                        </label>
                        <br />
                        {/* {selectedFile && (
                    <p className="mt-2 text-gray-600">{selectedFile.name}</p>
                    )} */}
                      </div>
                      <button
                        className={`bg-secondary rounded-md text-white w-full py-3 ${buttonStyles}`}
                      >
                        Upload
                      </button>
                    </div>
                    {/* History Button */}
                    <div>
                      <button
                        type="button"
                        className={`w-full p-4 text-left bg-[#A3D1547D] rounded-lg ${buttonStyles}`}
                      >
                        <p className="font-semibold">History</p>
                        <p className="text-sm">
                          Check your previous submissions status
                        </p>
                      </button>
                    </div>
                  </div>

                  {/* Urgency */}
                  <div className="w-5/6 xl:w-5/12 mt-5 xl:mt-0 flex flex-col gap-5">
                    <div className=" p-7 rounded-lg shadow-md w-full bg-[#F2F4F5]">
                      <h2 className="text-lg font-semibold text-gray-900">
                        Urgency
                      </h2>
                      <p className="text-sm text-gray-500 mb-4">
                        Please provide your urgency
                      </p>
                      <div className="flex items-center flex-wrap space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="urgency"
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Low
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="urgency"
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Medium
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="urgency"
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            High
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Student Information */}
                    {/* <div className="bg-gray-100 p-4 rounded-lg w-full bg-[#F2F4F5]">
                      <p>
                        <strong>Student:</strong>
                        <br />
                        John Smith <br />
                        johnsmith@example.com
                      </p>
                    </div> */}

                    {/* Submit Button */}
                    <button
                      type="button"
                      onClick={openModal}
                      className={`w-full py-3 bg-[#42ABD1] text-white rounded-lg hover:bg-blue-600 ${buttonStyles}`}
                    >
                      Submit
                    </button>
                    {isModalOpen && (
                      <div
                        className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center"
                        onClick={closeModal}
                      >
                        <div
                          className="text-white p-8 rounded-md text-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <p className="text-secondary text-3xl font-semibold mb-5">
                            Success!
                          </p>
                          <p className="text-center text-lg">
                            “Thank you for reporting the issue! Your ticket has
                            been <br />
                            received, and our team will get back to you ASAP.”
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
            {/* </div> */}
          </div>
        )}
        {selectedResource == "TUTORIAL" && <Recordings />}
        {/* New End */}
      </div>
    </div>
  );
};

export default Resources;
