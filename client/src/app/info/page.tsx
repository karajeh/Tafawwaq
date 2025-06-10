"use client";
import { useEffect, useState } from "react";
import Polices from "./Tafawwaq's Policies/main";
import Educationalbackground from "./EducationalBackground";
import BusinessTafawwaq from "./BusinessTafawwaq";
import PublicProfile from "./PublicProfile";
import TutorContract from "./TutorContract";
import EmailConfirmation from "./EmailConfirmation";
import Wellcome from "./Tafawwaq's Policies/Wellcome";
import NewStudents from "./Tafawwaq's Policies/NewStudents";
import Payment from "./Tafawwaq's Policies/Payment";
import ImportantRules from "./Tafawwaq's Policies/ImportantRules";
import GeneralInformation from "./GeneralInformation";
import SubjectsTeach from "./SubjectsTeach";
import Tutoring from "./Tafawwaq's Policies/Tutoring";
import { useDisableDashboard } from "../../store/disableDashboard";
import { useRouter } from "next/navigation";
import StepProgress from "./StepProgress"; // Import the new StepProgress component
import { IProfile, updateProfile } from "src/api/profileService";

export type SectionComponent = {
  onChange?: (value: boolean) => void;
  onCheck?: (checked: boolean) => void;
};
// Define the types for step content
interface Section {
  heading: string;
  content?: string;
  Component?: React.FC<SectionComponent>;
}

interface StepContentWithSections {
  id: number;
  title: string;
  sections: Section[];
}

interface StepContentWithDescription {
  id: number;
  title: string;
  description: string;
}
type StepContent = StepContentWithSections | StepContentWithDescription;

function isStepContentWithSections(
  step: StepContent,
): step is StepContentWithSections {
  return (step as StepContentWithSections).sections !== undefined;
}

