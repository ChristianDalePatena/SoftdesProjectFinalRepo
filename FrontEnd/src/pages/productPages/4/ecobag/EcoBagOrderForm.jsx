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

// ── Eco Bag SVG Preview ────────────────────────────────────────────────────────
function EcoBagPreview({ bagType, bagColor, handleType, printPlacement, hasDesign, mainText, printMethod }) {
const colorMap = {
"Natural (Beige)": "#e8dcc8",
White:   "#f9fafb",
Black:   "#1f2937",
Green:   "#166534",
Custom:  "#a855f7",
}
const fill    = colorMap[bagColor] || "#e8dcc8"
const isLight = bagColor === "Natural (Beige)" || bagColor === "White"
const strokeC = isLight ? "#d1d5db" : "none"
const textC   = isLight ? "#374151" : "rgba(255,255,255,0.75)"
const lineC   = isLight ? "#9ca3af" : "rgba(255,255,255,0.25)"

const isDrawstring = bagType === "Drawstring Bag"
const isFoldable   = bagType === "Foldable Eco Bag"

// Bag body
const bw = 90, bh = 100
const svgW = bw + 60, svgH = bh + 70
const bx = (svgW - bw) / 2, by = 36

// Handle coords
const handleStroke = isLight ? "#6b7280" : "rgba(255,255,255,0.5)"

return (
<div className="flex flex-col items-center gap-2">
    <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} xmlns="http://www.w3.org/2000/svg">

    {/* Handles */}
    {!isDrawstring && handleType === "Short Handle" && (
        <>
        <path d={`M ${bx + 22} ${by} Q ${bx + 22} ${by - 18} ${bx + 38} ${by - 18}`}
            fill="none" stroke={handleStroke} strokeWidth={3} strokeLinecap="round" />
        <path d={`M ${bx + bw - 22} ${by} Q ${bx + bw - 22} ${by - 18} ${bx + bw - 38} ${by - 18}`}
            fill="none" stroke={handleStroke} strokeWidth={3} strokeLinecap="round" />
        </>
    )}
    {!isDrawstring && handleType === "Long Handle" && (
        <>
        <path d={`M ${bx + 22} ${by} Q ${bx + 22} ${by - 30} ${svgW / 2 - 10} ${by - 30}`}
            fill="none" stroke={handleStroke} strokeWidth={2.5} strokeLinecap="round" />
        <path d={`M ${bx + bw - 22} ${by} Q ${bx + bw - 22} ${by - 30} ${svgW / 2 + 10} ${by - 30}`}
            fill="none" stroke={handleStroke} strokeWidth={2.5} strokeLinecap="round" />
        </>
    )}
    {isDrawstring && (
        <>
        <line x1={svgW / 2 - 14} y1={by} x2={svgW / 2 - 14} y2={by - 26}
            stroke={handleStroke} strokeWidth={1.5} strokeDasharray="3 2" strokeLinecap="round" />
        <line x1={svgW / 2 + 14} y1={by} x2={svgW / 2 + 14} y2={by - 26}
            stroke={handleStroke} strokeWidth={1.5} strokeDasharray="3 2" strokeLinecap="round" />
        <circle cx={svgW / 2 - 14} cy={by - 28} r={3} fill={handleStroke} />
        <circle cx={svgW / 2 + 14} cy={by - 28} r={3} fill={handleStroke} />
        </>
    )}

    {/* Bag body */}
    <rect x={bx} y={by} width={bw} height={bh} rx={isFoldable ? 4 : 8}
        fill={fill} stroke={strokeC} strokeWidth={isLight ? 1 : 0} />

    {/* Foldable fold lines */}
    {isFoldable && (
        <>
        <line x1={bx} y1={by + bh * 0.33} x2={bx + bw} y2={by + bh * 0.33}
            stroke={lineC} strokeWidth={0.8} strokeDasharray="4 3" />
        <line x1={bx} y1={by + bh * 0.66} x2={bx + bw} y2={by + bh * 0.66}
            stroke={lineC} strokeWidth={0.8} strokeDasharray="4 3" />
        </>
    )}

    {/* Seam lines */}
    <line x1={bx + 6} y1={by + 4} x2={bx + 6} y2={by + bh - 4}
        stroke={lineC} strokeWidth={0.6} />
    <line x1={bx + bw - 6} y1={by + 4} x2={bx + bw - 6} y2={by + bh - 4}
        stroke={lineC} strokeWidth={0.6} />

    {/* Print area */}
    {(hasDesign || mainText) ? (
        <>
        {mainText ? (
            <text x={svgW / 2} y={by + bh / 2 - 4} textAnchor="middle"
            fontSize={10} fontWeight="bold" fill={textC} fontFamily="serif">
            {mainText.slice(0, 12)}
            </text>
        ) : (
            <rect x={bx + 18} y={by + bh / 2 - 14} width={bw - 36} height={10}
            rx={2} fill={isLight ? "#ef4444" : "rgba(255,120,100,0.5)"} opacity={0.7} />
        )}
        {[0, 1].map((i) => (
            <rect key={i} x={bx + 22} y={by + bh / 2 + 4 + i * 7} width={[(bw - 44) * 0.75, (bw - 44) * 0.55][i]}
            height={3} rx={1.5} fill={textC} opacity={0.4} />
        ))}
        </>
    ) : (
        <g opacity={0.18}>
        <rect x={svgW / 2 - 14} y={by + bh / 2 - 14} width={28} height={28} rx={4}
            fill={isLight ? "#6b7280" : "#ffffff"} />
        <line x1={svgW / 2 - 8} y1={by + bh / 2 - 5} x2={svgW / 2 + 8} y2={by + bh / 2 - 5}
            stroke={isLight ? "#fff" : "#9ca3af"} strokeWidth={1.5} />
        <line x1={svgW / 2 - 8} y1={by + bh / 2 + 1} x2={svgW / 2 + 4} y2={by + bh / 2 + 1}
            stroke={isLight ? "#fff" : "#9ca3af"} strokeWidth={1} />
        <line x1={svgW / 2 - 8} y1={by + bh / 2 + 6} x2={svgW / 2 + 6} y2={by + bh / 2 + 6}
            stroke={isLight ? "#fff" : "#9ca3af"} strokeWidth={1} />
        </g>
    )}

    {/* Back print indicator */}
    {printPlacement === "Both Sides" && (
        <g>
        <rect x={bx + bw - 20} y={by + 6} width={18} height={10} rx={3} fill="#3b82f6" opacity={0.85} />
        <text x={bx + bw - 11} y={by + 14} textAnchor="middle" fontSize={6} fontWeight="bold" fill="white">F+B</text>
        </g>
    )}
    {printPlacement === "Back" && (
        <g>
        <rect x={bx + bw - 20} y={by + 6} width={18} height={10} rx={3} fill="#6b7280" opacity={0.85} />
        <text x={bx + bw - 11} y={by + 14} textAnchor="middle" fontSize={6} fontWeight="bold" fill="white">BCK</text>
        </g>
    )}

    {/* Embroidery texture hint */}
    {printMethod === "Embroidery" && (hasDesign || mainText) && (
        <rect x={bx + 16} y={by + bh / 2 - 16} width={bw - 32} height={32} rx={4}
        fill="none" stroke={isLight ? "#9ca3af" : "rgba(255,255,255,0.2)"} strokeWidth={0.8} strokeDasharray="2 2" />
    )}

    {/* Bottom gusset hint */}
    <rect x={bx + 3} y={by + bh - 8} width={bw - 6} height={7} rx={4}
        fill={isLight ? "rgba(0,0,0,0.04)" : "rgba(0,0,0,0.2)"} />

    </svg>
    <p className="text-[9px] text-gray-400 italic">{bagType} · {bagColor}</p>
    <p className="text-[9px] text-gray-500 font-semibold">{handleType} · {printPlacement} Print</p>
</div>
)
}

