import React from "react";

type AvatarProps = {
  name?: string;
  lastName?: string;
};
const Avatar = ({ lastName, name }: AvatarProps) => {
  const firstLetter = name?.at(0) ?? "";
  const secondLetter = lastName?.at(0) ?? "";

  return (
    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-medium text-gray-600 dark:text-gray-300">
        {firstLetter}
      </span>
      <span className="font-medium text-gray-600 dark:text-gray-300">
        {secondLetter}
      </span>
    </div>
  );
};

export default Avatar;
