import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Home", icon: "home", path: "/" },
  { name: "Campaigns", icon: "favorite", path: "/campaigns" },
  { name: "Store", icon: "shopping_bag", path: "/shop" },
  { name: "Bookings", icon: "menu_book", path: "/orders" },
  { name: "Profile", icon: "account_circle", path: "/profile" },
];

export default function MobileNav() {
  return (
    <nav className="flex md:hidden fixed bottom-0 w-full bg-white border-t border-gray-100 z-50 px-2 py-2 justify-between items-center shadow-[0_-8px_20px_-10px_rgba(0,0,0,0.08)] pb-[max(env(safe-area-inset-bottom),0.5rem)]">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-[4.5rem] h-12 gap-1 rounded-xl transition-all ${
              isActive
                ? "text-[#1E232A]"
                : "text-gray-400 hover:text-gray-700"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${isActive ? 'bg-primary' : ''}`}>
                <span className="material-symbols-outlined text-[24px]" style={{fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0"}}>{item.icon}</span>
              </div>
              <span className={`text-[10px] leading-none ${isActive ? 'font-bold' : 'font-medium'}`}>{item.name}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
