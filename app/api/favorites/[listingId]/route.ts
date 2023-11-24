import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  listingId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return new NextResponse("Unauthorized.", { status: 401 });
  }

  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") {
    return new NextResponse("Invalid Listing Id.", { status: 400 });
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds.push(listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return new NextResponse("Unauthorized.", { status: 401 });
  }

  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") {
    return new NextResponse("Invalid Listing Id.", { status: 400 });
  }

  let favoriteIds = (currentUser.favoriteIds ?? []).filter(
    (id) => id !== listingId
  );

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}
