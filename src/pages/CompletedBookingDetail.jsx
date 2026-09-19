import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookings } from '../bookings/BookingProvider';
import { initialSelection, formatMoney } from '../bookings/bookingModel';
import { Card, Icon } from '../bookings/BookingUI';
import { inputClass, primaryButton } from '../bookings/bookingPresentation';

export default function CompletedBookingDetail({ booking }) {
  const { saveDraft, updateBooking } = useBookings();
  const navigate = useNavigate();
  const [rating, setRating] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  function again() {
    try {
      const draft = saveDraft({ serviceId: booking.service.id, selection: initialSelection(booking.service) });
      navigate(`/services/${booking.service.id}?draft=${draft.id}`);
    } catch (actionError) { setError(actionError.message); }
  }
  function review(event) {
    event.preventDefault();
    try { updateBooking(booking.id, { type: 'submit_review', rating: Number(rating), text }); setError(''); }
    catch (actionError) { setError(actionError.message); }
  }
  return <>
    <Card><div className="flex flex-col items-center text-center py-3"><div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4"><Icon className="text-3xl">check_circle</Icon></div><h2 className="font-outfit text-xl font-semibold mb-2">Booking completed</h2><p className="text-sm text-gray-500 max-w-md">{booking.lifecycle === 'stay' ? 'Your stay and deposit review are complete.' : 'You confirmed that this service was completed.'}</p>{booking.lifecycle === 'stay' && <div className="text-sm mt-4 space-y-2"><p>Caution deposit: {formatMoney(booking.price.cautionDeposit)}</p>{booking.depositStatus === 'partial_refund' && <p>Accepted damage claim: {formatMoney(booking.claim?.amount || 0)}</p>}<p className="font-medium text-green-700">Simulated refund: {formatMoney(booking.refundAmount ?? booking.price.cautionDeposit)}</p></div>}<button onClick={again} className={`${primaryButton} mt-6`}>Book Again</button></div></Card>
    <Card title={booking.review ? 'Your review' : 'How was your experience?'}>
      {booking.review ? <div><p className="text-amber-600 font-medium">{booking.review.rating} / 5 stars</p>{booking.review.text && <p className="text-sm text-gray-600 mt-3 break-words">{booking.review.text}</p>}<p className="text-sm text-gray-500 mt-4">Thanks for reviewing {booking.service.merchant}.</p></div> : <form onSubmit={review} className="space-y-4"><p className="text-sm text-gray-500">Your booking is already complete. Leaving a review is optional.</p><label className="block text-sm font-medium">Rating<select className={`${inputClass} mt-2`} required value={rating} onChange={event => setRating(event.target.value)}><option value="">Choose a rating</option>{[5, 4, 3, 2, 1].map(value => <option value={value} key={value}>{value} {value === 1 ? 'star' : 'stars'}</option>)}</select></label><label className="block text-sm font-medium">Your review (optional)<textarea rows={3} className={`${inputClass} mt-2`} value={text} onChange={event => setText(event.target.value)} /></label><button className={primaryButton} type="submit">Submit review</button></form>}
      {error && <p role="alert" className="text-sm text-red-700 mt-4">{error}</p>}
    </Card>
  </>;
}
