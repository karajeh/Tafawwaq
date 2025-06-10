"use client";
import Image from "next/image";
import quote_image from "public/images/best-practice/best-practice-change/image 2.png";
import arrowLeft from "public/images/best-practice/best-practice-change/arrow-left.png";
import arrowRight from "public/images/best-practice/best-practice-change/arrow-right.png";
import { useState } from "react";

export default function TutorReview() {
  //
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };
  //

  return (
    <section className="md:space-y-6 text-black">
      <h2 className="text-5xl font-medium text-black mb-8 text-center">
        What our <span className="text-secondary">Tutors</span> are saying
      </h2>
      <section className="bg-white p-6 md:p-10 rounded-lg shadow-softBlack mx-auto max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Image Section */}
          <div className="flex justify-center">
            <Image
              src={quote_image} // Add path to your image
              alt="User photo"
              className="rounded-lg h-full "

              // objectFit="cover"
            />
          </div>

          {/* Testimonial Text Section */}
          <div className="md:col-span-2 flex flex-col justify-center">
            {/* <span className="text-4xl text-primary font-bold leading-none mr-4">
                “
                </span> */}
            {/* {reviews.map((review: any) => ( */}
            <div className="flex items-start">
              <q className="text-black tracking-wide leading-loose">
                {reviews[currentIndex].reviewText}
                <p className="mt-4 text-primary">
                  — {reviews[currentIndex].reviewedBy}
                </p>
              </q>
            </div>
            {/* ))} */}
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center md:justify-end md:col-span-3 mt-6 md:mt-0">
            <button
              className="p-2 bg-gray-200 rounded-full mr-2"
              onClick={handlePrev}
            >
              {/* <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg> */}
              <Image src={arrowLeft} alt="" />
            </button>
            <button
              className="p-2 text-white rounded-full"
              onClick={handleNext}
            >
              {/* <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                ></path> */}
              <Image src={arrowRight} alt="" />
              {/* </svg> */}
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}

const reviews = [
  {
    reviewText: `What I love most about Tafawwaq is the incredible support they
                offer, especially for new tutors. They truly help you get
                started with ease, and the platform is so user-friendly. It's
                rewarding to see how they invest in your growth, making you feel
                confident every step of the way.`,
    reviewedBy: "Sarah H.",
  },
  {
    reviewText: `Tafawwaq has made online tutoring a seamless experience. The tools are intuitive, and the support team is always there when I need assistance. It's rewarding to see my students grow and succeed.`,
    reviewedBy: "Mohammed J.",
  },
  {
    reviewText: `What's great about Tafawwaq is the emphasis on creating a personalized learning experience for each student. As a tutor, I can tailor my lessons to meet their specific needs, and the platform's resources make it easy to do so.`,
    reviewedBy: "Tamara H.",
  },
];
