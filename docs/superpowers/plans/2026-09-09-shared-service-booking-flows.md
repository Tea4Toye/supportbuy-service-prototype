# Shared service booking flows implementation plan

> **For agentic workers:** Use the `executing-plans` skill to implement and verify each task below. Track progress with checkboxes.

**Goal:** Make booking different services feel consistent, while collecting the few details each booking needs and showing the correct journey through completion.

**Architecture:** Use shared booking pages backed by one booking record. Configure pricing, scheduling, and location independently of service category. Keep two lifecycle variants: ordinary services and accommodation.

**Tech stack:** Existing React, React Router, Vite, and Tailwind CSS; browser storage for prototype bookings; Node's built-in test runner for booking logic.

**Spec:** The behavior specification below. During implementation, publish it as `docs/service-booking-flows.md` and save this plan under `docs/superpowers/plans/2026-09-09-shared-service-booking-flows.md`.

## 1. Behavior specification

### Global constraints

- Preserve the current design style, including colours, fonts, spacing conventions, rounded cards, buttons, navigation, and responsive layouts.
- Keep this a working prototype with simulated payments and provider actions.
- Use listed prices and packages. Quote negotiation is outside this iteration.
- Book one appointment, event, or consecutive date range at a time. Recurring visits are outside this iteration.
- Daily pricing counts every selected calendar date, including both endpoints.
- Ordinary services require the provider to finish and the customer to confirm completion.
- Keep service-specific requirements small. Do not create a separate page or workflow for every profession.

### Shared journey

Every listing follows:

**Service details → Booking summary → Checkout → Confirmation → My Bookings → Booking details**

Confirmation and booking details always show the selected service, provider, schedule, location, pricing breakdown, booking reference, and status.

The service configuration determines which inputs appear. For example, an hourly service shows an hours input; a provider offering home and shop appointments shows a location choice.

### Differences between services

| Service | Details collected before payment | Location | What changes after confirmation |
|---|---|---|---|
| Makeup artist or barber | Date and appointment time; fixed session duration displayed | Home or shop, if the provider offers both | Appointment wording; show the customer address or shop directions |
| Dentist or medical checkup | Date and appointment time; selected checkup/package | Clinic by default | Appointment wording and clinic arrival instructions; completion means the appointment took place |
| Caterer | Event date, start/end time, guest count, and selected package | Event venue | Show event details; use the ordinary service completion flow |
| Inverter installer | Date, arrival time, and listed installation package | Customer address | Show package inclusions and exclusions; use the ordinary service completion flow |
| Home tutor | Date, start time, number of hours, and optional notes | Customer address; online only where offered | Show booked duration; allow Book Again after completion |
| Existing cleaning, detailing, dog walking, photography, training, and development services | Date/time plus hours or fixed session details | Options explicitly offered by the provider | Use the same ordinary service lifecycle |
| Furniture assembly or transport | Date/time and item/trip quantity | Service address; pickup and destination for transport | Show quantity and locations; use the same ordinary service lifecycle |
| Accommodation | Check-in and check-out dates | Property address | Retain check-in, access details, stay extension, and caution-deposit handling |

Medical bookings will not collect symptoms, diagnoses, medical records, or treatment approvals. Installation packages must state what equipment and work the price includes. Catering guest count describes the package requirement and must remain within its advertised capacity; it does not silently change a fixed package price.

### Pricing and scheduling rules

Pricing unit belongs to the listing. Customers select a quantity or duration, not a different billing model.

| Billing unit | Customer inputs | Calculation |
|---|---|---|
| Hour | Date, start time, hours in half-hour increments | Rate × hours; show calculated finish time |
| Day | Start date, end date, initial arrival time | Rate × inclusive calendar days |
| Night | Check-in and check-out dates | Rate × nights between dates |
| Session or package | Date/time; display included duration where defined | Listed fixed price |
| Item or trip | Date/time and positive whole-number quantity | Rate × quantity |

Examples:

- October 8–10 is **3 days** for daily service pricing.
- October 8–10 is **2 nights** for accommodation.
- A tutor at ₦20,000/hour for 1.5 hours costs **₦30,000**.
- A ₦85,000 makeup session stays **₦85,000**, regardless of its displayed appointment length.

