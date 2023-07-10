"use client";

import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

import { useRouter } from "next/navigation";
import Link from "next/link";
const Login = () => {
  const router = useRouter();
  const { data, status } = useSession();
  const signinWithGoogle = () => {
    signIn("google");
    if (data.user.name) {
      router.push("/");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {status === "authenticated" ? (
        <Link
          href="/"
          className="bg-black py-2 px-6 rounded-lg text-white  cursor-pointer"
        >
          Go To Home Page
        </Link>
      ) : (
        <button
          onClick={signinWithGoogle}
          className="bg-black py-2 px-6 rounded-lg text-white cursor-pointer"
        >
          sign in with gooogle
        </button>
      )}
    </div>
  );
};

export default Login;
