import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import ClientOnly from "@/app/components/client-only";
import EmptyState from "@/app/components/empty-state";
import Trips from "@/app/layout/trips";
import React from "react";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthroized" subTitle="Please login" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No trips Found"
          subTitle="Looks like you have not reserved any trips"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Trips reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default TripsPage;
