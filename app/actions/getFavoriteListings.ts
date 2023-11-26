import prisma from "@/app/libs/prismadb";
import { SafeListing, SafeReservation } from "../types";
import getCurrentUser from "./getCurrentUser";

export default async function getFavorites(): Promise<SafeListing[]> {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favoriteListings = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeFavoriteListings = favoriteListings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      updatedAt: listing.updatedAt.toISOString(),
    }));
    return safeFavoriteListings;
  } catch (error) {
    console.error(error);
    return [];
  }
}
