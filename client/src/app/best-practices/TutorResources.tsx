"use client";
import Image, { StaticImageData } from "next/image";
import Heading from "../components/Heading";
import file_icon from "public/images/best-practice/file-icon.png";
export default function TutorResources() {
  return (
    <div className="text-black mt-16">
      <Heading title="Essential for Successful Tutoring" center />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 py-2 md:px-8 xl:px-16 px-4">
        <Card
          Heading="Personalize Your Profile"
          content={
            "Enhance your profile by adding a professional picture and detailed information. A well-crafted profile increases your chances of being booked by potential students."
          }
          icon={file_icon}
        />

        <Card
          Heading="Save Notes and Share Feedback"
          content={
            "In your portal, easily take notes on each student and create documents outlining their strengths, area for improvement, and goals. Share these insights to keep students on track and support their growth."
          }
          icon={file_icon}
        />

        <Card
          Heading="Virtual Whiteboard"
          content={
            "Our intuitive virtual whiteboard makes sharing resources, creating polls, and quizzes effortless. Keep your lessons engaging and interactive, ensuring a fun and effective learning experience for your students."
          }
          icon={file_icon}
        />
      </div>
    </div>
  );
}

interface CardProps {
  Heading: string;
  content: string;
  icon: StaticImageData;
}
const Card: React.FC<CardProps> = ({ Heading, content, icon }) => {
  return (
    <div className="flex flex-col justify-center items-center text-center bg-white rounded-xl shadow p-8">
      <div className=" bg-primary p-2 rounded-xl mb-4">
        {/* Icon placeholder */}
        <Image src={icon} alt="icon" className="" width={40} height={40} />
      </div>
      <h3 className="text-xl font-semibold text-black mb-6">{Heading}</h3>
      <p className="text-[#575757] px-3">{content}</p>
      {/* <div className="flex w-48 mt-4 p-4">
        <Button label="Discover content" classNames="rounded-xl" />
      </div> */}
    </div>
  );
};