Store money as numeric values and format it only for display. Retain the accommodation example's 3% service charge and ₦70,000 caution deposit, showing both consistently before payment. Other prototype services have no added platform or travel charge in this iteration.

Reject missing dates, past schedules, reversed ranges, same-day accommodation checkout, zero quantities, and unsupported locations. A daily booking may start and end on the same date. Hourly bookings must finish on the selected date for this version.

Use Nigeria time for booking display and validation. Count calendar dates independently of browser timezone.

### Location behavior

- **At your address:** require the service address and allow optional arrival notes.
- **At the provider:** show the configured shop, clinic, or property address and arrival instructions.
- **Online:** show the provider's configured joining instructions.
- **Pickup and destination:** require both addresses for transport.

Only show a selector when the provider offers multiple choices. Switching location must also update summary, confirmation, booking details, and printable content. Inactive address fields must not appear in the saved booking.

### Completion behavior

Ordinary services share these states:

**Confirmed → In progress → Awaiting your confirmation → Completed**

- Clearly labelled prototype controls simulate the provider starting and finishing.
- After the provider finishes, the customer can **Confirm completion** or **Report a problem**.
- Confirmation records completion and makes the review form available. Reviewing is optional and does not control completion.
- Reporting a problem requires a short explanation and changes the state to **Issue reported**. It must not navigate to a completed screen or claim that payment was released.
- Completed bookings offer **Book Again**, which opens a fresh booking with empty scheduling fields.

These states do not change depending on whether the price is hourly, daily, or fixed. They also do not advance automatically because time has passed.

Accommodation retains its existing separate timeline and deposit actions. Shared record handling must correct the current behavior where disputing damage immediately opens a completed booking.

## 2. Implementation tasks

### Task 1: Centralize service definitions and pricing

**Files:** Create `src/data/services.js` and `src/bookings/bookingModel.js`; modify `ServicesCatalog.jsx` and `package.json`; create `src/bookings/bookingModel.test.js`.

**Responsibilities and interfaces:**

- Move the existing catalogue into one exported `services` array, preserving existing IDs.
- Export `getService(serviceId)` for direct URL lookup.
- Each listing declares its lifecycle, billing unit, numeric rate, permitted location modes, provider address/instructions, and any fixed duration or guest capacity.
- Export `calculatePrice(service, selection)` returning `{ quantity, subtotal, serviceFee, cautionDeposit, total }`.
- Export `validateSelection(service, selection, now)` returning field-keyed errors.
- Use explicit configuration rather than comparisons against display strings such as `"/Night"`.

- [ ] Add representative listings for barber, clinic checkup, catering, inverter installation, and tutoring. Include a daily-priced event-service listing to exercise calendar-day billing.
- [ ] Write pricing and validation tests before implementing the calculation functions.

```js
import test from "node:test";
import assert from "node:assert/strict";
import { calculatePrice } from "./bookingModel.js";

test("daily pricing includes both selected dates", () => {
  const result = calculatePrice(
    { lifecycle: "service", billingUnit: "day", rate: 40000 },
    { startDate: "2026-10-08", endDate: "2026-10-10" }
  );
  assert.equal(result.quantity, 3);
  assert.equal(result.total, 120000);
});

test("hourly pricing preserves half hours", () => {
  const result = calculatePrice(
    { lifecycle: "service", billingUnit: "hour", rate: 20000 },
    { hours: 1.5 }
  );
  assert.equal(result.total, 30000);
});
```

- [ ] Implement inclusive day counting, exclusive checkout counting, numeric totals, and the validation rules above.
- [ ] Derive catalogue price labels from the same definitions used by booking calculations.
- [ ] Add `"test": "node --test src/bookings/*.test.js"` and run `npm test`.

**Acceptance:** No screen needs to interpret a price label to determine booking behavior.

### Task 2: Replace fragmented booking inputs with shared fields

**Files:** Modify `ServiceDetail.jsx`; create `src/bookings/BookingFields.jsx`.

