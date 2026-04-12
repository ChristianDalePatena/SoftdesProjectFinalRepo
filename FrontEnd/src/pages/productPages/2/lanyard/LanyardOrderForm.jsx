import { useState, useRef } from "react"
import { 
  FiFileText, FiTruck, FiMapPin, FiPackage, FiUploadCloud, FiCheckCircle
} from "react-icons/fi";

// ── Shared primitives ──────────────────────────────────────────────────────────
const inputCls =
"w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 " +
"focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition placeholder:text-gray-400"

const selectCls = inputCls + " cursor-pointer"

// ── LANYARD PRICING MAP ───────────────────────────────────────────────────────
const LANYARD_PRICING = {
"1 inch Polyester": 65,
"3/4 inch Polyester": 45,
"1/2 inch Polyester": 35,
"1 inch Cotton": 80,
"3/4 inch Cotton": 60,
"1 inch Satin": 85,
"3/4 inch Satin": 65
}

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
function computePrice({ lanyardType, qty }) {
let unit = LANYARD_PRICING[lanyardType] || 0
return { unitPrice: unit, total: unit * qty }
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function PhotocopyOrderForm() {
const [lanyardType, setLanyardType] = useState("1 inch Polyester")
const [qty, setQty]             = useState(30)
const [file, setFile]           = useState(null)
const [instructions, setInstructions] = useState("")
const fileRef = useRef()

const [delivery, setDelivery] = useState("Pickup")
const [address, setAddress]   = useState("")
const [errors, setErrors] = useState({})

const { unitPrice, total } = computePrice({ lanyardType, qty })

const quickQty = [30, 50, 100, 200, 500]

// ── Validation ─────────────────────────────────────────
const validate = () => {
    const e = {}
    if (qty < 30) e.qty = "Minimum quantity is 30 pcs"
    if (delivery === "Delivery" && !address.trim()) e.address = "Please enter a delivery address"
    setErrors(e)
    return Object.keys(e).length === 0
}

const handleSubmit = () => {
    if (!validate()) return
    alert(`✅ Order submitted!\n\nLanyard: ${lanyardType}\nQty: ${qty}\nTotal: ₱${total.toLocaleString()}`)
}

// Removed Unit Price from here since it's now in the breakdown section
const summaryRows = [
    { label: "Lanyard Type", value: lanyardType },
    { label: "Quantity", value: `${qty} pc${qty > 1 ? "s" : ""}` },
    { label: "Color Mode", value: "Standard Print" },
    { label: "Sides", value: "Single-sided" },
]

// ── UI ─────────────────────────────────────────
return (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

    {/* LEFT */}
    <div className="xl:col-span-2 flex flex-col gap-6">

    <SectionCard title="Lanyard Details" icon={<FiFileText />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <Field label="Lanyard Type">
                <select value={lanyardType} onChange={(e) => setLanyardType(e.target.value)} className={selectCls}>
                    <option>1 inch Polyester</option>
                    <option>3/4 inch Polyester</option>
                    <option>1/2 inch Polyester</option>
                    <option>1 inch Cotton</option>
                    <option>3/4 inch Cotton</option>
                    <option>1 inch Satin</option>
                    <option>3/4 inch Satin</option>
                </select>
            </Field>

            <Field label="Quantity (min 30 pcs)" required>
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
                    min={30}
                    value={qty}
                    onChange={(e) => setQty(Math.max(30, parseInt(e.target.value) || 30))}
                    className={inputCls + (errors.qty ? " border-red-400 ring-1 ring-red-300" : "")}
                />
                {errors.qty && <p className="text-[11px] text-red-500 mt-0.5">{errors.qty}</p>}
            </Field>

        </div>
    </SectionCard>

    <SectionCard title="File Upload" icon={<FiUploadCloud />}>
        <div className="flex flex-col gap-5">

            <Field label="Upload Design" hint="PNG / JPG preferred">
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

    {/* ── RIGHT: Summary ───────────────────────────────── */}
    <div className="xl:col-span-1">
    <div className="sticky top-35 flex flex-col gap-4">

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-linear-to-r from-red-500 to-red-600">
            <h2 className="text-xs font-black uppercase tracking-widest text-white/90">Order Summary</h2>
        </div>

        <div className="px-6 py-4 flex flex-col gap-2">
            {summaryRows.map(({ label, value }) => (
            <div key={label} className="flex items-start justify-between gap-2 text-sm">
                <span className="text-gray-400 shrink-0">{label}</span>
                <span className="text-right text-gray-700 font-semibold">{value}</span>
            </div>
            ))}
        </div>

        <div className="mx-6 border-t border-gray-100" />

        {/* Pricing breakdown */}
        <div className="px-6 py-4 flex flex-col gap-1.5">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Pricing Breakdown</p>
            <div className="flex justify-between text-xs text-gray-500">
                <span>{lanyardType}</span>
                <span>₱{unitPrice.toLocaleString()}/pc</span>
            </div>
            
            <div className="flex justify-between text-sm font-bold text-gray-700 border-t border-gray-100 pt-2 mt-1">
                <span>Price per piece</span>
                <span>₱{unitPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
                <span>× {qty} pc{qty > 1 ? "s" : ""}</span>
            </div>
        </div>

        <div className="mx-6 mb-4 flex items-center justify-between py-3 px-4 bg-red-50 rounded-xl border border-red-100">
            <span className="text-sm font-black text-gray-700 uppercase tracking-wide">Total</span>
            <span className="text-2xl font-black text-red-500">₱{total.toLocaleString()}</span>
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
            Not sure about lanyard material or artwork setup? We're happy to help you spec the perfect ID lace.
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