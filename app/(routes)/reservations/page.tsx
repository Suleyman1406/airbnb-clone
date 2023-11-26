import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import ClientOnly from "@/app/components/client-only";
import EmptyState from "@/app/components/empty-state";
import Reservations from "@/app/layout/reservations";
import React from "react";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthroized" subTitle="Please login" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No reservation Found"
          subTitle="Looks like you have no reservations on your property"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Reservations reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default ReservationsPage;
