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
    <span className="text-2xl shrink-0">{icon}</span>
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

// ── Backlit Preview ────────────────────────────────────────────────────────────
function BacklitPreview({ width, height, glow, material, includeFrame, hasDesign, usageType }) {
const maxW = 160
const maxH = 110
const ratio = (parseFloat(width) || 2) / (parseFloat(height) || 4)
let pw, ph
if (ratio > maxW / maxH) { pw = maxW; ph = Math.round(maxW / ratio) }
else { ph = maxH; pw = Math.round(maxH * ratio) }
pw = Math.max(pw, 60); ph = Math.max(ph, 50)

const glowColors = {
"Low Glow":       { inner: "rgba(255,240,180,0.18)", outer: "rgba(255,220,80,0.08)", border: "#fbbf24" },
"Medium Glow":    { inner: "rgba(255,220,100,0.32)", outer: "rgba(255,180,40,0.15)", border: "#f59e0b" },
"High Brightness":{ inner: "rgba(255,200,50,0.52)",  outer: "rgba(255,160,0,0.28)",  border: "#d97706" },
}
const gc = glowColors[glow] || glowColors["Medium Glow"]

const usageIcons = {
"Store Signage": "🏪", "Mall Advertisement": "🏬",
"Lightbox Display": "💡", "Event Booth": "🎪", "Others": "🔲",
}

const frameThickness = includeFrame ? 5 : 0

return (
<div className="flex flex-col items-center gap-3">
    {/* Glow halo */}
    <div
    className="relative flex items-center justify-center rounded-lg"
    style={{
        width: pw + frameThickness * 2 + 24,
        height: ph + frameThickness * 2 + 24,
        background: `radial-gradient(ellipse at center, ${gc.inner} 0%, ${gc.outer} 60%, transparent 80%)`,
    }}
    >
    {/* Frame */}
    {includeFrame && (
        <div
        className="absolute rounded-md"
        style={{
            width: pw + frameThickness * 2,
            height: ph + frameThickness * 2,
            background: "#374151",
            boxShadow: `0 0 12px 2px ${gc.border}55`,
        }}
        />
    )}

    {/* Panel */}
    <div
        className="relative rounded overflow-hidden flex flex-col items-center justify-center"
        style={{
        width: pw,
        height: ph,
        background: material === "Backlit Film (premium)"
            ? `linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #fde68a 100%)`
            : `linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)`,
        boxShadow: `0 0 ${glow === "High Brightness" ? 18 : glow === "Medium Glow" ? 10 : 5}px 2px ${gc.border}88`,
        border: `1px solid ${gc.border}66`,
        }}
    >
        {/* Light bleed from behind */}
        <div
        className="absolute inset-0 pointer-events-none rounded"
        style={{
            background: `radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.7) 0%, transparent 65%)`,
        }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-1 px-2 w-full text-center">
        {hasDesign ? (
            <>
            <span className="text-sm">{usageIcons[usageType] || "💡"}</span>
            <div className="flex flex-col gap-0.5 w-full items-center">
                {[70, 45, 60, 40, 55].map((pct, i) => (
                <div key={i} className="h-0.5 rounded-full bg-amber-400 opacity-60"
                    style={{ width: `${pct}%` }} />
                ))}
            </div>
            </>
        ) : (
            <div className="flex flex-col items-center gap-1 opacity-40">
            <span className="text-xs">💡</span>
            <span className="text-[7px] text-amber-700 font-bold">BACKLIT</span>
            </div>
        )}
        </div>
    </div>
    </div>

    {/* Glow label */}
    <div className="flex items-center gap-1.5">
    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: gc.border }} />
    <p className="text-[10px] text-gray-500 font-semibold">{glow}</p>
    </div>
    <p className="text-[9px] text-gray-400 italic -mt-1">
    {(parseFloat(width) || 2).toFixed(1)} × {(parseFloat(height) || 4).toFixed(1)} ft
    </p>
</div>
)
}

