import React, { useState } from 'react';

const ExtensionModal = ({ isOpen, onClose }) => {
  const [nights, setNights] = useState(1);
  const nightlyRate = 190000;
  
  if (!isOpen) return null;

  const subtotal = nightlyRate * nights;
  const fee = subtotal * 0.03;
  const total = subtotal + fee;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="font-outfit font-semibold text-xl text-[#1E232A]">Extend Your Stay</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">How many nights to add?</label>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setNights(Math.max(1, nights - 1))}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#1E232A] hover:bg-gray-50 disabled:opacity-50"
                disabled={nights <= 1}
              >
                <span className="material-symbols-outlined text-sm">remove</span>
              </button>
              <span className="font-outfit font-semibold text-xl w-8 text-center">{nights}</span>
              <button 
                onClick={() => setNights(Math.min(3, nights + 1))}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#1E232A] hover:bg-gray-50 disabled:opacity-50"
                disabled={nights >= 3}
              >
                <span className="material-symbols-outlined text-sm">add</span>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">Maximum 3 nights extension per request.</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Extension ({nights} {nights === 1 ? 'night' : 'nights'})</span>
              <span className="font-medium text-[#1E232A]">₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Service Fee (3%)</span>
              <span className="font-medium text-[#1E232A]">₦{fee.toLocaleString()}</span>
            </div>
            <div className="pt-3 border-t border-gray-200 flex justify-between">
              <span className="font-semibold text-[#1E232A]">Total to Pay</span>
              <span className="font-bold text-[#2F9E44]">₦{total.toLocaleString()}</span>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full bg-[#1E232A] hover:bg-gray-800 text-white font-semibold py-4 rounded-xl transition-colors font-outfit"
          >
            Pay ₦{total.toLocaleString()} to Extend
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExtensionModal;
