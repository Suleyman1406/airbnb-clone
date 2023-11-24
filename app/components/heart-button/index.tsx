"use client";
import { SafeUser } from "@/app/types";
import { cn } from "@/app/utils/helper";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface IHeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton = ({ listingId, currentUser }: IHeartButtonProps) => {
  const hasFavorited = false;
  const toggleFavorite = () => {};
  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-0.5 -right-0.5"
      />
      <AiFillHeart
        size={24}
        className={cn(hasFavorited ? "fill-rose-500" : "fill-neutral-500/70")}
      />
    </div>
  );
};

export default HeartButton;
