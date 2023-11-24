import prisma from "@/app/libs/prismadb";
import { SafeListing, SafeUser } from "../types";

interface IParams {
  listingId?: string;
}

export default async function getListingById({
  listingId,
}: IParams): Promise<(SafeListing & { user: SafeUser }) | null> {
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });
    if (!listing) {
      return null;
    }

    return {
      ...listing,
      user: {
        ...listing.user,
        emailVerified: listing.user.emailVerified?.toISOString() || null,
        createdAt: listing.createdAt.toISOString(),
        updatedAt: listing.updatedAt.toISOString(),
      },
      createdAt: listing.createdAt.toISOString(),
      updatedAt: listing.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
