import { useState } from 'react';
import Modal from './Modal';
import { useBookings } from '../bookings/BookingProvider';
import { Icon } from '../bookings/BookingUI';
import { inputClass, primaryButton } from '../bookings/bookingPresentation';

function BookingChat({ booking, onClose }) {
  const { sendMessage } = useBookings();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  function send(event) {
    event.preventDefault();
    if (!message.trim()) return;
    try {
      sendMessage(booking.id, message.trim());
      setMessage('');
      setError('');
    } catch (cause) { setError(cause.message); }
  }
  return <Modal title={booking.service.merchant} onClose={onClose} className="booking-chat">
    <div className="p-5 border-b border-gray-100">
      <p className="text-sm font-medium">{booking.service.title}</p>
      <p className="text-xs text-gray-500 mt-1">{booking.reference} · Demo conversation. Messages stay in this browser.</p>
    </div>
    <div className="p-5 space-y-4 bg-gray-50/50 max-h-[45dvh] min-h-40 overflow-y-auto" role="log" aria-label="Booking messages" aria-live="polite">
      {!booking.messages?.length && <p className="text-sm text-gray-500 text-center">No messages yet. Start a conversation about this booking.</p>}
      {(booking.messages || []).map(item => <div key={item.id} className={'flex ' + (item.sender === 'customer' ? 'justify-end' : 'justify-start')}>
        <div className={'max-w-[85%] rounded-2xl p-3 text-sm break-words ' + (item.sender === 'customer' ? 'bg-[#1E232A] text-white rounded-tr-sm' : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm')}>
          <p className="text-xs opacity-70 mb-1">{item.sender === 'customer' ? 'You' : booking.service.merchant}</p><p className="whitespace-pre-wrap">{item.text}</p>
          <p className="text-[10px] opacity-70 mt-2 text-right">{new Date(item.createdAt).toLocaleString('en-NG', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Lagos' })} WAT</p>
        </div>
      </div>)}
    </div>
    <form onSubmit={send} className="p-5 border-t border-gray-100">
      {error && <p role="alert" className="text-sm text-red-700 mb-3">{error}</p>}
      <div className="flex gap-2">
        <label className="flex-1 min-w-0"><span className="sr-only">Message to {booking.service.merchant}</span><input className={inputClass} value={message} onChange={event => setMessage(event.target.value)} placeholder="Type a message..." maxLength={2000} /></label>
        <button type="submit" aria-label="Send message" disabled={!message.trim()} className={primaryButton + ' shrink-0 !px-3'}><Icon>send</Icon></button>
      </div>
    </form>
  </Modal>;
}

export default function ChatDrawer({ booking, isOpen, onClose }) {
  if (!isOpen || !booking) return null;
  return <BookingChat key={booking.id} booking={booking} onClose={onClose} />;
}
