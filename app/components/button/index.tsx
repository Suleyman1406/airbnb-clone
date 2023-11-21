"use client";

import { cn } from "@/app/utils/helper";
import React from "react";
import { IconType } from "react-icons";

interface IButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  Icon?: IconType;
}

const Button = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  Icon,
}: IButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full",
        outline
          ? "bg-white border-black text-black"
          : "bg-rose-500 border-rose-500 text-white",
        small
          ? "py-1 text-sm font-light border-[1px]"
          : "py-3 text-md font-semibold border-[2px]"
      )}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
};

export default Button;
