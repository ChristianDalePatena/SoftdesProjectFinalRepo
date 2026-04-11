import React from 'react';
import { Link } from 'react-router-dom';

// --- ALL 30 PRODUCTS LINKED TO THE NEW FORMS ---
const shopItems = [
  // CATEGORY 1: Prints & Basics
  { id: "t-shirt", name: "Custom T-Shirt", img: "/images/1/t-shirt.jpg", category: "Apparel" },
  { id: "mug", name: "Personalized Mugs", img: "/images/1/mug.jpg", category: "Souvenirs" },
  { id: "tarpaulin", name: "Tarpaulin Banner", img: "/images/1/tarpaulin.jpg", category: "Signage" },
  { id: "sticker", name: "Custom Stickers", img: "/images/1/sticker.jpg", category: "Marketing" },
  { id: "sintra-board", name: "Sintra Board", img: "/images/1/sintra.jpg", category: "Signage" },

  // CATEGORY 2: ID & Specialty
  { id: "pvc-id", name: "PVC ID Cards", img: "/images/2/pvc.jpg", category: "ID & Signage" },
  { id: "lanyard", name: "Custom Lanyards", img: "/images/2/lanyard.jpg", category: "ID & Signage" },
  { id: "pull-up-banner", name: "Pull-Up Banner", img: "/images/2/banner.jpg", category: "Signage" },
  { id: "transparent-sticker", name: "Transparent Sticker", img: "/images/2/transparent.jpg", category: "Marketing" },
  { id: "frosted-sticker", name: "Frosted Glass Sticker", img: "/images/2/frosted.jpg", category: "Marketing" },
  { id: "photocopy", name: "Photocopy Services", img: "/images/2/photocopy.jpg", category: "Services" },

  // CATEGORY 3: Marketing Materials
  { id: "button-pin", name: "Button Pins", img: "/images/3/button.jpg", category: "Marketing" },
  { id: "mousepad", name: "Custom Mousepads", img: "/images/3/mousepad.jpg", category: "Souvenirs" },
  { id: "cap", name: "Custom Caps", img: "/images/3/cap.jpg", category: "Apparel" },
  { id: "poster", name: "Posters", img: "/images/3/poster.jpg", category: "Marketing" },
  { id: "panaflex", name: "Panaflex Signage", img: "/images/3/panaflex.jpg", category: "Signage" },
  { id: "x-banner", name: "X-Banner Stand", img: "/images/3/x-banner.jpg", category: "Signage" },
  { id: "label", name: "Product Labels", img: "/images/3/label.jpg", category: "Marketing" },
  { id: "flyers", name: "Flyers", img: "/images/3/flyers.jpg", category: "Marketing" },
  { id: "leaflets", name: "Leaflets / Brochures", img: "/images/3/leaflets.jpg", category: "Marketing" },

  // CATEGORY 4: Souvenirs & Gifts
  { id: "tumblr", name: "Custom Tumblers", img: "/images/4/tumblr.jpg", category: "Souvenirs" },
  { id: "bagtag", name: "Bag Tags", img: "/images/4/bagtag.jpg", category: "Souvenirs" },
  { id: "ref-magnet", name: "Ref Magnets", img: "/images/4/magnet.jpg", category: "Souvenirs" },
  { id: "wallclock", name: "Wall Clocks", img: "/images/4/wallclock.jpg", category: "Souvenirs" },
  { id: "keychain", name: "Keychains", img: "/images/4/keychain.jpg", category: "Souvenirs" },
  { id: "eco-bag", name: "Eco Bags", img: "/images/4/ecobag.jpg", category: "Apparel" },
  { id: "round-fan", name: "Round Fans", img: "/images/4/roundfan.jpg", category: "Marketing" },
  { id: "portabooth", name: "Portable Photobooth", img: "/images/4/portabooth.jpg", category: "Services" },

  // CATEGORY 5: Premium Outdoor
  { id: "umbrella", name: "Custom Umbrellas", img: "/images/5/umbrella.jpg", category: "Souvenirs" },
  { id: "backlit", name: "Backlit Signage", img: "/images/5/backlit.jpg", category: "Signage" }
];

export default function Shop() {
  return (
    <div className="flex-1 bg-gray-300 py-16 md:py-24 font-sans">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="mb-16 flex flex-col items-center text-center max-w-2xl mx-auto">
          {/* UPDATED: Changed to font-thin and tracking-widest for minimalist look */}
          <h1 className="text-4xl md:text-5xl font-thin text-gray-900 tracking-widest uppercase mb-4">
            Our Catalog
          </h1>
          <p className="text-gray-700 text-lg md:text-xl font-light">
            Browse our full range of services. Select an item to customize your order.
          </p>
        </div>

        {/* Shop Grid - Added justify-items-center to keep wide cards centered if they wrap */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10 justify-items-center">
          {shopItems.map((item) => (
            <Link 
              key={item.id} 
              to={`/product/${item.id}`} 
              // UPDATED: w-96 for fat/wide cards, removed flex-col to simplify structure
              className="w-full max-w-md bg-[#0a0f14] rounded-3xl shadow-lg hover:shadow-[0_0_20px_rgba(220,38,38,0.2)] border border-gray-800 overflow-hidden hover:border-red-500/50 transition-all duration-500 transform hover:-translate-y-2 group"
            >
              
              {/* Product Image - Taller (h-56) for better landscape proportions */}
              <div className="h-56 bg-black/20 relative overflow-hidden">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" 
                  onError={(e) => { e.target.src = 'https://placehold.co/600x400/111820/999999?text=Image+Coming+Soon' }} 
                />
                {/* Kept the category badge but styled it to be minimal */}
                <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-[10px] font-bold px-3 py-1.5 rounded-full text-gray-200 border border-white/10 shadow-sm uppercase tracking-widest">
                  {item.category}
                </span>
              </div>

              {/* Details - Clean and centered */}
              <div className="p-6 bg-[#1a232e] text-center border-t border-gray-800"> 
                {/* UPDATED: minimalist font (font-thin/light) */}
                <h2 className="text-xl font-light tracking-wide text-white group-hover:text-red-500 transition-colors">
                  {item.name}
                </h2>
                
                {/* Configure Button - Hover effect only to keep it clean */}
                <div className="mt-6 w-full text-center bg-[#111820] text-gray-400 border border-gray-700 font-bold py-3 rounded-2xl group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 transition-all duration-300 text-xs uppercase tracking-widest shadow-sm">
                  Configure Order
                </div>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}