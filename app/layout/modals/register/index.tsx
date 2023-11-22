"use client";

import axios from "axios";
import React, { useCallback, useMemo, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import userRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "@/app/components/modal";
import Heading from "@/app/components/heading";
import Input from "@/app/components/input";
import toast from "react-hot-toast";
import Button from "@/app/components/button";

const RegisterModal = () => {
  const { isOpen, onClose } = userRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    (data) => {
      setIsLoading(true);

      axios
        .post("/api/register", data)
        .then((response) => {
          onClose();
        })
        .catch((err) => {
          toast.error("Something went wrong!");
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [onClose]
  );

  const bodyContent = useMemo(
    () => (
      <div className="flex flex-col gap-4">
        <Heading title="Welcome to Airbnb" subtitle="Create an account" />
        <Input
          required
          id="email"
          label="Email"
          errors={errors}
          disabled={isLoading}
          register={register}
        />
        <Input
          required
          id="name"
          label="Name"
          errors={errors}
          disabled={isLoading}
          register={register}
        />
        <Input
          required
          type="password"
          id="password"
          label="Password"
          errors={errors}
          disabled={isLoading}
          register={register}
        />
      </div>
    ),
    [isLoading, errors, register]
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        Icon={FcGoogle}
        onClick={() => 0}
      />
      <Button
        outline
        label="Continue with Github"
        Icon={AiFillGithub}
        onClick={() => 0}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row justify-center items-center gap-2">
          <div>Already have an account?</div>
          <div
            onClick={onClose}
            className="text-stone-800 cursor-pointer hover:underline"
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      onSubmit={handleSubmit(onSubmit)}
      title="Register"
      actionLabel="Continue"
      isOpen={isOpen}
      disabled={isLoading}
      onClose={onClose}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
