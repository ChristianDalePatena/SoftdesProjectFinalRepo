import { useParams, Link } from "react-router-dom";
import TShirtOrderForm from "./1/t-shirt/TShirtOrderForm";
import MugOrderForm from "./1/mug/MugOrderForm";
import TarpaulinOrderForm from "./1/tarpaulin/TarpaulinOrderForm";
import StickerOrderForm from "./1/sticker/StickerOrderForm";
import SintraBoardOrderForm from "./1/sintra/SintraBoardOrderForm.jsx";
import PullUpBannerOrderForm from "./2/banner/PullUpBannerOrderForm";
import FrostedStickerOrderForm from "./2/frosted/FrostedStickerOrderForm";
import LanyardOrderForm from "./2/lanyard/LanyardOrderForm";
import PhotocopyOrderForm from "./2/photocopy/PhotocopyOrderForm";
import PVCOrderForm from "./2/pvc/PVCOrderForm";
import FlyersOrderForm from "./3/flyers/FlyersOrderForm";
import MousePadOrderForm from "./3/mousepad/MousepadOrderForm";
import TransparentStickerOrderForm from "./2/transparent/TransparentStickerOrderForm";
import ButtonOrderForm from "./3/button/ButtonOrderForm";
import CapOrderForm from "./3/cap/CapOrderForm";
import LabelOrderForm from "./3/label/LabelOrderForm";
import LeafletsOrderForm from "./3/leaflets/LeafletsOrderForm";
import PanaFlexOrderForm from "./3/panaflex/PanaflexOrderForm";
import PosterOrderForm from "./3/poster/PosterOrderForm";
import XBannerOrderForm from "./3/x-banner/X-BannerOrderForm";
import BagTagOrderForm from "./4/bagtag/BagTagOrderForm";
import EcoBagOrderForm from "./4/ecobag/EcoBagOrderForm";
import KeyChainOrderForm from "./4/keychain/KeyChainOrderForm";
import PortaBoothOrderForm from "./4/portabooth/PortaBoothOrderForm";
import RoundFanOrderForm from "./4/roundfan/RoundFanOrderForm";
import WallClockOrderForm from "./4/wallclock/WallClockOrderForm";
import TumblrOrderForm from "./4/tumblr/TumblrOrderForm";
import RefMagnetOrderForm from "./4/refmagnet/RefMagnetOrderForm";
import BacklitOrderForm from "./5/backlit/BackLitOrderForm";
import UmbrellaOrderForm from "./5/umbrella/UmbrellaOrderForm";

