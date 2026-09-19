import { useRef, useState } from 'react';
import Modal from './Modal';
import { useBookings } from '../bookings/BookingProvider';
import { addDays, calculatePrice, formatDate, formatMoney } from '../bookings/bookingModel';
import { Icon } from '../bookings/BookingUI';
import { primaryButton } from '../bookings/bookingPresentation';

function StayExtension({ booking, onClose }) {
  const { updateBooking } = useBookings();
  const [nights, setNights] = useState(1);
  const [error, setError] = useState('');
  const [paying, setPaying] = useState(false);
  const submitted = useRef(false);
  const checkout = addDays(booking.selection.endDate, nights);
  const nextPrice = calculatePrice(booking.service, { ...booking.selection, endDate: checkout });
  const subtotal = nextPrice.subtotal - booking.price.subtotal;
  const fee = nextPrice.serviceFee - booking.price.serviceFee;
  const charge = nextPrice.total - booking.price.total;
  function extend() {
    if (submitted.current) return;
    submitted.current = true;
    setPaying(true);
    try {
      updateBooking(booking.id, { type: 'extend_stay', nights });
      onClose();
    } catch (cause) {
      submitted.current = false;
      setPaying(false);
      setError(cause.message);
    }
  }
  return <Modal title="Extend your stay" onClose={onClose}>
    <div className="p-5 md:p-6 space-y-6">
      <div><p className="font-medium">{booking.service.title}</p><p className="text-sm text-gray-500">{booking.reference}</p></div>
      <div>
        <p className="text-sm font-medium mb-3">How many nights to add?</p>
        <div className="flex items-center gap-4">
          <button type="button" aria-label="Remove one night" disabled={nights <= 1 || paying} onClick={() => setNights(value => value - 1)} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"><Icon>remove</Icon></button>
          <output aria-label="Extra nights" className="font-outfit font-semibold text-xl w-8 text-center">{nights}</output>
          <button type="button" aria-label="Add one night" disabled={nights >= 3 || paying} onClick={() => setNights(value => value + 1)} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"><Icon>add</Icon></button>
        </div>
        <p className="text-xs text-gray-500 mt-3">Maximum 3 nights per request.</p>
      </div>
      <div className="bg-gray-50 rounded-xl p-4 space-y-3 text-sm">
        <p>Current checkout: <strong>{formatDate(booking.selection.endDate)}</strong></p>
        <p>New checkout: <strong>{formatDate(checkout)}</strong></p>
        <div className="flex justify-between gap-3 border-t border-gray-200 pt-3"><span>{formatMoney(booking.service.rate)} × {nights} {nights === 1 ? 'night' : 'nights'}</span><span>{formatMoney(subtotal)}</span></div>
        {fee > 0 && <div className="flex justify-between gap-3"><span>Service charge</span><span>{formatMoney(fee)}</span></div>}
        <p className="text-gray-500 text-xs">Your existing caution deposit carries over. No second deposit is charged.</p>
        <div className="border-t border-gray-200 pt-3 flex justify-between gap-3 font-semibold"><span>Additional payment</span><span className="text-green-700">{formatMoney(charge)}</span></div>
      </div>
      {error && <p role="alert" className="text-red-700 text-sm">{error}</p>}
      <button type="button" disabled={paying} className={primaryButton + ' w-full'} onClick={extend}>{paying ? 'Applying extension...' : 'Simulate payment · ' + formatMoney(charge)}</button>
    </div>
  </Modal>;
}

export default function ExtensionModal({ booking, isOpen, onClose }) {
  if (!isOpen || !booking || booking.lifecycle !== 'stay') return null;
  return <StayExtension key={booking.id} booking={booking} onClose={onClose} />;
}
