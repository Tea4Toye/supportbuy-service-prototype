import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function MobileFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  if (/^\/(services\/|booking|checkout|campaigns\/create\/service)/.test(pathname)) return null;

  return (
    <div className="md:hidden">
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-[55] transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Bottom Sheet */}
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[60] transform transition-transform duration-300 ease-out shadow-xl ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="p-6 pb-8">
          <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>
          <h3 className="text-xl font-bold font-outfit text-[#1E232A] mb-6">Create New</h3>
          
          <div className="flex flex-col gap-4">
            <Link to="/campaigns/new" onClick={() => setIsOpen(false)} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">calendar_month</span>
              </div>
              <div>
                <div className="font-semibold text-[#1E232A]">Campaign</div>
                <div className="text-sm text-gray-500">Start a new fundraising campaign</div>
              </div>
            </Link>
            
            <Link to="/wishlist/new" onClick={() => setIsOpen(false)} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">celebration</span>
              </div>
              <div>
                <div className="font-semibold text-[#1E232A]">Wishlist</div>
                <div className="text-sm text-gray-500">Create a registry or wishlist</div>
              </div>
            </Link>

            <Link to="/circles/new" onClick={() => setIsOpen(false)} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">group</span>
              </div>
              <div>
                <div className="font-semibold text-[#1E232A]">Circle</div>
                <div className="text-sm text-gray-500">Create a new saving circle</div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* FAB Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-4 w-14 h-14 bg-primary text-[#1E232A] rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all z-50"
      >
        <span className="material-symbols-outlined text-[28px]">{isOpen ? 'close' : 'add'}</span>
      </button>
    </div>
  );
}
