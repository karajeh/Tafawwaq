import React from "react";

const EmailConfirmation = () => {

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Card Container */}
      <div className="bg-white shadow rounded-lg px-14 md:px-28 py-20">
        <p className="text-lg text-gray-800 mb-2 text-center">
          Welcome to Tafawwaq Smiles Danial!
        </p>

        {/* Confirmation Message */}
        <ul className="list-disc list-inside text-[#666666] space-y-6 my-5 ">
          <li>
            We&apos;ve sent a confirmation email to{" "}
            <span className="font-medium">danialjabbarbwp@gmail.com</span>.
            Please check your inbox and click on the confirmation link to
            proceed.
          </li>
        </ul>

        {/* <div className='flex justify-end mt-8'>
            <button className="px-4 py-2 text-white bg-priv hover:bg-blue-600 rounded">Go To Dashboard</button>
        </div> */}
      </div>
    </div>
  );
};

export default EmailConfirmation;
