"use client";

import { cn } from "@/app/utils/helper";
import React from "react";
import { IconType } from "react-icons";

interface ICategoryInputProps {
  label: string;
  icon: IconType;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryInput = ({
  label,
  icon: Icon,
  selected,
  onClick,
}: ICategoryInputProps) => {
  return (
    <div
      className={cn(
        "rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer",
        selected ? "border-black" : "border-neutral-200"
      )}
      onClick={() => onClick(label)}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
