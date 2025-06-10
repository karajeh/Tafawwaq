"use client";
import useStudentRoute from "../../../../hooks/useStudentRoute";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import React from "react";

type Props = {
  placeholder?: string;
};

function Searchbar({ placeholder = "Search here..." }: Props) {
  const [search, setSearch] = React.useState("");
  const studentRoute = useStudentRoute();
  return (
    <div
      className={clsx(
        "max-w-[368px] w-full rounded-xl h-[47px] flex items-center",
        studentRoute ? "bg-white" : "bg-[#f5f5f6]"
      )}
    >
      <MagnifyingGlassIcon className="w-6 h-6 text-[#b0b0b0] ml-5" />
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        className="w-full h-full bg-transparent pl-1.5 outline-none"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default Searchbar;
