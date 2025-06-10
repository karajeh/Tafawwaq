"use client";
import Image from "next/image";
import flex_sch from "public/images/best-practice/flex-sch.svg";
import advanced_tech from "public/images/best-practice/advanced-tech.svg";
import access_cb from "public/images/best-practice/access-cb.svg";
import comp_compens from "public/images/best-practice/comp-compens.svg";
import Heading from "../components/Heading";
import { useState } from "react";
export default function Benefits() {
  return (
    <section className="bg-public_bg py-12 px-4 md:px-12">
      <div className="container mx-auto text-center">
        {/* Heading */}

        <Heading
          title="Why Choose Tafawwaq for Tutoring?"
          center={true}
          subtitle="Emplore the benefits that make tutoring with us a truly rewarding experience."
        />
        {/* Icon grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 mt-8 py-5 mx-28">
          <Card
            Heading="Flexible Scheduling"
            content="With Tafawwaq, you control your earnings and lesson pricing, empowering you to meet students' needs while maximizing income."
            icon={flex_sch}
          />
          <Card
            Heading="Competitive Compensation"
            content="At Tafawwaq, we value your expertise and commitment. With only a 35% commission per lesson, our platform offers a significantly lower rate than others, allowing you to maximize your earnings while enjoying our full support and tools."
            icon={comp_compens}
          />
          <Card
            Heading="Insightful Statistics"
            content="Gain free access to detailed statistics that track your progress and performance. Tafawwaq provides insights on earnings, student engagement, feedback, and more, helping you refine and enhance your tutoring journey."
            icon={access_cb}
          />
          <Card
            Heading="Advanced Teaching Tools"
            content="Enhance your lessons with Tafawwaq's dynamic tools, including a virtual whiteboard coupled with polls and quizzes. These features boost engagement and make online learning interactive and enjoyable for all."
            icon={advanced_tech}
          />
        </div>
      </div>
    </section>
  );
}
interface CardProps {
  Heading: string;
  content: string;
  icon: string;
}
const Card: React.FC<CardProps> = ({ Heading, content, icon }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <div className="bg-primary text-white rounded-full p-6 mb-4">
        {/* Icon placeholder */}
        <Image src={icon} alt="icon" className="" width={24} height={24} />
      </div>
      <div
        className="mb-2 text-center"
        style={{
          minHeight: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3 className="text-2xl font-semibold text-black mb-2 ">{Heading}</h3>
      </div>

      <div
        className={`${
          isHovered ? "max-h-[700px]" : "max-h-0"
        } transition-max-h duration-1000`}
      >
        <p
          className={`text-[#575757] text-center text-base mb-6 ${
            isHovered ? "opacity-1" : "opacity-0"
          } transition-all duration-200`}
        >
          {content}
        </p>
      </div>
    </div>
  );
};
