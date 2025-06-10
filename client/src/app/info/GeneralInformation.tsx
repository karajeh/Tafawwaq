"use client";
import React, { useEffect, useState } from "react";
// import InputField from "../components/InputField";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Importing styles for react-phone-input-2
import Dropdown from "./DropDown";
import countries from "../../lib/countries.json";
import Image from "next/image";
import uploadIcon2 from "public/images/auth/upload2.png";
import edit from "public/images/info/edit.svg";
// import { useRouter } from "next/navigation";
import InputField from "../components/InputField";
import Link from "next/link";
import { IProfile } from "src/api/profileService";


import Joi from "joi";

const generalInfoSchema = Joi.object({
  username: Joi.string().required().label("Username"),
  country: Joi.string().required().label("Country"),
  gender: Joi.string().required().label("Gender"),
  month: Joi.string().required().label("Month"),
  day: Joi.string().required().label("Day"),
  year: Joi.string().required().label("Year"),
  whatsapp: Joi.string().required().label("WhatsApp Number"),
});

interface FormData {
  username: string;
  country: string;
  gender: string;
  month: string;
  day: string;
  year: string;
  whatsapp: string;
  // tutor: boolean | null;
}

interface GeneralInformationProps {
  onValidationChange: (isValid: boolean) => void;
  formData: IProfile;
  setFormData: React.Dispatch<React.SetStateAction<IProfile>>;
}

