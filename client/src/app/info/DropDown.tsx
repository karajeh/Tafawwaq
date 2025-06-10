"use client";
import React, { useState, useEffect, useRef, ReactNode } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";

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

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedOptions,
  placeHolderLabel,
  onSelectionChange,
  hideSearch = false,
  hideCheckBox = false,
  isOpen,
  onToggle,
  closeToggle,
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
    if (hideCheckBox) {
      // Single option selection
      onSelectionChange([option]); // Replace with the selected option
      onToggle(); // Close dropdown after selection
    } else {
      const isSelected = selectedOptions.includes(option);
      const newSelectedOptions = isSelected
        ? selectedOptions.filter((item) => item !== option)
        : [...selectedOptions, option];

      onSelectionChange(newSelectedOptions);
      // if (!isSelected) {
      //   onToggle(); // Close dropdown after adding new option
      // }
    }
  };

  const filteredOptions = options?.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={onToggle}
        className={`w-full border border-primary rounded-md py-3 px-4 flex justify-between items-center shadow-[0_0_2px_#10ffdf11] text-sm text-text_secondary focus-within:shadow-[0_0_6px_#10ffdf66] duration-300 ${
          disabled ? "bg-slate opacity-60 !border-gray" : "bg-white"
        }`}
      >
        {selectedOptions.length > 0
          ? selectedOptions.join(", ")
          : placeHolderLabel || "Select an option"}
        <FaChevronDown
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute w-full bg-white border border-primary rounded-md mt-2 p-4 shadow-md z-10">
          {!hideSearch && (
            <div className="relative mb-3">
              <input
                type="text"
                className="w-full text-sm border border-primary opacity-50 rounded-md py-3 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute right-3 top-4 text-light_gray" />
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
                htmlFor={option+index}
                className="flex items-center py-2 hover:bg-[#00000011] cursor-pointer"
                onClick={() => hideCheckBox && handleOptionToggle(option)}
              >
                {!hideCheckBox ? (
                  <>
                    <input
                      type="checkbox"
                      id={option+index}
                      checked={selectedOptions.includes(option)}
                      onChange={() => handleOptionToggle(option)}
                      className="form-checkbox h-4 w-4 text-primary border-light_gray rounded"
                    />
                    <span className="ml-2 text-sm text-text_secondary cursor-pointer">
                      {option}
                    </span>
                  </>
                ) : (
                  <span className="ml-2 text-sm  text-text_secondary cursor-pointer">
                    {option}
                  </span>
                )}
              </label>
            ))}
            {closeToggle && <button onClick={closeToggle} className="bg-primary py-1 px-4 text-white rounded">Done</button>}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
