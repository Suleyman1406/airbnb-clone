"use client";
import Container from "@/app/components/container";
import Heading from "@/app/components/heading";
import ListingCard from "@/app/components/listing/card";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { Listing, Reservation, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ITripsProps {
  reservations: (SafeReservation & { listing: SafeListing })[];
  currentUser: SafeUser;
}

const Trips = ({ reservations, currentUser }: ITripsProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation canceled");
          router.refresh();
        })
        .catch((err) => {
          toast.error(err?.response?.data.error ?? "Something went wrong!");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            actionLabel="Cancel reservation"
            disabled={deletingId === reservation.id}
            onAction={onCancel}
            actionId={reservation.id}
            reservation={reservation}
          />
        ))}
      </div>
    </Container>
  );
};

export default Trips;
