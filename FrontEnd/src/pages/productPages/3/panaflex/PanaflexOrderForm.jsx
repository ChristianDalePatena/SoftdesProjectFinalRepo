import { useState, useRef, useEffect } from "react"

// ── Shared primitives ──────────────────────────────────────────────────────────
const inputCls =
"w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 " +
"focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition placeholder:text-gray-400"

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

function ToggleBtn({ active, onClick, children }) {
return (
<button
    type="button"
    onClick={onClick}
    className={`flex-1 py-2.5 text-sm font-bold border rounded-xl transition-all ${
    active
        ? "bg-red-500 text-white border-red-500 shadow-sm shadow-red-200"
        : "bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:text-red-500"
    }`}
>
    {children}
</button>
)
}

function RadioCard({ label, sublabel, badge, active, onClick, icon }) {
return (
<button
    type="button"
    onClick={onClick}
    className={`flex items-start gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all w-full ${
    active ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:border-red-300"
    }`}
>
    {icon && <span className="text-xl mt-0.5 shrink-0">{icon}</span>}
    <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 ${active ? "border-red-500 bg-red-500" : "border-gray-300"}`} />
    <div className="flex-1 min-w-0">
    <div className="flex items-center gap-2 flex-wrap">
        <p className={`text-sm font-bold ${active ? "text-red-700" : "text-gray-700"}`}>{label}</p>
        {badge && (
        <span className="text-[10px] font-bold text-red-500 bg-red-50 border border-red-100 px-1.5 py-0.5 rounded-full">{badge}</span>
        )}
    </div>
    {sublabel && <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">{sublabel}</p>}
    </div>
</button>
)
}

function CardToggle({ label, sublabel, icon, active, onClick, badge }) {
return (
<button
    type="button"
    onClick={onClick}
    className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all w-full ${
    active ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:border-red-300"
    }`}
>
    <span className="text-xl shrink-0">{icon}</span>
    <div className="flex-1 min-w-0">
    <div className="flex items-center gap-2 flex-wrap">
        <p className={`text-sm font-bold ${active ? "text-red-700" : "text-gray-700"}`}>{label}</p>
        {badge && <span className="text-[10px] font-bold text-red-500 bg-red-50 border border-red-100 px-1.5 py-0.5 rounded-full">{badge}</span>}
    </div>
    {sublabel && <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">{sublabel}</p>}
    </div>
    <div className={`w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center transition-all ${active ? "bg-red-500 border-red-500" : "border-gray-300"}`}>
    {active && <span className="text-white text-[10px] font-black">✓</span>}
    </div>
</button>
)
}

