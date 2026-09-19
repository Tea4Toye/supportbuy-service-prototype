import test from 'node:test';
import assert from 'node:assert/strict';
import { createBookingStore, STORAGE_KEY } from './bookingStore.js';

function memoryStorage(initial) {
  let value = initial ?? null;
  return { getItem: () => value, setItem: (key, next) => { assert.equal(key, STORAGE_KEY); value = next; }, value: () => value };
}
const now = () => new Date('2026-09-09T09:00:00Z');
const make = (storage = memoryStorage()) => createBookingStore({ storage, now, createId: (() => { let id = 0; return () => `test-${++id}`; })() });
const draft = () => ({ serviceId: 2, selection: { startDate: '2026-10-08', startTime: '10:00', locationMode: 'customer', address: '12 Adeola Street, Lagos' }, contact: { name: 'Ada', email: 'ada@example.com', phone: '08012345678' } });

test('checkout is idempotent, snapshots immutable and reload preserves bookings', () => {
  const storage = memoryStorage();
  const store = make(storage);
  const saved = store.saveDraft(draft());
  const booking = store.confirmDraft(saved.id);
  assert.equal(store.confirmDraft(saved.id).id, booking.id);
  assert.equal(store.getSnapshot().bookings.length, 5);
  assert.throws(() => store.saveDraft({ ...saved, contact: { name: 'Changed' } }));
  booking.service.title = 'Mutated';
  assert.notEqual(store.getBooking(booking.id).service.title, 'Mutated');
  const reloaded = make(storage);
  assert.equal(reloaded.getBooking(booking.id).contact.name, 'Ada');
  assert.equal(reloaded.getSnapshot().bookings.length, 5);
});

test('bad contact or elapsed schedule cannot reach payment confirmation', () => {
  const store = make();
  const invalid = store.saveDraft({ ...draft(), contact: { name: 'Ada', email: 'bad', phone: '' } });
  assert.throws(() => store.confirmDraft(invalid.id), error => Boolean(error.fields.email && error.fields.phone));
  const past = store.saveDraft({ ...draft(), selection: { ...draft().selection, startDate: '2026-01-01' } });
  assert.throws(() => store.confirmDraft(past.id));
});

test('malformed storage is preserved and session can continue without overwriting it', () => {
  for (const value of ['not-json', '{"version":1,"drafts":[],"bookings":{}}', '{"version":1,"drafts":{},"bookings":{"bad":{"id":"bad"}}}']) {
    const storage = memoryStorage(value);
    const store = make(storage);
    assert.ok(store.getSnapshot().storageWarning);
    store.saveDraft(draft());
    assert.equal(storage.value(), value);
    assert.equal(store.getSnapshot().bookings.length, 4);
  }
});

test('unavailable storage falls back to usable memory', () => {
  const store = make({ getItem() { throw new Error('denied'); }, setItem() { throw new Error('denied'); } });
  const saved = store.saveDraft(draft());
  assert.ok(store.confirmDraft(saved.id).reference);
  assert.ok(store.getSnapshot().storageWarning);
});

test('reviews and conversations belong only to their booking', () => {
  const store = make();
  store.sendMessage('demo-stay-active', 'What time is checkout?');
  assert.equal(store.getBooking('demo-stay-active').messages.length, 2);
  assert.equal(store.getBooking('demo-cleaning-active').messages.length, 0);
  store.updateBooking('demo-stay-completed', { type: 'submit_review', rating: 4, text: 'Comfortable' });
  assert.equal(store.getBooking('demo-stay-completed').review.rating, 4);
  assert.equal(store.getBooking('demo-transport-completed').review, undefined);
  assert.throws(() => store.updateBooking('demo-stay-completed', { type: 'submit_review', rating: 5 }));
});

test('malformed nested display values fall back without replacing stored data', () => {
  const source = memoryStorage();
  const original = make(source);
  const saved = original.saveDraft(draft());
  const mutations = [
    state => { state.drafts[saved.id].campaign = { title: null }; },
    state => { state.drafts[saved.id].campaign = { description: {} }; },
    state => { state.drafts[saved.id].campaign = { story: [] }; },
    state => { state.bookings['demo-stay-active'].service.rating = {}; },
    state => { state.bookings['demo-stay-active'].service.reviews = []; },
    state => { state.bookings['demo-stay-active'].service.lifecycle = 'unknown'; },
    state => { state.bookings['demo-stay-active'].extensions = [{ charge: 100, nights: {} }]; },
    state => { state.bookings['demo-stay-active'].accessCode = {}; },
    state => { state.bookings['demo-stay-active'].contact.name = {}; },
    state => { state.bookings['demo-stay-active'].selection.address = {}; },
  ];
  for (const mutate of mutations) {
    const state = JSON.parse(source.value());
    mutate(state);
    const raw = JSON.stringify(state);
    const storage = memoryStorage(raw);
    const loaded = make(storage);
    assert.ok(loaded.getSnapshot().storageWarning);
    loaded.saveDraft(draft());
    assert.equal(storage.value(), raw);
  }
});

test('partial campaign drafts with string fields survive reload', () => {
  const storage = memoryStorage();
  const store = make(storage);
  const saved = store.saveDraft({ ...draft(), campaign: { title: 'Help with tutoring', description: '', story: '', category: '', duration: '', status: 'draft', goalAmount: 15000 } });
  const loaded = make(storage);
  assert.equal(loaded.getSnapshot().storageWarning, '');
  assert.equal(loaded.getDraft(saved.id).campaign.title, 'Help with tutoring');
});
