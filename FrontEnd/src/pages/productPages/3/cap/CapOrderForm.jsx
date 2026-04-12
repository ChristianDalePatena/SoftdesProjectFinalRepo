import { useState, useRef } from "react"
import { 
  FiMaximize, FiImage, FiTruck, 
  FiUploadCloud, FiCheckCircle, FiInfo
} from "react-icons/fi";

import {
  SectionCard, Field, DeliverySection,
  inputCls
} from "../../shared"

export default function BasicOrderForm() {

  // 1. Quantity
  const [qty, setQty] = useState(1)

  // 2. Design
  const [file, setFile] = useState(null)
  const [needDesign, setNeedDesign] = useState(false)
  const [instructions, setInstructions] = useState("")
  const fileRef = useRef()

  // 3. Delivery
  const [delivery, setDelivery] = useState("Pickup")
  const [address, setAddress] = useState("")

  // Pricing
  const BASE_RATE = 250
  const totalPrice = BASE_RATE * qty

  const handleSubmit = () => {
    if (qty <= 0) {
        alert("Please enter a valid quantity.")
        return
    }
    if (delivery === "Delivery" && !address.trim()) {
        alert("Please enter a delivery address.")
        return
    }

    alert(`✅ Order submitted!\n\nQty: ${qty}\nTotal: ₱${totalPrice.toLocaleString()}`)
  }

  const summaryRows = [
    { label: "Item", value: "Custom Print" },
    { label: "Qty", value: `${qty} pc(s)`, bold: true },
  ]

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* ── LEFT ── */}
        <div className="xl:col-span-2 flex flex-col gap-6">

        {/* 1. Quantity */}
        <SectionCard title="Quantity" icon={<FiMaximize />}>
            <div className="flex flex-col gap-5">
                <Field label="Quantity">
                    <input
                        type="number"
                        min={1}
                        value={qty}
                        onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                        className={inputCls}
                    />
                </Field>
            </div>
        </SectionCard>

        {/* 2. Design Upload */}
        <SectionCard title="Design Upload" icon={<FiImage />}>
            <div className="flex flex-col gap-5">

            <Field label="Upload Design File" hint="PNG, JPG, PDF, AI accepted">
                <div onClick={() => fileRef.current.click()}
                className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl p-6 cursor-pointer hover:border-red-300 hover:bg-red-50 transition group">
                <span className={`text-3xl transition-transform ${file ? "text-green-500" : "text-gray-400 group-hover:text-red-400 group-hover:scale-110"}`}>
                    {file ? <FiCheckCircle /> : <FiUploadCloud />}
                </span>

                {file
                    ? <p className="text-xs text-center text-green-700 font-semibold break-all">{file.name}</p>
                    : <>
                        <p className="text-sm font-semibold text-gray-600">Click to upload your design</p>
                        <p className="text-xs text-gray-400">PNG, JPG, PDF, AI — max 50MB</p>
                    </>}

                <input ref={fileRef} type="file" accept="image/*,.pdf,.ai" className="hidden"
                    onChange={(e) => setFile(e.target.files || null)} />
                </div>
            </Field>

            <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" checked={needDesign} onChange={(e) => setNeedDesign(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-red-500 cursor-pointer" />
                <div>
                <p className="text-sm font-semibold text-gray-700 group-hover:text-red-500 transition">
                    I need help with the design
                </p>
                <p className="text-xs text-gray-400 mt-0.5">Our team will contact you to discuss your layout and artwork.</p>
                </div>
            </label>

            {needDesign && (
                <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-100 rounded-xl p-4 text-sm text-yellow-700">
                <FiInfo className="shrink-0 mt-0.5" />
                <p>Our design team will reach out before production to confirm layout, fonts, and colors.</p>
                </div>
            )}

            <Field label="Special Instructions" hint="Font preferences, color codes, layout notes, etc.">
                <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)}
                rows={3} placeholder="e.g. Use red and white color scheme, add our logo at the top left..."
                className={inputCls + " resize-none"} />
            </Field>

            </div>
        </SectionCard>

        {/* 3. Delivery */}
        <SectionCard title="Delivery Info" icon={<FiTruck />}>
            <DeliverySection
                delivery={delivery}
                setDelivery={setDelivery}
                address={address}
                setAddress={setAddress}
            />
        </SectionCard>

        </div>

        {/* ── RIGHT: Summary ───────────────────────────────── */}
        <div className="xl:col-span-1">
        <div className="sticky top-35 flex flex-col gap-4">

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-linear-to-r from-red-500 to-red-600">
                <h2 className="text-xs font-black uppercase tracking-widest text-white/90">Order Summary</h2>
            </div>

            <div className="px-6 py-4 flex flex-col gap-2">
                {summaryRows.map(({ label, value, bold }) => (
                <div key={label} className="flex items-start justify-between gap-2 text-sm">
                    <span className="text-gray-400 shrink-0">{label}</span>
                    <span className={`text-right text-gray-700 ${bold ? 'font-bold' : 'font-semibold'}`}>{value}</span>
                </div>
                ))}
            </div>

            <div className="mx-6 border-t border-gray-100" />

            {/* Pricing breakdown */}
            <div className="px-6 py-4 flex flex-col gap-1.5">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Pricing Breakdown</p>
                <div className="flex justify-between text-xs text-gray-500">
                    <span>Base rate</span>
                    <span>₱{BASE_RATE}/item</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                    <span>Quantity</span>
                    <span>× {qty}</span>
                </div>
                
                <div className="flex justify-between text-sm font-bold text-gray-700 border-t border-gray-100 pt-2 mt-1">
                    <span>Subtotal</span>
                    <span>₱{totalPrice.toLocaleString()}</span>
                </div>
            </div>

            <div className="mx-6 mb-4 flex items-center justify-between py-3 px-4 bg-red-50 rounded-xl border border-red-100">
                <span className="text-sm font-black text-gray-700 uppercase tracking-wide">Total</span>
                <span className="text-2xl font-black text-red-500">₱{totalPrice.toLocaleString()}</span>
            </div>

            <div className="px-6 pb-6">
                <button
                type="button" onClick={handleSubmit}
                className="w-full py-4 bg-red-500 hover:bg-red-600 active:scale-[.98] text-white text-sm font-black uppercase tracking-widest rounded-xl shadow-lg shadow-red-200 transition-all"
                >
                Place Order →
                </button>
                <p className="text-[11px] text-gray-400 text-center mt-3">
                Our team will confirm your order and send a payment link within 24 hours.
                </p>
            </div>
            </div>

            {/* Help Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">💬</span>
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-600">Need Help?</h3>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">
                Not sure about the materials or artwork setup? We're happy to help you spec the perfect order.
            </p>
            <div className="flex flex-col gap-2">
                <a href="tel:+639474631561" className="flex items-center gap-2 text-xs font-semibold text-red-500 hover:text-red-600 transition">
                📞 0947-463-1561
                </a>
                <a href="https://m.me/p2printing" target="_blank" rel="noreferrer"
                className="flex items-center gap-2 text-xs font-semibold text-red-500 hover:text-red-600 transition">
                💬 Chat on Messenger
                </a>
                <a href="mailto:picktwoprint@gmail.com"
                className="flex items-center gap-2 text-xs font-semibold text-red-500 hover:text-red-600 transition">
                ✉️ picktwoprint@gmail.com
                </a>
            </div>
            </div>

        </div>
        </div>

    </div>
  )
}