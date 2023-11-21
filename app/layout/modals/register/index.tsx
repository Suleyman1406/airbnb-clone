"use client";

import axios from "axios";
import React, { useCallback, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import userRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "@/app/components/modal";

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
          console.error(err);
        });
    },
    [onClose]
  );

  return (
    <Modal
      onSubmit={handleSubmit(onSubmit)}
      title="Register"
      actionLabel="Continue"
      isOpen={isOpen}
      disabled={isLoading}
      onClose={onClose}
    ></Modal>
  );
};

export default RegisterModal;
