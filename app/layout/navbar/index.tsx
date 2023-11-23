"use client";

import React from "react";
import Container from "@/app/components/container";
import Logo from "./logo";
import Search from "./search";
import UserMenu from "./user-menu";
import { User } from "@prisma/client";

interface INavbarProps {
  currentUser?: User | null;
}

const Navbar = ({ currentUser }: INavbarProps) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div
        className="
          py-4 
          border-b-[1px]
        "
      >
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
