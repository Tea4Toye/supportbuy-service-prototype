import { useState } from "react";
import { Link } from "react-router-dom";

export default function ServiceDetail() {
  const [activeTab, setActiveTab] = useState("Description");

  const [checkIn, setCheckIn] = useState("Jan 8, 2026");
  const [checkOut, setCheckOut] = useState("Jan 11, 2026");

  // In a real app we'd parse dates, just mock for now to match UI requirement
  const duration = "3 Days";

  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 pb-10">
      {/* Left Column - Gallery */}
      <div className="flex flex-col gap-4 -mx-4 md:mx-0 w-[calc(100%+2rem)] md:w-5/12">
        {/* Images */}
        <div className="w-full aspect-[4/3] rounded-none md:rounded-[2rem] overflow-hidden bg-gray-200">
          <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop" alt="Living Room 1" className="w-full h-full object-cover" />
        </div>
        <div className="w-full aspect-[4/3] rounded-none md:rounded-[2rem] overflow-hidden bg-gray-200 hidden md:block">
          <img src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=800&auto=format&fit=crop" alt="Living Room 2" className="w-full h-full object-cover" />
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

          <h1 className="text-3xl font-outfit font-bold text-[#1E232A] mb-3">3 Bedroom Shortlet Apartment</h1>
          
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-[20px] text-yellow-500" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
            <span className="font-semibold text-gray-700">4.9 <span className="font-normal text-gray-500">(256)</span></span>
          </div>

          <div className="mb-8">
            <span className="text-3xl font-bold text-green-700">₦190,000</span>
            <span className="text-gray-500 ml-1">/Day</span>
          </div>

          {/* Merchant Card */}
          <div className="flex items-center justify-between py-4 border-y border-gray-100 mb-8 cursor-pointer hover:bg-gray-50 transition-colors -mx-4 px-4 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden shrink-0 flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=200&auto=format&fit=crop" alt="Pixel Home" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-[#1E232A] text-base">Pixel Home</h3>
                <p className="text-sm text-gray-500">2 years on SupportBuy</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-gray-400">chevron_right</span>
          </div>

          {/* Booking Card */}
          <div className="bg-[#F5F6F8] rounded-[1.5rem] p-6 mb-8">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Select Duration and Schedule:</h4>
            
            {/* Input area */}
            <div className="flex bg-white rounded-xl overflow-hidden border border-gray-200 mb-2 divide-x divide-gray-200">
              <div className="flex-1 p-3 cursor-text">
                <div className="text-[10px] uppercase text-gray-400 font-bold mb-1">Check-In</div>
                <input 
                  type="text" 
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full text-[#1E232A] font-medium text-sm focus:outline-none"
                />
              </div>
              <div className="flex-1 p-3 cursor-text">
                <div className="text-[10px] uppercase text-gray-400 font-bold mb-1">Check-Out</div>
                <input 
                  type="text" 
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full text-[#1E232A] font-medium text-sm focus:outline-none"
                />
              </div>
            </div>
            
            <div className="flex justify-end mb-6">
                <span className="text-xs font-medium text-gray-600">Total duration: <span className="font-bold text-[#1E232A]">{duration}</span></span>
            </div>

            <div className="flex gap-3 mb-6">
              <Link to="/booking-summary" className="flex-1 bg-primary hover:bg-[#b5e032] text-[#1E232A] font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
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
              <button className="bg-[#123F1E] hover:bg-[#0c2a14] text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
                Create Campaign
              </button>
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
              Reviews (256)
            </button>
          </div>

          {/* Tab Content */}
          <div className="pt-2">
            {activeTab === "Description" && (
              <div>
                <h2 className="text-xl font-outfit font-bold text-[#1E232A] mb-4">Product Description</h2>
                <div className="text-gray-600 text-sm space-y-4 leading-relaxed">
                  <p>
                    Experience luxury living in this fully furnished 3-bedroom shortlet apartment located in the heart of Ikeja, Lagos. Perfect for family vacations, business trips, or a weekend getaway.
                  </p>
                  <p>
                    The apartment features high-speed internet, 24/7 power supply, a fully equipped modern kitchen, and round-the-clock security. Each room is en-suite with premium bedding and smart TVs.
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
        <Link to="/booking-summary" className="w-full bg-primary hover:bg-[#b5e032] text-[#1E232A] font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
          <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
          Request a Booking
        </Link>
      </div>

    </div>
  );
}
