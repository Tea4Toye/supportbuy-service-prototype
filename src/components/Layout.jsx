import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MobileNav from "./MobileNav";
import MobileFAB from "./MobileFAB";

export default function Layout() {
  return (
    <div className="flex h-screen w-full bg-[#FAFAFA] text-[#1E232A] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <Header />
        <main className="p-4 md:p-8 flex-1 overflow-y-auto pb-36 md:pb-8">
          <Outlet />
        </main>
        <MobileFAB />
        <MobileNav />
      </div>
    </div>
  );
}
