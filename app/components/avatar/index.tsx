import Image from "next/image";
import React from "react";

interface IAvatarProps {}
const Avatar = () => {
  return (
    <Image
      className="rounded-full"
      height={30}
      width={30}
      alt="Avatar"
      src={"/images/placeholder.jpg"}
    />
  );
};

export default Avatar;
