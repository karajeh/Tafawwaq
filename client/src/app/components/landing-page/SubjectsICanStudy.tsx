import React, { useState } from "react";
import { curriculumOptions, levelOptions, subjectOptions } from "src/subjects";
import DropDownCurriculumStd from "./DropDownCurriculumStd";
import DropdownLevelStd from "./DropDownLevelStd";
import DropDownSubjectStd from "./DropDownSubjectStd";

interface Props {
  selectedCurriculums: string[];
  selectedLevels: string[];
  selectedSubjects: string[];
  setSelectedCurriculums: (curriculums: string[]) => void;
  setSelectedLevels: (levels: string[]) => void;
  setSelectedSubjects: (subjects: string[]) => void;
  handleSearchTutor: () => void
}

const SubjectsICanStudy: React.FC<Props> = ({
  selectedCurriculums,
  selectedLevels,
  selectedSubjects,
  setSelectedCurriculums,
  setSelectedLevels,
  setSelectedSubjects,
  handleSearchTutor,
}) => {
  const [isLevelVisible, setIsLevelVisible] = useState(false);
  const [isSubjectVisible, setIsSubjectVisible] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleSubjectChange = (selected: string[]) => {
    setSelectedSubjects(selected);
  };

  const handleCurriculumChange = (selected: string[]) => {
    // if (selected.includes("none") || selected.length === 0) {
    //   setSelectedCurriculums([]);
    //   setSelectedLevels([]);
    //   setSelectedSubjects([]);
    //   setIsLevelVisible(false);
    //   setIsSubjectVisible(false);
    // } else {
    const hasLevels = selected.some((curriculum) =>
      Object.keys(levelOptions).includes(curriculum)
    );
    const hasSubjects = selected.some(
      (curriculum) =>
        curriculum === "American System Exam Preparation" ||
        curriculum === "Languages" ||
        curriculum === "American System Advanced Studies Program"
    );
    setSelectedCurriculums(selected);
    setSelectedLevels([]);
    setSelectedSubjects([]);
    setIsLevelVisible(hasLevels);
    setIsSubjectVisible(hasSubjects);

    // }
  };

  const handleLevelChange = (selected: string[]) => {
    setSelectedLevels(selected);
    setSelectedSubjects([]);

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

  // const closeToggle = () => {
  //   setOpenDropdown(null);
  // };

  return (
    <form className="searchSystem">
      <div className="flex gap-3">
        <DropDownCurriculumStd
          options={curriculumOptions}
          selectedOptions={selectedCurriculums}
          isOpen={openDropdown === "curriculum"}
          onToggle={() => openToggle("curriculum")}
          // closeToggle={() => closeToggle()}
          onSelectionChange={handleCurriculumChange}
        />
        {isLevelVisible && (
          <DropdownLevelStd
            options={filteredLevelOptions}
            selectedOptions={selectedLevels}
            isOpen={openDropdown === "level"}
            onToggle={() => openToggle("level")}
            // closeToggle={() => closeToggle()}
            onSelectionChange={handleLevelChange}
            disabled={!isLevelVisible}
          />
        )}
      </div>
      <DropDownSubjectStd
        options={filteredSubjectOptions}
        selectedOptions={selectedSubjects}
        isOpen={openDropdown === "subject"}
        onToggle={() => openToggle("subject")}
        // closeToggle={() => closeToggle()}
        onSelectionChange={handleSubjectChange}
        disabled={!isSubjectVisible}
        handleSearchTutor={handleSearchTutor}
      />
    </form>
  );
};

export default SubjectsICanStudy;
