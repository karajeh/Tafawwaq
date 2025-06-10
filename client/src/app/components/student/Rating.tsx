import React from "react";
import { EmptyStarIcon, FilledStarIcon } from "./TeacherCard";

interface RatingProps {
  rating: number;
  reviews: number;
}

const Rating: React.FC<RatingProps> = ({ rating, reviews }) => {
  return (
    <div className="flex items-center mt-2">
      <div className="flex gap-1.5 items-center justify-center">
        {new Array(3).fill(0).map((_, index) => (
          <FilledStarIcon key={index} />
        ))}
        {new Array(5 - 3).fill(0).map((_, index) => (
          <EmptyStarIcon key={index} />
        ))}
      </div>
      <p className="ml-2 text-sm text-gray-500">
        ({rating} / {reviews})
      </p>
    </div>
  );
};

export default Rating;
