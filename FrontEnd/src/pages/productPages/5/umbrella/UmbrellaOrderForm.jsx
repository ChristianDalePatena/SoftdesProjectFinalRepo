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

// ── Umbrella SVG Preview ───────────────────────────────────────────────────────
function UmbrellaPreview({ type, color, printCoverage, hasDesign, uvProtection }) {
const colorMap = {
Black: "#1f2937",
White: "#f9fafb",
Red: "#ef4444",
Blue: "#3b82f6",
Custom: "#a855f7",
}

const canopyColor = colorMap[color] || "#9ca3af"
const isLight = color === "White"

const scaleMap = { "Folding Umbrella": 0.85, "Stick Umbrella": 1, "Golf Umbrella": 1.2 }
const s = scaleMap[type] || 1

const cw = Math.round(120 * s)
const ch = Math.round(60 * s)
const handleH = type === "Golf Umbrella" ? 55 : type === "Stick Umbrella" ? 50 : 30

const printOpacity = printCoverage === "Full Canopy Print" ? 0.35 : printCoverage === "Partial Print" ? 0.2 : 0

return (
<div className="flex flex-col items-center gap-1.5">
    <svg
    width={cw + 20}
    height={ch + handleH + 20}
    viewBox={`0 0 ${cw + 20} ${ch + handleH + 20}`}
    xmlns="http://www.w3.org/2000/svg"
    >
    {/* Canopy */}
    <ellipse
        cx={(cw + 20) / 2}
        cy={ch + 4}
        rx={cw / 2}
        ry={ch}
        fill={canopyColor}
        stroke={isLight ? "#d1d5db" : "none"}
        strokeWidth={isLight ? 1 : 0}
    />

    {/* Canopy top half (dome) */}
    <path
        d={`M ${(cw + 20) / 2 - cw / 2} ${ch + 4} Q ${(cw + 20) / 2} ${4} ${(cw + 20) / 2 + cw / 2} ${ch + 4}`}
        fill={canopyColor}
        stroke={isLight ? "#d1d5db" : "none"}
        strokeWidth={isLight ? 1 : 0}
    />

    {/* Print overlay */}
    {(hasDesign || printCoverage !== "Logo Only") && printOpacity > 0 && (
        <path
        d={`M ${(cw + 20) / 2 - cw / 2} ${ch + 4} Q ${(cw + 20) / 2} ${4} ${(cw + 20) / 2 + cw / 2} ${ch + 4}`}
        fill="white"
        opacity={printOpacity}
        />
    )}

    {/* Logo dot for Logo Only */}
    {printCoverage === "Logo Only" && (
        <circle
        cx={(cw + 20) / 2}
        cy={ch / 2 + 4}
        r={Math.round(cw * 0.08)}
        fill="white"
        opacity={0.5}
        />
    )}

    {/* Spokes */}
    {[-0.45, -0.2, 0, 0.2, 0.45].map((offset, i) => (
        <line
        key={i}
        x1={(cw + 20) / 2}
        y1={ch + 4}
        x2={(cw + 20) / 2 + offset * cw}
        y2={ch / 3 + 4}
        stroke={isLight ? "#9ca3af" : "rgba(255,255,255,0.3)"}
        strokeWidth={0.8}
        />
    ))}

    {/* Center tip */}
    <circle cx={(cw + 20) / 2} cy={4} r={3} fill={isLight ? "#9ca3af" : "rgba(255,255,255,0.5)"} />

    {/* Handle / shaft */}
    <line
        x1={(cw + 20) / 2}
        y1={ch + 4}
        x2={(cw + 20) / 2}
        y2={ch + 4 + handleH - 10}
        stroke="#6b7280"
        strokeWidth={2.5}
        strokeLinecap="round"
    />
    {/* Curved handle */}
    <path
        d={`M ${(cw + 20) / 2} ${ch + 4 + handleH - 10} Q ${(cw + 20) / 2 + 12} ${ch + 4 + handleH} ${(cw + 20) / 2 + 18} ${ch + 4 + handleH - 8}`}
        fill="none"
        stroke="#6b7280"
        strokeWidth={2.5}
        strokeLinecap="round"
    />

    {/* UV badge */}
    {uvProtection && (
        <g>
        <rect
            x={(cw + 20) / 2 + cw / 2 - 22}
            y={ch - 2}
            width={22}
            height={11}
            rx={3}
            fill="#fbbf24"
            opacity={0.9}
        />
        <text
            x={(cw + 20) / 2 + cw / 2 - 11}
            y={ch + 7}
            textAnchor="middle"
            fontSize={7}
            fontWeight="bold"
            fill="#78350f"
        >
            UV+
        </text>
        </g>
    )}
    </svg>

    <p className="text-[9px] text-gray-400 italic">{type}</p>
    <p className="text-[9px] text-gray-500 font-semibold">{color} · {printCoverage}</p>
</div>
)
}

