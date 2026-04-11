import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCarouselMemory } from '../useCarouselMemory';

// --- PRODUCT DATA ---
const products1 = [
  { name: "T-shirt", img: "/images/1/t-shirt.jpg" },
  { name: "Mug", img: "/images/1/mug.jpg" },
  { name: "Tarpaulin", img: "/images/1/tarpaulin.jpg" },
  { name: "Sticker", img: "/images/1/sticker.jpg" },
  { name: "Sintra Board", img: "/images/1/sintra.jpg" },
];

const products2 = [
  { name: "PVC ID", img: "/images/2/pvc.jpg" },
  { name: "Lanyard", img: "/images/2/lanyard.jpg" },
  { name: "Pull-up Banner", img: "/images/2/banner.jpg" },
  { name: "Transparent Sticker", img: "/images/2/transparent.jpg" },
  { name: "Frosted Sticker", img: "/images/2/frosted.jpg" },
  { name: "Photocopy", img: "/images/2/photocopy.jpg" },
];

const products3 = [
  { name: "Button Pin", img: "/images/3/button.jpg" },
  { name: "Mousepad", img: "/images/3/mousepad.jpg" },
  { name: "Cap", img: "/images/3/cap.jpg" },
  { name: "Poster", img: "/images/3/poster.jpg" },
  { name: "Panaflex", img: "/images/3/panaflex.jpg" },
  { name: "X-Banner", img: "/images/3/x-banner.jpg" },
  { name: "Label", img: "/images/3/label.jpg" },
  { name: "Flyers", img: "/images/3/flyers.jpg" },
  { name: "Leaflets", img: "/images/3/leaflets.jpg" },
];

const products4 = [
  { name: "Tumblr", img: "/images/4/tumblr.jpg" },
  { name: "Bagtag", img: "/images/4/bagtag.jpg" },
  { name: "Ref Magnet", img: "/images/4/magnet.jpg" },
  { name: "Wallclock", img: "/images/4/wallclock.jpg" },
  { name: "Keychain", img: "/images/4/keychain.jpg" },
  { name: "Eco Bag", img: "/images/4/ecobag.jpg" },
  { name: "Round Fan", img: "/images/4/roundfan.jpg" },
  { name: "Portabooth", img: "/images/4/portabooth.jpg" },
];

const products5 = [
  { name: "Umbrella", img: "/images/5/umbrella.jpg" },
  { name: "Backlit", img: "/images/5/backlit.jpg" },
];

// --- COMPONENTS ---
function ProductCard({ product }) {
  const productSlug = product.name.toLowerCase().replace(/\s+/g, '-');

  return (
    <Link
      to={`/product/${productSlug}`}
      className="flex flex-col w-96 cursor-pointer bg-[#0a0f14] rounded-2xl border border-gray-800 overflow-hidden 
                 transition-all duration-300 ease-out
                 hover:scale-[1.03] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:border-red-500/50 
                 group z-0 hover:z-10"
    >
      <div className="h-56 relative overflow-hidden bg-black/20">
        <img 
          src={product.img} 
          alt={product.name} 
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-700" 
        />
      </div>

      <div className="p-5 bg-[#1a232e] text-center border-t border-gray-800 flex items-center justify-center">
        <h2 className="text-white font-light tracking-widest text-xl group-hover:text-red-500 transition-colors">
          {product.name}
        </h2>
      </div>
    </Link>
  )
}

