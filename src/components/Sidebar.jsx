import { NavLink } from "react-router-dom";

const navItemsTop = [
  { name: "Home", icon: "home", path: "/" },
  { name: "Campaigns", icon: "favorite", path: "/campaigns" },
  { name: "Shop", icon: "shopping_bag", path: "/shop" },
  { name: "Services", icon: "work", path: "/services" },
  { name: "Feed", icon: "language", path: "/feed" },
];

const navItemsBottom = [
  { name: "My Profile", icon: "account_circle", path: "/profile" },
  { name: "My Wishlist", icon: "celebration", path: "/wishlist" },
  { name: "My Circles", icon: "group", path: "/circles" },
  { name: "My Orders", icon: "shopping_basket", path: "/orders" },
  { name: "Settings", icon: "settings", path: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-[260px] h-screen bg-sidebar hidden md:flex flex-col justify-between py-6 border-r border-white/5 shrink-0 sticky top-0 overflow-y-auto custom-scrollbar">
      <div>
        <div className="px-8 mb-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-[#1E232A] font-bold text-xl font-outfit">S</div>
          <span className="text-xl font-outfit font-semibold text-white">SupportBuy</span>
        </div>

        <div className="px-8 mb-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden shrink-0 border-2 border-primary">
             <img src="https://ui-avatars.com/api/?name=Champ&background=random" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate font-outfit">Hello, Champ</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1 px-4">
          {navItemsTop.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-2xl transition-colors font-medium text-[15px] ${
                  isActive
                    ? "bg-primary text-[#1E232A]"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="my-4 mx-8 border-t border-white/10"></div>

        <nav className="flex flex-col gap-1 px-4">
          {navItemsBottom.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-2xl transition-colors font-medium text-[15px] ${
                  isActive
                    ? "bg-primary text-[#1E232A]"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
