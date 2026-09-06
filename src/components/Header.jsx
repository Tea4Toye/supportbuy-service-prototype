export default function Header() {
  return (
    <header className="h-[88px] border-b border-gray-200 flex items-center justify-between px-8 bg-white sticky top-0 z-10 w-full shrink-0">
      <div className="flex-1 flex items-center">
        <div className="relative w-full max-w-[500px]">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">search</span>
          <input
            type="text"
            placeholder="Search campaigns, products, services..."
            className="w-full bg-gray-50/80 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-[15px] text-[#1E232A] placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-inter"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 bg-primary rounded-full px-4 py-2">
          <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
          </div>
          <span className="text-[15px] font-bold text-[#1E232A] font-outfit">₦1.2K</span>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative text-gray-600 hover:text-[#1E232A] transition-colors w-11 h-11 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#1E232A] text-white text-[11px] font-bold rounded-full flex items-center justify-center">2</span>
          </button>
          
          <button className="relative text-gray-600 hover:text-[#1E232A] transition-colors w-11 h-11 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">chat</span>
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
          </button>
        </div>

        <button className="bg-primary hover:bg-[#b5e032] text-[#1E232A] font-medium font-inter px-5 py-3 rounded-xl transition-colors flex items-center gap-2 text-[15px]">
          <span className="material-symbols-outlined text-[18px]">favorite</span>
          Start Campaign
        </button>
      </div>
    </header>
  );
}
