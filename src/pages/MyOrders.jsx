import { Link } from "react-router-dom";

export default function MyOrders() {
  return (
    <div className="flex flex-col pb-10">
      {/* Header */}
      <h1 className="text-2xl font-outfit font-semibold text-[#1E232A] mb-6">My Orders & Bookings</h1>

      {/* Segmented Toggle */}
      <div className="flex w-full bg-white rounded-2xl p-1.5 shadow-sm border border-gray-100 mb-8">
        <button className="flex-1 flex items-center justify-center py-3.5 rounded-xl font-medium text-[#1E232A] font-outfit text-[17px] hover:bg-gray-50 transition-colors">
          Orders <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-2">2</span>
        </button>
        <button className="flex-1 flex items-center justify-center py-3.5 rounded-xl font-medium bg-primary text-[#1E232A] font-outfit text-[17px] shadow-sm">
          Bookings
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card 1: Confirmed */}
        <div className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100 flex flex-col p-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-[#475467] text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
            <div>
              <h3 className="font-semibold text-[#1E232A] text-[15px] leading-tight">Confirmed</h3>
              <p className="text-[13px] text-gray-500">12 Nov</p>
            </div>
          </div>
          
          <div className="rounded-[16px] overflow-hidden mb-4 relative aspect-[4/3] bg-gray-100">
             <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" alt="3 Bedroom Shortlet" />
          </div>

          <div className="mb-4 flex-1">
            <p className="text-[13px] text-gray-400 mb-1 font-medium">SB-RENT-8920</p>
            <h4 className="font-semibold text-[#1E232A] font-outfit text-[17px] mb-2">3 Bedroom Shortlet</h4>
            <div className="flex items-center gap-2 mb-4">
              <img src="https://ui-avatars.com/api/?name=Pixel+Home&background=random" className="w-5 h-5 rounded-full" alt="Provider" />
              <span className="text-[14px] text-gray-500">Pixel Home</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5 text-gray-500">
                <span className="material-symbols-outlined text-[18px]">schedule</span>
                <span className="text-[14px]">3 Days</span>
              </div>
              <div className="font-bold text-[#1E232A]">₦657,100</div>
            </div>
          </div>

          <div className="flex gap-3 mt-auto">
            <Link to="/booking/active" className="flex-1 bg-[#1A4B1A] text-white py-2.5 rounded-xl font-medium text-[14px] flex items-center justify-center hover:bg-[#133813] transition-colors">
              View Details
            </Link>
            <button className="flex-1 bg-white border border-gray-200 text-[#1E232A] py-2.5 rounded-xl font-medium text-[14px] flex items-center justify-center hover:bg-gray-50 transition-colors">
              Call
            </button>
          </div>
        </div>

        {/* Card 2: Active */}
        <div className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100 flex flex-col p-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-[#475467] text-[20px]" style={{fontVariationSettings: "'FILL' 0"}}>local_shipping</span>
            <div>
              <h3 className="font-semibold text-[#1E232A] text-[15px] leading-tight">Active</h3>
              <p className="text-[13px] text-gray-500">12 Nov</p>
            </div>
          </div>
          
          <div className="rounded-[16px] overflow-hidden mb-4 relative aspect-[4/3] bg-gray-100">
             <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" alt="Home Deep Cleaning" />
          </div>

          <div className="mb-4 flex-1">
            <p className="text-[13px] text-gray-400 mb-1 font-medium">SB-RENT-8920</p>
            <h4 className="font-semibold text-[#1E232A] font-outfit text-[17px] mb-2">Home Deep Cleaning</h4>
            <div className="flex items-center gap-2 mb-4">
              <img src="https://ui-avatars.com/api/?name=Rainbow+Cleaning+Service&background=random" className="w-5 h-5 rounded-full" alt="Provider" />
              <span className="text-[14px] text-gray-500">Rainbow Cleaning Service</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5 text-gray-500">
                <span className="material-symbols-outlined text-[18px]">schedule</span>
                <span className="text-[14px]">4 Hours</span>
              </div>
              <div className="font-bold text-[#1E232A]">₦65,000</div>
            </div>
          </div>

          <div className="flex gap-3 mt-auto">
            <Link to="/booking/active" className="flex-1 bg-[#1A4B1A] text-white py-2.5 rounded-xl font-medium text-[14px] flex items-center justify-center hover:bg-[#133813] transition-colors">
              View Pass Code
            </Link>
            <button className="flex-1 bg-white border border-gray-200 text-[#1E232A] py-2.5 rounded-xl font-medium text-[14px] flex items-center justify-center hover:bg-gray-50 transition-colors">
              Call
            </button>
          </div>
        </div>

        {/* Card 3: Completed */}
        <div className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100 flex flex-col p-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-[#A3E635] text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
            <div>
              <h3 className="font-semibold text-[#1E232A] text-[15px] leading-tight">Completed</h3>
              <p className="text-[13px] text-gray-500">28 Oct</p>
            </div>
          </div>
          
          <div className="rounded-[16px] overflow-hidden mb-4 relative aspect-[4/3] bg-gray-100">
             <img src="https://images.unsplash.com/photo-1586528116311-ad8ed7c50800?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" alt="Transport Goods" />
          </div>

          <div className="mb-4 flex-1">
            <p className="text-[13px] text-gray-400 mb-1 font-medium">SB-LOG-1092</p>
            <h4 className="font-semibold text-[#1E232A] font-outfit text-[17px] mb-2">Transport Goods</h4>
            <div className="flex items-center gap-2 mb-4">
              <img src="https://ui-avatars.com/api/?name=Kelvin+Osolo&background=random" className="w-5 h-5 rounded-full" alt="Provider" />
              <span className="text-[14px] text-gray-500">Kelvin Osolo</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5 text-gray-500">
                <span className="material-symbols-outlined text-[18px]">schedule</span>
                <span className="text-[14px]">1 Service</span>
              </div>
              <div className="font-bold text-[#1E232A]">₦73,100</div>
            </div>
          </div>

          <div className="flex gap-3 mt-auto">
            <Link to="/booking/active" className="flex-1 bg-[#1A4B1A] text-white py-2.5 rounded-xl font-medium text-[14px] flex items-center justify-center hover:bg-[#133813] transition-colors">
              View Details
            </Link>
            <button className="flex-1 bg-white border border-gray-200 text-[#1E232A] py-2.5 rounded-xl font-medium text-[14px] flex items-center justify-center hover:bg-gray-50 transition-colors">
              Book Again
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
