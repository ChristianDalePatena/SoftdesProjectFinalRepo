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

// ── Tumbler SVG Preview ────────────────────────────────────────────────────────
function TumblerPreview({ tumblerType, tumblerColor, material, lidType, printPlacement, capacity }) {
const colorMap = {
Black:       { body: "#1f2937", rim: "#111827", shine: "#374151", text: "#6b7280" },
White:       { body: "#f9fafb", rim: "#e5e7eb", shine: "#ffffff", text: "#d1d5db" },
Silver:      { body: "#9ca3af", rim: "#6b7280", shine: "#d1d5db", text: "#4b5563" },
Transparent: { body: "#bfdbfe", rim: "#93c5fd", shine: "#dbeafe", text: "#3b82f6" },
}
const matAccent = {
"Stainless Steel": "#94a3b8",
Plastic:           "#a78bfa",
Acrylic:           "#38bdf8",
Glass:             "#6ee7b7",
}

const tc = colorMap[tumblerColor] || colorMap["Silver"]
const accent = matAccent[material] || "#94a3b8"
const isGlass = material === "Glass" || tumblerColor === "Transparent"

// Tumbler shape dimensions
const cx = 65
const topY = 28, topW = 34
const botY = 138, botW = 28
const bodyH = botY - topY

// Trapezoid body points
const leftTop = cx - topW, rightTop = cx + topW
const leftBot = cx - botW, rightBot = cx + botW

const capLabel = capacity === "Custom size" ? "?" : capacity.replace(" oz", "")

return (
<div className="flex flex-col items-center gap-2">
    <svg width={130} height={170} viewBox="0 0 130 170" xmlns="http://www.w3.org/2000/svg">

    {/* Shadow */}
    <ellipse cx={cx} cy={155} rx={30} ry={5} fill="#e5e7eb" />

    {/* Body */}
    <path
        d={`M${leftTop},${topY} L${rightTop},${topY} L${rightBot},${botY} L${leftBot},${botY} Z`}
        fill={tc.body}
        stroke={tc.rim}
        strokeWidth={1.5}
        opacity={isGlass ? 0.55 : 1}
    />

    {/* Shine highlight */}
    <path
        d={`M${leftTop + 6},${topY + 4} L${leftTop + 12},${topY + 4} L${leftBot + 10},${botY - 4} L${leftBot + 4},${botY - 4} Z`}
        fill={tc.shine}
        opacity={0.35}
    />

    {/* Wrap-around print band */}
    {printPlacement === "Wrap-around (full body)" && (
        <path
        d={`M${leftTop + 2},${topY + 20} L${rightTop - 2},${topY + 20} L${rightBot - 1},${botY - 20} L${leftBot + 1},${botY - 20} Z`}
        fill={accent}
        opacity={0.22}
        />
    )}

    {/* Front print area */}
    {(printPlacement === "Front" || printPlacement === "Back") && (
        <rect
        x={cx - 16} y={topY + 22}
        width={32} height={42}
        rx={3}
        fill={accent}
        opacity={0.2}
        />
    )}

    {/* Design icon */}
    {printPlacement === "Front" && (
        <>
        <circle cx={cx} cy={topY + 43} r={10} fill={accent} opacity={0.35} />
        <text x={cx} y={topY + 47} textAnchor="middle" fontSize={8} fill={accent} fontWeight="bold" opacity={0.9}>ART</text>
        </>
    )}
    {printPlacement === "Back" && (
        <text x={cx} y={topY + 48} textAnchor="middle" fontSize={7} fill={accent} opacity={0.6}>BACK</text>
    )}
    {printPlacement === "Wrap-around (full body)" && (
        <text x={cx} y={topY + 57} textAnchor="middle" fontSize={6.5} fill={accent} fontWeight="bold" opacity={0.8}>360°</text>
    )}

    {/* Capacity label */}
    <text x={cx} y={botY - 8} textAnchor="middle" fontSize={7} fill={tc.text} fontWeight="bold">{capLabel}oz</text>

    {/* Bottom base */}
    <rect x={leftBot} y={botY} width={botW * 2} height={6} rx={3} fill={tc.rim} opacity={0.8} />

    {/* Lid */}
    {lidType === "Slide Lid" && (
        <>
        <rect x={leftTop - 2} y={topY - 14} width={topW * 2 + 4} height={14} rx={4} fill={accent} opacity={0.85} />
        <rect x={cx - 8} y={topY - 10} width={16} height={6} rx={3} fill="white" opacity={0.4} />
        </>
    )}
    {lidType === "Straw Lid" && (
        <>
        <rect x={leftTop - 2} y={topY - 12} width={topW * 2 + 4} height={12} rx={4} fill={accent} opacity={0.85} />
        <rect x={cx - 2} y={topY - 40} width={4} height={32} rx={2} fill={accent} opacity={0.7} />
        </>
    )}
    {lidType === "Flip Lid" && (
        <>
        <rect x={leftTop - 2} y={topY - 14} width={topW * 2 + 4} height={14} rx={4} fill={accent} opacity={0.85} />
        <path d={`M${cx - 10},${topY - 14} Q${cx},${topY - 26} ${cx + 10},${topY - 14}`}
            fill={accent} opacity={0.6} />
        </>
    )}

    {/* Material badge */}
    <rect x={82} y={12} width={38} height={14} rx={7} fill={accent} opacity={0.9} />
    <text x={101} y={22} textAnchor="middle" fontSize={6.5} fontWeight="bold" fill="white">
        {material === "Stainless Steel" ? "S.STEEL" : material.toUpperCase().slice(0, 6)}
    </text>

    </svg>
    <p className="text-[9px] text-gray-400 italic">{tumblerType}</p>
    <p className="text-[9px] text-gray-500 font-semibold">{tumblerColor} · {lidType}</p>
</div>
)
}

