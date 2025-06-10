"use client";
import React, { useEffect, useRef, useState } from "react";
import "react-phone-input-2/lib/style.css"; // Importing styles for react-phone-input-2
import { FaChevronDown } from "react-icons/fa6";
import Image from "next/image";
import { IProfile } from "src/api/profileService";
// import { log } from "console";

// Define a type for the currency option
interface CurrencyOption {
  value: string;
  label: string;
  flag: string;
}

export const CustomDropdown = ({
  label,
  value,
  options,
  onSelect,
  isOpen,
  onToggle,
}: {
  label: string;
  value: string;
  options: string[];
  onSelect: (value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <div className="relative w-full">
      <div
        onClick={onToggle}
        className="flex justify-between items-center w-full p-3 border border-light_gray rounded-md cursor-pointer bg-white"
      >
        <div className="flex justify-between w-full">
          <span className="mr-4">{label}</span>
          <span className="ml-auto">{value}</span>
        </div>
        <FaChevronDown
          className={`transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"
            }  ml-4`}
        />
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-light_gray rounded-md shadow-lg max-h-60 overflow-y-auto">
          {options.map((option, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onSelect(option);
                onToggle();
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const ToggleSwitch = ({
  id,
  label,
  defaultChecked,
  onChange,
}: {
  id: string;
  label: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}) => {
  return (
    <div className="flex items-center gap-4">
      {/* Toggle Switch */}
      <label
        htmlFor={id}
        className="inline-flex relative items-center cursor-pointer"
      >
        <input
          type="checkbox"
          id={id}
          defaultChecked={defaultChecked}
          onChange={(e) => onChange && onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-[#E7E7E7] rounded-full peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
      </label>

      {/* Label */}
      <span className="text-gray-700">{label}</span>
    </div>
  );
};

interface BusinessTafawwaqProps {
  setFormData: React.Dispatch<React.SetStateAction<IProfile>>;
  formData: IProfile;
  onValidationChange: (isValid: boolean) => void;
}

const BusinessTafawwaq: React.FC<BusinessTafawwaqProps> = ({
  setFormData,
  formData,
  onValidationChange
}) => {
  const currencyOptions: CurrencyOption[] = [
    { value: "AED", label: "AED", flag: "https://flagcdn.com/ae.svg" },
    { value: "USD", label: "USD", flag: "https://flagcdn.com/us.svg" },
  ];
  const [toggles, setToggles] = useState(Array(7).fill(true));
  const [hourlyError, setHourlyError] = useState(false);

  const [selectedCurrency, setSelectedCurrency] = useState(currencyOptions[0]);
  const [timeFrom, setTimeFrom] = useState(Array(7).fill("09:00 AM"));
  const [timeTo, setTimeTo] = useState(Array(7).fill("05:00 PM"));
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isOpenCurrent, setIsOpenCurrency] = useState(false);
  const [hourlyRate, setHourlyRate] = useState(150);
  const [cancellationRate, setCancellationRate] = useState("1");
  const [isValidHourlyRate, setIsValidHourlyRate] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const availableTimes = [
    "6:00 AM",
    "6:30 AM",
    "7:00 AM",
    "7:30 AM",
    "8:00 AM",
    "8:30 AM",
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
  ];

  useEffect(() => {
    if (!hourlyError && parseInt(cancellationRate) > 0) {
      onValidationChange(true);
    } else {
      onValidationChange(false);
    }
  }, [hourlyError, cancellationRate]);
  useEffect(() => {
    if (
      Number(hourlyRate) < 40 ||
      (Number(hourlyRate) < 150 && selectedCurrency.value === "AED")
    ) {
      setHourlyError(true);
    } else {
      setHourlyError(false);
    }
  }, [hourlyRate, selectedCurrency]);

  const handleTimeChange = (index: number, value: string, type: string) => {
    const day = days[index];

    if (type === "from") {
      const newTimeFrom = [...timeFrom];
      newTimeFrom[index] = value;
      setTimeFrom(newTimeFrom);
    } else {
      const newTimeTo = [...timeTo];
      newTimeTo[index] = value;
      setTimeTo(newTimeTo);
    }

    setFormData((prev) => {
      const prevAvailability = prev.availability ?? {};
      const current = prevAvailability[day] ?? {
        startTime: "09:00 AM",
        endTime: "5:00 PM",
      };

      const updatedAvailability = {
        ...prevAvailability,
        [day]: {
          ...current,
          ...(type === "from" ? { startTime: value } : { endTime: value }),
        },
      };

      return {
        ...prev,
        availability: updatedAvailability,
      };
    });

    // Close dropdown
    setTimeout(() => {
      setOpenDropdown(null);
    }, 0);
  };

  const defaultStartTime = "09:00 AM";
  const defaultEndTime = "5:00 PM";
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const handleToggleChange = (index: number) => {
    const day = days[index];

    // 1. Update toggle state
    setToggles((prev) => {
      const newToggles = [...prev];
      newToggles[index] = !newToggles[index];
      return newToggles;
    });

    setFormData((prev) => {
      const updatedAvailability = { ...(prev.availability ?? {}) };

      if (updatedAvailability[day]) {
        delete updatedAvailability[day];
      } else {
        updatedAvailability[day] = {
          startTime: defaultStartTime,
          endTime: defaultEndTime,
        };
      }

      return {
        ...prev,
        availability: updatedAvailability,
      };
    });

    const newTimeFrom = [...timeFrom];
    newTimeFrom[index] = defaultStartTime;
    setTimeFrom(newTimeFrom);
    const newTimeTo = [...timeTo];
    newTimeTo[index] = defaultEndTime;
    setTimeTo(newTimeTo);
  };

  const toggleDropdown = (dropdownId: string) => {
    setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpenCurrency(false);
    }
  };

  // Attach event listener to detect clicks outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option: CurrencyOption) => {
    setSelectedCurrency(option);
    setIsOpenCurrency(false);

    const amount = option.value === "AED" ? 150 : 21;

    setHourlyRate(amount);

    setFormData((prev) => ({
      ...prev,
      hourlyRate: {
        amount,
        currency: option.value,
      },
    }));
  };

  const handleSetHourlyRate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);

    setHourlyRate(value); // optional: if you're storing it locally

    setFormData((prev) => ({
      ...prev,
      hourlyRate: {
        ...prev.hourlyRate,
        amount: value,
      },
    }));
  };

  useEffect(() => {
    if (selectedCurrency.value === "AED" && hourlyRate < 150) {
      setIsValidHourlyRate(false);
    }
    if (selectedCurrency.value == "USD" && hourlyRate < 21) {
      setIsValidHourlyRate(false);
    } else if (selectedCurrency.value === "AED" && hourlyRate > 400) {
      setIsValidHourlyRate(false);
    } else if (selectedCurrency.value === "AED" && hourlyRate >= 150) {
      setIsValidHourlyRate(true);
    } else if (selectedCurrency.value === "USD" && hourlyRate >= 21) {
      setIsValidHourlyRate(true);
    }
  }, [selectedCurrency, hourlyRate]);
  const [discountHours, setDiscountHours] = useState<number>(0);
  const [discountAmounts, setDiscountAmounts] = useState<number[]>([]);
  const [discountCurrencies, setDiscountCurrencies] = useState<
    CurrencyOption[]
  >([]);
  const [dropdownOpenStates, setDropdownOpenStates] = useState<boolean[]>([]);

  const incrementDiscountHours = () => {
    setDiscountHours((prev) => prev + 1);
    setDiscountAmounts((prev) => [...prev, 0]); // Initialize with 0
    setDiscountCurrencies((prev) => [...prev, currencyOptions[0]]); // Default to first currency option
    setDropdownOpenStates((prev) => [...prev, false]); // Initialize dropdown state as closed
  };

  const handleAmountChange = (index: number, value: number) => {
    const updatedAmounts = [...discountAmounts];
    updatedAmounts[index] = value;
    setDiscountAmounts(updatedAmounts);
  };

  const handleCurrencyChange = (index: number, value: CurrencyOption) => {
    const updatedCurrencies = [...discountCurrencies];
    updatedCurrencies[index] = value;
    setDiscountCurrencies(updatedCurrencies);

    // Close the dropdown after selection
    const updatedDropdownStates = [...dropdownOpenStates];
    updatedDropdownStates[index] = false;
    setDropdownOpenStates(updatedDropdownStates);
  };

  const toggleDropdownDiscount = (index: number) => {
    const updatedDropdownStates = [...dropdownOpenStates];
    updatedDropdownStates[index] = !updatedDropdownStates[index];
    setDropdownOpenStates(updatedDropdownStates);
  };

  const handleCancellationAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = parseInt(e.target.value) || 0;

    setFormData((prev) => ({
      ...prev,
      cancellationNotice: {
        ...prev.cancellationNotice,
        amount: value,
      },
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Hourly Rate */}
      <div className="mb-4 ">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Hourly Rate<span className="text-red-500 font-semibold">*</span>
        </label>
        <div className="flex">
          <div
            className={
              "flex items-center w-full border rounded-md shadow-sm" +
              (hourlyError
                ? "border-red-500 focus-within:border-red-700"
                : " border-light_gray focus-within:border-primary")
            }
          >
            <input
              type="number"
              min={selectedCurrency.value === "USD" ? 40 : 150}
              value={hourlyRate}
              placeholder="Enter your hourly rate"
              onChange={handleSetHourlyRate}
              className="flex-grow block px-3 h-12 focus:outline-none bg-transparent focus:ring-primary sm:text-sm text-black placeholder-gray-600"
            />
            <div className="m-0 p-0 w-[140px] relative" ref={dropdownRef}>
              <hr className="absolute top-[10px] border-l-[#CFCFCF] left-0 border-l border-t-0 w-0 h-[30px]" />
              <div
                onClick={() => setIsOpenCurrency(!isOpenCurrent)}
                className="cursor-pointer flex items-center justify-between w-full px-3 h-12 focus:outline-none"
              >
                <div className="rounded-full h-8 w-8 bg-gray text-center align-middle flex justify-center overflow-hidden mr-3">
                  <Image
                    src={selectedCurrency.flag}
                    alt={selectedCurrency.label}
                    className="object-cover object-left"
                    width={30}
                    height={30}
                  />
                </div>
                <span className="mr-auto">{selectedCurrency.label}</span>
                <span className="text-light_gray">
                  <FaChevronDown
                    className={`transform transition-transform ${isOpenCurrent ? "rotate-180" : "rotate-0"
                      }`}
                  />
                </span>
              </div>

              {isOpenCurrent && (
                <div className="absolute z-10 w-full bg-white border rounded-md mt-1 border-light_gray shadow-lg">
                  {currencyOptions.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center px-3 py-0 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSelect(option)}
                    >
                      <Image
                        src={option.flag}
                        alt={option.label}
                        className="w-4 h-4 mr-2"
                        width={30}
                        height={30}
                      />

                      <span>{option.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {!isValidHourlyRate && selectedCurrency.value === "USD" && (
          <p className="text-red-500 text-sm mt-1">
            The hourly rate must be above 21 {selectedCurrency.value}
          </p>
        )}
        {!isValidHourlyRate && selectedCurrency.value === "AED" && (
          <p className="text-red-500 text-sm mt-1">
            The hourly rate must be between 151 - 400 {selectedCurrency.value}
          </p>
        )}
      </div>

      {/* Cancellation Notice */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cancellation Notice
          <span className="text-red-500 font-semibold">*</span>
        </label>
        <div className="flex">
          <div className="flex items-center w-full border border-light_gray border-opacity-50 rounded-md focus-within:border-primary">
            <input
              type="text"
              // value={cancellationRate}
              // onChange={(e) => setCancellationRate(e.target.value)}
              pattern="(?:0|[1-9]\\d*)"
              className="flex-grow p-3 rounded-l-md focus:outline-none focus:ring-primary"
              placeholder="1"
              value={formData.cancellationNotice?.amount ?? ""}
              onChange={handleCancellationAmountChange}
            />
            <div className="flex items-center px-0 rounded-r-md relative w-[140px]">
              <hr className="absolute top-[10px] border-l-[#CFCFCF] left-0 border-l border-t-0 w-0 h-[30px]" />
              <div
                className="py-3 focus:outline-none block w-full text-gray-700"
                style={{ paddingLeft: 10, paddingRight: 10 }}
              >
                Days
              </div>
            </div>
          </div>
        </div>
        <p className="mt-1 text-[14px] italic">
          Note: This clarifies the deadline for students to cancel bookings
        </p>
      </div>
      {/* Set Your Availability */}
      {/* for larger screens */}
      <div className="w-full hidden lg:block">
        <div className="mb-6 ">
          <label className="text-sm   font-medium text-gray-700 mb-2">
            Set Your Availability
            <span className="text-red-500 font-semibold">*</span>
          </label>
          <div className="space-y-4 flex  flex-col flex-wrap">
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day, index) => (
              <div
                key={index}
                className="flex justify-between items-center gap-2"
              >
                <ToggleSwitch
                  id={day}
                  label={day}
                  defaultChecked={index < 7}
                  onChange={() => handleToggleChange(index)}
                />
                {!toggles[index] && (
                  <div className="min-w-[600px] border border-gray p-3 text-sm text-[#666666] rounded-lg">
                    <p>Closed</p>
                  </div>
                )}
                {toggles[index] && (
                  <div className="min-w-[600px] gap-2 flex md:flex-row flex-col ">
                    <CustomDropdown
                      label="From"
                      value={timeFrom[index]}
                      options={availableTimes}
                      onSelect={(value) =>
                        handleTimeChange(index, value, "from")
                      }
                      isOpen={openDropdown === `from-${index}`}
                      onToggle={() => toggleDropdown(`from-${index}`)}
                    />
                    <CustomDropdown
                      label="To"
                      value={timeTo[index]}
                      options={availableTimes}
                      onSelect={(value) => handleTimeChange(index, value, "to")}
                      isOpen={openDropdown === `to-${index}`}
                      onToggle={() => toggleDropdown(`to-${index}`)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* for screens smaller */}
      <div className="w-full block lg:hidden">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Set Your Availability
          </label>
          <div className="space-y-4 flex flex-col">
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day, index) => (
              <div
                key={index}
                className="flex flex-wrap justify-between items-start gap-4 md:items-center"
              >
                <ToggleSwitch
                  id={day}
                  label={day}
                  defaultChecked={index < 7}
                  onChange={() => handleToggleChange(index)}
                />
                {!toggles[index] && (
                  <div className="w-full md:w-auto border border-gray p-3 text-sm text-[#666666] rounded-lg">
                    <p>Closed</p>
                  </div>
                )}
                {toggles[index] && (
                  <div className="flex flex-col lg:flex-row gap-2 w-full lg:w-auto">
                    <CustomDropdown
                      label="From"
                      value={timeFrom[index]}
                      options={availableTimes}
                      onSelect={(value) =>
                        handleTimeChange(index, value, "from")
                      }
                      isOpen={openDropdown === `from-${index}`}
                      onToggle={() => toggleDropdown(`from-${index}`)}
                    />
                    <CustomDropdown
                      label="To"
                      value={timeTo[index]}
                      options={availableTimes}
                      onSelect={(value) => handleTimeChange(index, value, "to")}
                      isOpen={openDropdown === `to-${index}`}
                      onToggle={() => toggleDropdown(`to-${index}`)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Add Discount */}
      <div className="flex flex-col gap-[12px] w-full">
        <h1
          className="text-[14px] md:text-[16px] text-blue-500 underline cursor-pointer"
          onClick={incrementDiscountHours}
        >
          Add Discounts
        </h1>
        {Array.from({ length: discountHours }, (_, index) => index + 2).map(
          (hour, index) => (
            <div className="hourly-rate-section w-full" key={hour}>
              <label>{hour} Hours Price:</label>
              <div
                className={
                  "flex items-center w-full border rounded-md shadow-sm" +
                  (discountAmounts[index] <
                    (discountCurrencies[index].value === "USD" ? 21 : 80)
                    ? " border-red-500 focus-within:border-red-700"
                    : " border-light_gray focus-within:border-primary")
                }
              >
                <input
                  type="number"
                  min={discountCurrencies[index].value === "USD" ? 40 : 150}
                  value={discountAmounts[index] || ""}
                  className="flex-grow block px-3 h-12 focus:outline-none bg-transparent focus:ring-primary sm:text-sm text-black placeholder-gray-600"
                  placeholder="Enter discount amount"
                  onChange={(e) =>
                    handleAmountChange(index, parseFloat(e.target.value))
                  }
                />
                <div className="m-0 p-0 w-[140px] relative">
                  <hr className="absolute top-[10px] border-l-[#CFCFCF] left-0 border-l border-t-0 w-0 h-[30px]" />
                  <div
                    onClick={() => toggleDropdownDiscount(index)}
                    className="cursor-pointer flex items-center justify-between w-full px-3 h-12 focus:outline-none"
                  >
                    <div className="rounded-full h-8 w-8 bg-gray text-center align-middle flex justify-center overflow-hidden mr-3">
                      <Image
                        src={discountCurrencies[index].flag}
                        alt={discountCurrencies[index].label}
                        className="object-cover object-left"
                        width={30}
                        height={30}
                      />
                    </div>
                    <span className="mr-auto">
                      {discountCurrencies[index].label}
                    </span>
                    <span className="text-light_gray">
                      <FaChevronDown
                        className={`transform transition-transform ${dropdownOpenStates[index] ? "rotate-180" : "rotate-0"
                          }`}
                      />
                    </span>
                  </div>
                  {dropdownOpenStates[index] && (
                    <div className="absolute z-10 w-full bg-white border rounded-md mt-1 border-light_gray shadow-lg">
                      {currencyOptions.map((option) => (
                        <div
                          key={option.value}
                          className="flex items-center px-3 py-0 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleCurrencyChange(index, option)}
                        >
                          <Image
                            src={option.flag}
                            alt={option.label}
                            className="w-4 h-4 mr-2"
                            width={30}
                            height={30}
                          />
                          <span>{option.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* Validation Messages */}
              {discountCurrencies[index].value === "AED" &&
                discountAmounts[index] < 80 && (
                  <p className="text-red-500 text-sm mt-1">
                    The hourly rate must be above 80{" "}
                    {discountCurrencies[index].label}
                  </p>
                )}
              {discountCurrencies[index].value === "USD" &&
                discountAmounts[index] < 21 && (
                  <p className="text-red-500 text-sm mt-1">
                    The hourly rate must be above 21{" "}
                    {discountCurrencies[index].label}
                  </p>
                )}
            </div>
          ),
        )}
      </div>
      {/*  */}
    </div>
  );
};

export default BusinessTafawwaq;
