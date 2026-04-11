import { useState, useRef } from "react"
import { 
  FiCoffee, FiImage, FiEdit3, FiPackage, FiTruck, 
  FiUploadCloud, FiCheckCircle, FiInfo, FiLayout
} from "react-icons/fi";

import {
SectionCard, Field, ToggleGroup, DeliverySection,
SummaryCard, HelpCard, inputCls, selectCls,
} from "../../shared"

export default function MugOrderForm() {
// A. Mug Details
const [mugType, setMugType] = useState("Classic White Mug")
const [qty, setQty]         = useState(1)

// B. Design
const [file, setFile]             = useState(null)
const [printArea, setPrintArea]   = useState("Front Only")
const [designSize, setDesignSize] = useState("Medium")
const [orientation, setOrientation] = useState("Landscape")
const fileRef = useRef()

// C. Custom Text
const [customText, setCustomText] = useState("")
const [fontStyle, setFontStyle]   = useState("Sans")
const [textColor, setTextColor]   = useState("#000000")

// D. Additional
const [withBox, setWithBox]           = useState(false)
const [instructions, setInstructions] = useState("")

// E. Delivery
const [delivery, setDelivery] = useState("Pickup")
const [address, setAddress]   = useState("")

// Pricing
const basePrice   = 120
const magicExtra  = mugType === "Magic Mug (Heat-sensitive)" ? 50 : 0
const boxExtra    = withBox ? 20 : 0
const pricePerUnit = basePrice + magicExtra + boxExtra
const totalPrice  = qty * pricePerUnit

const handleSubmit = () =>
alert(`Order submitted!\n\n${mugType}\nQty: ${qty}\nTotal: ₱${totalPrice.toLocaleString()}`)

const summaryRows = [
{ label: "Product",       value: mugType },
{ label: "Print Area",    value: printArea },
{ label: "Design Size",   value: designSize },
{ label: "Orientation",   value: orientation },
...(customText ? [{ label: "Custom Text", value: `"${customText}"` }] : []),
{ label: "Box Packaging", value: withBox ? "Yes (+₱20)" : "No" },
{ label: "Base Price",    value: `₱${basePrice}/pc` },
...(magicExtra ? [{ label: "Magic Mug",  value: `+₱${magicExtra}/pc` }] : []),
...(boxExtra   ? [{ label: "Box",        value: `+₱${boxExtra}/pc`   }] : []),
{ label: "Price / pc",    value: `₱${pricePerUnit}`, bold: true },
{ label: "Quantity",      value: `${qty} pcs`,       bold: true },
]

return (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
    {/* ── Left ── */}
    <div className="xl:col-span-2 flex flex-col gap-6">

    <SectionCard title="Mug Details" icon={<FiCoffee />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Mug Type">
            <select value={mugType} onChange={(e) => setMugType(e.target.value)} className={selectCls}>
            {["Classic White Mug","Magic Mug (Heat-sensitive)","Glass Mug","Colored Mug (inside handle color)"].map((t) =>
                <option key={t}>{t}</option>
            )}
            </select>
        </Field>
        <Field label="Quantity">
            <input type="number" min={1} value={qty}
            onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
            className={inputCls} />
        </Field>
        </div>
        {mugType === "Magic Mug (Heat-sensitive)" && (
        <div className="mt-4 flex items-start gap-3 bg-purple-50 border border-purple-100 rounded-xl p-4 text-sm text-purple-700">
            <FiInfo className="shrink-0 mt-0.5" />
            <p>Magic mugs reveal your design when filled with a hot beverage. <strong>+₱50 per mug.</strong></p>
        </div>
        )}
    </SectionCard>

    <SectionCard title="Design Customization" icon={<FiImage />}>
        <div className="flex flex-col gap-5">
        <Field label="Upload Design File" hint="PNG, JPG, PDF accepted">
            <div onClick={() => fileRef.current.click()}
            className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl p-5 cursor-pointer hover:border-red-300 hover:bg-red-50 transition group">
            <span className={`text-2xl transition-transform ${file ? "text-green-500" : "text-gray-400 group-hover:text-red-400 group-hover:scale-110"}`}>
                {file ? <FiCheckCircle /> : <FiUploadCloud />}
            </span>
            {file
                ? <p className="text-xs text-center text-green-700 font-semibold break-all">{file.name}</p>
                : <p className="text-xs text-gray-400 text-center font-semibold">Click to browse file</p>}
            <input ref={fileRef} type="file" accept="image/*,.pdf" className="hidden"
                onChange={(e) => setFile(e.target.files || null)} />
            </div>
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Field label="Print Area">
            <select value={printArea} onChange={(e) => setPrintArea(e.target.value)} className={selectCls}>
                {["Front Only","Full Wrap","Front & Back"].map((a) => <option key={a}>{a}</option>)}
            </select>
            </Field>
            <Field label="Design Size">
            <div className="flex flex-col gap-2">
                {["Small Logo","Medium","Full Wrap"].map((s) => (
                <button key={s} type="button" onClick={() => setDesignSize(s)}
                    className={`py-2 rounded-xl text-sm font-semibold border transition ${
                    designSize === s ? "bg-red-500 text-white border-red-500" : "bg-white text-gray-600 border-gray-200 hover:border-red-300"
                    }`}>{s}</button>
                ))}
            </div>
            </Field>
            <Field label="Orientation">
            <div className="flex flex-col gap-2">
                {[
                  { label: "Landscape", value: "Landscape", icon: <FiLayout /> },
                  { label: "Portrait", value: "Portrait", icon: <FiLayout className="rotate-90" /> }
                ].map((o) => (
                <button key={o.value} type="button" onClick={() => setOrientation(o.value)}
                    className={`flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-semibold border transition ${
                    orientation === o.value ? "bg-red-500 text-white border-red-500" : "bg-white text-gray-600 border-gray-200 hover:border-red-300"
                    }`}>
                    {o.icon} {o.label}
                </button>
                ))}
            </div>
            </Field>
        </div>
        </div>
    </SectionCard>

    <SectionCard title="Custom Text (Optional)" icon={<FiEdit3 />}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="sm:col-span-3">
            <Field label="Text to Print" hint="Names, quotes, messages, etc.">
            <input type="text" value={customText} onChange={(e) => setCustomText(e.target.value)}
                placeholder='e.g. "Happy Birthday, Maria!"' className={inputCls} />
            </Field>
        </div>
        <Field label="Font Style">
            <select value={fontStyle} onChange={(e) => setFontStyle(e.target.value)} className={selectCls}>
            {["Sans","Serif","Script"].map((f) => <option key={f}>{f}</option>)}
            </select>
        </Field>
        <Field label="Text Color">
            <div className="flex items-center gap-3">
            <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)}
                className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-1" />
            <span className="text-sm text-gray-600 font-mono">{textColor}</span>
            </div>
        </Field>
        {customText && (
            <div className="sm:col-span-3">
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-center justify-center min-h-[3rem]">
                <p style={{ color: textColor, fontFamily: fontStyle === "Script" ? "cursive" : fontStyle === "Serif" ? "serif" : "sans-serif", fontSize: "1.1rem" }}>
                {customText}
                </p>
            </div>
            <p className="text-xs text-gray-400 mt-1 text-center">Preview (approximate)</p>
            </div>
        )}
        </div>
    </SectionCard>

    <SectionCard title="Additional Options" icon={<FiPackage />}>
        <div className="flex flex-col gap-5">
        <Field label="Box Packaging">
            <div className="flex gap-3">
            {[
              { label: "No Box", val: false },
              { label: "With Box (+₱20)", val: true }
            ].map(({ label, val }) => (
                <button key={label} type="button" onClick={() => setWithBox(val)}
                className={`flex-1 py-3 rounded-xl text-sm font-bold border transition ${
                    withBox === val ? "bg-red-500 text-white border-red-500" : "bg-white text-gray-600 border-gray-200 hover:border-red-300"
                }`}>{label}</button>
            ))}
            </div>
        </Field>
        <Field label="Special Instructions" hint="Any specific details about your order">
            <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)}
            rows={3} placeholder="e.g. Please center the logo, avoid the handle area..."
            className={inputCls + " resize-none"} />
        </Field>
        </div>
    </SectionCard>

    <SectionCard title="Delivery Info" icon={<FiTruck />}>
        <DeliverySection delivery={delivery} setDelivery={setDelivery} address={address} setAddress={setAddress} />
    </SectionCard>
    </div>

    {/* ── Right: Summary ── */}
    <div className="xl:col-span-1">
    <div className="sticky top-36 flex flex-col gap-4">
        <SummaryCard rows={summaryRows} total={totalPrice} onSubmit={handleSubmit} />
        <HelpCard />
    </div>
    </div>
</div>
)
}