"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getSession } from "next-auth/react";
import { Session } from "next-auth"; // Import Session from next-auth

export default function VCardQRCode() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData);
      setLoading(false); // Stop loading after session is fetched
    };

    fetchSession();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
    </div>
    );
  }

  if (session?.user) {
    return (
      <Link
        href={"/vcard"}
        className="text-xl bg-orange-600 rounded-lg px-3 py-2 w-fit text-white"
      >
        Create VCard QRCode
      </Link>
    );
  }

  return (
    <Link
      href={"/login"}
      className="text-xl bg-orange-500 rounded-lg px-3 py-2 w-fit text-white "
    >
      Login to your account
    </Link>
  );
}
