import { addDays, calculatePrice } from './bookingModel.js';

export const statusLabels = {
  confirmed: 'Confirmed', in_progress: 'In progress', awaiting_confirmation: 'Awaiting your confirmation',
  completed: 'Completed', issue_reported: 'Issue reported', checked_in: 'Checked in', deposit_pending: 'Deposit pending',
};

export function transitionBooking(booking, event) {
  const timestamp = event.now || new Date().toISOString();
  const result = structuredClone(booking);
  const requireState = (...allowed) => {
    if (!allowed.includes(booking.status)) throw new Error('This action is not available at this booking stage.');
  };
  const explanation = () => {
    const text = String(event.explanation || '').trim();
    if (!text) throw new Error('Please explain the problem.');
    return text;
  };
  const complete = () => { result.status = 'completed'; result.completedAt = timestamp; };

  if (event.type === 'submit_review') {
    requireState('completed');
    if (booking.review) throw new Error('You have already reviewed this booking.');
    const rating = Number(event.rating);
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) throw new Error('Choose a rating from 1 to 5.');
    result.review = { rating, text: String(event.text || '').trim(), createdAt: timestamp };
  } else if (booking.lifecycle === 'service') {
    switch (event.type) {
      case 'provider_started': requireState('confirmed'); result.status = 'in_progress'; result.startedAt = timestamp; break;
      case 'provider_finished': requireState('in_progress'); result.status = 'awaiting_confirmation'; result.providerFinishedAt = timestamp; break;
      case 'customer_confirmed': requireState('awaiting_confirmation'); complete(); break;
      case 'report_issue':
        requireState('in_progress', 'awaiting_confirmation');
        result.issue = { explanation: explanation(), createdAt: timestamp }; result.status = 'issue_reported'; break;
      default: throw new Error('Unsupported service action.');
    }
  } else if (booking.lifecycle === 'stay') {
    switch (event.type) {
      case 'check_in': requireState('confirmed'); result.status = 'checked_in'; result.checkedInAt = timestamp; break;
      case 'check_out': requireState('checked_in'); result.status = 'deposit_pending'; result.checkedOutAt = timestamp; break;
      case 'extend_stay': {
        requireState('confirmed', 'checked_in');
        const nights = Number(event.nights);
        if (!Number.isInteger(nights) || nights < 1 || nights > 3) throw new Error('Choose 1 to 3 extra nights.');
        result.selection.endDate = addDays(booking.selection.endDate, nights);
        result.price = calculatePrice(booking.service, result.selection);
        result.extensions = [...(booking.extensions || []), { nights, charge: result.price.total - booking.price.total, createdAt: timestamp }];
        break;
      }
      case 'refund_deposit':
        requireState('deposit_pending');
        if (booking.depositStatus !== 'held') throw new Error('Resolve the damage claim before processing a refund.');
        result.depositStatus = 'refunded'; result.refundAmount = booking.price.cautionDeposit; complete(); break;
      case 'report_damage': {
        requireState('deposit_pending');
        if (booking.depositStatus !== 'held') throw new Error('A damage claim is already open.');
        const amount = Number(event.amount);
        const description = String(event.description || '').trim();
        if (!Number.isFinite(amount) || amount <= 0 || amount > booking.price.cautionDeposit || !description) throw new Error('Enter a description and an amount within the held deposit.');
        result.claim = { amount, description, createdAt: timestamp }; result.depositStatus = 'claim_pending'; break;
      }
      case 'accept_claim':
        requireState('deposit_pending');
        if (booking.depositStatus !== 'claim_pending' || !booking.claim) throw new Error('There is no pending damage claim.');
        result.depositStatus = 'partial_refund'; result.refundAmount = booking.price.cautionDeposit - booking.claim.amount; complete(); break;
      case 'dispute_claim':
        requireState('deposit_pending');
        if (booking.depositStatus !== 'claim_pending' || !booking.claim) throw new Error('There is no pending damage claim.');
        result.issue = { explanation: explanation(), createdAt: timestamp }; result.depositStatus = 'disputed'; result.status = 'issue_reported'; break;
      default: throw new Error('Unsupported stay action.');
    }
  } else throw new Error('Unknown booking lifecycle.');
  result.updatedAt = timestamp;
  return result;
}
