/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import React, { useState, useEffect, useRef, useCallback } from "react";
// import avatar from "public/images/session-oversight/avatar.svg";
import download from "public/images/my-account/upload.svg";
// import help from "public/images/my-account/help.svg";
// import usd from "public/images/my-account/usd.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
import axiosInstance from "src/api/axiosInstance";
import apiRoutes from "src/api/apiRoutes";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import uploadIcon2 from "public/images/auth/upload2.png";
import { CustomDropdown, ToggleSwitch } from "src/app/info/BusinessTafawwaq";
import languages from "../../../lib/languages.json";
import countries from "../../../lib/countries.json";
import majors from "../../../lib/majors.json";
import edit from "public/images/info/edit.svg";
import SearchableSelect from "src/components/SearchableSelect";
import Link from "next/link";
import SubjectsICanTeach from "src/app/components/teacher/SubjectsICanTeach";

import Cookies from "js-cookie";
import { IProfile, updateProfile } from "src/api/profileService";



type Availability = {
  startTime: string;
  endTime: string;
  isOff?: boolean;
  _id?: string;
};
const ProfileInfo = () => {


  const [username, setUsername] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [name, setName] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState<"Male" | "Female" | "Other">("Male");
  const [birthDate, setBirthDate] = useState("");
  const [whatsAppPhoneNumber, setWhatsappNumber] = useState("");
  const [major, setMajor] = useState("");
  const [certificate, setCertificate] = useState<File | null>(null);
  const [languageSpoken, setPreferredLanguage] = useState(["English"]);
  const [educationalBackground, setEducationalBackground] = useState("");
  const [hourlyRateAmount, setHourlyRateAmount] = useState(15);
  const [hourlyRateCurrency, setHourlyRateCurrency] = useState("AED");
  const [cancellationAmount, setCancellationAmount] = useState(30);
  const [isValidHourlyRate, setIsValidHourlyRate] = useState(false);
  const [school, setSchool] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [userEdit, setUserEdit] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [toggles, setToggles] = useState(Array(7).fill(true));
  const [timeFrom, setTimeFrom] = useState(Array(7).fill("09:00 AM"));
  const [timeTo, setTimeTo] = useState(Array(7).fill("05:00 PM"));
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
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
  const [discountHours, setDiscountHours] = useState<number>(0);
  const [discountAmounts, setDiscountAmounts] = useState<number[]>([]);
  const [discountCurrencies, setDiscountCurrencies] = useState<string[]>([]);
  const [selectedCurriculums, setSelectedCurriculums] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);

  const skipPromptRef = useRef(false);

  const incrementDiscountHours = () => {
    setDiscountHours((prev) => prev + 1);
    setDiscountAmounts((prev) => [...prev, 0]);
    setDiscountCurrencies((prev) => [...prev, currencies[0]]);
  };

  const handleAmountChange = (index: number, value: number) => {
    const updatedAmounts = [...discountAmounts];
    updatedAmounts[index] = value;
    setDiscountAmounts(updatedAmounts);
  };

  const handleCurrencyChange = (index: number, value: string) => {
    const updatedCurrencies = [...discountCurrencies];
    updatedCurrencies[index] = value;
    setDiscountCurrencies(updatedCurrencies);
  };

  const handleTimeChange = (index: number, value: string, type: string) => {
    if (type === "from") {
      const newTimeFrom = [...timeFrom];
      newTimeFrom[index] = value;
      setTimeFrom(newTimeFrom);
    } else {
      const newTimeTo = [...timeTo];
      newTimeTo[index] = value;
      setTimeTo(newTimeTo);
    }
    setTimeout(() => {
      setOpenDropdown(null);
    }, 0);
  };

  const handleToggleChange = (index: number) => {
    setToggles((prev) => {
      const newToggles = [...prev];
      newToggles[index] = !newToggles[index];
      return newToggles;
    });
  };

  const toggleDropdown = (dropdownId: string) => {
    setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
  };

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ] as const;

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true)
      const token = Cookies.get("token");
      if (!token) {
        return;
      }

      try {
        const response = await axiosInstance.get(apiRoutes.getUserProfile, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          const userData = response.data;
          setName(userData.name || "");
          setUsername(userData.username || "");
          setLname(userData.teacher.lname || "");
          setRole(userData.role || "");
          setEmail(userData.email || "");
          setCountry(userData.teacher.country || "");
          setGender(userData.teacher.gender || "");
          if (userData.teacher.birthDate) {
            const formattedDate = new Date(userData.teacher.birthDate)
              .toISOString()
              .split("T")[0];
            setBirthDate(formattedDate);
          }
          setWhatsappNumber(userData.teacher.whatsAppPhoneNumber || "");

          const from = Array(7).fill("09:00 AM");
          const to = Array(7).fill("05:00 PM");

          for (let i = 0; i < 7; i++) {
            const dayData = userData.teacher.availability[weekdays[i]];
            if (dayData) {
              from[i] = dayData.startTime;
              to[i] = dayData.endTime;
            }
          }

          setTimeFrom(from);
          setTimeTo(to);
          // setSchoolName(userData.schoolName || "");

          setPreferredLanguage(userData.teacher.languageSpoken || ["english"]);
          setMajor(userData.teacher.educationalBackground.major || "");
          setEducationalBackground(
            userData.teacher.educationalBackground.highestDegree || "english"
          );
          setHourlyRateAmount(userData.teacher.hourlyRate?.amount || 15);
          setHourlyRateCurrency(userData.teacher.hourlyRate?.currency || "USD");
          setCancellationAmount(
            userData.teacher.cancellationNotice?.amount || 30
          );
          setSchool(userData.teacher.school || "");
          setAvatar(userData.avatar || null);

          setSelectedSubjects(userData.teacher.subjects)
          const curriculums = []
          for (let i = 0; i < userData.teacher.teaches.length; i++) {

            curriculums.push(userData.teacher.teaches[i].curriculum)
          }
          setSelectedCurriculums(curriculums)
        } else {
          toast.error("Failed to fetch profile. Please try again.");
        }
      } catch (error) {
        console.log(error);

        console.error(error);
        toast.error("An error occurred while fetching the profile.");
      }
      finally {
        setLoading(false)
      }
    };

    fetchProfile();
  }, []);

  const currencies = ["USD", "EURO", "AED"];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  const handleCancellationAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = parseInt(e.target.value);
    setCancellationAmount(inputValue < 1 ? 1 : inputValue);
  };
  const toAvailabilityObject = (
    timeFrom: string[],
    timeTo: string[],
    oldData?: { [day: string]: Availability } // optional if you want to preserve _id
  ): { [day: string]: Availability } => {
    const availability: { [day: string]: Availability } = {};

    weekdays.forEach((day, index) => {

      availability[day] = {
        startTime: timeFrom[index],
        endTime: timeTo[index],
        isOff: !toggles[index],

        ...(oldData?.[day]?._id ? { _id: oldData[day]._id } : {}),
      };
    });

    return availability;
  };



  const handleSave = async () => {
    try {
      // if (
      //   !name ||
      //   !lname ||
      //   !email ||
      //   !country ||
      //   !gender ||
      //   !birthDate ||
      //   !whatsAppPhoneNumber
      // ) {
      //   toast.error("Please fill in all required fields.");
      //   return;
      // }
      const availability = toAvailabilityObject(timeFrom, timeTo)

      // Prepare the data to send
      const teacherData: IProfile = {
        username,
        name,
        lname,
        email,
        country,
        gender,
        birthDate: new Date(birthDate),
        whatsAppPhoneNumber,
        languageSpoken,
        educationalBackground: { highestDegree: educationalBackground, major: major },
        school,
        availability,

        hourlyRate: {
          amount: hourlyRateAmount,
          currency: hourlyRateCurrency,
        },
        cancellationNotice: {
          amount: cancellationAmount,
        },
      };


      await updateProfile(teacherData)

      // if (response.status === 200) {
      toast.success("Profile updated successfully!");
      // } else {

      //   toast.error("Failed to update profile. Please try again.");
      // }
    } catch (error) {
      toast.error("An error occurred while updating the profile.");
    }
  };


  const handleSetPreferredLanguage = (option: string) => {
    setPreferredLanguage((prevChosenSubjects) =>
      prevChosenSubjects.includes(option)
        ? prevChosenSubjects.filter((chosenSubject) => chosenSubject !== option)
        : [...prevChosenSubjects, option]
    );
  };

  useEffect(() => {
    if (hourlyRateCurrency === "AED" && hourlyRateAmount < 150) {
      setIsValidHourlyRate(false);
    }
    if (hourlyRateCurrency == "USD" && hourlyRateAmount < 41) {
      setIsValidHourlyRate(false);
    }
    if (hourlyRateCurrency == "USD" && hourlyRateAmount < 41) {
      setIsValidHourlyRate(false);
    } else if (hourlyRateCurrency === "AED" && hourlyRateAmount >= 150) {
      setIsValidHourlyRate(true);
    } else if (hourlyRateCurrency === "USD" && hourlyRateAmount >= 41) {
      setIsValidHourlyRate(true);
    } else if (hourlyRateCurrency === "USD" && hourlyRateAmount >= 41) {
      setIsValidHourlyRate(true);
    }
  }, [hourlyRateCurrency, hourlyRateAmount]);

  const handleEditClick = () => {
    setUserEdit(true);
  };


  const handleInputChange = () => {
    setHasUnsavedChanges(true);
  };

  useEffect(() => {
    // Warn user before refreshing or closing tab
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue =
          "You have unsaved changes. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  useEffect(() => {
    // const handleRouteChange = (url: string) => {
    //   if (hasUnsavedChanges && url !== pathname) {
    //     const confirmLeave = window.confirm(
    //       "You have unsaved changes. Do you really want to leave?"
    //     );
    //     if (!confirmLeave) {
    //       router.replace(pathname); // Stay on the same page
    //       throw "Abort route change. Please ignore this error.";
    //     }
    //   }
    // };

    // Listen for route changes
    // const push = router.push;
    // router.push = (...args: Parameters<typeof push>) => {
    //   handleRouteChange(args[0]?.toString() || "");
    //   return push(...args);
    // };
    // return () => {
    //   router.push = push; // Cleanup
    // };
    const originalPush = router.push;

    router.push = (...args: Parameters<typeof originalPush>) => {
      const nextUrl = args[0]?.toString() || "";

      if (skipPromptRef.current) {
        skipPromptRef.current = false; // Reset after skipping
        return originalPush(...args);
      }

      if (hasUnsavedChanges && nextUrl !== pathname) {
        setPendingRoute(nextUrl);
        setShowUnsavedModal(true);
        return;
      }

      return originalPush(...args);
    };

    return () => {
      router.push = originalPush;
    };
  }, [hasUnsavedChanges, router, pathname]);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (hasUnsavedChanges) {
        // const confirmLeave = window.confirm(
        //   "You have unsaved changes. Do you really want to leave?"
        // );
        // if (!confirmLeave) {
        //   window.history.pushState(null, "", pathname); // Stay on the current page
        // }
        event.preventDefault();
        setPendingRoute(document.referrer || "/");
        setShowUnsavedModal(true);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [hasUnsavedChanges, pathname]);

  if (loading)
    return <div>Loading...</div>


  return (
    <div>
      <div className="pt-[20px] md:pt-[0px] px-[18px] shadow-2xl pb-[18px] rounded-[8px]">
        <div className="flex gap-[12px]">
          <div className="flex flex-col items-center">
            <label
              htmlFor="avatar-upload"
              className="cursor-pointer w-[80px] h-[80px] overflow-hidden  flex items-center justify-center"
            >
              <div className="w-full h-full flex items-center justify-center">
                {avatar ? (
                  <div className="w-[80px] h-[80px] rounded-xl overflow-hidden">
                    <Image
                      src={avatar}
                      alt="avatar"
                      className="object-cover rounded-xl"
                      width="100"
                      height="100"
                    />
                  </div>
                ) : (
                  <span className="text-gray-500">Upload</span>
                )}
              </div>
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                handleFileChange(e);
                handleInputChange();
              }}
            />
          </div>
          <div className="flex md:block items-center gap-[12px] text-[14px] leading-4">
            <div>
              <h1>{name}</h1>
              <h1 className="font-bold">{role}</h1>
            </div>
            <div className="bg-[#ff66361a] flex gap-[4px] md:mt-[20px] px-[8px] py-[4px] rounded-full">
              <Image src={download} alt="download" />
              <h1 className="text-[9px] md:text-[12px] text-[#FF6636]">
                Change Profile Image
              </h1>
            </div>
          </div>
        </div>
        <div className="mt-[24px]">
          <div className="flex w-full gap-[16px]">
            <div className="w-full">
              {userEdit && (
                <div>
                  <h1 className="text-[14px] text-sm">Username</h1>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      handleInputChange();
                    }}
                    className="w-full border mt-[10px] h-[35px] md:h-[42px] px-2 md:px-5 mb-3 pl-2"
                    style={{ borderColor: "#D1D5DB" }}
                    placeholder="Alex"
                  />
                </div>
              )}
              {!userEdit && (
                <div>
                  <p className="text-sm mb-2.5">Username</p>
                  <div
                    className="w-full px-4 py-2 border border-slate-800 shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-black  placeholder-gray-600  flex justify-between mb-3"
                    style={{ borderColor: "#D1D5DB" }}
                  >
                    <p className="text-base pl-1">{username}</p>
                    {/* <button onClick={handleEditClick}>Edit</button> */}

                    <Image
                      src={edit}
                      alt="edit-btn"
                      width={20}
                      height={10}
                      onClick={handleEditClick}
                      className="cursor-pointer"
                    ></Image>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex w-full gap-[16px]">
            <div className="w-full">
              <h1 className="text-[14px]">First Name</h1>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  handleInputChange();
                }}
                className="w-full border mt-[10px] h-[35px] md:h-[46px] px-2 md:px-5 outline-none"
                style={{ borderColor: "#D1D5DB" }}
                placeholder="Alex"
              />
            </div>
            <div className="w-full">
              <h1 className="text-[14px]">Last Name</h1>
              <input
                type="text"
                value={lname}
                onChange={(e) => {
                  setLname(e.target.value);
                  handleInputChange();
                }}
                className="w-full border mt-[10px] h-[35px] md:h-[46px] px-2 md:px-5 outline-none"
                style={{ borderColor: "#D1D5DB" }}
                placeholder="Thompson"
              />
            </div>
          </div>
          <div className="flex w-full gap-[16px] mt-[16px]">
            <div className="w-full">
              <h1 className="text-[14px]">Email</h1>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  handleInputChange();
                }}
                className="w-full border mt-[10px] h-[35px] md:h-[46px] px-2 md:px-5 outline-none"
                style={{ borderColor: "#D1D5DB" }}
                placeholder="Alex@gmail.com"
              />
            </div>
            <div className="w-full">
              <h1 className="text-[14px]">Country</h1>
              <select
                name="country"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  handleInputChange();
                }}
                className="w-full text-[#8C94A3] border mt-[10px] h-[35px] md:h-[46px] px-2 md:px-5 outline-none"
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex w-full gap-[16px] mt-[16px]">
            <div className="w-full">
              <h1 className="text-[14px]">Gender</h1>
              <select
                name="gender"
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value as "Male" | "Female" | "Other");
                  handleInputChange();
                }}
                className="w-full text-[#8C94A3] border mt-[10px] h-[35px] md:h-[46px] px-2 md:px-5 outline-none"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div className="flex w-full gap-[16px] mt-[16px]">
            <div className="w-full">
              <h1 className="text-[14px]">Birth Date</h1>
              <input
                type="date"
                name="birthDate"
                value={birthDate}
                onChange={(e) => {
                  setBirthDate(e.target.value);
                  handleInputChange();
                }}
                className="w-full border text-[#8C94A3] mt-[10px] h-[35px] md:h-[46px] px-2 md:px-5 outline-none"
                style={{ borderColor: "#D1D5DB" }}
                placeholder="Dec-22, 1999"
              />
            </div>
            <div className="w-full">
              <h1 className="text-[14px]">Whatsapp Number</h1>
              <PhoneInput
                country={"ae"}
                value={whatsAppPhoneNumber}
                onChange={(value) => {
                  setWhatsappNumber(value);
                  handleInputChange();
                }}
                dropdownClass="bg-white"
                containerClass="w-full mt-[10px]"
                inputStyle={{
                  width: "100%",
                  backgroundColor: "white",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  borderRadius: 0,
                }}
                buttonStyle={{
                  backgroundColor: "white",
                  borderRightWidth: 0,
                  borderRadius: 0,
                }}
              />
            </div>
          </div>
          <div className="flex w-full gap-[16px] mt-[16px]">
            <div className="w-full relative">
              <h1 className="text-[14px]">Languages I Can Teach In</h1>
              <div
                className="border p-[10px] mt-[10px] after:absolute after:bottom-5 after:right-2 after:block after:w-2 after:h-2 after:border-b-2 after:border-r-2 after:border-[#9198a1] after:rotate-45"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                style={{ borderColor: "#D1D5DB" }}
              >
                <input
                  type="text"
                  value={languageSpoken}
                  className="border-none outline-none focus:outline-none focus:border-0 w-full block"
                  readOnly
                  placeholder="Select languages"
                  style={{ borderColor: "#D1D5DB" }}
                />
              </div>
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute bg-white border border-[#D1D5DB] p-2 rounded shadow-md mt-1 w-full z-10 max-h-[300px] overflow-y-auto"
                >
                  {languages.map((subject) => (
                    <label
                      className="w-full hover:bg-[#00000011] cursor-pointer p-1 flex items-center gap-2 rounded-sm text-[#8C94A3]"
                      key={subject}
                    >
                      <input
                        type="checkbox"
                        value={subject}
                        checked={languageSpoken.includes(subject)}
                        onChange={() => {
                          handleSetPreferredLanguage(subject);
                          handleInputChange();
                        }}
                        className="w-[16px] h-[16px] border-[2px] border-[#9198a1]"
                      />
                      {subject}
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div className="w-full">
              <h1 className="text-[14px]">Highest Degree Attained</h1>
              <select
                value={educationalBackground}
                onChange={(e) => {
                  handleInputChange();
                  setEducationalBackground(e.target.value);
                }}
                className="w-full text-[#8C94A3] border mt-[10px] h-[35px] md:h-[46px] px-2 md:px-5 outline-none"
                style={{ borderColor: "#D1D5DB" }}
              >
                <option value="">Select Degree</option>
                <option value="High School Diploma">High School Diploma</option>
                <option value="Associates Degree">Associates Degree</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="Doctorate (Ph.D.)">Doctorate (Ph.D.)</option>
                <option value="Professional Degree (MD, JD, etc.)">
                  Professional Degree (MD, JD, etc.)
                </option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="flex w-full gap-[16px] mt-[16px]">
            <div className="w-full mt-[21px] md:mt-[0px]">
              <h1 className="text-[14px]">Major</h1>
              <SearchableSelect
                options={majors}
                value={major}
                onChange={(value) => {
                  setMajor(value);
                  handleInputChange();
                }}
                placeholder="Select Major"
                className="w-full text-[#8C94A3] border mt-[10px] h-[35px] md:h-[46px] px-2 md:px-5 outline-none"
              />
            </div>
            <div className="w-full">
              <h1 className="text-[14px]">
                School You currently teach(optional)
              </h1>
              <input
                type="text"
                value={school}
                onChange={(e) => {
                  setSchool(e.target.value);
                  handleInputChange();
                }}
                className="w-full border mt-[10px] h-[35px] md:h-[46px] px-2 md:px-5 outline-none"
                style={{ borderColor: "#D1D5DB" }}
                placeholder="New Castle School"
              />
            </div>
          </div>
          <div className="md:flex w-full gap-7  mt-[16px]  flex-wrap ">
            <div className="w-full max-w-[850px] mx-auto">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Set Your Availability
                </label>
                <div className="gap-4 flex flex-col">
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
                      className="flex flex-col justify-start items-start gap-4 w-full"
                    >
                      <ToggleSwitch
                        id={day}
                        label={day}
                        defaultChecked={index < 7}
                        onChange={() => {
                          handleToggleChange(index);
                          handleInputChange();
                        }}
                      />
                      {!toggles[index] && (
                        <div className="w-full md:w-auto border border-gray p-3 text-sm text-[#666666] rounded-lg">
                          <p>Closed</p>
                        </div>
                      )}
                      {toggles[index] && (
                        <div className="flex flex-col lg:flex-row gap-2 w-full">
                          <CustomDropdown
                            label="From"
                            value={timeFrom[index]}
                            options={availableTimes}
                            onSelect={(value) => {
                              handleTimeChange(index, value, "from");
                              handleInputChange();
                            }}
                            isOpen={openDropdown === `from-${index}`}
                            onToggle={() => toggleDropdown(`from-${index}`)}
                          />
                          <CustomDropdown
                            label="To"
                            value={timeTo[index]}
                            options={availableTimes}
                            onSelect={(value) => {
                              handleTimeChange(index, value, "to");
                              handleInputChange();
                            }}
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
            <div className="flex flex-col sm:flex-row justify-between w-full gap-4">
              <div className="hourly-rate-section w-full">
                <label>Hourly Rate:</label>
                <div
                  className="border p-[10px] flex justify-between w-full"
                  style={{ borderColor: "#D1D5DB" }}
                >
                  <input
                    type="number"
                    min={hourlyRateCurrency === "USD" ? 40 : 150}
                    value={hourlyRateAmount}
                    className="focus:outline-none block w-full text-[#8C94A3]"
                    style={{ borderColor: "#D1D5DB" }}
                    placeholder="100"
                    onChange={(e) => {
                      setHourlyRateAmount(parseFloat(e.target.value));
                      handleInputChange();
                    }}
                  />
                  <select
                    value={hourlyRateCurrency}
                    onChange={(e) => {
                      setHourlyRateCurrency(e.target.value);
                      handleInputChange();
                    }}
                    className="text-[#8C94A3]"
                  >
                    {currencies.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </div>
                {!isValidHourlyRate && hourlyRateCurrency === "USD" && (
                  <p className="text-red-500 text-sm mt-1">
                    The hourly rate must be above 41 {hourlyRateCurrency}
                  </p>
                )}
                {!isValidHourlyRate && hourlyRateCurrency === "AED" && (
                  <p className="text-red-500 text-sm mt-1">
                    The hourly rate must be above 150 {hourlyRateCurrency}
                  </p>
                )}
              </div>
              <div className="hourly-rate-section w-full max-sm:mb-4">
                <label>Cancellation Notice</label>
                <div
                  className="border p-[10px] flex justify-between w-full"
                  style={{ borderColor: "#D1D5DB" }}
                >
                  <input
                    type="number"
                    pattern="(?:0|[1-9]\\d*)"
                    value={cancellationAmount}
                    onChange={(e) => {
                      handleCancellationAmountChange(e);
                      handleInputChange();
                    }}
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const inputValue = parseInt(e.target.value);
                      setCancellationAmount(
                        isNaN(inputValue) || inputValue < 1 ? 1 : inputValue
                      );
                    }}
                    className="focus:outline-none text-[#8C94A3] border-[#8C94A3] w-full"
                  />
                  <div className="text-[#8C94A3] px-2">Days</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[12px] w-full">
              <h1
                className="text-[14px] md:text-[16px] text-blue-500 underline cursor-pointer"
                onClick={() => {
                  incrementDiscountHours();
                  handleInputChange();
                }}
              >
                Add Discounts
              </h1>
              {Array.from(
                { length: discountHours },
                (_, index) => index + 2
              ).map((hour, index) => (
                <div className="hourly-rate-section w-full" key={hour}>
                  <label>{hour} Hours Price:</label>
                  <div
                    className="border p-[10px] flex justify-between w-full"
                    style={{ borderColor: "#D1D5DB" }}
                  >
                    <input
                      type="number"
                      min={discountCurrencies[index] === "USD" ? 40 : 150}
                      value={discountAmounts[index] || ""}
                      className="focus:outline-none block w-full text-[#8C94A3]"
                      style={{ borderColor: "#D1D5DB" }}
                      placeholder="100"
                      onChange={(e) => {
                        handleAmountChange(index, parseFloat(e.target.value));
                        handleInputChange();
                      }}
                    />
                    <select
                      value={discountCurrencies[index]}
                      onChange={(e) => {
                        handleCurrencyChange(index, e.target.value);
                        handleInputChange();
                      }}
                      className="text-[#8C94A3]"
                    >
                      {currencies.map((currency) => (
                        <option key={currency} value={currency}>
                          {currency}
                        </option>
                      ))}
                    </select>
                  </div>
                  {discountCurrencies[index] === "AED" &&
                    discountAmounts[index] < 80 && (
                      <p className="text-red-500 text-sm mt-1">
                        The hourly rate must be above 80{" "}
                        {discountCurrencies[index]}
                      </p>
                    )}
                  {discountCurrencies[index] === "USD" &&
                    discountAmounts[index] < 41 && (
                      <p className="text-red-500 text-sm mt-1">
                        The hourly rate must be above 41{" "}
                        {discountCurrencies[index]}
                      </p>
                    )}
                </div>
              ))}
            </div>
            <div className="w-full relative">
              <h1 className="text-[20px]">Subjects I Can Teach:</h1>
              <SubjectsICanTeach
                selectedCurriculums={selectedCurriculums}
                selectedLevels={selectedLevels}
                selectedSubjects={selectedSubjects}
                setSelectedCurriculums={(value) => {
                  setSelectedCurriculums(value);
                  handleInputChange();
                }}
                setSelectedLevels={(value) => {
                  setSelectedLevels(value);
                  handleInputChange();
                }}
                setSelectedSubjects={(value) => {
                  setSelectedSubjects(value);
                  handleInputChange();
                }}
              />
            </div>
            <div className="w-full">
              <h1 className="text-sm font-medium text-[#1A1A1A] mb-2">
                Certificates
              </h1>
              <div className="max-w-[500px]">
                <label
                  className="flex flex-col items-center justify-center align-middle border-dashed border-2 border-[#D5D5D5] rounded-md p-6 pt-9 pb-9 text-center cursor-pointer hover:bg-gray-100"
                  htmlFor="videoUploadInput"
                >
                  <Image
                    src={uploadIcon2.src}
                    alt={""}
                    width={20}
                    height={20}
                  />
                  <p className="text-[#484848] mt-4">
                    Click or drag file to this area to upload
                  </p>
                  <input
                    type="file"
                    id="videoUploadInput"
                    accept="video/mp4"
                    className="hidden"
                    onChange={(e) => {
                      setCertificate(e.target.files?.[0] || null);
                      handleInputChange();
                    }}
                  />
                </label>
                <span
                  style={{ fontSize: 14 }}
                  className="font-normal text-[#9D9D9D] mt-1"
                >
                  Formats accepted are pdf, .csv and .xlsx
                </span>
                <div className="mt-2">
                  <button
                    onClick={handleSave}
                    className="bg-[#FF6636] text-white px-6 py-2 rounded-[5px] text-[14px] transition-transform transform hover:scale-105 active:scale-95"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-[14px] mt-[30px]">Introduction Video</h1>
          <iframe
            width="100%"
            height="400"
            src="https://www.youtube.com/embed/YSul9yrAvN4?si=SOEHhFIp8ftqKLQN"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="mt-[20px] rounded-md"
          ></iframe>
          <div className="mt-5">
            <label
              htmlFor="video-tutor"
              className="bg-primary text-white px-6 py-2 mr-4 rounded-[5px] text-[14px] transition-transform transform hover:scale-105 active:scale-95 cursor-pointer inline-block"
            >
              Replace Video
              <input
                type="file"
                name="video"
                id="video-tutor"
                className="hidden"
              />
            </label>
            <button className="bg-red-400 text-white px-6 py-2 rounded-[5px] text-[14px] transition-transform transform hover:scale-105 active:scale-95">
              Remove Video
            </button>
          </div>
        </div>
        <div className="bg-white text-[14px] md:text-[16px] flex items-center justify-between underline mt-[24px] p-[18px] shadow-2xl rounded-[8px]">
          <Link href={"/terms"}>
            <h1>Terms & Condition</h1>
          </Link>
          <Link href={"/privacy"}>
            <h1>Privacy Policy</h1>
          </Link>
        </div>
      </div>

      {showUnsavedModal ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm shadow-lg mt-3">
            <h2 className="text-lg font-semibold mb-4">Unsaved Changes</h2>
            <p className="mb-4">
              You have unsaved changes. Do you really want to leave?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setHasUnsavedChanges(false);
                  setShowUnsavedModal(false);
                  setPendingRoute(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  if (pendingRoute) {
                    setHasUnsavedChanges(false);
                    setShowUnsavedModal(false);
                    skipPromptRef.current = true;
                    router.push(pendingRoute);
                  }
                }}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProfileInfo;
