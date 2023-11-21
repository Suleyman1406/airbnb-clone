"use client";

import React from "react";

interface IUserMenuItemProps {
  onClick: () => void;
  label: string;
}

const UserMenuItem = ({ onClick, label }: IUserMenuItemProps) => {
  return (
    <div
      onClick={onClick}
      className="
        px-4 
        py-3 
        hover:bg-neutral-100 
        transition
        font-semibold
      "
    >
      {label}
    </div>
  );
};

export default UserMenuItem;
