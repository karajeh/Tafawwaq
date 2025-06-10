"use client";

import React, { useEffect, useState } from "react";
import blogHeroImage from "public/images/blog/change/singleBlogHero.svg";
import Image from "next/image";
import Pagination from "../../components/Pagination";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useBlogs } from "../../../store/blogs";

// import Heading from "../components/Heading";

interface BlogPost {
  id: number;
  img?: string;
  title: string;
  subtitle: string;
  name?: string;
}
export default function SingleBlogPage() {
  const { blogCardData } = useBlogs();

  const [blog, setBlog] = useState<BlogPost | null>(null);
  const { id } = useParams<{ id: string | string[] }>();

  // Ensure id is a string
  const idString = Array.isArray(id) ? id[0] : id;

  useEffect(() => {
    const foundBlog: BlogPost | undefined = blogCardData.find(
      (blog: BlogPost) => blog.id == parseInt(idString)
    );
    setBlog(foundBlog || null);
  }, [idString, blogCardData]);

  if (!blog) {
    return (
      <div className="flex items-center justify-center p-10">Loading...</div>
    );
  }
  return (
    <div className="w-full">
      <div className="flex flex-col w-full relative z-0">
        <Image
          className=" w-full h-full object-cover"
          src={blogHeroImage}
          alt="hero blog"
        />
        <div className="absolute z-10 top-[70%] left-0 w-full h-50 flex justify-center">
          <div className="md:w-[60%] w-[80%] lg:py-10 md:py-6 bg-primary md:h-60 sm:h-40 h-36 flex flex-col items-center justify-center">
            <h3 className="md:text-3xl sm:text-2xl text-xl text-white font-semibold">
              {`"`}
              {blog.title}
              {`"`}
            </h3>
          </div>
        </div>
      </div>
      <div className="w-full md:mt-[8rem] mt-[7rem] flex justify-center">
        <div className="md:w-[60%] w-[80%] flex flex-col">
          <p className="text-xs leading-relaxed tracking-wide">
            {blog.subtitle}
          </p>
          <p className="text-xs leading-relaxed tracking-wide mt-4 font-bold">
            A Subheading to Enhance Structure
          </p>
          <p className="text-xs leading-relaxed tracking-wide">
            Nullam in ipsum metus. Proin aliquet, ipsum at cursus malesuada,
            velit nisi fermentum est, sit amet blandit turpis nisl et justo.
            Vivamus in lacus ut metus iaculis pellentesque. Mauris auctor purus
            ut ex finibus, ut tristique ligula pharetra. Donec sit amet sapien
            in lorem luctus malesuada id quis velit. Sed in ultricies erat.
            Aliquam erat volutpat. &quot;This is an example of blockquote text,
            useful for breaking up content and highlighting key ideas.&quot;
            Cras fringilla, justo vel hendrerit faucibus, arcu elit feugiat
            nisi, a fermentum justo purus in elit. Nam gravida quam ut dui
            tincidunt, eget vehicula enim laoreet. Proin efficitur mauris et
            elit pretium, sed interdum augue tristique. Duis vitae magna a quam
            vehicula pretium ac a est.
          </p>
          <p className="text-xs leading-relaxed tracking-wide mt-4 font-bold">
            Another Subheading for Balance
          </p>
          <p className="text-xs leading-relaxed tracking-wide">
            Curabitur viverra lectus non turpis varius, vitae tincidunt lacus
            convallis. Etiam efficitur venenatis urna nec porttitor. Suspendisse
            potenti. Ut aliquet tellus eros, a consectetur dolor luctus ac.
            Integer suscipit ligula ac erat feugiat, quis suscipit nulla
            vulputate. Phasellus condimentum sapien sit amet ante egestas, in
            fringilla justo congue. Suspendisse lacinia erat vel enim eleifend,
            non eleifend orci interdum. Nunc consequat, lorem sed suscipit
            consectetur, orci nisl vehicula odio, nec iaculis nisi nulla id
            elit. Aenean porttitor mollis urna. Integer eget libero vitae ipsum
            consequat tincidunt non ut risus
          </p>
        </div>
      </div>

      <div className="w-full mt-10 flex justify-center bg-background_blue">
        <div className="md:w-[60%] w-[80%] py-10 flex flex-col items-center gap-10">
          <h4 className="font-semibold text-base">Read More</h4>
          <div className="w-full">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-28">
              {blogCardData.map((card: BlogPost, idx: number) => {
                if (card.id != parseInt(idString)) {
                  return <PeopoleCard key={idx} {...card} />;
                }
              })}
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
      </div>
    </div>
  );
}

interface PeopoleCardProp {
  title: string;
  subtitle: string;
}

const PeopoleCard: React.FC<PeopoleCardProp> = ({ title, subtitle }) => {
  return (
    <div className="border bg-white border-[#e1ecf0] rounded-lg p-6">
      <div className="text-base font-semibold text-[#2B3031] my-4">{title}</div>
      <p className=" text-[#4A51762] text-xs leading-normal opacity-80 max-w-xs">
        {subtitle}
      </p>
      <Link href={`\\blog\\${title}`}>
        <button className=" bg-secondary rounded-full text-white px-6 py-2 text-sm mt-8">
          Read More
        </button>
      </Link>
    </div>
  );
};
