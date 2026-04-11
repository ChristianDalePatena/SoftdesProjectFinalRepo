import { useState, useRef } from "react"
// IMPORT ALL OUR BEAUTIFUL ICONS HERE
import { 
  FiLayout, FiStar, FiSidebar, FiImage, FiPlusCircle, FiTruck, 
  FiMapPin, FiPackage, FiUploadCloud, FiCheckCircle, FiMessageCircle, FiPhoneCall
} from "react-icons/fi";

// ── Shared primitives ──────────────────────────────────────────────────────────
const inputCls =
"w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 " +
"focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition placeholder:text-gray-400"

const selectCls = inputCls + " cursor-pointer"

function SectionCard({ title, icon, children }) {
return (
<div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-linear-to-r from-gray-50 to-white">
    <span className="text-xl text-gray-500">{icon}</span> {/* Icons inherit this color */}
    <h2 className="text-sm font-black uppercase tracking-widest text-gray-700">{title}</h2>
    </div>
    <div className="px-6 py-5">{children}</div>
</div>
)
}

function Field({ label, hint, children }) {
return (
<div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">{label}</label>
    {hint && <p className="text-xs text-gray-400 -mt-1">{hint}</p>}
    {children}
</div>
)
}

function ToggleBtn({ active, onClick, children }) {
return (
<button
    type="button"
    onClick={onClick}
    className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all flex items-center justify-center gap-2 ${
    active
        ? "bg-red-500 text-white border-red-500 shadow-sm shadow-red-200"
        : "bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:text-red-500"
    }`}
>
    {children}
</button>
)
}

function PillGroup({ options, value, onChange }) {
return (
<div className="flex flex-wrap gap-2">
    {options.map((opt) => (
    <button
        key={opt}
        type="button"
        onClick={() => onChange(opt)}
        className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
        value === opt
            ? "bg-red-500 text-white border-red-500 shadow-sm shadow-red-200"
            : "bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:text-red-500"
        }`}
    >
        {opt}
    </button>
    ))}
</div>
)
}

// ── Pricing logic ──────────────────────────────────────────────────────────────
const BASE_PRICES = {
"Standard (2ft × 5ft)": 1200,
"Premium (2.5ft × 6ft)": 1800,
"Deluxe (3ft × 6.5ft)": 2500,
}

