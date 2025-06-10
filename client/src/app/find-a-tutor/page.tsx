"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import searchIcon from "public/images/landing-page/searchIcon.png";
import TutorCard from "../components/TutorCard";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
//  import tutors from "../../lib/tutors_details.json";
import Pagination from "../components/Pagination";
import { format, addDays, startOfWeek } from "date-fns";
import { Range } from "react-range";
import SubjectsICanStudy from "../components/findATutor/SubjectsICanStudy";
import { useSearchParams } from "next/navigation";
import { searchTeachers, Tutor } from "src/api/teacherService";

interface TutorList {
  tutors: Tutor[];
}

export default function FindATutor() {
  const searchParams = useSearchParams();

  const curriculums = searchParams.get("curriculums");
  const levels = searchParams.get("levels");
  const subjects = searchParams.get("subjects");

  const [selectedDate, setSelectedDate] = useState(new Date());
  const startOfWeekDate = startOfWeek(selectedDate, { weekStartsOn: 6 });
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedCurriculums, setSelectedCurriculums] = useState<string[]>(
    curriculums ? [curriculums] : []
  );
  const [selectedLevels, setSelectedLevels] = useState<string[]>(
    levels ? [levels] : []
  );
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(
    subjects ? [subjects] : []
  );
  const [isLoadingTutors, setIsLoadingTutors] = useState(true);
  const [tutors, setTutors] = useState<TutorList>({ tutors: [] });

  useEffect(() => {
    document.title = "Search for Private Tutors - Tafawwaq Tutoring";
  }, []);

  const days = Array.from({ length: 7 }).map((_, index) =>
    addDays(startOfWeekDate, index)
  );

  const fetchTutors = async () => {
    try {
      setIsLoadingTutors(true);
      const teachers = await searchTeachers({
        selectedCurriculums,
        selectedLevels,
        selectedSubjects,
        priceRange,
        selectedLanguages,
      });
      console.log("teachers", teachers);
      setTutors(teachers);
    } catch (error) {
      setIsLoadingTutors(false);
      console.error("Error fetching tutors:", error);
    } finally {
      setIsLoadingTutors(false);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  const handlePreviousWeek = () => {
    setSelectedDate(addDays(selectedDate, -7));
  };

  const handleNextWeek = () => {
    setSelectedDate(addDays(selectedDate, 7));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const tutorsPerPage = 4;

  const indexOfLastTutor = currentPage * tutorsPerPage;
  const indexOfFirstTutor = indexOfLastTutor - tutorsPerPage;
  const currentTutors = tutors.tutors.slice(
    indexOfFirstTutor,
    indexOfLastTutor
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(tutors.tutors.length / tutorsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageChange = (pageNumber: React.SetStateAction<number>) => {
    setCurrentPage(pageNumber); // Update current page when a page number is clicked
  };

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const handleLanguageChange = (language: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((lang) => lang !== language)
        : [...prev, language]
    );
  };

  const handleSearch = () => {
    fetchTutors()
  }

  return (
    <div className="p-6 md:p-12 bg-career_bg flex flex-col lg:flex-row gap-8 lg:gap-16 mt-14">
      <div className="w-full lg:w-1/5 flex flex-col gap-4">
        <div className="px-4">
          <h1 className="text-lg md:text-2xl font-bold mt-2">
            Filter By Price
          </h1>
          <p className="text-lg my-4">
            Price : AED {priceRange[0]} - AED {priceRange[1]}
          </p>
          <div>
            <Range
              values={priceRange}
              step={10}
              min={0}
              max={2000}
              onChange={(values: React.SetStateAction<number[]>) =>
                setPriceRange(values)
              }
              renderTrack={({ props, children }) => {
                // Calculate the percentage positions of the left and right thumbs
                const [min, max] = priceRange;
                const left = ((min - 0) / (2000 - 0)) * 100;
                const right = ((max - 0) / (2000 - 0)) * 100;

                return (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "2px",
                      width: "100%",
                      background: `linear-gradient(to right, #ddd ${left}%, #00ADEF ${left}%, #00ADEF ${right}%, #ddd ${right}%)`,
                    }}
                  >
                    {children}
                  </div>
                );
              }}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "20px",
                    width: "20px",
                    borderRadius: "50%",
                    backgroundColor: "#00ADEF",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></div>
              )}
            />
          </div>
        </div>
        <hr className="h-px mt-2 mb-1 bg-stone-200 border-0" />
        <div className="px-4">
          <h1 className="text-lg md:text-2xl font-bold my-2">
            Language Spoken
          </h1>
          {["English", "Arabic"].map((lang) => (
            <div key={lang} className="flex gap-4 items-center mt-2">
              <input
                type="checkbox"
                className="w-4 h-4 rounded-md"
                checked={selectedLanguages.includes(lang)}
                onChange={() => handleLanguageChange(lang)}
              />
              {lang}
            </div>
          ))}
        </div>
        <div className="pt-6 md:pt-12">
          <h1 className="text-lg md:text-2xl font-bold my-2">Select Date</h1>
          <p className="flex justify-center text-gray-600">
            {format(selectedDate, "MMMM yyyy")}
          </p>
          <div className="flex items-center justify-center gap-1 my-3">
            <button onClick={handlePreviousWeek} className="p-2">
              <GrFormPrevious />
            </button>
            <div className="flex gap-1 overflow-x-auto">
              {days.map((day, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDate(day)}
                  className={`w-14 text-xs flex flex-col items-center text-center rounded-md py-2 ${
                    format(day, "dd-MM-yyyy") ===
                    format(selectedDate, "dd-MM-yyyy")
                      ? "bg-green-200 text-green-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <span>{format(day, "EEE")}</span>
                  <span>{format(day, "d")}</span>
                </button>
              ))}
            </div>
            <button onClick={handleNextWeek} className="p-2">
              <MdNavigateNext />
            </button>
          </div>
        </div>
        <button className="w-full mt-2 bg-[#40A8CD] hover:bg-[#40A8CD] py-2 rounded-md text-white transition-transform transform hover:scale-105 active:scale-95">
          Apply
        </button>
      </div>

      <div className="w-full lg:w-4/5">
        <div className="mt-4 flex flex-col md:flex-row md:space-x-4 w-full space-y-4 md:space-y-0">
          <SubjectsICanStudy
            selectedCurriculums={selectedCurriculums}
            selectedLevels={selectedLevels}
            selectedSubjects={selectedSubjects}
            setSelectedCurriculums={setSelectedCurriculums}
            setSelectedLevels={setSelectedLevels}
            setSelectedSubjects={setSelectedSubjects}
          />
          {/* <div className="relative w-full md:w-1/4">
            <select
              className="border border-gray-300 focus:border-primary focus:outline-none rounded-lg px-4 py-2 w-full appearance-none bg-white text-left pr-10"
              style={{
                backgroundImage: `url(${bottomArrow.src})`,
                backgroundSize: "16px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px center",
              }}
            >
              <option>IGCSE</option>
            </select>
          </div>
          <div className="relative w-full md:w-1/4">
            <select
              className="border border-gray-300 focus:border-primary focus:outline-none rounded-lg px-4 py-2 w-full appearance-none bg-white text-left pr-10"
              style={{
                backgroundImage: `url(${bottomArrow.src})`,
                backgroundSize: "16px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px center",
              }}
            >
              <option>Level</option>
            </select>
          </div>
          <div className="relative w-full md:flex-1">
            <input
              type="text"
              placeholder="English"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:border-primary focus:outline-none"
            />
          </div> */}
          <button onClick={handleSearch} className="flex justify-center items-center px-4 py-2 bg-primary text-white rounded-lg w-full md:w-auto transition-transform transform hover:scale-105 active:scale-95">
            <Image src={searchIcon} alt="Search" width={24} height={24} />
          </button>
        </div>

        <div className="mt-4">
          {!isLoadingTutors ? (
            tutors.tutors.map((tutor, index) => (
              <TutorCard key={index} {...tutor} />
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>

        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(tutors.tutors.length / tutorsPerPage)}
            onPrevious={handlePreviousPage}
            onNext={handleNextPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
