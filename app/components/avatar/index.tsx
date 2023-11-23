import Image from "next/image";
import React from "react";

interface IAvatarProps {
  src?: string | null;
}
const Avatar = ({ src }: IAvatarProps) => {
  return (
    <Image
      className="rounded-full"
      height={30}
      width={30}
      alt="Avatar"
      src={src ?? "/images/placeholder.jpg"}
    />
  );
};

export default Avatar;
