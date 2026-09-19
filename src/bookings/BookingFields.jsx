import { finishTime, formatTime, nigeriaDate } from "./bookingModel";
import { LocationDetails } from "./BookingUI";
import { inputClass, locationLabels } from "./bookingPresentation";

export default function BookingFields({ service, selection, errors, onChange }) {
  const set = (name, value) => onChange({ ...selection, [name]: value });
  const range = ["night", "day"].includes(service.billingUnit);
  const end = finishTime(service, selection);
  const field = (name, label, type = "text", extra = {}) => <div className="min-w-0" key={name}><label htmlFor={`booking-${name}`} className="block text-sm font-medium mb-2">{label}</label><input id={`booking-${name}`} name={name} type={type} value={selection[name] ?? ""} onChange={e => set(name, e.target.value)} className={inputClass} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `error-${name}` : undefined} {...extra} />{errors[name] && <p id={`error-${name}`} className="text-red-600 text-xs mt-1" role="alert">{errors[name]}</p>}</div>;
  return <div className="space-y-5">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {field("startDate", service.billingUnit === "night" ? "Check-in date" : range ? "Start date" : service.event ? "Event date" : "Appointment date", "date", { min: nigeriaDate() })}
      {range && field("endDate", service.billingUnit === "night" ? "Check-out date" : "End date", "date", { min: selection.startDate || nigeriaDate() })}
      {service.billingUnit !== "night" && field("startTime", range ? "Initial arrival time" : service.event ? "Event start time" : "Start time", "time")}
      {service.billingUnit === "hour" && field("hours", "Hours required", "number", { min: 0.5, step: 0.5 })}
      {["item", "trip"].includes(service.billingUnit) && field("quantity", service.billingUnit === "item" ? "Number of items" : "Number of trips", "number", { min: 1, step: 1 })}
      {service.event && service.billingUnit !== "day" && field("endTime", "Event end time", "time")}
      {service.event && field("guestCount", "Number of guests", "number", { min: 1, max: service.guestCapacity, step: 1 })}
    </div>
    <div className="text-xs text-gray-500 space-y-1"><p>All times are Nigeria time (WAT).</p>{service.billingUnit === "day" && <p>Every selected date is billed, including the start and end date. Daily service covers the listed package, not round-the-clock attendance.</p>}{service.billingUnit === "night" && <p>Check-in at {formatTime(service.checkInTime || "14:00")}; check-out at {formatTime(service.checkOutTime || "11:00")}. The checkout date is not an extra night.</p>}{service.durationMinutes && service.billingUnit !== "hour" ? <p>Included appointment length: {service.durationMinutes} minutes.</p> : null}{service.billingUnit === "hour" && end && <p className="font-medium text-green-700">Scheduled finish: {formatTime(end)}</p>}{service.event && <p>Package covers up to {service.guestCapacity} guests. Guest count does not change the listed price.</p>}</div>
    <div className="border-t border-gray-200 pt-4">
      {service.locationModes.length > 1 ? <><label htmlFor="booking-locationMode" className="block text-sm font-medium mb-2">Where will the service happen?</label><select id="booking-locationMode" className={inputClass} value={selection.locationMode} onChange={e => onChange({ ...selection, locationMode: e.target.value, address: "", pickupAddress: "", destinationAddress: "", arrivalNotes: "" })}>{service.locationModes.map(mode => <option key={mode} value={mode}>{locationLabels[mode]}</option>)}</select></> : <p className="text-sm font-semibold">{service.event ? "Event venue" : locationLabels[selection.locationMode]}</p>}
      {errors.locationMode && <p role="alert" className="text-xs text-red-600 mt-1">{errors.locationMode}</p>}
      <div className="mt-4 space-y-4">{selection.locationMode === "customer" && field("address", service.event ? "Venue address" : "Service address", "text", { autoComplete: "street-address" })}{selection.locationMode === "route" && <>{field("pickupAddress", "Pickup address")}{field("destinationAddress", "Destination address")}</>}{["provider", "online"].includes(selection.locationMode) && <div className="bg-white border border-gray-200 rounded-xl p-4 text-sm"><LocationDetails service={service} selection={selection} /></div>}{["customer", "route"].includes(selection.locationMode) && field("arrivalNotes", "Arrival notes (optional)")}</div>
    </div>
    {!service.medical && <div><label htmlFor="booking-notes" className="block text-sm font-medium mb-2">Service notes (optional)</label><textarea id="booking-notes" rows={3} className={inputClass} value={selection.notes || ""} onChange={e => set("notes", e.target.value)} placeholder="Anything the provider should know about this booking?" /></div>}
  </div>;
}
