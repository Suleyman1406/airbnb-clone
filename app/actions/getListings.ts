import prisma from "@/app/libs/prismadb";

export default async function getListings() {
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
}
