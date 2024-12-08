import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import logo from "@/public/QRCaptain.svg";
import Image from "next/image";

export default async function Account() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    return (
      <div className="min-h-screen shadow-2xl">
        <div className="p-5 flex justify-around text-xl items-center">
          <Link href={"/"}>
          <Image src={logo} width={150} height={100} alt="qrimage" />
          </Link>
          <Link href={"/dashboard"}>Dashboard</Link>
        </div>
        <div className="max-w-4xl mx-auto mt-10 p-8  shadow-md rounded-lg">
          <p className="text-3xl text-center font-extrabold  mb-6">
            Welcome to Your User Page
          </p>
          <div className="text-center">
            <p className="text-xl  font-medium">
              Email:{" "}
              <span className="">{session?.user.email}</span>
            </p>
            <p className="text-xl  font-medium mt-2">
              Name: <span className="">{session?.user.name}</span>
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <p className="text-2xl font-bold text-red-500">
          You must be logged in to view this page.
        </p>
      </div>
    );
  }
}
