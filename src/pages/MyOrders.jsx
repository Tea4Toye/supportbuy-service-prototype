import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBookings } from '../bookings/BookingProvider';
import { Icon, Schedule, StatusBadge } from '../bookings/BookingUI';
import { quantityText } from '../bookings/bookingPresentation';
import { formatMoney } from '../bookings/bookingModel';

export default function MyOrders() {
  const { bookings } = useBookings();
  const [ordersNotice, setOrdersNotice] = useState(false);
  return <div className="flex flex-col pb-10">
    <h1 className="text-2xl font-outfit font-semibold text-[#1E232A] mb-6">My Orders & Bookings</h1>
    <div className="flex w-full bg-white rounded-2xl p-1.5 shadow-sm border border-gray-100 mb-8"><button onClick={() => setOrdersNotice(true)} className="flex-1 flex items-center justify-center py-3.5 rounded-xl font-medium text-[#1E232A] font-outfit text-[17px] hover:bg-gray-50 transition-colors">Orders</button><button onClick={() => setOrdersNotice(false)} className="flex-1 flex items-center justify-center py-3.5 rounded-xl font-medium bg-primary text-[#1E232A] font-outfit text-[17px] shadow-sm">Bookings</button></div>
    {ordersNotice && <p role="status" className="mb-6 bg-white p-4 rounded-xl text-sm text-gray-500">Product orders are not available in this prototype. Your service bookings are shown below.</p>}
    {bookings.length === 0 && <div className="bg-white rounded-2xl p-6"><p className="text-gray-500 mb-3">You have no bookings yet.</p><Link className="text-green-700 font-medium" to="/services">Browse services</Link></div>}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{bookings.map(booking => <article key={booking.id} className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100 flex flex-col p-4 min-w-0">
      <div className="mb-4"><StatusBadge status={booking.status} /></div>
      <div className="rounded-[16px] overflow-hidden mb-4 aspect-[4/3] bg-gray-100"><img src={booking.service.image} alt={booking.service.title} className="w-full h-full object-cover" /></div>
      <div className="mb-4 flex-1"><p className="text-xs text-gray-400 mb-1 font-medium break-all">{booking.reference}</p><h2 className="font-semibold text-[#1E232A] font-outfit text-[17px] mb-2">{booking.service.title}</h2><p className="text-sm text-gray-500 mb-4">{booking.service.merchant}</p><div className="text-sm text-gray-500 mb-4 space-y-1"><Schedule service={booking.service} selection={booking.selection} /></div><div className="flex flex-wrap justify-between items-center gap-2"><div className="flex items-center gap-1.5 text-gray-500"><Icon className="text-lg">schedule</Icon><span className="text-sm">{quantityText(booking.service, booking.price)}</span></div><p className="font-bold text-[#1E232A]">{formatMoney(booking.price.total)}</p></div></div>
      <Link to={`/booking/${booking.id}`} className="w-full bg-[#1A4B1A] text-white py-2.5 rounded-xl font-medium text-sm flex items-center justify-center hover:bg-[#133813] transition-colors">View Details</Link>
    </article>)}</div>
  </div>;
}