// ── Pricing ────────────────────────────────────────────────────────────────────
function computePrice({ material, printMethod, printPlacement, namePerson, giftPkg, extraLid, straw, tempUpgrade }) {
let base = 150
if (material === "Stainless Steel") base += 50
if (material === "Glass")           base += 40
if (printMethod === "UV Printing")       base += 20
if (printMethod === "Sublimation")       base += 25
if (printMethod === "Laser Engraving")   base += 30
if (printPlacement === "Wrap-around (full body)") base += 15
if (namePerson)   base += 10
if (giftPkg)      base += 15
if (extraLid)     base += 20
if (straw)        base += 10
if (tempUpgrade)  base += 30
return base
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function TumblerOrderForm() {
// A. Tumbler Details
const [tumblerType, setTumblerType]     = useState("Stainless Steel Tumbler")
const [capacity, setCapacity]           = useState("16 oz")
const [customCapacity, setCustomCapacity] = useState("")
const [lidType, setLidType]             = useState("Slide Lid")
const [quantity, setQuantity]           = useState(1)

// B. Material & Color
const [material, setMaterial]           = useState("Stainless Steel")
const [tumblerColor, setTumblerColor]   = useState("Silver")
const [customColor, setCustomColor]     = useState("#ef4444")
const [useCustomColor, setUseCustomColor] = useState(false)

// C. Customization
const [printMethod, setPrintMethod]     = useState("UV Printing")
const [designMode, setDesignMode]       = useState("upload")
const [designFile, setDesignFile]       = useState(null)
const [mainText, setMainText]           = useState("")
const [subText, setSubText]             = useState("")
const [fontStyle, setFontStyle]         = useState("Classic Serif")
const [textColor, setTextColor]         = useState("#1f2937")
const [printPlacement, setPrintPlacement] = useState("Front")
const designRef = useRef()

// D. Bulk Order
const [bulkOrder, setBulkOrder]         = useState(false)
const [csvFile, setCsvFile]             = useState(null)
const csvRef = useRef()

// E. Add-ons
const [namePerson, setNamePerson]       = useState(false)
const [giftPkg, setGiftPkg]             = useState(false)
const [extraLid, setExtraLid]           = useState(false)
const [straw, setStraw]                 = useState(false)
const [tempUpgrade, setTempUpgrade]     = useState(false)

// F. Delivery
const [delivery, setDelivery]           = useState("Pickup")
const [address, setAddress]             = useState("")

const [errors, setErrors] = useState({})

const effectiveCapacity = capacity === "Custom size" ? (customCapacity || "Custom") : capacity
const displayColor = useCustomColor ? "Custom" : tumblerColor

const validate = () => {
const e = {}
if (quantity < 1) e.quantity = "Quantity must be at least 1"
if (capacity === "Custom size" && !customCapacity.trim()) e.customCapacity = "Please enter your custom capacity"
if (designMode === "upload" && !designFile) e.design = "Please upload a design file"
if (designMode === "text" && !mainText.trim()) e.mainText = "Please enter the main text"
if (delivery === "Delivery" && !address.trim()) e.address = "Please enter your delivery address"
if (bulkOrder && !csvFile) e.csvFile = "Please upload a CSV/Excel file for bulk personalization"
setErrors(e)
return Object.keys(e).length === 0
}

const handleSubmit = () => {
if (!validate()) return
alert(`✅ Order submitted!\n\nTumbler: ${tumblerType}\nCapacity: ${effectiveCapacity}\nQty: ${quantity}\nTotal: ₱${total.toLocaleString()}`)
}

const unitPrice = computePrice({ material, printMethod, printPlacement, namePerson, giftPkg, extraLid, straw, tempUpgrade })
const total = unitPrice * Math.max(1, quantity)

const activeAddOns = [
namePerson  && "Name Personalization (+₱10)",
giftPkg     && "Gift Packaging (+₱15)",
extraLid    && "Extra Lid (+₱20)",
straw       && "Straw (+₱10)",
tempUpgrade && "Temp. Upgrade (+₱30)",
].filter(Boolean)

const TUMBLER_TYPES  = ["Stainless Steel Tumbler", "Plastic Tumbler", "Acrylic Tumbler", "Insulated Travel Mug", "Glass Tumbler"]
const CAPACITIES     = ["12 oz", "16 oz", "20 oz", "24 oz", "Custom size"]
const LID_TYPES      = [
{ val: "Slide Lid",  icon: "↔️", desc: "Simple push-open sliding lid" },
{ val: "Straw Lid",  icon: "🥤", desc: "Built-in straw hole for sipping" },
{ val: "Flip Lid",   icon: "🔄", desc: "Click-open flip-top lid" },
]
const MATERIALS      = [
{ val: "Stainless Steel", icon: "🔩", desc: "Durable and temperature-retaining", badge: "+₱50" },
{ val: "Plastic",         icon: "🧴", desc: "Lightweight and budget-friendly" },
{ val: "Acrylic",         icon: "💎", desc: "Crystal-clear modern look" },
{ val: "Glass",           icon: "🪟", desc: "Premium clean aesthetic",           badge: "+₱40" },
]
const COLORS         = ["Black", "White", "Silver", "Transparent"]
const PRINT_METHODS  = [
{ val: "UV Printing",      icon: "☀️", desc: "Full-color vibrant photo prints",    badge: "+₱20" },
{ val: "Sublimation",      icon: "🎨", desc: "Dye-infused seamless finish",        badge: "+₱25" },
{ val: "Laser Engraving",  icon: "⚡", desc: "Etched permanent metallic design",   badge: "+₱30" },
{ val: "Vinyl Decal",      icon: "✂️", desc: "Cut-vinyl applied graphics" },
]
const PLACEMENTS     = [
{ val: "Front",                     icon: "⬜", desc: "One-side front print only" },
{ val: "Back",                      icon: "⬛", desc: "One-side back print only" },
{ val: "Wrap-around (full body)",   icon: "🔁", desc: "Full 360° body coverage",   badge: "+₱15" },
]
const FONTS          = ["Classic Serif", "Modern Sans", "Script / Cursive", "Bold Display", "Handwritten"]

const summaryRows = [
{ label: "Tumbler Type",  value: tumblerType },
{ label: "Capacity",      value: effectiveCapacity },
{ label: "Lid Type",      value: lidType },
{ label: "Quantity",      value: quantity },
{ label: "Material",      value: material },
{ label: "Color",         value: useCustomColor ? `Custom (${customColor})` : tumblerColor },
{ label: "Print Method",  value: printMethod },
{ label: "Placement",     value: printPlacement },
{ label: "Design Mode",   value: designMode === "upload" ? "File Upload" : "Text Design" },
{ label: "Order Type",    value: bulkOrder ? "Bulk Order" : "Single Design" },
...(activeAddOns.length ? [{ label: "Add-ons", value: activeAddOns.join(", ") }] : []),
{ label: "Delivery",      value: delivery },
]

return (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

    {/* ── LEFT ─────────────────────────────────────── */}
    <div className="xl:col-span-2 flex flex-col gap-6">

    {/* Tumbler Details */}
    <SectionCard title="Tumbler Details" icon="🥤">
        <div className="flex flex-col gap-5">

        <Field label="Tumbler Type" required>
            <select value={tumblerType} onChange={(e) => setTumblerType(e.target.value)} className={selectCls}>
            {TUMBLER_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
        </Field>

        <Field label="Capacity" required>
            <div className="grid grid-cols-3 gap-2">
            {CAPACITIES.map((c) => (
                <button key={c} type="button" onClick={() => setCapacity(c)}
                className={`py-2.5 px-3 rounded-xl border-2 text-sm font-bold text-center transition-all ${
                    capacity === c
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-200 bg-white text-gray-500 hover:border-red-300"
                }`}>
                {c}
                </button>
            ))}
            </div>
            {capacity === "Custom size" && (
            <div className="mt-2">
                <input type="text" value={customCapacity} onChange={(e) => setCustomCapacity(e.target.value)}
                placeholder="e.g. 30 oz, 32 oz..."
                className={inputCls + (errors.customCapacity ? " border-red-400 ring-1 ring-red-300" : "")} />
                {errors.customCapacity && <p className="text-[11px] text-red-500 mt-1">{errors.customCapacity}</p>}
            </div>
            )}
        </Field>

        <Field label="Lid Type" required>
            <div className="flex flex-col gap-2">
            {LID_TYPES.map(({ val, icon, desc }) => (
                <OptionCard key={val} active={lidType === val} onClick={() => setLidType(val)}
                icon={icon} label={val} sublabel={desc} />
            ))}
            </div>
        </Field>

        <Field label="Quantity" required>
            <input type="number" min={1} value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className={inputCls + (errors.quantity ? " border-red-400 ring-1 ring-red-300" : "")} />
            {errors.quantity && <p className="text-[11px] text-red-500 mt-1">{errors.quantity}</p>}
            {quantity >= 50 && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-4 py-2 text-xs text-green-700 mt-1">
                <span>🎉</span>
                <span className="font-semibold">Large order! Contact us for bulk discounts.</span>
            </div>
            )}
        </Field>

        </div>
    </SectionCard>

    {/* Material & Color */}
    <SectionCard title="Material & Color" icon="🎨">
        <div className="flex flex-col gap-5">

        <Field label="Material" required>
            <div className="flex flex-col gap-2">
            {MATERIALS.map(({ val, icon, desc, badge }) => (
                <OptionCard key={val} active={material === val} onClick={() => setMaterial(val)}
                icon={icon} label={val} sublabel={desc} badge={badge} />
            ))}
            </div>
        </Field>

        <Field label="Tumbler Color" required>
            <div className="grid grid-cols-2 gap-2 mb-2">
            {COLORS.map((c) => {
                const dotColor = { Black: "#1f2937", White: "#f9fafb", Silver: "#9ca3af", Transparent: "#bfdbfe" }[c]
                return (
                <button key={c} type="button"
                    onClick={() => { setTumblerColor(c); setUseCustomColor(false) }}
                    className={`flex items-center gap-3 py-2.5 px-3 rounded-xl border-2 text-sm font-bold text-left transition-all ${
                    tumblerColor === c && !useCustomColor
                        ? "border-red-500 bg-red-50 text-red-700"
                        : "border-gray-200 bg-white text-gray-500 hover:border-red-300"
                    }`}>
                    <span className="w-4 h-4 rounded-full border border-gray-300 shrink-0"
                    style={{ backgroundColor: dotColor }} />
                    {c}
                </button>
                )
            })}
            </div>
            <button type="button"
            onClick={() => setUseCustomColor(!useCustomColor)}
            className={`flex items-center gap-3 py-2.5 px-3 rounded-xl border-2 text-sm font-bold w-full text-left transition-all ${
                useCustomColor
                ? "border-red-500 bg-red-50 text-red-700"
                : "border-gray-200 bg-white text-gray-500 hover:border-red-300"
            }`}>
            <span className="w-4 h-4 rounded-full border border-gray-300 shrink-0"
                style={{ backgroundColor: customColor }} />
            Custom Color
            </button>
            {useCustomColor && (
            <div className="flex items-center gap-3 mt-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <input type="color" value={customColor} onChange={(e) => setCustomColor(e.target.value)}
                className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5 bg-white" />
                <span className="text-sm text-gray-600 font-mono">{customColor}</span>
                <div className="flex-1 h-10 rounded-xl border border-gray-200"
                style={{ backgroundColor: customColor, opacity: 0.3 }} />
            </div>
            )}
        </Field>

        </div>
    </SectionCard>

    {/* Customization */}
    <SectionCard title="Customization Options" icon="✏️">
        <div className="flex flex-col gap-5">

        <Field label="Print Method" required>
            <div className="flex flex-col gap-2">
            {PRINT_METHODS.map(({ val, icon, desc, badge }) => (
                <OptionCard key={val} active={printMethod === val} onClick={() => setPrintMethod(val)}
                icon={icon} label={val} sublabel={desc} badge={badge} />
            ))}
            </div>
            {printMethod === "Laser Engraving" && material !== "Stainless Steel" && material !== "Glass" && (
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-700 mt-1">
                <span>⚠️</span>
                <p>Laser engraving works best on <strong>Stainless Steel</strong> or <strong>Glass</strong>. Consider updating your material.</p>
            </div>
            )}
        </Field>

        <Field label="Print Placement" required>
            <div className="flex flex-col gap-2">
            {PLACEMENTS.map(({ val, icon, desc, badge }) => (
                <OptionCard key={val} active={printPlacement === val} onClick={() => setPrintPlacement(val)}
                icon={icon} label={val} sublabel={desc} badge={badge} />
            ))}
            </div>
        </Field>

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
                <p>Use the correct wrap template for your tumbler size. Transparent PNG gives the best results on colored tumblers.</p>
                </div>
            </div>
            )}

            {designMode === "text" && (
            <div className="flex flex-col gap-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Text Design Details</p>

                <Field label="Main Text" required>
                <input type="text" value={mainText} onChange={(e) => setMainText(e.target.value)}
                    placeholder="e.g. Juan dela Cruz, Best Dad Ever..."
                    className={inputCls + (errors.mainText ? " border-red-400 ring-1 ring-red-300" : "")} />
                {errors.mainText && <p className="text-[11px] text-red-500 mt-1">{errors.mainText}</p>}
                </Field>

                <Field label="Subtext / Message">
                <input type="text" value={subText} onChange={(e) => setSubText(e.target.value)}
                    placeholder="e.g. Est. 2025, Stay Hydrated, Class of 2025..."
                    className={inputCls} />
                </Field>

                <Field label="Font Style">
                <select value={fontStyle} onChange={(e) => setFontStyle(e.target.value)} className={selectCls}>
                    {FONTS.map((f) => <option key={f}>{f}</option>)}
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
                <p>Our design team will send you a preview within <strong>24–48 hours</strong> for approval before production.</p>
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
                <p>Upload a CSV or Excel file with columns: <strong>Name, Custom Text, Variation</strong>. Each row = one unique tumbler.</p>
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
            <p>Single design mode — one artwork applied to all units in your order.</p>
            </div>
        )}
        </div>
    </SectionCard>

    {/* Add-ons */}
    <SectionCard title="Add-ons & Extras" icon="⭐">
        <div className="flex flex-col gap-3">
        <AddOnToggle
            label="Name Personalization"
            sublabel="Individual name printed or engraved on each tumbler"
            icon="🪪" priceLabel="+₱10"
            checked={namePerson} onChange={() => setNamePerson(!namePerson)}
        />
        <AddOnToggle
            label="Gift Packaging"
            sublabel="Branded box with tissue wrap — ideal for giveaways and gifting"
            icon="🎁" priceLabel="+₱15"
            checked={giftPkg} onChange={() => setGiftPkg(!giftPkg)}
        />
        <AddOnToggle
            label="Extra Lid"
            sublabel="An additional spare lid included with your tumbler"
            icon="🪄" priceLabel="+₱20"
            checked={extraLid} onChange={() => setExtraLid(!extraLid)}
        />
        <AddOnToggle
            label="Straw Inclusion"
            sublabel="BPA-free reusable straw included per unit"
            icon="🥤" priceLabel="+₱10"
            checked={straw} onChange={() => setStraw(!straw)}
        />
        <AddOnToggle
            label="Temperature Retention Upgrade"
            sublabel="Double-wall vacuum insulation — keeps hot/cold longer"
            icon="🌡️" priceLabel="+₱30"
            checked={tempUpgrade} onChange={() => setTempUpgrade(!tempUpgrade)}
        />
        </div>
    </SectionCard>

    {/* Delivery */}
    <SectionCard title="Delivery" icon="🚚">
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
            <span className="text-xl">🥤</span>
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-600">Live Preview</h2>
        </div>
        <div className="px-6 py-6 flex justify-center bg-gray-50 min-h-52 items-center">
            <TumblerPreview
            tumblerType={tumblerType}
            tumblerColor={useCustomColor ? "Custom" : tumblerColor}
            material={material}
            lidType={lidType}
            printPlacement={printPlacement}
            capacity={effectiveCapacity}
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
                <span className="text-right text-gray-700 font-semibold max-w-[55%] wrap-break-words">{value}</span>
            </div>
            ))}
        </div>
        <div className="mx-6 border-t border-gray-100" />

        {/* Price Breakdown */}
        <div className="px-6 py-4 flex flex-col gap-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Price Breakdown</p>
            <div className="flex justify-between text-sm">
            <span className="text-gray-400">Base price</span>
            <span className="font-semibold text-gray-700">₱150</span>
            </div>
            {material === "Stainless Steel" && (
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">Stainless steel</span>
                <span className="font-semibold text-gray-700">+₱50</span>
            </div>
            )}
            {material === "Glass" && (
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">Glass material</span>
                <span className="font-semibold text-gray-700">+₱40</span>
            </div>
            )}
            {printMethod === "UV Printing" && (
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">UV printing</span>
                <span className="font-semibold text-gray-700">+₱20</span>
            </div>
            )}
            {printMethod === "Sublimation" && (
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">Sublimation</span>
                <span className="font-semibold text-gray-700">+₱25</span>
            </div>
            )}
            {printMethod === "Laser Engraving" && (
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">Laser engraving</span>
                <span className="font-semibold text-gray-700">+₱30</span>
            </div>
            )}
            {printPlacement === "Wrap-around (full body)" && (
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">Wrap-around print</span>
                <span className="font-semibold text-gray-700">+₱15</span>
            </div>
            )}
            {namePerson && (
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">Name personalization</span>
                <span className="font-semibold text-gray-700">+₱10</span>
            </div>
            )}
            {giftPkg && (
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">Gift packaging</span>
                <span className="font-semibold text-gray-700">+₱15</span>
            </div>
            )}
            {extraLid && (
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">Extra lid</span>
                <span className="font-semibold text-gray-700">+₱20</span>
            </div>
            )}
            {straw && (
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">Straw inclusion</span>
                <span className="font-semibold text-gray-700">+₱10</span>
            </div>
            )}
            {tempUpgrade && (
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">Temp. upgrade</span>
                <span className="font-semibold text-gray-700">+₱30</span>
            </div>
            )}

            <div className="flex justify-between text-sm border-t border-gray-100 pt-2 mt-1">
            <span className="text-gray-400">Unit price</span>
            <span className="font-semibold text-gray-700">₱{unitPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
            <span className="text-gray-400">× {quantity} unit{quantity !== 1 ? "s" : ""}</span>
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
            Not sure about materials or print methods? Message us on Facebook or email{" "}
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