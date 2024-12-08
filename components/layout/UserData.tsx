"use client";

import { IoIosCall } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { FaLink } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import { Button } from "../ui/button";

interface User {
  id: number;
  name: string;
  email?: string;
  mobile?: string;
  profileImage?: string;
  website?: string;
  company?: string;
  street?: string;
  city?: string;
  zip?: string;
  country?: string;
  pageColor?: string;
}

interface UserDataProps {
  user: User | null;
}

function generateVCardManually(user: User) {
  const vCardData = `
BEGIN:VCARD
VERSION:3.0
FN:${user.name}
${user.email ? `EMAIL:${user.email}` : ""}
${user.mobile ? `TEL:${user.mobile}` : ""}
${user.website ? `URL:${user.website}` : ""}
${user.company ? `ORG:${user.company}` : ""}
${user.street || user.city || user.zip || user.country ? 
  `ADR:;;${user.street || ""};${user.city || ""};;${user.zip || ""};${user.country || ""}` : ""}
${user.profileImage ? `PHOTO;ENCODING=b;TYPE=JPEG:${user.profileImage}` : ""}
END:VCARD
  `.trim();

  return vCardData;
}

export default function UserData({ user }: UserDataProps) {
  if (!user) return <p>User not found</p>;

  const downloadVCard = () => {
    const vCardData = generateVCardManually(user);
    const blob = new Blob([vCardData], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${user.name}.vcf`;
    link.click();
  };

  return (
    <div
      style={{ backgroundColor: user.pageColor || "#ffffff" }}
      className="h-screen flex justify-center items-center p-4 sm:p-6 "
    >
      <div className="w-full max-w-[800px] mx-auto p-6 bg-white rounded-xl shadow-lg space-y-4 sm:space-y-6 md:space-y-8 relative text-black">
        <div className="flex justify-center">
          {user.profileImage && (
            <Image
              src={`data:image/png;base64,${user.profileImage}`}
              alt="Profile"
              width={150}
              height={150}
              className="rounded-xl object-cover shadow-md absolute top-[-100px] h-[135px] w-[135px]"
            />
          )}
        </div>

        <div className="space-y-2 md:space-y-4 mt-16 sm:mt-20 text-center">
          <h1 className="text-gray-700 text-xl sm:text-2xl">{user.name}</h1>
          {user.company && (
            <p className="opacity-40">
              Founder at <span>{user.company}</span>
            </p>
          )}
        </div>

        <div className="space-y-4 md:space-y-6">
          {user.mobile && (
            <>
              <div className="text-md text-gray-700 flex items-center">
                <IoIosCall size={24} className="mr-3" />
                <span>Phone Number</span>
              </div>
              <p className="text-gray-600 ml-10">{user.mobile}</p>
            </>
          )}

          {user.email && (
            <>
              <div className="text-md text-gray-700 flex items-center">
                <MdOutlineEmail size={24} className="mr-3" />
                <span>Email Address</span>
              </div>
              <p className="text-gray-600 ml-10">{user.email}</p>
            </>
          )}

          {user.website && (
            <>
              <div className="text-md text-gray-700 flex items-center">
                <FaLink size={24} className="mr-3" />
                <span>Website</span>
              </div>
              <p className="text-gray-600 ml-10">{user.website}</p>
            </>
          )}

          {(user.street || user.city || user.zip || user.country) && (
            <div className="opacity-50 flex items-center">
              <FaLocationDot size={24} className="mr-3" />
              <span>
                {[user.street, user.city, user.zip, user.country]
                  .filter(Boolean)
                  .join(", ")}
              </span>
            </div>
          )}
        </div>

        <Button
          onClick={downloadVCard}
          variant={"default"}
        >
          Download vCard
        </Button>
      </div>
    </div>
  );
}
