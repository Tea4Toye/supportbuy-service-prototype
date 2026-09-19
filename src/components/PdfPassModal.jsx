import Modal from './Modal';
import { BookingFacts, PriceBreakdown, ServicePreview, StatusBadge, Icon } from '../bookings/BookingUI';
import { secondaryButton } from '../bookings/bookingPresentation';

export default function PdfPassModal({ booking, isOpen, onClose }) {
  if (!isOpen || !booking) return null;
  const title = booking.lifecycle === 'stay' ? 'Booking pass' : 'Booking summary';
  return <Modal title={title} onClose={onClose} wide className="booking-print">
    <div className="p-5 md:p-6 space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><h2 className="font-outfit text-2xl font-bold">SupportBuy</h2><p className="text-sm text-gray-500">{title}</p></div>
        <div className="text-right"><p className="font-semibold mb-2 break-all">{booking.reference}</p><StatusBadge status={booking.status} /></div>
      </div>
      <ServicePreview service={booking.service} price={booking.price} />
      <BookingFacts service={booking.service} selection={booking.selection} contact={booking.contact} />
      <div className="border-t border-gray-100 pt-5"><PriceBreakdown service={booking.service} price={booking.price} /></div>
      {booking.lifecycle === 'stay' && booking.accessCode && <div className="bg-gray-50 rounded-xl p-4 text-center">
        <p className="text-sm text-gray-500 mb-2">Property access code</p>
        <p className="font-outfit font-bold text-3xl tracking-[0.3em]">{booking.accessCode}</p>
        <p className="text-xs text-gray-500 mt-3">Show this pass and identification upon arrival if requested by building security.</p>
      </div>}
      <div className="modal-actions"><button type="button" className={secondaryButton + ' w-full'} onClick={() => window.print()}><Icon>print</Icon>Print {title.toLowerCase()}</button></div>
    </div>
  </Modal>;
}
