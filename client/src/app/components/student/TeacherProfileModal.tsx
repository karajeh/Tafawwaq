'use client';
import React, { useEffect, useState, useRef } from "react";
import { Button } from "../admin-panel/ui/button";
import TutorProfile from "./TutorProfile";
import { motion } from "framer-motion";
import { TutorCardProps } from "../TutorCard";

const TeacherProfileModal: React.FC<TutorCardProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  // Animation variants for sliding effect
  const slideInAnimation = {
    hidden: { x: "100%" },
    visible: { x: 0 },
    exit: { x: "100%" },
  };

  // Close modal if clicked outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Button to open the modal */}
      <Button
        onClick={openModal}
        color="button_primary"
        className="bg-primary cursor-pointer border-primary w-fit"
      >
        View Full Profile
      </Button>

      {/* Modal with backdrop */}
      {isOpen && (
        <div className="fixed top-0 right-0 w-full h-screen bg-gray-900 bg-opacity-70 z-50 flex items-start justify-end">
          {/* Background overlay with blur */}
          <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-md"></div>

          {/* Motion div for sliding effect */}
          <motion.div
            ref={modalRef}
            className="max-w-[616px] w-full relative"
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            variants={slideInAnimation}
          >
            {/* Tutor profile content */}
            <TutorProfile {...props} />

            {/* Close button */}
            <button
              onClick={closeModal}
              className="text-black py-2 px-4 rounded-md mt-0 absolute right-2 top-2"
            >
              {CircleIcon}
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default TeacherProfileModal;

const CircleIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);
