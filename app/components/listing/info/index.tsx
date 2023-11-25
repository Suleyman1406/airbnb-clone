import Avatar from "@/app/components/avatar";
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import React from "react";
import { IconType } from "react-icons";
import ListingCategory from "../category";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("../../map"));

interface IListingInfoProps {
  user: SafeUser;
  category?: {
    icon: IconType;
    label: string;
    description: string;
  };
  bathroomCount: number;
  guestCount: number;
  roomCount: number;
  description: string;
  locationValue: string;
}

const ListingInfo = ({
  user,
  category,
  bathroomCount,
  guestCount,
  roomCount,
  description,
  locationValue,
}: IListingInfoProps) => {
  const { getByValue } = useCountries();
  const cordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2 ">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {user.name}</div>
          <Avatar src={user.image} />
        </div>
        <div>
          <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
            <div>{guestCount} guests</div>
            <div>{roomCount} rooms</div>
            <div>{bathroomCount} bathrooms</div>
          </div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={cordinates} />
    </div>
  );
};

export default ListingInfo;
