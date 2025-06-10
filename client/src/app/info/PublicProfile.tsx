/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import InputField from "../components/InputField";
import uploadIcon from "public/images/auth/upload.png";
import uploadIcon2 from "public/images/auth/upload2.png";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { IProfile } from "src/api/profileService";

import Joi from "joi";
interface PublicProfileProps {
  formData: IProfile;
  setFormData: React.Dispatch<React.SetStateAction<IProfile>>;
  onValidationChange: (isValid: boolean) => void;
}



const schema = Joi.object({
  headline: Joi.string().min(15).max(65).required(),
  bio: Joi.string().min(200).max(2048).required(),
  profileImage: Joi.any()
    .custom((value, helpers) => {
      if (!value || !(value instanceof File)) {
        return helpers.error("any.invalid");
      }
      if (value.size === 0) {
        return helpers.error("any.empty");
      }
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(value.type)) {
        return helpers.error("Only JPG/PNG images are allowed");
      }
      return value;
    })
    .required()
    .messages({
      "any.required": "Profile image is required",
      "any.invalid": "Profile image must be a valid file",
      "any.empty": "Profile image file is empty",
    }),
});

const PublicProfile: React.FC<PublicProfileProps> = ({
  onValidationChange,
  formData, setFormData
}) => {
  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");
  const [about, setAbout] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);

  useEffect(() => {
    const result = schema.validate(
      { headline, bio, profileImage },
      { abortEarly: false }
    )
    onValidationChange(!result.error);
  }, [headline, bio, profileImage, onValidationChange]);

  const handleHeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      headline: e.target.value,
    }));
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      bio: e.target.value,
    }));
  };

  const handleAboutChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      aboutYou: e.target.value,
    }));
  };

  return (
    <div className="container mx-auto p-8 ">
      <div className="max-w-4xl mx-auto">
        {/* Headline Input */}
        <label className="block text-text_primary mb-2">
          Title<span className="text-red-500 font-semibold">*</span>
        </label>
        <InputField
          className="border-light_gray"
          type="text"
          placeholder="A short title about yourself"
          id="headline"
          value={formData.headline}
          max={65}
          min={15}
          onChange={handleHeadlineChange}
        />
        <p className="text-sm text-gray-500 text-right">15/65</p>
        {/* Bio Input */}
        <div className="mb-4">
          <label className="block text-text_primary mb-2">
            Bio<span className="text-red-500 font-semibold">*</span>
          </label>
          <textarea
            value={formData.bio}
            maxLength={2048}
            minLength={200}
            onChange={handleBioChange}
            className="w-full px-3 font-medium py-2 text-sm text-header border border-light_gray rounded-md focus:outline-none focus:border-primary"
            rows={4}
            placeholder="A paragraph about yourself"
          />
          <p className="text-sm text-gray-500 text-right">200/2048</p>
        </div>
        {/* Profile Photo */}
        <div className="mb-4">
          <label className="block text-text_primary mb-2">
            Profile Photo<span className="text-red-500 font-semibold">*</span>
          </label>
          <div className="flex flex-col  items-start ">
            <div className="w-32 h-32 border border-light_gray rounded-full flex justify-center items-center">
              {profileImage ? (
                <Image
                  src={URL.createObjectURL(profileImage)}
                  alt="Profile"
                  width={100}
                  height={100}
                  className="rounded-full object-cover"
                />
              ) : (
                <Image src={uploadIcon.src} alt={""} width={50} height={50} />
              )}
            </div>
            <button
              className="px-4 py-2 mt-2 border-light_gray mb-5 light_gray text-gray rounded-md"
              style={{ borderWidth: 1 }}
              onClick={() =>
                document.getElementById("profileImageInput")?.click()
              }
            >
              Choose Image
            </button>
            <input
              type="file"
              id="profileImageInput"
              accept="image/*"
              className="hidden"
              onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
            />
          </div>
          <p className="text-sm text-[#FF3939] mt-2">
            <strong>Note: </strong>
            <span className="text-black">
              Please ensure your face is the main focus of the photo with a
              simple background and wear appropriate clothes, such as
              professional clothing
            </span>
          </p>
        </div>
        {/* About Section */}
        <div className="mb-4">
          <label className="block text-[#1A1A1A] mb-2">
            Tell Us About You and Get Certified{" "}
            <span className="text-[#848484]">(optional)</span>
          </label>
          <textarea
            value={formData.aboutYou}
            onChange={handleAboutChange}
            className="w-full px-3 py-2 border border-light_gray rounded-md focus:outline-none focus:border-primary"
            rows={4}
            placeholder="This section will be shown to students and is the first information a Tafawwaq Academic Officer will see when reviewing your application"
          />
          <p className="text-sm text-gray-500 text-right">300/1000</p>
        </div>
        {/* Profile Preview */}
        <label className="block text-[#1A1A1A] mb-2">
          Profile Preview with Verification Badge
          <span className="text-[#848484]">(optional)</span>
        </label>
        <div className="mb-4 p-4 border border-light_gray rounded-md max-w-[680px]">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Profile Image */}
            <div>
              <Image
                src="/images/find-a-tutor/hazem.png"
                alt="Profile Preview"
                className="w-36 h-36 rounded-lg object-cover"
                width={100}
                height={100}
              />
              <div className="flex items-center">
                <div className="flex text-yellow-400">
                  {/* Replace the stars with actual icons if available */}
                  <svg
                    className="w-4 h-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.431 8.207 1.193-5.938 5.784 1.402 8.167L12 18.896l-7.339 3.866 1.402-8.167-5.938-5.784 8.207-1.193z" />
                  </svg>
                  <svg
                    className="w-4 h-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.431 8.207 1.193-5.938 5.784 1.402 8.167L12 18.896l-7.339 3.866 1.402-8.167-5.938-5.784 8.207-1.193z" />
                  </svg>
                  <svg
                    className="w-4 h-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.431 8.207 1.193-5.938 5.784 1.402 8.167L12 18.896l-7.339 3.866 1.402-8.167-5.938-5.784 8.207-1.193z" />
                  </svg>
                  <svg
                    className="w-4 h-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.431 8.207 1.193-5.938 5.784 1.402 8.167L12 18.896l-7.339 3.866 1.402-8.167-5.938-5.784 8.207-1.193z" />
                  </svg>
                  <svg
                    className="w-4 h-4 fill-current text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.431 8.207 1.193-5.938 5.784 1.402 8.167L12 18.896l-7.339 3.866 1.402-8.167-5.938-5.784 8.207-1.193z" />
                  </svg>
                </div>
                <span className="text-sm text-gray ml-2 pt-2">4.5 (178)</span>
              </div>
            </div>

            {/* Profile Details */}
            <div className="flex-1 ">
              <div className="flex items-center mb-1">
                <p className="font-semibold text-text_primary mr-2">
                  Hazem Farsi
                </p>
                <span className="text-primary">
                  <BadgeCheck className="w-5 text-green-500" />
                </span>
              </div>
              <p className="text-sm text-text_secondary mb-1">English Tutor</p>
              <p className="text-sm text-gray-700 mb-2">
                Hello! I&apos;m Hazem, and I&apos;ve been teaching English for
                10 years with a focus on KSA national curriculum students
                <span className="text-primary cursor-pointer">
                  See Full Profile
                </span>
              </p>
              {/* Rating and Chat Button */}
              <div className="flex items-center justify-between">
                {/* Rating */}
                {/* Chat Now Button */}
                <button className="px-3 py-1 bg-secondary text-white rounded-md text-sm">
                  Chat Now
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Video Upload */}
        <div className="mb-6 max-w-[500px]">
          <label className="block text-[#1A1A1A] mb-2">
            Introduction Video Upload
            <span className="text-[#848484]">(optional)</span>
          </label>
          <div
            className="flex flex-col items-center justify-center align-middle border-dashed border-2 border-light_gray rounded-md p-6 pt-9 pb-9 text-center cursor-pointer hover:bg-gray-100"
            onClick={() => document.getElementById("videoUploadInput")?.click()}
          >
            <Image src={uploadIcon2.src} alt={""} width={30} height={30} />
            <p className="text-text_secondary mt-4">
              Click or drag file to this area to upload
            </p>
            <input
              type="file"
              id="videoUploadInput"
              accept="video/mp4"
              className="hidden"
              onChange={(e) => setVideo(e.target.files?.[0] || null)}
            />
          </div>
          <span
            style={{ fontSize: 14 }}
            className="font-normal text-[#9D9D9D] mt-1"
          >
            Formats accepted are mp4.
          </span>
        </div>
        <p className="text-[#FF3939] text-sm">
          Tutors with an introduction video significantly increase their chances
          of attracting students, making your profile more inviting and
          trustworthy to potential students.
        </p>
      </div>
    </div>
  );
};
export default PublicProfile;
