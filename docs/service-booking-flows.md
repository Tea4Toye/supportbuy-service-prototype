# Service booking flows

## Shared behavior

The booking journey is service details → booking summary → checkout → confirmation → My Bookings → booking details. All screens refer to the same booking and show the selected provider, schedule, location, numeric price breakdown, reference, and status.

Use the existing colours, fonts, spacing, rounded cards, buttons, navigation, and responsive layouts. Service differences are configured fields and labels inside these layouts, rather than a separate page per profession.

Listings declare billing, scheduling, and location independently of category. There are two lifecycle values in configuration: `service` for ordinary services and `stay` for accommodation.

## What differs by service

| Service | Before payment | Location | After confirmation |
|---|---|---|---|
| Makeup artist or barber | Appointment date/time; fixed duration displayed | Home or shop, only as offered | Appointment wording and chosen address/directions |
| Dentist or medical checkup | Appointment date/time and listed checkup/package | Clinic by default | Clinic arrival instructions; completion means the appointment occurred |
| Caterer | Event date, start/end time, guest count, listed package | Event venue | Event details with ordinary completion |
| Inverter installer | Date, arrival time, listed installation package | Customer address | Package inclusions/exclusions with ordinary completion |
| Home tutor | Date, start time, hours, optional notes | Customer address; online if offered | Booked duration and Book Again after completion |
| Cleaning, detailing, dog walking, photography, training, development | Date/time plus hours or fixed session details | Provider's configured choices | Ordinary completion |
| Furniture assembly or transport | Date/time and item/trip quantity | Service address; pickup and destination for transport | Quantity and locations with ordinary completion |
| Accommodation | Check-in/check-out dates | Property address | Check-in, access details, stay extension, caution-deposit actions |

Medical bookings collect no symptoms, diagnoses, medical records, or treatment approvals. Installation packages state the included equipment/work and exclusions. Catering guest count must fit the advertised package capacity; a fixed package price is not multiplied by guest count.

## Pricing and dates

| Unit | Inputs | Calculation |
|---|---|---|
| Hour | Date, start time, hours in half-hour increments | Rate × hours; calculated finish time displayed |
| Day | Start/end dates and initial arrival time | Rate × inclusive calendar days |
| Night | Check-in/check-out dates | Rate × nights between dates |
| Session or package | Date/time; included duration displayed where configured | Fixed listed price |
| Item or trip | Date/time and positive whole-number quantity | Rate × quantity |

Examples:

- October 8 through October 10 is three billable days.
- Check-in October 8 and checkout October 10 is two nights.
- A tutor at ₦20,000/hour for 1.5 hours costs ₦30,000.
- A ₦85,000 makeup session costs ₦85,000 regardless of its displayed length.
- The accommodation example totals ₦657,100: ₦570,000 base, ₦17,100 service charge at 3%, and a ₦70,000 caution deposit.

Store money as numbers and format it at display time. Ordinary services add no platform or travel charge in this iteration. Stay extensions add one to three nights using the booked rate, update checkout and totals, and never charge the caution deposit twice. Time overruns do not add charges automatically.

Validate dates and times in `Africa/Lagos`, Nigeria time. Count calendar dates independently of the browser timezone. Reject missing/past schedules, reversed ranges, same-day accommodation checkout, zero quantities, and unsupported locations. A daily booking can start and end on the same date. Hourly bookings must finish on their selected date. Book only one appointment, event, or consecutive date range at a time.

## Location

| Config value | Customer experience |
|---|---|
| `customer` | Require service or venue address; allow optional arrival notes |
| `provider` | Display configured shop, clinic, or property address and arrival instructions |
| `online` | Display configured joining instructions |
| `route` | Require pickup and destination addresses |

Only display a location selector when more than one option is offered. Changing the choice updates all later screens and printable content. Do not save inactive location fields into the booking.

## Confirmation and completion

Ordinary services follow `confirmed` → `in_progress` → `awaiting_confirmation` → `completed`.

Label provider start/finish controls as prototype actions. Provider finish waits for the customer to Confirm completion or Report a problem. Require an explanation for a problem and retain the unresolved `issue_reported` state. Do not mark it complete or claim payment release. States do not advance automatically with elapsed time.

Reviews become available after completion, remain optional, and can be saved only once. Book Again starts a new draft for the listing with scheduling cleared.

