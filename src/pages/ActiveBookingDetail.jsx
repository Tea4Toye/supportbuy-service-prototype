import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatDrawer from '../components/ChatDrawer';
import ExtensionModal from '../components/ExtensionModal';

const ActiveBookingDetail = () => {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExtendModalOpen, setIsExtendModalOpen] = useState(false);

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
        <span className="material-symbols-outlined">local_shipping</span> {/* Actually looks like a truck but might be property icon in original, but the prompt says 'Active Booking: #SB-RENT-89201' */}
        <h1 className="font-outfit font-semibold text-[#1E232A]">
          Active Booking: <span className="text-[#2F9E44]">#SB-RENT-89201</span>
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

          {/* Live Status Timeline */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h3 className="font-outfit font-semibold text-[#1E232A] mb-6 text-lg">Live Status Timeline</h3>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
              {/* Note: I'll use a simpler timeline approach without the complicated before pseudo element to match the design cleanly */}
            </div>
            
            <div className="flex flex-col gap-6 relative">
              {/* Timeline Line */}
              <div className="absolute left-[11px] top-3 bottom-4 w-0.5 bg-gray-200 z-0"></div>

              {/* Step 1 */}
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-6 h-6 rounded-full bg-[#2F9E44] flex items-center justify-center text-white flex-shrink-0">
                  <span className="material-symbols-outlined text-sm">check</span>
                </div>
                <div className="text-sm">
                  <span className="text-[#1E232A]">Payment Escrowed </span>
                  <span className="text-[#2F9E44] font-medium">(₦657,100)</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-6 h-6 rounded-full bg-[#2F9E44] flex items-center justify-center text-white flex-shrink-0">
                  <span className="material-symbols-outlined text-sm">check</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#1E232A] text-sm">Access Code Unlocked:</span>
                  <div className="flex gap-1">
                    {[8, 4, 1, 2].map((num, i) => (
                      <span key={i} className="bg-[#1E232A] text-white text-xs px-2 py-1 rounded">
                        {num}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 3 (Active) */}
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-6 h-6 rounded-full border-2 border-[#8CD82C] bg-white flex items-center justify-center flex-shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#8CD82C]"></div>
                </div>
                <span className="text-[#1E232A] text-sm font-medium">Checked-In (Active Stay)</span>
              </div>

              {/* Step 4 */}
              <div 
                className="flex items-center gap-4 relative z-10 cursor-pointer group"
                onClick={() => navigate('/booking/completed')}
                title="Click to preview Check-Out Day"
              >
                <div className="w-6 h-6 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center flex-shrink-0 group-hover:border-blue-400 transition-colors">
                </div>
                <span className="text-gray-500 text-sm group-hover:text-blue-500 transition-colors">Check-Out & Caution Deposit Release</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setIsExtendModalOpen(true)}
            className="w-full bg-[#B2E830] hover:bg-[#a1d628] text-[#1E232A] font-semibold py-4 rounded-xl transition-colors font-outfit"
          >
            Extend Stay
          </button>
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
            <div className="flex items-center text-sm text-[#555] mb-6">
              <span>2 years on SupportBuy</span>
              <span className="mx-2">•</span>
              <span className="text-yellow-400 mr-1">⭐</span>
              <span>4.9</span>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setIsChatOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-[#1E232A] py-2.5 rounded-lg transition-colors text-sm font-medium"
              >
                <span className="material-symbols-outlined text-yellow-500 text-lg">chat</span>
                Chat with Host
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-[#1E232A] py-2.5 rounded-lg transition-colors text-sm font-medium">
                <span className="material-symbols-outlined text-gray-600 text-lg">call</span>
                Call Host
              </button>
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
      
      <ChatDrawer 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        hostName="Pixel Home"
      />
      <ExtensionModal 
        isOpen={isExtendModalOpen}
        onClose={() => setIsExtendModalOpen(false)}
      />
    </div>
  );
};

export default ActiveBookingDetail;
