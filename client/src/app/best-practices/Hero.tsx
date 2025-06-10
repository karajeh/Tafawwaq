"use client";
import Image from "next/image";
// import girl_with_book from "public/images/best-practice/girl-with-book.png";
import girl_with_book from "public/images/best-practice/best-practice-change/girl_with_book.png";
import Button from "../components/Button";
// import profiles from "public/images/best-practice/profiles.png";
// import Button from "../components/Button";

export default function Hero() {
  return (
    <section className=" md:px-4 pt-8 md:pt-16 text-black bg-white">
      <div className="grid px-4 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12 mt-14">
        <div className="mr-auto place-self-center lg:col-span-7 p-4 md:p-8 ">
          {/* <h1 className="font-semibold text-xl">
            The Tafawwaq Tutor Experience
          </h1> */}
          <h1 className="text-[#40A8CD] max-w-2xl font-medium mb-8 text-4xl md:text-5xl xl:text-6xl">
            Maximize Your Impact <br /> as an
            <span className="text-secondary">&nbsp;Online Tutor</span>
          </h1>
          <p className="max-w-2xl mb-8 text-header  lg:mb-8 md:text-md lg:text-lg ">
            Whether you&apos;re starting or seasoned, find essential tips to
            create effective, engaging sessions.We&apos;re here to help you
            thrive on Tafawwaq, building rewarding experiences for you and your
            students
          </p>

          <div className="w-48 mb-6">
            <Button
              label="Apply Now"
              onClick={() => {}}
              classNames="rounded-xl"
            />
          </div>

          {/* <div className="flex items-center gap-4">
            <Image src={profiles} alt="hero" className="w-1/3 h-full" />

            <div className="">
              <h1 className="font-semibold text-md md:text-lg">
                10K+ Instructors
              </h1>
              <p className="text-[#0554F2] text-sm">
                have started their studies
              </p>
            </div>
          </div> */}
        </div>
        {/* <div className="lg:mt-0 lg:col-span-5 bg-black lg:flex lg:order-last order-first">
          <div className="w-[50%] h-[25vh] bg-secondary rounded-full"></div>
          <Image src={girl_with_book} alt="hero" className="w-5/6 h-full" />
          <div className="w-[50%] h-[25vh] bg-secondary rounded-full"></div>
        </div> */}

        <div className="lg:mt-0 lg:col-span-5 lg:flex lg:order-last order-first relative">
          {/* Image */}
          <Image
            src={girl_with_book}
            alt="hero"
            className="w-5/6 h-full object-cover z-20"
          />
        </div>
      </div>
    </section>
  );
}
