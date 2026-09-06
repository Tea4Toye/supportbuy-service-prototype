import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ServicesCatalog from "./pages/ServicesCatalog";
import ServiceDetail from "./pages/ServiceDetail";
import BookingSummary from "./pages/BookingSummary";
import Checkout from "./pages/Checkout";
import BookingConfirmed from "./pages/BookingConfirmed";
import MyOrders from "./pages/MyOrders";
import ActiveBookingDetail from "./pages/ActiveBookingDetail";
import CompletedBookingDetail from "./pages/CompletedBookingDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/services" replace />} />
          <Route path="services" element={<ServicesCatalog />} />
          <Route path="services/3-bedroom-shortlet" element={<ServiceDetail />} />
          <Route path="booking-summary" element={<BookingSummary />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="booking-confirmed" element={<BookingConfirmed />} />
          <Route path="booking/active" element={<ActiveBookingDetail />} />
          <Route path="booking/completed" element={<CompletedBookingDetail />} />
          
          <Route path="campaigns" element={<div><h1 className="text-2xl font-outfit font-semibold mb-4 text-[#1E232A]">My Campaigns</h1></div>} />
          <Route path="shop" element={<div><h1 className="text-2xl font-outfit font-semibold mb-4 text-[#1E232A]">Shop</h1></div>} />
          <Route path="feed" element={<div><h1 className="text-2xl font-outfit font-semibold mb-4 text-[#1E232A]">Feed</h1></div>} />
          <Route path="profile" element={<div><h1 className="text-2xl font-outfit font-semibold mb-4 text-[#1E232A]">My Profile</h1></div>} />
          <Route path="wishlist" element={<div><h1 className="text-2xl font-outfit font-semibold mb-4 text-[#1E232A]">My Wishlist</h1></div>} />
          <Route path="circles" element={<div><h1 className="text-2xl font-outfit font-semibold mb-4 text-[#1E232A]">My Circles</h1></div>} />
          <Route path="orders" element={<MyOrders />} />
          <Route path="settings" element={<div><h1 className="text-2xl font-outfit font-semibold mb-4 text-[#1E232A]">Settings</h1></div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
