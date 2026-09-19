import { useState } from 'react';
import { useBookings } from '../bookings/BookingProvider';
import { Card, Icon } from '../bookings/BookingUI';
import { inputClass, primaryButton, secondaryButton } from '../bookings/bookingPresentation';
import { formatMoney } from '../bookings/bookingModel';
import Modal from '../components/Modal';
import ExtensionModal from '../components/ExtensionModal';

export default function ActiveBookingDetail({ booking }) {
  const { updateBooking } = useBookings();
  const [error, setError] = useState('');
  const [problem, setProblem] = useState(null);
  const [explanation, setExplanation] = useState('');
  const [extendOpen, setExtendOpen] = useState(false);
  const stay = booking.lifecycle === 'stay';
  const stages = stay ? [['confirmed', 'Booking confirmed'], ['checked_in', 'Checked in'], ['deposit_pending', 'Checked out · deposit review'], ['completed', 'Completed']] : [['confirmed', 'Booking confirmed'], ['in_progress', 'Service in progress'], ['awaiting_confirmation', 'Waiting for your confirmation'], ['completed', 'Completed']];
  const current = stages.findIndex(([status]) => status === booking.status);
  function act(event) {
    try { updateBooking(booking.id, event); setError(''); setProblem(null); setExplanation(''); }
    catch (actionError) { setError(actionError.message); }
  }
  function openProblem(type) { setProblem(type); setExplanation(''); setError(''); }
  return <>
    <Card title={stay ? 'Stay progress' : 'Booking progress'}>
      {booking.status !== 'issue_reported' && <ol className="space-y-5 mb-6">{stages.map(([status, title], index) => <li key={status} aria-current={index === current ? 'step' : undefined} className="flex items-center gap-3"><span className={`w-7 h-7 rounded-full flex shrink-0 items-center justify-center ${index <= current ? 'bg-[#2F9E44] text-white' : 'bg-gray-100 text-gray-400'}`}><Icon className="text-base">{index < current ? 'check' : index === current ? 'schedule' : 'circle'}</Icon></span><span className={`text-sm ${index <= current ? 'font-medium' : 'text-gray-400'}`}>{title}</span></li>)}</ol>}
      {booking.status === 'issue_reported' && <div className="rounded-xl bg-orange-50 p-4 text-sm text-orange-900"><h3 className="font-semibold mb-2">Issue reported</h3><p className="break-words">{booking.issue?.explanation}</p><p className="mt-3">This booking remains unresolved. Resolution is not simulated in this prototype.{stay ? ' The caution deposit has not been refunded.' : ''}</p></div>}
      {!stay && <div className="space-y-4">
        {booking.status === 'confirmed' && <><p className="text-sm text-gray-500">{booking.service.appointment ? 'Your appointment is confirmed. Follow the location and arrival instructions above.' : 'Your booking is confirmed. Your provider will start the service at the booked time.'}</p><button className={secondaryButton} onClick={() => act({ type: 'provider_started' })}>Demo: provider starts service</button></>}
        {booking.status === 'in_progress' && <><p className="text-sm text-gray-500">Your service is in progress. You will confirm completion after the provider finishes.</p><div className="flex flex-wrap gap-3"><button className={secondaryButton} onClick={() => act({ type: 'provider_finished' })}>Demo: provider finishes service</button><button className={secondaryButton} onClick={() => openProblem('report_issue')}>Report a problem</button></div></>}
        {booking.status === 'awaiting_confirmation' && <><p className="text-sm text-gray-500">The provider has marked this {booking.service.appointment ? 'appointment' : 'service'} as finished. Confirm that it took place and the booked work is complete, or tell us what went wrong.</p><div className="flex flex-wrap gap-3"><button className={primaryButton} onClick={() => act({ type: 'customer_confirmed' })}>Confirm completion</button><button className={secondaryButton} onClick={() => openProblem('report_issue')}>Report a problem</button></div></>}
      </div>}
      {stay && <div className="space-y-4">
        {['confirmed', 'checked_in'].includes(booking.status) && <><div className="bg-green-50 rounded-xl p-4"><p className="text-xs font-medium text-green-800 mb-1">Property access code</p><p className="text-2xl tracking-[0.3em] font-bold text-green-900">{booking.accessCode}</p><p className="text-xs text-gray-500 mt-2">Demo access code for this booking.</p></div><div className="flex flex-wrap gap-3"><button className={primaryButton} onClick={() => act({ type: booking.status === 'confirmed' ? 'check_in' : 'check_out' })}>{booking.status === 'confirmed' ? 'Demo: check in' : 'Demo: check out'}</button><button className={secondaryButton} onClick={() => setExtendOpen(true)}>Extend stay</button></div></>}
        {booking.status === 'deposit_pending' && booking.depositStatus === 'held' && <><p className="text-sm text-gray-500">You have checked out. The caution deposit of {formatMoney(booking.price.cautionDeposit)} is awaiting review.</p><div className="flex flex-wrap gap-3"><button className={primaryButton} onClick={() => act({ type: 'refund_deposit' })}>Demo: refund caution deposit</button><button className={secondaryButton} onClick={() => act({ type: 'report_damage', amount: Math.min(35000, booking.price.cautionDeposit), description: 'The provider reported a damaged bedside lamp.' })}>Demo: provider reports damage</button></div></>}
        {booking.status === 'deposit_pending' && booking.depositStatus === 'claim_pending' && <div className="rounded-xl border border-orange-100 bg-orange-50 p-4 space-y-3 text-sm"><h3 className="font-semibold text-orange-900">Damage claim · {formatMoney(booking.claim.amount)}</h3><p>{booking.claim.description}</p><p>Accepting this claim deducts {formatMoney(booking.claim.amount)} from the deposit and simulates a refund of {formatMoney(booking.price.cautionDeposit - booking.claim.amount)}.</p><div className="flex flex-wrap gap-3"><button className={primaryButton} onClick={() => act({ type: 'accept_claim' })}>Accept claim</button><button className={secondaryButton} onClick={() => openProblem('dispute_claim')}>Dispute claim</button></div></div>}
      </div>}
      {error && !problem && <p role="alert" className="text-sm text-red-700 mt-4">{error}</p>}
    </Card>
    {problem && <Modal title={problem === 'dispute_claim' ? 'Dispute damage claim' : 'Report a problem'} onClose={() => { setProblem(null); setError(''); }}><form className="p-5 space-y-4" onSubmit={event => { event.preventDefault(); act({ type: problem, explanation }); }}><p className="text-sm text-gray-500">Explain what happened. Your booking will stay unresolved after you submit this report.</p><label className="block text-sm font-medium">What went wrong?<textarea required value={explanation} onChange={event => setExplanation(event.target.value)} rows={4} className={`${inputClass} mt-2`} /></label>{error && <p role="alert" className="text-sm text-red-700">{error}</p>}<button className={`${primaryButton} w-full`} type="submit">Submit report</button></form></Modal>}
    <ExtensionModal booking={booking} isOpen={extendOpen} onClose={() => setExtendOpen(false)} />
  </>;
}
