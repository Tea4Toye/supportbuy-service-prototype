import { useState } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";

export default function ServiceDetail() {
  const [activeTab, setActiveTab] = useState("Description");

  const location = useLocation();
  const service = location.state?.service;

  const [checkIn, setCheckIn] = useState("2026-01-08");
  const [checkOut, setCheckOut] = useState("2026-01-11");
  const [date, setDate] = useState("2026-01-08");
  const [time, setTime] = useState("10:00 AM");
  const [quantity, setQuantity] = useState(1);
  const [hours, setHours] = useState(2);

  if (!service) return <Navigate to="/services" />;

  let durationText = "";
  let calculatedTotal = service.basePrice || 0;
  let multiplier = 1;

  if (service.unit === "/Night") {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    let nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    if (isNaN(nights) || nights < 1) nights = 1;
    multiplier = nights;
    durationText = `${nights} Night${nights > 1 ? 's' : ''}`;
    calculatedTotal = service.basePrice * nights;
  } else if (service.unit === "/Hour") {
    multiplier = Math.max(1, parseInt(hours) || 1);
    durationText = `${multiplier} Hour${multiplier > 1 ? 's' : ''}`;
    calculatedTotal = service.basePrice * multiplier;
  } else if (service.unit === "/Session") {
    multiplier = 1;
    durationText = "1 Session";
    calculatedTotal = service.basePrice;
  } else if (service.unit === "/Item" || service.unit === "/Trip") {
    multiplier = Math.max(1, parseInt(quantity) || 1);
    const unitName = service.unit === "/Item" ? "Item" : "Trip";
    durationText = `${multiplier} ${unitName}${multiplier > 1 ? 's' : ''}`;
    calculatedTotal = service.basePrice * multiplier;
  }

  const formattedTotal = `₦${calculatedTotal.toLocaleString()}`;

  const renderBookingInput = () => {
    if (service.unit === "/Night") {
      return (
        <div className="flex bg-white rounded-xl overflow-hidden border border-gray-200 mb-2 divide-x divide-gray-200">
          <div className="flex-1 p-3 cursor-text">
            <div className="text-[10px] uppercase text-gray-400 font-bold mb-1">Check-In</div>
            <input 
              type="date" 
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full text-[#1E232A] font-medium text-sm focus:outline-none"
            />
          </div>
          <div className="flex-1 p-3 cursor-text">
            <div className="text-[10px] uppercase text-gray-400 font-bold mb-1">Check-Out</div>
            <input 
              type="date" 
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full text-[#1E232A] font-medium text-sm focus:outline-none"
            />
          </div>
        </div>
      );
    } else if (service.unit === "/Hour") {
      return (
        <div className="flex bg-white rounded-xl overflow-hidden border border-gray-200 mb-2 divide-x divide-gray-200">
          <div className="flex-1 p-3 cursor-text">
            <div className="text-[10px] uppercase text-gray-400 font-bold mb-1">Date</div>
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full text-[#1E232A] font-medium text-sm focus:outline-none"
            />
          </div>
          <div className="flex-1 p-3 cursor-text">
            <div className="text-[10px] uppercase text-gray-400 font-bold mb-1">Hours Required</div>
            <input 
              type="number" 
              min="1"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="w-full text-[#1E232A] font-medium text-sm focus:outline-none"
            />
          </div>
        </div>
      );
    } else if (service.unit === "/Session") {
      return (
        <div className="flex bg-white rounded-xl overflow-hidden border border-gray-200 mb-2 divide-x divide-gray-200">
          <div className="flex-1 p-3 cursor-text">
            <div className="text-[10px] uppercase text-gray-400 font-bold mb-1">Service Date</div>
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full text-[#1E232A] font-medium text-sm focus:outline-none"
            />
          </div>
          <div className="flex-1 p-3 cursor-text">
            <div className="text-[10px] uppercase text-gray-400 font-bold mb-1">Time Slot</div>
            <select className="w-full text-[#1E232A] font-medium text-sm focus:outline-none bg-transparent">
              <option>Morning (8AM - 12PM)</option>
              <option>Afternoon (12PM - 4PM)</option>
              <option>Evening (4PM - 8PM)</option>
            </select>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex bg-white rounded-xl overflow-hidden border border-gray-200 mb-2 divide-x divide-gray-200">
          <div className="flex-1 p-3 cursor-text">
            <div className="text-[10px] uppercase text-gray-400 font-bold mb-1">Date</div>
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full text-[#1E232A] font-medium text-sm focus:outline-none"
            />
          </div>
          <div className="flex-1 p-3 cursor-text">
            <div className="text-[10px] uppercase text-gray-400 font-bold mb-1">Quantity</div>
            <input 
              type="number" 
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full text-[#1E232A] font-medium text-sm focus:outline-none"
            />
          </div>
        </div>
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 pb-10">
      {/* Left Column - Gallery */}
      <div className="flex flex-col gap-4 -mx-4 md:mx-0 w-[calc(100%+2rem)] md:w-5/12">
        {/* Images */}
        <div className="w-full aspect-[4/3] rounded-none md:rounded-[2rem] overflow-hidden bg-gray-200">
          <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
        </div>
        <div className="w-full aspect-[4/3] rounded-none md:rounded-[2rem] overflow-hidden bg-gray-200 hidden md:block">
          <img src={service.image} alt={`${service.title} Alternate`} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Right Column - Details */}
      <div className="w-full md:w-7/12 flex flex-col">
        {/* White container */}
        <div className="bg-white rounded-[2rem] p-8 shadow-sm">
          {/* Header row: Category & actions */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-500 font-medium tracking-wide text-sm uppercase">Ikeja, Lagos</span>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
                <span className="material-symbols-outlined text-[20px]">favorite</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
                <span className="material-symbols-outlined text-[20px]">share</span>
              </button>
            </div>
          </div>

          <h1 className="text-3xl font-outfit font-bold text-[#1E232A] mb-3">{service.title}</h1>
          
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-[20px] text-yellow-500" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
            <span className="font-semibold text-gray-700">{service.rating} <span className="font-normal text-gray-500">({service.reviews})</span></span>
          </div>

          <div className="mb-8">
            <span className="text-3xl font-bold text-green-700">{service.price}</span>
            <span className="text-gray-500 ml-1">{service.unit}</span>
          </div>

          {/* Merchant Card */}
          <div className="flex items-center justify-between py-4 border-y border-gray-100 mb-8 cursor-pointer hover:bg-gray-50 transition-colors -mx-4 px-4 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden shrink-0 flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=200&auto=format&fit=crop" alt={service.merchant} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-[#1E232A] text-base">{service.merchant}</h3>
                <p className="text-sm text-gray-500">2 years on SupportBuy</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-gray-400">chevron_right</span>
          </div>

          {/* Booking Card */}
          <div className="bg-[#F5F6F8] rounded-[1.5rem] p-6 mb-8">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Select Duration and Schedule:</h4>
            
            {/* Input area */}
            {renderBookingInput()}
            
            <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-medium text-gray-600">Total duration: <span className="font-bold text-[#1E232A]">{durationText}</span></span>
                <span className="text-lg font-bold text-green-700">{formattedTotal}</span>
            </div>

            <div className="hidden md:flex gap-3 mb-6">
              <Link to="/booking-summary" state={{ service, bookingDetails: { durationText, formattedTotal, multiplier } }} className="flex-1 bg-primary hover:bg-[#b5e032] text-[#1E232A] font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                Request a Booking
              </Link>
              <button className="px-6 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-xl transition-colors whitespace-nowrap">
                Add to Wishlist
              </button>
            </div>

            {/* Campaign Banner */}
            <div className="bg-white border border-green-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-[#1E232A] text-sm mb-1">Need help funding this?</h4>
                <p className="text-xs text-gray-500">Create a campaign and let others contribute</p>
              </div>
              <Link 
                to="/campaigns/create/service" 
                state={{ service, bookingDetails: { durationText, formattedTotal, multiplier } }}
                className="bg-green-50 hover:bg-green-100 text-green-700 font-bold py-2 px-4 rounded-lg text-sm transition-colors whitespace-nowrap inline-flex items-center justify-center"
              >
                Start Campaign
              </Link>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex bg-[#F5F6F8] rounded-xl p-1 mb-6">
            <button 
              onClick={() => setActiveTab("Description")}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === "Description" ? "bg-white text-[#1E232A] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              Description
            </button>
            <button 
              onClick={() => setActiveTab("Reviews")}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === "Reviews" ? "bg-white text-[#1E232A] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              Reviews ({service.reviews})
            </button>
          </div>

          {/* Tab Content */}
          <div className="pt-2">
            {activeTab === "Description" && (
              <div>
                <h2 className="text-xl font-outfit font-bold text-[#1E232A] mb-4">Product Description</h2>
                <div className="text-gray-600 text-sm space-y-4 leading-relaxed">
                  <p>
                    Experience luxury living with our top-rated service in the heart of the city. Perfect for all your needs.
                  </p>
                  <p>
                    We provide high quality service guaranteed to meet your expectations.
                  </p>
                </div>
              </div>
            )}
            {activeTab === "Reviews" && (
              <div>
                <h2 className="text-xl font-outfit font-bold text-[#1E232A] mb-4">Customer Reviews</h2>
                <div className="text-gray-500 text-sm">
                  <p>Reviews will be loaded here.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sticky Booking Action Bar */}
      <div className="md:hidden fixed bottom-[calc(56px+max(env(safe-area-inset-bottom),0.5rem))] left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-[0_-8px_20px_-10px_rgba(0,0,0,0.08)] z-40">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-green-700">{formattedTotal}</span>
        </div>
        <Link to="/booking-summary" state={{ service, bookingDetails: { durationText, formattedTotal, multiplier } }} className="w-full bg-primary hover:bg-[#b5e032] text-[#1E232A] font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
          <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
          Request a Booking
        </Link>
      </div>

    </div>
  );
}
