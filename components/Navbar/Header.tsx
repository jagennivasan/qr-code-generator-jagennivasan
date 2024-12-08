"use client";

import Link from "next/link";

import { useState } from "react";
import { IoReorderThreeOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useSession } from "next-auth/react"; // Import useSession hook
import { Button } from "../ui/button";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import Image from "next/image";
import logo from "@/public/QRCaptain.svg";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession(); // Get session data and status

  // Determine if the session is still loading
  const isLoading = status === "loading";

  // Render based on session status
  const authLinks = isLoading ? (
    <div className="border border-blue-300 shadow rounded-md px-4 py-1 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-slate-700 h-10 w-10"></div>
        <div className="flex-1 px-10 py-1">
          <div className="h-2 bg-slate-700 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              {/* <div className="h-2 bg-slate-700 rounded col-span-2"></div> */}
              <div className="h-2 bg-slate-700 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  ) : session ? (
    <Link href="/dashboard" className="font-bold">
      <Button>Dashboard</Button>
    </Link>
  ) : (
    <>
      <Link href="/login">
        <Button
          variant={"default"}
          className="bg-black hover:bg-white font-bold text-white hover:text-black flex items-center px-3 py-2 mt-2"
        >
          Login
        </Button>
      </Link>

      {/* Sign Up Button */}
      <Link href="/sign-up">
        <Button
          variant={"default"}
          className="space-y-2 font-bold flex items-center px-3 py-2 mt-2"
        >
          Sign Up
        </Button>
      </Link>
    </>
  );

  return (
    <div className="md:w-full sticky top-0 left-0 bg-transparent backdrop-blur-lg z-50  ">
      <nav className=" flex flex-wrap items-center justify-between px-10 py-2 ">
        <Link href="/" className="text-2xl font-bold">
          {/* <Image src={logo} width={200} height={150} alt="qrimage" />{" "} */} Logo
        </Link>

        {/* Hamburger Menu for Mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="block lg:hidden "
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <IoMdClose size={26} />
          ) : (
            <IoReorderThreeOutline size={26} />
          )}
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full lg:flex lg:items-center lg:justify-center lg:w-auto space-y-4 lg:space-y-0 lg:space-x-4 mt-4 lg:mt-0`}
        >
          <Link
            href="/"
            className="hover:text-orange-600 block lg:inline-block"
          >
            QR Code
          </Link>
          <Link
            href="/"
            className="hover:text-orange-600 block lg:inline-block"
          >
            FAQ
          </Link>
          <Link
            href="/"
            className="hover:text-orange-600 block lg:inline-block"
          >
            Why Us
          </Link>
          <Link
            href="/"
            className="hover:text-orange-600 block lg:inline-block"
          >
            Product
          </Link>
          <Link
            href="/"
            className="hover:text-orange-600 block lg:inline-block"
          >
            API
          </Link>
          <Link
            href="/"
            className="hover:text-orange-600 block lg:inline-block"
          >
            Blog
          </Link>
        </div>

        {/* Auth Links */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full lg:flex lg:items-center lg:justify-end lg:w-auto space-y-4 lg:space-y-0 lg:space-x-4 mt-4 lg:mt-0`}
        >
          {authLinks}
          <ThemeSwitch />
        </div>
      </nav>
    </div>
  );
}
