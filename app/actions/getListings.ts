import prisma from "@/app/libs/prismadb";

export default async function getListings() {
  const listings = await prisma.listing.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return listings;
}
