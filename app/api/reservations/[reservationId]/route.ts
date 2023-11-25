import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
  reservationId?: string;
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
    const { reservationId } = params;
    if (!reservationId || typeof reservationId !== "string") {
      return new NextResponse("Reservation id is required!", { status: 400 });
    }

    const reservation = await prisma.reservation.delete({
      where: {
        id: reservationId,
        OR: [
          { userId: currentUser.id },
          { listing: { userId: currentUser.id } },
        ],
      },
    });
    return NextResponse.json(reservation);
  } catch (err) {
    console.error("RESERVATION_DELETE", err);
    return new NextResponse("Internal error.", { status: 500 });
  }
}
