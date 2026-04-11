import { useState, useRef } from "react"
import { 
  FiMapPin, FiMaximize, FiLayers, FiImage, FiUploadCloud, FiCheckCircle, 
  FiPackage, FiTruck, FiInfo, FiEdit3, FiFileText, FiLink, FiCreditCard, FiGrid,
  FiMessageCircle // <-- The missing icon is now safely imported!
} from "react-icons/fi";

// ── Primitives ─────────────────────────────────────────────────────────────────
const inputCls =
"w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 " +
"focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition placeholder:text-gray-400"

const selectCls = inputCls + " cursor-pointer"

function SectionCard({ title, icon, children }) {
return (
<div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-linear-to-r from-gray-50 to-white">
    <span className="text-xl text-gray-500">{icon}</span>
    <h2 className="text-xs font-black uppercase tracking-widest text-gray-600">{title}</h2>
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
    className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-bold border transition-all flex items-center justify-center gap-2 ${
    active
        ? "bg-red-500 text-white border-red-500 shadow-sm shadow-red-200"
        : "bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:text-red-500"
    }`}
>
    {children}
</button>
)
}

function OptionCard({ active, onClick, icon, label, sublabel }) {
return (
<button
    type="button"
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left w-full transition-all ${
    active
        ? "border-red-500 bg-red-50 text-red-700"
        : "border-gray-200 bg-white text-gray-600 hover:border-red-300"
    }`}
>
    {icon && <span className="text-lg shrink-0 text-gray-500">{icon}</span>}
    <div className="flex-1">
    <p className={`text-sm font-bold ${active ? "text-red-700" : "text-gray-700"}`}>{label}</p>
    {sublabel && <p className="text-[11px] text-gray-400 mt-0.5">{sublabel}</p>}
    </div>
    {active && (
    <span className="ml-auto text-red-500">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="7.5" stroke="currentColor" />
        <circle cx="8" cy="8" r="4" fill="currentColor" />
        </svg>
    </span>
    )}
</button>
)
}

function AddOnToggle({ label, sublabel, icon, price, checked, onChange }) {
return (
<button
    type="button"
    onClick={onChange}
    className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left w-full transition-all ${
    checked ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:border-red-300"
    }`}
>
    <span className="text-2xl text-gray-500">{icon}</span>
    <div className="flex-1 min-w-0">
    <p className={`text-sm font-bold ${checked ? "text-red-700" : "text-gray-700"}`}>{label}</p>
    <p className="text-[11px] text-gray-400 truncate">{sublabel}</p>
    </div>
    <span className={`text-xs font-black px-2 py-1 rounded-lg ${checked ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"}`}>
    +₱{price}
    </span>
    <div
    className={`w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center transition-all ${
        checked ? "bg-red-500 border-red-500" : "border-gray-300"
    }`}
    >
    {checked && <span className="text-white text-[10px] font-black">✓</span>}
    </div>
</button>
)
}

function SummaryRow({ label, value, bold }) {
return (
<div className="flex items-start justify-between gap-2 text-sm">
    <span className="text-gray-400 shrink-0">{label}</span>
    <span className={`text-right font-semibold ${bold ? "text-gray-900" : "text-gray-700"}`}>{value}</span>
</div>
)
}

// ── Button Pin Preview ─────────────────────────────────────────────────────────
function ButtonPreview({ shape, size, finish, bgColor, titleText, subtitleText, designMode }) {
const sizeMap = { "25mm": 72, "32mm": 88, "44mm": 110, "58mm": 130 }
const px = sizeMap[size] || 96
const isCircle = shape === "Circle"
const isSquare = shape === "Square"
const borderR = isCircle ? "50%" : isSquare ? "12px" : "8px"
const aspectStyle = shape === "Rectangle" ? { width: px * 1.6, height: px } : { width: px, height: px }

const shimmer =
finish === "Glossy"
    ? "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, transparent 60%)"
    : "none"

return (
<div className="flex flex-col items-center gap-2">
    <div
    className="relative flex flex-col items-center justify-center border-4 border-white shadow-xl overflow-hidden select-none"
    style={{
        ...aspectStyle,
        borderRadius: borderR,
        background: designMode === "text" ? bgColor : "#e2e8f0",
        outline: "2px solid rgba(0,0,0,0.08)",
    }}
    >
    {finish === "Glossy" && (
        <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{ background: shimmer, borderRadius: "inherit" }}
        />
    )}
    {designMode === "text" ? (
        <div className="relative z-20 flex flex-col items-center justify-center gap-0.5 px-2 text-center">
        {titleText ? (
            <p
            className="font-black leading-tight"
            style={{
                fontSize: Math.max(10, Math.round(px * 0.18)) + "px",
                color: "#fff",
                textShadow: "0 1px 3px rgba(0,0,0,0.4)",
                wordBreak: "break-word",
            }}
            >
            {titleText}
            </p>
        ) : (
            <p className="text-white/50 text-[10px]">Title</p>
        )}
        {subtitleText && (
            <p
            className="font-semibold leading-tight"
            style={{
                fontSize: Math.max(8, Math.round(px * 0.12)) + "px",
                color: "rgba(255,255,255,0.85)",
                wordBreak: "break-word",
            }}
            >
            {subtitleText}
            </p>
        )}
        </div>
    ) : (
        <div className="relative z-20 flex flex-col items-center gap-1 text-gray-400">
        <FiImage className="text-2xl" />
        <span className="text-[10px]">Your design</span>
        </div>
    )}
    </div>
    <p className="text-[10px] text-gray-400 italic">Preview ({size})</p>
</div>
)
}

