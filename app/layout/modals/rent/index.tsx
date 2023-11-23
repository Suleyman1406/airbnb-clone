"use client";

import CategoryInput from "@/app/components/category-input";
import CounterInput from "@/app/components/counter-input";
import CountrySelect from "@/app/components/country-select";
import Heading from "@/app/components/heading";
import ImageUpload from "@/app/components/image-upload";
import Input from "@/app/components/input";
import Map from "@/app/components/map";
import Modal from "@/app/components/modal";
import { categories } from "@/app/constant";
import useRentModal from "@/app/hooks/useRentModal";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const categoryValue = watch("category");
  const locationValue = watch("location");
  const guestCountValue = watch("guestCount");
  const roomCountValue = watch("roomCount");
  const bathroomCountValue = watch("bathroomCount");
  const imageSrcValue = watch("imageSrc");

  const Map = useMemo(
    () => dynamic(() => import("@/app/components/map"), { ssr: false }),
    [locationValue]
  );

  const setCustomValue = useCallback(
    (id: string, value: any) => {
      setValue(id, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [setValue]
  );

  const onBack = () => setStep((value) => value - 1);
  const onNext = () => setStep((value) => value + 1);

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    (data) => {
      if (step !== STEPS.PRICE) {
        return onNext();
      }
      setIsLoading(true);

      axios
        .post("/api/listings", data)
        .then(() => {
          toast.success("Listing created!");
          router.refresh();
          reset();
          setStep(STEPS.CATEGORY);
          rentModal.onClose();
        })
        .catch((err) => {
          let error = err.response.data;
          if (!error) {
            error = "Something went wrong!";
          }
          toast.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [step, router, reset, rentModal]
  );

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  const bodyContent = useMemo(() => {
    switch (step) {
      case STEPS.CATEGORY:
        return (
          <div className="flex flex-col gap-8">
            <Heading
              title="Which of these best describes your place?"
              subtitle="Pick a category"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
              {categories.map((category) => (
                <div key={category.label} className="col-span-1">
                  <CategoryInput
                    onClick={(value) => setCustomValue("category", value)}
                    selected={categoryValue === category.label}
                    label={category.label}
                    icon={category.icon}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      case STEPS.LOCATION:
        return (
          <div className="flex flex-col gap-8">
            <Heading
              title="Where is your place located?"
              subtitle="Help guests find you!"
            />
            <CountrySelect
              onChange={(value) => setCustomValue("location", value)}
              value={locationValue}
            />
            <div className="min-h-[35vh]">
              <Map center={locationValue?.latlng} />
            </div>
          </div>
        );
      case STEPS.INFO:
        return (
          <div className="flex flex-col gap-8">
            <Heading
              title="Share some basics about your place"
              subtitle="What amenities do you have?"
            />
            <CounterInput
              value={guestCountValue}
              onChange={(value) => setCustomValue("guestCount", value)}
              title="Guests"
              subTitle="How many guests do you allow?"
            />
            <hr />
            <CounterInput
              value={roomCountValue}
              onChange={(value) => setCustomValue("roomCount", value)}
              title="Rooms"
              subTitle="How many rooms do you have?"
            />
            <hr />
            <CounterInput
              value={bathroomCountValue}
              onChange={(value) => setCustomValue("bathroomCount", value)}
              title="Bathrooms"
              subTitle="How many bathrooms do you have?"
            />
          </div>
        );
      case STEPS.IMAGES:
        return (
          <div className="flex flex-col gap-8 ">
            <Heading
              title="Add a photo of your place"
              subtitle="Show guests what your place looks like!"
            />
            <ImageUpload
              value={imageSrcValue}
              onChange={(value) => setCustomValue("imageSrc", value)}
            />
          </div>
        );
      case STEPS.DESCRIPTION:
        return (
          <div className="flex flex-col gap-8 ">
            <Heading
              title="How would you describe your place?"
              subtitle="Short and sweet works best!"
            />
            <Input
              required
              id="title"
              label="Title"
              disabled={isLoading}
              register={register}
              errors={errors}
            />
            <hr />
            <Input
              required
              id="description"
              label="Description"
              disabled={isLoading}
              register={register}
              errors={errors}
            />
          </div>
        );
      case STEPS.PRICE:
        return (
          <div className="flex flex-col gap-8 ">
            <Heading
              title="Now set your price?"
              subtitle="How much do you charge per night!"
            />
            <Input
              formatPrice
              id="price"
              label="Price"
              disabled={isLoading}
              register={register}
              errors={errors}
            />
          </div>
        );
    }
  }, [
    Map,
    step,
    errors,
    register,
    isLoading,
    categoryValue,
    locationValue,
    imageSrcValue,
    setCustomValue,
    roomCountValue,
    guestCountValue,
    bathroomCountValue,
  ]);

  return (
    <Modal
      body={bodyContent}
      disabled={isLoading}
      title="Airbnb your home!"
      actionLabel={actionLabel}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
    />
  );
};

export default RentModal;
