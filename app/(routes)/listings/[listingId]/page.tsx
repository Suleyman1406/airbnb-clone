import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/empty-state";
import ListingDetail from "@/app/layout/listing-detail";
import React from "react";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <EmptyState title="Listing Not Found" subTitle="Try going to back home" />
    );
  }

  return (
    <div>
      <ListingDetail currentUser={currentUser} listing={listing} />
    </div>
  );
};

export default ListingPage;
