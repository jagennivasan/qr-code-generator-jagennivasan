"use client";

import { signOut } from "next-auth/react";

export default function SignOutBtn() {
  return (
    <button
      className=" font-bold text-red-600"
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/`,
        })
      }
    >
      Sign Out
    </button>
  );
}
