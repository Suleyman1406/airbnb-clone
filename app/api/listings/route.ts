import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized.", { status: 401 });
    }

    const body = await request.json();

    const {
      category,
      location,
      guestCount,
      roomCount,
      bathroomCount,
      imageSrc,
      price,
      title,
      description,
    } = body;

    if (!category) {
      return new NextResponse("Category is required", { status: 400 });
    }
    if (!location) {
      return new NextResponse("Location is required", { status: 400 });
    }
    if (!imageSrc) {
      return new NextResponse("Image is required", { status: 400 });
    }
    if (
      !guestCount ||
      !roomCount ||
      !bathroomCount ||
      !price ||
      !title ||
      !description
    ) {
      return new NextResponse("All fields are required!", { status: 400 });
    }

    const listing = await prisma.listing.create({
      data: {
        price: parseInt(price, 10),
        title,
        category,
        imageSrc,
        roomCount,
        guestCount,
        description,
        bathroomCount,
        userId: currentUser.id,
        locationValue: location.value,
      },
    });

    return NextResponse.json(listing);
  } catch (err) {
    console.error("LISTING_POST", err);
    return new NextResponse("Internal error.", { status: 500 });
  }
}
