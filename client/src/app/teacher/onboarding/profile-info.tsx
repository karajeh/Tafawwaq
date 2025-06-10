"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import dropDown from "public/images/my-account/arrow_drop_down.svg";
import { updateProfile } from "src/api/profileService";
import { IProfile } from "src/api/profileService";

const ProfileInfo = () => {
  const [selectedExperience, setSelectedExperience] = useState<string | null>(
    null,
  );
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);
  const [hoursPerWeek, setHoursPerWeek] = useState<string | null>(null);
  const [hoursPerWeekInTafawwaq, setHoursPerWeekInTafawwaq] = useState<
    string | null
  >(null);
  const [profileFeedback, setProfileFeedback] = useState<string | null>(null);
  const [studentType, setStudentType] = useState<string[]>([]);

  const handleTeacherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTeacher(event.target.value);
  };
  const handleExperienceChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSelectedExperience(event.target.value);
  };
  const handleHoursPerWeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHoursPerWeek(event.target.value);
  };
  const handleHoursPerWeekInTafawwaq = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setHoursPerWeekInTafawwaq(event.target.value);
  };
  const handleProfileFeedback = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setProfileFeedback(event.target.value);
  };
  const handleStudentType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setStudentType((prevState) =>
      prevState.includes(value)
        ? prevState.filter((item) => item !== value)
        : [...prevState, value],
    );
  };

  const router = useRouter();
  const submitProfileInfo = async () => {
    const profileInfo: IProfile = {
      teachingExperience: selectedExperience ?? undefined,
      studentPreferences: studentType ?? undefined,
      hoursPerWeekOutsideTafawwaq: hoursPerWeek ?? undefined,
      preferredHoursPerWeekInTafawwaq: hoursPerWeekInTafawwaq ?? undefined,
      consentToUseProfileInMarketing:
        profileFeedback === "Yes"
          ? true
          : profileFeedback === "No"
            ? false
            : undefined,
    };
    await updateProfile(profileInfo);

    router.push("/info");
  };
  return (
    <div>
      <div className="pt-[20px] md:pt-[0px] px-[18px] shadow-xl pb-[18px] rounded-[8px]">
        <div className="mt-[24px] w-full flex flex-col gap-6">
          <div className="w-full flex flex-col gap-3">
            <h1 className="text-[14px] font-semibold">
              Have you ever been a teacher?
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-gray-500">
              {["Yes", "No"].map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-2 py-1 px-2 border border-[#D0D5DD] rounded-lg"
                >
                  <input
                    type="radio"
                    name="teacher"
                    value={option}
                    checked={selectedTeacher === option}
                    onChange={handleTeacherChange}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col gap-3">
            <h1 className="text-[14px] font-semibold">
              How many years of tutoring experience do you have?
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-gray-500">
              {["1", "2-4", "5-10", "10+"].map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-2 py-1 px-2 border border-[#D0D5DD] rounded-lg"
                >
                  <input
                    type="radio"
                    name="experience"
                    value={option}
                    checked={selectedExperience === option}
                    onChange={handleExperienceChange}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col gap-3">
            <h1 className="text-[14px] font-semibold">
              Which type of students do you like to teach?
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-gray-500">
              {[
                "Elementary",
                "Middle School",
                "High School",
                "College",
                "Adult",
              ].map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-2 py-1 px-2 border border-[#D0D5DD] rounded-lg"
                >
                  <input
                    type="checkbox"
                    name="studenttype"
                    value={option}
                    checked={studentType.includes(option)}
                    onChange={handleStudentType}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 w-full flex flex-col gap-3">
            <h1 className="text-[14px] font-semibold">
              In which languages can you teach?
            </h1>
            <select
              className="w-full border border-[#E9EAF0] h-[35px] md:h-[42px] px-2 md:px-5 text-gray-500 appearance-none bg-no-repeat bg-right bg-[length:40px_25px] rounded-lg"
              style={{ backgroundImage: `url(${dropDown.src})` }}
            >
              <option value="Arabic">Arabic</option>
              <option value="English">English</option>
            </select>
          </div>
          <div className="w-full flex flex-col gap-3">
            <h1 className="text-[14px] font-semibold">
              How many hours per week do you tutor outside of Tafawwaq?
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-gray-500">
              {["0", "1-5", "6-10", "11-20", "21-35", "35+"].map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-2 py-1 px-2 border border-[#D0D5DD] rounded-lg"
                >
                  <input
                    type="radio"
                    name="hoursperweek"
                    value={option}
                    checked={hoursPerWeek === option}
                    onChange={handleHoursPerWeek}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col gap-3">
            <h1 className="text-[14px] font-semibold">
              Ideally, how many hours per week would you like to tutor in
              Tafawwaq?
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-gray-500">
              {["0", "1-5", "6-10", "11-20", "21-35", "35+"].map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-2 py-1 px-2 border border-[#D0D5DD] rounded-lg"
                >
                  <input
                    type="radio"
                    name="hoursperweekintafawwaq"
                    value={option}
                    checked={hoursPerWeekInTafawwaq === option}
                    onChange={handleHoursPerWeekInTafawwaq}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col gap-3">
            <h1 className="text-[14px] font-semibold">
              Can we use your profile and feedbacks in our marketing materials?
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-gray-500">
              {["Yes", "No"].map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-2 py-1 px-2 border border-[#D0D5DD] rounded-lg"
                >
                  <input
                    type="radio"
                    name="profilefeedback"
                    value={option}
                    checked={profileFeedback === option}
                    onChange={handleProfileFeedback}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div
          className="flex items-center justify-center mt-[15px] cursor-pointer"
          onClick={submitProfileInfo}
        >
          <div className="flex items-center justify-center w-60 h-12 bg-primary rounded-full transition-transform transform hover:scale-105 active:scale-95">
            <h1 className="text-white font-semibold">Continue</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
