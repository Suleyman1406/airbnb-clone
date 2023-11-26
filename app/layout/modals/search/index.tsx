"use client";
import React, { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import qs from "query-string";

import { CountrySelectValue } from "@/app/types";
import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "@/app/components/modal";
import { formatISO } from "date-fns";
import Heading from "@/app/components/heading";
import CountrySelect from "@/app/components/country-select";
import Calendar from "@/app/components/calendar";
import CounterInput from "@/app/components/counter-input";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const searchModal = useSearchModal();
  const router = useRouter();
  const params = useSearchParams();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    key: "selection",
    startDate: new Date(),
    endDate: new Date(),
  });

  const Map = useMemo(
    () => dynamic(() => import("@/app/components/map"), { ssr: false }),
    [location]
  );

  const onBack = useCallback(() => {
    setStep((prev) => prev - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();

    router.push(url);
  }, [
    step,
    onNext,
    params,
    router,
    location,
    roomCount,
    dateRange,
    guestCount,
    searchModal,
    bathroomCount,
  ]);

  const actionLabel = useMemo(
    () => (step === STEPS.INFO ? "Search" : "Next"),
    [step]
  );

  const secondaryActionLabel = useMemo(
    () => (step === STEPS.LOCATION ? undefined : "Back"),
    [step]
  );

  const bodyContent = useMemo(() => {
    switch (step) {
      case STEPS.LOCATION:
        return (
          <div className="flex flex-col gap-8">
            <Heading
              title="Where do you wanna go?"
              subtitle="Find the perfect location!"
            />
            <CountrySelect
              value={location}
              onChange={(value) => setLocation(value)}
            />
            <hr />
            <div className="min-h-[35vh]">
              <Map center={location?.latlng} />
            </div>
          </div>
        );
      case STEPS.DATE:
        return (
          <div className="flex flex-col gap-8">
            <Heading
              title="When do you plan to go?"
              subtitle="Make sure everyone is free!"
            />
            <Calendar
              onChange={(value) => setDateRange(value.selection)}
              value={dateRange}
            />
          </div>
        );
      case STEPS.INFO:
        return (
          <div className="flex flex-col gap-8">
            <Heading
              title="More information"
              subtitle="Find your perfect place!"
            />
            <CounterInput
              onChange={setGuestCount}
              title="Guests"
              subTitle="How many guests are coming?"
              value={guestCount}
            />
            <CounterInput
              onChange={setRoomCount}
              title="Rooms"
              subTitle="How many rooms do you need?"
              value={roomCount}
            />
            <CounterInput
              onChange={setBathroomCount}
              title="Bathrooms"
              subTitle="How many bathrooms do you need?"
              value={bathroomCount}
            />
          </div>
        );
    }
  }, [step, Map, location, dateRange, guestCount, roomCount, bathroomCount]);

  return (
    <Modal
      title="Filters"
      actionLabel={actionLabel}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      isOpen={searchModal.isOpen}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
    />
  );
};

export default SearchModal;
