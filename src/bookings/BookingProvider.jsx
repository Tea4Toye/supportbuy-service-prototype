import { createContext, useContext, useState, useSyncExternalStore } from 'react';
import { createBookingStore } from './bookingStore.js';

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [store] = useState(() => createBookingStore());
  const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
  return <BookingContext.Provider value={{ ...store, ...snapshot }}>{children}</BookingContext.Provider>;
}

// Context and its hook intentionally share this module.
// oxlint-disable-next-line react/only-export-components
export function useBookings() {
  const value = useContext(BookingContext);
  if (!value) throw new Error('useBookings must be called within BookingProvider.');
  return value;
}

export default BookingProvider;
