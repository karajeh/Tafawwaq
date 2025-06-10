"use client";
import React, { useState, useEffect, useRef, ReactNode } from "react";
import { FaChevronDown } from "react-icons/fa";

interface DropdownProps {
  options?: string[];
  selectedOptions: string[];
  placeHolderLabel?: string | ReactNode;
  hideSearch?: boolean;
  hideCheckBox?: boolean;
  onSelectionChange: (selected: string[]) => void;
  isOpen: boolean; // Control from parent component
  onToggle: () => void; // Function to toggle dropdown
  closeToggle?: () => void; // Function to close dropdown
  disabled?: boolean; // Function to toggle dropdown
}

const DropDownCurriculumStd: React.FC<DropdownProps> = ({
  options,
  selectedOptions,
  placeHolderLabel,
  onSelectionChange,
  hideSearch = false,
  hideCheckBox = false,
  isOpen,
  onToggle,
  // closeToggle,
  disabled,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Function to close dropdown if clicked outside
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      if (isOpen) {
        onToggle(); // Close dropdown if it's open
      }
    }
  };

  // Attach event listener to detect clicks outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside, isOpen]);

  const handleOptionToggle = (option: string) => {
    onSelectionChange([option]);
    onToggle();
  };

  const filteredOptions = options?.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={onToggle}
        className={`w-full border rounded-md py-3 px-4 flex justify-between items-center  text-sm text-text_secondary duration-300 ${
          disabled ? "opacity-60" : ""
        }`}
      >
        <span className="text-ellipsis overflow-hidden whitespace-nowrap w-full text-left font-bold text-sm">
          {selectedOptions.length > 0
            ? selectedOptions.join(", ")
            : placeHolderLabel || "Curriculum"}
        </span>
        <FaChevronDown
          className={`transform transition-transform absolute right-2 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          style={{ minWidth: "12px", minHeight: "6px" }}
        />
      </button>

      {isOpen && (
        <div className="absolute w-full bg-white border rounded-md mt-2 p-4 shadow-md z-10">
          {!hideSearch && (
            <div className="relative mb-3">
              <input
                type="text"
                className="w-full text-sm border border-primary opacity-50 rounded-md py-3 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {/* <FaSearch className="absolute right-3 top-4 text-light_gray" /> */}
            </div>
          )}

          <ul
            className={`max-h-60 overflow-y-auto ${
              hideSearch ? "mt-2" : "mt-5"
            }`}
          >
            {filteredOptions?.map((option, index) => (
              <label
                key={index}
                htmlFor={option + index}
                className="flex items-center py-2 hover:bg-[#00000011] cursor-pointer"
                onClick={() => hideCheckBox && handleOptionToggle(option)}
              >
                {option !== "none" && (
                  <>
                    <input
                      type="radio"
                      id={option + index}
                      checked={selectedOptions.includes(option)}
                      onChange={() => handleOptionToggle(option)}
                      className="form-checkbox h-4 w-4 text-primary border-light_gray rounded"
                    />
                    <span className="ml-2 text-sm text-text_secondary cursor-pointer">
                      {option}
                    </span>
                  </>
                )}
              </label>
            ))}
            {/* {closeToggle && (
              <button
                onClick={closeToggle}
                className="bg-primary py-1 px-4 text-white rounded"
              >
                Done
              </button>
            )} */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDownCurriculumStd;
