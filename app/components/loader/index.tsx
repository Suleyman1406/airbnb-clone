"use client";
import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 h-[100vh] w-[100vw] bg-white text-rose-500 font-bold uppercase flex flex-col justify-center items-center z-50">
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="rgb(244,63,94)"
        ariaLabel="three-dots-loading"
        visible={true}
      />
      Loading...
    </div>
  );
};

export default Loader;
