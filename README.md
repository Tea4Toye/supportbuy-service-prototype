# SupportBuy prototype

SupportBuy is a React 19, Vite, and Tailwind CSS prototype for booking services and accommodation. Listings configure billing, scheduling, and location while sharing checkout and booking records. Ordinary services use customer-confirmed completion; accommodation keeps its stay and caution-deposit flow.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite and start at `/services`.

## Checks

```sh
npm test
npm run lint
npm run build
```

The Node test suite covers booking rules. Browser acceptance scenarios and service differences are documented in [Service booking flows](docs/service-booking-flows.md). The [approved implementation plan](docs/superpowers/plans/2026-09-09-shared-service-booking-flows.md) records the requested work; its checklist is separate from verification results.

## Working with the prototype

- Add or edit listings in `src/data/services.js`. Billing and location are independent of service category.
- Use future dates and times in Nigeria time when trying bookings.
- Payment, provider progress, chat, refunds, damage claims, and campaign actions are simulations. There is no backend or live availability check.
- Drafts and bookings use browser storage under `supportbuy.bookings.v1`; they remain local to that browser and origin.
- To reset the demo by choice, remove only `supportbuy.bookings.v1` in the browser's storage inspector and reload. This clears locally saved booking data and restores seeded examples. It cannot be recovered unless you saved a copy first.

The shared journey is service details → booking summary → checkout → confirmation → My Bookings → booking details. The existing visual style remains the baseline for new fields and states.
