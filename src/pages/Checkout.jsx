import { Link } from "react-router-dom";

export default function Checkout() {
  return (
    <div className="max-w-6xl mx-auto pb-10">
      {/* Header & Back */}
      <div className="flex items-center gap-4 mb-8">
        <Link to="/booking-summary" className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors">
          <span className="material-symbols-outlined text-gray-600">arrow_back</span>
        </Link>
        <h1 className="text-2xl font-outfit font-bold text-[#1E232A]">Checkout</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column */}
        <div className="w-full md:w-7/12 flex flex-col gap-8">
          
          {/* Progress Bar */}
          <div className="bg-white rounded-[1.5rem] p-6 shadow-sm">
            <div className="flex items-center justify-between relative max-w-sm mx-auto">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 z-0 rounded-full"></div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-1 bg-green-500 z-0 rounded-full"></div>
              
              <div className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-[18px]">check</span>
                </div>
                <span className="text-xs font-semibold text-green-700">Summary</span>
              </div>
              
              <div className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
                <div className="w-8 h-8 rounded-full bg-[#1E232A] text-white flex items-center justify-center font-bold text-sm shadow-sm border-2 border-white">2</div>
                <span className="text-xs font-bold text-[#1E232A]">Payment</span>
              </div>
              
              <div className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
                <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-bold text-sm shadow-sm border-2 border-white">3</div>
                <span className="text-xs font-medium text-gray-400">Confirmation</span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-[1.5rem] p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-outfit font-bold text-[#1E232A]">Contact Information</h2>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500" />
                <span className="text-sm font-medium text-gray-700">I am the contact person</span>
              </label>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                <input 
                  type="text" 
                  defaultValue="Hello Champ"
                  className="w-full bg-[#F5F6F8] border-none rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input 
                  type="email" 
                  defaultValue="champ@supportbuy.com"
                  className="w-full bg-[#F5F6F8] border-none rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                <input 
                  type="tel" 
                  defaultValue="+234 800 000 0000"
                  className="w-full bg-[#F5F6F8] border-none rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white rounded-[1.5rem] p-6 shadow-sm">
            <h2 className="text-lg font-outfit font-bold text-[#1E232A] mb-6">Payment Method</h2>
            
            <div className="space-y-4">
              {/* Flutterwave / Default Payment */}
              <label className="flex items-start gap-4 p-4 border-2 border-green-500 rounded-xl bg-green-50 cursor-pointer">
                <div className="mt-0.5">
                  <input type="radio" name="payment" defaultChecked className="w-5 h-5 text-green-600 border-gray-300 focus:ring-green-500" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-[#1E232A]">Pay with Flutterwave</span>
                    <span className="material-symbols-outlined text-green-600">credit_card</span>
                  </div>
                  <p className="text-sm text-gray-600">Cards, Bank Transfer, USSD, Mobile Money</p>
                </div>
              </label>

              {/* Wallet Balance */}
              <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors opacity-75">
                <div className="mt-0.5">
                  <input type="radio" name="payment" disabled className="w-5 h-5 text-gray-400 border-gray-300" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-[#1E232A]">Pay with Wallet Balance</span>
                    <span className="material-symbols-outlined text-gray-400">account_balance_wallet</span>
                  </div>
                  <p className="text-sm text-red-500 mb-1">Insufficient balance. Current balance: ₦1,200</p>
                  <button type="button" disabled className="text-xs font-medium text-[#1E232A] underline underline-offset-2">Top up wallet</button>
                </div>
              </label>
            </div>
          </div>

        </div>

        {/* Right Column - Sticky Summary */}
        <div className="w-full md:w-5/12">
          <div className="bg-white rounded-[1.5rem] p-6 shadow-sm sticky top-24">
            <h2 className="text-lg font-outfit font-bold text-[#1E232A] mb-6">Order Summary</h2>
            
            {/* Small item preview */}
            <div className="flex gap-4 mb-6 pb-6 border-b border-gray-100">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop" alt="Living Room" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-medium text-[#1E232A] text-sm mb-1">3 Bedroom Shortlet Apartment</h3>
                <p className="text-xs text-gray-500">Pixel Home • 3 Days</p>
              </div>
            </div>

            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Accommodation:</span>
                <span className="font-semibold text-[#1E232A]">₦570,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Caution Fee:</span>
                <span className="font-semibold text-[#1E232A]">₦70,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Service Charge (3%):</span>
                <span className="font-semibold text-[#1E232A]">₦17,100</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#1E232A]">Total</span>
                <span className="text-xl font-bold text-green-700">₦657,100</span>
              </div>
            </div>

            <Link to="/booking-confirmed" className="w-full bg-primary hover:bg-[#b5e032] text-[#1E232A] font-medium py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
              <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
              Pay & Authorize ₦657,100
            </Link>
            <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-[14px]">shield</span>
              Payments are secure and encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
