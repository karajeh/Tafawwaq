import React, { Suspense } from "react";
import ProfileInfo from "./profile-info";
import { ChangePassword } from "../../components/teacher/ChangePassword";

const Page = () => {
  return (
    <div className="md:flex gap-[16px]">
      <Suspense fallback={<div>Loading Profile Info...</div>}>
        <div className="md:w-[calc(100%_-_346px)]">
          <ProfileInfo />
        </div>
      </Suspense>
      <Suspense fallback={<div>Loading Change Password...</div>}>
        <ChangePassword />
      </Suspense>
    </div>
  );
};

export default Page;
