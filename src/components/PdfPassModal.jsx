import React from 'react';

const PdfPassModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Actions */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1 text-sm font-medium"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
            Close
          </button>
          <button 
            onClick={() => window.print()}
            className="bg-[#1E232A] hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            Print Pass
          </button>
        </div>

        {/* Pass Content */}
        <div className="p-8 overflow-y-auto bg-gray-100 flex justify-center print:bg-white print:p-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 w-full max-w-md overflow-hidden relative print:shadow-none print:border-none print:max-w-none">
            {/* Top accent */}
            <div className="h-3 bg-[#B2E830] w-full"></div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-outfit font-bold text-[#1E232A] mb-1">SupportBuy</h2>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">Booking Pass</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-[#1E232A] text-lg">#SB-RENT-89201</div>
                  <div className="text-green-600 font-medium text-sm flex items-center justify-end gap-1">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    Confirmed
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-outfit font-semibold text-lg text-[#1E232A] mb-2">3 Bedroom Shortlet Apartment</h3>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <span className="material-symbols-outlined text-[18px]">location_on</span>
                  Flat 4B, Oceanview Towers, Lekki Phase 1
                </div>
              </div>

              {/* Dates */}
              <div className="flex gap-4 mb-8">
                <div className="flex-1 bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <span className="text-xs text-gray-500 block mb-1">CHECK-IN</span>
                  <div className="font-outfit font-semibold text-[#1E232A]">Jan 8, 2026</div>
                  <div className="text-sm text-gray-600">2:00 PM</div>
                </div>
                <div className="flex-1 bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <span className="text-xs text-gray-500 block mb-1">CHECK-OUT</span>
                  <div className="font-outfit font-semibold text-[#1E232A]">Jan 11, 2026</div>
                  <div className="text-sm text-gray-600">11:00 AM</div>
                </div>
              </div>

              {/* Guests / Host */}
              <div className="grid grid-cols-2 gap-6 mb-8 border-b border-gray-100 pb-8">
                <div>
                  <span className="text-xs text-gray-500 block mb-1">GUEST</span>
                  <div className="font-medium text-[#1E232A]">Collins Akaniru</div>
                </div>
                <div>
                  <span className="text-xs text-gray-500 block mb-1">HOST</span>
                  <div className="font-medium text-[#1E232A] flex items-center gap-2">
                    <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop" alt="Host" className="w-5 h-5 rounded-full object-cover" />
                    Pixel Home
                  </div>
                </div>
              </div>

              {/* Access Code */}
              <div className="text-center">
                <span className="text-xs text-gray-500 uppercase tracking-wider block mb-3">Property Access Code</span>
                <div className="flex justify-center gap-3">
                  {[8, 4, 1, 2].map((num, i) => (
                    <div key={i} className="w-12 h-14 bg-[#1E232A] text-white rounded-lg flex items-center justify-center font-outfit font-bold text-2xl shadow-sm">
                      {num}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-4 max-w-xs mx-auto">
                  Show this pass and identification upon arrival if requested by building security.
                </p>
              </div>
            </div>
            
            {/* Cutout decoration */}
            <div className="absolute left-[-10px] top-[60%] w-5 h-5 bg-gray-100 rounded-full print:hidden"></div>
            <div className="absolute right-[-10px] top-[60%] w-5 h-5 bg-gray-100 rounded-full print:hidden"></div>
            <div className="border-t-2 border-dashed border-gray-200 absolute left-0 right-0 top-[60%] mx-4 z-[-1]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfPassModal;
