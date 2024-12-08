import Image from "next/image";
import Link from "next/link";
import logo from "@/public/QRCaptain.svg";

interface HeaderDashboardProps {
  toggleSidebar: () => void;
}

export default function HeaderDashboard({
  toggleSidebar,
}: HeaderDashboardProps) {
  return (
    <header className="bg-gray-700 text-white">
      <div className="flex justify-between items-center p-2">
        <h1 className="text-lg font-bold ml-5">
          <Link href={"/"} >
            {" "}
            <Image src={logo} width={150} height={100} alt="qrimage" />
            </Link>
        </h1>
        <button className="sm:hidden text-white" onClick={toggleSidebar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
