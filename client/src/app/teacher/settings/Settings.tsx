"use client";

import React, { useState } from "react";
import dropDown from "public/images/my-account/arrow_drop_down.svg";
import primary from "public/images/my-account/primary.svg";

const Settings = () => {
  const [showModal, setShowModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const handleSetup2FA = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setVerificationCode("");
  };

  const handleVerifyCode = () => {
    // Here you would implement the code verification logic
    console.log("Verifying code:", verificationCode);
    // After verification is successful:
    setShowModal(false);
    setVerificationCode("");
  };

  return (
    <div className="shadow-xl px-[16px] pb-[24px] rounded-[8px] pt-[20px] md:pt-[0px]">
      <div className="mt-[10px] p-[16px] shadow-xl rounded-[8px]">
        <h1 className="text-[14px]">Default Language</h1>
        <div className="mt-[5px] flex gap-[6px]">
          <select
            className="w-full mt-[10px] h-[35px] md:h-[42px] px-2 md:px-5 text-gray-500 appearance-none bg-no-repeat bg-right bg-[length:40px_30px] md:bg-[length:75px_45px]"
            style={{
              backgroundImage: `url(${primary.src})`,
              backgroundPosition: "right 15px center",
              border: "1px solid #e7e9ec",
            }}
          >
            <option value="english">English</option>
            <option value="arabic">Arabic</option>
            <option value="french">French</option>
            <option value="spanish">Spanish</option>
            <option value="german">German</option>
            <option value="chinese">Chinese</option>
          </select>
        </div>
      </div>
      <div className="mt-[10px] p-[16px] shadow-xl rounded-[8px]">
        <h1 className="text-[14px]">Preffered Currency</h1>
        <div className="mt-[5px] flex gap-[6px]">
          <select
            className="w-full border mt-[10px] h-[35px] md:h-[42px] px-2 md:px-5 text-gray-500 appearance-none bg-no-repeat bg-right bg-[length:40px_25px]"
            style={{
              backgroundImage: `url(${dropDown.src})`,
              border: "1px solid #e7e9ec",
            }}
          >
            <option value="primary">USD</option>
            <option value="primary">AED</option>
          </select>
        </div>
      </div>
      <div className="mt-[10px] p-[16px] shadow-xl rounded-[8px]">
        <h1 className="text-[14px]">Two-Factor Authentication</h1>
        <p className="text-gray-500 text-sm mt-2">
          Enhance your account security by enabling two-factor authentication
          via email.
        </p>
        <div className="flex items-center justify-end mt-4">
          <button
            onClick={handleSetup2FA}
            className="bg-[#FF6636] flex items-center justify-center w-auto px-6 h-[40px] md:h-[50px] rounded-[7px] transition-all hover:bg-[#e05a30] focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:ring-opacity-50"
          >
            <span className="text-white font-semibold">Set Up 2FA</span>
          </button>
        </div>
      </div>

      {/* 2FA Verification Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Email Verification
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            <p className="text-gray-600 mb-4">
              We&apos;ve sent a verification code to your email. Please enter it
              below to complete the 2FA setup.
            </p>

            <div className="mb-4">
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter verification code"
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent"
                maxLength={6}
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleVerifyCode}
                className="px-4 py-2 bg-[#FF6636] text-white rounded-md hover:bg-[#e05a30] focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:ring-opacity-50 transition-colors"
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
