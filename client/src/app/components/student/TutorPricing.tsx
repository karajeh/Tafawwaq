import React from "react";

const TutorPricing: React.FC = () => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold">Tutor Pricing Discounts</h2>
      <p className="text-gray-700">
        1 hour is <strong className="text-primary">AED 100</strong>, and 2 hours for{" "}
        <strong className="text-primary">AED 300</strong>.
      </p>
    </div>
  );
};

export default TutorPricing;
