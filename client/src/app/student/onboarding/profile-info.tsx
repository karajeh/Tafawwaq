"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import avatar from "public/images/session-oversight/avatar.svg";
import dropDown from "public/images/my-account/arrow_drop_down.svg";
import { Camera } from "lucide-react";
import { IStudent, updateProfile } from "src/api/profileService";
import { useRouter } from "next/navigation";

const ProfileInfo = () => {
  const [file, setFile] = useState(false);
  const fileInputField = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: {
    target: { files: { name: boolean | ((prevState: boolean) => boolean) }[] };
  }) => {
    setFile(e.target.files[0].name);
  };

  const handleUploadClick = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    if (fileInputField.current != null) {
      fileInputField.current.click();
    }
  };
  useEffect(() => {
    console.log(file);
  }, [file]);

  const [formData, setFormData] = useState<IStudent>({
    age: "20",
  });

  const router = useRouter();

  const onSubmit = async () => {
    await updateProfile(formData);
    router.push("/student");
  };

  return (
    <div>
      <div className="pt-[20px] md:pt-[0px] px-12 shadow-xl pb-[18px] rounded-[8px]">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-40 h-32 md:h-40 md:w-52 rounded-2xl relative">
            <div className="w-full h-full rounded-2xl overflow-hidden ">
              <Image
                src={avatar}
                alt="avatar"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center p-1 bg-primary absolute -bottom-2 -right-2">
              <input
                type="file"
                onChange={() => handleFileChange}
                ref={fileInputField}
                hidden
              ></input>
              <Camera
                className="text-white cursor-pointer"
                onClick={handleUploadClick}
              />
            </div>
          </div>
          <h1 className="font-bold">Samantha</h1>
        </div>
        <div className="mt-[24px]">
          <div className="flex w-full gap-[16px]">
            <div className="w-full">
              <h1 className="text-[14px]">
                Add your age<span className="text-red-600">*</span>
              </h1>
              <select
                className="w-full border border-[#E9EAF0] mt-[10px] h-[35px] md:h-[42px] px-2 md:px-5 text-gray-500 appearance-none bg-no-repeat bg-right bg-[length:40px_25px]"
                style={{ backgroundImage: `url(${dropDown.src})` }}
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
              >
                <option value="20">20</option>
                <option value="21">21</option>
              </select>
            </div>
            <div className="w-full">
              <h1 className="text-[14px]">Curriculum</h1>
              <select
                className="w-full border border-[#E9EAF0] mt-[10px] h-[35px] md:h-[42px] px-2 md:px-5 text-gray-500 appearance-none bg-no-repeat bg-right bg-[length:40px_25px]"
                style={{ backgroundImage: `url(${dropDown.src})` }}
                value={formData.curriculum}
                onChange={(e) =>
                  setFormData({ ...formData, curriculum: e.target.value })
                }
              >
                <option value="Samantha"></option>
                <option value="20">20</option>
                <option value="21">21</option>
              </select>
            </div>
          </div>
          <div className="flex w-full gap-[16px] mt-[16px]">
            <div className="w-full">
              <h1 className="text-[14px]">Subjects</h1>
              <select
                className="w-full border border-[#E9EAF0] mt-[10px] h-[35px] md:h-[42px] px-2 md:px-5 text-gray-500 appearance-none bg-no-repeat bg-right bg-[length:40px_25px]"
                style={{ backgroundImage: `url(${dropDown.src})` }}
                value={formData.subjects}
                onChange={(e) =>
                  setFormData({ ...formData, subjects: [e.target.value] })
                }
              >
                <option value="Design">UI/UX</option>
                <option value="Math">Math</option>
                <option value="Science">Science</option>
              </select>
            </div>
            <div className="w-full">
              <h1 className="text-[14px]">Username</h1>
              <input
                type="text"
                className="w-full border border-[#E9EAF0] mt-[10px] h-[35px] md:h-[42px] px-2 md:px-5"
                placeholder="smantawill"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex w-full gap-[16px] mt-[16px]">
            <div className="w-full">
              <h1 className="text-[14px]">School Name</h1>
              <input
                type="text"
                className="w-full border border-[#E9EAF0] mt-[10px] h-[35px] md:h-[42px] px-2 md:px-5"
                placeholder="XYZ School"
                value={formData.schoolName}
                onChange={(e) =>
                  setFormData({ ...formData, schoolName: e.target.value })
                }
              />
            </div>
            <div className="w-full">
              <div className="flex items-center gap-1">
                <h1 className="text-[14px] w-[100%]">Whatsapp Number</h1>
                <div className="p-1 w-4 h-4 rounded-full bg-[#707070] flex items-center justify-center text-white text-xs">
                  i
                </div>
              </div>
              <input
                type="number"
                className="w-full border border-[#E9EAF0] mt-[10px] h-[35px] md:h-[42px] px-2 md:px-5"
                placeholder="+92 312 4049137"
                value={formData.whatsAppPhoneNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    whatsAppPhoneNumber: e.target.value,
                  })
                }
              />
              <p className="text-gray text-xs mt-1 italic">
                To confirm your scheduled lesson details and for authentication
                purposes, we will be sending you a message via WhatsApp.
              </p>
            </div>
          </div>
          <div className="flex w-full gap-[16px] mt-[16px]">
            <div className="w-1/2">
              <div className="flex items-center gap-1">
                <h1 className="text-[14px] w-[100%]">Parent Whatsapp</h1>
                <div className="p-1 w-4 h-4 rounded-full bg-[#707070] flex items-center justify-center text-white text-xs">
                  i
                </div>
              </div>
              <input
                type="number"
                className="w-full border border-[#E9EAF0] mt-[10px] h-[35px] md:h-[42px] px-2 md:px-5"
                placeholder="+92 312 4049137"
                value={formData.parentWhatsAppPhoneNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    parentWhatsAppPhoneNumber: e.target.value,
                  })
                }
              />
              <p className="text-gray text-xs mt-1 italic">
                To confirm your scheduled lesson details and for authentication
                purposes, we will be sending you a message via WhatsApp.
              </p>
            </div>
          </div>
        </div>
        <div
          className="flex items-center justify-center mt-[15px] cursor-pointer"
          onClick={onSubmit}
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
