import test from 'node:test';
import assert from 'node:assert/strict';
import { transitionBooking } from './bookingLifecycle.js';

test('provider completion needs customer confirmation and cannot be repeated', () => {
  const original = { lifecycle: 'service', status: 'confirmed' };
  const started = transitionBooking(original, { type: 'provider_started' });
  const finished = transitionBooking(started, { type: 'provider_finished' });
  assert.equal(finished.status, 'awaiting_confirmation');
  const completed = transitionBooking(finished, { type: 'customer_confirmed' });
  assert.equal(completed.status, 'completed');
  assert.ok(completed.completedAt);
  assert.equal(original.status, 'confirmed');
  assert.throws(() => transitionBooking(original, { type: 'customer_confirmed' }));
  assert.throws(() => transitionBooking(completed, { type: 'customer_confirmed' }));
});

test('reported problems stay unresolved and require an explanation', () => {
  const booking = { lifecycle: 'service', status: 'awaiting_confirmation' };
  assert.throws(() => transitionBooking(booking, { type: 'report_issue', explanation: ' ' }));
  const result = transitionBooking(booking, { type: 'report_issue', explanation: 'Installation unfinished.' });
  assert.equal(result.status, 'issue_reported');
  assert.equal(result.completedAt, undefined);
});

test('review is separate from completion and can only be submitted once', () => {
  assert.throws(() => transitionBooking({ status: 'confirmed' }, { type: 'submit_review', rating: 5 }));
  const result = transitionBooking({ status: 'completed' }, { type: 'submit_review', rating: 5, text: 'Great' });
  assert.equal(result.review.rating, 5);
  assert.throws(() => transitionBooking(result, { type: 'submit_review', rating: 4 }));
  assert.throws(() => transitionBooking({ status: 'completed' }, { type: 'submit_review', rating: 6 }));
});

const stay = () => ({ lifecycle: 'stay', status: 'checked_in', depositStatus: 'held', service: { lifecycle: 'stay', billingUnit: 'night', rate: 190000, serviceFeeRate: 0.03, cautionDeposit: 70000 }, selection: { startDate: '2026-10-08', endDate: '2026-10-11' }, price: { quantity: 3, subtotal: 570000, serviceFee: 17100, cautionDeposit: 70000, total: 657100 } });

test('stay extension uses booked rate, updates checkout and retains one deposit', () => {
  const result = transitionBooking(stay(), { type: 'extend_stay', nights: 2 });
  assert.equal(result.selection.endDate, '2026-10-13');
  assert.equal(result.price.cautionDeposit, 70000);
  assert.equal(result.price.total, 1048500);
  assert.equal(result.extensions[0].charge, 391400);
  assert.throws(() => transitionBooking(stay(), { type: 'extend_stay', nights: 4 }));
  assert.throws(() => transitionBooking({ ...stay(), status: 'completed' }, { type: 'extend_stay', nights: 1 }));
});

test('stay refund completes, while disputed damage remains unresolved', () => {
  const checkedOut = transitionBooking(stay(), { type: 'check_out' });
  const refunded = transitionBooking(checkedOut, { type: 'refund_deposit' });
  assert.equal(refunded.status, 'completed');
  assert.equal(refunded.depositStatus, 'refunded');
  const claim = transitionBooking(checkedOut, { type: 'report_damage', amount: 35000, description: 'Broken lamp' });
  assert.throws(() => transitionBooking(claim, { type: 'refund_deposit' }));
  const disputed = transitionBooking(claim, { type: 'dispute_claim', explanation: 'Lamp already broken.' });
  assert.equal(disputed.status, 'issue_reported');
  assert.equal(disputed.depositStatus, 'disputed');
  assert.equal(disputed.completedAt, undefined);
  const accepted = transitionBooking(claim, { type: 'accept_claim' });
  assert.equal(accepted.refundAmount, 35000);
  assert.equal(accepted.status, 'completed');
});
