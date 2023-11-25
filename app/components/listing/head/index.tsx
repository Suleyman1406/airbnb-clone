"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import React, { useMemo } from "react";
import Heading from "../../heading";
import Image from "next/image";
import HeartButton from "../../heart-button";

interface IListingHeadProps {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead = ({
  title,
  imageSrc,
  locationValue,
  currentUser,
  id,
}: IListingHeadProps) => {
  const { getByValue } = useCountries();
  const location = useMemo(
    () => getByValue(locationValue),
    [getByValue, locationValue]
  );

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          alt="Listing Detail Image"
          src={imageSrc}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
