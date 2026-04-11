import { useState, useRef } from "react"
import { 
  FiFileText, FiPrinter, FiTruck, 
  FiMapPin, FiPackage, FiUploadCloud, FiCheckCircle, FiMessageCircle, FiPhoneCall,
  FiCopy, FiSettings, FiImage
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
let unit = 1.00 
if (paperSize === "A3") unit = 5.00
if (colorMode === "Full Color") unit += 4.00
return { unitPrice: unit, total: unit * qty }
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function PhotocopyOrderForm() {
const [paperSize, setPaperSize] = useState("Short (8.5x11)")
const [qty, setQty]             = useState(1)
const [paperType, setPaperType] = useState("Regular 70gsm")
const [colorMode, setColorMode] = useState("Black & White")
const [sides, setSides]         = useState("Single-sided")
const [file, setFile]           = useState(null)
const [instructions, setInstructions] = useState("")
const fileRef = useRef()

const [delivery, setDelivery] = useState("Pickup")
const [address, setAddress]   = useState("")
const [errors, setErrors] = useState({})

const { unitPrice, total } = computePrice({ paperSize, colorMode, qty })

const quickQty = [1, 5, 10, 20, 50]

// ── Validation ─────────────────────────────────────────
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
    { label: "Paper Size", value: paperSize },
    { label: "Paper Type", value: paperType },
    { label: "Quantity", value: `${qty} sets` },
    { label: "Color Mode", value: colorMode },
    { label: "Sides", value: sides },
]

// ── UI ─────────────────────────────────────────
return (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

{/* LEFT */}
<div className="xl:col-span-2 flex flex-col gap-6">

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
            <div className="flex gap-2 mb-2">
                {quickQty.map((n) => (
                    <button
                        key={n}
                        type="button"
                        onClick={() => setQty(n)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                            qty === n
                                ? "bg-red-500 text-white border-red-500"
                                : "bg-gray-50 text-gray-600 border-gray-200"
                        }`}
                    >
                        {n}
                    </button>
                ))}
            </div>

            <input
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                className={inputCls + (errors.qty ? " border-red-400 ring-1 ring-red-300" : "")}
            />
            {errors.qty && <p className="text-[11px] text-red-500 mt-0.5">{errors.qty}</p>}
        </Field>

    </div>
</SectionCard>

<SectionCard title="Print Settings" icon={<FiSettings />}>
    <div className="flex flex-col gap-5">

        <Field label="Color Mode">
            <div className="flex gap-3">
                {["Black & White", "Full Color"].map((mode) => (
                    <ToggleBtn key={mode} active={colorMode === mode} onClick={() => setColorMode(mode)}>
                        {mode === "Full Color" ? <FiImage /> : <FiCopy />} {mode}
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

<SectionCard title="File Upload" icon={<FiUploadCloud />}>
    <div className="flex flex-col gap-5">

        <Field label="Upload Documents" hint="PDF preferred. Max 100MB">
            <div
                onClick={() => fileRef.current.click()}
                className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-200 rounded-xl p-8 cursor-pointer hover:border-red-300 hover:bg-red-50 transition group"
            >
                <span className={`text-3xl ${file ? "text-green-500" : "text-gray-400"}`}>
                    {file ? <FiCheckCircle /> : <FiUploadCloud />}
                </span>

                {file ? (
                    <p className="text-xs text-green-700 font-semibold">{file.name}</p>
                ) : (
                    <p className="text-xs text-gray-500">Click to upload</p>
                )}

                <input
                    ref={fileRef}
                    type="file"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
            </div>
        </Field>

        <Field label="Instructions">
            <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows={3}
                className={inputCls + " resize-none"}
            />
        </Field>

    </div>
</SectionCard>

<SectionCard title="Delivery Info" icon={<FiTruck />}>
    <div className="flex flex-col gap-5">

        <Field label="Method">
            <div className="flex gap-3">
                <ToggleBtn active={delivery === "Pickup"} onClick={() => setDelivery("Pickup")}>
                    <FiMapPin /> Pickup
                </ToggleBtn>
                <ToggleBtn active={delivery === "Delivery"} onClick={() => setDelivery("Delivery")}>
                    <FiPackage /> Delivery
                </ToggleBtn>
            </div>
        </Field>

        {delivery === "Delivery" && (
            <Field label="Address" required>
                <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={inputCls}
                />
            </Field>
        )}

    </div>
</SectionCard>

</div>

{/* RIGHT */}
<div>
    <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="font-bold mb-3">Summary</h2>

        {summaryRows.map(({ label, value }) => (
            <div key={label} className="flex justify-between text-sm mb-1">
                <span>{label}</span>
                <span>{value}</span>
            </div>
        ))}

        <div className="mt-4 font-bold text-red-500">
            Total: ₱{total.toLocaleString()}
        </div>

        <button
            onClick={handleSubmit}
            className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg"
        >
            Place Order
        </button>
    </div>
</div>

</div>
)
}