// ── Helper ─────────────────────────────────────────────────────────────────────
function toReadable(slug) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// ── Product registry with REAL Pricing ────────────────────────────────────────
const PRODUCTS = {
  "t-shirt": {
    label: "T-Shirt Printing",
    subtitle: "Customize and place your T-shirt printing order below.",
    startingPrice: "₱300.00",
    Form: TShirtOrderForm,
  },
  "mug": {
    label: "Mug Printing",
    subtitle: "Customize and place your mug printing order below.",
    startingPrice: "₱60.00", 
    Form: MugOrderForm,
  },
  "tarpaulin": {
    label: "Tarpaulin Printing",
    subtitle: "Enter your size, design, and accessories to get an instant price estimate.",
    startingPrice: "₱150.00",
    Form: TarpaulinOrderForm,
  },
  "sticker": {
    label: "Sticker Printing",
    subtitle: "Customize shape, finish, and quantity — get an instant price estimate.",
    startingPrice: "₱45.00",
    Form: StickerOrderForm,
  },
  "sintra-board": {
    label: "Sintra Board Printing",
    subtitle: "Professional PVC signage boards — customize size, thickness, and mounting options.",
    startingPrice: "₱150.00",
    Form: SintraBoardOrderForm,
  },
  "pull-up-banner": {
    label: "Pull-Up Banner Printing",
    subtitle: "Professional roll-up banners — customize size, material, and stand type.",
    startingPrice: "₱1,500.00",
    Form: PullUpBannerOrderForm,
  },
  "frosted-sticker": {
    label: "Frosted Sticker Printing",
    subtitle: "Custom frosted vinyl for glass, windows, and office partitions.",
    startingPrice: "₱800.00",
    Form: FrostedStickerOrderForm,
  },
  "button-pin": {
    label: "Button Pin Printing",
    subtitle: "Custom pin buttons — design your own or upload artwork.",
    startingPrice: "₱15.00",
    Form: ButtonOrderForm,
  },
  "lanyard": {
    label: "Lanyard Printing",
    subtitle: "Customize width, material, hooks, and design for your lanyards.",
    startingPrice: "₱35.00",
    Form: LanyardOrderForm,
  },
  "cap": {
    label: "Cap Printing",
    subtitle: "Custom embroidered and printed caps — single or bulk orders.",
    startingPrice: "₱250.00",
    Form: CapOrderForm,
  },
  "photocopy": {
    label: "Photocopy Services",
    subtitle: "Fast, affordable, and high-quality photocopying for all your document needs.",
    startingPrice: "₱5.00",
    Form: PhotocopyOrderForm,
  },
  "pvc-id": {
    label: "PVC ID Printing",
    subtitle: "Professional PVC ID cards — single or bulk production.",
    startingPrice: "₱60.00",
    Form: PVCOrderForm,
  },
  "transparent-sticker": {
    label: "Transparent Sticker Printing",
    subtitle: "Clear vinyl stickers with white ink options for glass, plastic, and packaging.",
    startingPrice: "₱100.00",
    Form: TransparentStickerOrderForm,
  },
  "flyers": {
    label: "Flyers Printing",
    subtitle: "Bulk flyer printing with customizable paper, size, and finishing options.",
    startingPrice: "₱6.00",
    Form: FlyersOrderForm,
  },
  "mousepad": {
    label: "Mousepad Printing",
    subtitle: "Customize your mousepad with size, material, and design.",
    startingPrice: "₱150.00",
    Form: MousePadOrderForm,
  },
  "leaflets": {
    label: "Leaflets Printing",
    subtitle: "Folded marketing leaflets with customizable paper, size, and finishing options.",
    startingPrice: "₱20.00", 
    Form: LeafletsOrderForm,
  },
  "panaflex": {
    label: "Panaflex Printing",
    subtitle: "Large-format outdoor banners with customizable size, material, and installation options.",
    startingPrice: "₱1,350.00",
    Form: PanaFlexOrderForm,
  },
  "label": {
    label: "Label Printing",
    subtitle: "Custom sticker labels for packaging, branding, and products.",
    startingPrice: "₱45.00",
    Form: LabelOrderForm,
  },
  "poster": {
    label: "Poster Printing",
    subtitle: "High-quality poster printing for events, displays, and more.",
    startingPrice: "₱25.00",
    Form: PosterOrderForm,
  },
  "x-banner": {
    label: "X-Banner Printing",
    subtitle: "Custom X-stand banners with optional stand hardware — perfect for events and promotions.",
    startingPrice: "₱650.00",
    Form: XBannerOrderForm,
  },
  "backlit": {
    label: "Backlit Printing",
    subtitle: "Premium illuminated signage for lightboxes, advertising boards, and display panels.",
    startingPrice: "₱850.00",
    Form: BacklitOrderForm,
  },
  "umbrella": {
    label: "Umbrella Printing",
    subtitle: "Custom printed umbrellas — folding, stick, or golf style with full canopy options.",
    startingPrice: "₱185.00",
    Form: UmbrellaOrderForm,
  },
  "bagtag": {
    label: "Bag Tag Printing",
    subtitle: "Custom luggage tags, ID tags, and identification labels — PVC, acrylic, and laminated.",
    startingPrice: "₱85.00",
    Form: BagTagOrderForm,
  },
  "eco-bag": {
    label: "Eco Bag Printing",
    subtitle: "Custom tote, canvas, and drawstring bags — screen print, embroidery, and bulk orders supported.",
    startingPrice: "₱230.00",
    Form: EcoBagOrderForm,
  },
  "keychain": {
    label: "Keychain Printing",
    subtitle: "Custom acrylic, PVC, metal, and wooden keychains — with glitter, holographic, and bulk options.",
    startingPrice: "₱35.00",
    Form: KeyChainOrderForm,
  },
  "portabooth": {
    label: "Portable Photobooth",
    subtitle: "Book your portable photobooth for events — open-air, enclosed, or 360°.",
    startingPrice: "₱5,500.00",
    Form: PortaBoothOrderForm,
  },
  "round-fan": {
    label: "Round Fan Printing",
    subtitle: "Custom colored-rim fans for campaigns, elections, and events.",
    startingPrice: "₱35.00",
    Form: RoundFanOrderForm,
  },
  "wallclock": {
    label: "Wall Clock Printing",
    subtitle: "Custom printed wall clocks — analog, photo, acrylic, and wooden styles.",
    startingPrice: "₱350.00",
    Form: WallClockOrderForm,
  },
  "tumblr": {
    label: "Tumbler Printing",
    subtitle: "Custom printed tumblers — stainless, acrylic, glass, and more.",
    startingPrice: "₱200.00",
    Form: TumblrOrderForm,
  },
  "ref-magnet": {
    label: "Ref Magnet Printing",
    subtitle: "Custom refrigerator magnets for souvenirs, events, and business promotions.",
    startingPrice: "₱35.00",
    Form: RefMagnetOrderForm,
  },
};

