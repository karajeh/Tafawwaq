import React from "react";

import imageHero from "public/images/about-us/aboutus-hero.png";
import Image from "next/image";
import { FaInstagram, FaYoutube } from "react-icons/fa6";
import missionImage from "public/images/about-us/mission.svg";
import visionImage from "public/images/about-us/vision.svg";
import Heading from "../components/Heading";
import { TiSocialFacebook } from "react-icons/ti";
import { FaLinkedinIn } from "react-icons/fa";
import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `About us - Tafawwaq Tutoring`,
  };
}
// import { TfiEmail } from "react-icons/tfi";
// import Link from "next/link";
// import { RiFacebookCircleLine } from "react-icons/ri";
// import experts from "public/images/about-us/experts.svg";
// import comprehensive from "public/images/about-us/comprehensive.svg";
// import user_friendly from "public/images/about-us/user-friendly.svg";
// import learning from "public/images/about-us/learning.svg";
// import { FaArrowRightLong } from "react-icons/fa6";

export default function About() {
  return (
    <div className="bg-public_bg">
      <Hero />
      <Mission />
      {/* <Advantages /> */}
      <Advantages2 />
      <Social />
    </div>
  );
}

function Hero() {
  return (
    <div className="pt-4 pb-16 bg-public_bg max-w-screen-xl m-auto px-4 mt-28">
      <div className="relative py-36 md:py-52 rounded-xl overflow-hidden">
        <Image
          className="absolute left-0 top-0 w-full h-full object-cover"
          src={imageHero}
          alt="hero about"
        />
        <div className="absolute left-0 top-0 w-full h-full bg-bgHero blur-sm "></div>
        <div className=" relative text-neutral-100 max-w-[520px] px-4 m-auto text-center flex flex-col gap-6 items-center">
          <h1 className="uppercase md:text-5xl text-3xl font-semibold">
            About us
          </h1>
          <p className="opacity-70 tracking-wider">
            At Tafawwaq, we are dedicated to transforming education through
            innovative online tutoring. Our platform connects students with
            expert tutors, offering personalized, flexible learning solutions
            that fit into today’s busy lifestyles.
          </p>
          {/* <button className=" rounded-md mt-1 bg-neutral-100 text-[#40a8cd] px-4 py-3 font-semibold">
            Explore More
          </button> */}
        </div>
        {/* <div className=" absolute -right-32 top-1/2  rotate-90 -translate-y-1/2  flex-col md:flex-row items-center gap-3 md:gap-6 hidden md:flex ">
          <div className=" flex gap-3 text-[#39c6ff]">
            <Icon>
              <PiTwitterLogo />
            </Icon>

            <Icon>
              <RiFacebookCircleLine />
            </Icon>
            <Icon>
              <FaInstagram />
            </Icon>
          </div>
          <div className=" flex items-center text-white gap-2">
            <TfiEmail />
            <span>myjourney@email.com</span>
          </div>
        </div> */}
      </div>
    </div>
  );
}

// function Icon({ children }: { children: React.ReactElement }) {
//   return (
//     <button className=" w-8 h-8 backdrop-blur rounded-lg text-2xl flex justify-center items-center">
//       {children}
//     </button>
//   );
// }

function Mission() {
  return (
    <div className=" py-20 bg-background_blue px-4">
      <div className=" flex md:flex-row flex-col justify-center gap-24">
        <MissionCard
          icon={missionImage}
          header="Our Mission"
          paragraph="To provide accessible, high-quality tutoring that empowers students to unlock their full potential and succeed academically."
        />
        <MissionCard
          icon={visionImage}
          header="Our Vision"
          paragraph="To create a future where every student thrives through personalized, flexible education."
        />
      </div>
    </div>
  );
}

interface MissionProps {
  icon: string;
  header: string;
  paragraph: string;
}
const MissionCard: React.FC<MissionProps> = ({ icon, header, paragraph }) => {
  return (
    <div className=" flex flex-col gap-3 items-center text-center">
      <div className=" w-20 md:w-24">
        <Image src={icon} alt={header} />
      </div>
      <Heading title={header} />
      <p className=" text-gray italic max-w-80 text-lg md:max-w-96">
        {paragraph}
      </p>
    </div>
  );
};

// function Advantages() {
//   return (
//     <div className=" px-4 py-10 md:py-20">
//       <div className=" max-w-xl m-auto ">
//         <Heading
//           center={true}
//           title="Advantages of Using Tafawwaq"
//           subtitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
//         />
//       </div>
//       <div className=" flex md:flex-row flex-col items-center gap-8 justify-center py-11">
//         <AdvangtesCard
//           icon={experts}
//           title="Expert Tutors:"
//           subtitle="Access to highly qualified educators."
//         />
//         <AdvangtesCard
//           icon={comprehensive}
//           title="Comprehensive Resources:"
//           subtitle="A wide range of learning materials and tools."
//         />
//         <AdvangtesCard
//           icon={user_friendly}
//           title="User-Friendly Platform:"
//           subtitle="Easy-to-navigate interface and seamless experience."
//         />
//         <AdvangtesCard
//           icon={learning}
//           title="Personalized Learning:"
//           subtitle="Customized lesson plans and progress tracking to meet "
//         />
//       </div>
//       <button className="block bg-primary font-semibold rounded-md text-[#fafafb] px-12 md:w-64 py-3 m-auto">
//         Find a tutor
//       </button>
//     </div>
//   );
// }

