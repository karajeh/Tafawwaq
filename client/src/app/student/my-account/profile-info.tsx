"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
// import avatar from "public/images/session-oversight/avatar.svg";
import download from "public/images/my-account/upload.svg";
// import dropDown from "public/images/my-account/arrow_drop_down.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
import axiosInstance from "src/api/axiosInstance";
import apiRoutes from "src/api/apiRoutes";
import edit from "public/images/info/edit.svg";

const ProfileInfo = () => {
  const [name, setName] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("John Smith");
  const [country, setCountry] = useState("");
  // const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [whatsAppPhoneNumber, setWhatsappNumber] = useState("");
  const [parentWhatsAppPhoneNumber, setParentWhatsapp] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("English");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  // State to mange the username editable state
  const [userEdit, setUserEdit] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a URL for the uploaded image
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl); // No TypeScript error now
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("sessionToken");
      if (!token) {
        // toast.error("Session token is missing. Please log in again.");
        return;
      }

      try {
        const response = await axiosInstance.get(apiRoutes.getUserProfile, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          const userData = response.data;
          console.log(userData);
          setName(userData.name || "");
          setRole(userData.role || "");
          setLname(userData.student.lname || "");
          setEmail(userData.email || "");
          setCountry(userData.student.country || "");
          // setCity(userData.student.city || "");
          setGender(userData.student.gender || "");
          if (userData.student.birthDate) {
            const formattedDate = new Date(userData.student.birthDate)
              .toISOString()
              .split("T")[0];
            setBirthDate(formattedDate);
          }
          setWhatsappNumber(userData.student.whatsAppPhoneNumber || "");
          setParentWhatsapp(userData.student.parentWhatsAppPhoneNumber || "");
          setSchoolName(userData.student.schoolName || "");
          setPreferredLanguage(userData.student.preferredLanguage || "english");
          setAvatar(userData.avatar || null);
        } else {
          toast.error("Failed to fetch profile. Please try again.");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while fetching the profile.");
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("sessionToken");

      if (!token) {
        toast.error("Session token is missing. Please log in again.");
        return;
      }

      const response = await axiosInstance.put(
        apiRoutes.updateUserProfile,
        {
          name,
          lname,
          country,
          // city,
          gender,
          birthDate,
          whatsAppPhoneNumber,
          parentWhatsAppPhoneNumber,
          schoolName,
          preferredLanguage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Received data:", response);

      if (response.status === 200) {
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleEditClick = () => {
    setUserEdit(true);
  };

  return (
    <div>
      <ToastContainer />
      <div className="pt-[20px] md:pt-[0px] px-[18px] shadow-xl pb-[18px] rounded-[8px]">
        <div className="flex gap-[12px]">
          <div className="flex flex-col items-center">
            {/* Avatar Upload Section */}
            <label
              htmlFor="avatar-upload"
              className="cursor-pointer w-[80px] h-[80px] rounded-full overflow-hidden border-2 border-gray-300 flex items-center justify-center"
            >
              {/* Display the uploaded image or a default placeholder */}
              <div className="w-full h-full flex items-center justify-center">
                {avatar ? (
                  <Image
                    src={avatar}
                    alt="avatar"
                    className="w-[80px] h-[80px] object-cover"
                  />
                ) : (
                  <span className="text-gray-500">Upload</span> // Default text
                )}
              </div>
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
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
            <div className="w-full mb-[13px]">
              {userEdit && (
                <div>
                  <h1 className="text-[14px] text-sm">Username</h1>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border mt-[10px] h-[35px] md:h-[42px] px-2 md:px-5 mb-3 pl-2"
                    style={{ borderColor: "#D1D5DB" }}
                    placeholder="Alex"
                    autoFocus
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
                    <p className="text-base pl-1">John Smith</p>
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
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-[#E9EAF0] mt-[10px] h-[35px] md:h-[42px] px-2 md:px-5"
                placeholder="Alex"
              />
            </div>
            <div className="w-full">
              <h1 className="text-[14px]">Last Name</h1>
              <input
                type="text"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                className="w-full border border-[#E9EAF0] mt-[10px] h-[35px] md:h-[42px] px-2 md:px-5"
                placeholder="Alex"
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
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-[#E9EAF0] mt-[10px] h-[35px] md:h-[42px] px-2 md:px-5"
                placeholder="example@example.com"
              />
            </div>
            <div className="w-full">
              <h1 className="text-[14px]">Country</h1>
              <input
                type="text"
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full border border-[#E9EAF0] mt-[10px] h-[35px] md:h-[42px] px-2 md:px-5"
                placeholder="USA"
              />
            </div>
          </div>

          <div className="flex w-full gap-[16px] mt-[16px]">
            {/* <div className="w-full">
              <h1 className="text-[14px]">City</h1>
              <input
                type="text"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border border-[#E9EAF0] mt-[10px] h-[35px] md:h-[42px] px-2 md:px-5"
                placeholder="New York"
              />
            </div> */}
            <div className="w-full">
              <h1 className="text-[14px]">Gender</h1>
              <select
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full border border-[#E9EAF0] mt-[10px] h-[35px] md:h-[42px] px-2 md:px-5"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
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
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full border border-[#E9EAF0] mt-[10px] h-[35px] md:h-[42px] px-2 md:px-5"
              />
            </div>
            <div className="w-full">
              <h1 className="text-[14px]">Whatsapp Number</h1>
              <input
                type="number"
                name="whatsappNumber"
                value={whatsAppPhoneNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full border border-[#E9EAF0] mt-[10px] h-[35px] md:h-[42px] px-2 md:px-5"
                placeholder="+1234567890"
              />
            </div>
          </div>

          <div className="flex w-full gap-[16px] mt-[16px]">
            <div className="w-full">
              <h1 className="text-[14px]">Parent&apos;s Whatsapp Number</h1>
              <input
                type="number"
                name="parentWhatsapp"
                value={parentWhatsAppPhoneNumber}
                onChange={(e) => setParentWhatsapp(e.target.value)}
                className="w-full border border-[#E9EAF0] mt-[10px] h-[35px] md:h-[42px] px-2 md:px-5"
                placeholder="+1234567890"
              />
            </div>
            <div className="w-full">
              <h1 className="text-[14px]">School Name</h1>
              <input
                type="text"
                name="schoolName"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full border border-[#E9EAF0] mt-[10px] h-[35px] md:h-[42px] px-2 md:px-5"
                placeholder="School ABC"
              />
            </div>
          </div>

          <div className="flex w-full gap-[16px] mt-[16px]">
            <div className="w-full">
              <h1 className="text-[14px]">Preferred Language</h1>
              <select
                name="preferredLanguage"
                value={preferredLanguage}
                onChange={(e) => setPreferredLanguage(e.target.value)}
                className="w-full border border-[#E9EAF0] mt-[10px] h-[35px] md:h-[42px] px-2 md:px-5"
              >
                <option value="english">English</option>
                <option value="french">French</option>
                <option value="spanish">Spanish</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-[24px]">
            <button
              onClick={handleSave}
              className="bg-[#FF6636] text-white px-6 py-2 rounded-[5px] text-[14px] transition-transform transform hover:scale-105 active:scale-95"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
