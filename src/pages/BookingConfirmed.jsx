import React, { useState } from "react";
import { Link } from "react-router-dom";
import ChatDrawer from "../components/ChatDrawer";
import PdfPassModal from "../components/PdfPassModal";

export default function BookingConfirmed() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  return (
    <div className="max-w-6xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column */}
        <div className="w-full md:w-7/12 flex flex-col gap-8">
          <div className="bg-white rounded-[1.5rem] p-8 shadow-sm">
            {/* 3-step progress bar */}
            <div className="flex gap-2 mb-12">
              <div className="h-2 flex-1 bg-primary rounded-full"></div>
              <div className="h-2 flex-1 bg-primary rounded-full"></div>
              <div className="h-2 flex-1 bg-primary rounded-full"></div>
            </div>

            <div className="flex flex-col items-center mb-10 text-center">
              <div className="w-20 h-20 rounded-full bg-[#11d063] flex items-center justify-center text-white mb-6 shadow-sm border-[4px] border-[#e8fbe5]">
                <span className="material-symbols-outlined text-[40px]">check</span>
              </div>
              <h1 className="text-2xl font-outfit font-bold text-[#1E232A] mb-2">Booking Confirmed!</h1>
              <p className="text-gray-500 text-sm">Booking Reference: #SB-RENT-89201</p>
            </div>

            {/* Booking Details Card */}
            <div className="border border-gray-100 rounded-2xl p-6 mb-6">
              <h2 className="text-lg font-outfit font-bold text-[#1E232A] mb-4">3 Bedroom Shortlet Apartment</h2>
              <div className="flex items-center gap-2 mb-6">
                <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop" alt="Avatar" className="w-6 h-6 rounded-full object-cover" />
                <span className="text-sm font-medium text-gray-700">Pixel Home</span>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-6 border-b border-gray-100 pb-6">
                <span className="material-symbols-outlined text-gray-400 text-[20px]">calendar_month</span>
                <span className="font-medium">Jan 8, 2026 (2:00 PM)</span>
                <span className="material-symbols-outlined text-gray-400 text-[20px]">arrow_forward</span>
                <span className="font-medium">Jan 11, 2026 (11:00 AM)</span>
              </div>

              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-500 text-sm">Booking Number</span>
                <span className="font-bold text-[#1E232A]">#SB-RENT-89201</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                   <div className="text-gray-500 text-sm mb-0.5">Total Paid</div>
                   <div className="text-[11px] text-gray-400">(Includes ₦70,000 Refundable Caution Deposit)</div>
                </div>
                <span className="font-bold text-green-700 text-lg">₦ 657,100</span>
              </div>
            </div>

            {/* Info Alert */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5 flex gap-3 mb-8">
              <span className="material-symbols-outlined text-blue-500 mt-0.5 text-[22px]">info</span>
              <div>
                <h4 className="font-medium text-blue-800 text-sm mb-1.5">Booking Confirmation Sent</h4>
                <p className="text-sm text-blue-600 leading-relaxed">We've sent a confirmation email to <span className="font-bold">collinsakaniru@gmail.com</span> with your order details and tracking information.</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Link to="/orders" className="flex items-center justify-center py-3.5 rounded-xl border border-gray-200 text-[#1E232A] font-medium hover:bg-gray-50 transition-colors">
                View in My Bookings
              </Link>
              <button 
                onClick={() => setIsPdfModalOpen(true)}
                className="flex items-center justify-center py-3.5 rounded-xl bg-[#B2E830] hover:bg-[#a1d628] text-[#1E232A] font-medium transition-colors"
              >
                Download PDF Pass
              </button>
            </div>
            
            <div className="text-center">
              <span className="text-sm text-gray-500">Need help? <a href="#" className="font-medium text-gray-700 underline underline-offset-2">Contact us</a></span>
            </div>

          </div>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-5/12 flex flex-col gap-6">
          {/* Booking Summary */}
          <div className="bg-white rounded-[1.5rem] p-6 shadow-sm">
            <h2 className="text-lg font-outfit font-bold text-[#1E232A] mb-6">Booking Summary</h2>
            <div className="flex justify-between items-start gap-4">
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                  <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop" alt="Living Room" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-medium text-[#1E232A] text-sm mb-1.5">3 Bedroom Shortlet Apartment</h3>
                  <p className="text-xs text-gray-500">Pixel Home • 3 Days</p>
                </div>
              </div>
              <div className="font-semibold text-[#1E232A] text-sm">₦570,000</div>
            </div>
          </div>

          {/* Access Details */}
          <div className="bg-white rounded-[1.5rem] p-6 shadow-sm">
            <h2 className="text-lg font-outfit font-bold text-[#1E232A] mb-6">Access Details</h2>
            
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2 text-sm text-gray-500">
                <span className="material-symbols-outlined text-red-500 text-[18px]">location_on</span>
                Property Location :
              </div>
              <p className="text-sm text-[#1E232A] leading-relaxed font-medium">
                Flat 4B, Oceanview Towers, Plot 14 Admiralty Way, Lekki Phase 1
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                <span className="material-symbols-outlined text-green-600 text-[18px]">key</span>
                Access Code :
              </div>
              <div className="flex gap-2">
                <div className="w-10 h-10 bg-[#1E232A] text-white rounded-lg flex items-center justify-center font-bold text-lg">8</div>
                <div className="w-10 h-10 bg-[#1E232A] text-white rounded-lg flex items-center justify-center font-bold text-lg">4</div>
                <div className="w-10 h-10 bg-[#1E232A] text-white rounded-lg flex items-center justify-center font-bold text-lg">1</div>
                <div className="w-10 h-10 bg-[#1E232A] text-white rounded-lg flex items-center justify-center font-bold text-lg">2</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setIsChatOpen(true)}
                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 text-[#1E232A] font-medium text-sm hover:bg-gray-50 transition-colors"
              >
                <span className="material-symbols-outlined text-yellow-500 text-[20px]">chat</span>
                Chat with Host
              </button>
              <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 text-[#1E232A] font-medium text-sm hover:bg-gray-50 transition-colors">
                <span className="material-symbols-outlined text-gray-600 text-[20px]">call</span>
                Call Host
              </button>
            </div>

          </div>
        </div>
      </div>
      <ChatDrawer 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        hostName="Pixel Home"
      />
      <PdfPassModal 
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
      />
    </div>
  );
}
