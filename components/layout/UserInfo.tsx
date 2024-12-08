import Image from "next/image";
import { fetchUserQRCodes } from "@/lib/actions";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import SignOutBtn from "./SignOutBtn";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import Removeqr from "../Removeqr";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
interface QRCode {
  id: number;
  QRImage: string;
  createdAt: string;
  isDeleted: boolean;
}
import { FaRegEdit } from "react-icons/fa";
import { BsFillPersonVcardFill } from "react-icons/bs";
import QRCodeDownload from "./QRCodeDownload";
import { FaUserCircle } from "react-icons/fa";

export default async function UserInfo() {
  const session = await getServerSession(authOptions);

  const qrCodes = await fetchUserQRCodes();



  return (
    <div>
      <div className="h-screen">
        <div className="flex !justify-end w-full p-5 items-center space-x-5">
          <div className="flex items-center space-x-5">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <FaUserCircle size={30} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{session?.user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>{session?.user.name}</DropdownMenuItem>
                <DropdownMenuItem>
                  <SignOutBtn />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ThemeSwitch />
          </div>
        </div>

        <div className="space-x-5 grid mt-5 place-content-center">
          {qrCodes.length === 0 ? (
            <p className="font-bold text-xl">Ready to Create ? Click on 'Create New QR'.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 p-5">
              {qrCodes.map((qrCode) => (
                <div
                  key={qrCode.id}
                  className="flex flex-col md:flex-row space-x-5 items-center mb-5 border-2 p-4 rounded-lg"
                >
                  <div className="flex-col justify-center flex items-center">
                    <Image
                      src={`data:image/png;base64,${qrCode.QRImage}`}
                      alt={`QR Code ${qrCode.id}`}
                      width={200}
                      height={200}
                    />
                    {/* Format selection dropdown */}
                    <QRCodeDownload qrCode={qrCode} />
                  </div>
                  <div className="flex-col flex space-y-6">
                    <p className=" flex space-x-2 items-center">
                      <BsFillPersonVcardFill />
                      <span>{qrCode.userdata}</span>
                    </p>
                    <Link
                      href={`/update-vcard/${qrCode.userdataId}`}
                      className="flex space-x-2 items-center hover:text-orange-600 w-fit"
                    >
                      <FaRegEdit size={20} />
                      <span>Edit VCard</span>
                    </Link>
                    <Removeqr id={qrCode.userdataId} />

                    <p>
                      <span className="font-bold">Updated At: </span>
                      {new Date(qrCode.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                      ,{" "}
                      {new Date(qrCode.createdAt).toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
