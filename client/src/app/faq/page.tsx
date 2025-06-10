"use client";
import React, { useEffect, useState } from "react";
import faq_bg from "public/images/FAQ/faq_bg.png";
import Image from "next/image";

// Sample FAQ Data (can be replaced with dynamic data)
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

const Faq = () => {
  // Initially, all FAQs are open (all indices in the array)
  const [activeIndexes, setActiveIndexes] = useState<number[]>([]);
  useEffect(() => {
    document.title = `Tafawwaq Help Center`;
  }, []);
  const toggleFaq = (index: number) => {
    if (activeIndexes.includes(index)) {
      // If the index is in the activeIndexes array, remove it (close it)
      setActiveIndexes(activeIndexes.filter((i) => i !== index));
    } else {
      // Otherwise, add it to the array (open it)
      setActiveIndexes([...activeIndexes, index]);
    }
  };

  return (
    <div className="w-full flex flex-col items-center mb-20">
      {/* Background Image Section */}
      <div className="relative w-full h-[60vh] md:h-[500px] lg:h-[700px] overflow-hidden">
        <Image
          src={faq_bg.src}
          alt="FAQ Banner"
          className="w-full h-full object-cover"
          layout="fill"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          {/* Heading */}
          <h1 className="text-[64px] md:text-4xl max-sm:text-sm font-semibold mb-8 md:mb-12 lg:mb-16">
            Find the answers you&apos;re looking for right here.
          </h1>

          {/* Search Bar */}
          <div className="flex items-center bg-white rounded-full shadow-md w-full max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%]">
            <div className="p-4 bg-[#E8E5E5] rounded-l-full">
              {/* Search Icon */}
              <svg
                style={{ width: 20, height: 20 }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
            </div>
            {/* Input Field */}
            <input
              type="text"
              placeholder="Ask a question or search by keyword..."
              className="w-full py-3 px-2 text-gray focus:outline-none text-sm lg:text-base"
            />
            {/* Search Button */}
            <button className="bg-secondary text-white rounded-full px-8 py-2 md:px-20 mr-2 text-sm lg:text-base transition-all hover:scale-105 hover:bg-opacity-90 hover:shadow-md active:scale-[0.98]">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container max-w-[1340px] flex flex-col items-center bg-faq_bg relative mt-32">
        <div className="w-full bg-[#F2F4F5] relative pb-16 px-10">
          <div className=" w-full mx-auto bg-primary rounded-lg p-6 relative -mt-8 shadow-lg">
            <h2 className="md:text-3xl sm:text-xl font-semibold text-center text-white">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="w-full relative pt-16">
            {/* FAQ Cards */}
            <div className="w-full space-y-4">
              {faqData.map((item, index) => (
                <div
                  key={index}
                  className="border border-light_gray rounded-lg shadow-md"
                >
                  <div
                    className="flex justify-between items-center p-5 bg-white rounded-lg cursor-pointer transition-all duration-200 hover:bg-background_blue hover:shadow-md"
                    onClick={() => toggleFaq(index)}
                  >
                    <h3 className=" sm:text-1xl md:text-lg font-semibold text-[#222222]">
                      {item.question}
                    </h3>
                    <span className="ml-4">
                      {activeIndexes.includes(index) ? (
                        <button className="text-3xl text-icon_color transition-all hover:scale-125 active:scale-110">
                          −
                        </button>
                      ) : (
                        <button className="text-3xl text-icon_color transition-all hover:scale-125 active:scale-110">
                          +
                        </button>
                      )}
                    </span>
                  </div>
                  {activeIndexes.includes(index) && (
                    <div className="p-5 bg-white rounded-b-lg">
                      <p className="text-[#65676C] text-xl">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
