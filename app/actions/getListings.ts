import prisma from "@/app/libs/prismadb";
import { SafeListing } from "../types";

interface IParams {
  userId?: string;
}

export default async function getListings(
  params: IParams
): Promise<SafeListing[]> {
  try {
    const query: any = {};
    if (params.userId) {
      query.userId = params.userId;
    }
    const listings = await prisma.listing.findMany({
      where: query,
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
