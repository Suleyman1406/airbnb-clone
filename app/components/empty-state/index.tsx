"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Heading from "../heading";
import Button from "../button";

interface IEmptyStateProps {
  title?: string;
  subTitle?: string;
  showReset?: boolean;
}

const EmptyState = ({
  title = "No exact matches",
  subTitle = "Try changing or removing some of your titles",
  showReset,
}: IEmptyStateProps) => {
  const router = useRouter();

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} subtitle={subTitle} center />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Remove All filters"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
