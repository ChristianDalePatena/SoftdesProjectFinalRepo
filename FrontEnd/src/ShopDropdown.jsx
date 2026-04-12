import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { shopItems } from "./shopData";

export default function ShopDropdown() {
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = [...new Set(shopItems.map(i => i.category))];

  const grouped = categories.map(cat => ({
    name: cat,
    items: shopItems.filter(i => i.category === cat)
  }));

  useEffect(() => {
    setActiveCategory(grouped[0]?.name);
  }, []);

  return (
    <div className="absolute left-0 top-full mt-4 flex bg-[#0a0f14] border border-gray-800 rounded-2xl shadow-2xl z-50">
      
      <div className="w-56 border-r border-gray-800">
        {grouped.map(cat => (
          <div
            key={cat.name}
            onMouseEnter={() => setActiveCategory(cat.name)}
            className={`px-5 py-3 text-sm uppercase tracking-widest cursor-pointer transition ${
              activeCategory === cat.name
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:bg-gray-900"
            }`}
          >
            {cat.name}
          </div>
        ))}
      </div>

      <div className="w-72 p-4">
        {grouped
          .filter(cat => cat.name === activeCategory)
          .map(cat => (
            <div key={cat.name} className="flex flex-col gap-2">
              {cat.items.map(item => (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  className="text-sm text-gray-300 hover:text-red-500 transition px-2 py-1"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}