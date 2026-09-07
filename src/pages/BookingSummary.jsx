import { Link, useLocation, Navigate } from "react-router-dom";

export default function BookingSummary() {
  const location = useLocation();
  const service = location.state?.service;
  const bookingDetails = location.state?.bookingDetails;

  const durationStr = bookingDetails?.durationText || "1 Unit";
  const totalPrice = bookingDetails?.formattedTotal || service?.price;

  if (!service) return <Navigate to="/services" />;

  return (
    <div className="max-w-6xl mx-auto pb-10">
      {/* Back button & Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link to={`/services/${service.id}`} state={{ service }} className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors">
          <span className="material-symbols-outlined text-gray-600">arrow_back</span>
        </Link>
        <h1 className="text-2xl font-outfit font-bold text-[#1E232A]">Booking Summary</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - Main Details */}
        <div className="w-full md:w-7/12 flex flex-col gap-6">
          
          {/* Selected Item Card */}
          <div className="bg-white rounded-[1.5rem] p-4 flex gap-4 shadow-sm items-center">
            <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-gray-200">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex justify-between items-start">
              <div>
                <h3 className="font-bold text-[#1E232A] mb-1">{service.title}</h3>
                <p className="text-sm text-gray-500">{service.merchant} • <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs font-medium ml-1">{durationStr}</span></p>
              </div>
              <div className="font-bold text-[#1E232A]">{totalPrice}</div>
            </div>
          </div>

          {/* Host Card */}
          <div className="bg-white rounded-[1.5rem] p-6 shadow-sm">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                  <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=200&auto=format&fit=crop" alt={service.merchant} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1E232A]">{service.merchant}</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <span>Joined SupportBuy</span>
                    <span>•</span>
                    <span className="material-symbols-outlined text-[14px] text-yellow-500" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                    <span className="font-medium text-gray-700">{service.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Campaign Helper Card */}
          <div className="bg-green-50 border border-green-200 rounded-[1.5rem] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-[#1E232A] mb-1">Need help funding your cart?</h4>
              <p className="text-sm text-gray-600">Create a campaign and let your circles contribute to this booking.</p>
            </div>
            <button className="bg-[#123F1E] hover:bg-[#0c2a14] text-white font-medium px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap">
              Create Campaign
            </button>
          </div>

        </div>

        {/* Right Column - Order Review Sticky */}
        <div className="w-full md:w-5/12">
          <div className="bg-white rounded-[1.5rem] p-6 shadow-sm sticky top-24">
            <h2 className="text-lg font-outfit font-bold text-[#1E232A] mb-6">Order Breakdown</h2>
            
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Service:</span>
                <span className="font-semibold text-[#1E232A]">{totalPrice}</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#1E232A]">Total</span>
                <span className="text-xl font-bold text-green-700">{totalPrice}</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Promo Code" 
                  className="flex-1 bg-[#F5F6F8] border-none rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                <button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-3 rounded-xl text-sm font-medium transition-colors">
                  Apply
                </button>
              </div>
            </div>

            <Link to="/checkout" state={{ service, bookingDetails }} className="w-full bg-primary hover:bg-[#b5e032] text-[#1E232A] font-medium py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
              <span className="material-symbols-outlined text-[20px]">shopping_cart_checkout</span>
              Complete Booking
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
