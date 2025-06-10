import React from "react";
import Calendar from "src/components/booking/Calendar";

function page() {
  return (
    <div>
      <Calendar userType="teacher" />
      {/* <button className="bg-[#D4D4D4] text-[#1A1A1A59] py-3 rounded-lg px-5 max-lg:ml-5 transition-transform duration-300 ease-in-out transform hover:scale-105 active:scale-95">
        Set your avaiablility
      </button> */}
    </div>
  );
}

export default page;
