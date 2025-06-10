"use client"
import { useEffect } from "react";
import FAQ from "../components/FAQ";
import Benefits from "./Benefits";
import BestPractices from "./BestPractices";
import Community from "./Community";
import Hero from "./Hero";
// import InspireAndTeach from "./InspireAndTeach";
import TutorResources from "./TutorResources";
import TutorReview from "./TutorReview";

export default function Page() {
  useEffect(() => {
    document.title = `Best Practices for Private Tutoring`;
  }, []);
  return (
    <div className="flex flex-col w-full">
      <Hero /> {/*keep*/}
      <div className="flex flex-col gap-y-16">
        <Benefits />
        <TutorReview />
        <TutorResources />
        <BestPractices />
        {/* <InspireAndTeach /> */}
        <Community />
        <FAQ />
      </div>
    </div>
  );
}
