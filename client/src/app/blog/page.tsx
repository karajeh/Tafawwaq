"use client";

import React, { useEffect } from "react";
import blogHeroImage from "public/images/blog/change/blogHero.svg";
import Image from "next/image";
import Pagination from "../components/Pagination";
import Link from "next/link";

import { useBlogs } from "../../store/blogs";

// import Heading from "../components/Heading";
// blog card images
// import blog1 from "public/images/blog/image20.svg";
// import blog2 from "public/images/blog/image21.svg";
// import blog3 from "public/images/blog/image22.svg";
// import blog4 from "public/images/blog/image23.svg";
// import blog5 from "public/images/blog/image24.svg";
// import blog6 from "public/images/blog/image25.svg";

export default function BlogPage() {
  useEffect(() => {
    document.title = `The Tafawwaq Blog`;
  }, []);
  return (
    <div>
      <Hero />
      <People />
    </div>
  );
}

function Hero() {
  return (
    <div className=" flex lg:flex-row flex-col bg-[#40A8CD]">
      <div className="  text-white px-10 md:px-20 py-20 my-auto basis-1/2">
        <h1 className=" text-xl md:text-4xl mb-10 tracking-tighter max-w-xs md:max-w-max">
          Explore expert tips, stories, and resources.
        </h1>
      </div>
      <div className="basis-1/2 bg-white">
        <Image
          className=" w-full h-full object-cover"
          src={blogHeroImage}
          alt="hero blog"
        />
      </div>
    </div>
  );
}

interface BlogPost {
  id: number;
  img?: string;
  title: string;
  subtitle: string;
  name?: string;
}

function People() {
  const { blogCardData } = useBlogs();
  return (
    <div className="py-20 px-4">
      <div className=" bg-background_blue px-4 max-w-screen-xl m-auto pb-1">
        {/* <div className=" tracking-[-1px] max-w-[450px] m-auto">
          <Heading
            center
            title="We help people solving their finance problems smartly."
          />
        </div> */}
        <div className=" grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:px-14 mb-28">
          {blogCardData.map((card: BlogPost, idx: number) => (
            <PeopoleCard key={idx} {...card} />
          ))}
        </div>

        <Pagination
          currentPage={0}
          totalPages={0}
          onPrevious={function (): void {
            throw new Error("Function not implemented.");
          }}
          onNext={function (): void {
            throw new Error("Function not implemented.");
          }}
          onPageChange={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
    </div>
  );
}

interface PeopoleCardProp {
  img?: string;
  id: number;
  title: string;
  subtitle: string;
  name?: string;
}

const PeopoleCard: React.FC<PeopoleCardProp> = ({
  // img,
  id,
  title,
  subtitle,
  // name,
}) => {
  return (
    <div className=" border bg-white border-[#e1ecf0] rounded-lg p-6">
      {/* <div className=" shadow-peopleBox rounded-lg overflow-hidden">
        <Image className=" object-cover w-full" src={img} alt={name} />
      </div> */}
      <div className=" text-lg font-semibold text-[#2B3031] my-4">{title}</div>
      <p className=" text-[#4A51762] text-xs leading-normal opacity-80 max-w-xs">
        {subtitle}
      </p>
      {/* <span className=" block text-primary font-semibold mt-3">{name}</span> */}
      <Link href={`\\blog\\${id}`}>
        <button className=" bg-secondary rounded-full text-white px-6 py-2 text-sm mt-8">
          Read More
        </button>
      </Link>
    </div>
  );
};