const Info = () => {
  const [isNextOk, setIsNextOk] = useState(false);
  const [isGeneralInfoValid, setIsGeneralInfoValid] = useState(false);
  const [isSubjectTeachValid, setIsSubjectTeachValid] = useState(false);
  const [isEducationalBackgroundValid, setIsEducationalBackgroundValid] =
    useState(false);
  const [isBusinessTafawwaqValid, setIsBusinessTafawwaqValid] = useState(false);
  const [isPublicProfileValid, setIsPublicProfileValid] = useState(false);
  const [isTutorContractValid, setIsTutorContractValid] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);
  useEffect(() => {
    document.title = `Tutor Onboarding | Tafawwaq`;
  }, []);
  const steps = [
    { title: "Tafawwaq's\nPolicies", description: "" },
    {
      title: "General\nInformation",
      description: "",
    },
    { title: "Subjects I\nTeach", description: "You're 40% There!" },
    { title: "Educational\nBackground", description: "You're Halfway There!" },
    { title: "Business at\nTafawwaq", description: "You're Almost There!" },
    { title: "Public\nProfile", description: "" },
    { title: "Tafawwaq Tutor\nContract", description: "" },
    { title: "Email\nConfirmation", description: "" },
  ];

  const stepContent: StepContent[] = [
    {
      id: 1,
      title: "",
      sections: [
        {
          heading: "Welcome!",
          Component: Wellcome,
        },
        {
          heading: "Business",
          Component: NewStudents,
        },
        {
          heading: "Tutoring",
          Component: Tutoring,
        },
        {
          heading: "Payment",
          Component: Payment,
        },
        {
          heading: "Important Rules",
          Component: ImportantRules as React.FC<{
            onCheck?: (checked: boolean) => void;
          }>,
        },
      ],
    },
    {
      id: 2,
      title: "General Information",
      description: "Hi Daniel! Welcome to Tafawwaq!",
    },
    {
      id: 3,
      title: "Subjects I Teach",
      description: "",
    },
    {
      id: 4,
      title: "Educational Background",
      description: "",
    },
    {
      id: 5,
      title: "Business at Tafawwaq",
      description: "",
    },
    {
      id: 6,
      title: "Public Profile",
      description: "",
    },
    {
      id: 7,
      title: "Tafawwaq Tutor Contract",
      description: "",
    },
    {
      id: 8,
      title: "Email Confirmation",
      description: "",
    },
  ];


  const [formData, setFormData] = useState<IProfile>({
    username: "John Smith",
    country: "",
    gender: undefined,
    birthDate: new Date(),
    whatsAppPhoneNumber: "",
    hourlyRate: {
      amount: 150,
      currency: "AED",
    },
    availability: {
      Sunday: { startTime: "09:00 AM", endTime: "5:00 PM" },
      Monday: { startTime: "09:00 AM", endTime: "5:00 PM" },
      Tuesday: { startTime: "09:00 AM", endTime: "5:00 PM" },
      Wednesday: { startTime: "09:00 AM", endTime: "5:00 PM" },
      Thursday: { startTime: "09:00 AM", endTime: "5:00 PM" },
      Friday: { startTime: "09:00 AM", endTime: "5:00 PM" },
      Saturday: { startTime: "09:00 AM", endTime: "5:00 PM" },
    },
  });

  // Component rendering based on current step
  const renderComponent = () => {
    if (currentStep === 1 && isStepContentWithSections(stepContent[0])) {
      return (
        <Polices
          setCurrentStep={setCurrentStep}
          sections={stepContent[0].sections}
        />
      );
    }
    switch (currentStep) {
      case 2:
        return (
          <GeneralInformation formData={formData} setFormData={setFormData} onValidationChange={setIsGeneralInfoValid} />
        );
      case 3:
        return <SubjectsTeach setFormData={setFormData} onValidationChange={setIsSubjectTeachValid} />;
      case 4:
        return <Educationalbackground setFormData={setFormData} onValidationChange={setIsEducationalBackgroundValid}
        />;
      case 5:
        return (
          <BusinessTafawwaq setFormData={setFormData} formData={formData} onValidationChange={setIsBusinessTafawwaqValid} />
        );
      case 6:
        return <PublicProfile setFormData={setFormData} formData={formData} onValidationChange={setIsPublicProfileValid} />;
      case 7:
        return <TutorContract onValidationChange={setIsTutorContractValid} />;
      case 8:
        return <EmailConfirmation />;
      default:
        return (
          <p className="text-gray-600">
            No additional content available for this step.
          </p>
        );
    }
  };
  const { enableDashboard, signupRole } = useDisableDashboard();
  const router = useRouter();

  const onClickNext = async () => {
    await updateProfile(formData);

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  useEffect(() => {
    if (currentStep) {
      switch (currentStep) {
        case 2:
          setIsNextOk(isGeneralInfoValid);
          break;
        case 3:
          setIsNextOk(isSubjectTeachValid);
          break;
        case 4:
          setIsNextOk(isEducationalBackgroundValid);
          break;
        case 5:
          setIsNextOk(isBusinessTafawwaqValid);
          break;
        case 6:
          setIsNextOk(isPublicProfileValid);
          break;
        case 7:
          setIsNextOk(isTutorContractValid);
          break;
        default:
          setIsNextOk(true);
      }
    }
  }, [
    currentStep,
    isGeneralInfoValid,
    isSubjectTeachValid,
    isEducationalBackgroundValid,
    isBusinessTafawwaqValid,
    isPublicProfileValid,
    isTutorContractValid,
  ]);

  return (
    <div className="mx-auto flex items-center py-20 flex-col min-w-0">
      <div className="w-full mx-auto px-4 min-w-0">
        <StepProgress
          steps={steps}
          currentStep={currentStep}
        // onStepClick={setCurrentStep}
        />
      </div>

      {/* Conditional Rendering Based on the Step */}
      <div className="mt-10 w-full max-w-[1400px] p-6 bg-white shadow-md rounded-md">
        {/* Display Title */}
        <h2 className="text-center text-3xl font-semibold mb-4 ">
          {stepContent[currentStep - 1]?.title}
        </h2>

        {/* Display Description if Available */}
        {(stepContent[currentStep - 1] as StepContentWithDescription)
          ?.description && (
            <p className="text-center text-gray-600 mb-4">
              {
                (stepContent[currentStep - 1] as StepContentWithDescription)
                  .description
              }
            </p>
          )}

        {/* Render the appropriate component for the current step */}
        {renderComponent()}

        {/* Navigation Buttons */}

        {currentStep > 1 && (
          <div className="mt-8 flex justify-between">
            <button
              className={`px-10 py-2 text-white ${currentStep === 1 ? "hidden" : "bg-primary hover:opacity-80"
                } rounded`}
              onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
              disabled={currentStep === 1}
            >
              Back
            </button>
            <button

              onClick={onClickNext}
              disabled={currentStep === steps.length}
              className={`px-10 py-2 text-white cursor-pointer ${currentStep === steps.length
                ? "hidden"
                : "bg-primary hover:opacity-80"
                } rounded`}

            // disabled={currentStep === steps.length}
            >
              Next
            </button>

            {currentStep === steps.length && (
              <button
                className={`px-10 py-2 text-white bg-primary hover:opacity-80 rounded`}
                onClick={() => {
                  enableDashboard();
                  if (signupRole === "student") {
                    router.push("/student");
                  } else if (signupRole === "teacher") {
                    router.push("/teacher");
                  }
                }}
              // disabled={currentStep === steps.length}
              >
                Go To Dashboard
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Info;
