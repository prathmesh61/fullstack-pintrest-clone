"use client";
import { useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import { BsFillBellFill } from "react-icons/bs";
import { AiFillMessage } from "react-icons/ai";
import { useSession, signIn } from "next-auth/react";
const Header = () => {
  const router = useRouter();
  const { data, status } = useSession();
  const onCreateClick = () => {
    if (data) {
      router.push("/create-pin");
    } else {
      signIn();
    }
  };
  return (
    <div className="flex justify-between items-center gap-2">
      <div className="flex gap-4 justify-center items-center ">
        <Image
          src="/logo.png"
          width={40}
          height={40}
          alt="logo"
          className="cursor-pointer"
          onClick={() => router.push("/")}
        />
        <Link
          href="/create-pin"
          className="cursor-pointer"
          onClick={() => onCreateClick()}
        >
          Create Pin
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
          <Link
            href={`/profile/${data?.user.email}`}
            className="cursor-pointer text-sm font-bold"
          >
            <Image
              src={data?.user.image}
              width={30}
              height={30}
              alt="man-profile"
              className="cursor-pointer rounded-full object-cover"
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
