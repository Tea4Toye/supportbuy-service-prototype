import { getService } from '../data/services.js';
import { addDays, calculatePrice, initialSelection, nigeriaDate, normalizeSelection, validateSelection } from './bookingModel.js';
import { transitionBooking, statusLabels } from './bookingLifecycle.js';

export const STORAGE_KEY = 'supportbuy.bookings.v1';
const warning = 'Bookings are available for this session only and may not survive a reload. Browser storage is unavailable or contains unreadable data.';
const clone = value => value === undefined ? undefined : structuredClone(value);
const object = value => Boolean(value && typeof value === 'object' && !Array.isArray(value));
const text = value => typeof value === 'string';
const flatFields = value => object(value) && Object.values(value).every(item => typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean');
const optionalFields = (value, keys, predicate) => keys.every(key => value[key] === undefined || predicate(value[key]));
const contactFields = value => object(value) && ['name', 'email', 'phone'].every(key => text(value[key]));
const selectionFields = value => flatFields(value)
  && optionalFields(value, ['startDate', 'endDate', 'startTime', 'endTime', 'locationMode', 'address', 'pickupAddress', 'destinationAddress', 'arrivalNotes', 'notes'], text);
const campaignFields = value => object(value)
  && optionalFields(value, ['title', 'category', 'duration', 'description', 'story', 'status'], text)
  && optionalFields(value, ['goalAmount'], Number.isFinite);

function validState(value) {
  if (!object(value) || value.version !== 1 || !object(value.drafts) || !object(value.bookings)) return false;
  const validDraft = (draft, id) => object(draft) && draft.id === id && Boolean(getService(draft.serviceId)) && selectionFields(draft.selection) && contactFields(draft.contact)
    && optionalFields(draft, ['bookingId', 'createdAt', 'updatedAt'], text)
    && (draft.campaign === undefined || campaignFields(draft.campaign));
  const validBooking = (booking, id) => object(booking) && booking.id === id && text(booking.reference) && object(booking.service)
    && text(booking.service.title) && text(booking.service.merchant) && Number.isFinite(booking.service.rate)
    && ['stay', 'service'].includes(booking.service.lifecycle) && booking.lifecycle === booking.service.lifecycle
    && optionalFields(booking.service, ['rating', 'reviews', 'serviceFeeRate', 'cautionDeposit', 'durationMinutes', 'guestCapacity'], Number.isFinite)
    && ['hour', 'day', 'night', 'session', 'package', 'item', 'trip'].includes(booking.service.billingUnit)
    && Array.isArray(booking.service.locationModes) && booking.service.locationModes.every(mode => ['customer', 'provider', 'online', 'route'].includes(mode))
    && ['image', 'instructions', 'providerAddress', 'description', 'inclusions', 'exclusions'].every(key => booking.service[key] === undefined || text(booking.service[key]))
    && ['stay', 'service'].includes(booking.lifecycle) && Object.hasOwn(statusLabels, booking.status)
    && selectionFields(booking.selection) && text(booking.selection.startDate) && contactFields(booking.contact) && object(booking.price)
    && optionalFields(booking, ['accessCode', 'depositStatus', 'draftId', 'completedAt'], text)
    && optionalFields(booking, ['refundAmount'], Number.isFinite)
    && ['quantity', 'subtotal', 'serviceFee', 'cautionDeposit', 'total'].every(key => Number.isFinite(booking.price[key]))
    && Array.isArray(booking.messages) && booking.messages.every(message => object(message) && text(message.id) && text(message.text) && ['customer', 'provider'].includes(message.sender) && text(message.createdAt))
    && text(booking.createdAt) && text(booking.updatedAt)
    && (!booking.review || (object(booking.review) && Number.isInteger(booking.review.rating) && text(booking.review.text)))
    && (!booking.issue || (object(booking.issue) && text(booking.issue.explanation)))
    && (!booking.claim || (object(booking.claim) && Number.isFinite(booking.claim.amount) && text(booking.claim.description)))
    && (!booking.extensions || (Array.isArray(booking.extensions) && booking.extensions.every(extension => object(extension) && Number.isFinite(extension.charge) && Number.isInteger(extension.nights) && extension.nights >= 1 && extension.nights <= 3 && text(extension.createdAt))));
  return Object.entries(value.drafts).every(([id, item]) => validDraft(item, id)) && Object.entries(value.bookings).every(([id, item]) => validBooking(item, id));
}

function seedBookings(now) {
  const day = nigeriaDate(now);
  const timestamp = now.toISOString();
  const make = (id, serviceId, status, startOffset, endOffset) => {
    const service = getService(serviceId);
    const selection = normalizeSelection(service, { ...initialSelection(service), startDate: addDays(day, startOffset), endDate: addDays(day, endOffset), startTime: '10:00', quantity: 1, address: '12 Adeola Street, Victoria Island, Lagos', pickupAddress: '12 Adeola Street, Victoria Island, Lagos', destinationAddress: '24 Admiralty Way, Lekki, Lagos' });
    return { id, reference: `SB-${id.toUpperCase()}`, lifecycle: service.lifecycle, service: clone(service), selection, price: calculatePrice(service, selection), contact: { name: 'Demo Customer', email: 'customer@example.com', phone: '08012345678' }, status, createdAt: timestamp, updatedAt: timestamp, messages: [], ...(service.lifecycle === 'stay' ? { accessCode: '4829', depositStatus: status === 'completed' ? 'refunded' : 'held' } : {}), ...(status === 'completed' ? { completedAt: timestamp } : {}) };
  };
  return Object.fromEntries([
    make('demo-stay-active', 1, 'checked_in', -1, 2),
    make('demo-stay-completed', 1, 'completed', -8, -5),
    make('demo-cleaning-active', 2, 'in_progress', 0, 0),
    make('demo-transport-completed', 5, 'completed', -2, -2),
  ].map(booking => [booking.id, booking]));
}

export function createBookingStore(options = {}) {
  const now = options.now || (() => new Date());
  const createId = options.createId || (() => globalThis.crypto.randomUUID());
  let storage;
  let storageWarning = '';
  let state;
  try {
    storage = Object.hasOwn(options, 'storage') ? options.storage : globalThis.localStorage;
    if (!storage) throw new Error('Storage unavailable');
    const raw = storage.getItem(STORAGE_KEY);
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      if (!validState(parsed)) throw new Error('Invalid stored bookings');
      state = parsed;
    }
  } catch {
    storage = null;
    storageWarning = warning;
  }
  state ||= { version: 1, drafts: {}, bookings: seedBookings(now()) };
  const listeners = new Set();
  let snapshot;
  function publish() {
    if (storage) {
      try { storage.setItem(STORAGE_KEY, JSON.stringify(state)); }
      catch { storage = null; storageWarning = warning; }
    }
    snapshot = { bookings: clone(Object.values(state.bookings)).sort((a, b) => b.createdAt.localeCompare(a.createdAt)), storageWarning };
    listeners.forEach(listener => listener());
  }
  publish();
  const getDraft = id => Object.hasOwn(state.drafts, id) ? clone(state.drafts[id]) : undefined;
  const getBooking = id => Object.hasOwn(state.bookings, id) ? clone(state.bookings[id]) : undefined;
  function saveDraft(draft) {
    if (!getService(draft.serviceId)) throw new Error('This service is unavailable.');
    const previous = draft.id ? getDraft(draft.id) : undefined;
    if (previous?.bookingId) throw new Error('This booking is already confirmed. Choose Book Again to make a new booking.');
    const id = previous?.id || createId();
    const service = getService(draft.serviceId);
    const saved = { ...previous, ...clone(draft), id, selection: normalizeSelection(service, { ...initialSelection(service), ...previous?.selection, ...draft.selection }), contact: { name: '', email: '', phone: '', ...previous?.contact, ...draft.contact }, createdAt: previous?.createdAt || now().toISOString(), updatedAt: now().toISOString() };
    state.drafts[id] = saved;
    publish();
    return clone(saved);
  }
  function confirmDraft(id) {
    const draft = getDraft(id);
    if (!draft) throw new Error('This booking draft is unavailable.');
    if (draft.bookingId) {
      const existing = getBooking(draft.bookingId);
      if (!existing) throw new Error('The confirmed booking is unavailable.');
      return existing;
    }
    const service = getService(draft.serviceId);
    const fields = validateSelection(service, draft.selection, now());
    const contact = Object.fromEntries(['name', 'email', 'phone'].map(key => [key, String(draft.contact[key] || '').trim()]));
    if (!contact.name) fields.name = 'Enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) fields.email = 'Enter a valid email address.';
    if (!/^\+?[\d\s()-]{7,20}$/.test(contact.phone) || contact.phone.replace(/\D/g, '').length < 7) fields.phone = 'Enter a valid phone number.';
    if (Object.keys(fields).length) {
      const error = new Error(Object.values(fields)[0]); error.fields = fields; throw error;
    }
    const bookingId = createId();
    const timestamp = now().toISOString();
    const booking = { id: bookingId, draftId: id, reference: `SB-${bookingId.toUpperCase()}`, lifecycle: service.lifecycle, service: clone(service), selection: normalizeSelection(service, draft.selection), price: calculatePrice(service, draft.selection), contact, status: 'confirmed', createdAt: timestamp, updatedAt: timestamp, messages: [], ...(service.lifecycle === 'stay' ? { accessCode: String(Math.floor(1000 + Math.random() * 9000)), depositStatus: 'held' } : {}) };
    state.bookings[bookingId] = booking;
    state.drafts[id] = { ...state.drafts[id], bookingId, updatedAt: timestamp };
    publish();
    return clone(booking);
  }
  function updateBooking(id, event) {
    const booking = getBooking(id);
    if (!booking) throw new Error('This booking is unavailable.');
    state.bookings[id] = transitionBooking(booking, { ...event, now: now().toISOString() });
    publish();
    return getBooking(id);
  }
  function sendMessage(id, input) {
    const booking = getBooking(id);
    if (!booking) throw new Error('This booking is unavailable.');
    const message = String(input || '').trim();
    if (!message) throw new Error('Write a message first.');
    const createdAt = now().toISOString();
    booking.messages.push({ id: createId(), sender: 'customer', text: message, createdAt }, { id: createId(), sender: 'provider', text: 'Demo reply: Thanks for your message. Your provider will respond here.', createdAt });
    booking.updatedAt = createdAt;
    state.bookings[id] = booking;
    publish();
    return clone(booking);
  }
  return { getSnapshot: () => snapshot, subscribe: listener => { listeners.add(listener); return () => listeners.delete(listener); }, getDraft, getBooking, saveDraft, confirmDraft, updateBooking, sendMessage };
}
