"use client";

import Container from "@/app/components/container";
import { categories } from "@/app/constant";
import React from "react";
import CategoryBox from "./box";
import { usePathname, useSearchParams } from "next/navigation";

const Categories = () => {
  const params = useSearchParams();
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  const categoryName = params?.get("category");

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((category) => (
          <CategoryBox
            key={category.label}
            label={category.label}
            icon={category.icon}
            selected={categoryName === category.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
