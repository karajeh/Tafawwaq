import React from "react";

const ReviewSection: React.FC = () => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold">Reviews</h2>
      <div className=" flex items-center justify-between mt-2">
        <h2 className="text-lg font-semibold">Kristin Watson</h2>
        <div className="flex items-center gap-2 mt-2">
          {new Array(5).fill(0).map((_, index) => (
            <RatingStar key={index} />
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-1">
        Lorem ipsum dolor sit amet consectetur. Sit enim semper suspendisse vel
        purus scelerisque dignissim semper. Tellus mattis blandit eu nunc
        volutpat sed nibh vulputate.
      </p>

      {/* <div className="text-xs text-gray-500 mt-2">
        <span>Helpful?</span>
        <span className="ml-2 text-primary">Yes (2)</span>
        <span className="ml-2 text-primary">No (0)</span>
        <span className="float-right">Nov 09, 2022</span>
      </div> */}
      <div className=" flex justify-end mt-2 text-sm">
        {/* <div className=" text-gray-500">
          <span>Color: Cinnamon</span>
          <span className="ml-2">Size: 6</span>
          <i className="fas fa-check-circle text-green-500 ml-2"></i>
        </div> */}
        <span className="text-green-500 ">Recommended</span>
      </div>
    </div>
  );
};

export default ReviewSection;

const RatingStar = () => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.50829 0.704956L9.45863 5.33218L14.2474 5.87125L10.662 9.25027L11.6538 14.2024L7.48775 11.6633L3.31199 14.1851L4.32258 9.2368L0.75 5.8431L5.54053 5.32397L7.50829 0.704956Z"
        fill="#FFB400"
      />
    </svg>
  );
};
