"use client";
import React from "react";

const ForgotPasswordModal = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <div className="fixed top-0 right-0 w-full h-screen bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-60 backdrop-blur-md"
        onClick={handleClose}
      ></div>
      <div className="bg-white w-full relative max-w-[485px] mx-auto shadow-xl rounded-lg p-6">
        <h3 className="text-[24px] font-bold">Forget Your Passowrd?</h3>
        <p className="text-[14px] mt-5">We&apos;ll email you a link to reset your password.</p>
        <input type="email" placeholder="Email" id="email" className="block w-full py-2 px-5 rounded-full border border-gray mt-12" />
        <button className="block w-full rounded-full py-2 bg-black text-white mt-8">Send me a password reset link</button>
        <button className="block w-full rounded-full py-2 bg-zinc-300 text-black mt-5" onClick={handleClose}>Cancel</button>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
