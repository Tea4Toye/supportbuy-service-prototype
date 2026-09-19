const DAY_MS = 86400000;
const nonblank = value => typeof value === 'string' && value.trim().length > 0;
const positive = value => Number.isFinite(Number(value)) && Number(value) > 0;

function dateValue(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return NaN;
  const timestamp = Date.parse(`${value}T00:00:00Z`);
  return Number.isFinite(timestamp) && new Date(timestamp).toISOString().slice(0, 10) === value ? timestamp : NaN;
}

function minutes(value) {
  if (typeof value !== 'string' || !/^([01]\d|2[0-3]):[0-5]\d$/.test(value)) return NaN;
  const [hour, minute] = value.split(':').map(Number);
  return hour * 60 + minute;
}

export function nigeriaDate(now = new Date()) {
  return new Date(new Date(now).getTime() + 3600000).toISOString().slice(0, 10);
}

export function addDays(date, amount) {
  const value = dateValue(date);
  return Number.isFinite(value) && Number.isInteger(amount) ? new Date(value + amount * DAY_MS).toISOString().slice(0, 10) : '';
}

export function formatMoney(amount) {
  return `₦${Number(amount || 0).toLocaleString('en-NG', { maximumFractionDigits: 2 })}`;
}

export function formatDate(date) {
  const value = dateValue(date);
  return Number.isFinite(value) ? new Intl.DateTimeFormat('en-NG', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Africa/Lagos' }).format(new Date(value)) : 'Select a date';
}

export function formatTime(time) {
  const value = minutes(time);
  if (!Number.isFinite(value)) return '';
  const hour = Math.floor(value / 60);
  return `${hour % 12 || 12}:${String(value % 60).padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`;
}

export function finishTime(service, selection) {
  const duration = service.billingUnit === 'hour' ? Number(selection.hours) * 60 : service.durationMinutes;
  const end = minutes(selection.startTime) + Number(duration);
  return positive(duration) && Number.isFinite(end) && end < 1440 ? `${String(Math.floor(end / 60)).padStart(2, '0')}:${String(end % 60).padStart(2, '0')}` : '';
}

export function initialSelection(service) {
  return { startDate: '', endDate: '', startTime: '', endTime: '', hours: 1, quantity: 1, locationMode: service.locationModes[0], address: '', pickupAddress: '', destinationAddress: '', arrivalNotes: '', notes: '', guestCount: '' };
}

export function normalizeSelection(service, selection) {
  const result = { startDate: selection.startDate || '', locationMode: selection.locationMode, notes: String(selection.notes || '').trim() };
  if (service.medical) delete result.notes;
  if (service.lifecycle === 'stay' || service.billingUnit === 'day') result.endDate = selection.endDate || '';
  if (service.lifecycle !== 'stay') result.startTime = selection.startTime || '';
  if (service.billingUnit === 'hour') result.hours = Number(selection.hours);
  if (['item', 'trip'].includes(service.billingUnit)) result.quantity = Number(selection.quantity);
  if (service.event) Object.assign(result, { endTime: selection.endTime || '', guestCount: Number(selection.guestCount) });
  if (selection.locationMode === 'customer') Object.assign(result, { address: String(selection.address || '').trim(), arrivalNotes: String(selection.arrivalNotes || '').trim() });
  if (selection.locationMode === 'route') Object.assign(result, { pickupAddress: String(selection.pickupAddress || '').trim(), destinationAddress: String(selection.destinationAddress || '').trim(), arrivalNotes: String(selection.arrivalNotes || '').trim() });
  return result;
}

export function calculatePrice(service, selection = {}) {
  let quantity = 1;
  if (['night', 'day'].includes(service.billingUnit)) {
    quantity = (dateValue(selection.endDate) - dateValue(selection.startDate)) / DAY_MS + (service.billingUnit === 'day' ? 1 : 0);
  } else if (service.billingUnit === 'hour') {
    quantity = Number(selection.hours);
    if (!Number.isInteger(quantity * 2)) quantity = 0;
  } else if (['item', 'trip'].includes(service.billingUnit)) {
    quantity = Number(selection.quantity);
    if (!Number.isInteger(quantity)) quantity = 0;
  }
  if (!positive(quantity)) quantity = 0;
  const subtotal = Math.round(Number(service.rate) * quantity * 100) / 100;
  const serviceFee = Math.round(subtotal * Number(service.serviceFeeRate || 0) * 100) / 100;
  const cautionDeposit = Number(service.cautionDeposit || 0);
  return { quantity, subtotal, serviceFee, cautionDeposit, total: Math.round((subtotal + serviceFee + cautionDeposit) * 100) / 100 };
}

export function validateSelection(service, selection, now = new Date()) {
  const errors = {};
  const start = dateValue(selection.startDate);
  if (!Number.isFinite(start)) errors.startDate = 'Choose a valid date.';
  else if (selection.startDate < nigeriaDate(now)) errors.startDate = 'Choose today or a future date.';
  if (['day', 'night'].includes(service.billingUnit)) {
    const end = dateValue(selection.endDate);
    if (!Number.isFinite(end)) errors.endDate = 'Choose a valid end date.';
    else if (Number.isFinite(start) && (end < start || (service.billingUnit === 'night' && end === start))) errors.endDate = service.billingUnit === 'night' ? 'Check-out must be after check-in.' : 'End date cannot be before start date.';
  }
  const startTime = service.lifecycle === 'stay' ? service.checkInTime || '14:00' : selection.startTime;
  if (!Number.isFinite(minutes(startTime))) errors.startTime = 'Choose a valid start time.';
  else if (Number.isFinite(start) && Date.parse(`${selection.startDate}T${startTime}:00+01:00`) <= new Date(now).getTime()) {
    errors[service.lifecycle === 'stay' ? 'startDate' : 'startTime'] = 'Choose a schedule in the future (Nigeria time).';
  }
  if (service.billingUnit === 'hour') {
    if (!positive(selection.hours) || !Number.isInteger(Number(selection.hours) * 2)) errors.hours = 'Choose a positive duration in half-hour increments.';
    else if (Number.isFinite(minutes(startTime)) && !finishTime(service, selection)) errors.hours = 'The booking must finish before midnight on the selected date.';
  }
  if (['item', 'trip'].includes(service.billingUnit) && (!positive(selection.quantity) || !Number.isInteger(Number(selection.quantity)))) errors.quantity = 'Enter a positive whole-number quantity.';
  if (!service.locationModes.includes(selection.locationMode)) errors.locationMode = 'Choose a location offered by this provider.';
  if (selection.locationMode === 'customer' && !nonblank(selection.address)) errors.address = service.event ? 'Enter the event venue address.' : 'Enter the service address.';
  if (selection.locationMode === 'route') {
    if (!nonblank(selection.pickupAddress)) errors.pickupAddress = 'Enter the pickup address.';
    if (!nonblank(selection.destinationAddress)) errors.destinationAddress = 'Enter the destination address.';
  }
  if (service.event) {
    if (!positive(selection.guestCount) || !Number.isInteger(Number(selection.guestCount)) || Number(selection.guestCount) > service.guestCapacity) errors.guestCount = `Enter between 1 and ${service.guestCapacity} guests.`;
    if (!Number.isFinite(minutes(selection.endTime)) || minutes(selection.endTime) <= minutes(selection.startTime)) errors.endTime = 'Choose an end time later than the start time.';
  }
  return errors;
}
