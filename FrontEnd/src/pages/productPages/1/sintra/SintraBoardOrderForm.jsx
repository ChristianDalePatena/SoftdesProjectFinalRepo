import { useState, useRef } from "react"
import { 
  FiClipboard, FiLayers, FiPrinter, FiTool, FiImage, FiGrid, FiTruck, 
  FiMaximize, FiInfo, FiUploadCloud, FiCheckCircle
} from "react-icons/fi";

import {
SectionCard, Field, ToggleGroup, DeliverySection,
SummaryCard, HelpCard, inputCls
} from "../../shared"

const PRESETS = [
{ label: "12×18 in", w: "12", h: "18" },
{ label: "18×24 in", w: "18", h: "24" },
{ label: "24×36 in", w: "24", h: "36" },
{ label: "Custom",   w: "",   h: ""   },
]

const BASE_RATE = 120 // per sq ft

export default function SintraBoardOrderForm() {
// A. Board Details
const [preset, setPreset]   = useState("18×24 in")
const [unit, setUnit]       = useState("inches")
const [width, setWidth]     = useState("18")
const [height, setHeight]   = useState("24")
const [qty, setQty]         = useState(1)

// B. Material
const [thickness, setThickness] = useState("5mm")
const [finish, setFinish]       = useState("Matte")

// C. Printing
const [printType, setPrintType]   = useState("Single-sided")
const [lamination, setLamination] = useState("None")

// D. Mounting
const [withStand,    setWithStand]    = useState(false)
const [withMount,    setWithMount]    = useState(false)
const [withAdhesive, setWithAdhesive] = useState(false)

// E. Design
const [file, setFile]                 = useState(null)
const [needsDesign, setNeedsDesign]   = useState(false)
const [instructions, setInstructions] = useState("")
const fileRef = useRef()

// F. Usage
const [usage, setUsage]         = useState("Business Signage")
const [otherUsage, setOtherUsage] = useState("")

// G. Delivery
const [delivery, setDelivery] = useState("Pickup")
const [address, setAddress]   = useState("")

// ── Preset handler
const handlePreset = (p) => {
setPreset(p.label)
if (p.label !== "Custom") { setWidth(p.w); setHeight(p.h) }
}

// ── Area calculation
const safeW = parseFloat(width)  || 0
const safeH = parseFloat(height) || 0

// Convert to sq ft for pricing
const toFt = (val) => unit === "inches" ? val / 12 : val
const areaFt2 = toFt(safeW) * toFt(safeH)

// ── Pricing
const thicknessAdd  = thickness === "10mm" ? 60 : thickness === "5mm" ? 30 : 0
const printAdd      = printType === "Double-sided" ? 50 : 0
const lamAdd        = lamination !== "None" ? 20 : 0
const standAdd      = withStand ? 150 : 0
const pricePerFt2   = BASE_RATE + thicknessAdd + printAdd + lamAdd
const safeQty       = Math.max(0, parseInt(qty) || 0)
const printCost     = areaFt2 * pricePerFt2 * safeQty
const totalPrice    = printCost + (withStand ? standAdd : 0)

// ── Submit
const handleSubmit = () => {
if (safeW <= 0 || safeH <= 0) {
    alert("Please enter a valid width and height.")
    return
}
if (safeQty <= 0) {
    alert("Please enter a valid quantity.")
    return
}
if (delivery === "Delivery" && !address.trim()) {
    alert("Please enter a delivery address.")
    return
}
alert(`✅ Order submitted!\n\nSintra Board ${width}×${height} ${unit}\nQty: ${safeQty}\nTotal: ₱${totalPrice.toLocaleString()}`)
}

const summaryRows = [
{ label: "Size",         value: safeW > 0 && safeH > 0 ? `${safeW} × ${safeH} ${unit} (${areaFt2.toFixed(2)} sq ft)` : "—" },
{ label: "Quantity",     value: `${safeQty} pc(s)`, bold: true },
{ label: "Thickness",    value: thickness },
{ label: "Finish",       value: finish },
{ label: "Print Type",   value: printType },
{ label: "Lamination",   value: lamination },
{ label: "Stand",        value: withStand    ? `Yes (+₱${standAdd})` : "No" },
{ label: "Wall Mount",   value: withMount    ? "Yes" : "No" },
{ label: "Adhesive",     value: withAdhesive ? "Yes" : "No" },
{ label: "Usage",        value: usage === "Others" ? (otherUsage || "Others") : usage },
{ label: "Delivery",     value: delivery },
{ label: "Base rate",    value: `₱${BASE_RATE}/sq ft` },
...(thicknessAdd ? [{ label: `Thickness (${thickness})`, value: `+₱${thicknessAdd}/sq ft` }] : []),
...(printAdd     ? [{ label: "Double-sided",             value: `+₱${printAdd}/sq ft`     }] : []),
...(lamAdd       ? [{ label: "Lamination",               value: `+₱${lamAdd}/sq ft`       }] : []),
{ label: "Rate / sq ft", value: `₱${pricePerFt2}`, bold: true },
]

return (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
    {/* ── Left ── */}
    <div className="xl:col-span-2 flex flex-col gap-6">

    {/* A. Board Details */}
    <SectionCard title="Board Details" icon={<FiClipboard />}>
        <div className="flex flex-col gap-5">

        <Field label="Size Unit">
            <ToggleGroup options={["inches", "feet"]} value={unit} onChange={setUnit} />
        </Field>

        <Field label="Common Sizes" hint="Select a preset or choose Custom to enter your own">
            <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
                <button
                key={p.label}
                type="button"
                onClick={() => handlePreset(p)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition ${
                    preset === p.label
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white text-gray-600 border-gray-200 hover:border-red-300"
                }`}
                >
                {p.label}
                </button>
            ))}
            </div>
        </Field>

        <div className="grid grid-cols-2 gap-4">
            <Field label={`Width (${unit})`} hint={preset !== "Custom" ? "Click 'Custom' to edit" : undefined}>
            <input
                type="number" min="0.1" step="0.1" value={width}
                disabled={preset !== "Custom"}
                onChange={(e) => setWidth(e.target.value)}
                className={inputCls + (preset !== "Custom" ? " opacity-60 cursor-not-allowed" : "")}
                placeholder="e.g. 18"
            />
            </Field>
            <Field label={`Height (${unit})`} hint={preset !== "Custom" ? "Click 'Custom' to edit" : undefined}>
            <input
                type="number" min="0.1" step="0.1" value={height}
                disabled={preset !== "Custom"}
                onChange={(e) => setHeight(e.target.value)}
                className={inputCls + (preset !== "Custom" ? " opacity-60 cursor-not-allowed" : "")}
                placeholder="e.g. 24"
            />
            </Field>
        </div>

        {areaFt2 > 0 && (
            <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
            <FiMaximize className="text-blue-500 text-lg shrink-0" />
            <div className="text-sm text-blue-700">
                <strong>Area: {areaFt2.toFixed(2)} sq ft</strong>
                <span className="text-blue-400 ml-2">({safeW} × {safeH} {unit})</span>
            </div>
            </div>
        )}

        <Field label="Quantity">
            <input
            type="number" min="1" value={qty}
            onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
            className={inputCls}
            />
        </Field>
        </div>
    </SectionCard>

    {/* B. Material Options */}
    <SectionCard title="Material Options" icon={<FiLayers />}>
        <div className="flex flex-col gap-5">
        <Field label="Thickness">
            <div className="grid grid-cols-3 gap-3">
            {[
                { val: "3mm",  desc: "Lightweight, indoor",    add: "Included" },
                { val: "5mm",  desc: "Standard, versatile",    add: "+₱30/sq ft" },
                { val: "10mm", desc: "Heavy-duty, long-term",  add: "+₱60/sq ft" },
            ].map(({ val, desc, add }) => (
                <button
                key={val}
                type="button"
                onClick={() => setThickness(val)}
                className={`flex flex-col items-start gap-1 p-3.5 rounded-xl border text-left transition ${
                    thickness === val
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white text-gray-700 border-gray-200 hover:border-red-300"
                }`}
                >
                <span className="text-sm font-bold">{val}</span>
                <span className={`text-xs ${thickness === val ? "text-red-100" : "text-gray-400"}`}>{desc}</span>
                <span className={`text-xs font-semibold ${thickness === val ? "text-red-100" : "text-red-500"}`}>{add}</span>
                </button>
            ))}
            </div>
        </Field>

        <Field label="Surface Finish">
            <ToggleGroup
            options={["Matte", "Glossy"]}
            value={finish}
            onChange={setFinish}
            />
        </Field>
        </div>
    </SectionCard>

    {/* C. Printing Options */}
    <SectionCard title="Printing Options" icon={<FiPrinter />}>
        <div className="flex flex-col gap-5">
        <Field label="Print Type">
            <ToggleGroup
            options={[
                { label: "Single-sided",           value: "Single-sided"  },
                { label: "Double-sided (+₱50/sq ft)", value: "Double-sided" },
            ]}
            value={printType}
            onChange={setPrintType}
            />
        </Field>

        {printType === "Double-sided" && (
            <div className="flex items-start gap-3 bg-orange-50 border border-orange-100 rounded-xl p-4 text-sm text-orange-700">
            <FiInfo className="shrink-0 mt-0.5" />
            <p>Double-sided prints are ideal for hanging signs, trade show displays, and directional boards viewed from both sides.</p>
            </div>
        )}

        <Field label="Lamination">
            <ToggleGroup
            options={[
                { label: "None",             value: "None"             },
                { label: "Matte (+₱20/sq ft)",  value: "Matte Lamination"  },
                { label: "Glossy (+₱20/sq ft)", value: "Glossy Lamination" },
            ]}
            value={lamination}
            onChange={setLamination}
            />
        </Field>
        </div>
    </SectionCard>

    {/* D. Mounting & Installation */}
    <SectionCard title="Mounting & Installation" icon={<FiTool />}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
            { label: "Stand",             desc: "Portable display stand",         cost: `+₱${standAdd}`, state: withStand,    set: setWithStand    },
            { label: "Wall Mount",        desc: "Hardware for wall installation",   cost: "Included",       state: withMount,    set: setWithMount    },
            { label: "Adhesive Backing",  desc: "Peel-and-stick foam adhesive",     cost: "Included",       state: withAdhesive, set: setWithAdhesive },
        ].map(({ label, desc, cost, state, set }) => (
            <button
            key={label}
            type="button"
            onClick={() => set(!state)}
            className={`flex flex-col items-start gap-1.5 p-4 rounded-xl border-2 text-left transition ${
                state ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:border-red-200"
            }`}
            >
            <div className="flex items-center justify-between w-full">
                <span className={`text-sm font-bold ${state ? "text-red-600" : "text-gray-700"}`}>{label}</span>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
                state ? "bg-red-500 border-red-500" : "border-gray-300"
                }`}>
                {state && <span className="text-white text-xs">✓</span>}
                </div>
            </div>
            <p className="text-xs text-gray-400">{desc}</p>
            <p className={`text-xs font-semibold ${state ? "text-red-500" : "text-gray-400"}`}>{cost}</p>
            </button>
        ))}
        </div>
    </SectionCard>

    {/* E. Design Upload */}
    <SectionCard title="Design & Files" icon={<FiImage />}>
        <div className="flex flex-col gap-5">
        <Field label="Upload Design File" hint="PNG, JPG, PDF, AI accepted — max 50 MB">
            <div
            onClick={() => fileRef.current.click()}
            className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl p-6 cursor-pointer hover:border-red-300 hover:bg-red-50 transition group"
            >
            <span className={`text-3xl transition-transform ${file ? "text-green-500" : "text-gray-400 group-hover:text-red-400 group-hover:scale-110"}`}>
                {file ? <FiCheckCircle /> : <FiUploadCloud />}
            </span>
            {file
                ? <p className="text-xs text-center text-green-700 font-semibold break-all">{file.name}</p>
                : <>
                    <p className="text-sm font-semibold text-gray-600">Click to upload your design</p>
                    <p className="text-xs text-gray-400">PNG, JPG, PDF, AI — max 50MB</p>
                </>
            }
            <input
                ref={fileRef} type="file" accept=".png,.jpg,.jpeg,.pdf,.ai"
                className="hidden"
                onChange={(e) => setFile(e.target.files || null)}
            />
            </div>
        </Field>

        <label className="flex items-start gap-3 cursor-pointer group">
            <input
            type="checkbox" checked={needsDesign}
            onChange={(e) => setNeedsDesign(e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-red-500 cursor-pointer"
            />
            <div>
            <p className="text-sm font-semibold text-gray-700 group-hover:text-red-500 transition">
                I need help with the design
            </p>
            <p className="text-xs text-gray-400 mt-0.5">Our team will contact you to discuss your layout and artwork.</p>
            </div>
        </label>

        {needsDesign && (
            <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-100 rounded-xl p-4 text-sm text-yellow-700">
            <FiInfo className="shrink-0 mt-0.5" />
            <p>Our design team will reach out before production to confirm layout, fonts, and colors.</p>
            </div>
        )}

        <Field label="Special Instructions" hint="Font preferences, color codes, bleed area, safe zones, etc.">
            <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={3}
            placeholder="e.g. Use company colors (Pantone 286 blue), logo on top-left corner, white text..."
            className={inputCls + " resize-none"}
            />
        </Field>
        </div>
    </SectionCard>

    {/* F. Usage Type */}
    <SectionCard title="Usage Type" icon={<FiGrid />}>
        <div className="flex flex-col gap-4">
        <Field label="What is this board for?" hint="Helps us optimize print settings and material recommendations">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {["Business Signage", "Event Display", "Directional Sign", "Others"].map((u) => (
                <button
                key={u}
                type="button"
                onClick={() => setUsage(u)}
                className={`py-3 px-3 rounded-xl text-xs font-semibold border text-center transition leading-tight ${
                    usage === u
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white text-gray-600 border-gray-200 hover:border-red-300"
                }`}
                >
                {u}
                </button>
            ))}
            </div>
        </Field>
        {usage === "Others" && (
            <Field label="Please specify">
            <input
                type="text" value={otherUsage}
                onChange={(e) => setOtherUsage(e.target.value)}
                placeholder="Describe your usage..."
                className={inputCls}
            />
            </Field>
        )}
        </div>
    </SectionCard>

    {/* G. Delivery */}
    <SectionCard title="Delivery Info" icon={<FiTruck />}>
        <DeliverySection
        delivery={delivery} setDelivery={setDelivery}
        address={address}   setAddress={setAddress}
        />
    </SectionCard>
    </div>

    {/* ── Right: Summary ── */}
    <div className="xl:col-span-1">
    <div className="sticky top-36 flex flex-col gap-4">

        {/* Price breakdown card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Price Breakdown</p>
        </div>
        <div className="p-5 flex flex-col gap-2 text-xs text-gray-600">
            <div className="flex justify-between">
            <span>Base rate</span>
            <span className="font-semibold">₱{BASE_RATE}/sq ft</span>
            </div>
            {thicknessAdd > 0 && (
            <div className="flex justify-between">
                <span>Thickness ({thickness})</span>
                <span className="font-semibold">+₱{thicknessAdd}/sq ft</span>
            </div>
            )}
            {printAdd > 0 && (
            <div className="flex justify-between">
                <span>Double-sided</span>
                <span className="font-semibold">+₱{printAdd}/sq ft</span>
            </div>
            )}
            {lamAdd > 0 && (
            <div className="flex justify-between">
                <span>Lamination</span>
                <span className="font-semibold">+₱{lamAdd}/sq ft</span>
            </div>
            )}
            <div className="flex justify-between border-t border-gray-100 pt-2 mt-1">
            <span>Rate / sq ft</span>
            <span className="font-bold text-gray-800">₱{pricePerFt2}</span>
            </div>
            <div className="flex justify-between">
            <span>Area</span>
            <span className="font-semibold">{areaFt2 > 0 ? `${areaFt2.toFixed(2)} sq ft` : "—"}</span>
            </div>
            <div className="flex justify-between">
            <span>Quantity</span>
            <span className="font-semibold">× {safeQty}</span>
            </div>
            <div className="flex justify-between border-t border-gray-100 pt-2 mt-1">
            <span>Print subtotal</span>
            <span className="font-bold text-gray-800">₱{printCost.toLocaleString()}</span>
            </div>
            {withStand && (
            <div className="flex justify-between">
                <span>Stand</span>
                <span className="font-semibold text-red-500">+₱{standAdd}</span>
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