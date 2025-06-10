import React from "react";
import GreetingComponent from "./components/landing-page/GreetingComponent";
import EducationComponent from "./components/landing-page/EducationComponent";
import StepsComponent from "./components/landing-page/StepsComponent";
import ClssesComponent from "./components/landing-page/ClssesComponent";
import StudentsComponent from "./components/landing-page/StudentsComponent";
import ContactComponent from "./components/landing-page/ContactComponent";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Tafawwaq Tutoring - Find Private Tutors at Affordable Prices`,
  };
}
const Page = () => {
  return (
    <div>
      <GreetingComponent />
      <EducationComponent />
      <StepsComponent />
      <ClssesComponent />
      <StudentsComponent />
      <ContactComponent />
    </div>
  );
};

export default Page;
