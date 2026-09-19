import { useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useBookings } from "../bookings/BookingProvider";
import { getService } from "../data/services";
import { calculatePrice, formatMoney } from "../bookings/bookingModel";
import { BookingFacts, BookingProgress, Card, Icon, MissingBooking, PageHeading, PriceBreakdown, ServicePreview } from "../bookings/BookingUI";
import { inputClass, primaryButton } from "../bookings/bookingPresentation";

export default function Checkout() {
  const [params] = useSearchParams();
  const { getDraft } = useBookings();
  const draft = getDraft(params.get("draft"));
  const service = draft && getService(draft.serviceId);
  if (!draft || !service) return <MissingBooking />;
  if (draft.bookingId) return <Navigate to={"/booking-confirmed?booking=" + draft.bookingId} replace />;
  return <CheckoutForm key={draft.id} draft={draft} service={service} />;
}

function CheckoutForm({ draft, service }) {
  const { saveDraft, confirmDraft } = useBookings();
  const navigate = useNavigate();
  const [contact, setContact] = useState(() => draft.contact || { name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const price = calculatePrice(service, draft.selection);
  function updateContact(name, value) {
    const next = { ...contact, [name]: value };
    setContact(next);
    saveDraft({ ...draft, contact: next });
  }
  function pay(e) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      saveDraft({ ...draft, contact });
      const booking = confirmDraft(draft.id);
      navigate("/booking-confirmed?booking=" + booking.id, { replace: true });
    } catch (err) {
      setError(err.fields ? Object.values(err.fields).join(" ") : err.message);
      setSubmitting(false);
    }
  }
  return <div className="max-w-6xl mx-auto pb-10"><PageHeading title="Checkout" back={"/booking-summary?draft=" + draft.id} /><form onSubmit={pay} className="flex flex-col md:flex-row gap-8"><div className="w-full md:w-7/12 space-y-6"><Card><BookingProgress step={1} /></Card><Card title="Contact Information"><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{[["name", "Full name", "text"], ["email", "Email", "email"], ["phone", "Phone number", "tel"]].map(([name, label, type]) => <div key={name} className={name === "name" ? "sm:col-span-2" : ""}><label className="block text-sm font-medium mb-2" htmlFor={"contact-" + name}>{label}</label><input id={"contact-" + name} className={inputClass} type={type} required value={contact[name] || ""} onChange={e => updateContact(name, e.target.value)} /></div>)}</div></Card><Card title="Payment Method"><div className="p-4 border-2 border-green-500 bg-green-50 rounded-xl"><div className="font-bold flex gap-2 items-center"><Icon className="text-green-600">credit_card</Icon>Pay with Flutterwave</div><p className="text-sm text-gray-600 mt-2">Cards, Bank Transfer, USSD, Mobile Money</p><p className="text-xs text-green-800 mt-3">Demo checkout. No money is charged.</p></div><div className="p-4 border border-gray-200 rounded-xl mt-4 opacity-70"><p className="font-semibold">Pay with Wallet Balance</p><p className="text-sm text-gray-500 mt-1">Wallet payment is unavailable in this demo.</p></div></Card><Card title="Schedule and location"><BookingFacts service={service} selection={draft.selection} /></Card></div><div className="w-full md:w-5/12 min-w-0"><Card title="Order Summary" className="md:sticky md:top-4"><ServicePreview service={service} price={price} /><div className="my-6 border-t border-gray-100" /><PriceBreakdown service={service} price={price} />{error && <div role="alert" className="text-sm text-red-700 bg-red-50 rounded-xl p-3 mt-5">{error}<Link to={"/services/" + service.id + "?draft=" + draft.id} className="block underline mt-2">Edit booking details</Link></div>}<button type="submit" disabled={submitting} className={primaryButton + " w-full mt-6"}>{submitting ? "Confirming…" : "Pay & Authorize " + formatMoney(price.total)}</button><p className="text-xs text-gray-400 text-center mt-3">Payment and confirmation are simulated.</p></Card></div></form></div>;
}
