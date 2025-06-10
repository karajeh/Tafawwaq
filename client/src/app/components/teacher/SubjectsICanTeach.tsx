import React, { useState } from "react";
import { curriculumOptions, levelOptions, subjectOptions } from "src/subjects";
import DropDownCurriculum from "./DropDownCurriculum";
import DropdownLevel from "./DropdownLevel";
import DropDownSubject from "./DropDownSubject";

interface Props {
  selectedCurriculums: string[];
  selectedLevels: string[];
  selectedSubjects: string[];
  setSelectedCurriculums: (curriculums: string[]) => void;
  setSelectedLevels: (levels: string[]) => void;
  setSelectedSubjects: (subjects: string[]) => void;
}

const SubjectsICanTeach: React.FC<Props> = ({
  selectedCurriculums,
  selectedLevels,
  selectedSubjects,
  setSelectedCurriculums,
  setSelectedLevels,
  setSelectedSubjects,
}) => {
  const [isLevelVisible, setIsLevelVisible] = useState(false);
  const [isSubjectVisible, setIsSubjectVisible] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleSubjectChange = (selected: string[]) => {
    setSelectedSubjects(selected);
  };

  const handleCurriculumChange = (selected: string[]) => {
    if (selected.includes("none") || selected.length === 0) {
      setSelectedCurriculums([]);
      setSelectedLevels([]);
      setSelectedSubjects([]);
      setIsLevelVisible(false);
      setIsSubjectVisible(false);
    } else {
      const hasLevels = selected.some((curriculum) =>
        Object.keys(levelOptions).includes(curriculum)
      );
      // const hasSubjects = selected.some(
      //   (curriculum) =>
      //     curriculum === "American System Exam Preparation" ||
      //     curriculum === "Languages" ||
      //     curriculum === "American System Advanced Studies Program"
      // );
      setSelectedCurriculums(selected);
      const updatedLevels: string[] = [];
      selected.map((selCur) => {
        if (
          selCur === "IB System" ||
          selCur === "British System" ||
          selCur === "UAE National System"
        ) {
          levelOptions[selCur].map((lvl) => {
            if (selectedLevels.includes(lvl)) {
              updatedLevels.push(lvl);
            }
          });
        }
      });
      setIsLevelVisible(hasLevels);
      handleLevelChange(updatedLevels);
      // setIsSubjectVisible(updatedLevels.length > 0 || hasSubjects);
    }
  };

  const handleLevelChange = (selected: string[]) => {
    setSelectedLevels(selected);
    const updatedSubjects: string[] = [];
    selected.map((lvl) => {
      Object.entries(subjectOptions).map(([key, values]) => {
        if (key) {
          Object.entries(values).map(([subKey, subValues]) => {
            if (subKey === lvl) {
              Object.entries(subValues).map(([innerKey, innerValues]) => {
                if (innerKey) {
                  selectedSubjects.map((sub) => {
                    if (innerValues.includes(sub)) {
                      updatedSubjects.push(sub);
                    }
                  });
                }
              });
            }
          });
        }
      });
    });
    setSelectedSubjects(updatedSubjects);
    const hasSubjects = selectedCurriculums.some(
      (curriculum) =>
        curriculum === "American System Exam Preparation" ||
        curriculum === "Languages" ||
        curriculum === "American System Advanced Studies Program"
    );
    if (selected.length > 0 || hasSubjects) {
      setIsSubjectVisible(true);
    }
    if (selected.length === 0 && !hasSubjects) {
      setSelectedSubjects([]);
      setIsSubjectVisible(false);
    } else if (selected.length === 0 && hasSubjects) {
      setSelectedSubjects([]);
    }
  };

  const filteredLevelOptions = Object.keys(levelOptions).reduce(
    (acc, curriculum) => {
      if (selectedCurriculums.includes(curriculum)) {
        acc[curriculum] = levelOptions[curriculum];
      }
      return acc;
    },
    {} as Record<string, string[]>
  );

  const filteredSubjectOptions = Object.keys(subjectOptions).reduce(
    (acc, curriculum) => {
      if (selectedCurriculums.includes(curriculum)) {
        const levels = levelOptions[curriculum] || ["NoLevel"];
        acc[curriculum] = levels.reduce((levelAcc, level) => {
          if (selectedLevels.includes(level) || level === "NoLevel") {
            levelAcc[level] = subjectOptions[curriculum][level];
          }
          return levelAcc;
        }, {} as Record<string, Record<string, string[]>>);
      }
      return acc;
    },
    {} as Record<string, Record<string, Record<string, string[]>>>
  );

  const openToggle = (dropdownName: string) => {
    if (openDropdown === dropdownName) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(dropdownName);
    }
  };

  const closeToggle = () => {
    setOpenDropdown(null);
  };

  return (
    <form className="w-full max-w-4xl mx-auto p-6 rounded-xl">
      <div className="mb-6">
        <label
          htmlFor="curriculum"
          className="block text-sm font-medium text-gray-700 pb-2"
        >
          Curriculum<span className="text-red-500 font-semibold">*</span>
        </label>
        <DropDownCurriculum
          options={curriculumOptions}
          selectedOptions={selectedCurriculums}
          isOpen={openDropdown === "curriculum"}
          onToggle={() => openToggle("curriculum")}
          closeToggle={() => closeToggle()}
          onSelectionChange={handleCurriculumChange}
        />
      </div>

      {isLevelVisible && (
        <div className="mb-6">
          <label
            htmlFor="level"
            className="block text-sm font-medium text-gray-700 pb-2"
          >
            Level<span className="text-red-500 font-semibold">*</span>
          </label>
          <DropdownLevel
            options={filteredLevelOptions}
            selectedOptions={selectedLevels}
            isOpen={openDropdown === "level"}
            onToggle={() => openToggle("level")}
            closeToggle={() => closeToggle()}
            onSelectionChange={handleLevelChange}
            disabled={!isLevelVisible}
          />
        </div>
      )}

      <div className="mb-6">
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-700 pb-2"
        >
          Subject<span className="text-red-500 font-semibold">*</span>
        </label>
        <DropDownSubject
          options={filteredSubjectOptions}
          selectedOptions={selectedSubjects}
          isOpen={openDropdown === "subject"}
          onToggle={() => openToggle("subject")}
          closeToggle={() => closeToggle()}
          onSelectionChange={handleSubjectChange}
          disabled={!isSubjectVisible}
        />
      </div>
    </form>
  );
};

export default SubjectsICanTeach;