// ── Pricing ────────────────────────────────────────────────────────────────────
function computePrice({ umbrellaType, canopyMaterial, printCoverage, uvProtection, waterproofCoating, qty }) {
const basePrices = { "Folding Umbrella": 250, "Stick Umbrella": 350, "Golf Umbrella": 600 }
let base = basePrices[umbrellaType] || 250
if (canopyMaterial === "Pongee Fabric") base += 100
if (printCoverage === "Full Canopy Print") base += 200
if (printCoverage === "Partial Print") base += 100
if (uvProtection) base += 80
if (waterproofCoating) base += 50
return { unitPrice: base, total: base * Math.max(1, qty) }
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function UmbrellaOrderForm() {
// A. Umbrella Details
const [umbrellaType, setUmbrellaType] = useState("Folding Umbrella")
const [size, setSize]                 = useState("Medium (24–26 inches)")
const [qty, setQty]                   = useState(1)

// B. Material
const [canopyMaterial, setCanopyMaterial] = useState("Polyester")
const [frameType, setFrameType]           = useState("Aluminum")

// C. Print
const [printCoverage, setPrintCoverage] = useState("Logo Only")
const [printMethod, setPrintMethod]     = useState("Heat Transfer")

// D. Color
const [baseColor, setBaseColor]     = useState("Black")
const [customColor, setCustomColor] = useState("")

// E. Features
const [windproof, setWindproof]           = useState(false)
const [waterproofCoating, setWaterproof]  = useState(false)
const [uvProtection, setUvProtection]     = useState(false)

// F. Design
const [designFile, setDesignFile]     = useState(null)
const [needsDesign, setNeedsDesign]   = useState(false)
const [instructions, setInstructions] = useState("")
const designRef = useRef()

// G. Delivery
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
alert(`✅ Order submitted!\n\nUmbrella – ${umbrellaType}\nSize: ${size}\nPrint: ${printCoverage}\nQty: ${qty.toLocaleString()} pc${qty !== 1 ? "s" : ""}\nTotal: ₱${pricing.total.toLocaleString()}`)
}

const pricing = computePrice({ umbrellaType, canopyMaterial, printCoverage, uvProtection, waterproofCoating, qty })

const UMBRELLA_TYPES = [
{ val: "Folding Umbrella", icon: "☂️", desc: "Compact & portable — fits any bag" },
{ val: "Stick Umbrella",   icon: "🌂", desc: "Classic full-size — everyday use" },
{ val: "Golf Umbrella",    icon: "⛳", desc: "Extra-large — maximum coverage" },
]

const SIZES = [
{ val: "Small (21–23 inches)",  desc: "Pocket-friendly" },
{ val: "Medium (24–26 inches)", desc: "Most popular" },
{ val: "Large (27–30 inches)",  desc: "Maximum coverage" },
]

const COLORS = ["Black", "White", "Red", "Blue", "Custom"]

const colorDots = { Black: "#1f2937", White: "#e5e7eb", Red: "#ef4444", Blue: "#3b82f6", Custom: "#a855f7" }

const displayColor = baseColor === "Custom" ? (customColor || "Custom") : baseColor

const summaryRows = [
{ label: "Type",           value: umbrellaType },
{ label: "Size",           value: size },
{ label: "Canopy",         value: canopyMaterial + (canopyMaterial === "Pongee Fabric" ? " (+₱100)" : "") },
{ label: "Frame",          value: frameType },
{ label: "Print Coverage", value: printCoverage + (printCoverage === "Full Canopy Print" ? " (+₱200)" : printCoverage === "Partial Print" ? " (+₱100)" : "") },
{ label: "Print Method",   value: printMethod },
{ label: "Color",          value: displayColor },
{ label: "Quantity",       value: `${qty.toLocaleString()} pc${qty !== 1 ? "s" : ""}` },
...(uvProtection       ? [{ label: "UV Protection",    value: "+₱80/pc" }] : []),
...(waterproofCoating  ? [{ label: "Waterproof",       value: "+₱50/pc" }] : []),
...(windproof          ? [{ label: "Windproof Design", value: "✓" }] : []),
{ label: "Delivery",       value: delivery },
]

return (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

    {/* ── LEFT ───────────────────────────────────────── */}
    <div className="xl:col-span-2 flex flex-col gap-6">

    {/* Umbrella Details */}
    <SectionCard title="Umbrella Details" icon="☂️">
        <div className="flex flex-col gap-5">

        <Field label="Umbrella Type" required>
            <div className="flex flex-col gap-2">
            {UMBRELLA_TYPES.map(({ val, icon, desc }) => (
                <OptionCard key={val} active={umbrellaType === val} onClick={() => setUmbrellaType(val)}
                icon={icon} label={val} sublabel={desc}
                badge={val === "Golf Umbrella" ? "Large" : val === "Folding Umbrella" ? "Compact" : "Classic"}
                />
            ))}
            </div>
        </Field>

        <Field label="Size" required>
            <div className="grid grid-cols-3 gap-2">
            {SIZES.map(({ val, desc }) => (
                <button key={val} type="button" onClick={() => setSize(val)}
                className={`py-2 px-3 rounded-xl border-2 text-center transition-all ${
                    size === val
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-200 bg-white text-gray-500 hover:border-red-300"
                }`}>
                <p className="text-xs font-black">{val.split(" ")[0]}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{val.replace(/^\S+ /, "")}</p>
                <p className="text-[9px] font-normal text-gray-300 mt-0.5">{desc}</p>
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
            {qty >= 20 && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-4 py-2 text-xs text-green-700 mt-1">
                <span>🎉</span>
                <span className="font-semibold">Bulk order! Volume discount may apply — our team will confirm.</span>
            </div>
            )}
        </Field>

        </div>
    </SectionCard>

    {/* Material Options */}
    <SectionCard title="Material Options" icon="🧵">
        <div className="flex flex-col gap-5">

        <Field label="Canopy Material">
            <div className="flex flex-col gap-2">
            <OptionCard
                active={canopyMaterial === "Polyester"}
                onClick={() => setCanopyMaterial("Polyester")}
                icon="🏭"
                label="Polyester"
                sublabel="Lightweight, water-resistant, cost-effective"
                badge="Standard"
            />
            <OptionCard
                active={canopyMaterial === "Pongee Fabric"}
                onClick={() => setCanopyMaterial("Pongee Fabric")}
                icon="✨"
                label="Pongee Fabric"
                sublabel="Premium silky feel, superior color vibrancy"
                badge="+₱100"
            />
            </div>
        </Field>

        <Field label="Frame Type">
            <div className="flex flex-col gap-2">
            <OptionCard
                active={frameType === "Aluminum"}
                onClick={() => setFrameType("Aluminum")}
                icon="🔩"
                label="Aluminum"
                sublabel="Lightweight, rust-resistant — ideal for everyday carry"
                badge="Light"
            />
            <OptionCard
                active={frameType === "Fiberglass"}
                onClick={() => setFrameType("Fiberglass")}
                icon="⚙️"
                label="Fiberglass"
                sublabel="Flexible & ultra-durable — handles strong winds"
                badge="Durable"
            />
            </div>
        </Field>

        </div>
    </SectionCard>

    {/* Print Options */}
    <SectionCard title="Print Options" icon="🖨️">
        <div className="flex flex-col gap-5">

        <Field label="Print Coverage">
            <div className="flex flex-col gap-2">
            <OptionCard
                active={printCoverage === "Logo Only"}
                onClick={() => setPrintCoverage("Logo Only")}
                icon="🔵"
                label="Logo Only"
                sublabel="Small logo or text on one panel — clean & corporate"
                badge="Included"
            />
            <OptionCard
                active={printCoverage === "Partial Print"}
                onClick={() => setPrintCoverage("Partial Print")}
                icon="🎨"
                label="Partial Print"
                sublabel="Print covers select panels for a balanced look"
                badge="+₱100"
            />
            <OptionCard
                active={printCoverage === "Full Canopy Print"}
                onClick={() => setPrintCoverage("Full Canopy Print")}
                icon="🌈"
                label="Full Canopy Print"
                sublabel="Edge-to-edge vibrant coverage — maximum brand impact"
                badge="+₱200"
            />
            </div>
        </Field>

        <Field label="Print Method">
            <div className="flex flex-col gap-2">
            <OptionCard
                active={printMethod === "Heat Transfer"}
                onClick={() => setPrintMethod("Heat Transfer")}
                icon="🔥"
                label="Heat Transfer"
                sublabel="Sharp, cost-effective for simple logos & text"
            />
            <OptionCard
                active={printMethod === "Sublimation Print"}
                onClick={() => setPrintMethod("Sublimation Print")}
                icon="🎯"
                label="Sublimation Print"
                sublabel="Photo-quality color — best for gradients & full prints"
            />
            </div>
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700 mt-2">
            <span>💡</span>
            <p>Sublimation is recommended for <strong>Full Canopy Print</strong> to achieve the richest, most vibrant colors.</p>
            </div>
        </Field>

        </div>
    </SectionCard>

    {/* Color Options */}
    <SectionCard title="Color Options" icon="🎨">
        <div className="flex flex-col gap-4">

        <Field label="Base Umbrella Color">
            <div className="flex gap-2 flex-wrap">
            {COLORS.map((c) => (
                <button
                key={c}
                type="button"
                onClick={() => setBaseColor(c)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 text-sm font-bold transition-all ${
                    baseColor === c
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-red-300"
                }`}
                >
                <span
                    className="w-4 h-4 rounded-full border border-gray-300 shrink-0"
                    style={{ background: colorDots[c] }}
                />
                {c}
                </button>
            ))}
            </div>
        </Field>

        {baseColor === "Custom" && (
            <Field label="Custom Color Description" hint="e.g. Pantone 485, forest green, navy blue">
            <input
                type="text"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                placeholder="Describe your custom color..."
                className={inputCls}
            />
            </Field>
        )}

        </div>
    </SectionCard>

    {/* Additional Features */}
    <SectionCard title="Additional Features" icon="⭐">
        <div className="flex flex-col gap-3">
        <AddOnToggle
            label="Windproof Design"
            sublabel="Double-canopy vented frame that withstands strong gusts"
            icon="💨"
            priceLabel="Included"
            checked={windproof}
            onChange={() => setWindproof(!windproof)}
        />
        <AddOnToggle
            label="Waterproof Coating"
            sublabel="Hydrophobic nano-coating for instant water repellency"
            icon="💧"
            priceLabel="+₱50/pc"
            checked={waterproofCoating}
            onChange={() => setWaterproof(!waterproofCoating)}
        />
        <AddOnToggle
            label="UV Protection"
            sublabel="UPF 50+ coating blocks harmful UVA/UVB rays"
            icon="☀️"
            priceLabel="+₱80/pc"
            checked={uvProtection}
            onChange={() => setUvProtection(!uvProtection)}
        />
        </div>
    </SectionCard>

    {/* Design */}
    <SectionCard title="Design" icon="🎨">
        <div className="flex flex-col gap-5">

        {/* Preview */}
        <div className="flex justify-center py-6 bg-gray-50 rounded-xl border border-gray-100">
            <UmbrellaPreview
            type={umbrellaType}
            color={baseColor === "Custom" ? "Custom" : baseColor}
            printCoverage={printCoverage}
            hasDesign={!!designFile || needsDesign}
            uvProtection={uvProtection}
            />
        </div>

        {/* Upload */}
        <Field
            label="Upload Design File"
            hint="PNG, JPG, PDF, AI accepted · 300 DPI recommended · Use high-resolution artwork for curved surface printing"
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
                <p>Supply files at <strong>300 DPI</strong>. Curved surfaces require <strong>wrap-adjusted artwork</strong> — our team can advise on bleed setup.</p>
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
            <p className="text-[11px] text-gray-400">Our team will design your artwork. A digital proof is sent before printing.</p>
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

        <Field label="Special Instructions" hint="Color notes, branding guidelines, text corrections, etc.">
            <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={3}
            placeholder="e.g. Match Pantone 485 red, keep logo centered on front panel, avoid white border..."
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
            <p>You'll receive an SMS when your order is ready for pickup at our store.</p>
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

        {/* Umbrella Preview Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-linear-to-r from-gray-50 to-white">
            <span className="text-xl">☂️</span>
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-600">Live Preview</h2>
        </div>
        <div className="px-6 py-6 flex justify-center bg-gray-50 min-h-50 items-center">
            <UmbrellaPreview
            type={umbrellaType}
            color={baseColor === "Custom" ? "Custom" : baseColor}
            printCoverage={printCoverage}
            hasDesign={!!designFile || needsDesign}
            uvProtection={uvProtection}
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
            Not sure which material or print method suits your artwork? Message us on Facebook or email{" "}
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