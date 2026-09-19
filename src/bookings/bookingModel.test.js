import test from 'node:test';
import assert from 'node:assert/strict';
import { calculatePrice, validateSelection, initialSelection, normalizeSelection, finishTime, nigeriaDate, addDays } from './bookingModel.js';
import { getService, services } from '../data/services.js';

const now = new Date('2026-09-09T12:00:00Z');
const selection = { startDate: '2026-10-08', startTime: '10:00', locationMode: 'customer', address: '14 Example Road, Lagos' };
test('existing catalogue IDs remain unique and each service declares supported behavior', () => {
  assert.equal(new Set(services.map(s => s.id)).size, 16);
  for (const service of services) {
    assert.ok(service.rate > 0);
    assert.ok(service.locationModes.length);
  }
  assert.equal(getService('4').title, 'Bridal Make-Up');
  assert.equal(getService('missing'), undefined);
});
test('daily billing includes both endpoints including same-day bookings', () => {
  assert.equal(calculatePrice(getService(16), { ...selection, endDate: '2026-10-10' }).total, 120000);
  assert.equal(calculatePrice(getService(16), { ...selection, endDate: '2026-10-08' }).quantity, 1);
});
test('nights exclude checkout across month boundaries and include fees and one deposit', () => {
  assert.deepEqual(calculatePrice(getService(1), { startDate: '2026-10-30', endDate: '2026-11-02' }), {
    quantity: 3, subtotal: 570000, serviceFee: 17100, cautionDeposit: 70000, total: 657100,
  });
});
test('half-hour tutoring computes duration and exact finish time', () => {
  assert.equal(calculatePrice(getService(15), { ...selection, hours: 1.5 }).total, 30000);
  assert.equal(finishTime(getService(15), { ...selection, hours: 1.5 }), '11:30');
  assert.equal(finishTime(getService(4), selection), '12:00');
});
test('fixed packages do not multiply by duration or guest count', () => {
  assert.equal(calculatePrice(getService(4), { ...selection, hours: 7 }).total, 85000);
  assert.equal(calculatePrice(getService(13), { ...selection, guestCount: 40 }).quantity, 1);
});
test('invalid previews never produce NaN or negative quantities', () => {
  for (const s of [{}, { startDate: 'wrong', endDate: '2026-10-10' }, { startDate: '2026-10-10', endDate: '2026-10-08' }]) {
    const result = calculatePrice(getService(16), s);
    assert.equal(result.quantity, 0);
    assert.ok(Number.isFinite(result.total));
  }
});
test('date validation blocks missing, impossible, past and reversed schedules', () => {
  assert.ok(validateSelection(getService(16), {}, now).startDate);
  assert.ok(validateSelection(getService(16), { ...selection, startDate: '2026-02-30' }, now).startDate);
  assert.ok(validateSelection(getService(16), { ...selection, startDate: '2026-09-01' }, now).startDate);
  assert.ok(validateSelection(getService(16), { ...selection, endDate: '2026-10-07' }, now).endDate);
  assert.ok(validateSelection(getService(1), { ...selection, endDate: selection.startDate, locationMode: 'provider' }, now).endDate);
  assert.deepEqual(validateSelection(getService(16), { ...selection, endDate: selection.startDate }, now), {});
});
test('hours must be positive half-hours and finish before midnight', () => {
  for (const hours of [0, -1, 1.2, Infinity]) assert.ok(validateSelection(getService(15), { ...selection, hours }, now).hours);
  assert.ok(validateSelection(getService(15), { ...selection, startTime: '23:30', hours: 1 }, now).hours);
  assert.deepEqual(validateSelection(getService(15), { ...selection, hours: 1.5 }, now), {});
});
test('items and trips must be positive whole quantities', () => {
  for (const quantity of [0, -1, 1.5, Infinity]) assert.ok(validateSelection(getService(9), { ...selection, quantity }, now).quantity);
  assert.equal(calculatePrice(getService(9), { ...selection, quantity: 3 }).total, 45000);
});
test('location rules require only active fields', () => {
  assert.ok(validateSelection(getService(4), { ...selection, address: '' }, now).address);
  assert.deepEqual(validateSelection(getService(4), { ...selection, address: '', locationMode: 'provider' }, now), {});
  assert.ok(validateSelection(getService(4), { ...selection, locationMode: 'online' }, now).locationMode);
  const routeErrors = validateSelection(getService(5), { ...selection, locationMode: 'route', quantity: 1 }, now);
  assert.ok(routeErrors.pickupAddress && routeErrors.destinationAddress);
  const normalized = normalizeSelection(getService(4), { ...selection, locationMode: 'provider', pickupAddress: 'Old pickup', destinationAddress: 'Old destination', arrivalNotes: 'Old gate' });
  assert.equal(normalized.address, undefined);
  assert.equal(normalized.pickupAddress, undefined);
  assert.equal(normalized.arrivalNotes, undefined);
});
test('catering requires guest capacity and a later end time', () => {
  const valid = { ...selection, guestCount: 50, endTime: '14:00' };
  assert.deepEqual(validateSelection(getService(13), valid, now), {});
  assert.ok(validateSelection(getService(13), { ...valid, guestCount: 51 }, now).guestCount);
  assert.ok(validateSelection(getService(13), { ...valid, endTime: '09:00' }, now).endTime);
});
test('Nigeria date and validation are independent of browser timezone', () => {
  assert.equal(nigeriaDate(new Date('2026-09-09T23:30:00Z')), '2026-09-10');
  assert.equal(addDays('2026-12-31', 1), '2027-01-01');
  assert.ok(validateSelection(getService(4), { ...selection, startDate: '2026-09-09', startTime: '12:30' }, now).startTime);
});
test('new selections clear scheduling and choose the first offered location', () => {
  assert.equal(initialSelection(getService(15)).startDate, '');
  assert.equal(initialSelection(getService(15)).startTime, '');
  assert.equal(initialSelection(getService(15)).locationMode, 'customer');
});

test('transport arrival notes survive normalization without unrelated addresses', () => {
  const selection = normalizeSelection(getService(5), { locationMode: 'route', pickupAddress: 'Pickup', destinationAddress: 'Destination', arrivalNotes: ' Call at the gate ', address: 'Inactive home address' });
  assert.equal(selection.arrivalNotes, 'Call at the gate');
  assert.equal(Object.hasOwn(selection, 'address'), false);
});

test('medical appointments never retain freeform notes', () => {
  assert.equal(getService(12).medical, true);
  assert.equal(normalizeSelection(getService(12), { ...selection, locationMode: 'provider', notes: 'Private medical information' }).notes, undefined);
});
