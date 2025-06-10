import React, { useState, useEffect, useRef } from "react";

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
  handleSearchTutor: () => void;
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
  handleSearchTutor
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

  const handleSearch = () => {
    handleSearchTutor()
  }
  // Attach event listener to detect clicks outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleOptionToggle = (option: string) => {
    onSelectionChange([option]); // Replace with the selected option
    onToggle(); // Close dropdown after selection
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
    <div className="relative w-full" ref={dropdownRef}>
      <div className="searchSystem-input w-full">
        {" "}
        <input
          type="text"
          readOnly={true}
          disabled={disabled}
          onClick={onToggle}
          className={` cursor-pointer ${disabled ? "opacity-60" : ""}`}
          value={
            selectedOptions.length > 0
              ? selectedOptions.join(", ")
              : "What would you want to learn?"
          }
        />
        <svg
          onClick={handleSearch}
          className="searchImg"
          width="112"
          height="86"
          viewBox="0 0 112 86"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="0.866211"
            width="112"
            height="84.2674"
            rx="40"
            fill="#DDE0FF"
          />
          <path
            d="M54.565 54.9909C61.8357 54.9909 67.7296 48.9655 67.7296 41.5326C67.7296 34.0996 61.8357 28.0742 54.565 28.0742C47.2943 28.0742 41.4004 34.0996 41.4004 41.5326C41.4004 48.9655 47.2943 54.9909 54.565 54.9909Z"
            stroke="#3D4DFF"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M58.946 36.2623C58.3712 35.6736 57.6883 35.2066 56.9366 34.8883C56.1848 34.57 55.379 34.4066 54.5653 34.4075C53.7516 34.4066 52.9457 34.57 52.194 34.8883C51.4422 35.2066 50.7594 35.6736 50.1846 36.2623M64.0299 51.2082L70.6005 57.9255"
            stroke="#3D4DFF"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute w-full bg-white border border-primary rounded-md mt-2 p-4 shadow-md z-10 top-[100%]">
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
