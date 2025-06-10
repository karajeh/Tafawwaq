import React from "react";
import { Button } from "../admin-panel/ui/button";
import TutorInfo from "./TutorInfo";
import Tags from "./Tags";
import IntroductionVideo from "./IntroductionVideo";
import TutorPricing from "./TutorPricing";
import Schedule from "./Schedule";
import ReviewSection from "./ReviewSection";
import BookLessonButton from "./BookLessonButton";
import Image from "next/image";
import { TutorCardProps } from "../TutorCard";

const TutorProfile: React.FC<TutorCardProps> = (props) => {

  return (
    <div className="max-w-screen-md mx-auto bg-white shadow-lg p-4 pt-14 overflow-y-scroll h-screen">
      <TutorInfo {...props} />
      <BookLessonButton width="170px" height="42px" />
      <Button
        color="button_primary"
        className="bg-secondary text-white md:py-2 px-4 rounded-md mt-4 ml-4"
      >
        Send a message
      </Button>
      <IntroductionVideo />
      <TutorPricing />

      <h2 className="text-lg font-semibold mt-6">Grades They Teach</h2>
      <Tags tags={["Math", "Science", "English"]} />

      <h2 className="text-lg font-semibold mt-6">Educational background</h2>
      <Education
        degree="Bachelors in Computer Science"
        institution="Harvard"
        time="Sep 2022 - Present"
        logoUrl="https://images.unsplash.com/photo-1609345635784-fd4a890e2326?q=80&w=1609&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        details={[
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        ]}
      />

      {/* <h2 className="text-lg font-semibold mt-6">Experience</h2>
      <Experience
        title="Front End Developer"
        company="Microsoft"
        time="Sep 2022 - Present | Full time"
        logoUrl="https://images.unsplash.com/photo-1609345635784-fd4a890e2326?q=80&w=1609&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        tasks={[
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        ]}
      /> */}

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Cancellation Policy</h2>
        <p className="text-sm text-gray-500">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s,
        </p>
      </div>

      <Schedule />
      <ReviewSection />

      {/* Footer Buttons */}
      <div className="flex justify-between mt-6 gap-4">
        <BookLessonButton />
        <Button
          color="button_primary"
          className="bg-secondary text-white sm:py-2 px-4  w-full rounded-md"
        >
          Send message
        </Button>
      </div>
    </div>
  );
};

export default TutorProfile;

// const Experience: React.FC<{
//   title: string;
//   company: string;
//   time: string;
//   logoUrl: string;
//   tasks: string[];
// }> = ({ title, company, time, logoUrl, tasks }) => {
//   return (
//     <div className="flex items-start mt-2">
//       <Image
//         src={logoUrl}
//         alt={`${company} logo`}
//         width={40}
//         height={40}
//         className="mt-1 object-cover aspect-square rounded-md"
//       />
//       <div className="ml-2">
//         <p className="font-semibold">{title}</p>
//         <p className="text-sm text-gray-500">
//           {company} | {time}
//         </p>
//         <ul className="list-disc pl-5 mt-2 text-gray-600 text-sm">
//           {tasks.map((task, index) => (
//             <li key={index}>{task}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

const Education: React.FC<{
  degree: string;
  institution: string;
  time: string;
  logoUrl: string;
  details: string[];
}> = ({ degree, institution, time, logoUrl, details }) => {
  return (
    <div className="flex items-start mt-2">
      <Image
        src={logoUrl}
        alt={`${institution} logo`}
        width={40}
        height={40}
        className="mt-1 object-cover aspect-square rounded-md"
      />
      <div className="ml-2">
        <p className="font-semibold">{degree}</p>
        <p className="text-sm text-gray-500">
          {institution} | {time}
        </p>
        <ul className="list-disc pl-5 mt-2 text-gray-600 text-sm">
          {details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
