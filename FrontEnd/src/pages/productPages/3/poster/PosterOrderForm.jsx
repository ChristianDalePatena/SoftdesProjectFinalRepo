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

function ToggleBtn({ active, onClick, children }) {
return (
<button
    type="button"
    onClick={onClick}
    className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-bold border transition-all ${
    active
        ? "bg-red-500 text-white border-red-500 shadow-sm shadow-red-200"
        : "bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:text-red-500"
    }`}
>
    {children}
</button>
)
}

function OptionCard({ active, onClick, icon, label, sublabel, badge }) {
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
    {icon && <span className="text-lg shrink-0">{icon}</span>}
    <div className="flex-1 min-w-0">
    <p className={`text-sm font-bold ${active ? "text-red-700" : "text-gray-700"}`}>{label}</p>
    {sublabel && <p className="text-[11px] text-gray-400 mt-0.5">{sublabel}</p>}
    </div>
    {badge && (
    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full shrink-0 ${active ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"}`}>
        {badge}
    </span>
    )}
</button>
)
}

function PillGroup({ options, value, onChange }) {
return (
<div className="flex flex-wrap gap-2">
    {options.map((opt) => {
    const val = typeof opt === "string" ? opt : opt.value
    const lbl = typeof opt === "string" ? opt : opt.label
    return (
        <button
        key={val}
        type="button"
        onClick={() => onChange(val)}
        className={`px-4 py-2 rounded-full text-xs font-bold border transition-all whitespace-nowrap ${
            val === value
            ? "bg-red-500 text-white border-red-500 shadow-sm shadow-red-200"
            : "bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:text-red-500"
        }`}
        >
        {lbl}
        </button>
    )
    })}
</div>
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
    <span className="text-2xl">{icon}</span>
    <div className="flex-1 min-w-0">
    <p className={`text-sm font-bold ${checked ? "text-red-700" : "text-gray-700"}`}>{label}</p>
    <p className="text-[11px] text-gray-400 truncate">{sublabel}</p>
    </div>
    <span className={`text-xs font-black px-2 py-1 rounded-lg shrink-0 ${checked ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"}`}>
    +₱{price}
    </span>
    <div className={`w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center transition-all ${checked ? "bg-red-500 border-red-500" : "border-gray-300"}`}>
    {checked && <span className="text-white text-[10px] font-black">✓</span>}
    </div>
</button>
)
}

// ── Poster Preview ─────────────────────────────────────────────────────────────
function PosterPreview({ size, orientation, colorMode, lamination, usageType, hasDesign }) {
const dims = {
"A4": { w: 60, h: 85 },
"A3": { w: 70, h: 99 },
"A2": { w: 80, h: 113 },
"A1": { w: 90, h: 127 },
"Custom": { w: 70, h: 99 },
}
const base = dims[size] || dims["A4"]
const w = orientation === "Landscape" ? base.h : base.w
const h = orientation === "Landscape" ? base.w : base.h

const bgColor = colorMode === "Black & White" ? "#f5f5f4" : "#ffffff"
const accentColor = colorMode === "Black & White" ? "#6b7280" : "#ef4444"
const shimmer = lamination === "Glossy"
? "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 60%)"
: "none"

const usageIcons = {
"Event Poster": "🎉",
"Movie Poster": "🎬",
"Educational Poster": "📚",
"Advertisement": "📢",
"Others": "🖼️",
}

return (
<div className="flex flex-col items-center gap-2">
    <div
    className="relative border border-gray-200 rounded overflow-hidden flex flex-col items-center justify-center"
    style={{
        width: w,
        height: h,
        background: bgColor,
        boxShadow: lamination !== "None" ? "3px 3px 10px rgba(0,0,0,0.15)" : "1px 1px 4px rgba(0,0,0,0.08)",
    }}
    >
    {/* Lamination shimmer overlay */}
    {lamination !== "None" && (
        <div className="absolute inset-0 pointer-events-none" style={{ background: shimmer }} />
    )}

    <div className="absolute inset-2 flex flex-col items-center justify-between p-1">
        {/* Top accent bar */}
        <div className="w-full h-1.5 rounded-full" style={{ background: accentColor, opacity: 0.7 }} />

        {/* Center content */}
        <div className="flex flex-col items-center gap-1 text-center flex-1 justify-center">
        {hasDesign ? (
            <>
            <span className="text-base">{usageIcons[usageType] || "🖼️"}</span>
            <div className="flex flex-col gap-0.5 w-full px-1">
                {[65, 45, 55, 40, 50].map((pct, i) => (
                <div
                    key={i}
                    className="h-0.5 rounded-full mx-auto"
                    style={{ width: `${pct}%`, background: colorMode === "Black & White" ? "#9ca3af" : "#fca5a5" }}
                />
                ))}
            </div>
            </>
        ) : (
            <div className="flex flex-col items-center gap-1 opacity-30">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
            </svg>
            <span className="text-[7px] text-gray-400">Poster</span>
            </div>
        )}
        </div>

        {/* Bottom accent bar */}
        <div className="w-full h-1 rounded-full" style={{ background: accentColor, opacity: 0.4 }} />
    </div>
    </div>
    <p className="text-[10px] text-gray-400 italic">{size} · {orientation}</p>
</div>
)
}

