"use client";
import Container from "@/app/components/container";
import Heading from "@/app/components/heading";
import ListingCard from "@/app/components/listing/card";
import { SafeListing, SafeUser } from "@/app/types";
import React from "react";

interface IProperties {
  currentUser: SafeUser;
  listings: SafeListing[];
}

const Properties = ({ currentUser, listings }: IProperties) => {
  return (
    <Container>
      <Heading title="Properties" subtitle="List of properties you have!" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            data={listing}
            key={listing.id}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default Properties;
