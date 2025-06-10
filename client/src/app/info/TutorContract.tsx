"use client";
import { useEffect, useState } from "react";
import Joi from "joi";
import InputField from "../components/InputField";

interface TutorContractProps {
  onValidationChange: (isValid: boolean) => void;
}

const TutorContract: React.FC<TutorContractProps> = ({ onValidationChange }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Define Joi schema
  const schema = Joi.object({
    firstName: Joi.string().trim().required().label("First Name"),
    lastName: Joi.string().trim().required().label("Last Name"),
    acceptedTerms: Joi.boolean().valid(true).required().messages({
      "any.only": "You must accept the terms and conditions",
    }),
  });

  // Run validation when any field changes
  useEffect(() => {
    const { error } = schema.validate({ firstName, lastName, acceptedTerms });
    console.log(error)
    onValidationChange(!error);
  }, [firstName, lastName, acceptedTerms]);

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Agreement Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-header mb-3">
          Agreement And Terms For Tutoring
        </h2>
        <p className="text-xs text-text_secondary">
          This Design Service Agreement (the &quot;Agreement&quot;) is made and entered
          into on 21 Dec 2022 by and between [Client Name] (&quot;Client&quot;) and
          [Designer name] (&quot;Contractor&quot;).
        </p>
      </div>

      {/* Contract Body */}
      <div className="bg-background_blue p-5 py-10 rounded-md mb-8">
        {/* ... contract paragraphs ... */}
        <ul className="list-decimal pl-4 text-sm text-[#666666] mb-4 space-y-1">
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
        <div className="text-sm text-text_secondary mt-6 space-y-2">
          <p><span className="font-semibold text-black">Name:</span> Daniel Jobbar</p>
          <p><span className="font-semibold text-black">Dated:</span> 2/4/2024</p>
        </div>
      </div>

      {/* Checkbox Section */}
      <div className="mb-8">
        <div className="flex items-start">
          <input
            type="checkbox"
            className="mt-1 mr-2"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
          />
          <p className="text-sm text-text_secondary">
            I have read the term and condition
            <span className="text-red-500 font-semibold">*</span>
          </p>
        </div>
      </div>

      {/* Digital Signature Section */}
      <div className="mb-8">
        <h3 className="text-[#666666] mb-3">
          The following is the legal digital signature
        </h3>
        <div className="flex flex-col sm:flex-row mt-6 sm:space-y-0 sm:space-x-6">
          <InputField
            label="Legal First Name"
            type="text"
            placeholder="Danial"
            id="firstName"
            value={firstName}
            required={true}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <InputField
            label="Legal Last Name"
            type="text"
            placeholder="Jabbar"
            id="lastName"
            value={lastName}
            required={true}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default TutorContract;