function computePrice({ size, standType, withCase, extraStand, replaceOnly }) {
let base = BASE_PRICES[size] ?? 1200
if (replaceOnly) base = Math.round(base * 0.7)
if (standType === "Heavy Duty Stand") base += 500
if (withCase) base += 200
if (extraStand) base += 800
return base
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function PullUpBannerOrderForm() {
// A. Banner Details
const [size, setSize]   = useState("Standard (2ft × 5ft)")
const [qty, setQty]     = useState(1)

// B. Material & Quality
const [material, setMaterial]   = useState("Matte Tarpaulin")
const [quality, setQuality]     = useState("High Resolution")

// C. Stand
const [standType, setStandType]     = useState("Standard Roll-up Stand")
const [replaceOnly, setReplaceOnly] = useState(false)

// D. Design
const [file, setFile]               = useState(null)
const [needsDesign, setNeedsDesign] = useState(false)
const [instructions, setInstructions] = useState("")
const fileRef = useRef()

// E. Add-ons
const [withCase, setWithCase]     = useState(false)
const [extraStand, setExtraStand] = useState(false)

// F. Delivery
const [delivery, setDelivery] = useState("Pickup")
const [address, setAddress]   = useState("")

// Pricing
const unitPrice  = computePrice({ size, standType, withCase, extraStand, replaceOnly })
const totalPrice = qty * unitPrice

const handleSubmit = () =>
alert(`✅ Order submitted!\n\n${size}\nQty: ${qty}\nTotal: ₱${totalPrice.toLocaleString()}`)

// Summary rows
const summaryRows = [
{ label: "Size",           value: size },
{ label: "Quantity",       value: `${qty} pc${qty > 1 ? "s" : ""}` },
{ label: "Material",       value: material },
{ label: "Print Quality",  value: quality },
{ label: "Stand Type",     value: standType },
...(replaceOnly ? [{ label: "Print Only",    value: "−30% base price", highlight: true }] : []),
...(standType === "Heavy Duty Stand" ? [{ label: "Heavy Duty",   value: "+₱500/pc" }] : []),
...(withCase    ? [{ label: "Carrying Case", value: "+₱200/pc"  }] : []),
...(extraStand  ? [{ label: "Extra Stand",   value: "+₱800/pc"  }] : []),
...(needsDesign ? [{ label: "Design Assist", value: "Requested ✓" }] : []),
...(delivery === "Delivery" ? [{ label: "Delivery",    value: address || "(address TBD)" }] : [{ label: "Pickup", value: "In-store" }]),
]

return (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

    {/* ── LEFT COLUMN ─────────────────────────────────────── */}
    <div className="xl:col-span-2 flex flex-col gap-6">

    {/* Banner Details */}
    <SectionCard title="Banner Details" icon={<FiLayout />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Banner Size">
            <select value={size} onChange={(e) => setSize(e.target.value)} className={selectCls}>
            {Object.keys(BASE_PRICES).map((s) => (
                <option key={s}>{s}</option>
            ))}
            </select>
        </Field>
        <Field label="Quantity">
            <input
            type="number" min={1} value={qty}
            onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
            className={inputCls}
            />
        </Field>
        </div>
    </SectionCard>

    {/* Material & Quality */}
    <SectionCard title="Material & Quality" icon={<FiStar />}>
        <div className="flex flex-col gap-5">
        <Field label="Material Type">
            <PillGroup
            options={["Matte Tarpaulin", "Glossy Tarpaulin", "Premium Film"]}
            value={material}
            onChange={setMaterial}
            />
        </Field>
        <Field label="Print Quality">
            <div className="flex gap-3">
            <ToggleBtn active={quality === "Standard"} onClick={() => setQuality("Standard")}>
                Standard
            </ToggleBtn>
            <ToggleBtn active={quality === "High Resolution"} onClick={() => setQuality("High Resolution")}>
                High Resolution
            </ToggleBtn>
            </div>
        </Field>
        </div>
    </SectionCard>

    {/* Stand Type */}
    <SectionCard title="Stand Type" icon={<FiSidebar />}>
        <div className="flex flex-col gap-5">
        <Field label="Included Stand">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
                { val: "Standard Roll-up Stand", desc: "Lightweight, portable aluminum stand" },
                { val: "Heavy Duty Stand", desc: "Sturdy steel base for outdoor & events (+₱500)" },
            ].map(({ val, desc }) => (
                <button
                key={val} type="button" onClick={() => setStandType(val)}
                className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                    standType === val
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 bg-white hover:border-red-300"
                }`}
                >
                <div className={`mt-1 w-4 h-4 rounded-full border-2 shrink-0 transition-all ${standType === val ? "border-red-500 bg-red-500" : "border-gray-300"}`} />
                <div>
                    <p className={`text-sm font-bold ${standType === val ? "text-red-600" : "text-gray-700"}`}>{val}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                </div>
                </button>
            ))}
            </div>
        </Field>

        <Field label="Replaceable Print Only?" hint="Order just the print graphic without the stand (−30% from base price)">
            <div className="flex gap-3">
            <ToggleBtn active={!replaceOnly} onClick={() => setReplaceOnly(false)}>
                Full Set
            </ToggleBtn>
            <ToggleBtn active={replaceOnly} onClick={() => setReplaceOnly(true)}>
                Print Only (−30%)
            </ToggleBtn>
            </div>
        </Field>
        </div>
    </SectionCard>

    {/* Design */}
    <SectionCard title="Design" icon={<FiImage />}>
        <div className="flex flex-col gap-5">
        <Field label="Upload Design File" hint="PNG, JPG, PDF, AI accepted (max 50MB)">
            <div
            onClick={() => fileRef.current.click()}
            className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-200 rounded-xl p-8 cursor-pointer hover:border-red-300 hover:bg-red-50 transition group"
            >
            <span className={`text-3xl transition-transform ${file ? "text-green-500" : "text-gray-400 group-hover:text-red-400 group-hover:scale-110"}`}>
                {file ? <FiCheckCircle /> : <FiUploadCloud />}
            </span>
            {file ? (
                <p className="text-xs text-center text-green-700 font-semibold break-all">{file.name}</p>
            ) : (
                <p className="text-xs text-gray-500 text-center font-semibold">
                Click to browse or drag & drop your design file
                </p>
            )}
            <input
                ref={fileRef} type="file"
                accept="image/*,.pdf,.ai,.eps"
                className="hidden"
                onChange={(e) => setFile(e.target.files || null)}
            />
            </div>
        </Field>

        <label className="flex items-center gap-3 cursor-pointer select-none group">
            <div
            onClick={() => setNeedsDesign(!needsDesign)}
            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                needsDesign ? "bg-red-500 border-red-500" : "bg-white border-gray-300 group-hover:border-red-400"
            }`}
            >
            {needsDesign && <span className="text-white text-xs font-black">✓</span>}
            </div>
            <span className="text-sm text-gray-700">
            I need <strong>design assistance</strong> — please help me create or refine my artwork.
            </span>
        </label>

        <Field label="Special Instructions" hint="Fonts, colors, layout notes, references, etc.">
            <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={3}
            placeholder="e.g. Use our brand colors (#E63946), keep logo on top-right..."
            className={inputCls + " resize-none"}
            />
        </Field>
        </div>
    </SectionCard>

    {/* Add-ons */}
    <SectionCard title="Add-ons" icon={<FiPlusCircle />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
            { label: "Carrying Case", sublabel: "+₱200", val: withCase, set: setWithCase },
            { label: "Extra Stand",   sublabel: "+₱800", val: extraStand, set: setExtraStand },
        ].map(({ label, sublabel, val, set }) => (
            <button
            key={label} type="button" onClick={() => set(!val)}
            className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                val ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:border-red-300"
            }`}
            >
            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                val ? "bg-red-500 border-red-500" : "border-gray-300"
            }`}>
                {val && <span className="text-white text-xs font-black">✓</span>}
            </div>
            <div className="flex-1">
                <p className={`text-sm font-bold ${val ? "text-red-600" : "text-gray-700"}`}>{label}</p>
                <p className="text-xs text-gray-400">{sublabel} per order</p>
            </div>
            </button>
        ))}
        </div>
    </SectionCard>

    {/* Delivery */}
    <SectionCard title="Delivery Info" icon={<FiTruck />}>
        <div className="flex flex-col gap-5">
        <Field label="Fulfillment Method">
            <div className="flex gap-3">
            <ToggleBtn active={delivery === "Pickup"} onClick={() => setDelivery("Pickup")}>
                <FiMapPin className="text-lg" /> Pickup
            </ToggleBtn>
            <ToggleBtn active={delivery === "Delivery"} onClick={() => setDelivery("Delivery")}>
                <FiPackage className="text-lg" /> Delivery
            </ToggleBtn>
            </div>
        </Field>

        {delivery === "Delivery" && (
            <Field label="Delivery Address" hint="Full address including barangay, city, and province">
            <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={2}
                placeholder="e.g. 123 Main St., Brgy. Santo Niño, Quezon City, Metro Manila"
                className={inputCls + " resize-none"}
            />
            </Field>
        )}
        </div>
    </SectionCard>
    </div>

    {/* ── RIGHT COLUMN: Summary ─────────────────────────────── */}
    <div className="xl:col-span-1">
    <div className="sticky top-35 flex flex-col gap-4">

        {/* Order Summary Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-linear-to-r from-red-500 to-red-600">
            <h2 className="text-sm font-black uppercase tracking-widest text-white/90">Order Summary</h2>
        </div>
        <div className="px-6 py-4 flex flex-col gap-2">
            {summaryRows.map(({ label, value, highlight, bold }) => (
            <div key={label} className="flex items-start justify-between gap-2 text-sm">
                <span className="text-gray-500 shrink-0">{label}</span>
                <span className={`text-right font-semibold ${
                highlight ? "text-red-500" : bold ? "text-gray-900" : "text-gray-700"
                }`}>{value}</span>
            </div>
            ))}
        </div>

        <div className="mx-6 border-t border-gray-100" />

        <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Price per unit</span>
            <span className="text-sm font-bold text-gray-700">₱{unitPrice.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-500">× {qty} {qty === 1 ? "piece" : "pieces"}</span>
            </div>
            <div className="flex items-center justify-between py-3 px-4 bg-red-50 rounded-xl border border-red-100">
            <span className="text-sm font-black text-gray-700 uppercase tracking-wide">Total</span>
            <span className="text-2xl font-black text-red-500">₱{totalPrice.toLocaleString()}</span>
            </div>
        </div>

        <div className="px-6 pb-6">
            <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-4 bg-red-500 hover:bg-red-600 active:scale-[.98] text-white text-sm font-black uppercase tracking-widest rounded-xl shadow-lg shadow-red-200 transition-all"
            >
            Place Order
            </button>
        </div>
        </div>

        {/* Help Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-3">
            <FiMessageCircle className="text-lg text-gray-400" />
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-600">Need Help?</h3>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed mb-3">
            Have questions about sizes, finishes, or custom options? Reach out to our team.
        </p>
        <div className="flex flex-col gap-2">
            <a
            href="tel:+639XXXXXXXXX"
            className="flex items-center gap-2 text-xs font-semibold text-red-500 hover:text-red-600 transition"
            >
            <FiPhoneCall /> Call Us
            </a>
            <a
            href="https://m.me/"
            className="flex items-center gap-2 text-xs font-semibold text-red-500 hover:text-red-600 transition"
            >
            <FiMessageCircle /> Chat on Messenger
            </a>
        </div>
        </div>

    </div>
    </div>

</div>
)
}