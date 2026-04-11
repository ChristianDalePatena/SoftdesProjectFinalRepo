import { useState, useRef } from "react"

// ── Primitives ─────────────────────────────────────────────────────────────────
const inputCls =
"w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 " +
"focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition placeholder:text-gray-400"

const selectCls = inputCls + " cursor-pointer"

function SectionCard({ title, icon, children }) {
return (
<div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-linear-to-r from-gray-50 to-white">
    <span className="text-xl">{icon}</span>
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

function ToggleBtn({ active, onClick, children, disabled }) {
return (
<button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-bold border transition-all ${
    disabled
        ? "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed"
        : active
        ? "bg-red-500 text-white border-red-500 shadow-sm shadow-red-200"
        : "bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:text-red-500"
    }`}
>
    {children}
</button>
)
}

function OptionCard({ active, onClick, icon, label, sublabel, badge, disabled }) {
return (
<button
    type="button"
    onClick={() => !disabled && onClick()}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left w-full transition-all ${
    disabled
        ? "border-gray-100 bg-gray-50 opacity-40 cursor-not-allowed"
        : active
        ? "border-red-500 bg-red-50 text-red-700"
        : "border-gray-200 bg-white text-gray-600 hover:border-red-300"
    }`}
>
    {icon && <span className="text-lg shrink-0">{icon}</span>}
    <div className="flex-1 min-w-0">
    <p className={`text-sm font-bold ${active ? "text-red-700" : "text-gray-700"}`}>{label}</p>
    {sublabel && <p className="text-[11px] text-gray-400 mt-0.5">{sublabel}</p>}
    </div>
    {badge && (
    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full shrink-0 ${
        active ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"
    }`}>
        {badge}
    </span>
    )}
</button>
)
}

function AddOnToggle({ label, sublabel, icon, priceLabel, checked, onChange }) {
return (
<button
    type="button"
    onClick={onChange}
    className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left w-full transition-all ${
    checked ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:border-red-300"
    }`}
>
    <span className="text-xl shrink-0">{icon}</span>
    <div className="flex-1 min-w-0">
    <p className={`text-sm font-bold ${checked ? "text-red-700" : "text-gray-700"}`}>{label}</p>
    <p className="text-[11px] text-gray-400 truncate">{sublabel}</p>
    </div>
    <span className={`text-xs font-black px-2 py-1 rounded-lg shrink-0 ${
    checked ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"
    }`}>
    {priceLabel}
    </span>
    <div className={`w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center transition-all ${
    checked ? "bg-red-500 border-red-500" : "border-gray-300"
    }`}>
    {checked && <span className="text-white text-[10px] font-black">✓</span>}
    </div>
</button>
)
}

// ── Keychain SVG Preview ───────────────────────────────────────────────────────
function KeychainPreview({ keychainType, shape, finish, attachmentType, hasDesign, mainText, glitter, holographic, doubleSided }) {
// Color by material type
const typeColor = {
"Acrylic Keychain":      { fill: "#e0f2fe", stroke: "#7dd3fc", shine: true },
"PVC Rubber Keychain":   { fill: "#fef9c3", stroke: "#fde047", shine: false },
"Metal Keychain":        { fill: "#e5e7eb", stroke: "#9ca3af", shine: true },
"Wooden Keychain":       { fill: "#fef3c7", stroke: "#d97706", shine: false },
"Epoxy Keychain":        { fill: "#ede9fe", stroke: "#a78bfa", shine: true },
}
const tc = typeColor[keychainType] || typeColor["Acrylic Keychain"]

const finishOpacity = finish === "Matte" ? 0 : 0.18

// Shape geometry (centred in 100×100 viewport)
const shapes = {
Circle:    { type: "circle", cx: 50, cy: 54, r: 34 },
Square:    { type: "rect",   x: 16, y: 20, w: 68, h: 68, rx: 8 },
Rectangle: { type: "rect",   x: 10, y: 26, w: 80, h: 56, rx: 8 },
"Custom shape": { type: "rect", x: 14, y: 20, w: 72, h: 68, rx: 22 },
}
const s = shapes[shape] || shapes["Circle"]

// Holographic rainbow overlay
const holoColors = ["#f87171","#fb923c","#fbbf24","#4ade80","#60a5fa","#a78bfa"]

return (
<div className="flex flex-col items-center gap-2">
    <svg width={120} height={150} viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">

    {/* Ring / attachment */}
    {attachmentType === "Standard Keyring" && (
        <ellipse cx={50} cy={10} rx={10} ry={6} fill="none" stroke="#9ca3af" strokeWidth={2.5} />
    )}
    {attachmentType === "Lobster Clasp" && (
        <>
        <rect x={42} y={4} width={16} height={12} rx={4} fill="none" stroke="#6b7280" strokeWidth={2} />
        <line x1={50} y1={15} x2={50} y2={20} stroke="#9ca3af" strokeWidth={1.5} />
        </>
    )}
    {attachmentType === "Chain + Ring" && (
        <>
        <ellipse cx={50} cy={8} rx={8} ry={5} fill="none" stroke="#6b7280" strokeWidth={2} />
        {[0,1,2].map(i => (
            <ellipse key={i} cx={50} cy={15 + i * 4} rx={3} ry={2}
            fill="none" stroke="#9ca3af" strokeWidth={1.2} />
        ))}
        </>
    )}

    {/* Hole connector */}
    <line x1={50} y1={attachmentType === "Chain + Ring" ? 27 : 16} x2={50} y2={22}
        stroke="#9ca3af" strokeWidth={1.2} />
    <circle cx={50} cy={22} r={2.5} fill="#d1d5db" />

    {/* Shape body */}
    {s.type === "circle" ? (
        <circle cx={s.cx} cy={s.cy} r={s.r} fill={tc.fill} stroke={tc.stroke} strokeWidth={1.5} />
    ) : (
        <rect x={s.x} y={s.y} width={s.w} height={s.h} rx={s.rx}
        fill={tc.fill} stroke={tc.stroke} strokeWidth={1.5} />
    )}

    {/* Holographic overlay */}
    {holographic && holoColors.map((c, i) => (
        s.type === "circle"
        ? <circle key={i} cx={s.cx} cy={s.cy} r={s.r - i * 5}
            fill="none" stroke={c} strokeWidth={2} opacity={0.18} />
        : <rect key={i} x={s.x + i * 4} y={s.y + i * 4}
            width={s.w - i * 8} height={s.h - i * 8} rx={s.rx}
            fill="none" stroke={c} strokeWidth={1.5} opacity={0.18} />
    ))}

    {/* Shine */}
    {tc.shine && finishOpacity > 0 && (
        s.type === "circle"
        ? <ellipse cx={s.cx - 10} cy={s.cy - 12} rx={12} ry={8}
            fill="white" opacity={finishOpacity} />
        : <ellipse cx={s.x + 16} cy={s.y + 12} rx={14} ry={8}
            fill="white" opacity={finishOpacity} />
    )}

    {/* Glitter dots */}
    {glitter && Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const dist  = s.type === "circle" ? s.r * 0.6 : Math.min(s.w, s.h) * 0.3
        const dx = s.type === "circle" ? s.cx + Math.cos(angle) * dist : s.x + s.w / 2 + Math.cos(angle) * dist
        const dy = s.type === "circle" ? s.cy + Math.sin(angle) * dist : s.y + s.h / 2 + Math.sin(angle) * dist
        return <circle key={i} cx={dx} cy={dy} r={1.2} fill="#fbbf24" opacity={0.7} />
    })}

    {/* Design content */}
    {(hasDesign || mainText) ? (
        <>
        {mainText ? (
            <text
            x={s.type === "circle" ? s.cx : s.x + s.w / 2}
            y={s.type === "circle" ? s.cy + 4 : s.y + s.h / 2 + 4}
            textAnchor="middle" fontSize={9} fontWeight="bold" fill="#374151">
            {mainText.slice(0, 10)}
            </text>
        ) : (
            <>
            <rect
                x={(s.type === "circle" ? s.cx : s.x + s.w / 2) - 18}
                y={(s.type === "circle" ? s.cy : s.y + s.h / 2) - 8}
                width={36} height={6} rx={2} fill="#ef4444" opacity={0.6} />
            <rect
                x={(s.type === "circle" ? s.cx : s.x + s.w / 2) - 12}
                y={(s.type === "circle" ? s.cy : s.y + s.h / 2) + 2}
                width={24} height={4} rx={2} fill="#9ca3af" opacity={0.5} />
            </>
        )}
        </>
    ) : (
        <g opacity={0.25}>
        <rect
            x={(s.type === "circle" ? s.cx : s.x + s.w / 2) - 10}
            y={(s.type === "circle" ? s.cy : s.y + s.h / 2) - 10}
            width={20} height={20} rx={4} fill="#9ca3af" />
        </g>
    )}

    {/* Double-sided badge */}
    {doubleSided && (
        <g>
        <rect x={72} y={100} width={22} height={11} rx={3} fill="#3b82f6" opacity={0.9} />
        <text x={83} y={108} textAnchor="middle" fontSize={6} fontWeight="bold" fill="white">2-SD</text>
        </g>
    )}

    {/* Epoxy coat indicator */}
    {finish === "Epoxy Coated" && (
        <g>
        {s.type === "circle"
            ? <circle cx={s.cx} cy={s.cy} r={s.r} fill="none" stroke="#a78bfa" strokeWidth={2} strokeDasharray="4 3" opacity={0.5} />
            : <rect x={s.x - 2} y={s.y - 2} width={s.w + 4} height={s.h + 4} rx={s.rx + 2}
                fill="none" stroke="#a78bfa" strokeWidth={2} strokeDasharray="4 3" opacity={0.5} />
        }
        </g>
    )}

    </svg>

    <p className="text-[9px] text-gray-400 italic">{keychainType} · {shape}</p>
    <p className="text-[9px] text-gray-500 font-semibold">{finish} · {attachmentType}</p>
</div>
)
}