// ── Shared page shell ──────────────────────────────────────────────────────────
function PageHeader({ readable, config }) {
  const materialsMock = "Cotton, CVC, Drifit, etc.";
  const papersMock = "(not applicable)";
  const deliveryMock = "Express (1-2 days)";
  
  // Dynamically pull the price from the config, or show fallback
  const displayPrice = config?.startingPrice || "₱--.--";

  return (
    <div className="bg-white border-b border-gray-100 shadow-sm overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-red-600 mb-2">
          <Link to="/" className="hover:text-red-700 transition">Home</Link>
          <span className="text-gray-400">/</span>
          <Link to="/shop" className="hover:text-red-700 transition">shop</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-700 font-semibold">{readable}</span>
        </div>

        {/* Title and Badge */}
        <div className="flex items-center gap-4 flex-wrap mb-10">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            {config ? config.label : readable}
          </h1>
          {config && (
            <span className="px-5 py-2.5 bg-red-500 text-white rounded-full text-sm font-black uppercase tracking-wider shadow-md shadow-red-200">
              Customize
            </span>
          )}
        </div>

        {/* Split-Screen Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Product Details Card */}
          <div className="lg:col-span-2 bg-gray-50 rounded-2xl border border-gray-100 p-6 flex flex-col gap-4">
            <h2 className="text-sm font-black uppercase tracking-widest text-gray-700">
              Product Details
            </h2>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-start justify-between gap-4">
                <span className="text-gray-500 shrink-0">Materials</span>
                <span className="text-right text-gray-900 font-bold">{materialsMock}</span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-gray-500 shrink-0">Papers</span>
                <span className="text-right text-gray-900 font-bold">{papersMock}</span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-gray-500 shrink-0">Delivery</span>
                <span className="text-right text-gray-900 font-bold">{deliveryMock}</span>
              </div>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 flex flex-col gap-3 justify-center">
            <h2 className="text-xs font-black uppercase tracking-widest text-red-500">
              Starting Price
            </h2>
            <p className="text-5xl font-black text-gray-900">
              {displayPrice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComingSoon({ readable }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
      <span className="text-6xl">🖨️</span>
      <h2 className="text-2xl font-black text-gray-800">{readable}</h2>
      <p className="text-gray-400 text-sm max-w-sm">
        The order form for <strong>{readable}</strong> is coming soon. Contact us
        directly to place an order.
      </p>
      <Link
        to="/shop"
        className="mt-2 px-6 py-3 bg-red-500 text-white text-sm font-bold rounded-xl hover:bg-red-600 transition"
      >
        ← Back to Products
      </Link>
    </div>
  );
}

// ── Exported component ─────────────────────────────────────────────────────────
export default function ProductPage() {
  const { name } = useParams();
  const readable = toReadable(name || "");
  const config = PRODUCTS[name];

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <PageHeader readable={readable} config={config} />
      <div className="max-w-7xl mx-auto px-6 py-8">
        {config ? <config.Form /> : <ComingSoon readable={readable} />}
      </div>
    </div>
  );
}