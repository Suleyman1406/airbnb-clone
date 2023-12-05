import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";
import ClientOnly from "@/app/components/client-only";
import EmptyState from "@/app/components/empty-state";
import Properties from "@/app/layout/properties";
import React from "react";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthroized" subTitle="Please login" />
      </ClientOnly>
    );
  }

  const properties = await getListings({
    userId: currentUser.id,
  });

  if (properties.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No property found"
          subTitle="Looks like you don't have property yet."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Properties currentUser={currentUser} listings={properties} />
    </ClientOnly>
  );
};

export default PropertiesPage;
