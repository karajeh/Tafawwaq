import clsx from "clsx";
import React from "react";

interface Career {
  id: number;
  title: string;
  category: string;
  tag: {
    name: string;
    color: string;
  };
  description: string;
  responsibilities: string;
  requirements: string;
  deadline: string;
  location: string;
  employmentType: string;
}

type Props = {
  id: number;
  title: string;
  category: string;
  description: string;
  tag: {
    name: string;
    color: string;
  };
  responsibilities?: string;
  requirements?: string;
  deadline?: Date | string;
  location?: string;
  employmentType: string;
  onEdit?: (career: Career) => void;
};

function CareerCard({ onEdit, ...career }: Props) {
  const handleEdit = () => {
    const completeCareer: Career = {
      ...career,
      responsibilities: career.responsibilities || "",
      requirements: career.requirements || "",
      deadline: career.deadline ? career.deadline.toString() : "",
      location: career.location || "",
    };
    onEdit?.(completeCareer);
  };

  return (
    <div className="border border-slate p-6 rounded-2xl relative">
      <button
        onClick={handleEdit}
        className="absolute right-3 top-3 text-primary text-sm font-semibold flex gap-2 items-center"
      >
        Edit <ArrowRight />
      </button>
      <div>
        <p className=" text-sm  text-secondary font-semibold">
          {career.category}
        </p>
        <div className=" flex items-center gap-2 mt-1">
          <p className=" text-[#101828] text-lg font-medium">{career.title}</p>
          <div
            style={{
              color: career.tag.color,
              backgroundColor: `${career.tag.color}1f`,
            }}
            className={clsx(
              "font-normal text-sm px-3 py-1 rounded-full flex items-center gap-1.5"
            )}
          >
            <svg
              width="6"
              height="7"
              viewBox="0 0 6 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="3" cy="3.95801" r="3" fill={career.tag.color} />
            </svg>
            <p>{career.tag.name}</p>
          </div>
        </div>
      </div>
      <p className=" text-sm  mt-4 font-medium  text-[#475467]">
        {career.description}
      </p>
      <div className=" flex mt-4 gap-6">
        <div className=" text-[#475467] font-medium flex items-center gap-2">
          <svg
            width="16"
            height="20"
            viewBox="0 0 16 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.00065 10.3745C9.38136 10.3745 10.5007 9.25522 10.5007 7.87451C10.5007 6.4938 9.38136 5.37451 8.00065 5.37451C6.61994 5.37451 5.50065 6.4938 5.50065 7.87451C5.50065 9.25522 6.61994 10.3745 8.00065 10.3745Z"
              stroke="#98A2B3"
              stroke-width="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.00065 18.2912C9.66732 14.9578 14.6673 12.8064 14.6673 8.29118C14.6673 4.60928 11.6825 1.62451 8.00065 1.62451C4.31875 1.62451 1.33398 4.60928 1.33398 8.29118C1.33398 12.8064 6.33398 14.9578 8.00065 18.2912Z"
              stroke="#98A2B3"
              stroke-width="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {career.location}
        </div>
        <div className=" text-[#475467] font-medium flex items-center gap-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.99935 4.95785V9.95785L13.3327 11.6245M18.3327 9.95785C18.3327 14.5602 14.6017 18.2912 9.99935 18.2912C5.39698 18.2912 1.66602 14.5602 1.66602 9.95785C1.66602 5.35547 5.39698 1.62451 9.99935 1.62451C14.6017 1.62451 18.3327 5.35547 18.3327 9.95785Z"
              stroke="#98A2B3"
              stroke-width="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {career.employmentType}
        </div>
      </div>
    </div>
  );
}

export default CareerCard;

const ArrowRight = () => {
  return (
    <svg
      width="10"
      height="11"
      viewBox="0 0 10 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.833984 10.1248L9.16732 1.7915M9.16732 1.7915H0.833984M9.16732 1.7915V10.1248"
        stroke="#00ADEF"
        stroke-width="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
