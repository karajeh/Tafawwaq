import React, { useEffect, useState } from "react";
import { SectionComponent } from "../page";

const ImportantRules: React.FC<SectionComponent> = ({ onChange, onCheck }) => {
  const [agree, setAgree] = useState(false);

  const handleCheckBoxClick = () => {
    setAgree(!agree);
  };

  useEffect(() => {
    if (onChange != null) {
      onChange(agree);
    }
  }, [agree, onChange]);

  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-900">Important Rules</h2>
      <ol className="list-disc list-inside text-[#666666] space-y-3 mt-4">
        <li>
          All communication with students must occur exclusively through the
          Tafawwaq platform. Exchanging personal email addresses or phone
          numbers is not permitted.
        </li>
        <li>Communication should always be professional and respectful.</li>
        <li>
          Tutors found in violation of these rules will be immediately removed
          from the marketplace.
        </li>
      </ol>

      <div className="flex items-start mt-6">
        <input
          type="checkbox"
          id="terms-agree"
          onClick={handleCheckBoxClick}
          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          onChange={(e) => onCheck?.(e.target.checked)}
        />
        <label htmlFor="terms-agree" className="ml-3 text-[#666666]">
          Checkbox I have read, understand, and agree to the terms outlined
          above.<span className="text-red-500 font-semibold">*</span>
        </label>
      </div>
    </div>
  );
};

export default ImportantRules;