Accommodation keeps a distinct stay timeline and access/deposit controls. Refund and damage demonstrations belong to the selected booking. Disputing damage leaves the claim unresolved rather than opening a completed screen. Ordinary bookings never show property access codes or caution-deposit controls.

The printable modal shows a Booking summary for services and a Booking pass for stays. Chat uses the selected provider, and simulated messages remain attached to that booking. Campaigns use the draft's calculated total. Funding does not reserve an appointment slot; scheduling must be confirmed when funded.

## Code responsibilities

- `src/data/services.js` exports `services` and `getService(serviceId)` and owns catalogue definitions.
- `src/bookings/bookingModel.js` owns `calculatePrice(service, selection)` and `validateSelection(service, selection, now)`, date arithmetic, and shared formatting.
- `src/bookings/BookingFields.jsx` renders controlled selection fields in the existing style.
- `src/bookings/bookingStore.js` owns browser persistence; `BookingProvider.jsx` exposes draft/booking operations to pages.
- `src/bookings/bookingLifecycle.js` owns guarded lifecycle transitions.

A draft carries service ID, selection, location, notes, and contact details. Confirmation snapshots the service and calculated price into a uniquely referenced booking. Confirming the same draft again returns its existing booking. Later listing edits must not rewrite prices or provider details on a paid booking.

Route lookup uses IDs, not required router state: `/services/:id`, `/booking-summary?draft=<id>`, `/checkout?draft=<id>`, `/booking-confirmed?booking=<id>`, and `/booking/:bookingId`. Unknown IDs show an unavailable-booking message with a way back. Legacy active/completed booking URLs lead to seeded accommodation records.

## Add a service

Add one uniquely identified definition to `services`, retaining existing IDs. Supply the existing display fields and declare `rate`, `billingUnit`, `lifecycle`, and `locationModes`. Use `service` or `stay` for lifecycle and the location values above. Supply `providerAddress` and instructions for provider visits, or joining instructions for online appointments.

Set `durationMinutes` for fixed appointment lengths. Set `event` and `guestCapacity` for event packages. State installation `inclusions` and `exclusions`. Keep category labels for discovery; do not branch pricing or lifecycle logic on a category name or display price string.

Choose existing configuration whenever its behavior fits. New code is needed only when a required input, price rule, or lifecycle cannot be expressed by these supported values. Add the rule and its test to the shared model first, then the relevant shared field. Do not copy checkout or confirmation for a new profession.

## Persistence and prototype limits

Browser storage uses the versioned key `supportbuy.bookings.v1`. Data belongs to the current browser and origin; another device or port does not share it. Seed demonstration bookings once. Rehydrate saved records on reload. Malformed storage must not crash the app. If storage is unavailable, keep in-memory use working and explain that bookings will not survive reload.

To reset deliberately, remove only `supportbuy.bookings.v1` through the browser storage inspector and reload. This erases locally saved drafts, bookings, and associated demo data, then restores seeded examples. Save a copy first if you need to recover it. Do not clear unrelated origin storage.

Payment, chat, provider actions, campaigns, refunds, and damage claims are simulations. There is no backend, real email, live availability, payment integration, slot reservation, or mediator resolution. Rescheduling/cancellation policies, recurring visits, quote negotiation, live tracking, and overtime billing are outside this iteration.

## Acceptance scenarios

Run `npm test`, `npm run lint`, and `npm run build`. These commands alone do not establish browser or visual correctness.

1. Book a beauty service at home and at the shop; check address throughout.
2. Book a clinic checkup; check appointment instructions and absence of medical-record/property fields.
3. Book catering; check venue, schedule, capacity validation, and fixed package total.
4. Book installation; check customer address and inclusions/exclusions.
5. Book 1.5 tutoring hours; check finish time and total on every screen.
6. Book a daily service across three calendar dates; check three billable days.
7. Complete provider/customer steps, then repeat with a reported issue.
8. Reload confirmation and booking details; open a service URL directly; repeat checkout without duplicate records.
9. Print an ordinary booking summary and accommodation pass.
10. Recheck accommodation booking, extension, refund, and disputed claim.
11. Compare at 390px and 1440px widths; check original visual style and mobile navigation clearance.

Verification status is recorded by the implementer after checks run; this document specifies intended behavior and does not claim those checks have passed.
