import prisma from "@/app/libs/prismadb";
import { SafeListing } from "../types";

export default async function getListings(): Promise<SafeListing[]> {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      updatedAt: listing.updatedAt.toISOString(),
    }));
    return safeListings;
  } catch (error) {
    console.error(error);
    return [];
  }
}
