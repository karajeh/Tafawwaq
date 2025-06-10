import React, { Suspense } from "react";
import { ChangePassword } from "../../components/teacher/ChangePassword";

const page = () => {
  return (
    <div className="flex mt-10 justify-center">
      <Suspense fallback={<div>Loading Change Password...</div>}>
        <ChangePassword />
      </Suspense>
    </div>
  );
};

export default page;
