'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Button from './Button';

export default function FAQ() {
  const router = useRouter();

  return (
    <div className="text-black bg-[#F5F8FA] grid px-3 md:px-8 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-4 py-16 content-center">
      {/* <div className="mr-auto place-self-center col-span-2 px-4 md:px-8 "> */}
      <div className="mx-auto place-self-center col-span-2">
        <h2 className="text-5xl font-bold text-black mb-8 leading-snug">
          Got <span className="text-primary"> questions? </span>
          <br />
          We`ve got <span className="text-secondary"> answers!</span>
        </h2>

        <div className="flex justify-center items-center my-6">
          <div className=" flex w-1/2 justify-center">
            <Button
              label="View All"
              onClick={() => router.push('/faq')}
              classNames="rounded-xl w-52 py-4"
            />
          </div>
        </div>
      </div>

      <div className="lg:mt-0 px-4 lg:flex col-span-2">
        <Dropdowns />
      </div>
    </div>
  );
}

const Dropdowns: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null); // Keeps track of which accordion is open

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index); // Open or close the accordion
  };

  return (
    <section className="w-full">
      <div
        className="accordion-group space-y-4"
        data-accordion="default-accordion"
      >
        {accordionItems.map((item, index) => (
          <div
            key={index}
            className={`accordion  p-4 rounded-xl transition duration-500 lg:p-4 bg-white ${
              openAccordion === index
                ? 'accordion-active:bg-indigo-50 accordion-active:border-indigo-600'
                : ''
            }`}
          >
            <button
              // className="accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 text-gray-900 w-full transition duration-500 hover:text-indigo-600"
              className="accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 text-gray-900 w-full"
              onClick={() => toggleAccordion(index)}
              aria-controls={`accordion-content-${index}`}
            >
              <h5 className="text-md font-semibold">{item.title}</h5>

              <svg
                className={`w-6 h-6 transition duration-500 ${
                  openAccordion === index ? 'hidden' : 'block'
                }`}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12H18M12 18V6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <svg
                className={`w-6 h-6 transition duration-500 ${
                  openAccordion === index ? 'block' : 'hidden'
                }`}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12H18"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
            <div
              id={`accordion-content-${index}`}
              className={`accordion-content w-full overflow-hidden transition-max-height duration-500 ${
                openAccordion === index ? 'max-h-[250px]' : 'max-h-0'
              }`}
            >
              <p className="text-base text-[#65676C] font-normal leading-6 mt-3">
                {item.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const accordionItems = [
  {
    title: 'How do I register to be a tutor listed on Tafawwaq?',
    content: `To register as a tutor on Tafawwaq, simply navigate to the "Sign Up" page. Choose the tutor registration option, complete the application with your details, expertise, and experience, and submit any necessary documentation. Once your profile is reviewed and approved, you’ll be ready to start tutoring on Tafawwaq!`,
  },
  {
    title: 'How do I set my rate and offer discounts?',
    content:
      'You can set your own hourly rate with a minimum starting fee. Additionally, you have the freedom to create special discount packages for multiple-hour bookings, allowing flexibility for students who prefer extended or bundled sessions.',
  },
  {
    title: 'Can I choose my own schedule?',
    content:
      'Yes! Tafawwaq allows complete flexibility with scheduling. You can set your available hours and adjust them as needed, making it easy to balance tutoring with other commitments.',
  },
  {
    title: 'Can I have online lessons using my tablet?',
    content:
      'If you have Chrome installed, you may be able to launch a lesson using your tablet. However, we would recommend running the site on a laptop or desktop for best performance.',
  },
];

// const accordionItems = [
//   {
//     title: "How can I reset my password?",
//     content:
//       "To reset your password, find the 'Forgot Password' option on the login page, follow the instructions, and you'll receive an email to reset your password.",
//   },
//   {
//     title: "How do I update my billing information?",
//     content:
//       "To update your billing information, go to the 'Billing' section in your account settings and update the necessary information.",
//   },
//   {
//     title: "How can I contact customer support?",
//     content:
//       "You can contact customer support via the 'Help' section in the platform or by sending an email to support@example.com.",
//   },
//   {
//     title: "How do I delete my account?",
//     content:
//       "To delete your account, go to your account settings, find the 'Delete Account' option, and follow the instructions. Please note this action is irreversible.",
//   },
// ];