// ── Pricing Logic ──────────────────────────────────────────────────────────────
function computePrice({ qty, size, finish, backing, plasticPkg, backCard, waterproof, glitter }) {
let base = 10
if (finish === "Matte") base += 2
if (size === "44mm" || size === "58mm" || size === "Custom") base += 3
if (backing === "Magnet") base += 5
if (plasticPkg) base += 2
if (backCard) base += 3
if (waterproof) base += 2
if (glitter) base += 4
return { unitPrice: base, total: base * Math.max(1, qty) }
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function ButtonOrderForm() {
// A. Button Details
const [buttonType, setButtonType] = useState("Pin Button")
const [shape, setShape] = useState("Circle")
const [size, setSize] = useState("44mm")
const [customSize, setCustomSize] = useState("")
const [qty, setQty] = useState(10)

// B. Material & Finish
const [finish, setFinish] = useState("Glossy")
const [backing, setBacking] = useState("Safety Pin")

// C. Design
const [designMode, setDesignMode] = useState("upload") // "upload" | "text"
const [designFile, setDesignFile] = useState(null)
const [titleText, setTitleText] = useState("")
const [subtitleText, setSubtitleText] = useState("")
const [bgColor, setBgColor] = useState("#e53e3e")
const [fontStyle, setFontStyle] = useState("Sans-Serif Bold")
const designRef = useRef()

// D. Bulk Order
const [isBulk, setIsBulk] = useState(false)
const [csvFile, setCsvFile] = useState(null)
const csvRef = useRef()

// E. Add-ons
const [plasticPkg, setPlasticPkg]   = useState(false)
const [backCard, setBackCard]       = useState(false)
const [waterproof, setWaterproof]   = useState(false)
const [glitter, setGlitter]         = useState(false)

// F. Delivery
const [delivery, setDelivery] = useState("Pickup")
const [address, setAddress] = useState("")

// Errors
const [errors, setErrors] = useState({})

const effectiveSize = size === "Custom" ? (customSize ? customSize + " (Custom)" : "Custom") : size

const pricing = computePrice({ qty, size, finish, backing, plasticPkg, backCard, waterproof, glitter })

const validate = () => {
const e = {}
if (!qty || qty < 1) e.qty = "Quantity must be at least 1"
if (size === "Custom" && !customSize.trim()) e.customSize = "Please enter a custom size"
if (designMode === "upload" && !designFile) e.design = "Please upload a design file"
if (designMode === "text" && !titleText.trim()) e.titleText = "Please enter a title"
if (isBulk && !csvFile) e.csv = "Please upload a CSV/Excel file for bulk orders"
if (delivery === "Delivery" && !address.trim()) e.address = "Please enter a delivery address"
setErrors(e)
return Object.keys(e).length === 0
}

const handleSubmit = () => {
if (!validate()) return
alert(
    `Order submitted!\n\nButton Pin – ${buttonType}\nShape: ${shape} | Size: ${effectiveSize}\nQty: ${qty} pcs\nTotal: ₱${pricing.total.toLocaleString()}\n\nWe'll confirm and send a payment link within 24 hours.`
)
}

const addOns = [
{ key: "plasticPkg",  label: "Plastic Packaging",  sublabel: "Individual OPP bag per button",  icon: <FiPackage />, price: 2,  val: plasticPkg,  set: setPlasticPkg },
{ key: "backCard",    label: "Back Card Printing",  sublabel: "Custom card insert for branding", icon: <FiCreditCard />, price: 3,  val: backCard,    set: setBackCard },
{ key: "waterproof",  label: "Waterproof Coating",  sublabel: "UV laminate for outdoor use",    icon: <FiUploadCloud />, price: 2,  val: waterproof,  set: setWaterproof },
{ key: "glitter",     label: "Glitter Finish",      sublabel: "Sparkle effect on surface",      icon: <FiMaximize />, price: 4,  val: glitter,     set: setGlitter },
]

const summaryRows = [
{ label: "Button Type",  value: buttonType },
{ label: "Shape",        value: shape },
{ label: "Size",         value: effectiveSize },
{ label: "Finish",       value: finish + (finish === "Matte" ? " (+₱2)" : "") },
{ label: "Backing",      value: backing + (backing === "Magnet" ? " (+₱5)" : "") },
{ label: "Quantity",     value: `${qty} pc${qty !== 1 ? "s" : ""}` },
{ label: "Design",       value: isBulk ? "Bulk (CSV)" : designMode === "upload" ? (designFile?.name || "—") : `"${titleText || "—"}"` },
...(plasticPkg  ? [{ label: "Plastic Packaging",  value: "+₱2/pc" }] : []),
...(backCard    ? [{ label: "Back Card",          value: "+₱3/pc" }] : []),
...(waterproof  ? [{ label: "Waterproof Coating", value: "+₱2/pc" }] : []),
...(glitter     ? [{ label: "Glitter Finish",     value: "+₱4/pc" }] : []),
{ label: "Delivery", value: delivery },
]

return (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

    {/* ── LEFT ─────────────────────────────────────── */}
    <div className="xl:col-span-2 flex flex-col gap-6">

    {/* Button Details */}
    <SectionCard title="Button Details" icon={<FiMapPin />}>
        <div className="flex flex-col gap-5">

        <Field label="Button Type" required>
            <select value={buttonType} onChange={(e) => setButtonType(e.target.value)} className={selectCls}>
            {["Pin Button", "Magnetic Button", "Keychain Button", "Mirror Button"].map((t) => (
                <option key={t}>{t}</option>
            ))}
            </select>
        </Field>

        <Field label="Shape">
            <div className="grid grid-cols-3 gap-2">
            {[
                { val: "Circle",    icon: <div className="w-5 h-5 rounded-full border-2 border-current"></div> },
                { val: "Square",    icon: <div className="w-5 h-5 border-2 border-current"></div> },
                { val: "Rectangle", icon: <div className="w-6 h-4 border-2 border-current"></div> },
            ].map(({ val, icon }) => (
                <button
                key={val}
                type="button"
                onClick={() => setShape(val)}
                className={`flex flex-col items-center gap-1 py-3 rounded-xl border-2 text-sm font-bold transition-all ${
                    shape === val
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-red-300"
                }`}
                >
                <span className="text-xl flex items-center justify-center h-6">{icon}</span>
                <span>{val}</span>
                </button>
            ))}
            </div>
        </Field>

        <Field label="Size">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {["25mm", "32mm", "44mm", "58mm", "Custom"].map((s) => (
                <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`py-2.5 rounded-xl border-2 text-sm font-bold transition-all ${
                    size === s
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-red-300"
                }`}
                >
                {s}
                {(s === "44mm" || s === "58mm") && (
                    <span className="ml-1 text-[9px] font-black text-red-400">+₱3</span>
                )}
                </button>
            ))}
            </div>
            {size === "Custom" && (
            <div className="mt-2">
                <input
                type="text"
                value={customSize}
                onChange={(e) => setCustomSize(e.target.value)}
                placeholder="e.g. 38mm or 50×70mm"
                className={inputCls + (errors.customSize ? " border-red-400 ring-1 ring-red-300" : "")}
                />
                {errors.customSize && <p className="text-[11px] text-red-500 mt-1">{errors.customSize}</p>}
            </div>
            )}
        </Field>

        <Field label="Quantity" required>
            <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
            className={inputCls + (errors.qty ? " border-red-400 ring-1 ring-red-300" : "")}
            />
            {errors.qty && <p className="text-[11px] text-red-500 mt-1">{errors.qty}</p>}
        </Field>
        </div>
    </SectionCard>

    {/* Material & Finish */}
    <SectionCard title="Material & Finish" icon={<FiLayers />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field label="Surface Finish">
            <div className="flex flex-col gap-2">
            <OptionCard
                active={finish === "Glossy"}
                onClick={() => setFinish("Glossy")}
                icon={<FiMaximize />}
                label="Glossy"
                sublabel="Shiny, vibrant surface — classic look"
            />
            <OptionCard
                active={finish === "Matte"}
                onClick={() => setFinish("Matte")}
                icon={<FiLayers />}
                label="Matte"
                sublabel="Smooth no-glare finish (+₱2/pc)"
            />
            </div>
        </Field>
        <Field label="Backing Type">
            <div className="flex flex-col gap-2">
            {[
                { val: "Safety Pin",   icon: <FiLink />, note: "" },
                { val: "Magnet",       icon: <FiGrid />, note: "+₱5/pc" },
                { val: "Plastic Clip", icon: <FiLink />, note: "" },
            ].map(({ val, icon, note }) => (
                <OptionCard
                key={val}
                active={backing === val}
                onClick={() => setBacking(val)}
                icon={icon}
                label={val}
                sublabel={note || "Standard backing"}
                />
            ))}
            </div>
        </Field>
        </div>
    </SectionCard>

    {/* Design */}
    <SectionCard title="Design" icon={<FiImage />}>
        <div className="flex flex-col gap-5">

        {/* Toggle */}
        <div className="flex gap-2 bg-gray-100 rounded-xl p-1">
            <button
            type="button"
            onClick={() => setDesignMode("upload")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                designMode === "upload" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
            >
            <FiUploadCloud /> Upload Design
            </button>
            <button
            type="button"
            onClick={() => setDesignMode("text")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                designMode === "text" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
            >
            <FiEdit3 /> Create Design
            </button>
        </div>

        {/* Live Preview */}
        <div className="flex justify-center py-2">
            <ButtonPreview
            shape={shape}
            size={size === "Custom" ? "44mm" : size}
            finish={finish}
            bgColor={bgColor}
            titleText={titleText}
            subtitleText={subtitleText}
            designMode={designMode}
            />
        </div>

        {designMode === "upload" ? (
            <Field label="Upload Your Artwork" hint="PNG, JPG, PDF, AI accepted · Max 50MB" required>
            <div
                onClick={() => designRef.current.click()}
                className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-6 cursor-pointer transition group ${
                errors.design
                    ? "border-red-400 bg-red-50"
                    : "border-gray-200 hover:border-red-300 hover:bg-red-50"
                }`}
            >
                <span className={`text-3xl transition-transform ${designFile ? "text-green-500 group-hover:scale-110" : "text-gray-400 group-hover:text-red-400 group-hover:scale-110"}`}>
                {designFile ? <FiCheckCircle /> : <FiUploadCloud />}
                </span>
                {designFile ? (
                <p className="text-xs text-center text-green-700 font-semibold break-all">{designFile.name}</p>
                ) : (
                <p className="text-xs text-gray-400 text-center font-semibold">
                    Click to browse or drag & drop your artwork
                </p>
                )}
                <input
                ref={designRef}
                type="file"
                accept="image/*,.pdf,.ai,.eps"
                className="hidden"
                onChange={(e) => setDesignFile(e.target.files || null)}
                />
            </div>
            {errors.design && <p className="text-[11px] text-red-500 mt-1">{errors.design}</p>}
            </Field>
        ) : (
            <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Title Text" required>
                <input
                    type="text"
                    value={titleText}
                    onChange={(e) => setTitleText(e.target.value)}
                    placeholder="e.g. Team Captain"
                    className={inputCls + (errors.titleText ? " border-red-400 ring-1 ring-red-300" : "")}
                />
                {errors.titleText && <p className="text-[11px] text-red-500 mt-1">{errors.titleText}</p>}
                </Field>
                <Field label="Subtitle Text">
                <input
                    type="text"
                    value={subtitleText}
                    onChange={(e) => setSubtitleText(e.target.value)}
                    placeholder="e.g. Class of 2025"
                    className={inputCls}
                />
                </Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Background Color">
                <div className="flex items-center gap-3">
                    <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-12 h-10 rounded-xl border border-gray-200 cursor-pointer p-1 bg-white"
                    />
                    <span className="text-sm text-gray-600 font-mono">{bgColor}</span>
                </div>
                </Field>
                <Field label="Font Style">
                <select value={fontStyle} onChange={(e) => setFontStyle(e.target.value)} className={selectCls}>
                    {["Sans-Serif Bold", "Serif Classic", "Script / Cursive", "Condensed", "Rounded"].map((f) => (
                    <option key={f}>{f}</option>
                    ))}
                </select>
                </Field>
            </div>
            </div>
        )}
        </div>
    </SectionCard>

    {/* Bulk Order */}
    <SectionCard title="Order Type" icon={<FiPackage />}>
        <div className="flex flex-col gap-4">
        <div className="flex gap-3">
            <ToggleBtn active={!isBulk} onClick={() => setIsBulk(false)}>
            <FiCheckCircle className="text-lg" /> Single Design
            </ToggleBtn>
            <ToggleBtn active={isBulk} onClick={() => setIsBulk(true)}>
            <FiFileText className="text-lg" /> Bulk Order (CSV)
            </ToggleBtn>
        </div>

        {isBulk ? (
            <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
                <FiInfo className="mt-0.5 text-lg shrink-0" />
                <div>
                <p className="font-bold mb-1">Bulk CSV Upload</p>
                <p className="text-xs leading-relaxed">
                    Upload a CSV or Excel file with columns: <code className="bg-blue-100 px-1 rounded">Name</code>,{" "}
                    <code className="bg-blue-100 px-1 rounded">Label</code>,{" "}
                    <code className="bg-blue-100 px-1 rounded">Variation</code> (optional).
                    Each row = one button variation.
                </p>
                </div>
            </div>
            <Field label="Upload CSV / Excel File" required>
                <div
                onClick={() => csvRef.current.click()}
                className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-6 cursor-pointer transition group ${
                    errors.csv
                    ? "border-red-400 bg-red-50"
                    : "border-gray-200 hover:border-red-300 hover:bg-red-50"
                }`}
                >
                <span className={`text-3xl transition-transform ${csvFile ? "text-green-500 group-hover:scale-110" : "text-gray-400 group-hover:text-red-400 group-hover:scale-110"}`}>
                    {csvFile ? <FiCheckCircle /> : <FiFileText />}
                </span>
                {csvFile ? (
                    <p className="text-xs text-center text-green-700 font-semibold">{csvFile.name}</p>
                ) : (
                    <p className="text-xs text-gray-400 text-center font-semibold">Click to upload .csv or .xlsx file</p>
                )}
                <input
                    ref={csvRef}
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    className="hidden"
                    onChange={(e) => setCsvFile(e.target.files || null)}
                />
                </div>
                {errors.csv && <p className="text-[11px] text-red-500 mt-1">{errors.csv}</p>}
            </Field>
            </div>
        ) : (
            <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-xl p-4 text-sm text-green-700">
            <FiCheckCircle className="mt-0.5 shrink-0" />
            <p>
                <strong>Single design</strong> — all {qty} button{qty !== 1 ? "s" : ""} will use the same design file or text.
            </p>
            </div>
        )}
        </div>
    </SectionCard>

    {/* Add-ons */}
    <SectionCard title="Add-ons" icon={<FiMaximize />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {addOns.map(({ key, label, sublabel, icon, price, val, set }) => (
            <AddOnToggle
            key={key}
            label={label}
            sublabel={sublabel}
            icon={icon}
            price={price}
            checked={val}
            onChange={() => set(!val)}
            />
        ))}
        </div>
    </SectionCard>

    {/* Delivery */}
    <SectionCard title="Delivery" icon={<FiTruck />}>
        <div className="flex flex-col gap-4">
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
        {delivery === "Pickup" ? (
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
            <FiMapPin className="mt-0.5 shrink-0 text-blue-500" />
            <p>You'll receive an SMS notification when your order is ready for pickup at our store.</p>
            </div>
        ) : (
            <Field label="Delivery Address" hint="Include barangay, city, and province" required>
            <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={2}
                placeholder="e.g. 45 Rizal Ave., Brgy. Poblacion, Makati City, Metro Manila"
                className={inputCls + " resize-none" + (errors.address ? " border-red-400 ring-1 ring-red-300" : "")}
            />
            {errors.address && <p className="text-[11px] text-red-500 mt-1">{errors.address}</p>}
            </Field>
        )}
        </div>
    </SectionCard>
    </div>

    {/* ── RIGHT: Summary ──────────────────────────── */}
    <div className="xl:col-span-1">
    <div className="sticky top-35 flex flex-col gap-4">

        {/* Preview Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-linear-to-r from-gray-50 to-white border-b border-gray-100">
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-600">Button Preview</h2>
        </div>
        <div className="px-6 py-5 flex justify-center">
            <ButtonPreview
            shape={shape}
            size={size === "Custom" ? "44mm" : size}
            finish={finish}
            bgColor={bgColor}
            titleText={titleText}
            subtitleText={subtitleText}
            designMode={designMode}
            />
        </div>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-linear-to-r from-red-500 to-red-600">
            <h2 className="text-xs font-black uppercase tracking-widest text-white/90">Order Summary</h2>
        </div>

        <div className="px-6 py-4 flex flex-col gap-2">
            {summaryRows.map(({ label, value }) => (
            <SummaryRow key={label} label={label} value={value} />
            ))}
        </div>

        <div className="mx-6 border-t border-gray-100" />

        <div className="px-6 py-4 flex flex-col gap-2">
            <div className="flex justify-between text-sm">
            <span className="text-gray-400">Price / pc</span>
            <span className="font-semibold text-gray-700">₱{pricing.unitPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
            <span className="text-gray-400">Quantity</span>
            <span className="font-semibold text-gray-700">× {qty}</span>
            </div>
            <div className="mt-2 flex items-center justify-between py-3 px-4 bg-red-50 rounded-xl border border-red-100">
            <span className="text-sm font-black text-gray-700 uppercase tracking-wide">Total</span>
            <span className="text-2xl font-black text-red-600">
                ₱{pricing.total.toLocaleString()}
            </span>
            </div>
        </div>

        <div className="px-6 pb-6 flex flex-col gap-3">
            <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-4 bg-red-500 hover:bg-red-600 active:scale-[.98] text-white text-sm font-black uppercase tracking-widest rounded-xl shadow-lg shadow-red-200 transition-all"
            >
            Place Order
            </button>
            <p className="text-[11px] text-gray-400 text-center">
            We'll confirm and send a payment link within 24 hours.
            </p>
        </div>
        </div>

        {/* Help Card */}
        <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-5">
        <p className="text-xs font-black uppercase tracking-widest text-yellow-700 mb-2 flex items-center gap-2"><FiMessageCircle /> Need Help?</p>
        <p className="text-xs text-yellow-700 leading-relaxed">
            Message us on Facebook or email{" "}
            <a href="mailto:picktwoprint@gmail.com" className="underline font-semibold">
            picktwoprint@gmail.com
            </a>{" "}
            for design assistance or bulk inquiries.
        </p>
        </div>

    </div>
    </div>

</div>
)
}