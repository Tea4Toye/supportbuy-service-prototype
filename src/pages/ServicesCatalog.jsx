import { useState } from "react";
import { Link } from "react-router-dom";

// Mock Data
const promotionalCards = [
  {
    id: 1,
    title: "Premium Lawn Care",
    description: "Get your garden looking pristine for the summer.",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
    imgUrl: "https://images.unsplash.com/photo-1558904541-efa843a96f0f?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Mobile Car Detailing",
    description: "Professional cleaning brought directly to your driveway.",
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
    imgUrl: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Digital Marketing Consulting",
    description: "Boost your online presence with expert strategies.",
    bgColor: "bg-purple-100",
    textColor: "text-purple-800",
    imgUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop",
  },
];

const categories = ["All", "Home", "Events", "Tech", "Automotive", "Beauty", "Transport"];

const services = [
  {
    id: 1,
    title: "3 Bedroom Shortlet Apartment",
    provider: "Pixel Home",
    rating: 4.9,
    reviews: 124,
    price: "₦190,000",
    unit: "per day",
    imgUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format&fit=crop",
    link: "/services/3-bedroom-shortlet"
  },
  {
    id: 2,
    title: "Home Cleaning",
    provider: "Sparkle Maids",
    rating: 4.7,
    reviews: 89,
    price: "₦15,000",
    unit: "per session",
    imgUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600&auto=format&fit=crop",
    link: "/services/home-cleaning"
  },
  {
    id: 3,
    title: "Web Developer",
    provider: "Tech Ninjas",
    rating: 5.0,
    reviews: 42,
    price: "₦250,000",
    unit: "per project",
    imgUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop",
    link: "/services/web-developer"
  },
  {
    id: 4,
    title: "Bridal Make-Up",
    provider: "Glam by Sarah",
    rating: 4.8,
    reviews: 210,
    price: "₦85,000",
    unit: "per event",
    imgUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=600&auto=format&fit=crop",
    link: "/services/bridal-makeup"
  },
  {
    id: 5,
    title: "Transport Goods",
    provider: "Logistics Pro",
    rating: 4.6,
    reviews: 315,
    price: "₦45,000",
    unit: "per trip",
    imgUrl: "https://images.unsplash.com/photo-1586528116311-ad8ed7c50800?q=80&w=600&auto=format&fit=crop",
    link: "/services/transport-goods"
  }
];

export default function ServicesCatalog() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="flex flex-col gap-8 pb-10">
      
      {/* Header section */}
      <div>
        <h1 className="text-2xl font-outfit font-semibold text-[#1E232A]">Services & Marketplace</h1>
        <p className="text-gray-500 mt-1">Discover and book top-rated services for your needs.</p>
      </div>

      {/* Promotional Carousel */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2">
        {promotionalCards.map((card) => (
          <div 
            key={card.id} 
            className={`min-w-[320px] md:min-w-[400px] rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden h-[200px] shadow-sm ${card.bgColor}`}
          >
            <div className="relative z-10 w-2/3">
              <h3 className={`text-xl font-bold font-outfit mb-2 ${card.textColor}`}>{card.title}</h3>
              <p className={`text-sm opacity-80 ${card.textColor}`}>{card.description}</p>
            </div>
            <button className="relative z-10 bg-white/90 backdrop-blur-sm text-[#1E232A] font-medium px-4 py-2 rounded-xl text-sm w-max hover:bg-white transition mt-auto">
              Explore Now
            </button>
            <div className="absolute right-0 top-0 bottom-0 w-1/2">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10 mix-blend-overlay"></div>
              <img src={card.imgUrl} alt={card.title} className="w-full h-full object-cover rounded-r-2xl opacity-90 object-right" style={{ maskImage: 'linear-gradient(to right, transparent, black 40%)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 40%)' }} />
            </div>
          </div>
        ))}
      </div>

      {/* Filter and Sorting Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 bg-[#FAFAFA]/95 backdrop-blur-md z-10 py-2">
        
        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide whitespace-nowrap pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
                activeCategory === cat
                  ? "bg-[#1E232A] text-white border-[#1E232A]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filters and Sort */}
        <div className="flex items-center gap-3 shrink-0">
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
            <span className="material-symbols-outlined text-[18px]">tune</span>
            Filters
          </button>
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
            <span className="material-symbols-outlined text-[18px]">sort</span>
            Sort by: Recommended
            <span className="material-symbols-outlined text-[18px] ml-1">expand_more</span>
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
            
            {/* Image */}
            <div className="aspect-[4/3] w-full relative overflow-hidden bg-gray-100">
              <img 
                src={service.imgUrl} 
                alt={service.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors">
                <span className="material-symbols-outlined text-[18px]">favorite</span>
              </button>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-start justify-between mb-1 gap-2">
                <h3 className="font-semibold text-[#1E232A] text-lg leading-tight line-clamp-1">{service.title}</h3>
                <div className="flex items-center gap-1 shrink-0 bg-yellow-50 px-2 py-0.5 rounded text-sm">
                  <span className="material-symbols-outlined text-[14px] text-yellow-500" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  <span className="font-medium text-gray-700">{service.rating}</span>
                </div>
              </div>
              
              <p className="text-gray-500 text-sm mb-4">by {service.provider}</p>

              <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#1E232A] text-lg">{service.price}</span>
                  <span className="text-gray-500 text-xs ml-1">{service.unit}</span>
                </div>
                <Link to={service.link} className="bg-primary hover:bg-[#b5e032] text-[#1E232A] font-medium px-4 py-2 rounded-xl text-sm transition-colors">
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
