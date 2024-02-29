"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export const LoginButton = () => {
  return (
    <button
      onClick={() => signIn()}
      className={"bg-gray-400/50 px-5 py-3 rounded-2xl"}
    >
      Sign in
    </button>
  );
};

export const RegisterButton = () => {
  return (
    <Link href={"/register"} className={"bg-gray-400/50 px-5 py-3 rounded-2xl"}>
      Register
    </Link>
  );
};

export const LogoutButton = () => {
  return (
    <button
      onClick={() => signOut()}
      className={"bg-gray-400/50 px-5 py-3 rounded-2xl"}
    >
      Sign Out
    </button>
  );
};

export const ProfileButton = () => {
  return (
    <Link href={"/profile"} className={"bg-gray-400/50 px-5 py-3 rounded-2xl"}>
      Profile
    </Link>
  );
};
