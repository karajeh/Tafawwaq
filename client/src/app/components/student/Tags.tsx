import React from "react";

interface TagsProps {
  tags: string[];
}

const Tags: React.FC<TagsProps> = ({ tags }) => {
  return (
    <div className="mt-2 flex gap-2">
      {tags.map((tag, index) => (
        <span key={index} className="bg-gray-200 rounded-full px-3 py-1 text-[12px]">
          {tag}
        </span>
      ))}
    </div>
  );
};

export default Tags;
