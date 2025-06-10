"use client";

import React, { useState } from "react";
import { X, Flag } from "lucide-react";

const CreateProgressReportModal: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [strengths, setStrengths] = useState("");
  const [improvements, setImprovements] = useState("");
  const [goals, setGoals] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Progress report created:", { strengths, improvements, goals });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-10 backdrop-blur bg-[#344054B2] bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[480px] shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center justify-center border border-[#EAECF0] size-10 rounded-lg">
            <Flag className="text-gray-500" size={20} />
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        <h2 className="text-xl font-medium mb-2">Create progress reports</h2>
        <p className="text-sm text-gray-600 mb-4">
          Please enter data below for generating progress reports
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Strengths
            </label>
            <textarea
              className="w-full p-2 border rounded-md h-24 resize-none"
              placeholder="Note..."
              value={strengths}
              onChange={(e) => setStrengths(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Areas of Improvements
            </label>
            <textarea
              className="w-full p-2 border rounded-md h-24 resize-none"
              placeholder="Note..."
              value={improvements}
              onChange={(e) => setImprovements(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Goals
            </label>
            <textarea
              className="w-full p-2 border rounded-md h-24 resize-none"
              placeholder="Note..."
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="w-36 h-10 border border-[#42ABD1] text-[#42ABD1] rounded transition-colors"
            >
              Share Report
            </button>
            <button
              type="submit"
              className="w-28 h-10 bg-[#42ABD1] text-white rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProgressReportModal;