// ── Pricing ────────────────────────────────────────────────────────────────────
function computePrice({ printMethod, printPlacement, innerPocket, zipper, gusset, customTag, waterproofLining, qty }) {
let unit = 80
if (printMethod === "Screen Printing")  unit += 20
if (printMethod === "Heat Transfer")    unit += 25
if (printMethod === "Sublimation")      unit += 30
if (printMethod === "Embroidery")       unit += 35
if (printPlacement === "Both Sides")    unit += 15
if (printPlacement === "Back")          unit += 15
if (innerPocket)      unit += 15
if (zipper)           unit += 20
if (gusset)           unit += 15
if (customTag)        unit += 10
if (waterproofLining) unit += 25
return { unitPrice: unit, total: unit * Math.max(1, qty) }
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function EcoBagOrderForm() {
// A. Bag Details
const [bagType, setBagType]       = useState("Tote Bag")
const [size, setSize]             = useState("Medium")
const [customSize, setCustomSize] = useState("")
const [qty, setQty]               = useState(1)

// B. Material & Color
const [material, setMaterial]       = useState("Cotton")
const [bagColor, setBagColor]       = useState("Natural (Beige)")
const [customColor, setCustomColor] = useState("")
const [handleType, setHandleType]   = useState("Long Handle")

// C. Customization
const [printMethod, setPrintMethod]       = useState("Screen Printing")
const [designMode, setDesignMode]         = useState("upload") // "upload" | "text"
const [designFile, setDesignFile]         = useState(null)
const [mainText, setMainText]             = useState("")
const [secondaryText, setSecondaryText]   = useState("")
const [fontStyle, setFontStyle]           = useState("Sans-serif")
const [printColor, setPrintColor]         = useState("#ef4444")
const [printPlacement, setPrintPlacement] = useState("Front")
const designRef = useRef()

// D. Bulk Order
const [bulkOrder, setBulkOrder]   = useState(false)
const [csvFile, setCsvFile]       = useState(null)
const csvRef = useRef()

// E. Add-ons
const [innerPocket, setInnerPocket]           = useState(false)
const [zipper, setZipper]                     = useState(false)
const [gusset, setGusset]                     = useState(false)
const [customTag, setCustomTag]               = useState(false)
const [waterproofLining, setWaterproofLining] = useState(false)

// F. Delivery
const [delivery, setDelivery] = useState("Pickup")
const [address, setAddress]   = useState("")

const [errors, setErrors] = useState({})

const validate = () => {
const e = {}
if (!qty || qty < 1)                                  e.qty = "Quantity must be at least 1"
if (size === "Custom" && !customSize.trim())          e.customSize = "Please enter a custom size"
if (designMode === "upload" && !designFile && !bulkOrder) e.design = "Please upload a design file"
if (designMode === "text" && !mainText.trim())        e.mainText = "Please enter main text"
if (delivery === "Delivery" && !address.trim())       e.address = "Please enter a delivery address"
if (bulkOrder && !csvFile)                            e.csv = "Please upload a CSV/Excel file for bulk variations"
setErrors(e)
return Object.keys(e).length === 0
}

const handleSubmit = () => {
if (!validate()) return
alert(`✅ Order submitted!\n\nEco Bag – ${bagType}\nMaterial: ${material}\nQty: ${qty.toLocaleString()} pc${qty !== 1 ? "s" : ""}\nTotal: ₱${pricing.total.toLocaleString()}`)
}

const pricing = computePrice({ printMethod, printPlacement, innerPocket, zipper, gusset, customTag, waterproofLining, qty })

const BAG_TYPES    = ["Tote Bag", "Drawstring Bag", "Canvas Bag", "Foldable Eco Bag"]
const SIZES        = ["Small", "Medium", "Large", "Custom"]
const MATERIALS    = [
{ val: "Cotton",             icon: "🌿", desc: "Soft, breathable, classic eco choice" },
{ val: "Canvas",             icon: "🧱", desc: "Heavy-duty, structured, long-lasting" },
{ val: "Non-woven Fabric",   icon: "♻️", desc: "Lightweight, affordable, recyclable" },
{ val: "Recycled Polyester", icon: "🔄", desc: "Made from post-consumer plastic bottles" },
]
const COLORS = ["Natural (Beige)", "White", "Black", "Green", "Custom"]
const colorDots = { "Natural (Beige)": "#e8dcc8", White: "#f3f4f6", Black: "#1f2937", Green: "#166534", Custom: "#a855f7" }
const HANDLES  = ["Short Handle", "Long Handle", "Drawstring"]
const METHODS  = [
{ val: "Screen Printing", icon: "🖨️", desc: "Crisp flat colors — best for bold logos", badge: "+₱20" },
{ val: "Heat Transfer",   icon: "🔥", desc: "Detailed, vibrant — photos welcome",       badge: "+₱25" },
{ val: "Sublimation",     icon: "🌈", desc: "Full-color, fade-resistant, all-over",     badge: "+₱30" },
{ val: "Embroidery",      icon: "🧵", desc: "Stitched raised look — premium finish",    badge: "+₱35" },
]
const PLACEMENTS = ["Front", "Back", "Both Sides"]
const FONTS      = ["Sans-serif", "Serif", "Script / Handwritten", "Bold Display", "Monospace"]

const activeAddOns = [
innerPocket      && "Inner Pocket (+₱15)",
zipper           && "Zipper (+₱20)",
gusset           && "Gusset (+₱15)",
customTag        && "Custom Tag (+₱10)",
waterproofLining && "Waterproof Lining (+₱25)",
].filter(Boolean)

const summaryRows = [
{ label: "Bag Type",     value: bagType },
{ label: "Size",         value: size === "Custom" ? (customSize || "Custom") : size },
{ label: "Material",     value: material },
{ label: "Color",        value: bagColor === "Custom" ? (customColor || "Custom") : bagColor },
{ label: "Handle",       value: handleType },
{ label: "Print Method", value: printMethod },
{ label: "Placement",    value: printPlacement + (printPlacement !== "Front" ? " (+₱15)" : "") },
{ label: "Design Mode",  value: designMode === "upload" ? "File Upload" : "Text-Based" },
{ label: "Bulk Order",   value: bulkOrder ? "Yes (CSV/Excel)" : "No" },
{ label: "Quantity",     value: `${qty.toLocaleString()} pc${qty !== 1 ? "s" : ""}` },
...(activeAddOns.length ? [{ label: "Add-ons", value: activeAddOns.join(", ") }] : []),
{ label: "Delivery",     value: delivery },
]

return (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

    {/* ── LEFT ─────────────────────────────────────────────────── */}
    <div className="xl:col-span-2 flex flex-col gap-6">

    {/* Bag Details */}
    <SectionCard title="Bag Details" icon="👜">
        <div className="flex flex-col gap-5">

        <Field label="Bag Type" required>
            <select value={bagType} onChange={(e) => {
            setBagType(e.target.value)
            if (e.target.value === "Drawstring Bag") setHandleType("Drawstring")
            else if (handleType === "Drawstring") setHandleType("Long Handle")
            }} className={selectCls}>
            {BAG_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
        </Field>

        <Field label="Size" required>
            <div className="grid grid-cols-4 gap-2">
            {SIZES.map((s) => (
                <button key={s} type="button" onClick={() => setSize(s)}
                className={`py-2.5 rounded-xl border-2 text-sm font-bold text-center transition-all ${
                    size === s
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-200 bg-white text-gray-500 hover:border-red-300"
                }`}>
                {s}
                </button>
            ))}
            </div>
            {size === "Custom" && (
            <div className="mt-2">
                <input type="text" value={customSize} onChange={(e) => setCustomSize(e.target.value)}
                placeholder="e.g. 38x42 cm" className={inputCls + (errors.customSize ? " border-red-400 ring-1 ring-red-300" : "")} />
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

    {/* Material & Color */}
    <SectionCard title="Material & Color" icon="🌿">
        <div className="flex flex-col gap-5">

        <Field label="Material">
            <div className="flex flex-col gap-2">
            {MATERIALS.map(({ val, icon, desc }) => (
                <OptionCard key={val} active={material === val} onClick={() => setMaterial(val)}
                icon={icon} label={val} sublabel={desc} />
            ))}
            </div>
        </Field>

        <Field label="Bag Color">
            <div className="flex gap-2 flex-wrap">
            {COLORS.map((c) => (
                <button key={c} type="button" onClick={() => setBagColor(c)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 text-sm font-bold transition-all ${
                    bagColor === c
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-red-300"
                }`}>
                <span className="w-4 h-4 rounded-full border border-gray-300 shrink-0"
                    style={{ background: colorDots[c] }} />
                {c}
                </button>
            ))}
            </div>
            {bagColor === "Custom" && (
            <input type="text" value={customColor} onChange={(e) => setCustomColor(e.target.value)}
                placeholder="e.g. Pantone 340 C, olive green, dusty rose..."
                className={inputCls + " mt-2"} />
            )}
        </Field>

        <Field label="Handle Type">
            <div className="flex flex-col gap-2">
            {HANDLES.map((h) => {
                const disabled = h === "Drawstring" && bagType !== "Drawstring Bag"
                return (
                <button key={h} type="button"
                    onClick={() => !disabled && setHandleType(h)}
                    disabled={disabled}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left w-full transition-all ${
                    handleType === h
                        ? "border-red-500 bg-red-50"
                        : disabled
                        ? "border-gray-100 bg-gray-50 opacity-40 cursor-not-allowed"
                        : "border-gray-200 bg-white hover:border-red-300"
                    }`}>
                    <span className="text-sm font-bold text-gray-700">{h}</span>
                    {disabled && <span className="text-[10px] text-gray-400 ml-auto">Drawstring bags only</span>}
                </button>
                )
            })}
            </div>
        </Field>

        </div>
    </SectionCard>

    {/* Customization */}
    <SectionCard title="Customization" icon="🎨">
        <div className="flex flex-col gap-5">

        {/* Print Method */}
        <Field label="Print Method">
            <div className="flex flex-col gap-2">
            {METHODS.map(({ val, icon, desc, badge }) => (
                <OptionCard key={val} active={printMethod === val} onClick={() => setPrintMethod(val)}
                icon={icon} label={val} sublabel={desc} badge={badge} />
            ))}
            </div>
        </Field>

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
            <Field label="Upload Design File" hint="PNG, JPG, PDF, AI accepted · 300 DPI recommended" required>
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
                    <p className="text-xs text-gray-400">PNG, JPG, PDF, AI — print-ready preferred</p>
                </>
                )}
                <input ref={designRef} type="file" accept="image/*,.pdf,.ai,.eps"
                className="hidden" onChange={(e) => setDesignFile(e.target.files[0] || null)} />
            </div>
            {errors.design && <p className="text-[11px] text-red-500 mt-1">{errors.design}</p>}
            </Field>
        )}

        {/* Text-Based Design */}
        {designMode === "text" && (
            <div className="flex flex-col gap-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
            <Field label="Main Text" required>
                <input type="text" value={mainText} onChange={(e) => setMainText(e.target.value)}
                placeholder="e.g. Eco Warriors, Brand Name..."
                className={inputCls + (errors.mainText ? " border-red-400 ring-1 ring-red-300" : "")} />
                {errors.mainText && <p className="text-[11px] text-red-500 mt-1">{errors.mainText}</p>}
            </Field>

            <Field label="Secondary Text" hint="Tagline, slogan, or subtitle">
                <input type="text" value={secondaryText} onChange={(e) => setSecondaryText(e.target.value)}
                placeholder="e.g. Reduce · Reuse · Recycle" className={inputCls} />
            </Field>

            <Field label="Font Style">
                <select value={fontStyle} onChange={(e) => setFontStyle(e.target.value)} className={selectCls}>
                {FONTS.map((f) => <option key={f}>{f}</option>)}
                </select>
            </Field>

            <Field label="Print Color">
                <div className="flex items-center gap-3">
                <input type="color" value={printColor} onChange={(e) => setPrintColor(e.target.value)}
                    className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-1" />
                <span className="text-sm text-gray-600 font-semibold">{printColor.toUpperCase()}</span>
                <span className="text-xs text-gray-400">— Selected print ink color</span>
                </div>
            </Field>
            </div>
        )}

        {/* Print Placement */}
        <Field label="Print Placement">
            <div className="flex gap-2">
            {PLACEMENTS.map((p) => (
                <ToggleBtn key={p} active={printPlacement === p} onClick={() => setPrintPlacement(p)}>
                {p}{p !== "Front" && <span className="ml-1 text-[10px] opacity-75">(+₱15)</span>}
                </ToggleBtn>
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
            sublabel="Personalize each bag with different names or text via CSV/Excel upload"
            icon="📊"
            priceLabel={bulkOrder ? "Active" : "Off"}
            checked={bulkOrder}
            onChange={() => { setBulkOrder(!bulkOrder); setCsvFile(null) }}
        />

        {bulkOrder && (
            <div className="flex flex-col gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
            <p className="text-xs font-bold text-blue-700 uppercase tracking-wider">Upload Variations File</p>
            <p className="text-xs text-blue-600 leading-relaxed">
                Prepare a CSV or Excel file with columns: <strong>Name</strong>, <strong>Text Line 1</strong>, <strong>Text Line 2</strong>, <strong>Special Notes</strong>. One row per bag.
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
            <p>Single design only — all bags will have the same print. Enable bulk mode for personalized variations per bag.</p>
            </div>
        )}

        </div>
    </SectionCard>

    {/* Add-ons */}
    <SectionCard title="Add-ons" icon="⭐">
        <div className="flex flex-col gap-3">
        <AddOnToggle label="Inner Pocket" sublabel="Zippered inner compartment for valuables"
            icon="🗂️" priceLabel="+₱15" checked={innerPocket} onChange={() => setInnerPocket(!innerPocket)} />
        <AddOnToggle label="Zipper Closure" sublabel="Keeps contents secure — adds a zipper at the top opening"
            icon="🤐" priceLabel="+₱20" checked={zipper} onChange={() => setZipper(!zipper)} />
        <AddOnToggle label="Gusset (Expanded Bottom)" sublabel="Wider base for more volume and stability"
            icon="📐" priceLabel="+₱15" checked={gusset} onChange={() => setGusset(!gusset)} />
        <AddOnToggle label="Custom Tag / Label" sublabel="Sewn-in branded tag with logo or care instructions"
            icon="🏷️" priceLabel="+₱10" checked={customTag} onChange={() => setCustomTag(!customTag)} />
        <AddOnToggle label="Waterproof Lining" sublabel="Inner laminated coating to protect bag contents"
            icon="💧" priceLabel="+₱25" checked={waterproofLining} onChange={() => setWaterproofLining(!waterproofLining)} />
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

    {/* ── RIGHT: Sidebar ──────────────────────────────── */}
    <div className="xl:col-span-1">
    <div className="sticky top-35 flex flex-col gap-4">

        {/* Live Preview */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-linear-to-r from-gray-50 to-white">
            <span className="text-xl">👜</span>
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-600">Live Preview</h2>
        </div>
        <div className="px-6 py-6 flex justify-center bg-gray-50 min-h-55 items-center">
            <EcoBagPreview
            bagType={bagType}
            bagColor={bagColor}
            handleType={handleType}
            printPlacement={printPlacement}
            hasDesign={!!designFile}
            mainText={designMode === "text" ? mainText : ""}
            printMethod={printMethod}
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
            Not sure which material or print method fits your brand? Message us on Facebook or email{" "}
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