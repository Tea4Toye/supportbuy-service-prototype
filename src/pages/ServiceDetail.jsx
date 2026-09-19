import { useState } from "react";
import { Link, Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getService } from "../data/services";
import { useBookings } from "../bookings/BookingProvider";
import { calculatePrice, initialSelection, validateSelection, formatMoney } from "../bookings/bookingModel";
import BookingFields from "../bookings/BookingFields";
import { Icon, MissingBooking, PriceBreakdown } from "../bookings/BookingUI";
import { primaryButton, unitLabels } from "../bookings/bookingPresentation";

export default function ServiceDetail() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const { getDraft } = useBookings();
  const service = getService(id);
  const draft = getDraft(params.get("draft"));
  if (!service) return <MissingBooking service />;
  if (draft?.bookingId) return <Navigate to={"/booking-confirmed?booking=" + draft.bookingId} replace />;
  return <ServiceForm key={id + ":" + (draft?.id || "new")} service={service} draft={draft?.serviceId == service.id && !draft?.bookingId ? draft : undefined} />;
}

function ServiceForm({ service, draft }) {
  const navigate = useNavigate();
  const { saveDraft } = useBookings();
  const [selection, setSelection] = useState(() => draft?.selection || initialSelection(service));
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState("Description");
  const price = calculatePrice(service, selection);
  function continueTo(path) {
    const validation = validateSelection(service, selection);
    setErrors(validation);
    if (Object.keys(validation).length) {
      requestAnimationFrame(() => document.querySelector('[aria-invalid="true"]')?.focus());
      return;
    }
    const saved = saveDraft({ ...draft, serviceId: service.id, selection });
    navigate("/services/" + service.id + "?draft=" + saved.id, { replace: true });
    navigate(path + "?draft=" + saved.id);
  }
  const bookingButton = <button type="button" onClick={() => continueTo("/booking-summary")} className={primaryButton + " w-full"}><Icon className="text-xl">shopping_cart</Icon>Continue to booking</button>;
  return <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 pb-24 md:pb-10">
    <div className="flex flex-col gap-4 -mx-4 md:mx-0 md:w-5/12 min-w-0"><Link to="/services" className="px-4 md:px-0 text-sm text-gray-500 inline-flex items-center gap-2"><Icon className="text-lg">arrow_back</Icon>All services</Link><div className="w-full aspect-[4/3] md:rounded-[2rem] overflow-hidden bg-gray-200"><img src={service.image} alt={service.title} className="w-full h-full object-cover" /></div><div className="hidden md:block w-full aspect-[4/3] rounded-[2rem] overflow-hidden bg-gray-200"><img src={service.image} alt={service.title + " detail"} className="w-full h-full object-cover" /></div></div>
    <div className="w-full md:w-7/12 min-w-0"><div className="bg-white rounded-[2rem] p-5 md:p-8 shadow-sm">
      <p className="text-gray-500 text-sm uppercase tracking-wide mb-2">{service.category} · Lagos</p><h1 className="text-3xl font-outfit font-bold mb-3">{service.title}</h1><div className="flex items-center gap-2 mb-6"><Icon className="text-yellow-500 text-xl">star</Icon><span className="font-semibold">{service.rating} <span className="font-normal text-gray-500">({service.reviews})</span></span></div>
      <div className="mb-8"><strong className="text-3xl text-green-700">{formatMoney(service.rate)}</strong><span className="text-gray-500 ml-1">/{unitLabels[service.billingUnit]}</span></div>
      <div className="flex items-center gap-4 py-4 border-y border-gray-100 mb-8"><img src={service.image} alt="" className="w-12 h-12 rounded-full object-cover" /><div><h2 className="font-bold">{service.merchant}</h2><p className="text-sm text-gray-500">Service provider on SupportBuy</p></div></div>
      <div className="bg-[#F5F6F8] rounded-[1.5rem] p-4 md:p-6 mb-8"><h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Select your schedule and location</h2><BookingFields service={service} selection={selection} errors={errors} onChange={setSelection} /><div className="my-6">{price.quantity > 0 ? <PriceBreakdown service={service} price={price} /> : <p className="text-sm text-gray-500">Choose your dates and duration to see the total.</p>}</div><div className="hidden md:block mb-6">{bookingButton}</div>
        <div className="bg-white border border-green-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"><div><h3 className="font-bold text-sm mb-1">Need help funding this?</h3><p className="text-xs text-gray-500">Create a campaign and let others contribute.</p></div><button type="button" onClick={() => continueTo("/campaigns/create/service")} className="bg-green-50 hover:bg-green-100 text-green-700 font-bold py-2 px-4 rounded-lg text-sm whitespace-nowrap">Start Campaign</button></div>
      </div>
      <div className="flex bg-[#F5F6F8] rounded-xl p-1 mb-6">{["Description", "Reviews"].map(tab => <button key={tab} onClick={() => setActiveTab(tab)} className={"flex-1 py-2.5 text-sm font-medium rounded-lg " + (activeTab === tab ? "bg-white shadow-sm" : "text-gray-500")}>{tab}</button>)}</div>
      {activeTab === "Description" ? <div className="text-sm text-gray-600 space-y-3 leading-relaxed"><h2 className="text-xl font-outfit font-bold text-[#1E232A]">About this service</h2><p>{service.description}</p>{service.inclusions && <p><strong>Included:</strong> {service.inclusions}</p>}{service.exclusions && <p><strong>Not included:</strong> {service.exclusions}</p>}</div> : <p className="text-sm text-gray-500">Reviews will be available here.</p>}
    </div></div>
    <div className="md:hidden fixed bottom-[calc(64px+max(env(safe-area-inset-bottom),0.5rem))] left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-lg z-40"><div className="font-bold text-green-700 mb-2">{price.quantity > 0 ? formatMoney(price.total) : "Select dates and duration"}</div>{bookingButton}</div>
  </div>;
}
