"use client";
import React from "react";
import LessonInformation from "./LessonInformation";
import Buttons from "./Buttons";

const page = () => {
  return (
    <div className="flex justify-between flex-col  md:flex-row">
      <div className="md:w-3/5">
        <LessonInformation />
      </div>
      <div className="md:w-1/3 sm:w-1/2">
        <Buttons />
      </div>
    </div>
  );
};

export default page;

<style jsx>{`
  button {
    transition: transform 0.2s ease, background-color 0.2s ease;
  }
  button:hover {
    transform: scale(1.05);
    background-color: #f0f0f0;
  }
  button:active {
    transform: scale(0.95);
  }
`}</style>
