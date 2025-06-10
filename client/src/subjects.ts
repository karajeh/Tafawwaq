export const curriculumOptions = [
  "IB System",
  "British System",
  "American System Exam Preparation",
  "American System Advanced Studies Program",
  "UAE National System",
  "Languages",
  "none",
];

export const levelOptions: Record<string, string[]> = {
  "IB System": [
    "Pre-Kindergarten to Grade 5",
    "Grade 6 to Grade 10",
    "Grade 11 and Grade 12",
  ],
  "British System": ["Grades 9 to 10", "Grades 11 and 12"],
  "UAE National System": ["Grades 1 - 8", "Grades 9 - 12"],
};

export const subjectOptions: Record<
  string,
  Record<string, Record<string, string[]>>
> = {
  "IB System": {
    "Pre-Kindergarten to Grade 5": {
      Mathematics: [
        "Number",
        "Shape and Space",
        "Measurement",
        "Pattern and Function",
        "Data Handling",
      ],
      Science: [
        "Living Things",
        "Earth and Space",
        "Materials and Matter",
        "Forces and Energy",
      ],
      "Social Studies": [
        "Human Systems and Economic Activities",
        "Social Organization and Culture",
        "Continuity and Change through Time",
        "Human and Natural Environments",
        "Resources and the Environment",
      ],
      "Personal, Social and Physical Education (PSPE)": [
        "Identity",
        "Active Living",
        "Interactions",
      ],
    },
    "Grade 6 to Grade 10": {
      NoSubjectCategory: [
        "Language acquisition",
        "Language and literature",
        "Individuals and societies",
        "Sciences", // Changed case
        "Mathematics", // Changed case
        "Arts",
        "Physical and health education",
        "Design",
      ],
    },
    "Grade 11 and Grade 12": {
      "Studies in Language and Literature": [
        "Language A: literature",
        "Language A: language and literature",
        "Literature and performance",
      ],
      "Language Acquisition": [
        "Classical languages",
        "Language Ab initio",
        "Language B",
      ],
      "Individuals and Societies": [
        "Business management",
        "Digital society",
        "Economics",
        "Geography",
        "Global politics",
        "History",
        "Language and culture",
        "Philosophy",
        "Psychology",
        "Social and cultural anthropology",
        "World religions",
      ],
      Sciences: [
        "Biology",
        "Chemistry",
        "Physics", // Changed case
        "Computer science",
        "Design technology",
        "Environmental systems and societies",
        "Sports, exercise and health science",
      ],
      Mathematics: [
        "Analysis and approaches",
        "Applications and interpretation",
      ],
      "DP Core": [
        "Creativity, activity, service",
        "The extended essay",
        "Theory of knowledge",
      ],
    },
  },
  "British System": {
    "Grades 9 to 10": {
      "Creative and Professional": [
        "Accounting",
        "Art & Design",
        "Business Studies",
        "Commerce",
        "Computer Science",
        "Design & Technology",
        "Fashion & Textiles",
        "Food & Nutrition",
        "Statistics",
        "Travel & Tourism",
      ],
      "English Language and Literature": [
        "English Language",
        "Literature in English",
      ],
      "Humanities and Social Studies": [
        "Biblical Studies",
        "Economics",
        "Geography",
        "Global Perspectives",
        "History",
        "Islamic Studies",
        "Sociology",
      ],
      Mathematics: ["Mathematics ", "Mathematics (Additional)"],
      Sciences: [
        "Science - Combined",
        "Biology ",
        "Chemistry ",
        "Physics ", // Changed case
        "Agriculture",
        "Environmental Management",
        "Marine Science",
      ],
      Languages: [
        "Arabic",
        "Bengali",
        "French",
        "Setswana",
        "Sinhala",
        "Tamil",
        "Urdu",
      ],
    },
    "Grades 11 and 12": {
      "Creative and Professional": [
        "Accounting",
        "Art & Design",
        "Business Studies",
        "Computer Science",
        "Design & Technology",
        "Design & Textiles",
        "Digital Media & Design",
        "Drama",
        "Information Technology",
        "Media Studies",
        "Music",
        "Thinking Skills",
        "Travel & Tourism",
      ],
      "English Language & Literature": [
        "English Language and Literature (AS Level Only)",
        "English Literature",
        "English General Paper (AS Level Only)",
        "English Language",
      ],
      "Social Sciences and Humanities": [
        "Islamic Studies",
        "Biblical Studies",
        "Hinduism",
        "Classical Studies",
        "Economics",
        "Geography",
        "Global Perspectives and Research",
        "History",
        "Law",
        "Sociology",
        "Psychology",
      ],
      Languages: [
        "Afrikaans",
        "Arabic",
        "Chinese",
        "French",
        "German",
        "Hindi",
        "Japanese",
        "Portuguese",
        "Spanish",
        "Urdu",
        "Tamil",
      ],
      Mathematics: ["Mathematics  ", "Mathematics - Further"], // Changed case
      Sciences: [
        "Biology  ",
        "Chemistry  ",
        "Environmental Management",
        "Marine Science",
        "Physics  ", // Changed case
      ],
    },
  },
  "American System Exam Preparation": {
    NoLevel: {
      Mathematics: ["Mathematics Level 1", "Mathematics Level 2"],
      Sciences: ["Biology   ", "Chemistry   ", "Physics   "], // Changed case
      "Language and Literature": ["Literature"],
      History: ["U.S. History", "World History"],
      "Foreign Languages": [
        "Spanish",
        "French",
        "German",
        "Latin",
        "Chinese",
        "Italian",
        "Arabic",
        "Japanese",
        "Korean",
        "Hebrew",
        "Modern Hebrew",
      ],
    },
  },
  "American System Advanced Studies Program": {
    NoLevel: {
      Sciences: [
        "Biology    ", // Changed case
        "Chemistry    ", // Changed case
        "Environmental Science",
        "Physics 1",
        "Physics 2",
        "Physics C: Electricity and Magnetism",
        "Physics C: Mechanics",
      ],
      Mathematics: ["Calculus AB", "Calculus BC", "Statistics"],
      "English and Literature": [
        "English Language and Composition",
        "English Literature and Composition",
      ],
      "Social Sciences and Humanities": [
        "European History",
        "French Language and Culture",
        "German Language and Culture",
        "Government and Politics: Comparative",
        "Government and Politics: United States",
        "Human Geography",
        "Italian Language and Culture",
        "Japanese Language and Culture",
        "Latin",
        "Macroeconomics",
        "Microeconomics",
        "Psychology",
        "Spanish Language and Culture",
        "Spanish Literature and Culture",
        "United States History",
        "World History",
      ],
      "Arts and Humanities": [
        "Art History",
        "Music Theory",
        "Studio Art: 2-D Design",
        "Studio Art: 3-D Design",
        "Studio Art: Drawing",
      ],
      "Computer Science": ["Computer Science A", "Computer Science Principles"],
    },
  },
  "UAE National System": {
    "Grades 1 - 8": {
      NoSubjectCategory: [
        "Arabic Language",
        "Islamic Studies",
        "Mathematics   ",
        "Science",
        "Social Studies",
        "English Language",
        "Design and Technology",
        "Arts",
      ],
    },
    "Grades 9 - 12": {
      NoSubjectCategory: [
        "Arabic Language",
        "Islamic Studies",
        "Mathematics    ", // Changed case
        "Physics    ", // Changed case
        "Chemistry     ", // Changed case
        "Biology     ", // Changed case
        "History",
        "Geography",
        "English Language",
        "Computer Science",
        "Moral Education",
        "Advanced Mathematics",
        "Economics",
        "Business Studies",
      ],
    },
  },
  Languages: {
    NoLevel: {
      NoSubjectCategory: [
        "English",
        "Spanish",
        "French",
        "Italian",
        "German",
        "Mandarin Chinese",
        "Japanese",
        "Arabic",
        "Portuguese",
        "Russian",
        "Korean",
        "Turkish",
        "Dutch",
        "Swedish",
        "Greek",
        "Hebrew",
        "Thai",
        "Vietnamese",
        "Persian (Farsi)",
        "Malay/Indonesian",
      ],
    },
  },
};
