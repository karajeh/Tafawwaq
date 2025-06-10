import React from "react";
import Cards from "./cards";
import History from "./history";

const page = () => {
  return (
    <div className="md:flex gap-[16px] px-[20px] md:px-[10px] mt-[30px] pb-[30px] md:pb-[50px]">
      <div className="flex-1">
        <Cards />
      </div>
      <div className="md:w-[330px] md:flex-shrink-0">
        <History />
      </div>
    </div>
  );
};

export default page;
