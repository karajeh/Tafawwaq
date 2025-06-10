"use client";

import Dropdown from "./DropDown";
import { useEffect, useState } from "react";
import uploadIcon2 from "public/images/auth/upload2.png";
import Image from "next/image";
import universities from "../../lib/universities.json";
import majors from "../../lib/majors.json";
import { IProfile } from "src/api/profileService";

interface EducationalBackgroundProps {
  setFormData: React.Dispatch<React.SetStateAction<IProfile>>;
  onValidationChange: (isValid: boolean) => void;
}

const EducationalBackground: React.FC<EducationalBackgroundProps> = ({
  setFormData,
  onValidationChange,

}) => {
  // State to manage open dropdowns
  const [selectedDegree, setSelectedDegree] = useState<string[]>([]);
  const [selectedMajor, setSelectedMajor] = useState<string[]>([]);
  const [selectUniversity, setSelectUniversity] = useState<string[]>([]);
  const [cvFile, setCvFile] = useState<File | null>(null);

  useEffect(() => {
    if (
      selectedDegree.length > 0 &&
      selectedMajor.length > 0 &&
      selectUniversity.length > 0 &&
      cvFile !== null
    ) {
      onValidationChange(true);
    } else {
      onValidationChange(false);
    }
  }, [selectedDegree, selectedMajor, selectUniversity, cvFile]);

  // Degree selection
  const handleDegreeChange = (selected: string[]) => {
    setSelectedDegree(selected);
    setFormData((prev) => ({
      ...prev,
      educationalBackground: {
        ...prev.educationalBackground,
        highestDegree: selected[0],
      },
    }));
  };

  // Major selection
  const handleMajorChange = (selected: string[]) => {
    setSelectedMajor(selected);
    setFormData((prev) => ({
      ...prev,
      educationalBackground: {
        ...prev.educationalBackground,
        major: selected[0],
      },
    }));
  };

  // University name selection
  const handleUniversityChange = (selected: string[]) => {
    setSelectUniversity(selected);
    setFormData((prev) => ({
      ...prev,
      educationalBackground: {
        ...prev.educationalBackground,
        universityName: selected[0],
      },
    }));
  };
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  // const degreeOptions = [
  //   "High School Diploma",
  //   "Associate Degree",
  //   "Bachelor's Degree",
  //   "Master's Degree",
  //   "Ph.D.",
  // ];

  // Function to toggle dropdowns
  const handleToggle = (dropdownName: string) => {
    if (openDropdown === dropdownName) {
      setOpenDropdown(null); // Close the dropdown if the same one is clicked
    } else {
      setOpenDropdown(dropdownName); // Open the clicked dropdown
    }
  };
  return (
    <form className="w-full max-w-4xl	 mx-auto p-6  rounded-xl">
      {/* Required: Highest Degree Attained (Dropdown) */}
      <div className="mb-4">
        <label
          htmlFor="highestDegreeAttained"
          className="block text-sm font-medium text-[#1A1A1A] pb-2"
        >
          Highest Degree Attained
          <span className="text-red-500 font-semibold">*</span>
        </label>
        <Dropdown
          hideCheckBox={true}
          placeHolderLabel="Select Degree"
          options={[
            "High School Diploma",
            "Associate Degree",
            "Bachelor's Degree",
            "Master's Degree",
            "Doctorate (Ph.D.)",
            "Professional Degree (MD, JD, etc.)",
            "Other",
          ]}
          isOpen={openDropdown === "degree"}
          onToggle={() => handleToggle("degree")}
          selectedOptions={selectedDegree}
          onSelectionChange={handleDegreeChange}
        />
      </div>

      {/* Required: Major (Dropdown) */}
      <div className="mb-4">
        <label
          htmlFor="major"
          className="block text-sm font-medium text-[#1A1A1A] mb-2"
        >
          Major<span className="text-red-500 font-semibold">*</span>
        </label>
        <Dropdown
          hideCheckBox={true}
          placeHolderLabel="Select Major"
          options={majors}
          isOpen={openDropdown === "major"}
          onToggle={() => handleToggle("major")}
          selectedOptions={selectedMajor}
          onSelectionChange={handleMajorChange}
        />
      </div>

      {/* Required: University Name */}
      <div className="mb-4">
        <label
          htmlFor="university"
          className="block text-sm font-medium text-[#1A1A1A] mb-2"
        >
          University Name
        </label>
        <Dropdown
          hideCheckBox={true}
          placeHolderLabel="Select your university name"
          options={universities}
          isOpen={openDropdown === "university"}
          onToggle={() => handleToggle("university")}
          selectedOptions={selectUniversity}
          onSelectionChange={handleUniversityChange}
        />
      </div>

      {/* Optional: Highest Degree Attend (Dropdown) */}
      {/* <div className="mb-4">
        <label
          htmlFor="highestDegreeOptional"
          className="block text-sm font-medium text-[#1A1A1A] mb-2"
        >
          Highest Degree Attained
          <span className="text-red-500 font-semibold">*</span>
        </label>
        <Dropdown
          hideSearch={true}
          hideCheckBox={true}
          placeHolderLabel="Select Degree"
          // options={degreeOptions}
          isOpen={openDropdown === "highestDegree"}
          onToggle={() => handleToggle("highestDegree")}
          selectedOptions={selectedDegree}
          onSelectionChange={handleDegreeChange}
        />
      </div> */}

      {/* Optional: Major (Dropdown) */}
      {/* <div className="mb-4">
        <label
          htmlFor="majorOptional"
          className="block text-sm font-medium text-[#1A1A1A] mb-2"
        >
          Major<span className="text-red-500 font-semibold">*</span>
        </label>
        <Dropdown
          hideSearch={true}
          hideCheckBox={true}
          placeHolderLabel="Select Major"
          options={majors}
          isOpen={openDropdown === "major2"}
          onToggle={() => handleToggle("major2")}
          selectedOptions={selectedMajor}
          onSelectionChange={handleMajorChange}
        />
      </div> */}

      {/* Optional: University Name */}
      {/* <InputField
        label={
          <>
            University Name <span className="text-[#848484]">(Optional)</span>
          </>
        }
        type="text"
        id="universityNameOptional"
        placeholder="Enter your university name (optional)"
      /> */}

      {/* Optional: Certificate (File Manager) */}
      <div className="w-full max-w-md mt-3">
        <label
          htmlFor="cv"
          className="block text-sm font-medium text-[#1A1A1A]  mb-2"
        >
          Add your CV<span className="text-red-500 font-semibold">*</span>
        </label>
        <div className="mb-6 max-w-[500px]">
          <div
            className="flex flex-col items-center justify-center align-middle border-dashed border-2 border-[#D5D5D5] rounded-md p-6 pt-9 pb-9 text-center cursor-pointer hover:bg-gray-100"
            onClick={() => document.getElementById("videoUploadInput")?.click()}
          >
            <Image src={uploadIcon2.src} alt={""} width={20} height={20} />
            <p className="text-[#484848] mt-4">
              Click or drag file to this area to upload
            </p>
            <input
              type="file"
              id="videoUploadInput"
              accept="application/pdf, image/*, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setCvFile(e.target.files[0]);
                }
              }}
            />
          </div>
          <span
            style={{ fontSize: 14 }}
            className="font-normal text-[#9D9D9D] mt-1"
          >
            Formats accepted are pdf, images, and Word documents
          </span>
        </div>
      </div>
    </form>
  );
};

export default EducationalBackground;
