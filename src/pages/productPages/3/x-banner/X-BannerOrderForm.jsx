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

// ── X-Banner Preview ───────────────────────────────────────────────────────────
function XBannerPreview({ size, includeStand, standType, material, hasDesign, printOnly }) {
// Banner proportions — X-banners are tall and narrow
const dims = {
"2ft x 5ft": { w: 48, h: 120 },
"2ft x 6ft": { w: 48, h: 144 },
"3ft x 6ft": { w: 60, h: 120 },
}
const scale = 0.55
const base  = dims[size] || dims["2ft x 5ft"]
const bw    = Math.round(base.w * scale)
const bh    = Math.round(base.h * scale)

const bgColor   = material === "Tarpaulin (Matte)" ? "#f9fafb" : material === "Tarpaulin (Glossy)" ? "#ffffff" : "#f5f5f4"
const shimmer   = material === "Tarpaulin (Glossy)"
const standColor = standType === "Heavy Duty X-Stand" ? "#374151" : "#9ca3af"

// Stand arm length relative to banner width
const armSpread = Math.round(bw * 0.65)
const standH    = 28
const svgW      = armSpread * 2 + 20
const svgH      = standH + 6

return (
<div className="flex flex-col items-center gap-1.5">
    {/* Banner body */}
    <div
    className="relative border border-gray-200 rounded overflow-hidden flex flex-col items-center justify-between"
    style={{
        width: bw,
        height: bh,
        background: bgColor,
        boxShadow: shimmer ? "2px 2px 8px rgba(0,0,0,0.12)" : "1px 1px 4px rgba(0,0,0,0.07)",
    }}
    >
    {/* Glossy shimmer */}
    {shimmer && (
        <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, transparent 55%)" }} />
    )}

    {/* Top pole bar */}
    <div className="w-full h-1.5 bg-gray-400 shrink-0" />

    {/* Content area */}
    <div className="flex-1 flex flex-col items-center justify-center gap-1 px-2 w-full">
        {hasDesign ? (
        <>
            <div className="w-4/5 h-1 rounded-full bg-red-300 opacity-70" />
            <div className="flex flex-col gap-0.5 w-full items-center mt-1">
            {[70, 50, 60, 45, 55, 40].map((pct, i) => (
                <div key={i} className="h-0.5 rounded-full bg-gray-300"
                style={{ width: `${pct}%` }} />
            ))}
            </div>
            <div className="w-4/5 h-0.5 rounded-full bg-red-200 opacity-60 mt-1" />
        </>
        ) : (
        <div className="flex flex-col items-center gap-1 opacity-25">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
            </svg>
            <span className="text-[7px] text-gray-400">Design</span>
        </div>
        )}
    </div>

    {/* Bottom pole bar */}
    <div className="w-full h-1.5 bg-gray-400 shrink-0" />
    </div>

    {/* X-Stand legs */}
    {includeStand && !printOnly && (
    <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`}
        className="overflow-visible" style={{ marginTop: -2 }}>
        {/* X cross arms */}
        <line
        x1={svgW / 2 - armSpread} y1={2}
        x2={svgW / 2 + armSpread} y2={svgH - 4}
        stroke={standColor} strokeWidth={standType === "Heavy Duty X-Stand" ? 2.5 : 1.8}
        strokeLinecap="round"
        />
        <line
        x1={svgW / 2 + armSpread} y1={2}
        x2={svgW / 2 - armSpread} y2={svgH - 4}
        stroke={standColor} strokeWidth={standType === "Heavy Duty X-Stand" ? 2.5 : 1.8}
        strokeLinecap="round"
        />
        {/* Feet dots */}
        <circle cx={svgW / 2 - armSpread} cy={svgH - 4} r={2.5} fill={standColor} />
        <circle cx={svgW / 2 + armSpread} cy={svgH - 4} r={2.5} fill={standColor} />
    </svg>
    )}

    <p className="text-[9px] text-gray-400 italic mt-0.5">{size}</p>
    {includeStand && !printOnly && (
    <p className="text-[9px] text-gray-500 font-semibold">{standType}</p>
    )}
    {printOnly && (
    <p className="text-[9px] text-amber-600 font-semibold">Print Only</p>
    )}
</div>
)
}

// ── Pricing ────────────────────────────────────────────────────────────────────
function computePrice({ size, qty, printQuality, includeStand, standType, printOnly, eyelets, reinforcedCorners }) {
const basePrices = { "2ft x 5ft": 500, "2ft x 6ft": 600, "3ft x 6ft": 800 }
let base = basePrices[size] || 500
if (printOnly) base = Math.round(base * 0.7)
if (printQuality === "High Resolution") base += 100
if (includeStand && !printOnly) {
if (standType === "Heavy Duty X-Stand") base += 300
}
if (eyelets) base += 20
if (reinforcedCorners) base += 30
return { unitPrice: base, total: base * Math.max(1, qty) }
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function XBannerOrderForm() {
// A. Banner Details
const [bannerSize, setBannerSize] = useState("2ft x 5ft")
const [qty, setQty]               = useState(1)

// B. Print & Material
const [material, setMaterial]         = useState("Tarpaulin (Glossy)")
const [printQuality, setPrintQuality] = useState("Standard")

// C. Stand Options
const [includeStand, setIncludeStand] = useState(true)
const [standType, setStandType]       = useState("Standard X-Stand")
const [printOnly, setPrintOnly]       = useState(false)

// D. Finishing
const [eyelets, setEyelets]                   = useState(false)
const [reinforcedCorners, setReinforcedCorners] = useState(false)

// E. Design
const [designFile, setDesignFile]     = useState(null)
const [needsDesign, setNeedsDesign]   = useState(false)
const [instructions, setInstructions] = useState("")
const designRef = useRef()

// F. Delivery
const [delivery, setDelivery] = useState("Pickup")
const [address, setAddress]   = useState("")

const [errors, setErrors] = useState({})

const validate = () => {
const e = {}
if (!qty || qty < 1) e.qty = "Quantity must be at least 1"
if (!needsDesign && !designFile) e.design = "Please upload a design file or request design assistance"
if (delivery === "Delivery" && !address.trim()) e.address = "Please enter a delivery address"
setErrors(e)
return Object.keys(e).length === 0
}

const handleSubmit = () => {
if (!validate()) return
alert(`✅ Order submitted!\n\nX-Banner – ${bannerSize}\nMaterial: ${material}\nQty: ${qty.toLocaleString()} pc${qty !== 1 ? "s" : ""}\nTotal: ₱${pricing.total.toLocaleString()}`)
}

// Sync: if printOnly is true, stand options don't matter
const handlePrintOnly = (val) => {
setPrintOnly(val)
if (val) setIncludeStand(false)
else setIncludeStand(true)
}

const pricing = computePrice({ size: bannerSize, qty, printQuality, includeStand, standType, printOnly, eyelets, reinforcedCorners })

const MATERIALS = [
{ val: "Tarpaulin (Matte)",   icon: "🪵", desc: "Durable, no-glare outdoor material" },
{ val: "Tarpaulin (Glossy)",  icon: "✨", desc: "Vibrant colors, weather-resistant" },
{ val: "Synthetic Paper",     icon: "📄", desc: "Smooth, tear-resistant, indoor use" },
]

const summaryRows = [
{ label: "Size",         value: bannerSize },
{ label: "Material",     value: material },
{ label: "Quality",      value: printQuality + (printQuality === "High Resolution" ? " (+₱100)" : "") },
{ label: "Stand",        value: printOnly ? "Print Only (−30%)" : includeStand ? standType + (standType === "Heavy Duty X-Stand" ? " (+₱300)" : "") : "No Stand" },
{ label: "Quantity",     value: `${qty.toLocaleString()} pc${qty !== 1 ? "s" : ""}` },
...(eyelets            ? [{ label: "Eyelets",            value: "+₱20/pc" }] : []),
...(reinforcedCorners  ? [{ label: "Reinforced Corners", value: "+₱30/pc" }] : []),
{ label: "Delivery",     value: delivery },
]

return (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

    {/* ── LEFT ───────────────────────────────────────── */}
    <div className="xl:col-span-2 flex flex-col gap-6">

    {/* Banner Details */}
    <SectionCard title="Banner Details" icon="🎌">
        <div className="flex flex-col gap-5">

        <Field label="Banner Size" required>
            <select value={bannerSize} onChange={(e) => setBannerSize(e.target.value)} className={selectCls}>
            {["2ft x 5ft", "2ft x 6ft", "3ft x 6ft"].map((s) => (
                <option key={s}>{s}</option>
            ))}
            </select>
            <div className="grid grid-cols-3 gap-2 mt-2">
            {[
                { val: "2ft x 5ft", desc: "Compact — fits tight spaces" },
                { val: "2ft x 6ft", desc: "Standard — most popular" },
                { val: "3ft x 6ft", desc: "Wide — maximum visibility" },
            ].map(({ val, desc }) => (
                <button key={val} type="button" onClick={() => setBannerSize(val)}
                className={`py-2 px-3 rounded-xl border-2 text-[11px] font-bold text-center transition-all ${
                    bannerSize === val
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-200 bg-white text-gray-500 hover:border-red-300"
                }`}>
                <p className="text-sm font-black">{val}</p>
                <p className="text-[10px] font-normal text-gray-400 mt-0.5">{desc}</p>
                </button>
            ))}
            </div>
        </Field>

        <Field label="Quantity" required>
            <input
            type="number" min={1} value={qty}
            onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
            className={inputCls + (errors.qty ? " border-red-400 ring-1 ring-red-300" : "")}
            />
            {errors.qty && <p className="text-[11px] text-red-500 mt-1">{errors.qty}</p>}
            {qty >= 10 && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-4 py-2 text-xs text-green-700 mt-1">
                <span>🎉</span>
                <span className="font-semibold">Bulk order! Volume discount may apply — our team will confirm.</span>
            </div>
            )}
        </Field>

        </div>
    </SectionCard>

    {/* Print & Material */}
    <SectionCard title="Print & Material" icon="🖨️">
        <div className="flex flex-col gap-5">

        <Field label="Material Type">
            <div className="flex flex-col gap-2">
            {MATERIALS.map(({ val, icon, desc }) => (
                <OptionCard key={val} active={material === val} onClick={() => setMaterial(val)}
                icon={icon} label={val} sublabel={desc} />
            ))}
            </div>
        </Field>

        <Field label="Print Quality">
            <div className="flex flex-col gap-2">
            <OptionCard
                active={printQuality === "Standard"}
                onClick={() => setPrintQuality("Standard")}
                icon="🖨️"
                label="Standard"
                sublabel="Great quality for general use and events"
            />
            <OptionCard
                active={printQuality === "High Resolution"}
                onClick={() => setPrintQuality("High Resolution")}
                icon="🔬"
                label="High Resolution"
                sublabel="Sharper detail — ideal for photos and fine graphics"
                badge="+₱100"
            />
            </div>
        </Field>

        </div>
    </SectionCard>

    {/* Stand Options — KEY FEATURE */}
    <SectionCard title="Stand Options" icon="🏗️">
        <div className="flex flex-col gap-5">

        {/* Replace Print Only toggle */}
        <Field label="Order Type">
            <div className="flex gap-3">
            <ToggleBtn active={!printOnly} onClick={() => handlePrintOnly(false)}>
                🏗️ With X-Stand
            </ToggleBtn>
            <ToggleBtn active={printOnly} onClick={() => handlePrintOnly(true)}>
                🖨️ Print Only
                <span className="text-[10px] font-black opacity-75 ml-1">−30%</span>
            </ToggleBtn>
            </div>
            {printOnly && (
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-700 mt-2">
                <span>🔄</span>
                <p><strong>Print Only</strong> — replacing an existing banner print? Base price is reduced by 30%. No stand included.</p>
            </div>
            )}
        </Field>

        {/* Stand options — only shown when not print only */}
        {!printOnly && (
            <>
            <Field label="Include X-Stand?">
                <div className="flex gap-3">
                <ToggleBtn active={includeStand} onClick={() => setIncludeStand(true)}>
                    ✅ Yes, Include Stand
                </ToggleBtn>
                <ToggleBtn active={!includeStand} onClick={() => setIncludeStand(false)}>
                    ❌ No Stand
                </ToggleBtn>
                </div>
            </Field>

            {includeStand && (
                <Field label="Stand Type">
                <div className="flex flex-col gap-2">
                    <OptionCard
                    active={standType === "Standard X-Stand"}
                    onClick={() => setStandType("Standard X-Stand")}
                    icon="🔩"
                    label="Standard X-Stand"
                    sublabel="Lightweight aluminum — easy to assemble & carry"
                    badge="Included"
                    />
                    <OptionCard
                    active={standType === "Heavy Duty X-Stand"}
                    onClick={() => setStandType("Heavy Duty X-Stand")}
                    icon="⚙️"
                    label="Heavy Duty X-Stand"
                    sublabel="Thick steel frame — ideal for outdoor & long-term use"
                    badge="+₱300"
                    />
                </div>
                <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700 mt-2">
                    <span>💡</span>
                    <p>Both stands are collapsible and come with a carry bag. Heavy Duty is recommended for frequent transport or outdoor events.</p>
                </div>
                </Field>
            )}
            </>
        )}

        </div>
    </SectionCard>

    {/* Finishing */}
    <SectionCard title="Finishing" icon="⭐">
        <div className="flex flex-col gap-3">
        <AddOnToggle
            label="With Eyelets"
            sublabel="Metal grommets on all 4 corners for easy hanging"
            icon="🔘"
            priceLabel="+₱20/pc"
            checked={eyelets}
            onChange={() => setEyelets(!eyelets)}
        />
        <AddOnToggle
            label="Reinforced Corners"
            sublabel="Extra stitching & PVC reinforcement for durability"
            icon="🔲"
            priceLabel="+₱30/pc"
            checked={reinforcedCorners}
            onChange={() => setReinforcedCorners(!reinforcedCorners)}
        />
        </div>
    </SectionCard>

    {/* Design */}
    <SectionCard title="Design" icon="🎨">
        <div className="flex flex-col gap-5">

        {/* Preview */}
        <div className="flex justify-center py-4 bg-gray-50 rounded-xl border border-gray-100">
            <XBannerPreview
            size={bannerSize}
            includeStand={includeStand}
            standType={standType}
            material={material}
            hasDesign={!!designFile || needsDesign}
            printOnly={printOnly}
            />
        </div>

        {/* Upload */}
        <Field
            label="Upload Design File"
            hint="PNG, JPG, PDF, AI accepted · 300 DPI recommended · Max 100MB"
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
                <p>Supply files at <strong>300 DPI</strong> in CMYK mode. Recommended canvas size matches your selected banner dimensions with <strong>3mm bleed</strong> on all sides.</p>
            </div>
            )}
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
            <p className="text-[11px] text-gray-400">Our team will design your banner. A proof will be sent before printing.</p>
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

        <Field label="Special Instructions" hint="Bleed requirements, color notes, text corrections, etc.">
            <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={3}
            placeholder="e.g. Keep text within safe zone, use Pantone 485 red, double-check phone number..."
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
            <p>You'll receive an SMS when your banner is ready for pickup at our store.</p>
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

        {/* Banner Preview Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-linear-to-r from-gray-50 to-white">
            <span className="text-xl">🎌</span>
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-600">Banner Preview</h2>
        </div>
        <div className="px-6 py-6 flex justify-center bg-gray-50 min-h-50 items-center">
            <XBannerPreview
            size={bannerSize}
            includeStand={includeStand}
            standType={standType}
            material={material}
            hasDesign={!!designFile || needsDesign}
            printOnly={printOnly}
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
            Not sure which stand or material to pick? Message us on Facebook or email{" "}
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