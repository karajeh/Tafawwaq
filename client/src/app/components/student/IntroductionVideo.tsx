import React from "react";
import Image from "next/image";

const IntroductionVideo: React.FC = () => {
  return (
    <div className="relative mt-6">
      <h2 className="text-xl font-semibold">Introduction Video</h2>
      <div className="relative mt-2">
        <Image
          src="https://plus.unsplash.com/premium_photo-1673264933048-3bd3f5b86f9d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Introduction video"
          className="w-full rounded-md"
          width={600}
          height={400}
        />
      </div>
    </div>
  );
};

export default IntroductionVideo;
