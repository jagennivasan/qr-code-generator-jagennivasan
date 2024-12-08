import Link from "next/link";

export default function VCardNav() {
  return (
    <div className="sticky top-0 left-0 w-full flex items-center justify-around  bg-transparent  backdrop-blur-md z-50">
      <Link href={"/"} className="text-2xl font bold">
        logo
      </Link>
      <Link
        href={"/dashboard"}
        className="text-xl hover:text-[#ee7711] transition-colors duration-300"
      >
        Dashboard
      </Link>
    </div>
  );
}
