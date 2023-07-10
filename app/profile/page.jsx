"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import man from "../../public/man.png";
import Image from "next/image";
const Profile = () => {
  const router = useRouter();
  const { data, status } = useSession();
  const signOutClick = () => {
    signOut();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center ">
        {data?.user.image ? (
          <Image
            src={data?.user.image}
            alt="user"
            width={100}
            height={100}
            className="rounded-full object-contain"
          />
        ) : (
          <Image
            src={man}
            alt="user"
            width={100}
            height={100}
            className="rounded-full object-contain"
          />
        )}
        <h3 className="font-bold text-lg mt-2 mb-2">{data?.user.name}</h3>
        <h4 className="font-semibold mb-6 text-md">{data?.user.email}</h4>
      </div>
      {data?.user.name ? (
        <button
          onClick={() => signOutClick()}
          className="bg-black py-2 px-6 rounded-lg text-white cursor-pointer"
        >
          sign Out
        </button>
      ) : (
        <button
          onClick={() => signIn()}
          className="bg-black py-2 px-6 rounded-lg text-white cursor-pointer"
        >
          sign in with gooogle
        </button>
      )}
    </div>
  );
};

export default Profile;