function Carousel({ products, memoryKey }) {
  const [startIndex, setStartIndex] = useCarouselMemory(memoryKey, 0);
  const [slideClass, setSlideClass] = useState("");
  const visibleCount = 3;

  const slide = (direction) => {
    const newIndex =
      direction === "left"
        ? Math.max(startIndex - 1, 0)
        : Math.min(startIndex + 1, products.length - visibleCount);

    if (newIndex === startIndex) return;

    setSlideClass(direction === "left" ? "carousel-slide-out-right" : "carousel-slide-out-left");
    setTimeout(() => {
      setStartIndex(newIndex);
      setSlideClass(direction === "left" ? "carousel-slide-in-right" : "carousel-slide-in-left");
      setTimeout(() => setSlideClass(""), 300);
    }, 200);
  };

  const visibleProducts = products.slice(startIndex, startIndex + visibleCount);

  return (
    <div className="group/carousel flex items-center justify-center my-12 relative w-full max-w-[90rem] mx-auto">
      
      {/* TRANSPARENT CIRCLE BUTTON - LEFT */}
      <button
        onClick={() => slide("left")}
        disabled={startIndex === 0}
        className="absolute left-2 lg:-left-10 z-30 flex items-center justify-center w-14 h-14 rounded-full 
                   bg-black/30 backdrop-blur-md text-white border border-white/10 
                   opacity-0 group-hover/carousel:opacity-100 disabled:hidden 
                   transition-all duration-500 hover:bg-red-600 hover:scale-110 active:scale-95 cursor-pointer"
      >
        <span className="text-3xl font-light -translate-x-0.5 pb-1">‹</span>
      </button>

      <div className={`flex gap-8 ${slideClass} px-4 py-4`}>
        {visibleProducts.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>

      {/* TRANSPARENT CIRCLE BUTTON - RIGHT */}
      <button
        onClick={() => slide("right")}
        disabled={startIndex >= products.length - visibleCount}
        className="absolute right-2 lg:-right-10 z-30 flex items-center justify-center w-14 h-14 rounded-full 
                   bg-black/30 backdrop-blur-md text-white border border-white/10 
                   opacity-0 group-hover/carousel:opacity-100 disabled:hidden 
                   transition-all duration-500 hover:bg-red-600 hover:scale-110 active:scale-95 cursor-pointer"
      >
        <span className="text-3xl font-light translate-x-0.5 pb-1">›</span>
      </button>

    </div>
  )
}

const Home = () => {
  return (
    <div className="flex-1 bg-gray-300">

      {/* HERO SECTION */}
      <section className="w-full bg-gray-800 pt-10 pb-16">
        <div className="px-6 max-w-7xl mx-auto">
          <header className="relative w-full h-[500px] md:h-[600px] bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-700">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-60"
              src="/videos/printing_process.mp4"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center z-10 px-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-thin text-white mb-5 leading-tight tracking-widest max-w-3xl drop-shadow-sm opacity-90 uppercase">
                High Quality Printing <br /> for Your Every Need.
              </h1>
              <p className="text-sm md:text-base font-extralight text-gray-200 mb-8 leading-relaxed max-w-2xl tracking-wide opacity-80 italic">
                We are a dedicated team delivering top-tier printing and promotional services to bring your ideas to life. Quality, speed, and innovation are at the heart of what we do.
              </p>
              <Link
                to="/shop"
                className="inline-block bg-red-600 text-white px-8 py-3.5 rounded-full font-light uppercase tracking-[0.2em] text-xs hover:bg-red-700 active:scale-95 transition-all duration-300 shadow-[0_0_15px_rgba(220,38,38,0.4)]"
              >
                Explore Our Products
              </Link>
            </div>
            <div className="absolute bottom-6 right-8 z-20 text-white/40 text-[10px] font-thin tracking-[0.3em] uppercase">
              Pick2Print
            </div>
          </header>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="py-20 bg-gray-300 border-t border-gray-200">
        <div className="max-w-[90rem] mx-auto px-6">
          <h2 className="text-center text-3xl font-thin text-gray-900 mb-8 tracking-widest uppercase">
            Best-Selling Products
          </h2>
          <Carousel products={products1} memoryKey="best-sellers" />

          <h2 className="text-center text-3xl font-thin text-gray-900 mt-24 mb-8 tracking-widest uppercase">
            ID & Signage
          </h2>
          <Carousel products={products2} memoryKey="id-signage" />

          <h2 className="text-center text-3xl font-thin text-gray-900 mt-24 mb-8 tracking-widest uppercase">
            Marketing Materials
          </h2>
          <Carousel products={products3} memoryKey="marketing" />

          <h2 className="text-center text-3xl font-thin text-gray-900 mt-24 mb-8 tracking-widest uppercase">
            Souvenirs & Gifts
          </h2>
          <Carousel products={products4} memoryKey="souvenirs" />

          <h2 className="text-center text-3xl font-thin text-gray-900 mt-24 mb-8 tracking-widest uppercase">
            We Also Do
          </h2>
          <Carousel products={products5} memoryKey="other" />
        </div>
      </section>

    </div>
  );
};

export default Home;