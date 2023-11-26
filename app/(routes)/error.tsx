"use client";
import React, { useEffect } from "react";
import EmptyState from "../components/empty-state";

interface IErrorStateProps {
  error: Error;
}
const ErrorState = ({ error }: IErrorStateProps) => {
  useEffect(() => {}, [error]);
  return <EmptyState title="Uh Oh" subTitle="Something went wrong!" />;
};

export default ErrorState;
