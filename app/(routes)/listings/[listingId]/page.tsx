import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";
import ClientOnly from "@/app/components/client-only";
import EmptyState from "@/app/components/empty-state";
import ListingDetail from "@/app/layout/listing-detail";
import React from "react";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const [listing, reservations, currentUser] = await Promise.all([
    getListingById(params),
    getReservations(params),
    getCurrentUser(),
  ]);

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState
          title="Listing Not Found"
          subTitle="Try going to back home"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingDetail
        currentUser={currentUser}
        listing={listing}
        reservations={reservations}
      />
    </ClientOnly>
  );
};

export default ListingPage;
