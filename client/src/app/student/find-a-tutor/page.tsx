/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "../../components/admin-panel/ui/dropdown";
import {
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import TeacherCard from "../../components/student/TeacherCard";
import { Range } from "react-range";
// import DashboardHeader from "src/app/components/dashboard/DashboardHeader";
import Pagination from "src/app/components/Pagination";
import axiosInstance from "src/api/axiosInstance";
import apiRoutes from "src/api/apiRoutes";
import { debounce } from "@mui/material";
import Image from "next/image";
import SubjectsICanStudy from "../../components/findATutor/SubjectsICanStudy";

interface User {
  _id: string;
  name: string;
  profilePicture?: string;
}

interface Tutor {
  _id: string;
  user: User;
  subjects?: string[];
  lname?: string;
}

export default function Home() {
  const [values, setValues] = useState<number[]>([0, 2000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [, setAvailableCurriculums] = useState<string[]>(
    []
  );
  const [selectedCurriculum] = useState<string | null>(
    null
  );
  const [, setAvailableLevels] = useState<string[]>([]);
  const [, setSelectedLevel] = useState<string | null>(null);
  const [, setLoadingCurriculums] = useState(true);
  const [, setLoadingLevels] = useState(false);
  const [selectedCurriculums, setSelectedCurriculums] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [filteredTutors, setFilteredTutors] = useState<Tutor[]>([]);
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoadingTutors, setIsLoadingTutors] = useState(false);
  const [languages, setLanguages] = useState<string[]>(["English", "Arabic"]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const availableLanguages = ["English", "Arabic"];

  // Handler for language selection
  const handleLanguageChange = (language: string) => {
    if (languages.includes(language)) {
      setLanguages(languages.filter((lang) => lang !== language));
    } else {
      setLanguages([...languages, language]);
    }
  };

  // Fetch tutors on component mount
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setIsLoadingTutors(true);
        const response = await axiosInstance.get(
          apiRoutes.getTutorsForDropdown
        );
        setTutors(response.data);
        setFilteredTutors(response.data);
      } catch (error) {
        console.error("Error fetching tutors:", error);
      } finally {
        setIsLoadingTutors(false);
      }
    };

    fetchTutors();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Debounced search function

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (!query.trim()) {
        setFilteredTutors(tutors);
        return;
      }
      const lowercasedQuery = query.toLowerCase();
      const filtered = tutors.filter(
        (tutor) =>
          tutor.user.name.toLowerCase().includes(lowercasedQuery) ||
          (tutor?.lname?.toLowerCase() || "").includes(lowercasedQuery) ||
          tutor?.subjects?.some((subject) =>
            subject.toLowerCase().includes(lowercasedQuery)
          ) ||
          false
      );

      setFilteredTutors(filtered);
    }, 300),
    [tutors]
  );

  useEffect(() => {
    const fetchCurriculums = async () => {
      try {
        setLoadingCurriculums(true);
        const response = await axiosInstance.get(
          apiRoutes.getAvailableCurriculums
        );
        setAvailableCurriculums(response.data);
      } catch (error) {
        console.error("Error fetching curriculums:", error);
        setAvailableCurriculums([]);
      } finally {
        setLoadingCurriculums(false);
      }
    };
    fetchCurriculums();
  }, []);

  const sortLevelsByGrade = (levels: string[]): string[] => {
    // Helper function to extract grade numbers from level strings
    const getGradeValue = (level: string): number => {
      // Handle ranges like "Grades 1-5"
      if (level.includes("-")) {
        // Extract the first number in the range
        const match = level.match(/Grades?\s*(\d+)-\d+/i);
        return match ? parseInt(match[1], 10) : 999; // Default high value for unknown formats
      }

      // Handle single grades like "Grade 1"
      const match = level.match(/Grade\s*(\d+)/i);
      return match ? parseInt(match[1], 10) : 999;
    };

    // Sort levels based on the extracted grade numbers
    return [...levels].sort((a, b) => {
      const gradeA = getGradeValue(a);
      const gradeB = getGradeValue(b);
      return gradeA - gradeB;
    });
  };

  // Fetch levels when curriculum changes
  useEffect(() => {
    const fetchLevels = async () => {
      if (!selectedCurriculum) return;

      try {
        setLoadingLevels(true);
        const response = await axiosInstance.get(
          apiRoutes.getAvailableLevels(selectedCurriculum)
        );

        // Sort levels from lowest to highest grade
        const sortedLevels = sortLevelsByGrade(response.data);
        setAvailableLevels(sortedLevels);
        setSelectedLevel(null); // Reset selected level when curriculum changes
      } catch (error) {
        console.error("Error fetching levels:", error);
        setAvailableLevels([]);
      } finally {
        setLoadingLevels(false);
      }
    };
    fetchLevels();
  }, [selectedCurriculum]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  // Handle tutor selection
  const handleSelectTutor = (tutor: Tutor) => {
    setSelectedTutor(tutor);
    setIsDropdownOpen(false);
    setSearchQuery(`${tutor.user.name}${tutor.lname ? " " + tutor.lname : ""}`);
    // You can add additional logic here like filtering displayed teachers based on selection
  };

  const itemsPerPage = 5;

  const filteredTeachersInfo = selectedTutor
    ? teachersInfo.filter((teacher) =>
        // This is a placeholder - you would implement actual filtering logic
        // based on how your data models relate
        teacher.name.includes(selectedTutor.user.name)
      )
    : teachersInfo;

  const totalPages = Math.ceil(filteredTeachersInfo.length / itemsPerPage);

  // Calculate the displayed teachers based on current page
  const displayedTeachers = filteredTeachersInfo.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers for pagination
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePageChange = (pageNumber: SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  // Create a custom dropdown menu component for languages with checkboxes
  const LanguageDropdownMenu = ({
    items,
    onSelect,
    selectedItems,
  }: {
    items?: string[];
    onSelect?: (item: string) => void;
    selectedItems: string[];
  }) => (
    <DropdownMenu>
      {items && items.length > 0 ? (
        items.map((item) => (
          <DropdownItem
            key={item}
            onClick={() => onSelect?.(item)}
            className="hover:bg-gray-100 cursor-pointer flex items-center gap-2"
          >
            <div
              className={`w-4 h-4 border rounded flex items-center justify-center ${
                selectedItems.includes(item)
                  ? "bg-admin_button border-admin_button"
                  : "border-gray-300"
              }`}
            >
              {selectedItems.includes(item) && (
                <svg
                  width="10"
                  height="8"
                  viewBox="0 0 10 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 1L3.5 6.5L1 4"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            {item}
          </DropdownItem>
        ))
      ) : (
        <DropdownItem disabled className="text-gray-400 cursor-not-allowed">
          No options available
        </DropdownItem>
      )}
    </DropdownMenu>
  );


  return (
    <div className="flex flex-col gap-5 p-5 pt-0">
      {/* <DashboardHeader /> */}
      {/* Filters */}
      <div className="flex flex-col gap-0 pt-0">
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {/* <div className="pl-4 border border-admin_button w-full rounded-xl h-[50px] flex items-center"> */}
              {/* <input
                type="text"
                placeholder="What would you want to learn?"
                className="w-full h-full outline-none"
                value={searchQuery}
                onChange={handleSearchChange}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDropdownOpen(true);
                }}
              /> */}
              {selectedTutor && (
                <div className="flex items-center gap-2 px-2">
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTutor(null);
                      setSearchQuery("");
                    }}
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          {/* </div> */}

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {isLoadingTutors ? (
                <div className="p-3 text-center text-gray-500">
                  Loading tutors...
                </div>
              ) : filteredTutors.length > 0 ? (
                filteredTutors.map((tutor) => (
                  <div
                    key={tutor._id}
                    className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                    onClick={() => handleSelectTutor(tutor)}
                  >
                    <div className="flex-shrink-0 w-8 h-8">
                      {tutor?.user?.profilePicture ? (
                        <Image
                          width={32}
                          height={32}
                          src={tutor.user.profilePicture}
                          alt={tutor.user.name}
                          className="rounded-full object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 text-sm">
                            {tutor.user.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium truncate">
                        {tutor.user.name} {tutor?.lname || ""}
                      </div>
                      {tutor.subjects && tutor.subjects.length > 0 && (
                        <div className="text-xs text-gray-500 truncate">
                          {tutor.subjects.slice(0, 4).join(", ")}
                          {tutor.subjects.length > 4 && "..."}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-3 text-center text-gray-500">
                  No tutors found
                </div>
              )}
            </div>
          )}
        </div>
        <div className="mt-4 flex flex-col md:flex-row md:space-x-4 w-full space-y-4 md:space-y-0">
          <SubjectsICanStudy
            selectedCurriculums={selectedCurriculums}
            selectedLevels={selectedLevels}
            selectedSubjects={selectedSubjects}
            setSelectedCurriculums={setSelectedCurriculums}
            setSelectedLevels={setSelectedLevels}
            setSelectedSubjects={setSelectedSubjects}
          />

          <div className="flex items-center flex-wrap gap-6 w-full">
            {/* Language filter */}
            <Dropdown>
              <DropdownButton
                outline
                className="sm:px-3 text-gray-500 min-h-[40px] w-[200px] flex justify-between rounded-md text-xs md:text-base !text-[15px] !font-normal"
              >
                {languages.length > 0 ? (
                  `Language (${languages.length})`
                ) : (
                  <span className="text-gray-400">Language</span>
                )}
                <DownArrowIcon />
              </DropdownButton>
              <LanguageDropdownMenu
                items={availableLanguages}
                onSelect={handleLanguageChange}
                selectedItems={languages}
              />
            </Dropdown>

            {/* Price range filter */}
            <RangeSelector values={values.map(Number)} setValues={setValues} />

            <button className="bg-admin_button text-white min-h-[40px] px-5 rounded-md">
              Apply
            </button>
          </div>
        </div>
      </div>

      {displayedTeachers.map((teacher, index) => (
        <TeacherCard key={index} {...teacher} />
      ))}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

const DownArrowIcon = () => {
  return (
    <svg
      width="19"
      height="12"
      viewBox="0 0 19 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0.118576L9.5 11.1186L19 0.118576H0Z" fill="#66797C" />
    </svg>
  );
};

interface RangeSelectorProps {
  values: number[];
  setValues: (values: number[]) => void;
}

const RangeSelector: React.FC<RangeSelectorProps> = ({ values, setValues }) => {
  return (
    <div className="flex flex-col min-w-[150px] gap-2">
      <p className="flex justify-between">
        <span className="text-xs">Price:</span>
        <span className="text-xs font-bold">
          AED {values[0]} - AED {values[1]}
        </span>
      </p>
      <Range
        values={values}
        step={10}
        min={0}
        max={2000}
        onChange={(newValues) => setValues(newValues)} // Works with numbers
        renderTrack={({ props, children }) => {
          const [min, max] = values;
          const left = ((min - 0) / (2000 - 0)) * 100;
          const right = ((max - 0) / (2000 - 0)) * 100;

          return (
            <div
              {...props}
              style={{
                ...props.style,
                height: "6px",
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
          />
        )}
      />
    </div>
  );
};


// const teachersInfo = [
//   {
//     name: "Alexson David",
//     subject: "English Tutor",
//     image:
//       "https://images.unsplash.com/photo-1727093267255-e9b31b2b35ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2MXx8fGVufDB8fHx8fA%3D%3D",
//     description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
//     testimonial: {
//       title: "Extremely Amazing and professional tutor",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin sem in nibh dignissim pretium. Sed tristique viverra semper. -Rebecca",
//     },
//     rate: "145/hr",
//     totalHours: "2000",
//     responseTime: "25 minutes",
//     rating: 4,
//     avgReview: "4.5",
//     totalRating: "2000",
//   },
//   {
//     name: "Sophia Turner",
//     subject: "Mathematics Tutor",
//     image:
//       "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleGFtcGxlfGV8fHx8fHw%3D",
//     description:
//       "Passionate about helping students excel in mathematics, from algebra to calculus.",
//     testimonial: {
//       title: "Incredible depth of knowledge",
//       description:
//         "Sophia is highly knowledgeable and patient with every question. -John",
//     },
//     rate: "120/hr",
//     totalHours: "1500",
//     responseTime: "30 minutes",
//     rating: 5,
//     avgReview: "4.8",
//     totalRating: "1800",
//   },
//   {
//     name: "Olivia Martinez",
//     subject: "Spanish Tutor",
//     image:
//       "https://plus.unsplash.com/premium_photo-1668485966810-cbd0f685f58f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJldHR5JTIwZ2lybHxlbnwwfHwwfHx8MA%3D%3D",
//     description:
//       "Native Spanish speaker with experience teaching conversational and academic Spanish.",
//     testimonial: {
//       title: "Very interactive lessons",
//       description: "Olivia makes learning Spanish fun and interactive. -Sarah",
//     },
//     rate: "115/hr",
//     totalHours: "1400",
//     responseTime: "35 minutes",
//     rating: 4,
//     avgReview: "4.6",
//     totalRating: "1700",
//   },
//   {
//     name: "James Carter",
//     subject: "Physics Tutor",
//     image:
//       "https://images.unsplash.com/photo-1573497491208-6b1acb260507?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleGFtcGxlfGV8fHx8fHw%3D",
//     description:
//       "Physics tutor specializing in high school and college-level mechanics and electromagnetism.",
//     testimonial: {
//       title: "Excellent explanations",
//       description:
//         "James breaks down complex concepts so they’re easy to understand. -Emma",
//     },
//     rate: "130/hr",
//     totalHours: "1600",
//     responseTime: "20 minutes",
//     rating: 5,
//     avgReview: "4.9",
//     totalRating: "1900",
//   },
//   {
//     name: "Emily Chen",
//     subject: "Biology Tutor",
//     image:
//       "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleGFtcGxlfGV8fHx8fHw%3D",
//     description:
//       "Experienced in teaching cell biology, genetics, and ecology to high school students.",
//     testimonial: {
//       title: "Highly engaging",
//       description:
//         "Emily makes biology fascinating and keeps students engaged. -David",
//     },
//     rate: "125/hr",
//     totalHours: "1100",
//     responseTime: "28 minutes",
//     rating: 4,
//     avgReview: "4.7",
//     totalRating: "1500",
//   },
//   {
//     name: "Michael Zhang",
//     subject: "Chemistry Tutor",
//     image:
//       "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleGFtcGxlfGV8fHx8fHw%3D",
//     description:
//       "Chemistry tutor with a focus on organic and inorganic chemistry for college students.",
//     testimonial: {
//       title: "Clear and concise teaching style",
//       description:
//         "Michael’s approach is structured and helps clarify difficult topics. -Alice",
//     },
//     rate: "140/hr",
//     totalHours: "1300",
//     responseTime: "22 minutes",
//     rating: 5,
//     avgReview: "4.9",
//     totalRating: "1600",
//   },
//   {
//     name: "Rachel Green",
//     subject: "History Tutor",
//     image:
//       "https://images.unsplash.com/photo-1545992332-0a062dd896a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleGFtcGxlfGV8fHx8fHw%3D",
//     description:
//       "Specializes in European and World History for high school and college students.",
//     testimonial: {
//       title: "Brings history to life",
//       description: "Rachel’s passion for history is contagious! -Liam",
//     },
//     rate: "110/hr",
//     totalHours: "1200",
//     responseTime: "40 minutes",
//     rating: 4,
//     avgReview: "4.5",
//     totalRating: "1400",
//   },
//   {
//     name: "Lucas Brown",
//     subject: "Economics Tutor",
//     image:
//       "https://images.unsplash.com/photo-1573495628364-357d938d7bd1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleGFtcGxlfGV8fHx8fHw%3D",
//     description:
//       "Experienced in teaching micro and macroeconomics for college-level students.",
//     testimonial: {
//       title: "Highly analytical and insightful",
//       description: "Lucas helped me understand complex economic models. -Nina",
//     },
//     rate: "135/hr",
//     totalHours: "1700",
//     responseTime: "18 minutes",
//     rating: 5,
//     avgReview: "4.8",
//     totalRating: "1800",
//   },
// ];

const teachersInfo = [
  {
    id: "1",
    name: "Alexson David",
    title: "English Tutor",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    image:
      "https://images.unsplash.com/photo-1727093267255-e9b31b2b35ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2MXx8fGVufDB8fHx8fA%3D%3D",
    rating: {
      stars: 4,
      value: 4.5,
      count: 2000,
    },
    isAvailable: true,
    rate: 145,
    hoursTutored: 2000,
    responseTime: "25 minutes",
    review: {
      quote: "Extremely Amazing and professional tutor",
      reviewer: "Rebecca",
      details:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin sem in nibh dignissim pretium. Sed tristique viverra semper.",
    },
    location: "New York, USA",
    memberSince: "2018",
    tutoringExperience: "5 years",
    age: "32",
    gender: "Male",
    language: "English",
    educationLevel: "Master's in English Literature",
    teachingGrades: ["High School", "College"],
    subjects: ["English"],
  },
  {
    id: "2",
    name: "Sophia Turner",
    title: "Mathematics Tutor",
    description:
      "Passionate about helping students excel in mathematics, from algebra to calculus.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleGFtcGxlfGV8fHx8fHw%3D",
    rating: {
      stars: 5,
      value: 4.8,
      count: 1800,
    },
    isAvailable: true,
    rate: 120,
    hoursTutored: 1500,
    responseTime: "30 minutes",
    review: {
      quote: "Incredible depth of knowledge",
      reviewer: "John",
      details:
        "Sophia is highly knowledgeable and patient with every question.",
    },
    location: "Los Angeles, USA",
    memberSince: "2019",
    tutoringExperience: "4 years",
    age: "29",
    gender: "Female",
    language: "English",
    educationLevel: "Master's in Mathematics",
    teachingGrades: ["Middle School", "High School"],
    subjects: ["Mathematics"],
  },
  {
    id: "3",
    name: "Olivia Martinez",
    title: "Spanish Tutor",
    description:
      "Native Spanish speaker with experience teaching conversational and academic Spanish.",
    image:
      "https://plus.unsplash.com/premium_photo-1668485966810-cbd0f685f58f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJldHR5JTIwZ2lybHxlbnwwfHwwfHx8MA%3D%3D",
    rating: {
      stars: 4,
      value: 4.6,
      count: 1700,
    },
    isAvailable: false,
    rate: 115,
    hoursTutored: 1400,
    responseTime: "35 minutes",
    review: {
      quote: "Very interactive lessons",
      reviewer: "Sarah",
      details: "Olivia makes learning Spanish fun and interactive.",
    },
    location: "Madrid, Spain",
    memberSince: "2020",
    tutoringExperience: "3 years",
    age: "27",
    gender: "Female",
    language: "Spanish, English",
    educationLevel: "Bachelor's in Spanish Linguistics",
    teachingGrades: ["Middle School", "High School"],
    subjects: ["Spanish"],
  },
];
