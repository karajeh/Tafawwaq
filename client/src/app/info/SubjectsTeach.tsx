import React, { useEffect, useState } from "react";
import SubjectsICanTeach from "../components/teacher/SubjectsICanTeach";
import { IProfile } from "src/api/profileService";
import { levelOptions } from "src/subjects";

interface SubjectsTeachProps {
  setFormData: React.Dispatch<React.SetStateAction<IProfile>>;
  onValidationChange: (isValid: boolean) => void;
}

const SubjectsTeach: React.FC<SubjectsTeachProps> = ({
  onValidationChange,
  setFormData
}) => {
  const [selectedCurriculums, setSelectedCurriculums] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const setFormAndSelectedCurriculums = (curriculums: string[]) => {
    setSelectedCurriculums(curriculums);

    setFormData((prev) => {
      const existingTeachesMap = new Map(
        (prev.teaches ?? []).map((teach) => [teach.curriculum, teach]),
      );

      const updatedTeaches = curriculums.map((curriculum) => {
        const existing = existingTeachesMap.get(curriculum);
        return existing ? existing : { curriculum }; // preserve levels if present
      });

      return {
        ...prev,
        teaches: updatedTeaches,
      };
    });
  };

  const setFormAndSelectedLevels = (selectedLevels: string[]) => {
    setSelectedLevels(selectedLevels);

    // Create a map: curriculum → levels[]
    const levelsByCurriculum: Record<string, string[]> = {};

    for (const level of selectedLevels) {
      const matchedCurriculum = Object.entries(levelOptions).find(
        ([_, levels]) => levels.includes(level),
      )?.[0];

      if (matchedCurriculum) {
        if (!levelsByCurriculum[matchedCurriculum]) {
          levelsByCurriculum[matchedCurriculum] = [];
        }
        levelsByCurriculum[matchedCurriculum].push(level);
      }
    }

    setFormData((prev) => {
      const updatedTeaches = (prev.teaches ?? []).map((teach) => {
        if (levelsByCurriculum[teach.curriculum]) {
          return {
            ...teach,
            levels: levelsByCurriculum[teach.curriculum],
          };
        }
        return teach;
      });

      return {
        ...prev,
        teaches: updatedTeaches,
      };
    });
  };

  const setFormAndSelectedSubjects = (subjects: string[]) => {
    setSelectedSubjects(subjects);
    setFormData((prev) => ({
      ...prev,
      subjects,
    }));
  };

  useEffect(() => {
    if (selectedCurriculums.length > 0 && selectedSubjects.length > 0) {
      onValidationChange(true);
    } else {
      onValidationChange(false);
    }
  }, [selectedCurriculums, selectedLevels, selectedSubjects]);
  return (
    <SubjectsICanTeach
      selectedCurriculums={selectedCurriculums}
      selectedLevels={selectedLevels}
      selectedSubjects={selectedSubjects}
      setSelectedCurriculums={setFormAndSelectedCurriculums}
      setSelectedLevels={setFormAndSelectedLevels}
      setSelectedSubjects={setFormAndSelectedSubjects}
    />
  );
};

export default SubjectsTeach;