const GeneralInformation: React.FC<GeneralInformationProps> = ({
  onValidationChange,
  formData,
  setFormData,
}) => {
  // const router = useRouter();



  // const linkURL =
  //   "https://publicservices.mohre.gov.ae/UserNotifications/MohrePrivateTeacherWorkPermit";

  // State to manage the license holder
  // const [haveLicense, setHaveLicense] = useState("yes");

  // State to mange the username editable state
  const [userEdit, setUserEdit] = useState(false);

  // State to manage open dropdowns
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  // const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    const { error } = generalInfoSchema.validate(formData, {
      abortEarly: false,
    });
    onValidationChange(!error);
  }, [formData]);
  // Handle Phone Input change separately
  const handleWhatsAppChange = (value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      whatsAppPhoneNumber: value,
    }));
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { value, id } = e.target;

    // if (type === "radio") {
    //   setFormData((prevState) => ({
    //     ...prevState,
    //     tutor: value === "yes", // set tutor to boolean (true or false)
    //   }));
    // } else {
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    // }
  };

  // Toggle dropdown open/close state
  const handleToggle = (dropdownName: string) => {
    if (openDropdown === dropdownName) {
      setOpenDropdown(null); // Close if the same dropdown is clicked again
    } else {
      setOpenDropdown(dropdownName); // Open the clicked dropdown
    }
  };

  // URL click to redirect
  // const handleLinkClick = () => {
  //   router.push(linkURL);
  // };

  // Enable username typing
  const handleEditClick = () => {
    setUserEdit(true);
  };

  return (
    <>
      <form
        className="container mx-auto max-w-4xl p-6"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Username */}
        {userEdit && (
          <InputField
            disabled
            className="border-gray"
            label="Username"
            type="text"
            id="username"
            placeholder="John Smith"
            value={formData.username}
            required={true}
            // value="John Smith"
            onChange={handleChange}
          />
        )}
        {!userEdit && (
          <div>
            <p className="text-sm mb-1">
              Username<span className="text-red-500 font-semibold">*</span>
            </p>
            <div className="w-full px-3 py-3 border border-gray rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-black  placeholder-gray-600  flex justify-between mb-3">
              <p>John Smith</p>
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

        {/* Country Dropdown */}
        <div className="mb-6">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700 pb-2"
          >
            Country<span className="text-red-500 font-semibold">*</span>
          </label>
          <Dropdown
            hideCheckBox={true}
            placeHolderLabel="Select Country"
            options={countries}
            selectedOptions={formData.country ? [formData.country] : []}
            isOpen={openDropdown === "country"}
            onToggle={() => handleToggle("country")}
            onSelectionChange={(selected) =>
              setFormData((prev) => ({ ...prev, country: selected[0] }))
            }
          />
        </div>

        {/* Gender Dropdown */}
        <div className="mb-6">
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700 pb-2"
          >
            Gender<span className="text-red-500 font-semibold">*</span>
          </label>
          <Dropdown
            hideSearch={true}
            hideCheckBox={true}
            placeHolderLabel="Select Gender"
            options={["Male", "Female"]}
            selectedOptions={formData.gender ? [formData.gender] : []}
            isOpen={openDropdown === "gender"}
            onToggle={() => handleToggle("gender")}
            onSelectionChange={(selected) =>
              setFormData((prev: IProfile) => ({
                ...prev,
                gender: selected[0] as "Male" | "Female" | "Other" | undefined,
              }))
            }
          />
        </div>

        {/* Date of Birth (Month, Day, Year) */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date of Birth<span className="text-red-500 font-semibold">*</span>
        </label>
        <div className="flex space-x-4 mb-4">
          {/* Month */}
          <div className="w-full">
            <Dropdown
              hideSearch={true}
              hideCheckBox={true}
              placeHolderLabel="Month"
              options={[
                "01 - January",
                "02 - February",
                "03 - March",
                "04 - April",
                "05 - May",
                "06 - June",
                "07 - July",
                "08 - August",
                "09 - September",
                "10 - October",
                "11 - November",
                "12 - December",
              ]}
              selectedOptions={
                formData.birthDate
                  ? [String(formData.birthDate.getMonth() + 1).padStart(2, "0")]
                  : []
              }
              isOpen={openDropdown === "month"}
              onToggle={() => handleToggle("month")}
              onSelectionChange={(selected) => {
                const selectedValue = selected[0];
                const monthString = selectedValue.split(" - ")[0];
                const monthIndex = Number(monthString) - 1;
                setFormData((prev) => {
                  const year = prev.birthDate?.getFullYear() ?? 2000;
                  const day = prev.birthDate?.getDate() ?? 1;

                  return {
                    ...prev,
                    birthDate: new Date(year, monthIndex, day),
                  };
                });
              }}
            />
          </div>

          {/* Day */}
          <div className="w-full">
            <Dropdown
              hideSearch={true}
              hideCheckBox={true}
              placeHolderLabel="Date"
              options={[...Array(31)].map((_, i) =>
                String(i + 1).padStart(2, "0"),
              )}
              selectedOptions={
                formData.birthDate
                  ? [String(formData.birthDate.getDate()).padStart(2, "0")]
                  : []
              }
              isOpen={openDropdown === "day"}
              onToggle={() => handleToggle("day")}
              onSelectionChange={(selected) => {
                const selectedDay = Number(selected[0]);

                setFormData((prev) => {
                  const year = prev.birthDate?.getFullYear() ?? 2000;
                  const month = prev.birthDate?.getMonth() ?? 0;

                  return {
                    ...prev,
                    birthDate: new Date(year, month, selectedDay),
                  };
                });
              }}
            />
          </div>

          {/* Year */}
          <div className="w-full">
            <Dropdown
              hideSearch={true}
              hideCheckBox={true}
              placeHolderLabel="Year"
              options={[...Array(101)].map((_, i) =>
                String(new Date().getFullYear() - i),
              )}
              selectedOptions={
                formData.birthDate
                  ? [String(formData.birthDate.getFullYear())]
                  : []
              }
              isOpen={openDropdown === "year"}
              onToggle={() => handleToggle("year")}
              onSelectionChange={(selected) => {
                const selectedYear = Number(selected[0]);

                setFormData((prev) => {
                  const month = prev.birthDate?.getMonth() ?? 0;
                  const day = prev.birthDate?.getDate() ?? 1;

                  return {
                    ...prev,
                    birthDate: new Date(selectedYear, month, day),
                  };
                });
              }}
            />
          </div>
        </div>

        {/* WhatsApp Number with Country Code */}
        <div className="mb-1 w-full">
          <label
            className="block text-sm font-medium text-gray-700 mb-3"
            htmlFor="whatsapp"
          >
            WhatsApp Number<span className="text-red-500 font-semibold">*</span>
          </label>
          <div className="w-full">
            <PhoneInput
              country={"ae"}
              value={formData.whatsAppPhoneNumber}
              onChange={handleWhatsAppChange}
              dropdownClass="bg-white"
              containerClass="w-full"
              inputStyle={{
                width: "100%",
                backgroundColor: "white",
                paddingTop: "22px",
                paddingBottom: "22px",
                borderRadius: "8px",
                borderColor: "#42abd1",
              }}
              buttonStyle={{
                backgroundColor: "white",
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
                borderRightWidth: 0,
                borderColor: "#42abd1",
              }}
            />
          </div>
        </div>
        <p className="text-[#666666] text-xs">
          To confirm your scheduled lesson details, for authentication purposes,
          and to provide important updates, we will be reaching out to you via
          WhatsApp.
        </p>

        <div className="mt-10">
          <h3 className="heading  mb-2 text-gray">
            Upload your MOHRE issued private tutoring permit here
          </h3>
          <h3 className="text-sm mb-2 text-gray">
            You can apply for a private tutoring permit through this{" "}
            <Link
              href="https://publicservices.mohre.gov.ae/UserNotifications/MohrePrivateTeacherWorkPermit"
              className="text-blue-500 underline"
              target="_blank"
            >
              link
            </Link>
            .
          </h3>
          {/* <div className="flex gap-2">
            <input
              className="accent-gray"
              type="radio"
              name="license"
              value="yes"
              defaultChecked
              onChange={(e) => setHaveLicense(e.target.value)}
            />
            <label className="text-gray">Yes</label>
            <input
              className="ml-8 accent-gray text-gray"
              type="radio"
              name="license"
              value="no"
              onChange={(e) => setHaveLicense(e.target.value)}
            />
            <label className="text-gray">No</label>
          </div> */}

          <div className="w-full max-w-md mt-3">
            <label
              htmlFor="certificates"
              className="block text-sm font-medium text-[#1A1A1A]  mb-2"
            ></label>
            <div className="mb-6 max-w-[500px] flex justify-center flex-col">
              <div
                className="flex flex-col items-center justify-center align-middle border-dashed border-2 border-[#D5D5D5] rounded-md p-6 pt-9 pb-9 text-center cursor-pointer hover:bg-gray-100"
                onClick={() =>
                  document.getElementById("videoUploadInput")?.click()
                }
              >
                <Image src={uploadIcon2.src} alt={""} width={20} height={20} />
                <p className="text-[#484848] mt-4">
                  Click or drag file to this area to upload
                </p>
                <input
                  type="file"
                  id="videoUploadInput"
                  accept="video/mp4"
                  className="hidden"
                />
              </div>
              <span
                style={{ fontSize: 14 }}
                className="font-normal text-[#9D9D9D] mt-1"
              >
                Formats accepted are pdf, .csv and .xlsx
              </span>
            </div>
          </div>

          {/* {haveLicense === "no" && (
            <div className="mt-3">
              <p className="text-gray text-sm leading-6">
                A permit is necessary, please apply for a permit use the link.
              </p>
              <span
                className="text-blue-400 text-sm text-l leading-6 cursor-pointer"
                // onClick={handleLinkClick}
              >
                CLick here to apply
              </span>

              <Image src={uploadIcon2.src} alt={""} width={20} height={20} />
              <p className="text-[#484848] mt-4">
                Click or drag file to this area to upload
              </p>
              <input
                type="file"
                id="videoUploadInput"
                accept="video/mp4"
                className="hidden"
              />
              <span
                style={{ fontSize: 14 }}
                className="font-normal text-[#9D9D9D] mt-1"
              >
                Formats accepted are pdf, .csv and .xlsx
              </span>
            </div>
          )} */}
        </div>
      </form>
    </>
  );
};

export default GeneralInformation;
