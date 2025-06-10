'use client';

import React from "react";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

interface PaginationProps {
  currentPage: number; // The current page number
  totalPages: number; // The total number of pages
  onPrevious: () => void; // Function to handle the "Previous" button click
  onNext: () => void; // Function to handle the "Next" button click
  onPageChange: (pageNumber: number) => void; // Function to handle individual page number clicks
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  onPageChange,
}) => {
  const btn_style =
    "p-1 w-10 flex items-center justify-center border-[2px] border-[#eae9f2] rounded-md transition-transform transform hover:scale-105 active:scale-95";

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="font-semibold text-xl text-header flex gap-4 justify-center mb-10">
      <button
        className={btn_style}
        onClick={onPrevious}
        disabled={currentPage === 1}
      >
        <GrFormPrevious />
      </button>

      {/* Render the page numbers */}
      {pageNumbers.map((pageNumber) => (
        <span
          key={pageNumber}
          className={`${btn_style} ${
            currentPage === pageNumber
              ? "bg-green-200 text-green-800"
              : "bg-gray-100 text-gray-600"
          }`}
          onClick={() => onPageChange(pageNumber)} // Use onPageChange to handle page number click
        >
          {pageNumber}
        </span>
      ))}

      <button
        className={btn_style}
        onClick={onNext}
        disabled={currentPage === totalPages}
      >
        <MdNavigateNext />
      </button>
    </div>
  );
};

export default Pagination;