// ── Pricing ────────────────────────────────────────────────────────────────────
function computePrice({ keychainType, printingStyle, finish, glitter, holographic, protectiveFilm, customPackaging, qty }) {
let unit = 30
if (keychainType === "Acrylic Keychain")    unit += 10
if (keychainType === "PVC Rubber Keychain") unit += 15
if (keychainType === "Metal Keychain")      unit += 20
if (keychainType === "Wooden Keychain")     unit += 12
if (keychainType === "Epoxy Keychain")      unit += 15
if (printingStyle === "Double-sided")       unit += 5
if (finish === "Epoxy Coated")              unit += 5
if (glitter)          unit += 3
if (holographic)      unit += 4
if (protectiveFilm)   unit += 2
if (customPackaging)  unit += 5
return { unitPrice: unit, total: unit * Math.max(1, qty) }
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function KeyChainOrderForm() {
// A. Keychain Details
const [keychainType, setKeychainType]   = useState("Acrylic Keychain")
const [shape, setShape]                 = useState("Circle")
const [customShape, setCustomShape]     = useState("")
const [size, setSize]                   = useState("Medium (2–3 inches)")
const [customSize, setCustomSize]       = useState("")
const [qty, setQty]                     = useState(1)

// B. Material & Finish
const [finish, setFinish]               = useState("Glossy")
const [printingStyle, setPrintingStyle] = useState("Single-sided")

// C. Customization
const [designMode, setDesignMode]         = useState("upload")
const [designFile, setDesignFile]         = useState(null)
const [mainText, setMainText]             = useState("")
const [subText, setSubText]               = useState("")
const [fontStyle, setFontStyle]           = useState("Sans-serif")
const [textColor, setTextColor]           = useState("#ef4444")
const [attachmentType, setAttachmentType] = useState("Standard Keyring")
const designRef = useRef()

// D. Bulk Order
const [bulkOrder, setBulkOrder] = useState(false)
const [csvFile, setCsvFile]     = useState(null)
const csvRef = useRef()

// E. Add-ons
const [glitter, setGlitter]                   = useState(false)
const [holographic, setHolographic]           = useState(false)
const [protectiveFilm, setProtectiveFilm]     = useState(false)
const [customPackaging, setCustomPackaging]   = useState(false)

// F. Delivery
const [delivery, setDelivery] = useState("Pickup")
const [address, setAddress]   = useState("")

const [errors, setErrors] = useState({})

// Auto-sync material label based on type
const materialLabel = {
"Acrylic Keychain":    "Acrylic",
"PVC Rubber Keychain": "PVC Rubber",
"Metal Keychain":      "Metal",
"Wooden Keychain":     "Wood",
"Epoxy Keychain":      "Acrylic + Epoxy",
}[keychainType] || "Acrylic"

const validate = () => {
const e = {}
if (!qty || qty < 1)                                         e.qty = "Quantity must be at least 1"
if (shape === "Custom shape" && !customShape.trim())         e.customShape = "Please describe your custom shape"
if (size === "Custom size" && !customSize.trim())            e.customSize  = "Please specify a custom size"
if (designMode === "upload" && !designFile && !bulkOrder)    e.design = "Please upload a design file"
if (designMode === "text" && !mainText.trim())               e.mainText = "Please enter main text"
if (bulkOrder && !csvFile)                                   e.csv = "Please upload a CSV/Excel file for bulk variations"
if (delivery === "Delivery" && !address.trim())              e.address = "Please enter a delivery address"
setErrors(e)
return Object.keys(e).length === 0
}

const handleSubmit = () => {
if (!validate()) return
alert(`✅ Order submitted!\n\nKeychain – ${keychainType}\nShape: ${shape}\nFinish: ${finish}\nQty: ${qty.toLocaleString()} pc${qty !== 1 ? "s" : ""}\nTotal: ₱${pricing.total.toLocaleString()}`)
}

const pricing = computePrice({ keychainType, printingStyle, finish, glitter, holographic, protectiveFilm, customPackaging, qty })

const KEYCHAIN_TYPES = [
{ val: "Acrylic Keychain",    icon: "💠", desc: "Clear, vibrant colors — most popular", badge: "+₱10" },
{ val: "PVC Rubber Keychain", icon: "🟡", desc: "Soft, flexible, 3D-embossed designs",  badge: "+₱15" },
{ val: "Metal Keychain",      icon: "🔩", desc: "Premium, engraved, durable",            badge: "+₱20" },
{ val: "Wooden Keychain",     icon: "🪵", desc: "Natural, laser-engraved aesthetic",     badge: "+₱12" },
{ val: "Epoxy Keychain",      icon: "✨", desc: "Glossy dome coat — ultra-vibrant",      badge: "+₱15" },
]

const SHAPES      = ["Circle", "Square", "Rectangle", "Custom shape"]
const SIZES       = ["Small (1–2 inches)", "Medium (2–3 inches)", "Large (3–4 inches)", "Custom size"]
const FINISHES    = [
{ val: "Glossy",       icon: "✨", desc: "Shiny, vibrant, reflective surface" },
{ val: "Matte",        icon: "🪨", desc: "Soft non-glare, smooth feel" },
{ val: "Epoxy Coated", icon: "💎", desc: "Thick dome resin — premium protection", badge: "+₱5" },
]
const ATTACHMENTS = [
{ val: "Standard Keyring", icon: "⭕", desc: "Classic split ring — universal fit" },
{ val: "Lobster Clasp",    icon: "🔒", desc: "Secure snap hook — won't fall off" },
{ val: "Chain + Ring",     icon: "⛓️", desc: "Stylish chain link with ring" },
]
const FONTS = ["Sans-serif", "Serif", "Script / Handwritten", "Bold Display", "Monospace"]

const activeAddOns = [
glitter         && "Glitter (+₱3)",
holographic     && "Holographic (+₱4)",
protectiveFilm  && "Protective Film (+₱2)",
customPackaging && "Custom Packaging (+₱5)",
].filter(Boolean)

const summaryRows = [
{ label: "Type",           value: keychainType },
{ label: "Shape",          value: shape === "Custom shape" ? (customShape || "Custom") : shape },
{ label: "Size",           value: size === "Custom size" ? (customSize || "Custom") : size },
{ label: "Material",       value: materialLabel },
{ label: "Finish",         value: finish },
{ label: "Print Style",    value: printingStyle + (printingStyle === "Double-sided" ? " (+₱5)" : "") },
{ label: "Attachment",     value: attachmentType },
{ label: "Design Mode",    value: designMode === "upload" ? "File Upload" : "Text-Based" },
{ label: "Bulk Order",     value: bulkOrder ? "Yes (CSV/Excel)" : "No" },
{ label: "Quantity",       value: `${qty.toLocaleString()} pc${qty !== 1 ? "s" : ""}` },
...(activeAddOns.length ? [{ label: "Add-ons", value: activeAddOns.join(", ") }] : []),
{ label: "Delivery",       value: delivery },
]

return (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

    {/* ── LEFT ─────────────────────────────────────── */}
    <div className="xl:col-span-2 flex flex-col gap-6">

    {/* Keychain Details */}
    <SectionCard title="Keychain Details" icon="🔑">
        <div className="flex flex-col gap-5">

        <Field label="Keychain Type" required>
            <div className="flex flex-col gap-2">
            {KEYCHAIN_TYPES.map(({ val, icon, desc, badge }) => (
                <OptionCard key={val} active={keychainType === val}
                onClick={() => setKeychainType(val)}
                icon={icon} label={val} sublabel={desc} badge={badge} />
            ))}
            </div>
        </Field>

        <Field label="Shape" required>
            <div className="grid grid-cols-2 gap-2">
            {SHAPES.map((s) => (
                <button key={s} type="button" onClick={() => setShape(s)}
                className={`py-2.5 px-3 rounded-xl border-2 text-sm font-bold text-center transition-all ${
                    shape === s
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-200 bg-white text-gray-500 hover:border-red-300"
                }`}>
                {s}
                </button>
            ))}
            </div>
            {shape === "Custom shape" && (
            <div className="mt-2">
                <input type="text" value={customShape} onChange={(e) => setCustomShape(e.target.value)}
                placeholder="e.g. Star, Heart, Logo silhouette..."
                className={inputCls + (errors.customShape ? " border-red-400 ring-1 ring-red-300" : "")} />
                {errors.customShape && <p className="text-[11px] text-red-500 mt-1">{errors.customShape}</p>}
            </div>
            )}
        </Field>

        <Field label="Size" required>
            <div className="grid grid-cols-2 gap-2">
            {SIZES.map((s) => (
                <button key={s} type="button" onClick={() => setSize(s)}
                className={`py-2.5 px-3 rounded-xl border-2 text-sm font-bold text-center transition-all ${
                    size === s
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-200 bg-white text-gray-500 hover:border-red-300"
                }`}>
                {s}
                </button>
            ))}
            </div>
            {size === "Custom size" && (
            <div className="mt-2">
                <input type="text" value={customSize} onChange={(e) => setCustomSize(e.target.value)}
                placeholder="e.g. 3.5 inches"
                className={inputCls + (errors.customSize ? " border-red-400 ring-1 ring-red-300" : "")} />
                {errors.customSize && <p className="text-[11px] text-red-500 mt-1">{errors.customSize}</p>}
            </div>
            )}
        </Field>

        <Field label="Quantity" required>
            <input type="number" min={1} value={qty}
            onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
            className={inputCls + (errors.qty ? " border-red-400 ring-1 ring-red-300" : "")} />
            {errors.qty && <p className="text-[11px] text-red-500 mt-1">{errors.qty}</p>}
            {qty >= 50 && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-4 py-2 text-xs text-green-700 mt-1">
                <span>🎉</span>
                <span className="font-semibold">Bulk order! Volume discount may apply — our team will confirm.</span>
            </div>
            )}
        </Field>

        </div>
    </SectionCard>

    {/* Material & Finish */}
    <SectionCard title="Material & Finish" icon="🧱">
        <div className="flex flex-col gap-5">

        {/* Auto material display */}
        <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
            <span className="text-lg">🪄</span>
            <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Auto-detected Material</p>
            <p className="text-sm font-black text-gray-800 mt-0.5">{materialLabel}</p>
            </div>
            <span className="ml-auto text-[11px] text-gray-400">Based on keychain type</span>
        </div>

        <Field label="Finish">
            <div className="flex flex-col gap-2">
            {FINISHES.map(({ val, icon, desc, badge }) => (
                <OptionCard key={val} active={finish === val} onClick={() => setFinish(val)}
                icon={icon} label={val} sublabel={desc} badge={badge} />
            ))}
            </div>
        </Field>

        <Field label="Printing Style">
            <div className="flex gap-3">
            <ToggleBtn active={printingStyle === "Single-sided"} onClick={() => setPrintingStyle("Single-sided")}>
                ◻ Single-sided
            </ToggleBtn>
            <ToggleBtn active={printingStyle === "Double-sided"} onClick={() => setPrintingStyle("Double-sided")}>
                ◼ Double-sided
                <span className="ml-1 text-[10px] opacity-75">(+₱5)</span>
            </ToggleBtn>
            </div>
            {printingStyle === "Double-sided" && (
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700 mt-2">
                <span>💡</span>
                <p>Both sides printed — great for contact info on the back. You may upload two separate designs.</p>
            </div>
            )}
        </Field>

        </div>
    </SectionCard>

    {/* Customization */}
    <SectionCard title="Customization" icon="🎨">
        <div className="flex flex-col gap-5">

        {/* Design Mode Toggle */}
        <Field label="Design Mode">
            <div className="flex gap-3">
            <ToggleBtn active={designMode === "upload"} onClick={() => setDesignMode("upload")}>
                📁 Upload File
            </ToggleBtn>
            <ToggleBtn active={designMode === "text"} onClick={() => setDesignMode("text")}>
                ✏️ Text-Based
            </ToggleBtn>
            </div>
        </Field>

        {/* Upload Design */}
        {designMode === "upload" && (
            <Field label="Upload Design File"
            hint="PNG, JPG, PDF, AI accepted · 300 DPI recommended · Transparent background preferred"
            required>
            <div
                onClick={() => designRef.current.click()}
                className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-8 cursor-pointer transition group ${
                errors.design ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-red-300 hover:bg-red-50"
                }`}
            >
                <span className="text-4xl group-hover:scale-110 transition-transform">{designFile ? "✅" : "🖼️"}</span>
                {designFile ? (
                <p className="text-xs text-center text-green-700 font-semibold break-all">{designFile.name}</p>
                ) : (
                <>
                    <p className="text-sm font-semibold text-gray-500">Click to browse or drag & drop</p>
                    <p className="text-xs text-gray-400">PNG, JPG, PDF, AI — transparent BG preferred</p>
                </>
                )}
                <input ref={designRef} type="file" accept="image/*,.pdf,.ai,.eps"
                className="hidden" onChange={(e) => setDesignFile(e.target.files[0] || null)} />
            </div>
            {errors.design && <p className="text-[11px] text-red-500 mt-1">{errors.design}</p>}
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-700 mt-2">
                <span>⚠️</span>
                <p>For small keychains, keep details simple. Thin lines below <strong>0.5mm</strong> may not print clearly. Transparent PNG gives the best cut results.</p>
            </div>
            </Field>
        )}

        {/* Text-Based Design */}
        {designMode === "text" && (
            <div className="flex flex-col gap-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
            <Field label="Main Text" required>
                <input type="text" value={mainText} onChange={(e) => setMainText(e.target.value)}
                placeholder="e.g. John, Best Friend, Class 2025..."
                className={inputCls + (errors.mainText ? " border-red-400 ring-1 ring-red-300" : "")} />
                {errors.mainText && <p className="text-[11px] text-red-500 mt-1">{errors.mainText}</p>}
            </Field>

            <Field label="Subtext" hint="Tagline, date, or secondary info">
                <input type="text" value={subText} onChange={(e) => setSubText(e.target.value)}
                placeholder="e.g. Batch 2025, BFF, Est. 2001" className={inputCls} />
            </Field>

            <Field label="Font Style">
                <select value={fontStyle} onChange={(e) => setFontStyle(e.target.value)} className={selectCls}>
                {FONTS.map((f) => <option key={f}>{f}</option>)}
                </select>
            </Field>

            <Field label="Text / Print Color">
                <div className="flex items-center gap-3">
                <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)}
                    className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-1" />
                <span className="text-sm text-gray-600 font-semibold">{textColor.toUpperCase()}</span>
                <span className="text-xs text-gray-400">— Selected ink color</span>
                </div>
            </Field>
            </div>
        )}

        {/* Attachment Type */}
        <Field label="Attachment Type">
            <div className="flex flex-col gap-2">
            {ATTACHMENTS.map(({ val, icon, desc }) => (
                <OptionCard key={val} active={attachmentType === val}
                onClick={() => setAttachmentType(val)}
                icon={icon} label={val} sublabel={desc} />
            ))}
            </div>
        </Field>

        </div>
    </SectionCard>

    {/* Bulk Order */}
    <SectionCard title="Bulk Order" icon="📦">
        <div className="flex flex-col gap-4">

        <AddOnToggle
            label="Enable Bulk Order Mode"
            sublabel="Different name or text per keychain — upload a CSV or Excel file"
            icon="📊"
            priceLabel={bulkOrder ? "Active" : "Off"}
            checked={bulkOrder}
            onChange={() => { setBulkOrder(!bulkOrder); setCsvFile(null) }}
        />

        {bulkOrder && (
            <div className="flex flex-col gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
            <p className="text-xs font-bold text-blue-700 uppercase tracking-wider">Upload Variations File</p>
            <p className="text-xs text-blue-600 leading-relaxed">
                Prepare a CSV or Excel with columns: <strong>Name</strong>, <strong>Text Line 1</strong>, <strong>Text Line 2</strong>, <strong>Notes</strong>. One row per keychain.
            </p>
            <div
                onClick={() => csvRef.current.click()}
                className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-6 cursor-pointer transition group ${
                errors.csv ? "border-red-400 bg-red-50" : "border-blue-200 hover:border-blue-400 hover:bg-blue-100"
                }`}
            >
                <span className="text-3xl group-hover:scale-110 transition-transform">{csvFile ? "✅" : "📋"}</span>
                {csvFile ? (
                <p className="text-xs text-center text-green-700 font-semibold break-all">{csvFile.name}</p>
                ) : (
                <>
                    <p className="text-sm font-semibold text-blue-500">Click to upload CSV or Excel file</p>
                    <p className="text-xs text-blue-400">.csv, .xlsx, .xls accepted</p>
                </>
                )}
                <input ref={csvRef} type="file" accept=".csv,.xlsx,.xls"
                className="hidden" onChange={(e) => setCsvFile(e.target.files[0] || null)} />
            </div>
            {errors.csv && <p className="text-[11px] text-red-500">{errors.csv}</p>}
            <a href="#" className="text-[11px] text-blue-600 underline font-semibold">
                📥 Download sample template
            </a>
            </div>
        )}

        {!bulkOrder && (
            <div className="flex items-start gap-3 bg-gray-50 border border-gray-100 rounded-xl p-3 text-xs text-gray-500">
            <span>ℹ️</span>
            <p>Single design — all keychains will be identical. Enable bulk mode to personalize each piece.</p>
            </div>
        )}

        </div>
    </SectionCard>

    {/* Add-ons */}
    <SectionCard title="Add-ons & Effects" icon="⭐">
        <div className="flex flex-col gap-3">
        <AddOnToggle label="Glitter Effect"
            sublabel="Sparkling glitter particles embedded in the design layer"
            icon="✨" priceLabel="+₱3"
            checked={glitter} onChange={() => setGlitter(!glitter)} />
        <AddOnToggle label="Holographic Effect"
            sublabel="Rainbow shimmer — changes color when tilted under light"
            icon="🌈" priceLabel="+₱4"
            checked={holographic} onChange={() => setHolographic(!holographic)} />
        <AddOnToggle label="Protective Film"
            sublabel="Scratch-resistant laminate over the print surface"
            icon="🛡️" priceLabel="+₱2"
            checked={protectiveFilm} onChange={() => setProtectiveFilm(!protectiveFilm)} />
        <AddOnToggle label="Custom Packaging"
            sublabel="Individual OPP bag or gift box per keychain"
            icon="🎁" priceLabel="+₱5"
            checked={customPackaging} onChange={() => setCustomPackaging(!customPackaging)} />
        </div>
    </SectionCard>

    {/* Delivery */}
    <SectionCard title="Delivery" icon="🚚">
        <div className="flex flex-col gap-4">
        <Field label="Fulfillment Method">
            <div className="flex gap-3">
            <ToggleBtn active={delivery === "Pickup"} onClick={() => setDelivery("Pickup")}>
                🏪 Pickup
            </ToggleBtn>
            <ToggleBtn active={delivery === "Delivery"} onClick={() => setDelivery("Delivery")}>
                📦 Delivery
            </ToggleBtn>
            </div>
        </Field>
        {delivery === "Pickup" && (
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
            <span>📍</span>
            <p>You'll receive an SMS when your order is ready for pickup at our store.</p>
            </div>
        )}
        {delivery === "Delivery" && (
            <Field label="Delivery Address" hint="Include barangay, city, and province" required>
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={2}
                placeholder="e.g. 45 Rizal Ave., Brgy. Poblacion, Makati City, Metro Manila"
                className={inputCls + " resize-none" + (errors.address ? " border-red-400 ring-1 ring-red-300" : "")} />
            {errors.address && <p className="text-[11px] text-red-500 mt-1">{errors.address}</p>}
            </Field>
        )}
        </div>
    </SectionCard>

    </div>

    {/* ── RIGHT: Sidebar ─────────────────────────────── */}
    <div className="xl:col-span-1">
    <div className="sticky top-35 flex flex-col gap-4">

        {/* Live Preview */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-linear-to-r from-gray-50 to-white">
            <span className="text-xl">🔑</span>
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-600">Live Preview</h2>
        </div>
        <div className="px-6 py-6 flex justify-center bg-gray-50 min-h-55 items-center">
            <KeychainPreview
            keychainType={keychainType}
            shape={shape === "Custom shape" ? "Custom shape" : shape}
            finish={finish}
            attachmentType={attachmentType}
            hasDesign={!!designFile}
            mainText={designMode === "text" ? mainText : ""}
            glitter={glitter}
            holographic={holographic}
            doubleSided={printingStyle === "Double-sided"}
            />
        </div>
        </div>

        {/* Order Summary */}
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
        <div className="px-6 py-4 flex flex-col gap-2">
            <div className="flex justify-between text-sm">
            <span className="text-gray-400">Price / pc</span>
            <span className="font-semibold text-gray-700">₱{pricing.unitPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
            <span className="text-gray-400">Quantity</span>
            <span className="font-semibold text-gray-700">× {qty.toLocaleString()}</span>
            </div>
            <div className="mt-2 flex items-center justify-between py-3 px-4 bg-red-50 rounded-xl border border-red-100">
            <span className="text-sm font-black text-gray-700 uppercase tracking-wide">Total</span>
            <span className="text-2xl font-black text-red-600">₱{pricing.total.toLocaleString()}</span>
            </div>
        </div>
        <div className="px-6 pb-6 flex flex-col gap-3">
            <button type="button" onClick={handleSubmit}
            className="w-full py-4 bg-red-500 hover:bg-red-600 active:scale-[.98] text-white text-sm font-black uppercase tracking-widest rounded-xl shadow-lg shadow-red-200 transition-all">
            Place Order →
            </button>
            <p className="text-[11px] text-gray-400 text-center">
            We'll confirm and send a payment link within 24 hours.
            </p>
        </div>
        </div>

        {/* Help Card */}
        <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-5">
        <p className="text-xs font-black uppercase tracking-widest text-yellow-700 mb-2">Need Help?</p>
        <p className="text-xs text-yellow-700 leading-relaxed">
            Not sure which material or effect suits your design? Message us on Facebook or email{" "}
            <a href="mailto:picktwoprint@gmail.com" className="underline font-semibold">
            picktwoprint@gmail.com
            </a>
        </p>
        </div>

    </div>
    </div>

</div>
)
}