// ── Pricing ────────────────────────────────────────────────────────────────────
function computePrice({ width, height, qty, material, thickness, printQuality, installation, includeFrame }) {
const w = parseFloat(width) || 0
const h = parseFloat(height) || 0
const area = w * h

let ratePerSqFt = material === "Backlit Film (premium)" ? 80 : 60
if (printQuality === "High Resolution") ratePerSqFt += 15
if (thickness === "Heavy Duty") ratePerSqFt += 10

let printTotal = ratePerSqFt * area * Math.max(1, qty)
let addons = 0
if (includeFrame) addons += 300
if (installation === "Basic Installation") addons += 200
if (installation === "Full Installation") addons += 500

const total = printTotal + addons
return { ratePerSqFt, area: area.toFixed(2), printTotal, addons, total }
}

// ── PRESET SIZES ───────────────────────────────────────────────────────────────
const PRESETS = [
{ label: "2 × 4 ft",  w: "2", h: "4" },
{ label: "3 × 6 ft",  w: "3", h: "6" },
{ label: "4 × 8 ft",  w: "4", h: "8" },
{ label: "Custom",    w: "",  h: "" },
]

// ── Main Component ─────────────────────────────────────────────────────────────
export default function BacklitOrderForm() {
// A. Size & Qty
const [preset, setPreset]       = useState("2 × 4 ft")
const [width, setWidth]         = useState("2")
const [height, setHeight]       = useState("4")
const [qty, setQty]             = useState(1)

// B. Material
const [material, setMaterial]   = useState("Backlit Film (premium)")
const [thickness, setThickness] = useState("Standard")

// C. Light & Quality
const [printQuality, setPrintQuality] = useState("Standard")
const [glow, setGlow]                 = useState("Medium Glow")

// D. Frame & Install
const [includeFrame, setIncludeFrame]       = useState(false)
const [lightboxCompat, setLightboxCompat]   = useState(false)
const [installation, setInstallation]       = useState("None")

// E. Usage
const [usageType, setUsageType]   = useState("Store Signage")
const [otherUsage, setOtherUsage] = useState("")

// F. Design
const [designFile, setDesignFile]     = useState(null)
const [needsDesign, setNeedsDesign]   = useState(false)
const [instructions, setInstructions] = useState("")
const designRef = useRef()

// G. Delivery
const [delivery, setDelivery] = useState("Pickup")
const [address, setAddress]   = useState("")

const [errors, setErrors] = useState({})

const handlePreset = (p) => {
setPreset(p.label)
if (p.label !== "Custom") { setWidth(p.w); setHeight(p.h) }
else { setWidth(""); setHeight("") }
}

const validate = () => {
const e = {}
const w = parseFloat(width), h = parseFloat(height)
if (!w || w <= 0) e.width = "Enter a valid width"
if (!h || h <= 0) e.height = "Enter a valid height"
if (!qty || qty < 1) e.qty = "Quantity must be at least 1"
if (!needsDesign && !designFile) e.design = "Please upload a design file or request design assistance"
if (usageType === "Others" && !otherUsage.trim()) e.otherUsage = "Please describe the usage"
if (delivery === "Delivery" && !address.trim()) e.address = "Please enter a delivery address"
setErrors(e)
return Object.keys(e).length === 0
}

const handleSubmit = () => {
if (!validate()) return
alert(`✅ Order submitted!\n\nBacklit Print – ${width}×${height} ft\nMaterial: ${material}\nQty: ${qty}\nTotal: ₱${pricing.total.toLocaleString()}`)
}

const pricing = computePrice({ width, height, qty, material, thickness, printQuality, installation, includeFrame })

const summaryRows = [
{ label: "Size",         value: `${width || "—"} × ${height || "—"} ft` },
{ label: "Area",         value: `${pricing.area} sq.ft` },
{ label: "Material",     value: material },
{ label: "Thickness",    value: thickness },
{ label: "Quality",      value: printQuality + (printQuality === "High Resolution" ? " (+₱15/sqft)" : "") },
{ label: "Glow Level",   value: glow },
{ label: "Quantity",     value: `${qty.toLocaleString()} pc${qty !== 1 ? "s" : ""}` },
...(includeFrame             ? [{ label: "Frame",        value: "+₱300" }]                       : []),
...(installation !== "None"  ? [{ label: "Installation", value: installation === "Basic Installation" ? "+₱200" : "+₱500" }] : []),
{ label: "Delivery",     value: delivery },
]

return (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

    {/* ── LEFT ───────────────────────────────────────── */}
    <div className="xl:col-span-2 flex flex-col gap-6">

    {/* Backlit Print Details */}
    <SectionCard title="Backlit Print Details" icon="💡">
        <div className="flex flex-col gap-5">

        <Field label="Preset Sizes">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PRESETS.map((p) => (
                <button key={p.label} type="button" onClick={() => handlePreset(p)}
                className={`py-2.5 px-3 rounded-xl border-2 text-xs font-bold text-center transition-all ${
                    preset === p.label
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-red-300"
                }`}>
                {p.label}
                </button>
            ))}
            </div>
        </Field>

        <div className="grid grid-cols-2 gap-3">
            <Field label="Width (ft)" required>
            <input
                type="number" min={0.1} step={0.1} value={width}
                onChange={(e) => { setWidth(e.target.value); setPreset("Custom") }}
                placeholder="e.g. 2"
                className={inputCls + (errors.width ? " border-red-400 ring-1 ring-red-300" : "")}
            />
            {errors.width && <p className="text-[11px] text-red-500 mt-1">{errors.width}</p>}
            </Field>
            <Field label="Height (ft)" required>
            <input
                type="number" min={0.1} step={0.1} value={height}
                onChange={(e) => { setHeight(e.target.value); setPreset("Custom") }}
                placeholder="e.g. 4"
                className={inputCls + (errors.height ? " border-red-400 ring-1 ring-red-300" : "")}
            />
            {errors.height && <p className="text-[11px] text-red-500 mt-1">{errors.height}</p>}
            </Field>
        </div>

        {parseFloat(width) > 0 && parseFloat(height) > 0 && (
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-xl px-4 py-2 text-xs text-amber-700">
            <span>📐</span>
            <span className="font-semibold">
                Computed area: <strong>{pricing.area} sq.ft</strong>
            </span>
            </div>
        )}

        <Field label="Quantity" required>
            <input
            type="number" min={1} value={qty}
            onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
            className={inputCls + (errors.qty ? " border-red-400 ring-1 ring-red-300" : "")}
            />
            {errors.qty && <p className="text-[11px] text-red-500 mt-1">{errors.qty}</p>}
            {qty >= 5 && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-4 py-2 text-xs text-green-700 mt-1">
                <span>🎉</span>
                <span className="font-semibold">Bulk order! Volume discount may apply — our team will confirm.</span>
            </div>
            )}
        </Field>

        </div>
    </SectionCard>

    {/* Material Options */}
    <SectionCard title="Material Options" icon="🧱">
        <div className="flex flex-col gap-5">

        <Field label="Material Type">
            <div className="flex flex-col gap-2">
            <OptionCard
                active={material === "Backlit Film (premium)"}
                onClick={() => setMaterial("Backlit Film (premium)")}
                icon="🌟"
                label="Backlit Film (Premium)"
                sublabel="Crystal-clear light diffusion — ideal for high-end signage & lightboxes"
                badge="₱80/sqft"
            />
            <OptionCard
                active={material === "Backlit Tarpaulin"}
                onClick={() => setMaterial("Backlit Tarpaulin")}
                icon="🏮"
                label="Backlit Tarpaulin"
                sublabel="Durable & cost-effective — great for outdoor advertising"
                badge="₱60/sqft"
            />
            </div>
        </Field>

        <Field label="Thickness">
            <div className="flex gap-3">
            <ToggleBtn active={thickness === "Standard"} onClick={() => setThickness("Standard")}>
                📄 Standard
            </ToggleBtn>
            <ToggleBtn active={thickness === "Heavy Duty"} onClick={() => setThickness("Heavy Duty")}>
                🔩 Heavy Duty <span className="text-[10px] font-black opacity-75 ml-1">+₱10/sqft</span>
            </ToggleBtn>
            </div>
            {thickness === "Heavy Duty" && (
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-xl px-4 py-2 text-xs text-amber-700 mt-2">
                <span>💪</span>
                <span className="font-semibold">Heavy Duty is recommended for outdoor or long-term installation.</span>
            </div>
            )}
        </Field>

        </div>
    </SectionCard>

    {/* Lighting & Print Quality */}
    <SectionCard title="Lighting & Print Quality" icon="🔆">
        <div className="flex flex-col gap-5">

        <Field label="Print Quality">
            <div className="flex flex-col gap-2">
            <OptionCard
                active={printQuality === "Standard"}
                onClick={() => setPrintQuality("Standard")}
                icon="🖨️"
                label="Standard"
                sublabel="Excellent for solid colors, bold text, and general signage"
            />
            <OptionCard
                active={printQuality === "High Resolution"}
                onClick={() => setPrintQuality("High Resolution")}
                icon="🔬"
                label="High Resolution"
                sublabel="Ultra-sharp gradients and photo-quality output for premium displays"
                badge="+₱15/sqft"
            />
            </div>
        </Field>

        <Field label="Light Transmission Level" hint="Controls how brightly the panel glows when backlit">
            <div className="flex flex-col gap-2">
            {[
                { val: "Low Glow",        icon: "🌑", desc: "Subtle ambient glow — soft indoor displays" },
                { val: "Medium Glow",     icon: "🌕", desc: "Balanced brightness — standard lightboxes" },
                { val: "High Brightness", icon: "☀️",  desc: "Maximum luminance — outdoor & mall signage" },
            ].map(({ val, icon, desc }) => (
                <OptionCard key={val} active={glow === val} onClick={() => setGlow(val)}
                icon={icon} label={val} sublabel={desc} />
            ))}
            </div>
        </Field>

        </div>
    </SectionCard>

    {/* Frame & Installation */}
    <SectionCard title="Frame & Installation" icon="🏗️">
        <div className="flex flex-col gap-5">

        <AddOnToggle
            label="Include Frame"
            sublabel="Aluminum snap frame — holds and displays your backlit print"
            icon="🖼️"
            priceLabel="+₱300"
            checked={includeFrame}
            onChange={() => setIncludeFrame(!includeFrame)}
        />

        <AddOnToggle
            label="Lightbox Compatible"
            sublabel="Optimized for use in LED lightbox displays"
            icon="💡"
            priceLabel="Free"
            checked={lightboxCompat}
            onChange={() => setLightboxCompat(!lightboxCompat)}
        />

        <Field label="Installation Service">
            <div className="flex flex-col gap-2">
            {[
                { val: "None",                icon: "🚫", desc: "No installation — pickup or delivery only" },
                { val: "Basic Installation",  icon: "🔧", desc: "Our technician handles basic mounting",       badge: "+₱200" },
                { val: "Full Installation",   icon: "⚙️", desc: "Complete setup including wiring & framing",  badge: "+₱500" },
            ].map(({ val, icon, desc, badge }) => (
                <OptionCard key={val} active={installation === val} onClick={() => setInstallation(val)}
                icon={icon} label={val} sublabel={desc} badge={badge} />
            ))}
            </div>
            {installation !== "None" && (
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700 mt-2">
                <span>📍</span>
                <p>A technician will contact you within 24 hours to schedule the installation visit.</p>
            </div>
            )}
        </Field>

        </div>
    </SectionCard>

    {/* Usage Type */}
    <SectionCard title="Usage Type" icon="📌">
        <div className="flex flex-col gap-4">
        <Field label="What is this backlit print for?">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
                { val: "Store Signage",      icon: "🏪" },
                { val: "Mall Advertisement", icon: "🏬" },
                { val: "Lightbox Display",   icon: "💡" },
                { val: "Event Booth",         icon: "🎪" },
                { val: "Others",             icon: "🔲" },
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
                placeholder="e.g. Hospital directory board, transit station signage..."
                className={inputCls + (errors.otherUsage ? " border-red-400 ring-1 ring-red-300" : "")}
            />
            {errors.otherUsage && <p className="text-[11px] text-red-500 mt-1">{errors.otherUsage}</p>}
            </Field>
        )}
        </div>
    </SectionCard>

    {/* Design */}
    <SectionCard title="Design" icon="🎨">
        <div className="flex flex-col gap-5">

        {/* Preview */}
        <div className="flex justify-center py-5 bg-gray-900 rounded-xl border border-gray-800">
            <BacklitPreview
            width={width} height={height} glow={glow}
            material={material} includeFrame={includeFrame}
            hasDesign={!!designFile || needsDesign}
            usageType={usageType}
            />
        </div>

        <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-700">
            <span className="text-lg shrink-0">⚠️</span>
            <p className="text-xs leading-relaxed">
            <strong>Important for backlit printing:</strong> Use high-resolution images (300 DPI minimum) and design in <strong>RGB color mode</strong> for accurate light-through color reproduction. Avoid very dark backgrounds as they block light transmission.
            </p>
        </div>

        <Field
            label="Upload Design File"
            hint="PNG, JPG, PDF, AI accepted · 300 DPI recommended · RGB color mode · Max 100MB"
            required={!needsDesign}
        >
            <div
            onClick={() => !needsDesign && designRef.current.click()}
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
                <p className="text-xs text-gray-400">PNG, JPG, PDF, AI — high-res RGB preferred for backlit</p>
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
        </Field>

        {/* Design Assistance */}
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
            <p className="text-[11px] text-gray-400">Our team will design your backlit panel. Proof sent before printing.</p>
            </div>
            <span className={`text-xs font-black px-2 py-1 rounded-lg shrink-0 ${
            needsDesign ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"
            }`}>
            Fees apply
            </span>
            <div className={`w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center transition-all ${
            needsDesign ? "bg-red-500 border-red-500" : "border-gray-300"
            }`}>
            {needsDesign && <span className="text-white text-[10px] font-black">✓</span>}
            </div>
        </button>

        <Field label="Special Instructions" hint="Mounting notes, color accuracy requirements, bleed specs, etc.">
            <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={3}
            placeholder="e.g. Match Pantone 7548 C for yellow glow, bleed 5mm all sides, no text within 10mm of edge..."
            className={inputCls + " resize-none"}
            />
        </Field>

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
            <p>You'll receive an SMS when your backlit print is ready for pickup at our store.</p>
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

        {/* Backlit Preview Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-linear-to-r from-gray-50 to-white">
            <span className="text-xl">💡</span>
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-600">Backlit Preview</h2>
        </div>
        <div className="px-4 py-5 flex justify-center bg-gray-900 min-h-50 items-center">
            <BacklitPreview
            width={width} height={height} glow={glow}
            material={material} includeFrame={includeFrame}
            hasDesign={!!designFile || needsDesign}
            usageType={usageType}
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
            <span className="text-gray-400">Rate / sq.ft</span>
            <span className="font-semibold text-gray-700">₱{pricing.ratePerSqFt}</span>
            </div>
            <div className="flex justify-between text-sm">
            <span className="text-gray-400">Area × Qty</span>
            <span className="font-semibold text-gray-700">{pricing.area} sqft × {qty}</span>
            </div>
            {pricing.addons > 0 && (
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">Add-ons</span>
                <span className="font-semibold text-gray-700">+₱{pricing.addons.toLocaleString()}</span>
            </div>
            )}
            <div className="mt-2 flex items-center justify-between py-3 px-4 bg-red-50 rounded-xl border border-red-100">
            <span className="text-sm font-black text-gray-700 uppercase tracking-wide">Total</span>
            <span className="text-2xl font-black text-red-600">
                ₱{pricing.total > 0 ? pricing.total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }) : "—"}
            </span>
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
            Not sure about film type or glow level? Message us on Facebook or email{" "}
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