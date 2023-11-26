"use client";
import Container from "@/app/components/container";
import Heading from "@/app/components/heading";
import ListingCard from "@/app/components/listing/card";
import { SafeListing, SafeUser } from "@/app/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface IProperties {
  currentUser: SafeUser;
  listings: SafeListing[];
}

const Properties = ({ currentUser, listings }: IProperties) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing deleted");
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
      <Heading title="Properties" subtitle="List of properties you have!" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            data={listing}
            key={listing.id}
            onAction={onCancel}
            actionId={listing.id}
            currentUser={currentUser}
            actionLabel="Delete property"
            disabled={deletingId === listing.id}
          />
        ))}
      </div>
    </Container>
  );
};

export default Properties;
