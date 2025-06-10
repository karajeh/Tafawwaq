import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";

interface DropdownProps {
  options?: Record<string, Record<string, Record<string, string[]>>>;
  selectedOptions: string[];
  // placeHolderLabel?: string | ReactNode;
  hideSearch?: boolean;
  hideCheckBox?: boolean;
  onSelectionChange: (selected: string[]) => void;
  isOpen: boolean; // Control from parent component
  onToggle: () => void; // Function to toggle dropdown
  closeToggle?: () => void; // Function to close dropdown
  disabled?: boolean; // Function to toggle dropdown
}

const DropDownSubjectStd: React.FC<DropdownProps> = ({
  options = {},
  selectedOptions,
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
  }, [isOpen]);

  const handleOptionToggle = (option: string) => {
    // if (hideCheckBox) {
    // Single option selection
    onSelectionChange([option]); // Replace with the selected option
    onToggle(); // Close dropdown after selection
    // } else {
    //   const isSelected = selectedOptions.includes(option);
    //   const newSelectedOptions = isSelected
    //     ? selectedOptions.filter((item) => item !== option)
    //     : [...selectedOptions, option];

    //   onSelectionChange(newSelectedOptions);
    //   // if (!isSelected) {
    //   //   onToggle(); // Close dropdown after adding new option
    //   // }
    // }
  };

  // Filter options based on search query
  const filterOptions = (
    options: Record<string, Record<string, Record<string, string[]>>>
  ) => {
    return Object.entries(options).reduce((acc, [key, subOptions]) => {
      const filteredSubOptions = Object.entries(subOptions).reduce(
        (subAcc, [subKey, subKeyOptions]) => {
          const filteredSubKeyOptions = Object.entries(subKeyOptions).reduce(
            (innerAcc, [innerKey, values]) => {
              const filteredValues = values.filter((value) =>
                value.toLowerCase().includes(searchQuery.toLowerCase())
              );
              if (filteredValues.length > 0) {
                innerAcc[innerKey] = filteredValues;
              }
              return innerAcc;
            },
            {} as Record<string, string[]>
          );
          if (Object.keys(filteredSubKeyOptions).length > 0) {
            subAcc[subKey] = filteredSubKeyOptions;
          }
          return subAcc;
        },
        {} as Record<string, Record<string, string[]>>
      );
      if (Object.keys(filteredSubOptions).length > 0) {
        acc[key] = filteredSubOptions;
      }
      return acc;
    }, {} as Record<string, Record<string, Record<string, string[]>>>);
  };

  const filteredOptions = filterOptions(options);

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
          {selectedOptions.length > 0 ? selectedOptions.join(", ") : "Select an option"}
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
            {Object.entries(filteredOptions).map(([key, subOptions]) => (
              <React.Fragment key={key}>
                <h3 className="text-base font-semibold">{key}</h3>
                {Object.entries(subOptions).map(([subKey, subKeyOptions]) => (
                  <React.Fragment key={subKey}>
                    <h4 className="text-sm font-medium ml-2">
                      {subKey !== "NoLevel" && subKey}
                    </h4>
                    {Object.entries(subKeyOptions).map(([innerKey, values]) => (
                      <React.Fragment key={innerKey}>
                        <h5 className="text-sm ml-4">
                          {innerKey !== "NoSubjectCategory" && innerKey}
                        </h5>
                        {values.map((value) => (
                          <label
                            key={value}
                            htmlFor={value}
                            className="flex items-center py-2 hover:bg-[#00000011] cursor-pointer ml-4"
                            onClick={() =>
                              hideCheckBox && handleOptionToggle(value)
                            }
                          >
                            {!hideCheckBox ? (
                              <>
                                <input
                                  type="radio"
                                  id={value}
                                  checked={selectedOptions.includes(value)}
                                  onChange={() => handleOptionToggle(value)}
                                  className="form-checkbox h-4 w-4 text-primary border-light_gray rounded"
                                />
                                <span className="ml-2 text-sm text-text_secondary cursor-pointer">
                                  {value}
                                </span>
                              </>
                            ) : (
                              <span className="ml-2 text-sm text-text_secondary cursor-pointer">
                                {value}
                              </span>
                            )}
                          </label>
                        ))}
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                ))}
              </React.Fragment>
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

export default DropDownSubjectStd;
