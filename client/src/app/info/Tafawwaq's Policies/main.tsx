'use client';

import React, { useState } from "react";
import ImportantRules from "./ImportantRules";
// import { onChange } from "node_modules/react-toastify/dist/core/store";

// Define the structure of each section with a component
interface Section {
  heading: string;
  Component?: React.FC; // Accepts a React component
}

// Define the props for the Policies component
interface PoliciesProps {
  sections: Section[];
  setCurrentStep: (step: number) => void;
}

const Policies: React.FC<PoliciesProps> = ({
  setCurrentStep,
  sections = [],
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  const handleChange = (agree: boolean) => {
    setIsNextEnabled(agree);
  };

  // Get the active component from the sections array
  const ActiveComponent = sections[activeTab]?.Component as React.FC<{
    onCheck?: (checked: boolean) => void;
  }>;

  const renderActiveComponent = () => {
    if (sections[activeTab]?.heading === 'Important Rules') {
      return <ImportantRules onChange={handleChange} />;
    } else {
      return ActiveComponent && <ActiveComponent />;
    }
  }

  const handleNextClick = () => {
    if (!isNextEnabled && activeTab === sections.length - 1) {
      return;
    }
    return activeTab + 1 == sections.length
      ? setCurrentStep(2)
      : setActiveTab(activeTab + 1);
  };

  return (
    <div>
      {/* Tabs for the current step */}
      <div className="border-b border-light_gray dark:border-gray-700 mt-6">
        <ul className="hidden md:flex justify-center gap-24 flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          {sections.map((section, idx) => (
            <li key={idx} className="mr-2">
              <button
                onClick={() => setActiveTab(idx)}
                className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg ${
                  activeTab === idx
                    ? 'text-primary border-primary'
                    : 'text-zinc-400	 border-transparent hover:text-gray-600 hover:border-gray-300'
                }`}
              >
                {section.heading}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Tab Content */}
      <div className="mt-10 w-full p-6">
        {sections.length > 0 && ActiveComponent !== undefined ? (
          <div className="min-h-80 flex flex-col items-start justify-between">
            <div>
              {/* Render the active component */}
              {renderActiveComponent()}
            </div>
            <div className="flex items-center w-full justify-end">
              <button
                onClick={handleNextClick}
                className={`mt-8 px-10 py-2 text-white bg-primary hover:opacity-80 rounded`}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">No content available</p>
        )}
      </div>
    </div>
  );
};

export default Policies;
