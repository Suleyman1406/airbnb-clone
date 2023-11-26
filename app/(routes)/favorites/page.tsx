import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavorites from "@/app/actions/getFavoriteListings";
import ClientOnly from "@/app/components/client-only";
import EmptyState from "@/app/components/empty-state";
import Favorites from "@/app/layout/favorites";
import React from "react";

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthroized" subTitle="Please login" />
      </ClientOnly>
    );
  }

  const favorites = await getFavorites();

  if (favorites.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subTitle="Looks like you have no favorite listings."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Favorites currentUser={currentUser} listings={favorites} />
    </ClientOnly>
  );
};

export default FavoritesPage;
