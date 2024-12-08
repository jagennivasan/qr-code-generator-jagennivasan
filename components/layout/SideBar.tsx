"use client";

import { FiMenu, FiX } from "react-icons/fi"; // Import menu and close icons
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { LuInbox } from "react-icons/lu";


export default function SideBar() {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const menuItems = [
    {
      icons: <FaPlus size={23} />,
      label: "Create New QR",
      url: "/vcard",
    },
    {
      icons: <LuInbox size={23} />,
      label: "QR Codes",
      url: "/dashboard",
    },
  ];
  return (
    <div className="p-2 fixed border-r">
      <button
        onClick={toggleSidebar}
        className="p-2 text-2xl fixed top-5  z-50 md:hidden "
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>
      <div
        className={` w-[300px]   p-4 fixed min-h-screen top-0 dark:bg-black transition-transform duration-300 bg-white ${
          isOpen ? "translate-x-0" : "-translate-x-full "
        } md:translate-x-0 md:static `}
      >
        <div className="m-5  flex flex-col space-y-5 justify-center items-center">
          <Link href="/" className="text-xl font-bold">
            {/* <Image src={logo} width={150} height={100} alt="qrimage" /> */} Home
          </Link>

          {menuItems.map((item, index) => {
            return (
              <Link
                href={item.url}
                key={index}
                className={`${
                  pathName === item.url
                    ? " dark:bg-white text-black"
                    : "bg-black text-white"
                } rounded-lg py-2 px-3 flex  w-full`}
              >
             <span className="mr-2">{item.icons}</span>   {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