// ── Pricing Logic ──────────────────────────────────────────────────────────────
function computePrice({ size, qty, printQuality, colorMode, lamination, mounting, framing }) {
const basePrices = { "A4": 30, "A3": 60, "A2": 120, "A1": 200, "Custom": 150 }
let base = basePrices[size] || 150
if (printQuality === "High Resolution") base += 20
if (colorMode === "Full Color") base += 10
if (lamination === "Matte" || lamination === "Glossy") base += 15
if (mounting === "Foam Board") base += 50
if (mounting === "Sintra Board") base += 100
if (framing === "With Frame") base += 150
return { unitPrice: base, total: base * Math.max(1, qty) }
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function PosterOrderForm() {
// A. Poster Details
const [posterSize, setPosterSize]     = useState("A4")
const [customW, setCustomW]           = useState("")
const [customH, setCustomH]           = useState("")
const [orientation, setOrientation]   = useState("Portrait")
const [qty, setQty]                   = useState(1)

// B. Paper Options
const [paperType, setPaperType]       = useState("Glossy Paper")
const [paperWeight, setPaperWeight]   = useState("150 GSM")

// C. Printing Options
const [printQuality, setPrintQuality] = useState("Standard")
const [colorMode, setColorMode]       = useState("Full Color")

// D. Finishing
const [lamination, setLamination]     = useState("None")
const [mounting, setMounting]         = useState("None")
const [framing, setFraming]           = useState("None")

// E. Design
const [designFile, setDesignFile]     = useState(null)
const [needsDesign, setNeedsDesign]   = useState(false)
const [instructions, setInstructions] = useState("")
const designRef = useRef()

// F. Usage Type
const [usageType, setUsageType]       = useState("Event Poster")
const [otherUsage, setOtherUsage]     = useState("")

// G. Delivery
const [delivery, setDelivery]         = useState("Pickup")
const [address, setAddress]           = useState("")

const [errors, setErrors] = useState({})

const validate = () => {
const e = {}
if (!qty || qty < 1) e.qty = "Quantity must be at least 1"
if (posterSize === "Custom" && !customW.trim()) e.customW = "Enter width"
if (posterSize === "Custom" && !customH.trim()) e.customH = "Enter height"
if (!needsDesign && !designFile) e.design = "Please upload a design file or request design assistance"
if (usageType === "Others" && !otherUsage.trim()) e.otherUsage = "Please describe the usage type"
if (delivery === "Delivery" && !address.trim()) e.address = "Please enter a delivery address"
setErrors(e)
return Object.keys(e).length === 0
}

const handleSubmit = () => {
if (!validate()) return
alert(`✅ Order submitted!\n\nPoster – ${posterSize}\nPaper: ${paperType} · ${paperWeight}\nQty: ${qty.toLocaleString()} pc${qty !== 1 ? "s" : ""}\nTotal: ₱${pricing.total.toLocaleString()}`)
}

const pricing = computePrice({ size: posterSize, qty, printQuality, colorMode, lamination, mounting, framing })

const PAPER_TYPES = [
{ val: "Matte Paper",   icon: "🪵", desc: "Smooth, no-glare finish" },
{ val: "Glossy Paper",  icon: "✨", desc: "Shiny, vibrant colors" },
{ val: "Photo Paper",   icon: "📷", desc: "High-detail photo quality" },
{ val: "Art Paper",     icon: "🎨", desc: "Rich, gallery-grade texture" },
]

const USAGE_TYPES = ["Event Poster", "Movie Poster", "Educational Poster", "Advertisement", "Others"]

const summaryRows = [
{ label: "Size",          value: posterSize === "Custom" ? `Custom (${customW || "?"}×${customH || "?"})` : posterSize },
{ label: "Orientation",   value: orientation },
{ label: "Paper",         value: `${paperType} · ${paperWeight}` },
{ label: "Quality",       value: printQuality + (printQuality === "High Resolution" ? " (+₱20)" : "") },
{ label: "Color Mode",    value: colorMode + (colorMode === "Full Color" ? " (+₱10)" : "") },
{ label: "Quantity",      value: `${qty.toLocaleString()} pc${qty !== 1 ? "s" : ""}` },
...(lamination !== "None"    ? [{ label: "Lamination",  value: `${lamination} (+₱15)` }] : []),
...(mounting !== "None"      ? [{ label: "Mounting",    value: `${mounting} (+₱${mounting === "Foam Board" ? 50 : 100})` }] : []),
...(framing === "With Frame" ? [{ label: "Framing",     value: "With Frame (+₱150)" }] : []),
{ label: "Delivery",      value: delivery },
]

return (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

    {/* ── LEFT ───────────────────────────────────────── */}
    <div className="xl:col-span-2 flex flex-col gap-6">

    {/* Poster Details */}
    <SectionCard title="Poster Details" icon="🖼️">
        <div className="flex flex-col gap-5">

        <Field label="Poster Size" required>
            <select value={posterSize} onChange={(e) => setPosterSize(e.target.value)} className={selectCls}>
            {["A4", "A3", "A2", "A1", "Custom"].map((s) => (
                <option key={s}>{s}</option>
            ))}
            </select>
        </Field>

        {posterSize === "Custom" && (
            <div className="grid grid-cols-2 gap-3">
            <Field label="Width" hint="e.g. 45 cm, 18 in" required>
                <input
                type="text" value={customW}
                onChange={(e) => setCustomW(e.target.value)}
                placeholder="Width"
                className={inputCls + (errors.customW ? " border-red-400 ring-1 ring-red-300" : "")}
                />
                {errors.customW && <p className="text-[11px] text-red-500 mt-1">{errors.customW}</p>}
            </Field>
            <Field label="Height" hint="e.g. 60 cm, 24 in" required>
                <input
                type="text" value={customH}
                onChange={(e) => setCustomH(e.target.value)}
                placeholder="Height"
                className={inputCls + (errors.customH ? " border-red-400 ring-1 ring-red-300" : "")}
                />
                {errors.customH && <p className="text-[11px] text-red-500 mt-1">{errors.customH}</p>}
            </Field>
            </div>
        )}

        <Field label="Orientation">
            <div className="flex gap-3">
            <ToggleBtn active={orientation === "Portrait"} onClick={() => setOrientation("Portrait")}>
                📱 Portrait
            </ToggleBtn>
            <ToggleBtn active={orientation === "Landscape"} onClick={() => setOrientation("Landscape")}>
                🖥️ Landscape
            </ToggleBtn>
            </div>
        </Field>

        <Field label="Quantity" required>
            <input
            type="number" min={1} value={qty}
            onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
            className={inputCls + (errors.qty ? " border-red-400 ring-1 ring-red-300" : "")}
            />
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

    {/* Paper Options */}
    <SectionCard title="Paper Options" icon="📄">
        <div className="flex flex-col gap-5">

        <Field label="Paper Type">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PAPER_TYPES.map(({ val, icon, desc }) => (
                <OptionCard key={val} active={paperType === val} onClick={() => setPaperType(val)}
                icon={icon} label={val} sublabel={desc} />
            ))}
            </div>
        </Field>

        <Field label="Paper Weight (GSM)">
            <PillGroup
            options={["120 GSM", "150 GSM", "200 GSM", "250 GSM"]}
            value={paperWeight}
            onChange={setPaperWeight}
            />
            {(paperWeight === "200 GSM" || paperWeight === "250 GSM") && (
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-xl px-4 py-2 text-xs text-amber-700 mt-2">
                <span>📌</span>
                <span className="font-semibold">Premium weight selected — ideal for display and exhibition use.</span>
            </div>
            )}
        </Field>

        </div>
    </SectionCard>

    {/* Printing Options */}
    <SectionCard title="Printing Options" icon="🖨️">
        <div className="flex flex-col gap-5">

        <Field label="Print Quality">
            <div className="flex flex-col gap-2">
            <OptionCard
                active={printQuality === "Standard"}
                onClick={() => setPrintQuality("Standard")}
                icon="🖨️"
                label="Standard"
                sublabel="Great for everyday use and general display"
            />
            <OptionCard
                active={printQuality === "High Resolution"}
                onClick={() => setPrintQuality("High Resolution")}
                icon="🔬"
                label="High Resolution"
                sublabel="Crisp detail for photos, fine text, and premium displays"
                badge="+₱20"
            />
            </div>
        </Field>

        <Field label="Color Mode">
            <div className="flex gap-3">
            <ToggleBtn active={colorMode === "Full Color"} onClick={() => setColorMode("Full Color")}>
                🎨 Full Color <span className="text-[10px] font-black opacity-80 ml-1">+₱10</span>
            </ToggleBtn>
            <ToggleBtn active={colorMode === "Black & White"} onClick={() => setColorMode("Black & White")}>
                ⬛ Black & White
            </ToggleBtn>
            </div>
        </Field>

        </div>
    </SectionCard>

    {/* Finishing Options */}
    <SectionCard title="Finishing Options" icon="⭐">
        <div className="flex flex-col gap-5">

        <Field label="Lamination">
            <div className="flex flex-col gap-2">
            {[
                { val: "None",   icon: "❌", desc: "No coating applied" },
                { val: "Matte",  icon: "🪵", desc: "Smooth, fingerprint-resistant",   badge: "+₱15" },
                { val: "Glossy", icon: "✨", desc: "Shiny protective film",            badge: "+₱15" },
            ].map(({ val, icon, desc, badge }) => (
                <OptionCard key={val} active={lamination === val} onClick={() => setLamination(val)}
                icon={icon} label={val} sublabel={desc} badge={badge} />
            ))}
            </div>
        </Field>

        <Field label="Mounting">
            <div className="flex flex-col gap-2">
            {[
                { val: "None",         icon: "🚫", desc: "Poster only, no backing" },
                { val: "Foam Board",   icon: "🟦", desc: "Lightweight rigid backing",   badge: "+₱50" },
                { val: "Sintra Board", icon: "🔲", desc: "Durable PVC board backing",   badge: "+₱100" },
            ].map(({ val, icon, desc, badge }) => (
                <OptionCard key={val} active={mounting === val} onClick={() => setMounting(val)}
                icon={icon} label={val} sublabel={desc} badge={badge} />
            ))}
            </div>
        </Field>

        <Field label="Framing">
            <div className="flex gap-3">
            <ToggleBtn active={framing === "None"} onClick={() => setFraming("None")}>
                🚫 No Frame
            </ToggleBtn>
            <ToggleBtn active={framing === "With Frame"} onClick={() => setFraming("With Frame")}>
                🖼️ With Frame <span className="text-[10px] font-black opacity-80 ml-1">+₱150</span>
            </ToggleBtn>
            </div>
        </Field>

        </div>
    </SectionCard>

    {/* Design */}
    <SectionCard title="Design" icon="🎨">
        <div className="flex flex-col gap-5">

        {/* Preview in form */}
        <div className="flex justify-center py-3 bg-gray-50 rounded-xl border border-gray-100">
            <PosterPreview
            size={posterSize} orientation={orientation}
            colorMode={colorMode} lamination={lamination}
            usageType={usageType} hasDesign={!!designFile || needsDesign}
            />
        </div>

        <Field
            label="Upload Design File"
            hint="PNG, JPG, PDF, AI accepted · 300 DPI recommended · Max 100MB"
            required={!needsDesign}
        >
            <div
            onClick={() => designRef.current.click()}
            className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-8 cursor-pointer transition group ${
                errors.design ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-red-300 hover:bg-red-50"
            } ${needsDesign ? "opacity-50 pointer-events-none" : ""}`}
            >
            <span className="text-4xl group-hover:scale-110 transition-transform">{designFile ? "✅" : "🖼️"}</span>
            {designFile ? (
                <p className="text-xs text-center text-green-700 font-semibold break-all">{designFile.name}</p>
            ) : (
                <>
                <p className="text-sm font-semibold text-gray-500">Click to browse or drag & drop</p>
                <p className="text-xs text-gray-400">PNG, JPG, PDF, AI — print-ready preferred</p>
                </>
            )}
            <input
                ref={designRef} type="file"
                accept="image/*,.pdf,.ai,.eps"
                className="hidden"
                onChange={(e) => setDesignFile(e.target.files[0] || null)}
                disabled={needsDesign}
            />
            </div>
            {errors.design && <p className="text-[11px] text-red-500 mt-1">{errors.design}</p>}
            {!needsDesign && (
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700 mt-1">
                <span>💡</span>
                <p>For best results, supply files at <strong>300 DPI</strong> in CMYK mode with <strong>3mm bleed</strong> on all sides.</p>
            </div>
            )}
        </Field>

        {/* Design Assistance Checkbox */}
        <button
            type="button"
            onClick={() => { setNeedsDesign(!needsDesign); if (!needsDesign) setDesignFile(null) }}
            className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left w-full transition-all ${
            needsDesign ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:border-red-300"
            }`}
        >
            <span className="text-2xl">✏️</span>
            <div className="flex-1 min-w-0">
            <p className={`text-sm font-bold ${needsDesign ? "text-red-700" : "text-gray-700"}`}>
                I need design assistance
            </p>
            <p className="text-[11px] text-gray-400">Our team will create your poster. A proof will be sent before printing.</p>
            </div>
            <span className={`text-xs font-black px-2 py-1 rounded-lg shrink-0 ${needsDesign ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"}`}>
            Fees apply
            </span>
            <div className={`w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center transition-all ${needsDesign ? "bg-red-500 border-red-500" : "border-gray-300"}`}>
            {needsDesign && <span className="text-white text-[10px] font-black">✓</span>}
            </div>
        </button>

        <Field label="Special Instructions" hint="Notes about bleed, safe zones, custom requirements, etc.">
            <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={3}
            placeholder="e.g. Keep text 5mm from edges, use CMYK profile, match brand color #C0392B..."
            className={inputCls + " resize-none"}
            />
        </Field>

        </div>
    </SectionCard>

    {/* Usage Type */}
    <SectionCard title="Usage Type" icon="📌">
        <div className="flex flex-col gap-4">
        <Field label="What is this poster for?">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
                { val: "Event Poster",       icon: "🎉" },
                { val: "Movie Poster",        icon: "🎬" },
                { val: "Educational Poster",  icon: "📚" },
                { val: "Advertisement",       icon: "📢" },
                { val: "Others",              icon: "🖼️" },
            ].map(({ val, icon }) => (
                <button
                key={val}
                type="button"
                onClick={() => setUsageType(val)}
                className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border-2 text-xs font-bold text-center transition-all ${
                    usageType === val
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-red-300"
                }`}
                >
                <span className="text-xl">{icon}</span>
                {val}
                </button>
            ))}
            </div>
        </Field>

        {usageType === "Others" && (
            <Field label="Please describe" required>
            <input
                type="text" value={otherUsage}
                onChange={(e) => setOtherUsage(e.target.value)}
                placeholder="e.g. Safety reminder, store signage..."
                className={inputCls + (errors.otherUsage ? " border-red-400 ring-1 ring-red-300" : "")}
            />
            {errors.otherUsage && <p className="text-[11px] text-red-500 mt-1">{errors.otherUsage}</p>}
            </Field>
        )}
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
            <p>You'll receive an SMS when your poster is ready for pickup at our store.</p>
            </div>
        )}

        {delivery === "Delivery" && (
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

    {/* ── RIGHT: Sidebar ──────────────────────────────── */}
    <div className="xl:col-span-1">
    <div className="sticky top-35 flex flex-col gap-4">

        {/* Poster Preview Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-linear-to-r from-gray-50 to-white">
            <span className="text-xl">🖼️</span>
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-600">Poster Preview</h2>
        </div>
        <div className="px-6 py-5 flex justify-center bg-gray-50">
            <PosterPreview
            size={posterSize} orientation={orientation}
            colorMode={colorMode} lamination={lamination}
            usageType={usageType} hasDesign={!!designFile || needsDesign}
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
            <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-4 bg-red-500 hover:bg-red-600 active:scale-[.98] text-white text-sm font-black uppercase tracking-widest rounded-xl shadow-lg shadow-red-200 transition-all"
            >
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
            Not sure which paper or finish to choose? Message us on Facebook or email{" "}
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