import SideBar from "@/components/layout/SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="min-w-screen ">
          <div className="min-h-screen md:min-w-[300px]">
            <SideBar />
          </div>
        </div>
        <main className="w-full h-full pl-[24px] ">{children}</main>
      </div>
    </>
  );
}
