import { useState, useRef } from "react"

// ── Primitives ─────────────────────────────────────────────────────────────────
const inputCls =
"w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 " +
"focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition placeholder:text-gray-400"

const selectCls = inputCls + " cursor-pointer"

function SectionCard({ title, icon, children }) {
return (
<div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50">
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

function YesNoToggle({ label, sublabel, icon, value, onChange }) {
return (
<div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50">
    <span className="text-xl shrink-0">{icon}</span>
    <div className="flex-1 min-w-0">
    <p className="text-sm font-bold text-gray-700">{label}</p>
    {sublabel && <p className="text-[11px] text-gray-400 mt-0.5">{sublabel}</p>}
    </div>
    <div className="flex gap-2 shrink-0">
    <button
        type="button"
        onClick={() => onChange(true)}
        className={`px-4 py-1.5 rounded-lg text-xs font-black border transition-all ${
        value === true
            ? "bg-red-500 text-white border-red-500"
            : "bg-white text-gray-500 border-gray-200 hover:border-red-300"
        }`}
    >
        Yes
    </button>
    <button
        type="button"
        onClick={() => onChange(false)}
        className={`px-4 py-1.5 rounded-lg text-xs font-black border transition-all ${
        value === false
            ? "bg-gray-700 text-white border-gray-700"
            : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
        }`}
    >
        No
    </button>
    </div>
</div>
)
}

// ── Clock SVG Preview ──────────────────────────────────────────────────────────
function ClockPreview({ clockType, shape, size, material, glowNumbers, metallicHands, printStyle }) {
const matColors = {
Plastic:  { face: "#f1f5f9", rim: "#94a3b8", accent: "#64748b" },
Acrylic:  { face: "#e0f2fe", rim: "#38bdf8", accent: "#0ea5e9" },
Wood:     { face: "#fef3c7", rim: "#d97706", accent: "#92400e" },
Glass:    { face: "#f0fdf4", rim: "#86efac", accent: "#16a34a" },
}
const tc = matColors[material] || matColors["Plastic"]

const isSquare = shape === "Square"
const isRect   = shape === "Rectangle"
const cx = 65, cy = 75, r = 48

// Clock hands (simple static 10:10 position)
const hourAngle   = (10 * 30 + 10 * 0.5) * (Math.PI / 180) - Math.PI / 2
const minuteAngle = (10 * 6) * (Math.PI / 180) - Math.PI / 2
const handColor   = metallicHands ? "#d4af37" : "#1f2937"

const hourX   = cx + 24 * Math.cos(hourAngle)
const hourY   = cy + 24 * Math.sin(hourAngle)
const minuteX = cx + 34 * Math.cos(minuteAngle)
const minuteY = cy + 34 * Math.sin(minuteAngle)

const sizeLabel = { "Small (8 inches)": "S", "Medium (10 inches)": "M", "Large (12 inches)": "L", "Extra Large (14+ inches)": "XL" }[size] || "?"

return (
<div className="flex flex-col items-center gap-2">
    <svg width={130} height={160} viewBox="0 0 130 160" xmlns="http://www.w3.org/2000/svg">

    {/* Shadow */}
    <ellipse cx={65} cy={148} rx={42} ry={6} fill="#e5e7eb" />

    {/* Outer frame / body */}
    {isSquare ? (
        <rect x={17} y={27} width={96} height={96} rx={8}
        fill={tc.rim} stroke={tc.accent} strokeWidth={2} />
    ) : isRect ? (
        <rect x={17} y={32} width={96} height={84} rx={8}
        fill={tc.rim} stroke={tc.accent} strokeWidth={2} />
    ) : (
        <circle cx={cx} cy={cy} r={r + 4} fill={tc.rim} stroke={tc.accent} strokeWidth={2} />
    )}

    {/* Clock face */}
    {isSquare ? (
        <rect x={22} y={32} width={86} height={86} rx={5} fill={tc.face} />
    ) : isRect ? (
        <rect x={22} y={37} width={86} height={74} rx={5} fill={tc.face} />
    ) : (
        <circle cx={cx} cy={cy} r={r} fill={tc.face} />
    )}

    {/* Photo clock overlay */}
    {clockType === "Photo Wall Clock" && printStyle === "Full Face Print" && (
        <>
        {isSquare ? (
            <rect x={22} y={32} width={86} height={86} rx={5} fill={tc.rim} opacity={0.25} />
        ) : (
            <circle cx={cx} cy={cy} r={r} fill={tc.rim} opacity={0.25} />
        )}
        <text x={cx} y={cy - 6} textAnchor="middle" fontSize={7} fill={tc.accent} fontWeight="bold">PHOTO</text>
        <text x={cx} y={cy + 4} textAnchor="middle" fontSize={6} fill={tc.accent} opacity={0.7}>PRINT</text>
        </>
    )}

    {/* Hour markers */}
    {[...Array(12)].map((_, i) => {
        const angle = (i * 30) * (Math.PI / 180) - Math.PI / 2
        const inner = i % 3 === 0 ? r - 10 : r - 6
        const outer = r - 2
        const x1 = cx + inner * Math.cos(angle)
        const y1 = cy + inner * Math.sin(angle)
        const x2 = cx + outer * Math.cos(angle)
        const y2 = cy + outer * Math.sin(angle)
        return (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={glowNumbers ? "#4ade80" : tc.accent}
            strokeWidth={i % 3 === 0 ? 2 : 1}
            opacity={isSquare || isRect ? (Math.abs(x1 - cx) < 46 && Math.abs(y1 - cy) < 46 ? 1 : 0) : 1}
        />
        )
    })}

    {/* Hour hand */}
    <line x1={cx} y1={cy} x2={hourX} y2={hourY}
        stroke={handColor} strokeWidth={3} strokeLinecap="round" />
    {/* Minute hand */}
    <line x1={cx} y1={cy} x2={minuteX} y2={minuteY}
        stroke={handColor} strokeWidth={2} strokeLinecap="round" />
    {/* Second hand */}
    <line x1={cx} y1={cy}
        x2={cx + 38 * Math.cos(-Math.PI / 2 + 0.5)}
        y2={cy + 38 * Math.sin(-Math.PI / 2 + 0.5)}
        stroke="#ef4444" strokeWidth={1} strokeLinecap="round" />
    {/* Center dot */}
    <circle cx={cx} cy={cy} r={3} fill={handColor} />
    <circle cx={cx} cy={cy} r={1.5} fill="#ef4444" />

    {/* Size badge */}
    <rect x={84} y={10} width={32} height={15} rx={7.5} fill={tc.accent} opacity={0.9} />
    <text x={100} y={21} textAnchor="middle" fontSize={7.5} fontWeight="bold" fill="white">{sizeLabel}</text>

    {/* Glow effect hint */}
    {glowNumbers && (
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#4ade80" strokeWidth={1.5} opacity={0.4} />
    )}

    </svg>
    <p className="text-[9px] text-gray-400 italic">{clockType}</p>
    <p className="text-[9px] text-gray-500 font-semibold">{shape} · {material}</p>
</div>
)
}

// ── Pricing ────────────────────────────────────────────────────────────────────
function computePrice({ material, size, silentMechanism, glowNumbers, metallicHands, customPackaging, batteryInclusion }) {
let base = 250
if (material === "Acrylic") base += 50
if (material === "Wood")    base += 60
if (material === "Glass")   base += 70
if (size === "Large (12 inches)")       base += 30
if (size === "Extra Large (14+ inches)") base += 50
if (silentMechanism)  base += 40
if (glowNumbers)      base += 20
if (metallicHands)    base += 25
if (customPackaging)  base += 30
if (batteryInclusion) base += 10
return base
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function WallClockOrderForm() {
// A. Clock Details
const [clockType, setClockType]       = useState("Classic Analog Clock")
const [shape, setShape]               = useState("Round")
const [customShape, setCustomShape]   = useState("")
const [size, setSize]                 = useState("Medium (10 inches)")
const [customSize, setCustomSize]     = useState("")
const [quantity, setQuantity]         = useState(1)

// B. Material & Build
const [material, setMaterial]         = useState("Plastic")
const [frameType, setFrameType]       = useState("Frameless")
const [mechanism, setMechanism]       = useState("Standard Movement")

// C. Customization
const [printStyle, setPrintStyle]     = useState("Full Face Print")
const [designMode, setDesignMode]     = useState("upload") // "upload" | "text"
const [designFile, setDesignFile]     = useState(null)
const [photoFile, setPhotoFile]       = useState(null)
const [titleText, setTitleText]       = useState("")
const [subtitleText, setSubtitleText] = useState("")
const [fontStyle, setFontStyle]       = useState("Classic Serif")
const [textColor, setTextColor]       = useState("#1f2937")
const designRef = useRef()
const photoRef  = useRef()

// D. Bulk Order
const [bulkOrder, setBulkOrder]       = useState(false)
const [csvFile, setCsvFile]           = useState(null)
const csvRef = useRef()

// E. Add-ons
const [silentMechanism, setSilentMechanism]   = useState(false)
const [glowNumbers, setGlowNumbers]           = useState(false)
const [metallicHands, setMetallicHands]       = useState(false)
const [customPackaging, setCustomPackaging]   = useState(false)
const [batteryInclusion, setBatteryInclusion] = useState(false)

// F. Delivery
const [delivery, setDelivery]         = useState("Pickup")
const [address, setAddress]           = useState("")

const [errors, setErrors] = useState({})

const effectiveSize = size === "Custom size" ? (customSize || "Custom") : size

const validate = () => {
const e = {}
if (quantity < 1)
    e.quantity = "Quantity must be at least 1"
if (shape === "Custom shape" && !customShape.trim())
    e.customShape = "Please describe your custom shape"
if (size === "Custom size" && !customSize.trim())
    e.customSize = "Please enter your custom size"
if (designMode === "upload" && !designFile && !photoFile)
    e.design = "Please upload a design or photo file"
if (delivery === "Delivery" && !address.trim())
    e.address = "Please enter your delivery address"
if (bulkOrder && !csvFile)
    e.csvFile = "Please upload a CSV/Excel file for bulk personalization"
setErrors(e)
return Object.keys(e).length === 0
}

const handleSubmit = () => {
if (!validate()) return
alert(`✅ Order submitted!\n\nClock: ${clockType}\nShape: ${shape}\nSize: ${effectiveSize}\nQty: ${quantity}\nTotal: ₱${total.toLocaleString()}`)
}

const unitPrice = computePrice({ material, size: effectiveSize, silentMechanism, glowNumbers, metallicHands, customPackaging, batteryInclusion })
const total = unitPrice * Math.max(1, quantity)

const activeAddOns = [
silentMechanism  && "Silent Mechanism (+₱40)",
glowNumbers      && "Glow Numbers (+₱20)",
metallicHands    && "Metallic Hands (+₱25)",
customPackaging  && "Custom Packaging (+₱30)",
batteryInclusion && "Battery Included (+₱10)",
].filter(Boolean)

const CLOCK_TYPES   = ["Classic Analog Clock", "Modern Minimalist Clock", "Photo Wall Clock", "Acrylic Wall Clock", "Wooden Wall Clock"]
const SHAPES        = ["Round", "Square", "Rectangle", "Custom shape"]
const SIZES         = ["Small (8 inches)", "Medium (10 inches)", "Large (12 inches)", "Extra Large (14+ inches)", "Custom size"]
const MATERIALS     = [
{ val: "Plastic", icon: "🔵", desc: "Lightweight and affordable" },
{ val: "Acrylic", icon: "💎", desc: "Clear, glossy modern look", badge: "+₱50" },
{ val: "Wood",    icon: "🪵", desc: "Warm natural aesthetic",    badge: "+₱60" },
{ val: "Glass",   icon: "🪟", desc: "Premium, sleek finish",     badge: "+₱70" },
]
const FRAMES        = ["Frameless", "Plastic Frame", "Metal Frame", "Wooden Frame"]
const MECHANISMS    = [
{ val: "Standard Movement",     icon: "⚙️", desc: "Reliable standard ticking" },
{ val: "Silent Sweep Movement", icon: "🤫", desc: "No tick — smooth silent sweep" },
]
const PRINT_STYLES  = [
{ val: "Full Face Print",              icon: "🖼️", desc: "Design covers entire clock face" },
{ val: "Partial Design (center only)", icon: "🎯", desc: "Design in center, edges clean" },
{ val: "Transparent Background",       icon: "✨", desc: "Best for acrylic or glass material" },
]
const FONT_STYLES   = ["Classic Serif", "Modern Sans", "Script / Cursive", "Bold Display", "Handwritten"]

const summaryRows = [
{ label: "Clock Type",   value: clockType },
{ label: "Shape",        value: shape === "Custom shape" ? (customShape || "Custom") : shape },
{ label: "Size",         value: effectiveSize },
{ label: "Quantity",     value: quantity },
{ label: "Material",     value: material },
{ label: "Frame",        value: frameType },
{ label: "Mechanism",    value: mechanism },
{ label: "Print Style",  value: printStyle },
{ label: "Design Mode",  value: designMode === "upload" ? "File Upload" : "Text Design" },
{ label: "Order Type",   value: bulkOrder ? "Bulk Order" : "Single Design" },
...(activeAddOns.length ? [{ label: "Add-ons", value: activeAddOns.join(", ") }] : []),
{ label: "Delivery",     value: delivery },
]

return (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

    {/* ── LEFT ─────────────────────────────────────── */}
    <div className="xl:col-span-2 flex flex-col gap-6">

    {/* Clock Details */}
    <SectionCard title="Clock Details" icon="🕐">
        <div className="flex flex-col gap-5">

        <Field label="Clock Type" required>
            <select value={clockType} onChange={(e) => setClockType(e.target.value)} className={selectCls}>
            {CLOCK_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
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
                {s === "Round" ? "⭕ Round" : s === "Square" ? "⬜ Square" : s === "Rectangle" ? "▭ Rectangle" : "✏️ Custom"}
                </button>
            ))}
            </div>
            {shape === "Custom shape" && (
            <div className="mt-2">
                <input type="text" value={customShape} onChange={(e) => setCustomShape(e.target.value)}
                placeholder="e.g. Heart, Star, Hexagon, House shape..."
                className={inputCls + (errors.customShape ? " border-red-400 ring-1 ring-red-300" : "")} />
                {errors.customShape && <p className="text-[11px] text-red-500 mt-1">{errors.customShape}</p>}
            </div>
            )}
        </Field>

        <Field label="Size" required>
            <div className="flex flex-col gap-2">
            {SIZES.map((s) => (
                <button key={s} type="button" onClick={() => setSize(s)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl border-2 text-sm font-bold text-left transition-all ${
                    size === s
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-200 bg-white text-gray-500 hover:border-red-300"
                }`}>
                <span>{s}</span>
                {s === "Large (12 inches)" && <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${size === s ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"}`}>+₱30</span>}
                {s === "Extra Large (14+ inches)" && <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${size === s ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"}`}>+₱50</span>}
                </button>
            ))}
            </div>
            {size === "Custom size" && (
            <div className="mt-2">
                <input type="text" value={customSize} onChange={(e) => setCustomSize(e.target.value)}
                placeholder="e.g. 16 inches, 20×24 inches..."
                className={inputCls + (errors.customSize ? " border-red-400 ring-1 ring-red-300" : "")} />
                {errors.customSize && <p className="text-[11px] text-red-500 mt-1">{errors.customSize}</p>}
            </div>
            )}
        </Field>

        <Field label="Quantity" required>
            <input type="number" min={1} value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className={inputCls + (errors.quantity ? " border-red-400 ring-1 ring-red-300" : "")} />
            {errors.quantity && <p className="text-[11px] text-red-500 mt-1">{errors.quantity}</p>}
        </Field>

        </div>
    </SectionCard>

    {/* Material & Build */}
    <SectionCard title="Material & Build" icon="🏗️">
        <div className="flex flex-col gap-5">

        <Field label="Material" required>
            <div className="flex flex-col gap-2">
            {MATERIALS.map(({ val, icon, desc, badge }) => (
                <OptionCard key={val} active={material === val} onClick={() => setMaterial(val)}
                icon={icon} label={val} sublabel={desc} badge={badge} />
            ))}
            </div>
        </Field>

        <Field label="Frame Type" required>
            <div className="grid grid-cols-2 gap-2">
            {FRAMES.map((f) => (
                <button key={f} type="button" onClick={() => setFrameType(f)}
                className={`py-2.5 px-3 rounded-xl border-2 text-sm font-bold text-center transition-all ${
                    frameType === f
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-200 bg-white text-gray-500 hover:border-red-300"
                }`}>
                {f}
                </button>
            ))}
            </div>
        </Field>

        <Field label="Clock Mechanism" required>
            <div className="flex flex-col gap-2">
            {MECHANISMS.map(({ val, icon, desc }) => (
                <OptionCard key={val} active={mechanism === val} onClick={() => setMechanism(val)}
                icon={icon} label={val} sublabel={desc} />
            ))}
            </div>
        </Field>

        </div>
    </SectionCard>

    {/* Customization */}
    <SectionCard title="Customization Options" icon="🎨">
        <div className="flex flex-col gap-5">

        <Field label="Print Style" required>
            <div className="flex flex-col gap-2">
            {PRINT_STYLES.map(({ val, icon, desc }) => (
                <OptionCard key={val} active={printStyle === val} onClick={() => setPrintStyle(val)}
                icon={icon} label={val} sublabel={desc} />
            ))}
            </div>
            {printStyle === "Transparent Background" && material !== "Acrylic" && material !== "Glass" && (
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-700 mt-1">
                <span>⚠️</span>
                <p>Transparent background works best with <strong>Acrylic</strong> or <strong>Glass</strong> material. Consider changing your material selection.</p>
            </div>
            )}
        </Field>

        {/* Photo Upload for Photo Clock */}
        {clockType === "Photo Wall Clock" && (
            <Field label="Photo Upload" hint="Best results with high-resolution photos" required>
            <div
                onClick={() => photoRef.current.click()}
                className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-6 cursor-pointer transition group ${
                errors.design ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-red-300 hover:bg-red-50"
                }`}
            >
                <span className="text-3xl group-hover:scale-110 transition-transform">{photoFile ? "✅" : "📸"}</span>
                {photoFile ? (
                <p className="text-xs text-center text-green-700 font-semibold break-all">{photoFile.name}</p>
                ) : (
                <>
                    <p className="text-sm font-semibold text-gray-500">Upload your photo</p>
                    <p className="text-xs text-gray-400">PNG, JPG · Minimum 300 DPI recommended</p>
                </>
                )}
                <input ref={photoRef} type="file" accept="image/*"
                className="hidden" onChange={(e) => setPhotoFile(e.target.files[0] || null)} />
            </div>
            </Field>
        )}

        <Field label="Design Method" required>
            <div className="flex gap-3 mb-3">
            <ToggleBtn active={designMode === "upload"} onClick={() => setDesignMode("upload")}>
                📁 Upload Design
            </ToggleBtn>
            <ToggleBtn active={designMode === "text"} onClick={() => setDesignMode("text")}>
                ✏️ Text-Based
            </ToggleBtn>
            </div>

            {designMode === "upload" && (
            <div className="flex flex-col gap-2">
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
                    <p className="text-sm font-semibold text-gray-500">Click to upload your design</p>
                    <p className="text-xs text-gray-400">PNG, JPG, PDF, AI accepted · 300 DPI recommended</p>
                    </>
                )}
                <input ref={designRef} type="file" accept="image/*,.pdf,.ai"
                    className="hidden" onChange={(e) => setDesignFile(e.target.files[0] || null)} />
                </div>
                {errors.design && <p className="text-[11px] text-red-500">{errors.design}</p>}
                <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-700 mt-1">
                <span>⚠️</span>
                <p>Leave the clock hands area blank in your design. We'll overlay the mechanism on top.</p>
                </div>
            </div>
            )}

            {designMode === "text" && (
            <div className="flex flex-col gap-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Text Design Details</p>

                <Field label="Title / Main Text">
                <input type="text" value={titleText} onChange={(e) => setTitleText(e.target.value)}
                    placeholder="e.g. The Santos Family, Class of 2025..."
                    className={inputCls} />
                </Field>

                <Field label="Subtitle / Message">
                <input type="text" value={subtitleText} onChange={(e) => setSubtitleText(e.target.value)}
                    placeholder="e.g. Est. 2024, Forever in our hearts..."
                    className={inputCls} />
                </Field>

                <Field label="Font Style">
                <select value={fontStyle} onChange={(e) => setFontStyle(e.target.value)} className={selectCls}>
                    {FONT_STYLES.map((f) => <option key={f}>{f}</option>)}
                </select>
                </Field>

                <Field label="Text Color">
                <div className="flex items-center gap-3">
                    <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)}
                    className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5 bg-white" />
                    <span className="text-sm text-gray-600 font-mono">{textColor}</span>
                    <div className="flex-1 h-10 rounded-xl border border-gray-200"
                    style={{ backgroundColor: textColor, opacity: 0.15 }} />
                </div>
                </Field>

                <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700">
                <span>💡</span>
                <p>Our design team will create a preview and send it to you within <strong>24–48 hours</strong> for approval.</p>
                </div>
            </div>
            )}
        </Field>

        </div>
    </SectionCard>

    {/* Bulk Order */}
    <SectionCard title="Order Type" icon="📦">
        <div className="flex flex-col gap-4">
        <div className="flex gap-3">
            <ToggleBtn active={!bulkOrder} onClick={() => setBulkOrder(false)}>
            🛍️ Single Design
            </ToggleBtn>
            <ToggleBtn active={bulkOrder} onClick={() => setBulkOrder(true)}>
            📋 Bulk Order
            </ToggleBtn>
        </div>

        {bulkOrder ? (
            <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs text-blue-700">
                <span className="mt-0.5">📊</span>
                <div>
                <p className="font-bold mb-1">Bulk Order Personalization</p>
                <p>Upload a CSV or Excel file with columns: <strong>Name, Date, Message</strong>. Each row will be a unique clock.</p>
                </div>
            </div>
            <div
                onClick={() => csvRef.current.click()}
                className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-6 cursor-pointer transition group ${
                errors.csvFile ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-red-300 hover:bg-red-50"
                }`}
            >
                <span className="text-3xl group-hover:scale-110 transition-transform">{csvFile ? "✅" : "📊"}</span>
                {csvFile ? (
                <p className="text-xs text-center text-green-700 font-semibold break-all">{csvFile.name}</p>
                ) : (
                <>
                    <p className="text-sm font-semibold text-gray-500">Upload CSV / Excel file</p>
                    <p className="text-xs text-gray-400">.csv, .xlsx, .xls accepted</p>
                </>
                )}
                <input ref={csvRef} type="file" accept=".csv,.xlsx,.xls"
                className="hidden" onChange={(e) => setCsvFile(e.target.files[0] || null)} />
            </div>
            {errors.csvFile && <p className="text-[11px] text-red-500">{errors.csvFile}</p>}
            </div>
        ) : (
            <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-xl p-4 text-sm text-green-700">
            <span className="mt-0.5">✅</span>
            <p>Single design mode — one artwork will be applied to all units in your order.</p>
            </div>
        )}
        </div>
    </SectionCard>

    {/* Add-ons */}
    <SectionCard title="Add-ons & Upgrades" icon="⭐">
        <div className="flex flex-col gap-3">
        <AddOnToggle
            label="Silent Mechanism Upgrade"
            sublabel="Whisper-quiet sweep movement — no ticking sound at all"
            icon="🤫" priceLabel="+₱40"
            checked={silentMechanism} onChange={() => setSilentMechanism(!silentMechanism)}
        />
        <AddOnToggle
            label="Glow-in-the-Dark Numbers"
            sublabel="Luminous hour markers visible in low light and darkness"
            icon="🌟" priceLabel="+₱20"
            checked={glowNumbers} onChange={() => setGlowNumbers(!glowNumbers)}
        />
        <AddOnToggle
            label="Metallic Hands Upgrade"
            sublabel="Gold or silver metallic clock hands for a premium look"
            icon="✨" priceLabel="+₱25"
            checked={metallicHands} onChange={() => setMetallicHands(!metallicHands)}
        />
        <AddOnToggle
            label="Custom Packaging (Gift Box)"
            sublabel="Branded gift box with tissue wrap — perfect for gifting"
            icon="🎁" priceLabel="+₱30"
            checked={customPackaging} onChange={() => setCustomPackaging(!customPackaging)}
        />
        <AddOnToggle
            label="Battery Inclusion"
            sublabel="AA battery included — ready to hang right out of the box"
            icon="🔋" priceLabel="+₱10"
            checked={batteryInclusion} onChange={() => setBatteryInclusion(!batteryInclusion)}
        />
        </div>
    </SectionCard>

    {/* Delivery */}
    <SectionCard title="Delivery" icon="📦">
        <div className="flex flex-col gap-4">
        <Field label="Delivery Method" required>
            <div className="flex gap-3">
            <ToggleBtn active={delivery === "Pickup"} onClick={() => setDelivery("Pickup")}>
                🏪 Pickup
            </ToggleBtn>
            <ToggleBtn active={delivery === "Delivery"} onClick={() => setDelivery("Delivery")}>
                📦 Delivery
            </ToggleBtn>
            </div>
        </Field>

        {delivery === "Delivery" && (
            <Field label="Delivery Address" required>
            <textarea value={address} onChange={(e) => setAddress(e.target.value)}
                rows={2} placeholder="Enter your full delivery address..."
                className={inputCls + " resize-none" + (errors.address ? " border-red-400 ring-1 ring-red-300" : "")} />
            {errors.address && <p className="text-[11px] text-red-500 mt-1">{errors.address}</p>}
            </Field>
        )}

        {delivery === "Pickup" && (
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
            <span className="mt-0.5">📍</span>
            <p>You selected <strong>Pickup</strong>. We'll contact you when your order is ready at our store.</p>
            </div>
        )}
        </div>
    </SectionCard>

    </div>

    {/* ── RIGHT: Sidebar ─────────────────────────────── */}
    <div className="xl:col-span-1">
    <div className="sticky top-35 flex flex-col gap-4">

        {/* Live Preview */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50">
            <span className="text-xl">🕐</span>
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-600">Live Preview</h2>
        </div>
        <div className="px-6 py-6 flex justify-center bg-gray-50 min-h-52 items-center">
            <ClockPreview
            clockType={clockType}
            shape={shape}
            size={effectiveSize}
            material={material}
            glowNumbers={glowNumbers}
            metallicHands={metallicHands}
            printStyle={printStyle}
            />
        </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-red-500">
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

        {/* Price Breakdown */}
        <div className="px-6 py-4 flex flex-col gap-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Price Breakdown</p>
            <div className="flex justify-between text-sm">
            <span className="text-gray-400">Base price</span>
            <span className="font-semibold text-gray-700">₱250</span>
            </div>
            {material === "Acrylic" && (
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">Acrylic material</span>
                <span className="font-semibold text-gray-700">+₱50</span>
            </div>
            )}
            {material === "Wood" && (
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">Wood material</span>
                <span className="font-semibold text-gray-700">+₱60</span>
            </div>
            )}
            {material === "Glass" && (
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">Glass material</span>
                <span className="font-semibold text-gray-700">+₱70</span>
            </div>
            )}
            {effectiveSize === "Large (12 inches)" && (
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">Large size</span>
                <span className="font-semibold text-gray-700">+₱30</span>
            </div>
            )}
            {effectiveSize === "Extra Large (14+ inches)" && (
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">Extra large size</span>
                <span className="font-semibold text-gray-700">+₱50</span>
            </div>
            )}
            {silentMechanism && (
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">Silent mechanism</span>
                <span className="font-semibold text-gray-700">+₱40</span>
            </div>
            )}
            {glowNumbers && (
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">Glow numbers</span>
                <span className="font-semibold text-gray-700">+₱20</span>
            </div>
            )}
            {metallicHands && (
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">Metallic hands</span>
                <span className="font-semibold text-gray-700">+₱25</span>
            </div>
            )}
            {customPackaging && (
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">Custom packaging</span>
                <span className="font-semibold text-gray-700">+₱30</span>
            </div>
            )}
            {batteryInclusion && (
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">Battery inclusion</span>
                <span className="font-semibold text-gray-700">+₱10</span>
            </div>
            )}

            <div className="flex justify-between text-sm border-t border-gray-100 pt-2 mt-1">
            <span className="text-gray-400">Unit price</span>
            <span className="font-semibold text-gray-700">₱{unitPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
            <span className="text-gray-400">× {quantity} unit{quantity !== 1 ? "s" : ""}</span>
            <span className="font-semibold text-gray-700"></span>
            </div>

            <div className="mt-2 flex items-center justify-between py-3 px-4 bg-red-50 rounded-xl border border-red-100">
            <span className="text-sm font-black text-gray-700 uppercase tracking-wide">Total</span>
            <span className="text-2xl font-black text-red-600">₱{total.toLocaleString()}</span>
            </div>
        </div>

        <div className="px-6 pb-6 flex flex-col gap-3">
            <button type="button" onClick={handleSubmit}
            className="w-full py-4 bg-red-500 hover:bg-red-600 active:scale-[.98] text-white text-sm font-black uppercase tracking-widest rounded-xl shadow-lg shadow-red-200 transition-all">
            Submit Order →
            </button>
            <p className="text-[11px] text-gray-400 text-center">
            * Final price may vary based on design complexity. Our team will confirm before production.
            </p>
        </div>
        </div>

        {/* Help Card */}
        <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-5">
        <p className="text-xs font-black uppercase tracking-widest text-yellow-700 mb-2">Need Help?</p>
        <p className="text-xs text-yellow-700 leading-relaxed">
            Not sure about materials or sizes? Message us on Facebook or email{" "}
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