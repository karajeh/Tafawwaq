"use client";

import React, { useState } from "react";
import { X, Flag } from "lucide-react";

const AddNotesModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [note, setNote] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Note added:", note);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-10 backdrop-blur bg-[#344054B2] bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
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
        <h2 className="text-xl font-medium">Add Notes</h2>

        <p className="text-sm text-gray-600 mb-4">
          Please enter notes for this student
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <textarea
              className="w-full p-2 border rounded-md h-32 resize-none"
              placeholder="Note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="w-28 h-10 border border-[#42ABD1] text-[#42ABD1] rounded transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-28 h-10 bg-[#42ABD1] text-white rounded transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNotesModal;