**Interface:** `BookingFields({ service, selection, errors, onChange })` is controlled by its parent. It renders scheduling, location, and the limited optional requirement fields.

- [ ] Load the listing using the route's service ID instead of requiring `location.state.service`.
- [ ] Implement date/time, hours, date-range, quantity, and location inputs using the existing field styling.
- [ ] Show fixed appointment duration or calculated hourly finish time next to the schedule.
- [ ] Add guest count and event end time only for event packages; use one optional notes field for other service instructions.
- [ ] Show field errors and block continuation until valid. Preserve selections when returning from summary.
- [ ] Change "Request a Booking" to **Continue to booking** so the wording matches the direct-payment prototype.

```jsx
<BookingFields
  service={service}
  selection={selection}
  errors={errors}
  onChange={setSelection}
/>
```

**Acceptance:** Home versus shop, hours versus days, and fixed appointments work inside the current service-detail card without a new design system or profession-specific page.

### Task 3: Carry one booking record through checkout

**Files:** Create `src/bookings/BookingProvider.jsx`; modify `App.jsx`, `BookingSummary.jsx`, `Checkout.jsx`, and `BookingConfirmed.jsx`.

**Interfaces:**

- `useBookings()` exposes `saveDraft`, `getDraft`, `confirmDraft`, `getBooking`, and `updateBooking`.
- A draft contains its service ID, selection, location, notes, and checkout contact details.
- A confirmed booking contains a unique ID/reference, a snapshot of the selected service and calculated price, schedule, contact details, status, and timestamps.
- `confirmDraft(draftId)` returns the existing booking when that draft was already confirmed.

- [ ] Persist drafts and bookings under the versioned browser-storage key `supportbuy.bookings.v1`. Rehydrate once at startup.
- [ ] Use `/booking-summary?draft=<id>` and `/checkout?draft=<id>` for draft navigation.
- [ ] Use `/booking-confirmed?booking=<id>` for confirmation and `/booking/:bookingId` for booking details.
- [ ] On simulated payment, create one confirmed booking and retain its complete data. Disable repeat submission and make confirmation idempotent.
- [ ] Replace fixed confirmation dates, base-price totals, contact information, and apartment details with booking values.
- [ ] Handle unknown IDs with an inline unavailable-booking message and navigation back to services or bookings.
- [ ] If storage is unavailable, keep the session usable and show a concise notice that bookings will not survive reload.

**Acceptance:** Back navigation and refresh preserve valid bookings. A service link works without router state. Repeated payment clicks do not create duplicate bookings.

### Task 4: Implement the shared booking lifecycle

**Files:** Create `src/bookings/bookingLifecycle.js`, its test file, and `src/pages/BookingDetail.jsx`; modify `ActiveBookingDetail.jsx`, `CompletedBookingDetail.jsx`, `MyOrders.jsx`, and `App.jsx`.

**Interface:** `transitionBooking(booking, event)` returns the updated booking and rejects invalid transitions.

- [ ] Test the ordinary lifecycle and issue branch before implementing them.

```js
import test from "node:test";
import assert from "node:assert/strict";
import { transitionBooking } from "./bookingLifecycle.js";

test("provider finishing waits for customer confirmation", () => {
  const result = transitionBooking(
    { lifecycle: "service", status: "in_progress" },
    { type: "provider_finished" }
  );
  assert.equal(result.status, "awaiting_confirmation");
});

test("reporting an issue does not complete the booking", () => {
  const result = transitionBooking(
    { lifecycle: "service", status: "awaiting_confirmation" },
    { type: "report_issue", explanation: "The installation is unfinished." }
  );
  assert.equal(result.status, "issue_reported");
});
```

- [ ] Define ordinary transitions for `provider_started`, `provider_finished`, `customer_confirmed`, and `report_issue`.
- [ ] Adapt the current active/completed layouts to render the selected booking. Choose ordinary or accommodation content by lifecycle.
- [ ] Show location instructions and booking reference for ordinary services. Show property access codes and deposit controls only for accommodation.
- [ ] Render My Bookings from saved records and seed its demonstration bookings once. Each card must open its own booking.
- [ ] Save reviews separately from completion. Prevent repeat completion and duplicate review submission.
- [ ] Make Book Again create a fresh draft for the same listing with scheduling cleared.
- [ ] Redirect the old `/booking/active` and `/booking/completed` URLs to their matching seeded accommodation records.