// ── Banner live preview ────────────────────────────────────────────────────────
function BannerPreview({ width, height, material, quality, eyelets, rope, usage }) {
const w = parseFloat(width) || 4
const h = parseFloat(height) || 6
const aspect = Math.min(Math.max(w / h, 0.4), 3)

const previewW = Math.round(120 * Math.min(aspect, 1.8))
const previewH = Math.round(previewW / aspect)
const clampedH = Math.min(Math.max(previewH, 40), 110)
const clampedW = Math.round(clampedH * aspect)

const bgColor = material === "Backlit (for lightboxes)"
? "linear-gradient(135deg, #1e3a5f 0%, #2563eb 50%, #1e3a5f 100%)"
: "linear-gradient(135deg, #1f2937 0%, #374151 50%, #1f2937 100%)"

const glowStyle = material === "Backlit (for lightboxes)"
? { boxShadow: "0 0 20px rgba(37,99,235,0.5), 0 0 40px rgba(37,99,235,0.2)" }
: {}

const usageEmoji = {
"Store Signage": "🏪", Billboard: "🏙️", "Event Banner": "🎉",
"Promotional Ad": "📢", Others: "📌",
}[usage] || "🖼️"

return (
<div className="flex flex-col items-center gap-3">
    <div className="relative w-full h-40 rounded-xl border border-gray-200 bg-linear-to-br from-gray-100 to-gray-50 flex items-center justify-center overflow-hidden">
    {/* Sky/wall background */}
    <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, #9ca3af 0px, #9ca3af 1px, transparent 1px, transparent 24px), repeating-linear-gradient(90deg, #9ca3af 0px, #9ca3af 1px, transparent 1px, transparent 24px)" }} />

    {/* Rope lines */}
    {rope && (
        <>
        <div className="absolute top-4 left-8 right-8 h-0.5 bg-yellow-600 opacity-60" style={{ top: `${(140 - clampedH) / 2 - 6}px` }} />
        </>
    )}

    {/* Banner body */}
    <div
        className="relative flex items-center justify-center rounded overflow-hidden"
        style={{ width: `${clampedW}px`, height: `${clampedH}px`, background: bgColor, ...glowStyle }}
    >
        {/* Quality shimmer */}
        {quality === "High Resolution" && (
        <div className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)" }} />
        )}

        {/* Content */}
        <div className="flex flex-col items-center gap-1 px-2 z-10">
        <span className="text-lg">{usageEmoji}</span>
        <div className="flex flex-col items-center gap-0.5 w-full">
            <div className="h-1 bg-white/40 rounded w-3/4" />
            <div className="h-0.5 bg-white/20 rounded w-1/2" />
        </div>
        </div>

        {/* Eyelets */}
        {eyelets && (
        <>
            <div className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-gray-300 border border-gray-400" />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-gray-300 border border-gray-400" />
            <div className="absolute bottom-1.5 left-1.5 w-2 h-2 rounded-full bg-gray-300 border border-gray-400" />
            <div className="absolute bottom-1.5 right-1.5 w-2 h-2 rounded-full bg-gray-300 border border-gray-400" />
        </>
        )}

        {/* Backlit glow effect */}
        {material === "Backlit (for lightboxes)" && (
        <div className="absolute inset-0 opacity-30"
            style={{ background: "radial-gradient(ellipse at center, rgba(255,255,255,0.3) 0%, transparent 70%)" }} />
        )}
    </div>

    {/* Size label */}
    <div className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm rounded-lg px-2 py-1 shadow text-[9px] font-bold text-gray-500 border border-gray-100">
        {w} × {h} ft · {material === "Backlit (for lightboxes)" ? "Backlit" : "Frontlit"}
    </div>

    {/* Area badge */}
    <div className="absolute bottom-2 left-2 bg-red-500/90 rounded-lg px-2 py-1 shadow text-[9px] font-bold text-white">
        {(w * h).toFixed(1)} sq.ft
    </div>
    </div>
    <p className="text-[10px] text-gray-400 italic">Live preview (approximate)</p>
</div>
)
}

// ── Presets ────────────────────────────────────────────────────────────────────
const PRESETS = [
{ label: "3×5 ft",  w: "3", h: "5" },
{ label: "4×6 ft",  w: "4", h: "6" },
{ label: "6×8 ft",  w: "6", h: "8" },
{ label: "Custom",  w: null, h: null },
]

// ── Pricing ────────────────────────────────────────────────────────────────────
const MATERIAL_BASE = { "Frontlit (standard)": 45, "Backlit (for lightboxes)": 65 }

