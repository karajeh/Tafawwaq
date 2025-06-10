import React from "react";
import ProfileInfo from "./profile-info";

const page = () => {
  return (
    <div className="flex gap-[16px]">
      <div className="w-full">
        <ProfileInfo />
      </div>
    </div>
  );
};

export default page;
