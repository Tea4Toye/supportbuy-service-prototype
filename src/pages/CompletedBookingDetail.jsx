import React from 'react';
import { useNavigate } from 'react-router-dom';

const CompletedBookingDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <button 
        onClick={() => navigate('/orders')} 
        className="flex items-center text-[#555] hover:text-[#1E232A] mb-6 transition-colors"
      >
        <span className="material-symbols-outlined mr-2 text-xl">arrow_back</span>
      </button>

      <div className="flex items-center gap-2 mb-6 text-xl">
        <span className="material-symbols-outlined">local_shipping</span>
        <h1 className="font-outfit font-semibold text-[#1E232A]">
          Completed Booking: <span className="text-[#2F9E44]">#SB-RENT-89201</span>
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column */}
        <div className="flex-1 space-y-6">
          
          {/* Property Card */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-xl font-outfit font-semibold text-[#1E232A] mb-4">3 Bedroom Shortlet Apartment</h2>
            
            <div className="space-y-3">
              <div className="flex items-start text-[#555]">
                <span className="material-symbols-outlined text-[#FF3B30] mr-3">location_on</span>
                <span className="text-sm">Flat 4B, Oceanview Towers, Plot 14 Admiralty Way, Lekki Phase 1</span>
              </div>
              <div className="flex items-center text-[#555]">
                <span className="material-symbols-outlined text-[#4285F4] mr-3">calendar_month</span>
                <span className="text-sm">Jan 8, 2026 (2:00 PM)</span>
                <span className="material-symbols-outlined mx-3 text-gray-400">arrow_forward</span>
                <span className="text-sm">Jan 11, 2026 (11:00 AM)</span>
              </div>
            </div>
          </div>

          {/* Booking Status */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex flex-col items-center justify-center py-10">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-green-600 text-3xl">check_circle</span>
            </div>
            <h3 className="font-outfit font-semibold text-[#1E232A] mb-2 text-xl">Booking Completed</h3>
            <p className="text-gray-500 text-sm text-center max-w-sm">
              This booking has been successfully completed. The final payment was released to the host and caution deposit processed.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-[400px] space-y-6">
          
          {/* Booking Summary */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h3 className="font-outfit font-semibold text-[#1E232A] mb-4 text-lg">Booking Summary</h3>
            <div className="flex items-center gap-4">
              <img 
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=200" 
                alt="Apartment" 
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="text-[#1E232A] text-sm font-medium mb-1">3 Bedroom Shortlet Apartment</h4>
                <p className="text-gray-500 text-xs">Pixel Home • 3 Days</p>
              </div>
              <div className="font-semibold text-[#1E232A] text-sm">
                ₦570,000
              </div>
            </div>
          </div>

          {/* Host Details */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h3 className="font-outfit font-semibold text-[#1E232A] mb-4 text-lg">Host Details</h3>
            <div className="flex items-center gap-3 mb-2">
              <img 
                src="https://images.unsplash.com/photo-1560518846-3b957f897626?auto=format&fit=crop&q=80&w=100" 
                alt="Pixel Home" 
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-semibold text-[#1E232A]">Pixel Home</span>
            </div>
            <div className="flex items-center text-sm text-[#555]">
              <span>2 years on SupportBuy</span>
              <span className="mx-2">•</span>
              <span className="text-yellow-400 mr-1">⭐</span>
              <span>4.9</span>
            </div>
          </div>

          {/* Fees Breakdown */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h3 className="font-outfit font-semibold text-[#1E232A] mb-4 text-lg">Fees Breakdown</h3>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-[#555]">Base Accommodation:</span>
                <span className="font-medium text-[#1E232A]">₦570,000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#555]">Refundable Caution Fee</span>
                <span className="font-medium text-[#1E232A]">₦70,000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#555]">Service Charge(3%)</span>
                <span className="font-medium text-[#1E232A]">₦17,100</span>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-100 flex justify-between">
              <span className="font-semibold text-[#1E232A]">Total</span>
              <span className="font-bold text-[#2F9E44]">₦657,100</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default CompletedBookingDetail;
