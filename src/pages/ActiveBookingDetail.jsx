import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatDrawer from '../components/ChatDrawer';
import ExtensionModal from '../components/ExtensionModal';

const ActiveBookingDetail = () => {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExtendModalOpen, setIsExtendModalOpen] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [claimAction, setClaimAction] = useState(null);

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

              {/* Step 4 (Active/Info) */}
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-6 h-6 rounded-full border-2 border-blue-500 bg-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                </div>
                <div className="flex-1">
                  <span className="text-[#1E232A] text-sm font-medium block mb-2">Check-Out & Caution Deposit Release</span>
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <div className="flex gap-2">
                      <span className="material-symbols-outlined text-blue-500 text-[20px] flex-shrink-0">info</span>
                      <p className="text-sm text-blue-900 leading-relaxed">
                        Check Out Day: Pixel Home has 48hr to confirm no damage. Once verified, your caution deposit will be processed.
                      </p>
                    </div>
                  </div>
                  
                  {/* Interactive Triggers for Testing */}
                  <div className="mt-4 flex gap-3 flex-wrap">
                    <button 
                      onClick={() => setShowRefundModal(true)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded font-medium transition-colors border border-gray-200"
                    >
                      Demo: Zero Damage / Refund Modal
                    </button>
                    <button 
                      onClick={() => setShowClaimModal(true)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded font-medium transition-colors border border-gray-200"
                    >
                      Demo: Damage Claim / Caution Hold Modal
                    </button>
                  </div>
                </div>
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

      {/* Refund Modal */}
      {showRefundModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-outfit font-semibold text-xl text-[#1E232A]">Check-Out Completed</h3>
                <button 
                  onClick={() => setShowRefundModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="flex flex-col items-center mb-8">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[#2F9E44] text-3xl">task_alt</span>
                </div>
                <p className="text-sm text-gray-500 mb-2">Check-out verified by Pixel Home</p>
                <div className="bg-green-50 border border-green-100 rounded-lg p-3 w-full text-center">
                  <p className="text-green-800 font-medium font-outfit text-sm">
                    💰 CAUTION DEPOSIT REFUND PROCESSED
                  </p>
                  <p className="text-green-700 text-xs mt-1">
                    ₦70,000 refunded to wallet
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h4 className="font-outfit font-medium text-center text-[#1E232A] mb-4">How was your stay?</h4>
                <div className="flex justify-center gap-2 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star}
                      onClick={() => setRating(star)}
                      className={`material-symbols-outlined text-3xl transition-colors ${rating >= star ? 'text-yellow-400 font-variation-fill' : 'text-gray-300'}`}
                      style={{ fontVariationSettings: rating >= star ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      star
                    </button>
                  ))}
                </div>
                
                <textarea 
                  placeholder="Write a review..."
                  className="w-full border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:border-[#2F9E44] resize-none h-24 mb-4"
                ></textarea>
                
                <button 
                  onClick={() => { setShowRefundModal(false); navigate('/booking/completed'); }}
                  className="w-full bg-[#1E232A] hover:bg-gray-800 text-white font-semibold py-3.5 rounded-xl transition-colors font-outfit"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Claim Modal */}
      {showClaimModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2 text-red-500">
                  <span className="material-symbols-outlined">warning</span>
                  <h3 className="font-outfit font-semibold text-xl text-[#1E232A]">Caution Deposit Hold</h3>
                </div>
                <button 
                  onClick={() => setShowClaimModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-6">
                Pixel Home has reported damage during your stay. A deduction is being claimed from your caution deposit.
              </p>

              <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6">
                <h4 className="font-semibold text-red-800 text-sm mb-2">Damage Claim Details</h4>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-red-700">Broken Living Room Table</span>
                  <span className="font-medium text-red-800">₦35,000</span>
                </div>
                <p className="text-xs text-red-600 mb-3">Deduction amount</p>
                
                <div className="flex gap-2">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden border border-red-200">
                    <img src="https://images.unsplash.com/photo-1574359411659-15573a27fd0c?auto=format&fit=crop&q=80&w=150" alt="Damage" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden border border-red-200 flex items-center justify-center">
                    <span className="text-xs text-red-500 font-medium">+2</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${claimAction === 'accept' ? 'border-[#2F9E44] bg-green-50/50' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <input 
                    type="radio" 
                    name="claim_action" 
                    value="accept"
                    checked={claimAction === 'accept'}
                    onChange={(e) => setClaimAction(e.target.value)}
                    className="mt-1 flex-shrink-0 text-[#2F9E44] focus:ring-[#2F9E44]" 
                  />
                  <div>
                    <span className="block text-sm font-medium text-[#1E232A] mb-0.5">Accept Claim</span>
                    <span className="block text-xs text-gray-500">I agree to the deduction. The remaining ₦35,000 will be refunded to my wallet.</span>
                  </div>
                </label>
                
                <label className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${claimAction === 'dispute' ? 'border-[#2F9E44] bg-green-50/50' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <input 
                    type="radio" 
                    name="claim_action" 
                    value="dispute"
                    checked={claimAction === 'dispute'}
                    onChange={(e) => setClaimAction(e.target.value)}
                    className="mt-1 flex-shrink-0 text-[#2F9E44] focus:ring-[#2F9E44]" 
                  />
                  <div>
                    <span className="block text-sm font-medium text-[#1E232A] mb-0.5">Dispute Claim</span>
                    <span className="block text-xs text-gray-500">I do not agree with this claim. A SupportBuy mediator will review the case.</span>
                  </div>
                </label>
                
                {claimAction === 'dispute' && (
                  <div className="mt-4 p-4 border border-gray-200 rounded-xl bg-white space-y-4 animate-in slide-in-from-top-2 duration-300">
                    <div className="bg-orange-50 border border-orange-100 rounded-lg p-3 flex gap-2">
                      <span className="material-symbols-outlined text-orange-500 text-[18px]">lock</span>
                      <p className="text-xs text-orange-800 leading-tight">
                        <strong>Escrow Frozen:</strong> Your caution deposit will remain securely in escrow until a SupportBuy mediator resolves this dispute.
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#1E232A] mb-1.5">Counter-Statement</label>
                      <textarea 
                        placeholder="Please explain why you are disputing this claim. What happened during your stay?"
                        className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-[#2F9E44] resize-none h-24"
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#1E232A] mb-1.5">Evidence (Photos/Videos)</label>
                      <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-gray-400 mb-2">cloud_upload</span>
                        <span className="text-sm text-gray-600 font-medium">Click to upload media</span>
                        <span className="text-xs text-gray-400 mt-1">JPG, PNG or MP4 (Max 10MB)</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <button 
                onClick={() => { setShowClaimModal(false); navigate('/booking/completed'); }}
                className="w-full bg-[#1E232A] hover:bg-gray-800 text-white font-semibold py-3.5 rounded-xl transition-colors font-outfit"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveBookingDetail;
