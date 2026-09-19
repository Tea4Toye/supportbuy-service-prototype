import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useBookings } from "../bookings/BookingProvider";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MobileNav from "./MobileNav";
import MobileFAB from "./MobileFAB";

export default function Layout() {
  const { pathname, search } = useLocation();
  const { storageWarning } = useBookings();
  const mainRef = useRef(null);
  useEffect(() => { mainRef.current?.scrollTo(0, 0); }, [pathname, search]);
  return (
    <div className="flex h-screen w-full bg-[#FAFAFA] text-[#1E232A] overflow-hidden">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden relative">
        <Header />
        <main ref={mainRef} className="p-4 md:p-8 flex-1 overflow-y-auto pb-36 md:pb-8">
          {storageWarning && <p role="status" className="bg-orange-50 border border-orange-100 rounded-xl p-3 mb-5 text-sm text-orange-800">{storageWarning}</p>}
          <Outlet />
        </main>
        <MobileFAB />
        <MobileNav />
      </div>
    </div>
  );
}
