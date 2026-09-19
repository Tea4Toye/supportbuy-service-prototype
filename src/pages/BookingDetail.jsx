import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBookings } from '../bookings/BookingProvider';
import { BookingFacts, Card, Icon, MissingBooking, PageHeading, PriceBreakdown, ServicePreview, StatusBadge } from '../bookings/BookingUI';
import { secondaryButton } from '../bookings/bookingPresentation';
import { formatMoney } from '../bookings/bookingModel';
import ChatDrawer from '../components/ChatDrawer';
import PdfPassModal from '../components/PdfPassModal';
import ActiveBookingDetail from './ActiveBookingDetail';
import CompletedBookingDetail from './CompletedBookingDetail';

export default function BookingDetail() {
  const { bookingId } = useParams();
  const { getBooking } = useBookings();
  const booking = getBooking(bookingId);
  const [chatOpen, setChatOpen] = useState(false);
  const [passOpen, setPassOpen] = useState(false);
  if (!booking) return <MissingBooking />;
  const stay = booking.lifecycle === 'stay';
  return <div className="max-w-6xl mx-auto pb-10 text-[#1E232A]">
    <PageHeading title={booking.status === 'completed' ? 'Completed booking' : 'Booking details'} back="/orders" />
    <div className="flex flex-wrap items-center gap-3 mb-6"><StatusBadge status={booking.status} /><p className="text-xs md:text-sm text-gray-500 break-all min-w-0">{booking.reference}</p></div>
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-6">
      <div className="space-y-6 min-w-0">
        <Card title={booking.service.title}><BookingFacts service={booking.service} selection={booking.selection} contact={booking.contact} /></Card>
        {booking.status === 'completed' ? <CompletedBookingDetail key={booking.id} booking={booking} /> : <ActiveBookingDetail key={booking.id} booking={booking} />}
      </div>
      <aside className="space-y-6 min-w-0">
        <Card title="Booking summary"><ServicePreview service={booking.service} price={booking.price} /><div className="mt-6"><PriceBreakdown service={booking.service} price={booking.price} /></div><p className="text-xs text-gray-500 mt-4">Payment is simulated in this prototype.</p>
          {booking.extensions?.length > 0 && <div className="mt-4 border-t border-gray-100 pt-4 space-y-2 text-sm"><p className="font-medium">Stay extensions included above</p>{booking.extensions.map((extension, index) => <p key={index} className="text-gray-500">{extension.nights} extra {extension.nights === 1 ? 'night' : 'nights'} · {formatMoney(extension.charge)}</p>)}</div>}
        </Card>
        <Card title="Your provider"><div className="flex items-center gap-3 mb-5"><div className="w-11 h-11 bg-green-50 rounded-full flex items-center justify-center text-green-800"><Icon>storefront</Icon></div><div><p className="font-semibold">{booking.service.merchant}</p><p className="text-sm text-gray-500">{booking.service.rating} ★ · {booking.service.reviews} reviews</p></div></div><button className={`${secondaryButton} w-full`} onClick={() => setChatOpen(true)}><Icon>chat</Icon>Chat with provider</button></Card>
        <button className={`${secondaryButton} w-full`} onClick={() => setPassOpen(true)}><Icon>print</Icon>{stay ? 'View booking pass' : 'View booking summary'}</button>
      </aside>
    </div>
    <ChatDrawer booking={booking} isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    <PdfPassModal booking={booking} isOpen={passOpen} onClose={() => setPassOpen(false)} />
  </div>;
}