function computePrice({ material, thickness, quality, inkType, eyelets, rope, frame, width, height, qty }) {
const w = parseFloat(width) || 0
const h = parseFloat(height) || 0
const area = w * h

let sqftRate = MATERIAL_BASE[material] ?? 45
if (thickness === "Heavy Duty")       sqftRate += 10
if (quality === "High Resolution")    sqftRate += 10
if (inkType === "UV Print")           sqftRate += 15

const printCost = area * sqftRate * qty
const addonCost = (eyelets ? 20 : 0) + (rope ? 30 : 0) + (frame ? 200 : 0)
const total = printCost + addonCost * qty

return { sqftRate, area, printCost, addonCost, total }
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function PanaFlexOrderForm() {
// A. Details
const [preset, setPreset]   = useState("4×6 ft")
const [width, setWidth]     = useState("4")
const [height, setHeight]   = useState("6")
const [unit, setUnit]       = useState("ft")
const [qty, setQty]         = useState(1)

// B. Material
const [material, setMaterial]   = useState("Frontlit (standard)")
const [thickness, setThickness] = useState("Standard")

// C. Printing
const [quality, setQuality] = useState("Standard")
const [inkType, setInkType] = useState("Eco-Solvent")

// D. Finishing
const [eyelets, setEyelets] = useState(false)
const [rope, setRope]       = useState(false)
const [frame, setFrame]     = useState(false)

// E. Usage
const [usage, setUsage]           = useState("Store Signage")
const [otherUsage, setOtherUsage] = useState("")

// F. Design
const [file, setFile]                 = useState(null)
const [needsDesign, setNeedsDesign]   = useState(false)
const [instructions, setInstructions] = useState("")
const fileRef = useRef()

// G. Delivery
const [delivery, setDelivery] = useState("Pickup")
const [address, setAddress]   = useState("")

// Errors
const [errors, setErrors] = useState({})

// Sync presets
useEffect(() => {
const p = PRESETS.find((p) => p.label === preset)
if (p && p.w !== null) { setWidth(p.w); setHeight(p.h) }
}, [preset])

const validate = () => {
const e = {}
const w = parseFloat(width), h = parseFloat(height)
if (!w || w <= 0) e.width  = "Enter a valid width"
if (!h || h <= 0) e.height = "Enter a valid height"
if (!qty || qty < 1) e.qty = "Minimum quantity is 1"
if (delivery === "Delivery" && !address.trim()) e.address = "Please enter a delivery address"
setErrors(e)
return Object.keys(e).length === 0
}

const handleSubmit = () => {
if (!validate()) return
alert(`✅ Order submitted!\n\nPanaflex – ${width}×${height} ${unit}\nMaterial: ${material}\nQty: ${qty}\nTotal: ₱${total.toLocaleString()}`)
}

const { sqftRate, area, printCost, addonCost, total } = computePrice({
material, thickness, quality, inkType, eyelets, rope, frame, width, height, qty,
})

const USAGE_OPTIONS = [
{ val: "Store Signage",   icon: "🏪" },
{ val: "Billboard",       icon: "🏙️" },
{ val: "Event Banner",    icon: "🎉" },
{ val: "Promotional Ad",  icon: "📢" },
{ val: "Others",          icon: "📌" },
]

const summaryRows = [
{ label: "Size",        value: `${width || "—"} × ${height || "—"} ${unit}` },
{ label: "Area",        value: `${area.toFixed(2)} sq.${unit}` },
{ label: "Quantity",    value: `${qty} pc${qty > 1 ? "s" : ""}` },
{ label: "Material",    value: material },
{ label: "Thickness",   value: thickness },
{ label: "Print Quality", value: quality },
{ label: "Ink Type",    value: inkType },
{ label: "Usage",       value: usage === "Others" ? (otherUsage || "Others") : usage },
]

return (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

    {/* ── LEFT: Form ───────────────────────────────────── */}
    <div className="xl:col-span-2 flex flex-col gap-6">

    {/* Panaflex Details */}
    <SectionCard title="Panaflex Details" icon="🪧">
        <div className="flex flex-col gap-5">

        {/* Unit toggle */}
        <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Dimensions</span>
            <div className="flex border border-gray-200 rounded-xl overflow-hidden text-xs font-bold">
            {["ft", "m"].map((u) => (
                <button key={u} type="button" onClick={() => setUnit(u)}
                className={`px-4 py-1.5 transition-all ${unit === u ? "bg-red-500 text-white" : "bg-white text-gray-500 hover:bg-red-50"}`}>
                {u}
                </button>
            ))}
            </div>
        </div>

        {/* Presets */}
        <Field label="Preset Sizes">
            <div className="flex flex-wrap gap-2">
            {PRESETS.map(({ label }) => (
                <button key={label} type="button" onClick={() => setPreset(label)}
                className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                    preset === label
                    ? "bg-red-500 text-white border-red-500 shadow-sm"
                    : "bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:text-red-500"
                }`}>
                {label}
                </button>
            ))}
            </div>
        </Field>

        {/* W × H */}
        <div className="grid grid-cols-2 gap-4">
            <Field label={`Width (${unit})`} required>
            <input type="number" min={0.1} step={0.1} value={width}
                onChange={(e) => { setWidth(e.target.value); setPreset("Custom") }}
                className={inputCls + (errors.width ? " border-red-400 ring-1 ring-red-300" : "")}
                placeholder="e.g. 4" />
            {errors.width && <p className="text-[11px] text-red-500 mt-0.5">{errors.width}</p>}
            </Field>
            <Field label={`Height (${unit})`} required>
            <input type="number" min={0.1} step={0.1} value={height}
                onChange={(e) => { setHeight(e.target.value); setPreset("Custom") }}
                className={inputCls + (errors.height ? " border-red-400 ring-1 ring-red-300" : "")}
                placeholder="e.g. 6" />
            {errors.height && <p className="text-[11px] text-red-500 mt-0.5">{errors.height}</p>}
            </Field>
        </div>

        {/* Area display */}
        {parseFloat(width) > 0 && parseFloat(height) > 0 && (
            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
            <span className="text-lg">📐</span>
            <div className="flex-1">
                <p className="text-xs text-gray-500">Computed area</p>
                <p className="text-sm font-black text-gray-800">
                {(parseFloat(width) * parseFloat(height)).toFixed(2)} sq.{unit}
                </p>
            </div>
            <div className="text-right">
                <p className="text-xs text-gray-400">Base rate</p>
                <p className="text-sm font-black text-red-500">₱{sqftRate}/sq.{unit}</p>
            </div>
            </div>
        )}

        {/* Quantity */}
        <Field label="Quantity" hint="Number of panaflex prints" required>
            <div className="flex flex-col gap-2">
            <input type="number" min={1} value={qty}
                onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                className={inputCls + (errors.qty ? " border-red-400 ring-1 ring-red-300" : "")} />
            {errors.qty && <p className="text-[11px] text-red-500 mt-0.5">{errors.qty}</p>}
            <div className="flex gap-2 flex-wrap">
                {[1, 2, 5, 10, 20, 50].map((q) => (
                <button key={q} type="button" onClick={() => setQty(q)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                    qty === q ? "bg-red-500 text-white border-red-500" : "bg-white text-gray-500 border-gray-200 hover:border-red-300 hover:text-red-500"
                    }`}>{q}</button>
                ))}
            </div>
            </div>
        </Field>
        </div>
    </SectionCard>

    {/* Live Preview */}
    <SectionCard title="Banner Preview" icon="👁️">
        <BannerPreview
        width={width} height={height} material={material}
        quality={quality} eyelets={eyelets} rope={rope} usage={usage}
        />
    </SectionCard>

    {/* Material & Type */}
    <SectionCard title="Material & Type" icon="🧱">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <Field label="Material Type">
            <div className="flex flex-col gap-2">
            {[
                {
                val: "Frontlit (standard)",
                icon: "☀️",
                desc: "Lit from the front — standard outdoor banners, tarpaulins, and signage. Opaque vinyl with high-contrast print.",
                price: "₱45/sq.ft",
                },
                {
                val: "Backlit (for lightboxes)",
                icon: "💡",
                desc: "Translucent material — light passes through from behind. Used for illuminated signs and light-box displays.",
                price: "₱65/sq.ft",
                },
            ].map(({ val, icon, desc, price }) => (
                <button key={val} type="button" onClick={() => setMaterial(val)}
                className={`flex items-start gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                    material === val ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:border-red-300"
                }`}>
                <span className="text-xl mt-0.5 shrink-0">{icon}</span>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className={`text-sm font-bold ${material === val ? "text-red-700" : "text-gray-700"}`}>{val}</p>
                    <span className="text-[10px] font-bold text-gray-400">{price} base</span>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">{desc}</p>
                </div>
                <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 ${material === val ? "border-red-500 bg-red-500" : "border-gray-300"}`} />
                </button>
            ))}
            </div>
        </Field>

        <Field label="Thickness / Durability">
            <div className="flex flex-col gap-2">
            <RadioCard
                label="Standard"
                sublabel="280–340gsm vinyl — suitable for short-term outdoor use and indoor displays up to 3 months"
                active={thickness === "Standard"}
                onClick={() => setThickness("Standard")}
                icon="📄"
            />
            <RadioCard
                label="Heavy Duty"
                sublabel="440–500gsm reinforced vinyl — long-term outdoor exposure, high-wind locations, billboard grade"
                badge="+₱10/sq.ft"
                active={thickness === "Heavy Duty"}
                onClick={() => setThickness("Heavy Duty")}
                icon="🛡️"
            />
            </div>
        </Field>
        </div>
    </SectionCard>

    {/* Printing Options */}
    <SectionCard title="Printing Options" icon="🖨️">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <Field label="Print Quality">
            <div className="flex flex-col gap-2">
            <RadioCard
                label="Standard"
                sublabel="720 DPI — sharp output for viewing distances over 2 meters. Ideal for most signage applications."
                active={quality === "Standard"}
                onClick={() => setQuality("Standard")}
                icon="🖼️"
            />
            <RadioCard
                label="High Resolution"
                sublabel="1440 DPI — ultra-sharp for close-up viewing, retail displays, and premium presentation banners."
                badge="+₱10/sq.ft"
                active={quality === "High Resolution"}
                onClick={() => setQuality("High Resolution")}
                icon="🔍"
            />
            </div>
        </Field>

        <Field label="Ink Type">
            <div className="flex flex-col gap-2">
            <RadioCard
                label="Eco-Solvent"
                sublabel="Water-resistant inks — fade-resistant for outdoor use up to 2 years. Standard for most panaflex applications."
                active={inkType === "Eco-Solvent"}
                onClick={() => setInkType("Eco-Solvent")}
                icon="💧"
            />
            <RadioCard
                label="UV Print"
                sublabel="UV-cured inks — scratch and abrasion resistant, vibrant colors, superior longevity for premium installations."
                badge="+₱15/sq.ft"
                active={inkType === "UV Print"}
                onClick={() => setInkType("UV Print")}
                icon="☀️"
            />
            </div>
        </Field>
        </div>
    </SectionCard>

    {/* Finishing & Installation */}
    <SectionCard title="Finishing & Installation" icon="🔧">
        <div className="flex flex-col gap-3">
        <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700 mb-1">
            <span className="shrink-0">ℹ️</span>
            <p>Add-on costs apply per piece. Frame installation includes basic aluminum frame setup at your specified location (Metro Manila only).</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <CardToggle
            label="Eyelets"
            sublabel="+₱20 — metal grommets for hanging, strapping, or rope attachment"
            icon="⭕"
            badge="+₱20"
            active={eyelets}
            onClick={() => setEyelets(!eyelets)}
            />
            <CardToggle
            label="Rope"
            sublabel="+₱30 — durable nylon rope pre-threaded through eyelets for easy hanging"
            icon="🪢"
            badge="+₱30"
            active={rope}
            onClick={() => setRope(!rope)}
            />
            <CardToggle
            label="Frame Installation"
            sublabel="+₱200 — aluminum frame assembly and basic on-site installation"
            icon="🖼️"
            badge="+₱200"
            active={frame}
            onClick={() => setFrame(!frame)}
            />
        </div>
        {rope && !eyelets && (
            <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800">
            <span className="shrink-0">⚠️</span>
            <p>Rope requires eyelets for attachment. Consider enabling <strong>Eyelets</strong> as well.</p>
            </div>
        )}
        </div>
    </SectionCard>

    {/* Usage Type */}
    <SectionCard title="Usage Type" icon="📍">
        <div className="flex flex-col gap-4">
        <Field label="Where will this be displayed?" hint="Helps us optimize print settings for your environment">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {USAGE_OPTIONS.map(({ val, icon }) => (
                <button key={val} type="button" onClick={() => setUsage(val)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-xs font-bold text-left transition-all ${
                    usage === val ? "border-red-500 bg-red-50 text-red-700" : "border-gray-200 bg-white text-gray-600 hover:border-red-300"
                }`}>
                <span className="text-base">{icon}</span>
                {val}
                </button>
            ))}
            </div>
        </Field>
        {usage === "Others" && (
            <Field label="Specify Usage">
            <input type="text" value={otherUsage} onChange={(e) => setOtherUsage(e.target.value)}
                placeholder="e.g. Church backdrop, school event, construction hoarding..."
                className={inputCls} />
            </Field>
        )}

        {/* Environment tips */}
        {usage === "Billboard" && (
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700">
            <span>🏙️</span>
            <p><strong>Billboard tip:</strong> We recommend Heavy Duty thickness + UV Print ink for long-term outdoor billboard installations.</p>
            </div>
        )}
        {usage === "Event Banner" && (
            <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-xl p-3 text-xs text-green-700">
            <span>🎉</span>
            <p><strong>Event tip:</strong> Eyelets + Rope makes setup easy for stage backdrops, entrance banners, and photo walls.</p>
            </div>
        )}
        </div>
    </SectionCard>

    {/* Design */}
    <SectionCard title="Design" icon="🎨">
        <div className="flex flex-col gap-5">
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
            <span className="shrink-0">⚠️</span>
            <p>
            For large-format printing, provide files at <strong>100 DPI at full size</strong> (or 300 DPI at 1/3 scale).
            Use <strong>CMYK color mode</strong> and maintain a <strong>5mm bleed</strong> on all sides.
            </p>
        </div>

        <Field label="Upload Design File" hint="PNG, JPG, PDF, AI, EPS · CMYK preferred · Max file size 500MB">
            <div
            onClick={() => fileRef.current.click()}
            className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl p-6 cursor-pointer hover:border-red-300 hover:bg-red-50 transition group"
            >
            <span className="text-3xl group-hover:scale-110 transition-transform">{file ? "✅" : "📁"}</span>
            {file ? (
                <p className="text-xs text-center text-green-700 font-semibold break-all">{file.name}</p>
            ) : (
                <>
                <p className="text-xs text-gray-500 text-center font-semibold">Click to browse or drag & drop your artwork</p>
                <p className="text-[11px] text-gray-400">PDF or AI file preferred for large-format output</p>
                </>
            )}
            <input ref={fileRef} type="file" accept="image/*,.pdf,.ai,.eps" className="hidden"
                onChange={(e) => setFile(e.target.files[0] || null)} />
            </div>
        </Field>

        {file && (
            <div className="flex items-center justify-between bg-green-50 border border-green-100 rounded-xl px-4 py-3">
            <div className="flex items-center gap-2">
                <span>📎</span>
                <span className="text-xs font-semibold text-green-700 break-all">{file.name}</span>
            </div>
            <button type="button" onClick={() => setFile(null)}
                className="text-xs text-red-400 hover:text-red-600 font-bold ml-2 shrink-0">Remove</button>
            </div>
        )}

        <label className="flex items-start gap-3 cursor-pointer select-none group">
            <div
            onClick={() => setNeedsDesign(!needsDesign)}
            className={`mt-0.5 w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center transition-all ${
                needsDesign ? "bg-red-500 border-red-500" : "bg-white border-gray-300 group-hover:border-red-400"
            }`}
            >
            {needsDesign && <span className="text-white text-[10px] font-black">✓</span>}
            </div>
            <span className="text-sm text-gray-700 leading-snug">
            I need <strong>design assistance</strong> — please help me create or refine my artwork.
            </span>
        </label>

        {needsDesign && (
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
            <span>🖌️</span>
            <p>Our large-format design team will reach out to discuss layout, typography, and safe zones. Additional design fees apply based on complexity.</p>
            </div>
        )}

        <Field label="Special Instructions" hint="Mounting direction, safe margins, color references, or site notes">
            <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={3}
            placeholder="e.g. Landscape orientation, text must be readable from 10 meters, match PMS 185 red..."
            className={inputCls + " resize-none"}
            />
        </Field>
        </div>
    </SectionCard>

    {/* Delivery */}
    <SectionCard title="Delivery Info" icon="🚚">
        <div className="flex flex-col gap-5">
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-800 mb-1">
            <span className="shrink-0">📦</span>
            <p>Large panaflex prints are rolled and packed in protective tubes. Delivery fees depend on size and location. Our team will advise on shipping costs.</p>
        </div>
        <Field label="Fulfillment Method">
            <div className="flex gap-3">
            <ToggleBtn active={delivery === "Pickup"} onClick={() => setDelivery("Pickup")}>🏪 Pickup</ToggleBtn>
            <ToggleBtn active={delivery === "Delivery"} onClick={() => setDelivery("Delivery")}>📦 Delivery</ToggleBtn>
            </div>
        </Field>
        {delivery === "Pickup" && (
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
            <span>📍</span>
            <p>Ready for pickup at our store. You'll receive an SMS notification when your order is ready for collection.</p>
            </div>
        )}
        {delivery === "Delivery" && (
            <Field label="Delivery Address" hint="Include barangay, city, and province" required>
            <textarea
                value={address} onChange={(e) => setAddress(e.target.value)} rows={2}
                placeholder="e.g. 45 Rizal Ave., Brgy. Poblacion, Makati City, Metro Manila"
                className={inputCls + " resize-none" + (errors.address ? " border-red-400 ring-1 ring-red-300" : "")}
            />
            {errors.address && <p className="text-[11px] text-red-500 mt-0.5">{errors.address}</p>}
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
            <span>Base rate ({material === "Frontlit (standard)" ? "Frontlit" : "Backlit"})</span>
            <span>₱{MATERIAL_BASE[material]}/sq.{unit}</span>
            </div>
            {thickness === "Heavy Duty" && (
            <div className="flex justify-between text-xs text-gray-500"><span>Heavy Duty</span><span>+₱10/sq.{unit}</span></div>
            )}
            {quality === "High Resolution" && (
            <div className="flex justify-between text-xs text-gray-500"><span>High Resolution</span><span>+₱10/sq.{unit}</span></div>
            )}
            {inkType === "UV Print" && (
            <div className="flex justify-between text-xs text-gray-500"><span>UV Print Ink</span><span>+₱15/sq.{unit}</span></div>
            )}

            <div className="flex justify-between text-xs text-gray-600 font-semibold border-t border-dashed border-gray-100 pt-1.5 mt-0.5">
            <span>Rate × {area.toFixed(2)} sq.{unit} × {qty} pc{qty > 1 ? "s" : ""}</span>
            <span>₱{printCost.toLocaleString()}</span>
            </div>

            {(eyelets || rope || frame) && (
            <>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-2 mb-0.5">Add-ons (per piece)</p>
                {eyelets && <div className="flex justify-between text-xs text-gray-500"><span>Eyelets</span><span>+₱20</span></div>}
                {rope    && <div className="flex justify-between text-xs text-gray-500"><span>Rope</span><span>+₱30</span></div>}
                {frame   && <div className="flex justify-between text-xs text-gray-500"><span>Frame Installation</span><span>+₱200</span></div>}
                <div className="flex justify-between text-xs text-gray-600 font-semibold border-t border-dashed border-gray-100 pt-1.5 mt-0.5">
                <span>Add-ons × {qty} pc{qty > 1 ? "s" : ""}</span>
                <span>₱{(addonCost * qty).toLocaleString()}</span>
                </div>
            </>
            )}
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
            Questions about material spec, installation, or artwork setup? Our large-format team is ready to assist.
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