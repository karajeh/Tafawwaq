import React, { useState, useEffect, useRef, ReactNode } from "react";
import { FaChevronDown } from "react-icons/fa";

interface DropdownProps {
  options?: Record<string, string[]>;
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

const DropdownLevelStd: React.FC<DropdownProps> = ({
  options = {},
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
    onSelectionChange([option]);
    onToggle();
  };

  // Filter options based on search query
  const filteredOptions = Object.entries(options).reduce(
    (acc, [key, values]) => {
      const filteredValues = values.filter((value) =>
        value.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filteredValues.length > 0) {
        acc[key] = filteredValues;
      }
      return acc;
    },
    {} as Record<string, string[]>
  );

  return (
    <div
      className="relative w-32 flex items-center justify-center"
      ref={dropdownRef}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={onToggle}
        className={`py-6 px-4 bg-[#3e4dff] rounded-full overflow-hidden flex items-center justify-between relative w-full text-white ${
          disabled ? "opacity-60" : ""
        }`}
      >
        <span className="text-ellipsis overflow-hidden whitespace-nowrap w-full text-left font-bold text-sm">
          {selectedOptions.length > 0
            ? selectedOptions.join(", ")
            : placeHolderLabel || "Level"}
        </span>
        <FaChevronDown
          className={`transform transition-transform absolute right-2 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          style={{ minWidth: "12px", minHeight: "6px" }}
        />
      </button>

      {isOpen && (
        <div className="absolute sm:w-[30vw] w-[50vw] bg-white border border-primary rounded-md mt-2 p-4 shadow-md z-10 top-[100%] right-0 sm:left-0 sm:right-auto">
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
            {Object.entries(filteredOptions).map(([key, values]) => (
              <React.Fragment key={key}>
                <h3 className="text-base font-semibold">{key}</h3>
                {values.map((value) => (
                  <label
                    key={value}
                    htmlFor={value}
                    className="flex items-center py-2 hover:bg-[#00000011] cursor-pointer"
                    onClick={() => hideCheckBox && handleOptionToggle(value)}
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

export default DropdownLevelStd;
