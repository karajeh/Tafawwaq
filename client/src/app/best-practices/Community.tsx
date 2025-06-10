"use client";
import Image, { StaticImageData } from "next/image";
// import Button from "../components/Button";
import people_working from "public/images/best-practice/people-working.png";
import Button from "../components/Button";

export default function Community() {
  return (
    <div className="text-black grid px-2 md:px-4 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-2">
      <JoinCommunity />
      <div className="lg:mt-0 lg:flex items-center hidden px-4">
        <ImageComponent image={people_working} />
      </div>
    </div>
  );
}

function JoinCommunity() {
  return (
    <div className="bg-white px-6 py-12 lg:pl-24 lg:py-20 text-black">
      <div className="text-left mb-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
          Join the <span className="text-secondary">Community</span>
        </h2>
      </div>
      <div className="flex flex-col gap-6">
        <Step
          title="Apply Online"
          description="Submit your application with your qualifications and experience to become part of our community."
        />
        <Step
          title="Meet the Qualifications"
          description="Ensure you meet the required educational background and relevant teaching experience to qualify."
        />
        <Step
          title="Get Approved & Onboarded"
          description="Our team will review your application, and once approved, you'll complete a short onboarding process to start tutoring."
        />
      </div>
      <div className="w-36 mt-4">
        <Button label="Apply now" classNames="rounded-xl" />
      </div>
    </div>
  );
}

interface StepProps {
  title: string;
  description: string;
}

const Step: React.FC<StepProps> = ({ title, description }) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 bg-secondary rounded-full p-[2px]">
        {/* Icon (Checkmark) */}
        <svg
          className="w-5 h-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={4}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-[#080E25] mb-2">{title}</h3>
        <p className="text-[#575757]">{description}</p>
      </div>
    </div>
  );
};

interface ImageProps {
  image: StaticImageData;
}
const ImageComponent: React.FC<ImageProps> = ({ image }) => {
  return (
    <div className="">
      <div className="relative cursor-pointer">
        <Image
          className="h-64 md:h-[500px] object-cover w-full rounded-xl"
          src={image}
          alt=""
        />
      </div>
    </div>
  );
};
