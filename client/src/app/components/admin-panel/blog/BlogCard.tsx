import Image from "next/image";
import Link from "next/link";
// import Link from "next/link";
import React from "react";

type Props = {
  id: number;
  title: string;
  category: string;
  subtitle: string;
  img: string;
  // time: string;
  // author: {
  //   name: string;
  //   avatar: string;
  // };
  // href: string;
};

function BlogCard({ id, title, category, subtitle, img }: Props) {
  return (
    <Link href={`/blog/${id}`} target="_blank" className="flex gap-5">
      <Image
        width={150}
        height={150}
        src={img}
        alt="Banner"
        className=" aspect-square md:max-w-[200px] max-w-[150px] rounded-2xl"
      />
      <div className=" flex h-full justify-evenly flex-col">
        <div className="font-semibold  text-sm text-primary">{category}</div>
        <div className=" font-semibold text-lg">{title}</div>
        <div className=" text-sm line-clamp-2">{subtitle}</div>
        {/* <div className=" flex items-center gap-3">
          <Image
            width={40}
            height={40}
            alt="avatar"
            src={author.avatar}
            className=" w-10 h-10 rounded-full"
          />
          <div>
            <p className=" text-[#555555] text-sm md:text-base font-normal">
              {author.name}
            </p>
            <div className=" text-sm">{time}</div>
          </div>
        </div> */}
      </div>
    </Link>
  );
}

export default BlogCard;