**Acceptance:** Booking a barber never shows apartment access details. Provider completion waits for customer confirmation. Reporting an issue leaves the booking unresolved.

### Task 5: Connect existing supporting features

**Files:** Modify `PdfPassModal.jsx`, `ChatDrawer.jsx`, `ExtensionModal.jsx`, and `CreateServiceCampaign.jsx`.

- [ ] Make the printable modal consume the current booking. Label it **Booking summary** for ordinary services and **Booking pass** for stays.
- [ ] Use the current provider in chat and retain simulated conversations separately by booking.
- [ ] Make stay extension use the booking's rate, add one to three nights, update checkout and totals, and charge the caution deposit only once.
- [ ] Keep stay refund and damage-claim demonstrations attached to that booking; disputed claims remain unresolved.
- [ ] Connect campaign entry points to the current draft, including the summary page's inactive campaign button.
- [ ] Use the shared price total as the campaign goal. Explain that funding does not reserve an appointment slot and scheduling must be confirmed when funded.
- [ ] Keep campaign publishing, real messaging, and real payment processing outside this iteration.

**Acceptance:** Supporting screens show the same service, location, dates, and total as the booking they belong to.

### Task 6: Verify and document the differences

**Files:** Create `docs/service-booking-flows.md`; update `README.md`.

- [ ] Document the comparison table, pricing examples, supported lifecycle states, and location rules.
- [ ] Explain how to add a listing through configuration and when a new requirement truly needs code.
- [ ] Document demo actions, browser persistence, reset expectations, and the absence of real availability/payment integration.
- [ ] Run `npm test`, `npm run lint`, and `npm run build`.
- [ ] Exercise the browser scenarios below at desktop and mobile widths.
- [ ] Review the changes for unintended visual alterations and commit each completed task with a focused message.

## 3. Test and acceptance plan

Automated tests must cover:

- Same-date daily bookings, inclusive multi-day bookings, and nights across month boundaries.
- Fractional hourly duration, calculated finish time, and invalid quantities/ranges.
- The accommodation example: ₦570,000 base + ₦17,100 service charge + ₦70,000 deposit = ₦657,100.
- Required home addresses, fixed provider addresses, transport endpoints, and unsupported location selections.
- Catering capacity validation without multiplying a fixed package price by guest count.
- Valid lifecycle transitions, blocked premature completion, and unresolved reported issues.
- Reloading saved bookings, malformed storage, and duplicate checkout confirmation.

Browser acceptance scenarios:

1. Book the same beauty service at home and at the shop; verify the correct address throughout.
2. Book a clinic checkup; verify appointment details without property or medical-record fields.
3. Book catering; verify venue, schedule, guest count, and package price.
4. Book installation; verify customer address and package inclusions.
5. Book 1.5 tutoring hours; verify finish time and total on every screen.
6. Book a daily service across three calendar dates; verify three billable days.
7. Complete the provider/customer sequence, then repeat with a reported issue.
8. Reload confirmation and booking details; open a service URL directly.
9. Print an ordinary booking summary and an accommodation pass.
10. Recheck accommodation booking, extension, refund, and dispute behavior.
11. Compare existing and updated layouts at 390px and 1440px widths; keep controls readable and clear of mobile navigation.

## 4. Assumptions and boundaries

The provider's listed location options and package inclusions determine what the customer can book. Displayed slots are prototype choices, without real capacity checking.

This iteration covers booking consistency and the ordinary-service completion flow. Rescheduling policies, cancellations, recurring visits, quotes, live tracking, overtime billing, mediator resolution, and production integrations remain outside it. Prices are fixed when payment is simulated; the app never adds charges simply because a service runs late.

The intended result is a consistent booking experience with a few relevant fields and labels for each service, while keeping the current visual style.