// interface AdvangtesCardProps {
//   icon: string;
//   title: string;
//   subtitle: string;
// }

// const AdvangtesCard: React.FC<AdvangtesCardProps> = ({
//   icon,
//   title,
//   subtitle,
// }) => {
//   return (
//     <div className=" max-w-80 flex flex-col gap-4 shadow-box border px-10 py-8 rounded-xl border-[#dfdfdf]">
//       <div className=" bg-secondary w-16 h-16 p-3 rounded-lg">
//         <Image src={icon} alt={title} />
//       </div>
//       <div className=" text-slate font-semibold">{title}</div>
//       <p className=" text-slate opacity-70">{subtitle}</p>
//       <Link
//         href="#"
//         className=" text-primary font-semibold flex items-center gap-2"
//       >
//         {" "}
//         View More <FaArrowRightLong className=" text-xl" />{" "}
//       </Link>
//     </div>
//   );
// };

function Advantages2() {
  return (
    <div className=" bg-background_dark px-4 py-20 relative overflow-hidden ">
      <Circle bgColor="bg-secondary" position=" -left-40 -top-40" />
      <Circle bgColor="bg-primary" position="left-1/3  -bottom-64" />
      <div className=" max-w-screen-xl m-auto flex flex-col md:flex-row gap-10 relative items-center justify-between">
        <div className=" text-neutral-100">
          <div className=" font-semibold text-4xl mb-6">
            Your Path to Success with Tafawwaq
          </div>
          <p className="opacity-70 tracking-wider w-[80%] text-base mb-6">
            At Tafawwaq, we are dedicated to creating a supportive environment
            that ensures privacy and safety, builds lasting confidence, and
            nurtures academic success.
          </p>
          <Link
            href="/find-a-tutor"
            className="inline-block bg-secondary font-semibold rounded-md text-[#fafafb] px-12 py-3 transition-all hover:scale-105 hover:bg-opacity-90 hover:shadow-lg active:scale-[0.98]"
          >
            Find a tutor
          </Link>
        </div>

        <div className=" grid grid-cols-[250px] max-w-[500px] md:grid-cols-2 gap-8 justify-center  relative">
          <Circle
            bgColor="bg-secondary"
            position=" left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />

          <Advagtes2Card
            // num="01"
            title="Interactive & Engaging Lessons"
            subtitle="Our lessons are designed to keep students actively engaged, using interactive tools and methods that make learning both fun and effective."
          />
          <Advagtes2Card
            // num="02"
            title="Qualified, Caring Tutors"
            subtitle="Our tutors are not only subject experts but also mentors who are dedicated to inspiring and guiding each student with patience, empathy, and expertise."
          />
          <Advagtes2Card
            // num="03"
            title="Flexible Scheduling"
            subtitle="We understand busy schedules. Tafawwaq offers flexible booking times that suits you, making it easy to fit learning into your routine, whenever it’s most convenient."
          />
          <Advagtes2Card
            // num="04"
            title="Privacy and Safety"
            subtitle="Your privacy and safety are our highest priority. Every lesson is securely recorded, and our platform is protected with advanced encryption technology to ensure complete confidentiality and peace of mind."
          />
        </div>
      </div>
    </div>
  );
}

interface Advantages2CardProps {
  // num: string;
  title: string;
  subtitle: string;
}

const Advagtes2Card: React.FC<Advantages2CardProps> = ({
  // num,
  title,
  subtitle,
}) => {
  return (
    <div className=" relative text-center text-header px-2 pb-10 pt-7 bg-white shadow-boxDark rounded-2xl">
      {/* <span className=" font-semibold absolute top-1 left-1/2 -translate-x-1/2 text-7xl text-secondary opacity-30">
        {num}
      </span> */}
      <div className=" relative">
        <p className=" font-semibold text-base mb-4">{title}</p>
        <p className="text-xs opacity-70">{subtitle}</p>
      </div>
    </div>
  );
};

interface CircleProps {
  bgColor: string;
  position: string;
}

const Circle: React.FC<CircleProps> = ({ bgColor, position }) => {
  return (
    <div
      className={`absolute ${bgColor} ${position} w-80 h-80 rounded-full`}
    ></div>
  );
};

function Social() {
  const icon_style = "text-white text-3xl ";
  return (
    <div className=" bg-background_blue py-20">
      <div className=" px-10 flex flex-col gap-4 max-w-screen-xl m-auto md:flex-row justify-between items-center">
        <div className=" text-header font-semibold text-2xl md:text-4xl md:w-[70%]">
          Follow us on
          <span className=" text-primary"> social media</span> and join our
          journey in reshaping education.
        </div>

        <div className="flex gap-2 md:gap-8 ">
          <button className="bg-primary p-2 rounded-full transition-all hover:scale-125 hover:bg-opacity-90 active:scale-110">
            <FaInstagram className={icon_style} />
          </button>
          <button className="bg-primary p-2 rounded-full transition-all hover:scale-125 hover:bg-opacity-90 active:scale-110">
            <TiSocialFacebook className={icon_style} />
          </button>
          <button className="bg-primary p-2 rounded-full transition-all hover:scale-125 hover:bg-opacity-90 active:scale-110">
            <FaLinkedinIn className={icon_style} />
          </button>
          <button className="bg-primary p-2 rounded-full transition-all hover:scale-125 hover:bg-opacity-90 active:scale-110">
            <FaYoutube className={icon_style} />
          </button>
        </div>
      </div>
    </div>
  );
}
