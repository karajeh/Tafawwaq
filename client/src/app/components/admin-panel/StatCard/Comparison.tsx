"use client";
import Image from "next/image";
import React from "react";
import down from "public/images/dashnav/down.svg";
import cc from "public/images/session-oversight/CC.svg";
import pc from "public/images/session-oversight/PC.svg";
import Example from "./ComparisonChart";

export const Comparison = (): JSX.Element => {
  return (
    <div className="mt-[20px] border-2 border-slate rounded-[12px] p-[12px] md:p-[24px]">
      <div className="flex items-center justify-between">
        <h1 className="text-[#101828] font-inter font-semibold text-[14px] md:text-[16px]">
          Comparison with Previous Periods
        </h1>
        <div className="flex items-center md:gap-[5px] px-[4px] md:px-[10px] md:py-[7px] rounded-[8px] border border-[#A3D154] cursor-pointer">
          <h1 className="text-[#A3D154] text-[12px] md:text-[16px]">Current Active Sessions</h1>
          <Image src={down} alt="down" />
        </div>
      </div>
      <div className="mt-[12px] md:mt-[24px] flex items-center justify-end gap-[10px] md:gap-[14px]">
        <div className="flex items-center gap-[8px]">
          <Image src={cc} alt="cc" />
          <h1 className="font-inter text-[12px] md:text-[14px]">Current Month Sessions</h1>
        </div>
        <div className="flex items-center gap-[8px]">
          <Image src={pc} alt="pc" />
          <h1 className="font-inter text-[12px] md:text-[14px]">Current Month Sessions</h1>
        </div>
      </div>
      <div className="mt-[12px] md:mt-[24px]">
        <Example />
      </div>
    </div>
  );
};
