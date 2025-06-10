import React from "react";
import Image from "next/image";
import customerImage from "public/images/landing-page/Rectangle 503.png";
import headsetIcon from "public/images/landing-page/headset.png";
import leftBottomShape from "public/images/landing-page/leftBottom.png";
import rightTopShape from "public/images/landing-page/rightBottom.png";
import ellipseShape from "public/images/landing-page/Ellipse 5.png";

const CustomerSupport: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="relative flex flex-col lg:flex-row items-center lg:items-center justify-between bg-white py-16 px-6 lg:px-16 max-w-7xl mx-auto">
        {/* Left Section: Text and Info */}
        <div className="lg:w-1/2 flex flex-col py-6  px-5 md:px-24 space-y-6 lg:self-center">
          <div className="flex items-center space-x-3">
            <Image
              src={headsetIcon}
              alt="24/7 Support Icon"
              width={40}
              height={40}
            />
            <h2 className="text-4xl font-semibold text-black">
              <span className="text-secondary">24/7</span> Customer Support
            </h2>
          </div>

          <ul className="text-gray-600 space-y-4">
            <li className="flex items-start space-x-2">
              <span className="text-[#4A5162] font-bold">•</span>
              <p className="text-[#4A5162] text-lg">
                <strong>Live Chat:</strong> Reach out to our 24/7 live chat for
                quick assistance with any questions or concerns.
              </p>
            </li>
          </ul>
          <button className="bg-secondary hover:opacity-70 text-white px-6 py-3 rounded-lg shadow-md w-max 
            transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 
            hover:shadow-lg active:shadow-md">
            Contact us
          </button>
        </div>

        {/* Right Section: Image and Decorative Shapes */}
        <div className="relative hidden md:flex lg:w-1/2 mt-10 lg:mt-0 z-10 justify-center items-center">
          <Image
            src={customerImage}
            alt="Customer Support"
            width={400}
            height={600}
            className="rounded-lg shadow-md z-10"
          />

          {/* Decorative Shapes */}
          <div className="absolute top-[-20px] right-[-20px] md:top-[-10px] md:right-[10px] lg:right-[57px]">
            <Image
              src={rightTopShape}
              alt="Top Decorative Shape"
              width={60}
              height={60}
            />
          </div>
          <div className="absolute bottom-[-20px] left-[-20px] md:bottom-[-10px] md:left-[10px] lg:bottom-[-30px] lg:left-[50px]">
            <Image
              src={leftBottomShape}
              alt="Bottom Decorative Shape"
              width={60}
              height={60}
            />
          </div>
          <div className="absolute top-1/2 right-[10%] z-0 md:right-[5%] lg:right-[10%]">
            <Image
              src={ellipseShape}
              alt="Ellipse Decorative Shape"
              width={80}
              height={80}
              className="z-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;
