import Image from "next/image";
import React from "react";
import one from "public/images/student/01.svg";
import two from "public/images/student/02.svg";
import three from "public/images/student/03.svg";
import four from "public/images/student/04.svg";

const History = () => {
  return (
    <div className="mt-[40px] md:mt-[0px]">
      {/* <div className="flex items-center justify-between">
        <h1 className="text-[#3F3F44] text-[20px]">Transactions History</h1>
        <h1 className="text-[#9b9a9a]">View All</h1>
      </div>
      <div className="mt-[22px]">
        <div className="flex items-center gap-[20px]">
          <div className="flex items-center gap-[10px]">
            <Image src={P} alt="" className="w-[48px] h-[48px]" />
            <h1>UI/UX Prototyping with Proto.io</h1>
          </div>
          <div className="bg-[#d4ecc640] p-1 rounded-[5px]">
            <h1 className="text-[#99C183]">$150.5</h1>
          </div>
        </div>
        <div className="flex items-center gap-[20px] mt-[25px]">
          <div className="flex items-center gap-[10px]">
            <Image src={book} alt="" className="w-[48px] h-[48px]" />
            <h1>How to Make UX Case Study for Beginner</h1>
          </div>
          <div className="bg-[#d4ecc640] p-1 rounded-[5px]">
            <h1 className="text-[#99C183]">$150.5</h1>
          </div>
        </div>
        <div className="flex items-center gap-[20px] mt-[25px]">
          <div className="flex items-center gap-[10px]">
            <Image src={P} alt="" className="w-[48px] h-[48px]" />
            <h1>UI/UX Prototyping with Proto.io</h1>
          </div>
          <div className="bg-[#d4ecc640] p-1 rounded-[5px]">
            <h1 className="text-[#99C183]">$150.5</h1>
          </div>
        </div>
      </div> */}
      <div className="mt-[20px] md:mt-[40px]">
        <div className="flex items-center gap-[10px] md:gap-[20px]">
          <div className="w-[160px] h-[160px] flex flex-col items-center justify-center shadow-lg p-[20px] md:p-[30px] rounded-[10px] transition-transform transform hover:scale-105 active:scale-95">
            <Image src={one} alt="" />
            <h1 className="mt-[10px] text-center">Streamlined Transactions</h1>
          </div>
          <div className="w-[160px] h-[160px] flex flex-col items-center justify-center shadow-lg p-[20px] md:p-[30px] rounded-[10px] transition-transform transform hover:scale-105 active:scale-95">
            <Image src={two} alt="" />
            <h1 className="mt-[10px] text-center">Easy Payments</h1>
          </div>
        </div>
        <div className="flex items-center gap-[10px] md:gap-[20px] mt-[10px] md:mt-[20px]">
          <div className="w-[160px] h-[160px] flex flex-col items-center justify-center shadow-lg p-[20px] md:p-[30px] rounded-[10px] transition-transform transform hover:scale-105 active:scale-95">
            <Image src={three} alt="" />
            <h1 className="mt-[10px] text-center">Secure processing</h1>
          </div>
          <div className="w-[160px] h-[160px] flex flex-col items-center justify-center shadow-lg p-[20px] md:p-[30px] rounded-[10px] transition-transform transform hover:scale-105 active:scale-95">
            <Image src={four} alt="" />
            <h1 className="mt-[10px] text-center">Game Content</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
