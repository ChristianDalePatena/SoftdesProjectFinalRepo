import { useState, useRef } from "react"
import { 
  FiMaximize, FiLayers, FiImage, FiTool, FiGrid, FiTruck, 
  FiUploadCloud, FiCheckCircle, FiInfo, FiMapPin, FiPackage 
} from "react-icons/fi"; // <-- FiMapPin and FiPackage are now safely imported!

import {
SectionCard, Field, ToggleGroup, DeliverySection,
SummaryCard, HelpCard, inputCls, selectCls,
} from "../../shared"

const PRESETS = [
{ label: "2×3 ft",  w: 2,  h: 3  },
{ label: "3×5 ft",  w: 3,  h: 5  },
{ label: "4×6 ft",  w: 4,  h: 6  },
{ label: "5×8 ft",  w: 5,  h: 8  },
{ label: "Custom",  w: "", h: ""  },
]

export default function TarpaulinOrderForm() {
// A. Size & Quantity
const [preset, setPreset]   = useState("2×3 ft")
const [width, setWidth]     = useState(2)
const [height, setHeight]   = useState(3)
const [qty, setQty]         = useState(1)

// B. Material
const [material, setMaterial]     = useState("Standard Tarpaulin")
const [thickness, setThickness]   = useState("13oz")

// C. Design
const [file, setFile]             = useState(null)
const [needDesign, setNeedDesign] = useState(false)
const [instructions, setInstructions] = useState("")
const fileRef = useRef()

// D. Accessories
const [eyelets, setEyelets] = useState(false)
const [rope, setRope]       = useState(false)
const [stand, setStand]     = useState(false)

// E. Usage
const [usage, setUsage]         = useState("Event Banner")
const [otherUsage, setOtherUsage] = useState("")

// F. Delivery
const [delivery, setDelivery] = useState("Pickup")
const [address, setAddress]   = useState("")

// Helpers
const safeW = parseFloat(width)  || 0
const safeH = parseFloat(height) || 0
const area  = safeW * safeH

const applyPreset = (p) => {
setPreset(p.label)
if (p.label !== "Custom") { setWidth(p.w); setHeight(p.h) }
}

// Pricing
const BASE_RATE   = 35           // per sq ft
const eyeletCost  = eyelets ? 20  : 0
const ropeCost    = rope    ? 30  : 0
const standCost   = stand   ? 150 : 0
const printCost   = area * BASE_RATE * qty
const addOnCost   = (eyeletCost + ropeCost + standCost)
const totalPrice  = printCost + addOnCost

const handleSubmit = () => {
if (safeW <= 0 || safeH <= 0) {
    alert("Please enter a valid width and height.")
    return
}
if (qty <= 0) {
    alert("Please enter a valid quantity.")
    return
}
if (delivery === "Delivery" && !address.trim()) {
    alert("Please enter a delivery address.")
    return
}
alert(`✅ Order submitted!\n\nTarpaulin ${safeW}×${safeH} ft\nArea: ${area} sq ft\nQty: ${qty}\nTotal: ₱${totalPrice.toLocaleString()}`)
}

const summaryRows = [
{ label: "Size",      value: area > 0 ? `${safeW} × ${safeH} ft (${area} sq ft)` : "—" },
{ label: "Qty",       value: `${qty} pc(s)`, bold: true },
{ label: "Material",  value: material },
{ label: "Thickness", value: thickness },
{ label: "Eyelets",   value: eyelets ? `Yes (+₱${eyeletCost})` : "No" },
{ label: "Rope",      value: rope    ? `Yes (+₱${ropeCost})`    : "No" },
{ label: "Stand",     value: stand   ? `Yes (+₱${standCost})`   : "No" },
{ label: "Usage",     value: usage === "Others" ? otherUsage || "Others" : usage },
{ label: "Print Cost",value: area > 0 ? `₱${BASE_RATE}/sq ft × ${area} sq ft × ${qty}` : "—" },
{ label: "Add-ons",   value: addOnCost > 0 ? `+₱${addOnCost}` : "None" },
]

return (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
    {/* ── Left ── */}
    <div className="xl:col-span-2 flex flex-col gap-6">

    {/* A. Size & Quantity */}
    <SectionCard title="Tarpaulin Details" icon={<FiMaximize />}>
        <div className="flex flex-col gap-5">
        <Field label="Common Sizes" hint="Select a preset or choose Custom to enter your own">
            <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
                <button key={p.label} type="button" onClick={() => applyPreset(p)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition ${
                    preset === p.label
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white text-gray-600 border-gray-200 hover:border-red-300"
                }`}
                >{p.label}</button>
            ))}
            </div>
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Field label="Width (ft)" hint={preset !== "Custom" ? "Click 'Custom' to edit" : undefined}>
            <input type="number" min={0.1} step={0.1} value={width}
                disabled={preset !== "Custom"}
                onChange={(e) => setWidth(e.target.value)}
                className={inputCls + (preset !== "Custom" ? " opacity-60 cursor-not-allowed" : "")} />
            </Field>
            <Field label="Height (ft)" hint={preset !== "Custom" ? "Click 'Custom' to edit" : undefined}>
            <input type="number" min={0.1} step={0.1} value={height}
                disabled={preset !== "Custom"}
                onChange={(e) => setHeight(e.target.value)}
                className={inputCls + (preset !== "Custom" ? " opacity-60 cursor-not-allowed" : "")} />
            </Field>
            <Field label="Quantity">
            <input type="number" min={1} value={qty}
                onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                className={inputCls} />
            </Field>
        </div>

        {area > 0 && (
            <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
            <FiMaximize className="text-blue-500 text-lg shrink-0" />
            <div className="text-sm text-blue-700">
                <strong>Area: {area.toFixed(2)} sq ft</strong>
                <span className="text-blue-400 ml-2">({safeW} × {safeH} ft)</span>
            </div>
            </div>
        )}
        </div>
    </SectionCard>

    {/* B. Material & Finish */}
    <SectionCard title="Material & Finish" icon={<FiLayers />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Material Type">
            <div className="flex flex-col gap-2">
            {["Standard Tarpaulin","Matte Finish","Glossy Finish"].map((m) => (
                <button key={m} type="button" onClick={() => setMaterial(m)}
                className={`py-2.5 px-4 rounded-xl text-sm font-semibold border text-left transition ${
                    material === m ? "bg-red-500 text-white border-red-500" : "bg-white text-gray-600 border-gray-200 hover:border-red-300"
                }`}>{m}</button>
            ))}
            </div>
        </Field>
        <Field label="Thickness">
            <select value={thickness} onChange={(e) => setThickness(e.target.value)} className={selectCls}>
            {["10oz","13oz","15oz","18oz"].map((t) => <option key={t}>{t}</option>)}
            </select>
            <div className="mt-3 bg-gray-50 border border-gray-100 rounded-xl p-3">
            <p className="text-xs text-gray-500 leading-relaxed">
                <strong>10oz</strong> — lightweight, indoor use<br />
                <strong>13oz</strong> — standard outdoor<br />
                <strong>15–18oz</strong> — heavy-duty, long-term display
            </p>
            </div>
        </Field>
        </div>
    </SectionCard>

    {/* C. Design Upload */}
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

    {/* D. Accessories */}
    <SectionCard title="Layout & Accessories" icon={<FiTool />}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
            { label: "Eyelets",  desc: "Metal grommets for hanging",     state: eyelets, set: setEyelets, cost: eyeletCost },
            { label: "Rope",     desc: "Nylon rope for securing tarp",    state: rope,    set: setRope,    cost: ropeCost },
            { label: "Stand",    desc: "Portable display stand included", state: stand,   set: setStand,   cost: standCost },
        ].map(({ label, desc, state, set, cost }) => (
            <button key={label} type="button" onClick={() => set(!state)}
            className={`flex flex-col items-start gap-1.5 p-4 rounded-xl border-2 text-left transition ${
                state ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:border-red-200"
            }`}>
            <div className="flex items-center justify-between w-full">
                <span className={`text-sm font-bold ${state ? "text-red-600" : "text-gray-700"}`}>{label}</span>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
                state ? "bg-red-500 border-red-500" : "border-gray-300"
                }`}>
                {state && <span className="text-white text-xs">✓</span>}
                </div>
            </div>
            <p className="text-xs text-gray-400">{desc}</p>
            <p className={`text-xs font-semibold ${state ? "text-red-500" : "text-gray-400"}`}>+₱{cost}</p>
            </button>
        ))}
        </div>
    </SectionCard>

    {/* E. Usage Type */}
    <SectionCard title="Usage Type" icon={<FiGrid />}>
        <div className="flex flex-col gap-4">
        <Field label="What is this tarpaulin for?" hint="Helps us optimize your print settings">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {["Event Banner","Business Advertisement","Birthday / Celebration","Others"].map((u) => (
                <button key={u} type="button" onClick={() => setUsage(u)}
                className={`py-3 px-3 rounded-xl text-xs font-semibold border text-center transition leading-tight ${
                    usage === u ? "bg-red-500 text-white border-red-500" : "bg-white text-gray-600 border-gray-200 hover:border-red-300"
                }`}>{u}</button>
            ))}
            </div>
        </Field>
        {usage === "Others" && (
            <Field label="Please specify">
            <input type="text" value={otherUsage} onChange={(e) => setOtherUsage(e.target.value)}
                placeholder="Describe your usage..." className={inputCls} />
            </Field>
        )}
        </div>
    </SectionCard>

    {/* F. Delivery */}
    <SectionCard title="Delivery Info" icon={<FiTruck />}>
        <DeliverySection delivery={delivery} setDelivery={setDelivery} address={address} setAddress={setAddress} />
    </SectionCard>
    </div>

    {/* ── Right: Summary ── */}
    <div className="xl:col-span-1">
    <div className="sticky top-36 flex flex-col gap-4">

        {/* Pricing breakdown card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Price Breakdown</p>
        </div>
        <div className="p-5 flex flex-col gap-2 text-xs text-gray-600">
            <div className="flex justify-between">
            <span>Base rate</span>
            <span className="font-semibold">₱{BASE_RATE} / sq ft</span>
            </div>
            <div className="flex justify-between">
            <span>Area</span>
            <span className="font-semibold">{area > 0 ? `${area} sq ft` : "—"}</span>
            </div>
            <div className="flex justify-between">
            <span>Quantity</span>
            <span className="font-semibold">× {qty}</span>
            </div>
            <div className="flex justify-between border-t border-gray-100 pt-2 mt-1">
            <span>Print subtotal</span>
            <span className="font-bold text-gray-800">₱{printCost.toLocaleString()}</span>
            </div>
            {addOnCost > 0 && (
            <div className="flex justify-between">
                <span>Add-ons</span>
                <span className="font-semibold text-red-500">+₱{addOnCost}</span>
            </div>
            )}
        </div>
        </div>

        <SummaryCard rows={summaryRows} total={totalPrice} onSubmit={handleSubmit} />
        <HelpCard />
    </div>
    </div>
</div>
)
}