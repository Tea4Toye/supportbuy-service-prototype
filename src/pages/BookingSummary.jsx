import { Link, Navigate, useSearchParams } from "react-router-dom";
import { useBookings } from "../bookings/BookingProvider";
import { getService } from "../data/services";
import { calculatePrice } from "../bookings/bookingModel";
import { BookingFacts, BookingProgress, Card, MissingBooking, PageHeading, PriceBreakdown, ServicePreview } from "../bookings/BookingUI";
import { primaryButton } from "../bookings/bookingPresentation";

export default function BookingSummary() {
  const [params] = useSearchParams();
  const { getDraft } = useBookings();
  const draft = getDraft(params.get("draft"));
  const service = draft && getService(draft.serviceId);
  if (!draft || !service) return <MissingBooking />;
  if (draft.bookingId) return <Navigate to={"/booking-confirmed?booking=" + draft.bookingId} replace />;
  const price = calculatePrice(service, draft.selection);
  return <div className="max-w-6xl mx-auto pb-10"><PageHeading title="Booking Summary" back={"/services/" + service.id + "?draft=" + draft.id} /><div className="flex flex-col md:flex-row gap-8"><div className="w-full md:w-7/12 space-y-6"><Card><ServicePreview service={service} price={price} /></Card><Card title="Booking details"><BookingFacts service={service} selection={draft.selection} /><Link className="inline-block mt-5 text-sm font-medium text-green-700 underline underline-offset-2" to={"/services/" + service.id + "?draft=" + draft.id}>Edit schedule or location</Link></Card><div className="bg-green-50 border border-green-200 rounded-[1.5rem] p-6"><h2 className="font-bold mb-1">Need help funding your booking?</h2><p className="text-sm text-gray-600 mb-4">Create a campaign and let your circles contribute.</p><Link className="bg-[#123F1E] text-white inline-block py-2.5 px-5 rounded-xl text-sm" to={"/campaigns/create/service?draft=" + draft.id}>Create Campaign</Link></div></div><div className="w-full md:w-5/12 min-w-0"><Card title="Order Breakdown" className="md:sticky md:top-4"><BookingProgress step={0} /><PriceBreakdown service={service} price={price} /><Link className={primaryButton + " w-full mt-6"} to={"/checkout?draft=" + draft.id}>Continue to payment</Link></Card></div></div></div>;
}
