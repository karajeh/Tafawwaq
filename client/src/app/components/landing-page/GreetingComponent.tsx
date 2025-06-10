"use client";
import Image from "next/image";
import React, { useState, useEffect, useMemo } from "react";
import SubjectsICanStudy from "./SubjectsICanStudy";
import { useRouter } from "next/navigation";

const GreetingComponent: React.FC = () => {
  const [text, setText] = useState("");
  const [isErasing, setIsErasing] = useState(false);
  const [currentText, setCurrentText] = useState("Grades");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingFinished] = useState(false);
  const [selectedCurriculums, setSelectedCurriculums] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const router = useRouter(); // ✅ Init router

  const phrases = useMemo(
    () => ["Grades", "Confidence", "Understanding", "Knowledge", "Success"],
    []
  );

  // const isUnderstanding = currentText === "Understanding";

  const onSearch = () => {
    console.log(selectedCurriculums, selectedLevels, selectedSubjects);
    const query = new URLSearchParams({
      curriculums: selectedCurriculums.join(","),
      levels: selectedLevels.join(","),
      subjects: selectedSubjects.join(","),
    });
    router.push(`/find-a-tutor?${query.toString()}`);
  };

  useEffect(() => {
    const handleTypingAndErasing = () => {
      if (!isErasing && !isTypingFinished) {
        if (currentIndex < currentText.length) {
          setText((prevText) => prevText + currentText[currentIndex]);
          setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
          setIsErasing(true);
        }
      } else if (isErasing && !isTypingFinished) {
        if (text.length > 0) {
          setText((prevText) => prevText.slice(0, -1));
        } else {
          const nextPhraseIndex =
            (phrases.indexOf(currentText) + 1) % phrases.length;
          setCurrentText(phrases[nextPhraseIndex]);
          setCurrentIndex(0);
          setIsErasing(false);
        }
      }
    };

    const interval = setInterval(handleTypingAndErasing, 150);

    return () => clearInterval(interval);
  }, [text, currentText, currentIndex, isErasing, isTypingFinished, phrases]);

  return (
    <section className="greeting">
      <div className="container">
        <div className="greetingWrapper">
          <h1 className="mainTitle w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
            <span className="block text-3xl lg:text-5xl leading-tight mb-1">
              Boost your{" "}
            </span>
            <div className="relative min-h-[2.5rem] sm:min-h-[3rem] md:min-h-[3.5rem] lg:min-h-[4.5rem] flex items-center justify-center mb-1">
              <span className="animatedTitle typing-effect text-xl sm:text-2xl md:text-3xl lg:text-6xl font-bold text-center leading-none overflow-hidden whitespace-nowrap max-w-full">
                {text}
              </span>
            </div>
            <span className="block text-2xl lg:text-5xl leading-tight whitespace-nowrap">
              Using{" "}
              <span style={{ fontWeight: "700" }}>
                <span className="ml-1">Tafawwaq</span>
              </span>
            </span>
          </h1>
          <p className="greetingText">
            We are <span>Offering 130+</span> subjects across{" "}
            <span>
              AP, SAT test preparation, British, International, and
              <br /> National curricula, as well as languages
            </span>{" "}
            for all grades and levels.
          </p>
          <SubjectsICanStudy
            selectedCurriculums={selectedCurriculums}
            selectedLevels={selectedLevels}
            selectedSubjects={selectedSubjects}
            setSelectedCurriculums={setSelectedCurriculums}
            setSelectedLevels={setSelectedLevels}
            setSelectedSubjects={setSelectedSubjects}
            handleSearchTutor={onSearch}
          />
          <div className="experts">
            <Image
              width={118}
              height={55}
              style={{ minWidth: "118px", minHeight: "55px" }}
              src="/images/persons.png"
              alt="persons"
              className="expertsImg"
            />
            <p style={{ textAlign: "left" }} className="greetingText">
              We have <span>more than 300</span> experts that <br />
              can help you!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GreetingComponent;
