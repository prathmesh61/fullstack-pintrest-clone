"use client";

import Image from "next/image";
import Link from "next/link";
import { BsFillBellFill } from "react-icons/bs";
import { AiFillMessage } from "react-icons/ai";
import { useSession } from "next-auth/react";
const Header = () => {
  const { data, status } = useSession();

  return (
    <div className="flex justify-between items-center  gap-2">
      <Image
        src="/logo.png"
        width={40}
        height={40}
        alt="logo"
        className="cursor-pointer"
      />
      <div className="flex gap-2 justify-center items-center ml-2">
        <Link href="/" className="cursor-pointer">
          Home
        </Link>
        <Link href="/create-pin" className="cursor-pointer">
          Create
        </Link>
      </div>
      <div className="w-[70%] flex justify-center items-center  border-gray-300 ">
        <input
          type="text"
          name="input"
          placeholder="Search Any..."
          className="w-full border-none p-2 outline-none bg-gray-200 rounded-xl "
        />
      </div>
      <div className="flex justify-center items-center gap-4">
        <BsFillBellFill className="cursor-pointer w-8 h-8" />
        <AiFillMessage className="cursor-pointer w-8 h-8" />
        {data?.user.name ? (
          <Link href="/profile" className="cursor-pointer text-sm font-bold">
            <Image
              src="/man.png"
              width={30}
              height={30}
              alt="man-profile"
              className="cursor-pointer"
            />
          </Link>
        ) : (
          <Link href="/login" className="cursor-pointer">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
