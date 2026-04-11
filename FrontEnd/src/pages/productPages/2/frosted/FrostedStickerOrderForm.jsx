import { useState, useRef, useEffect } from "react"
// IMPORT ALL OUR BEAUTIFUL ICONS HERE
import { 
  FiMaximize, FiCloudSnow, FiScissors, FiTool, FiImage, FiGrid, FiTruck, 
  FiMapPin, FiPackage, FiUploadCloud, FiCheckCircle, FiMessageCircle, FiPhoneCall, FiInfo
} from "react-icons/fi";

// ── Primitives ─────────────────────────────────────────────────────────────────
const inputCls =
"w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 " +
"focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition placeholder:text-gray-400"

const selectCls = inputCls + " cursor-pointer"

function SectionCard({ title, icon, children, accent = false }) {
return (
<div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    <div className={`flex items-center gap-3 px-6 py-4 border-b border-gray-100 ${accent ? "bg-linear-to-r from-gray-50 to-white" : "bg-linear-to-r from-gray-50 to-white"}`}>
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
    {label}{required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {hint && <p className="text-[11px] text-gray-400 -mt-0.5">{hint}</p>}
    {children}
</div>
)
}

function ToggleBtn({ active, onClick, children, size = "md" }) {
const pad = size === "sm" ? "py-2 px-3 text-xs" : "py-2.5 px-4 text-sm"
return (
<button
    type="button" onClick={onClick}
    className={`flex-1 ${pad} rounded-xl font-bold border transition-all flex items-center justify-center gap-2 ${
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
    <button key={opt.value ?? opt} type="button"
        onClick={() => onChange(opt.value ?? opt)}
        className={`px-4 py-2 rounded-full text-xs font-bold border transition-all whitespace-nowrap ${
        (opt.value ?? opt) === value
            ? "bg-red-500 text-white border-red-500 shadow-sm shadow-red-200"
            : "bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:text-red-500"
        }`}
    >
        {opt.label ?? opt}
    </button>
    ))}
</div>
)
}

function Checkbox({ checked, onChange, children }) {
return (
<label className="flex items-start gap-3 cursor-pointer select-none group">
    <div
    onClick={onChange}
    className={`mt-0.5 w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center transition-all ${
        checked ? "bg-red-500 border-red-500" : "bg-white border-gray-300 group-hover:border-red-400"
    }`}
    >
    {checked && <span className="text-white text-[10px] font-black">✓</span>}
    </div>
    <span className="text-sm text-gray-700 leading-snug">{children}</span>
</label>
)
}

// ── Frosted glass preview ──────────────────────────────────────────────────────
function FrostPreview({ frostType, opacity, shape }) {
const opacityMap = { "Light (30%)": 0.3, "Medium (50%)": 0.5, "Heavy (70%)": 0.7 }
const alpha = opacityMap[opacity] ?? 0.5

const borderRadius =
shape === "Circle" ? "50%" : shape === "Custom Die-Cut" ? "18% 34% 22% 40%" : "8px"

const background =
frostType === "Gradient Frost (Top to Bottom)"
    ? `linear-gradient(to bottom, rgba(255,220,220,${alpha + 0.1}), rgba(255,220,220,${alpha - 0.1}))`
    : `rgba(255,220,220,${alpha})`

const filter =
frostType === "Sandblast Effect" ? "blur(0.6px) contrast(1.1)" : "blur(0.3px)"

return (
<div className="flex flex-col items-center gap-2">
    {/* Window backdrop */}
    <div className="relative w-full h-28 rounded-xl overflow-hidden border border-gray-200 bg-linear-to-br from-red-50 via-white to-red-100 flex items-center justify-center">
    {/* Simulated background content */}
    <div className="absolute inset-0 flex flex-col gap-2 p-4 opacity-30">
        <div className="h-2 bg-gray-400 rounded w-3/4" />
        <div className="h-2 bg-gray-300 rounded w-1/2" />
        <div className="h-2 bg-gray-400 rounded w-2/3" />
    </div>
    {/* Frosted pane */}
    <div
        className="relative z-10 w-20 h-20 border border-white/60 shadow-lg"
        style={{ background, filter, backdropFilter: `blur(${Math.round(alpha * 8)}px)`, borderRadius }}
    >
        {frostType === "Gradient Frost (Top to Bottom)" && (
        <div className="absolute inset-x-0 bottom-0 h-1/3 rounded-b-lg"
            style={{ background: `rgba(255,200,200,${alpha * 0.4})` }} />
        )}
        {frostType === "Sandblast Effect" && (
        <div className="absolute inset-0 opacity-20 rounded-[inherit]"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "cover" }} />
        )}
    </div>
    </div>
    <p className="text-[10px] text-gray-400 italic">Live preview (approximate)</p>
</div>
)
}

// ── Pricing ────────────────────────────────────────────────────────────────────
const PRESETS = [
{ label: "12×12", w: 12, h: 12 },
{ label: "24×24", w: 24, h: 24 },
{ label: "24×36", w: 24, h: 36 },
{ label: "Custom", w: null, h: null },
]

function computePrice({ widthIn, heightIn, unit, qty, frostType, cuttingType, withInstall, withTape }) {
const toIn = unit === "cm" ? 0.393701 : 1
const w = parseFloat(widthIn) * toIn || 0
const h = parseFloat(heightIn) * toIn || 0
const sqFt = (w * h) / 144

const BASE_PER_SQFT = 80
const gradientExtra = frostType === "Gradient Frost (Top to Bottom)" ? 20 : 0
const dieCutExtra = cuttingType === "Die Cut" ? 15 : 0
const installExtra = withInstall ? 200 : 0
const tapeExtra = withTape ? 50 : 0

const unitPrice = sqFt * (BASE_PER_SQFT + gradientExtra) + dieCutExtra
const total = unitPrice * qty + installExtra + tapeExtra
return { sqFt: sqFt.toFixed(2), unitPrice: unitPrice.toFixed(2), total: Math.max(0, total).toFixed(2) }
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function FrostedStickerOrderForm() {
// A. Size
const [preset, setPreset]   = useState("12×12")
const [width, setWidth]     = useState("12")
const [height, setHeight]   = useState("12")
const [unit, setUnit]       = useState("in")
const [qty, setQty]         = useState(1)

// B. Frost Style
const [frostType, setFrostType]   = useState("Standard Frosted")
const [opacity, setOpacity]       = useState("Medium (50%)")

// C. Shape & Cut
const [shape, setShape]           = useState("Square / Rectangle")
const [cuttingType, setCuttingType] = useState("Kiss Cut")

// D. Installation
const [withInstall, setWithInstall] = useState(false)
const [withTape, setWithTape]       = useState(false)

// E. Design
const [file, setFile]                 = useState(null)
const [needsDesign, setNeedsDesign]   = useState(false)
const [instructions, setInstructions] = useState("")
const fileRef = useRef()

// F. Usage
const [usage, setUsage]       = useState("Office Glass")
const [otherUsage, setOtherUsage] = useState("")

// G. Delivery
const [delivery, setDelivery] = useState("Pickup")
const [address, setAddress]   = useState("")

// Errors
const [errors, setErrors] = useState({})

// Apply preset
useEffect(() => {
const p = PRESETS.find((p) => p.label === preset)
if (p && p.w !== null) { setWidth(String(p.w)); setHeight(String(p.h)) }
}, [preset])

const validate = () => {
const e = {}
if (!parseFloat(width) || parseFloat(width) <= 0) e.width = "Enter a valid width"
if (!parseFloat(height) || parseFloat(height) <= 0) e.height = "Enter a valid height"
if (qty < 1) e.qty = "Quantity must be at least 1"
if (delivery === "Delivery" && !address.trim()) e.address = "Please enter a delivery address"
setErrors(e)
return Object.keys(e).length === 0
}

const handleSubmit = () => {
if (!validate()) return
alert(`✅ Order submitted!\n\nFrosted Sticker – ${frostType}\nSize: ${width}×${height} ${unit}\nQty: ${qty}\nTotal: ₱${pricing.total}`)
}

const pricing = computePrice({ widthIn: width, heightIn: height, unit, qty, frostType, cuttingType, withInstall, withTape })

const USAGE_OPTS = ["Office Glass", "Storefront", "Bathroom / Privacy", "Decorative", "Others"]

const summaryRows = [
{ label: "Size",         value: `${width || "—"} × ${height || "—"} ${unit}` },
{ label: "Area",         value: `${pricing.sqFt} sq.ft` },
{ label: "Quantity",     value: `${qty} pc${qty > 1 ? "s" : ""}` },
{ label: "Frost Type",   value: frostType },
{ label: "Opacity",      value: opacity },
{ label: "Shape",        value: shape },
{ label: "Cutting",      value: cuttingType },
...(cuttingType === "Die Cut" ? [{ label: "Die-Cut Fee", value: `+₱15/pc` }] : []),
...(frostType === "Gradient Frost (Top to Bottom)" ? [{ label: "Gradient", value: "+₱20/sq.ft" }] : []),
...(withInstall ? [{ label: "Installation", value: "+₱200" }] : []),
...(withTape    ? [{ label: "Transfer Tape", value: "+₱50" }]  : []),
...(usage === "Others" ? [{ label: "Usage", value: otherUsage || "Others" }] : [{ label: "Usage", value: usage }]),
]

return (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

    {/* ── LEFT ─────────────────────────────────────────── */}
    <div className="xl:col-span-2 flex flex-col gap-6">

    {/* Sticker Details */}
    <SectionCard title="Sticker Details" icon={<FiMaximize />} accent>
        <div className="flex flex-col gap-5">

        {/* Unit toggle */}
        <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Dimensions</span>
            <div className="flex border border-gray-200 rounded-xl overflow-hidden text-xs font-bold">
            {["in", "cm"].map((u) => (
                <button key={u} type="button" onClick={() => setUnit(u)}
                className={`px-4 py-1.5 transition-all ${unit === u ? "bg-red-500 text-white" : "bg-white text-gray-500 hover:bg-red-50"}`}>
                {u}
                </button>
            ))}
            </div>
        </div>

        {/* Preset pills */}
        <Field label="Preset Sizes">
            <PillGroup
            options={PRESETS.map((p) => ({ label: p.label, value: p.label }))}
            value={preset}
            onChange={setPreset}
            />
        </Field>

        {/* W × H inputs */}
        <div className="grid grid-cols-2 gap-4">
            <Field label={`Width (${unit})`} required>
            <input type="number" min={0.1} step={0.1} value={width}
                onChange={(e) => { setWidth(e.target.value); setPreset("Custom") }}
                className={inputCls + (errors.width ? " border-red-400 ring-1 ring-red-300" : "")} />
            {errors.width && <p className="text-[11px] text-red-500 mt-0.5">{errors.width}</p>}
            </Field>
            <Field label={`Height (${unit})`} required>
            <input type="number" min={0.1} step={0.1} value={height}
                onChange={(e) => { setHeight(e.target.value); setPreset("Custom") }}
                className={inputCls + (errors.height ? " border-red-400 ring-1 ring-red-300" : "")} />
            {errors.height && <p className="text-[11px] text-red-500 mt-0.5">{errors.height}</p>}
            </Field>
        </div>

        {/* Area badge */}
        {parseFloat(width) > 0 && parseFloat(height) > 0 && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5 text-sm">
            <FiMaximize className="text-red-500" />
            <span className="text-red-700 font-semibold">
                Area: {width} × {height} {unit} = <strong>{pricing.sqFt} sq.ft</strong>
            </span>
            </div>
        )}

        <Field label="Quantity" required>
            <input type="number" min={1} value={qty}
            onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
            className={inputCls + (errors.qty ? " border-red-400 ring-1 ring-red-300" : "")} />
            {errors.qty && <p className="text-[11px] text-red-500 mt-0.5">{errors.qty}</p>}
        </Field>
        </div>
    </SectionCard>

    {/* Frosted Style */}
    <SectionCard title="Frosted Style" icon={<FiCloudSnow />} accent>
        <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-5">
            <Field label="Frost Type">
                <div className="flex flex-col gap-2">
                {["Standard Frosted", "Sandblast Effect", "Gradient Frost (Top to Bottom)"].map((t) => (
                    <button key={t} type="button" onClick={() => setFrostType(t)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left text-sm font-semibold transition-all ${
                        frostType === t
                        ? "border-red-500 bg-red-50 text-red-700"
                        : "border-gray-200 bg-white text-gray-600 hover:border-red-300"
                    }`}>
                    <div className={`w-4 h-4 rounded-full border-2 shrink-0 transition-all ${frostType === t ? "border-red-500 bg-red-500" : "border-gray-300"}`} />
                    <span>{t}</span>
                    {t === "Gradient Frost (Top to Bottom)" && (
                        <span className="ml-auto text-[10px] bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-full">+₱20/sqft</span>
                    )}
                    </button>
                ))}
                </div>
            </Field>

            <Field label="Opacity Level">
                <div className="flex flex-col gap-2">
                {[
                    { val: "Light (30%)", bar: "w-1/3" },
                    { val: "Medium (50%)", bar: "w-1/2" },
                    { val: "Heavy (70%)", bar: "w-2/3" },
                ].map(({ val, bar }) => (
                    <button key={val} type="button" onClick={() => setOpacity(val)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 text-sm transition-all ${
                        opacity === val
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 bg-white hover:border-red-300"
                    }`}>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`${bar} h-full rounded-full ${opacity === val ? "bg-red-400" : "bg-gray-300"}`} />
                    </div>
                    <span className={`text-xs font-bold ${opacity === val ? "text-red-600" : "text-gray-500"}`}>{val}</span>
                    </button>
                ))}
                </div>
            </Field>
            </div>

            {/* Live Preview */}
            <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Live Preview</span>
            <FrostPreview frostType={frostType} opacity={opacity} shape={shape} />
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-xs text-gray-500 leading-relaxed">
                <p className="font-semibold text-gray-600 mb-1">About this style:</p>
                {frostType === "Standard Frosted" && <p>Classic even frost for privacy while allowing light to pass through. Ideal for office partitions.</p>}
                {frostType === "Sandblast Effect" && <p>Mimics the rough texture of sandblasted glass. Great for a premium, etched look without the cost.</p>}
                {frostType === "Gradient Frost (Top to Bottom)" && <p>Fades from frosted to clear, perfect for modern storefronts and stylish partitions.</p>}
            </div>
            </div>
        </div>
        </div>
    </SectionCard>

    {/* Shape & Cut */}
    <SectionCard title="Cutting & Shape" icon={<FiScissors />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Shape">
            <div className="flex flex-col gap-2">
            {[
                { val: "Square / Rectangle", desc: "Standard straight cut" },
                { val: "Circle", desc: "Perfect round cut" },
                { val: "Custom Die-Cut", desc: "Cut to shape" },
            ].map(({ val, desc }) => (
                <button key={val} type="button" onClick={() => setShape(val)}
                className={`flex items-start gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                    shape === val
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 bg-white hover:border-red-300"
                }`}>
                <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 transition-all ${shape === val ? "border-red-500 bg-red-500" : "border-gray-300"}`} />
                <div>
                    <p className={`text-sm font-bold ${shape === val ? "text-red-700" : "text-gray-700"}`}>{val}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>
                </div>
                </button>
            ))}
            </div>
        </Field>
        <Field label="Cutting Type">
            <div className="flex flex-col gap-2">
            {[
                { val: "Kiss Cut", desc: "Cut through vinyl only — sticker stays on backing" },
                { val: "Die Cut", desc: "Cut through all layers — individual pieces (+₱15/pc)" },
            ].map(({ val, desc }) => (
                <button key={val} type="button" onClick={() => setCuttingType(val)}
                className={`flex items-start gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                    cuttingType === val
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 bg-white hover:border-red-300"
                }`}>
                <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 transition-all ${
                    cuttingType === val ? "border-red-500 bg-red-500" : "border-gray-300"
                }`} />
                <div>
                    <p className={`text-sm font-bold ${cuttingType === val ? "text-red-700" : "text-gray-700"}`}>{val}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>
                </div>
                </button>
            ))}
            </div>
        </Field>
        </div>
    </SectionCard>

    {/* Installation */}
    <SectionCard title="Installation Options" icon={<FiTool />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
            { label: "Installation Service", sublabel: "+₱200 — our team applies for you", val: withInstall, set: setWithInstall },
            { label: "Transfer Tape",        sublabel: "+₱50 — for easy self-application", val: withTape,    set: setWithTape    },
        ].map(({ label, sublabel, val, set }) => (
            <button key={label} type="button" onClick={() => set(!val)}
            className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                val ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:border-red-300"
            }`}>
            <div className={`w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center transition-all ${
                val ? "bg-red-500 border-red-500" : "border-gray-300"
            }`}>
                {val && <span className="text-white text-[10px] font-black">✓</span>}
            </div>
            <div className="flex-1 min-w-0">
                <p className={`text-sm font-bold ${val ? "text-red-700" : "text-gray-700"}`}>{label}</p>
                <p className="text-[11px] text-gray-400 truncate">{sublabel}</p>
            </div>
            </button>
        ))}
        </div>
    </SectionCard>

    {/* Design */}
    <SectionCard title="Design" icon={<FiImage />}>
        <div className="flex flex-col gap-5">
        <Field label="Upload Design File" hint="PNG, JPG, PDF, AI accepted · Max 50MB">
            <div onClick={() => fileRef.current.click()}
            className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-200 rounded-xl p-8 cursor-pointer hover:border-red-300 hover:bg-red-50 transition group">
            <span className={`text-3xl transition-transform ${file ? "text-green-500" : "text-gray-400 group-hover:text-red-400 group-hover:scale-110"}`}>
                {file ? <FiCheckCircle /> : <FiUploadCloud />}
            </span>
            {file
                ? <p className="text-xs text-center text-green-700 font-semibold break-all">{file.name}</p>
                : <p className="text-xs text-gray-500 text-center font-semibold">Click to browse or drag & drop your artwork</p>
            }
            <input ref={fileRef} type="file" accept="image/*,.pdf,.ai,.eps" className="hidden"
                onChange={(e) => setFile(e.target.files || null)} />
            </div>
        </Field>
        <Checkbox checked={needsDesign} onChange={() => setNeedsDesign(!needsDesign)}>
            I need <strong>design assistance</strong> — please help me create or refine my artwork.
        </Checkbox>
        {needsDesign && (
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-700">
            <FiInfo className="mt-0.5 shrink-0 text-amber-500" />
            <p>Our design team will reach out to collect your branding assets. Additional fees may apply.</p>
            </div>
        )}
        <Field label="Special Instructions" hint="Fonts, colors, layout notes, logo placement, etc.">
            <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)}
            rows={3} placeholder="e.g. Use white text only, align pattern to center, avoid bottom 2 inches..."
            className={inputCls + " resize-none"} />
        </Field>
        </div>
    </SectionCard>

    {/* Usage Type */}
    <SectionCard title="Usage Type" icon={<FiGrid />}>
        <div className="flex flex-col gap-4">
        <Field label="Where will this sticker be applied?">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {USAGE_OPTS.map((opt) => (
                <button key={opt} type="button" onClick={() => setUsage(opt)}
                className={`px-3 py-2.5 rounded-xl border-2 text-xs font-bold text-center transition-all ${
                    usage === opt
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-red-300"
                }`}>
                {opt}
                </button>
            ))}
            </div>
        </Field>
        {usage === "Others" && (
            <Field label="Specify Usage">
            <input type="text" value={otherUsage} onChange={(e) => setOtherUsage(e.target.value)}
                placeholder="Describe your use case..." className={inputCls} />
            </Field>
        )}
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
            <FiMapPin className="mt-0.5 shrink-0 text-blue-500" />
            <p>Ready for pickup at our store. You'll receive an SMS notification when your order is ready.</p>
            </div>
        )}
        {delivery === "Delivery" && (
            <Field label="Delivery Address" hint="Include barangay, city, and province" required>
            <textarea value={address} onChange={(e) => setAddress(e.target.value)}
                rows={2} placeholder="e.g. 45 Rizal Ave., Brgy. Poblacion, Makati City, Metro Manila"
                className={inputCls + " resize-none" + (errors.address ? " border-red-400 ring-1 ring-red-300" : "")} />
            {errors.address && <p className="text-[11px] text-red-500 mt-0.5">{errors.address}</p>}
            </Field>
        )}
        </div>
    </SectionCard>
    </div>

    {/* ── RIGHT: Summary ───────────────────────────────── */}
    <div className="xl:col-span-1">
    <div className="sticky top-35 flex flex-col gap-4">

        {/* Summary card */}
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
            <span className="font-semibold text-gray-700">₱{parseFloat(pricing.unitPrice).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            {(withInstall || withTape) && (
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">Add-ons</span>
                <span className="font-semibold text-gray-700">
                +₱{((withInstall ? 200 : 0) + (withTape ? 50 : 0)).toLocaleString()}
                </span>
            </div>
            )}
            <div className="mt-2 flex items-center justify-between py-3 px-4 bg-red-50 rounded-xl border border-red-100">
            <span className="text-sm font-black text-gray-700 uppercase tracking-wide">Total</span>
            <span className="text-2xl font-black text-red-600">
                ₱{parseFloat(pricing.total).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
            </div>
        </div>

        <div className="px-6 pb-6">
            <button type="button" onClick={handleSubmit}
            className="w-full py-4 bg-red-500 hover:bg-red-600 active:scale-[.98] text-white text-sm font-black uppercase tracking-widest rounded-xl shadow-lg shadow-red-200 transition-all">
            Place Order
            </button>
        </div>
        </div>

        {/* Help card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-3">
            <FiMessageCircle className="text-lg text-gray-400" />
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-600">Need Help?</h3>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed mb-3">
            Not sure which frost type or opacity suits your space? Our team can assist.
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