"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import React, { useMemo } from "react";
import Heading from "../heading";

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
    </>
  );
};

export default ListingHead;
