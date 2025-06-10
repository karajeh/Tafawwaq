"use client";

import Image from "next/image";
import React, { useState } from "react";
type Language = {
  code: string;
  name: string;
  flag: string;
};
const languages: Language[] = [
  { code: "en", name: "English (US)", flag: "https://flagcdn.com/us.svg" },
  { code: "fr", name: "French", flag: "https://flagcdn.com/fr.svg" },
  { code: "es", name: "Spanish", flag: "https://flagcdn.com/es.svg" },
  { code: "de", name: "German", flag: "https://flagcdn.com/de.svg" },
  { code: "it", name: "Italian", flag: "https://flagcdn.com/it.svg" },
];
const LessonInformation = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectLanguage = (language: Language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  return (
    <div className=" mx-auto p-6  rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lesson Information</h2>
      {/* Title Input */}
      <div className="mb-4">
        <label className="block text-sm mb-1">Title</label>
        <input
          type="text"
          placeholder="How to Make UX Case Study for Beginner"
          className="bg-[#F7F7F7] w-full border border-gray-300 rounded p-2 text-gray-800"
        />
      </div>
      {/* Description, Language, and Skill Level on the same line */}
      <div className="flex gap-4 items-end mb-6">
        {/* Description */}
        <div className="flex-1">
          <label className="block text-sm mb-1">Description</label>
          <textarea
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            rows={4}
            className="w-full border border-gray-300 rounded p-2 text-gray-800"
          ></textarea>
        </div>

        <div className="w-1/4 relative mb-2">
          <label className="block text-sm font-medium mb-1">Language</label>
          <div
            className="flex items-center border border-gray-300 rounded px-3 py-2 cursor-pointer bg-white"
            onClick={toggleDropdown}
          >
            <Image
              src={selectedLanguage.flag}
              alt="flag"
              className="w-5 h-5 mr-2"
              width={20}
              height={20}
            />
            <span className="text-gray-800 bg-[#F7F7F7]">
              {selectedLanguage.name}
            </span>
            <span className="ml-auto text-gray-500">▼</span>
          </div>

          {/* Dropdown List */}
          {isOpen && (
            <ul className="absolute w-full border border-gray-300 mt-1 bg-white rounded shadow-md z-10 max-h-48 overflow-y-auto">
              {languages.map((language) => (
                <li
                  key={language.code}
                  onClick={() => selectLanguage(language)}
                  className="bg-[#F7F7F7] flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <Image
                    src={language.flag}
                    alt="flag"
                    className="w-5 h-5"
                    width={20}
                    height={20}
                  />
                  <span>{language.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Skill Level */}
        <div className="w-1/4 mb-2">
          <label className="block text-sm mb-1">Skill Level</label>
          <select className="bg-[#F7F7F7] w-full border border-gray-300 rounded p-2 text-gray-800">
            <option>Intermediate</option>
          </select>
        </div>
      </div>

      {/* User Details */}
      <p className="font-semibold my-3 text-xl">Student Information</p>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm  mb-1">First Name</label>
          <input
            type="text"
            placeholder="Samantha"
            className="bg-[#F7F7F7] w-full border border-gray-300 rounded p-2 text-gray-800"
          />
        </div>
        <div>
          <label className="block text-sm  mb-1">Last Name</label>
          <input
            type="text"
            placeholder="William"
            className="bg-[#F7F7F7] w-full border border-gray-300 rounded p-2 text-gray-800"
          />
        </div>
        <div>
          <label className="block text-sm  mb-1">Email</label>
          <input
            type="email"
            placeholder="sam.william@mail.com"
            className="bg-[#F7F7F7] w-full border border-gray-300 rounded p-2 text-gray-800"
          />
        </div>
        <div>
          <label className="block text-sm  mb-1">Phone Number</label>
          <input
            type="text"
            placeholder="+12 345 67890"
            className="bg-[#F7F7F7] w-full border border-gray-300 rounded p-2 text-gray-800"
          />
        </div>
      </div>
      {/* Expertise and Username */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm  mb-1">Expertise</label>
          <select className="w-full border border-gray-300 rounded p-2 text-gray-800">
            <option>Design</option>
            <option>UI/UX Design</option>
          </select>
        </div>
        <div>
          <label className="block text-sm  mb-1">Username</label>
          <input
            type="text"
            placeholder="samanthawill"
            className="bg-[#F7F7F7] w-full border border-gray-300 rounded p-2 text-gray-800"
          />
        </div>
      </div>
      {/* Price and Category */}
      <p className="font-semibold my-3  text-xl">Other Information</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm  mb-1">Price</label>
          <input
            type="text"
            placeholder="$ 159"
            className="bg-[#F7F7F7] w-full border border-gray-300 rounded p-2 text-gray-800"
          />
        </div>
        <div>
          <label className="block text-sm  mb-1">Category</label>
          <select className="bg-[#F7F7F7] w-full border border-gray-300 rounded p-2 text-gray-800">
            <option>Design</option>
          </select>
        </div>
      </div>
      <style jsx>{`
        button {
          transition: transform 0.2s ease, background-color 0.2s ease;
        }
        button:hover {
          transform: scale(1.05);
          background-color: #f0f0f0;
        }
        button:active {
          transform: scale(0.95);
        }
      `}</style>
    </div>
  );
};

export default LessonInformation;
