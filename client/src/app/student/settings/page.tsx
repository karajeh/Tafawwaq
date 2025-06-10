import React, { Suspense } from "react";
import { ChangePassword } from "../../components/teacher/ChangePassword";
import Settings from "./Settings";



const Page = () => {
  return (
    <div className="md:flex gap-[16px]">
      <div className="md:w-[calc(100%_-_346px)]">
        <Settings />
      </div>
      <Suspense fallback={<div>Loading Change Password...</div>}>
        <ChangePassword />
      </Suspense>
    </div>
  );
};

export default Page;
