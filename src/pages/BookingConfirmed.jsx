import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useBookings } from "../bookings/BookingProvider";
import { BookingFacts, BookingProgress, Card, Icon, MissingBooking, PriceBreakdown, ServicePreview, StatusBadge } from "../bookings/BookingUI";
import { primaryButton, secondaryButton } from "../bookings/bookingPresentation";
import ChatDrawer from "../components/ChatDrawer";
import PdfPassModal from "../components/PdfPassModal";

export default function BookingConfirmed() {
  const [params] = useSearchParams();
  const { getBooking } = useBookings();
  const booking = getBooking(params.get("booking"));
  const [chatOpen, setChatOpen] = useState(false);
  const [passOpen, setPassOpen] = useState(false);
  if (!booking) return <MissingBooking />;
  const { service, selection, price, contact } = booking;
  return <div className="max-w-6xl mx-auto pb-10"><div className="flex flex-col md:flex-row gap-8"><div className="w-full md:w-7/12 space-y-6">
    <Card><BookingProgress step={2} /><div className="text-center flex flex-col items-center mb-8"><div className="w-20 h-20 bg-[#11d063] border-4 border-[#e8fbe5] text-white rounded-full flex items-center justify-center mb-5"><Icon className="text-[40px]">check</Icon></div><h1 className="text-2xl font-outfit font-bold mb-2">{service.appointment ? "Appointment confirmed!" : "Booking confirmed!"}</h1><p className="text-gray-500 text-sm break-all">Booking reference: {booking.reference}</p><div className="mt-3"><StatusBadge status={booking.status} /></div></div>
    <div className="border border-gray-100 rounded-2xl p-4 md:p-6 mb-6"><ServicePreview service={service} price={price} /><div className="border-t border-gray-100 my-5" /><BookingFacts service={service} selection={selection} contact={contact} /></div>
    <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800 mb-6">Your demo booking is confirmed. View it in My Bookings to follow its progress. No payment was collected or confirmation email sent.</div>
    <div className="flex flex-col sm:flex-row gap-3"><Link className={secondaryButton + " flex-1"} to={"/booking/" + booking.id}>View booking details</Link><button className={primaryButton + " flex-1"} onClick={() => setPassOpen(true)}>{service.lifecycle === "stay" ? "View booking pass" : "Print booking summary"}</button></div><Link className="block text-center text-sm text-gray-500 underline mt-5" to="/orders">View in My Bookings</Link></Card>
    </div><div className="w-full md:w-5/12 min-w-0 space-y-6"><Card title="Booking Summary"><ServicePreview service={service} price={price} /><div className="border-t border-gray-100 my-5" /><PriceBreakdown service={service} price={price} /></Card>
    <Card title={service.lifecycle === "stay" ? "Access Details" : "Your provider"}>{service.lifecycle === "stay" && <div className="mb-6"><p className="text-sm text-gray-500 mb-3">Property access code</p><div className="flex gap-2">{String(booking.accessCode).split("").map((digit, i) => <span key={i} className="w-10 h-10 rounded-lg bg-[#1E232A] text-white flex items-center justify-center font-bold text-lg">{digit}</span>)}</div></div>}<h2 className="font-semibold mb-1">{service.merchant}</h2><p className="text-sm text-gray-500 mb-5">{service.lifecycle === "stay" ? "Your stay and deposit are tracked in booking details." : "Your provider finishes the service first, then you confirm completion."}</p><button onClick={() => setChatOpen(true)} className={secondaryButton + " w-full"}><Icon className="text-yellow-500 text-xl">chat</Icon>Chat with provider</button></Card></div></div>
    <ChatDrawer booking={booking} isOpen={chatOpen} onClose={() => setChatOpen(false)} /><PdfPassModal booking={booking} isOpen={passOpen} onClose={() => setPassOpen(false)} />
  </div>;
}
