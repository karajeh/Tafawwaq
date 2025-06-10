// src/components/UnsavedChangesModal.tsx
import React from "react";

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

const UnsavedChangesModal: React.FC<Props> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4">Unsaved Changes</h2>
        <p className="mb-4">You have unsaved changes. Do you really want to leave?</p>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-blue-600 text-white rounded">Leave</button>
        </div>
      </div>
    </div>
  );
};

export default UnsavedChangesModal;
