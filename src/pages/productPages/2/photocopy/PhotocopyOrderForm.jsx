import { useState, useRef } from "react"
import { 
  FiFileText, FiLayers, FiMaximize, FiPrinter, FiTruck, 
  FiMapPin, FiPackage, FiUploadCloud, FiCheckCircle, FiMessageCircle, FiPhoneCall, FiInfo,
  FiCopy, FiSettings
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
    <span className="text-xl text-gray-500">{icon}</span>
    <h2 className="text-xs font-black uppercase tracking-widest text-gray-700">{title}</h2>
    </div>
    <div className="px-6 py-5">{children}</div>
</div>
)
}

function Field({ label, hint, children, required }) {
return (
<div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
    {label}
    {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {hint && <p className="text-[11px] text-gray-400 -mt-0.5">{hint}</p>}
    {children}
</div>
)
}

function ToggleBtn({ active, onClick, children }) {
return (
<button
    type="button"
    onClick={onClick}
    className={`flex-1 py-2.5 text-sm font-bold border rounded-xl transition-all flex items-center justify-center gap-2 ${
    active
        ? "bg-red-500 text-white border-red-500 shadow-sm shadow-red-200"
        : "bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:text-red-500"
    }`}
>
    {children}
</button>
)
}

// ── Pricing logic ──────────────────────────────────────────────────────────────
function computePrice({ paperSize, colorMode, qty }) {
let unit = 1.00 // base price for short/long B&W
if (paperSize === "A3") unit = 5.00
if (colorMode === "Full Color") unit += 4.00
if (colorMode === "Highlight Color") unit += 2.00
return { unitPrice: unit, total: unit * qty }
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function PhotocopyOrderForm() {
// A. Document Details
const [paperSize, setPaperSize] = useState("Short (8.5x11)")
const [qty, setQty]             = useState(1)
const [paperType, setPaperType] = useState("Regular 70gsm")

// B. Print Settings
const [colorMode, setColorMode] = useState("Black & White")
const [sides, setSides]         = useState("Single-sided")

// C. File Design
const [file, setFile]           = useState(null)
const [instructions, setInstructions] = useState("")
const fileRef = useRef()

// D. Delivery
const [delivery, setDelivery] = useState("Pickup")
const [address, setAddress]   = useState("")

// Errors
const [errors, setErrors] = useState({})

const { unitPrice, total } = computePrice({ paperSize, colorMode, qty })

const validate = () => {
const e = {}
if (qty < 1) e.qty = "Minimum quantity is 1"
if (delivery === "Delivery" && !address.trim()) e.address = "Please enter a delivery address"
setErrors(e)
return Object.keys(e).length === 0
}

const handleSubmit = () => {
if (!validate()) return
alert(`✅ Order submitted!\n\nPhotocopy ${paperSize}\nQty: ${qty}\nTotal: ₱${total.toLocaleString()}`)
}

const summaryRows = [
{ label: "Paper Size",   value: paperSize },
{ label: "Paper Type",   value: paperType },
{ label: "Quantity",     value: `${qty} sets` },
{ label: "Color Mode",   value: colorMode },
{ label: "Sides",        value: sides },
]

return (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

    {/* ── LEFT COLUMN ─────────────────────────────────────── */}
    <div className="xl:col-span-2 flex flex-col gap-6">

    {/* Document Details */}
    <SectionCard title="Document Details" icon={<FiFileText />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Paper Size">
            <select value={paperSize} onChange={(e) => setPaperSize(e.target.value)} className={selectCls}>
                <option>Short (8.5x11)</option>
                <option>A4</option>
                <option>Long (8.5x13)</option>
                <option>A3</option>
            </select>
        </Field>
        <Field label="Sets / Quantity" required>
            <input
            type="number" min={1} value={qty}
            onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
            className={inputCls + (errors.qty ? " border-red-400 ring-1 ring-red-300" : "")}
            />
            {errors.qty && <p className="text-[11px] text-red-500 mt-0.5">{errors.qty}</p>}
        </Field>
        <Field label="Paper Type">
            <select value={paperType} onChange={(e) => setPaperType(e.target.value)} className={selectCls}>
                <option>Regular 70gsm</option>
                <option>Premium 80gsm</option>
                <option>Cardstock (White)</option>
            </select>
        </Field>
        </div>
    </SectionCard>

    {/* Print Settings */}
    <SectionCard title="Print Settings" icon={<FiSettings />}>
        <div className="flex flex-col gap-5">
        <Field label="Color Mode">
            <div className="flex gap-3">
            {["Black & White", "Full Color"].map((mode) => (
                <ToggleBtn key={mode} active={colorMode === mode} onClick={() => setColorMode(mode)}>
                    {mode}
                </ToggleBtn>
            ))}
            </div>
        </Field>
        <Field label="Sides">
            <div className="flex gap-3">
            {["Single-sided", "Back-to-Back"].map((opt) => (
                <ToggleBtn key={opt} active={sides === opt} onClick={() => setSides(opt)}>
                    {opt}
                </ToggleBtn>
            ))}
            </div>
        </Field>
        </div>
    </SectionCard>

    {/* File Upload */}
    <SectionCard title="File Upload" icon={<FiUploadCloud />}>
        <div className="flex flex-col gap-5">
        <Field label="Upload Documents" hint="PDF preferred for best formatting. Max 100MB">
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
                Click to browse or drag & drop your documents
                </p>
            )}
            <input
                ref={fileRef} type="file"
                accept=".pdf,.doc,.docx,.jpg,.png"
                className="hidden"
                onChange={(e) => setFile(e.target.files || null)}
            />
            </div>
        </Field>

        <Field label="Special Instructions" hint="Specify page ranges, stapling, or binding needs">
            <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={3}
            placeholder="e.g. Staple per set, only copy pages 1-10..."
            className={inputCls + " resize-none"}
            />
        </Field>
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

        {delivery === "Pickup" && (
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
                <FiInfo className="mt-0.5 shrink-0" />
                <p>Ready for pickup at our store. We'll notify you via SMS when it's done.</p>
            </div>
        )}

        {delivery === "Delivery" && (
            <Field label="Delivery Address" hint="Full address for courier delivery" required>
            <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={2}
                placeholder="e.g. 123 Main St., Brgy. Santo Niño, Quezon City"
                className={inputCls + " resize-none" + (errors.address ? " border-red-400 ring-1 ring-red-300" : "")}
            />
            {errors.address && <p className="text-[11px] text-red-500 mt-0.5">{errors.address}</p>}
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
            {summaryRows.map(({ label, value }) => (
            <div key={label} className="flex items-start justify-between gap-2 text-sm">
                <span className="text-gray-500 shrink-0">{label}</span>
                <span className="text-right font-semibold text-gray-700">{value}</span>
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
            <span className="text-xs text-gray-500">× {qty} sets</span>
            </div>
            <div className="flex items-center justify-between py-3 px-4 bg-red-50 rounded-xl border border-red-100">
            <span className="text-sm font-black text-gray-700 uppercase tracking-wide">Total</span>
            <span className="text-2xl font-black text-red-500">₱{total.toLocaleString()}</span>
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
            Bulk photocopying or rush orders? Reach out to our store team.
        </p>
        <div className="flex flex-col gap-2">
            <a href="tel:+639XXXXXXXXX" className="flex items-center gap-2 text-xs font-semibold text-red-500 hover:text-red-600 transition">
            <FiPhoneCall /> Call Us
            </a>
            <a href="https://m.me/" className="flex items-center gap-2 text-xs font-semibold text-red-500 hover:text-red-600 transition">
            <FiMessageCircle /> Chat on Messenger
            </a>
        </div>
        </div>

    </div>
    </div>

</div>
)
}