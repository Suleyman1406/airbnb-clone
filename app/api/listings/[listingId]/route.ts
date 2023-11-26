import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
  listingId?: string;
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized.", { status: 401 });
    }
    const { listingId } = params;
    if (!listingId || typeof listingId !== "string") {
      return new NextResponse("Listing id is required!", { status: 400 });
    }

    const deletedListing = await prisma.listing.delete({
      where: {
        id: listingId,
        userId: currentUser.id,
      },
    });
    return NextResponse.json(deletedListing);
  } catch (err) {
    console.error("LISTING_DELETE", err);
    return new NextResponse("Internal error.", { status: 500 });
  }
}
