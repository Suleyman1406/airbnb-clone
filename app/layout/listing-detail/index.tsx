"use client";

import Container from "@/app/components/container";
import ListingHead from "@/app/components/listing-head";
import { categories } from "@/app/constant";
import { SafeListing, SafeUser } from "@/app/types";
import { Reservation, User } from "@prisma/client";
import React, { useMemo } from "react";

interface IListingDetailProps {
  listing: SafeListing & { user: SafeUser };
  currentUser?: SafeUser | null;
  reservations?: Reservation[];
}
const ListingDetail = ({
  listing,
  currentUser,
  reservations,
}: IListingDetailProps) => {
  const category = useMemo(
    () => categories.find((category) => listing.category === category.label),
    [listing.category]
  );
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </Container>
  );
};

export default ListingDetail;
