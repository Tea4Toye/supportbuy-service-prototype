import { Link } from "react-router-dom";
import { formatMoney, formatDate, formatTime, finishTime } from "./bookingModel";

import { locationLabels, statusLabels, primaryButton, secondaryButton, quantityText } from "./bookingPresentation";

export function Icon({ children, className = "" }) {
  return <span aria-hidden="true" className={`material-symbols-outlined shrink-0 ${className}`}>{children}</span>;
}

export function Card({ title, children, className = "" }) {
  return <section className={`bg-white rounded-[1.5rem] p-5 md:p-6 shadow-sm border border-gray-100 min-w-0 ${className}`}>
    {title && <h2 className="text-lg font-outfit font-bold text-[#1E232A] mb-5">{title}</h2>}{children}
  </section>;
}

export function PageHeading({ title, back = "/services" }) {
  return <div className="flex items-center gap-3 mb-6 md:mb-8"><Link to={back} aria-label="Go back" className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0"><Icon>arrow_back</Icon></Link><h1 className="text-2xl font-outfit font-bold break-words">{title}</h1></div>;
}

export function MissingBooking({ service = false }) {
  return <Card title={service ? "Service unavailable" : "Booking unavailable"}><p className="text-gray-500 mb-5">{service ? "This service could not be found." : "This booking could not be found in this browser. Open My Bookings or choose a service to get started."}</p><div className="flex gap-3 flex-wrap"><Link className={primaryButton} to="/services">Browse services</Link><Link className={secondaryButton} to="/orders">My Bookings</Link></div></Card>;
}

export function StatusBadge({ status }) {
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${status === "issue_reported" ? "bg-orange-50 text-orange-800" : status === "completed" ? "bg-green-50 text-green-800" : "bg-blue-50 text-blue-800"}`}>{statusLabels[status] || status}</span>;
}


export function ServicePreview({ service, price }) {
  return <div className="flex gap-4 items-center min-w-0"><img src={service.image} alt={service.title} className="w-20 h-20 rounded-xl object-cover shrink-0 bg-gray-100" /><div className="min-w-0"><h3 className="font-semibold text-[#1E232A]">{service.title}</h3><p className="text-sm text-gray-500 mt-1">{service.merchant}{price ? ` · ${quantityText(service, price)}` : ""}</p></div></div>;
}

export function PriceBreakdown({ service, price }) {
  return <div className="space-y-3 text-sm" data-testid="price-breakdown"><div className="flex justify-between gap-4"><span className="text-gray-500">{formatMoney(service.rate)} × {quantityText(service, price)}</span><span className="font-medium whitespace-nowrap">{formatMoney(price.subtotal)}</span></div>{price.serviceFee > 0 && <div className="flex justify-between gap-4"><span className="text-gray-500">Service charge ({Math.round((service.serviceFeeRate || 0.03) * 100)}%)</span><span>{formatMoney(price.serviceFee)}</span></div>}{price.cautionDeposit > 0 && <div className="flex justify-between gap-4"><span className="text-gray-500">Refundable caution deposit</span><span>{formatMoney(price.cautionDeposit)}</span></div>}<div className="flex justify-between items-center border-t border-gray-100 pt-4"><span className="font-bold">Total</span><strong className="text-xl text-green-700" data-testid="booking-total">{formatMoney(price.total)}</strong></div></div>;
}

export function Schedule({ service, selection }) {
  const end = finishTime(service, selection);
  if (service.billingUnit === "night") return <><p>Check-in: {formatDate(selection.startDate)} · {formatTime(service.checkInTime || "14:00")}</p><p>Check-out: {formatDate(selection.endDate)} · {formatTime(service.checkOutTime || "11:00")}</p></>;
  if (service.billingUnit === "day") return <><p>{formatDate(selection.startDate)} – {formatDate(selection.endDate)}</p><p>Initial arrival: {formatTime(selection.startTime)}</p></>;
  return <><p>{formatDate(selection.startDate)}</p><p>{formatTime(selection.startTime)}{(service.event ? selection.endTime : end) ? ` – ${formatTime(service.event ? selection.endTime : end)}` : ""}</p></>;
}

export function LocationDetails({ service, selection }) {
  return <div className="space-y-1 break-words"><p className="font-medium">{service.event && selection.locationMode === "customer" ? "Event venue" : locationLabels[selection.locationMode]}</p>{selection.locationMode === "customer" && <p>{selection.address}</p>}{selection.locationMode === "provider" && <p>{service.providerAddress}</p>}{selection.locationMode === "route" && <><p>Pickup: {selection.pickupAddress}</p><p>Destination: {selection.destinationAddress}</p></>}{(selection.locationMode === "provider" || selection.locationMode === "online") && service.instructions && <p className="text-gray-500">{service.instructions}</p>}{selection.arrivalNotes && <p className="text-gray-500">Arrival notes: {selection.arrivalNotes}</p>}</div>;
}

export function BookingFacts({ service, selection, contact }) {
  return <div className="space-y-5 text-sm"><div className="flex gap-3"><Icon className="text-blue-500 text-xl">calendar_month</Icon><div className="space-y-1"><Schedule service={service} selection={selection} /><p className="text-xs text-gray-400">All times are Nigeria time (WAT).</p></div></div><div className="flex gap-3"><Icon className="text-red-500 text-xl">location_on</Icon><LocationDetails service={service} selection={selection} /></div>{service.event && <p><strong>Guests:</strong> {selection.guestCount}</p>}{selection.notes && <p className="break-words"><strong>Notes:</strong> {selection.notes}</p>}{service.inclusions && <p><strong>Included:</strong> {service.inclusions}</p>}{service.exclusions && <p><strong>Not included:</strong> {service.exclusions}</p>}{contact && <div className="border-t border-gray-100 pt-4 break-words"><p className="font-medium mb-1">Contact person</p><p>{contact.name}</p><p>{contact.email}</p><p>{contact.phone}</p></div>}</div>;
}

export function BookingProgress({ step }) {
  return <ol aria-label="Booking progress" className="flex items-start mb-7 gap-2">{["Summary", "Payment", "Confirmation"].map((label, i) => <li key={label} aria-current={i === step ? "step" : undefined} className="flex-1 text-center"><div className={`h-1.5 rounded-full mb-2 ${i <= step ? "bg-primary" : "bg-gray-100"}`} /><span className={`text-xs ${i === step ? "font-semibold text-[#1E232A]" : "text-gray-500"}`}>{label}</span></li>)}</ol>;
}
