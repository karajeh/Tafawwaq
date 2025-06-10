"use client";

import React, { useEffect } from "react";

import { IoLocationSharp } from "react-icons/io5";
import { FaCalendar } from "react-icons/fa";
import Link from "next/link";
import Pagination from "../components/Pagination";

import careerHero from "public/images/career/career-home.svg";
import Image from "next/image";
import searchIcon from "public/images/landing-page/searchIcon.png";
import bottomArrow from "public/images/landing-page/bottomArrow.png";

import career1 from "public/images/career/career1.svg";
import career2 from "public/images/career/career2.svg";
import career3 from "public/images/career/career3.svg";
// import Heading from "../components/Heading";
import Button from "../components/Button";

export default function CareerPage() {
  useEffect(() => {
    document.title = `Careers at Tafawwaq - Tafawwaq Tutoring`;
  }, []);
  return (
    <div>
      <Hero />
      <div className=" mt-20 bg-background_blue px-4 md:px-10 py-20 max-w-screen-xl m-auto mb-10">
        <div className=" max-w-5xl m-auto">
          <Apply />
          <Jobs />
        </div>
      </div>
      <Pagination
        currentPage={0}
        totalPages={0}
        onPrevious={function (): void {
          throw new Error("Function not implemented.");
        }}
        onNext={function (): void {
          throw new Error("Function not implemented.");
        }}
        onPageChange={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
}

function Hero() {
  return (
    <div className=" bg-background_blue px-4 pt-4 pb-20">
      <div className="relative py-36 md:py-40 max-w-screen-xl m-auto rounded-xl overflow-hidden mt-24 ">
        <Image
          className="absolute left-0 top-0 w-full h-full object-cover"
          src={careerHero}
          alt="hero career"
          priority
        />
        <div className=" absolute inset-0 bg-[#141c28] opacity-60"></div>

        <div className="relative px-4 max-w-5xl m-auto flex items-center flex-col md:flex-row gap-20 justify-between">
          <div className=" text-white flex flex-col items-center gap-10">
            <h1 className="-tracking-[1px] text-4xl md:text-5xl font-medium mb-4">
              Looking for a fresh start?
            </h1>
            <p className=" max-w-xs text-sm text-center opacity-80">
              Apply now and join our team!
            </p>
            <Button label={"Open Positions"} classNames="rounded-lg w-[50%]" />
          </div>

          <div className=" grid grid-cols-2 gap-4">
            <div className=" max-w-56 row-span-2 flex items-center">
              <Image className=" rounded-md" src={career1} alt="career1" />
            </div>
            <div className="max-w-56">
              <Image className=" rounded-md" src={career2} alt="career2" />
            </div>
            <div className="  max-w-56">
              <Image className=" rounded-md" src={career3} alt="career3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface obProp {
  location: string;
  name: string;
  by: string;
  date: string;
}

const ob_test = {
  location: "New Yourk, USA",
  name: "Job title here",
  by: "Chorocon Ltd.",
  date: "1 Week ago",
};
function Jobs() {
  const jobs: Array<obProp> = Array.from({ length: 6 }, () => ({ ...ob_test }));

  return (
    <div className="bg-career_bg grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
      {jobs.map(({ location, name, by, date }, idx) => (
        <div
          className=" py-5 px-7 border border-[#ededed] rounded-md bg-white"
          key={idx}
        >
          <div className=" flex text-header opacity-70 text-xs font-semibold items-center gap-1 mb-4">
            <IoLocationSharp />
            <p>{location}</p>
          </div>

          <p className=" text-header font-semibold  text-xl mb-1">{name}</p>
          <p className=" text-xs font-semibold text-header opacity-50 flex">
            by
            <span className=" text-orange-600 block ml-1">{by}</span>
          </p>
          <div className=" flex mt-8 items-center justify-between">
            <div className=" flex text-header opacity-70 text-xs font-semibold items-center gap-1">
              <FaCalendar />
              {date}
            </div>
            <Link
              href="/career-apply"
              className=" bg-[#20bfa9] px-4 text-white text-sm py-2 rounded-md hover:bg-[#1aa88a] hover:scale-105 active:scale-95 transition duration-300 ease-in-out"
            >
              Apply Now
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

function Apply() {
  return (
    <div>
      <div className="bg-career_bg flex gap-4 flex-col md:flex-row md:items-center justify-between  ">
        <div className="max-w-xs md:max-w-xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-black mb-4">
            Best gateway for All-in-one
          </h2>
          <div className="font-light text-neutral-500 text-sm mt-2">
            Check our featured jobs from popular companies. Start applying now.
          </div>
        </div>
      </div>
      <FilterSection />
    </div>
  );
}

const FilterSection: React.FC = () => {
  return (
    <div className="mt-10 flex flex-col md:flex-row w-full justify-between gap-4 ">
      <div className="relative w-full md:w-1/4">
        <select
          className="border border-gray-300 focus:border-primary focus:outline-none rounded-lg px-4 py-2 w-full appearance-none bg-white text-left pr-10"
          style={{
            backgroundImage: `url(${bottomArrow.src})`,
            backgroundSize: "16px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 10px center",
          }}
        >
          <option>Category</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className="relative w-full md:w-1/4">
        <select
          className="border border-gray-300 focus:border-primary focus:outline-none rounded-lg px-4 py-2 w-full appearance-none bg-white text-left pr-10"
          style={{
            backgroundImage: `url(${bottomArrow.src})`,
            backgroundSize: "16px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 10px center",
          }}
        >
          <option>Location</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className="relative w-full md:w-1/4">
        <select
          className="border border-gray-300 focus:border-primary focus:outline-none rounded-lg px-4 py-2 w-full appearance-none bg-white text-left pr-10"
          style={{
            backgroundImage: `url(${bottomArrow.src})`,
            backgroundSize: "16px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 10px center",
          }}
        >
          <option>Job type</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <button className="flex justify-center items-center px-6 py-2 bg-primary text-white rounded-lg w-full md:w-auto hover:bg-primary-dark hover:scale-105 active:scale-95 transition duration-300 ease-in-out">
        <Image src={searchIcon} alt="Search" width={24} height={24} />
      </button>
    </div>
  );
};
