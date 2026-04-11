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
    active ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:border-red-300"
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
    }`}>{badge}</span>
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
    }`}>{priceLabel}</span>
    <div className={`w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center transition-all ${
    checked ? "bg-red-500 border-red-500" : "border-gray-300"
    }`}>
    {checked && <span className="text-white text-[10px] font-black">✓</span>}
    </div>
</button>
)
}

// ── Border Color Palette ───────────────────────────────────────────────────────
const BORDER_COLORS = [
{ label: "Black",  hex: "#111827" },
{ label: "Gold",   hex: "#ca8a04" },
{ label: "Red",    hex: "#ef4444" },
{ label: "Blue",   hex: "#3b82f6" },
{ label: "Green",  hex: "#22c55e" },
{ label: "Pink",   hex: "#ec4899" },
{ label: "Yellow", hex: "#eab308" },
{ label: "Orange", hex: "#f97316" },
]

function BorderColorPicker({ selected, onSelect, customColor, onCustomColor }) {
return (
<div className="flex flex-col gap-3">
    <div className="flex flex-wrap gap-3">
    {BORDER_COLORS.map((c) => (
        <button key={c.hex} type="button" title={c.label} onClick={() => onSelect(c.hex)}
        className="flex flex-col items-center gap-1 group">
        <div
            className={`w-10 h-10 rounded-full border-[3px] transition-all ${
            selected === c.hex ? "scale-110 shadow-md border-gray-700" : "border-transparent hover:scale-105"
            }`}
            style={{ background: c.hex }}
        />
        <span className="text-[10px] text-gray-500 font-semibold group-hover:text-gray-700">{c.label}</span>
        </button>
    ))}
    {/* Custom swatch */}
    <button type="button" title="Custom" onClick={() => onSelect("custom")}
        className="flex flex-col items-center gap-1 group">
        <div
        className={`w-10 h-10 rounded-full border-[3px] transition-all ${
            selected === "custom" ? "scale-110 shadow-md border-gray-700" : "border-transparent hover:scale-105"
        }`}
        style={{ background: "conic-gradient(red,yellow,lime,cyan,blue,magenta,red)" }}
        />
        <span className="text-[10px] text-gray-500 font-semibold group-hover:text-gray-700">Custom</span>
    </button>
    </div>
    {selected === "custom" && (
    <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100 mt-1">
        <input type="color" value={customColor} onChange={(e) => onCustomColor(e.target.value)}
        className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5 bg-white" />
        <input type="text" value={customColor} onChange={(e) => onCustomColor(e.target.value)}
        className={inputCls + " max-w-36 font-mono"} />
        <span className="text-xs text-gray-400">Enter any hex code</span>
    </div>
    )}
</div>
)
}

// ── Fan SVG Preview ────────────────────────────────────────────────────────────
function FanPreview({ rimHex, size, fanStyle, edgeStyle, printStyle }) {
const sizeLabel = { "6 inches": "6″", "8 inches": "8″", "10 inches": "10″" }[size] || "C″"
const rimR = 58
const faceR = edgeStyle === "Full Print (no border)" ? 58 : 50

return (
<div className="flex flex-col items-center gap-2">
    <svg width="140" height="175" viewBox="0 0 140 175" xmlns="http://www.w3.org/2000/svg">

    {/* Ground shadow */}
    <ellipse cx="70" cy="162" rx="46" ry="6" fill="#e5e7eb" />

    {/* Outer colored rim */}
    {edgeStyle !== "Full Print (no border)" && (
        <circle cx="70" cy="76" r={rimR} fill={rimHex} />
    )}

    {/* Fan face */}
    <circle cx="70" cy="76" r={faceR} fill="white" />

    {/* Subtle design hint circle */}
    <circle cx="70" cy="76" r={faceR - 10} fill={rimHex} opacity="0.07" />

    {/* Center text placeholder */}
    <text x="70" y="70" textAnchor="middle" fontSize="9" fontWeight="bold"
        fill={rimHex} opacity="0.65">YOUR</text>
    <text x="70" y="82" textAnchor="middle" fontSize="9" fontWeight="bold"
        fill={rimHex} opacity="0.65">DESIGN</text>
    {printStyle === "Double-sided" && (
        <text x="70" y="94" textAnchor="middle" fontSize="7"
        fill={rimHex} opacity="0.4">2-SIDED</text>
    )}

    {/* Size badge */}
    <rect x="92" y="24" width="30" height="16" rx="8" fill={rimHex} opacity="0.9" />
    <text x="107" y="35" textAnchor="middle" fontSize="8" fontWeight="bold" fill="white">{sizeLabel}</text>

    {/* Handle */}
    {fanStyle === "Round Fan (Standard)" && (
        <>
        <rect x="55" y="128" width="30" height="20" rx="10" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="1.5" />
        <rect x="66" y="130" width="8" height="16" rx="4" fill="#d1d5db" />
        </>
    )}
    {fanStyle === "Round Fan with Handle Extension" && (
        <>
        <rect x="66" y="128" width="8" height="38" rx="4" fill="#92400e" opacity="0.8" />
        <rect x="63" y="162" width="14" height="5" rx="2.5" fill="#78350f" opacity="0.6" />
        </>
    )}
    {fanStyle === "Custom Shape Fan" && (
        <>
        <rect x="66" y="128" width="8" height="38" rx="4" fill="#6b7280" opacity="0.75" />
        <text x="70" y="175" textAnchor="middle" fontSize="6.5" fill="#9ca3af">Custom</text>
        </>
    )}

    </svg>

    <p className="text-[9px] text-gray-400 italic">{fanStyle}</p>
    <div className="flex items-center gap-2">
    <div className="w-3 h-3 rounded-full border border-gray-300 shrink-0"
        style={{ background: rimHex }} />
    <p className="text-[9px] text-gray-500 font-semibold">
        {BORDER_COLORS.find(c => c.hex === rimHex)?.label || "Custom"} rim · {size}
    </p>
    </div>
</div>
)
}

// ── Pricing ────────────────────────────────────────────────────────────────────
function computePrice({ size, material, printStyle, doubleSided, glossLam, matteLam, uvCoating, packaging }) {
let base = 12
if (size === "8 inches" || size === "10 inches") base += 3
if (material === "PVC Board" || material === "Sintra Board") base += 5
if (printStyle === "Double-sided" || doubleSided) base += 3
if (glossLam || matteLam) base += 2
if (uvCoating) base += 2
if (packaging) base += 2
return base
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function RoundFanOrderForm() {

// A. Fan Details
const [fanStyle, setFanStyle]       = useState("Round Fan (Standard)")
const [size, setSize]               = useState("8 inches")
const [customSize, setCustomSize]   = useState("")
const [borderColor, setBorderColor] = useState("#ef4444")
const [customColor, setCustomColor] = useState("#ef4444")
const [quantity, setQuantity]       = useState(100)

// B. Material & Build
const [material, setMaterial]         = useState("Cardboard")
const [printSurface, setPrintSurface] = useState("Direct Print")
const [handleType, setHandleType]     = useState("Plastic Handle")

// C. Printing Options
const [printStyle, setPrintStyle] = useState("Single-sided")
const [edgeStyle, setEdgeStyle]   = useState("Standard Colored Rim")

// D. Customization
const [designMode, setDesignMode]         = useState("upload")
const [designFile, setDesignFile]         = useState(null)
const [photoFile, setPhotoFile]           = useState(null)
const [candidateName, setCandidateName]   = useState("")
const [subtitle, setSubtitle]             = useState("")
const [eventDate, setEventDate]           = useState("")
const [colorTheme, setColorTheme]         = useState("#ef4444")
const [colorThemeDesc, setColorThemeDesc] = useState("")
const designRef = useRef()
const photoRef  = useRef()

// E. Bulk
const [bulkOrder, setBulkOrder] = useState(false)
const [csvFile, setCsvFile]     = useState(null)
const csvRef = useRef()

// F. Add-ons
const [doubleSided, setDoubleSided] = useState(false)
const [glossLam, setGlossLam]       = useState(false)
const [matteLam, setMatteLam]       = useState(false)
const [uvCoating, setUvCoating]     = useState(false)
const [packaging, setPackaging]     = useState(false)

// G. Delivery
const [delivery, setDelivery] = useState("Pickup")
const [address, setAddress]   = useState("")

const [errors, setErrors] = useState({})

const validate = () => {
const e = {}
if (quantity < 1) e.quantity = "Quantity must be at least 1"
if (size === "Custom size" && !customSize.trim()) e.customSize = "Please specify custom size"
if (designMode === "upload" && !designFile) e.designFile = "Please upload a design file"
if (designMode === "manual" && !candidateName.trim()) e.candidateName = "Please enter a name or event title"
if (bulkOrder && !csvFile) e.csvFile = "Please upload a CSV/Excel file for bulk data"
if (delivery === "Delivery" && !address.trim()) e.address = "Please enter a delivery address"
setErrors(e)
return Object.keys(e).length === 0
}

const handleSubmit = () => {
if (!validate()) return
alert(`✅ Order submitted!\n\nFan: ${fanStyle}\nQty: ${quantity.toLocaleString()}\nBorder: ${BORDER_COLORS.find(c=>c.hex===borderColor)?.label??'Custom'}\nMaterial: ${material}\nTotal: ₱${total.toLocaleString()}`)
}

const handleGloss = () => { setGlossLam(v => { if (!v) setMatteLam(false); return !v }) }
const handleMatte = () => { setMatteLam(v => { if (!v) setGlossLam(false); return !v }) }

const rimHex = borderColor === "custom" ? customColor : borderColor
const pricePerFan = computePrice({ size, material, printStyle, doubleSided, glossLam, matteLam, uvCoating, packaging })
const total = Math.max(1, quantity) * pricePerFan

const FAN_STYLES = [
{ val: "Round Fan (Standard)",           icon: "🪭", desc: "Classic circle fan with back pocket for handle" },
{ val: "Round Fan with Handle Extension",icon: "📌", desc: "Extended stick handle — better grip for campaigns & rallies" },
{ val: "Custom Shape Fan",               icon: "✂️", desc: "Die-cut to your preferred outline or shape", badge: "Custom" },
]
const SIZES = ["6 inches", "8 inches", "10 inches", "Custom size"]
const MATERIALS = [
{ val: "Cardboard",    icon: "📄", desc: "Lightweight, eco-friendly — great for high-volume events" },
{ val: "PVC Board",    icon: "🛡️", desc: "Durable rigid board — weather-resistant",   badge: "+₱5/pc" },
{ val: "Sintra Board", icon: "🔲", desc: "Foam PVC — lightweight yet sturdy and stiff", badge: "+₱5/pc" },
]
const PRINT_SURFACES = [
{ val: "Direct Print",  icon: "🖨️", desc: "Ink printed directly onto the fan surface" },
{ val: "Sticker Print", icon: "🏷️", desc: "Full-face sticker applied over the fan board" },
]
const HANDLE_TYPES = [
{ val: "Plastic Handle",  icon: "🔵", desc: "Standard white flat plastic stick" },
{ val: "Die-cut Handle",  icon: "✂️", desc: "Handle integrated as part of the fan cutout" },
{ val: "No Handle",       icon: "⛔", desc: "No handle — mount, glue, or use as is" },
]

const activeAddOns = [
doubleSided && "Double-Sided (+₱3)",
glossLam    && "Gloss Lamination (+₱2)",
matteLam    && "Matte Lamination (+₱2)",
uvCoating   && "UV Coating (+₱2)",
packaging   && "Individual Packaging (+₱2)",
].filter(Boolean)

const summaryRows = [
{ label: "Fan Style",     value: fanStyle },
{ label: "Size",          value: size === "Custom size" ? (customSize || "Custom") : size },
{ label: "Border Color",  value: BORDER_COLORS.find(c => c.hex === borderColor)?.label ?? "Custom" },
{ label: "Quantity",      value: quantity.toLocaleString() },
{ label: "Material",      value: material },
{ label: "Print Surface", value: printSurface },
{ label: "Handle",        value: handleType },
{ label: "Print Style",   value: printStyle },
{ label: "Edge Style",    value: edgeStyle },
{ label: "Design",        value: designMode === "upload" ? "File Upload" : "Manual Entry" },
{ label: "Bulk Order",    value: bulkOrder ? "Yes (CSV)" : "No" },
{ label: "Delivery",      value: delivery },
...(activeAddOns.length ? [{ label: "Add-ons", value: activeAddOns.join(", ") }] : []),
]

return (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

    {/* ── LEFT COLUMN ──────────────────────────────────── */}
    <div className="xl:col-span-2 flex flex-col gap-6">

    {/* A. Fan Details */}
    <SectionCard title="Fan Details" icon="🪭">
        <div className="flex flex-col gap-5">

        <Field label="Fan Style" required>
            <div className="flex flex-col gap-2">
            {FAN_STYLES.map(({ val, icon, desc, badge }) => (
                <OptionCard key={val} active={fanStyle === val} onClick={() => setFanStyle(val)}
                icon={icon} label={val} sublabel={desc} badge={badge} />
            ))}
            </div>
        </Field>

        <Field label="Fan Size" required>
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
                placeholder="e.g. 9 inches diameter"
                className={inputCls + (errors.customSize ? " border-red-400 ring-1 ring-red-300" : "")} />
                {errors.customSize && <p className="text-[11px] text-red-500 mt-1">{errors.customSize}</p>}
            </div>
            )}
            {(size === "8 inches" || size === "10 inches") && (
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-xl px-4 py-2 text-xs text-amber-700 mt-1">
                <span>⚠️</span>
                <span>This size adds <strong>₱3/pc</strong> to the base price.</span>
            </div>
            )}
        </Field>

        <Field label="Border / Rim Color" hint="Select the colored edge ring — matches the product photo" required>
            <BorderColorPicker
            selected={borderColor}
            onSelect={setBorderColor}
            customColor={customColor}
            onCustomColor={setCustomColor}
            />
        </Field>

        <Field label="Quantity" required>
            <div className="flex items-center gap-3">
            <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-xl border-2 border-gray-200 text-xl font-bold text-gray-500 hover:border-red-300 hover:text-red-500 transition-all flex items-center justify-center">
                −
            </button>
            <input type="number" min={1} value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className={inputCls + " text-center font-bold text-lg" + (errors.quantity ? " border-red-400 ring-1 ring-red-300" : "")} />
            <button type="button" onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-xl border-2 border-gray-200 text-xl font-bold text-gray-500 hover:border-red-300 hover:text-red-500 transition-all flex items-center justify-center">
                +
            </button>
            </div>
            {errors.quantity && <p className="text-[11px] text-red-500 mt-1">{errors.quantity}</p>}
            {quantity >= 500 && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-4 py-2 text-xs text-green-700 mt-1">
                <span>🎉</span>
                <span className="font-semibold">Large campaign order! Contact us for bulk pricing and rush slots.</span>
            </div>
            )}
        </Field>

        </div>
    </SectionCard>

    {/* B. Material & Build */}
    <SectionCard title="Material & Build" icon="🏗️">
        <div className="flex flex-col gap-5">

        <Field label="Fan Board Material" required>
            <div className="flex flex-col gap-2">
            {MATERIALS.map(({ val, icon, desc, badge }) => (
                <OptionCard key={val} active={material === val} onClick={() => setMaterial(val)}
                icon={icon} label={val} sublabel={desc} badge={badge} />
            ))}
            </div>
        </Field>

        <Field label="Print Surface" required>
            <div className="flex flex-col gap-2">
            {PRINT_SURFACES.map(({ val, icon, desc }) => (
                <OptionCard key={val} active={printSurface === val} onClick={() => setPrintSurface(val)}
                icon={icon} label={val} sublabel={desc} />
            ))}
            </div>
        </Field>

        <Field label="Handle Type" required>
            <div className="flex flex-col gap-2">
            {HANDLE_TYPES.map(({ val, icon, desc }) => (
                <OptionCard key={val} active={handleType === val} onClick={() => setHandleType(val)}
                icon={icon} label={val} sublabel={desc} />
            ))}
            </div>
        </Field>

        </div>
    </SectionCard>

    {/* C. Printing Options */}
    <SectionCard title="Printing Options" icon="🖨️">
        <div className="flex flex-col gap-5">

        <Field label="Print Style" required>
            <div className="flex gap-3">
            {["Single-sided", "Double-sided"].map((s) => (
                <ToggleBtn key={s} active={printStyle === s} onClick={() => setPrintStyle(s)}>
                {s === "Single-sided" ? "◑ Single-sided" : "◉ Double-sided"}
                </ToggleBtn>
            ))}
            </div>
            {printStyle === "Double-sided" && (
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-4 py-2 text-xs text-blue-700 mt-2">
                <span>💡</span>
                <span>Adds <strong>₱3/pc</strong>. Provide a second design file for the back face, or we'll mirror the front.</span>
            </div>
            )}
        </Field>

        <Field label="Edge Style" required>
            <div className="flex gap-3">
            {["Standard Colored Rim", "Full Print (no border)"].map((s) => (
                <button key={s} type="button" onClick={() => setEdgeStyle(s)}
                className={`flex-1 py-3 px-3 rounded-xl border-2 text-sm font-bold text-center transition-all ${
                    edgeStyle === s
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-200 bg-white text-gray-500 hover:border-red-300"
                }`}>
                {s === "Standard Colored Rim" ? "🔴 Colored Rim" : "🖼️ Full Print"}
                </button>
            ))}
            </div>
            <p className="text-[11px] text-gray-400 mt-1">
            {edgeStyle === "Standard Colored Rim"
                ? "Classic election-style fan: colored border ring around the white face."
                : "Your design bleeds to the full edge with no visible rim color."}
            </p>
        </Field>

        </div>
    </SectionCard>

    {/* D. Design & Customization */}
    <SectionCard title="Design & Customization" icon="✏️">
        <div className="flex flex-col gap-5">

        <Field label="Design Method" required>
            <div className="flex gap-3">
            <ToggleBtn active={designMode === "upload"} onClick={() => setDesignMode("upload")}>
                📁 Upload Design
            </ToggleBtn>
            <ToggleBtn active={designMode === "manual"} onClick={() => setDesignMode("manual")}>
                📝 Manual Input
            </ToggleBtn>
            </div>
        </Field>

        {designMode === "upload" && (
            <div className="flex flex-col gap-3">
            <div
                onClick={() => designRef.current.click()}
                className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-8 cursor-pointer transition group ${
                errors.designFile ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-red-300 hover:bg-red-50"
                }`}
            >
                <span className="text-4xl group-hover:scale-110 transition-transform">{designFile ? "✅" : "🎨"}</span>
                {designFile ? (
                <p className="text-xs text-center text-green-700 font-semibold break-all">{designFile.name}</p>
                ) : (
                <>
                    <p className="text-sm font-semibold text-gray-500">Click to upload your design file</p>
                    <p className="text-xs text-gray-400">PNG, JPG, PDF, AI accepted · 300 DPI recommended</p>
                </>
                )}
                <input ref={designRef} type="file" accept="image/*,.pdf,.ai"
                className="hidden" onChange={(e) => setDesignFile(e.target.files[0] || null)} />
            </div>
            {errors.designFile && <p className="text-[11px] text-red-500">{errors.designFile}</p>}
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-700">
                <span>⚠️</span>
                <p>Use the correct fan circle dimensions. Add a 3mm bleed outside the trim line. The rim color area will be covered by the border.</p>
            </div>
            </div>
        )}

        {designMode === "manual" && (
            <div className="flex flex-col gap-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
            <p className="text-xs font-black text-gray-500 uppercase tracking-wider">Design Brief</p>

            <Field label="Name / Candidate / Event Title" required>
                <input type="text" value={candidateName} onChange={(e) => setCandidateName(e.target.value)}
                placeholder="e.g. JUAN DELA CRUZ for Mayor · Batch 2025 Grand Reunion"
                className={inputCls + (errors.candidateName ? " border-red-400 ring-1 ring-red-300" : "")} />
                {errors.candidateName && <p className="text-[11px] text-red-500 mt-1">{errors.candidateName}</p>}
            </Field>

            <Field label="Subtitle / Slogan / Message" hint="Optional secondary line">
                <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)}
                placeholder='e.g. "Serbisyong Tapat, Mabilis at Mahusay" · Vote for Change!'
                className={inputCls} />
            </Field>

            <Field label="Date / Year" hint="Election date, event date, or year">
                <input type="text" value={eventDate} onChange={(e) => setEventDate(e.target.value)}
                placeholder="e.g. May 12, 2025 · Class of 2025"
                className={inputCls} />
            </Field>

            <Field label="Color Theme" hint="Main design color — ideally matches the rim">
                <div className="flex items-center gap-3 flex-wrap">
                <input type="color" value={colorTheme} onChange={(e) => setColorTheme(e.target.value)}
                    className="w-10 h-10 rounded-xl border border-gray-200 cursor-pointer p-0.5 bg-white" />
                <input type="text" value={colorTheme} onChange={(e) => setColorTheme(e.target.value)}
                    className={inputCls + " max-w-32 font-mono"} />
                <input type="text" value={colorThemeDesc} onChange={(e) => setColorThemeDesc(e.target.value)}
                    placeholder="e.g. Red & white, Blue & gold" className={inputCls} />
                </div>
            </Field>

            <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-700">
                <span>⚠️</span>
                <p>Our design team will send a digital proof within <strong>24–48 hours</strong> for your approval before mass printing begins.</p>
            </div>
            </div>
        )}

        {/* Photo Upload */}
        <Field label="Photo Upload" hint="Candidate photo, event host, or group photo — very common for campaign fans">
            <div
            onClick={() => photoRef.current.click()}
            className="flex items-center gap-4 border border-dashed border-gray-200 rounded-xl p-4 cursor-pointer hover:border-red-300 hover:bg-red-50 transition group"
            >
            <span className="text-2xl group-hover:scale-110 transition-transform shrink-0">{photoFile ? "🖼️" : "📷"}</span>
            {photoFile ? (
                <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-green-700 break-all">{photoFile.name}</p>
                <p className="text-[11px] text-gray-400">Photo attached</p>
                </div>
            ) : (
                <div className="flex-1">
                <p className="text-sm font-semibold text-gray-500">Upload a photo (optional)</p>
                <p className="text-xs text-gray-400">PNG or JPG · min 300 DPI · white/transparent background preferred</p>
                </div>
            )}
            {photoFile && (
                <button type="button" onClick={(e) => { e.stopPropagation(); setPhotoFile(null) }}
                className="text-xs text-red-400 hover:text-red-600 font-bold shrink-0">Remove</button>
            )}
            <input ref={photoRef} type="file" accept="image/*"
                className="hidden" onChange={(e) => setPhotoFile(e.target.files[0] || null)} />
            </div>
        </Field>

        </div>
    </SectionCard>

    {/* E. Bulk Personalization */}
    <SectionCard title="Bulk Personalization" icon="👥">
        <div className="flex flex-col gap-5">

        <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 bg-white">
            <span className="text-2xl shrink-0">📋</span>
            <div className="flex-1">
            <p className="text-sm font-bold text-gray-700">Enable Bulk / Per-Candidate Order</p>
            <p className="text-[11px] text-gray-400">Upload a spreadsheet with individual names, positions, and photos for each fan variant</p>
            </div>
            <button type="button" onClick={() => setBulkOrder(!bulkOrder)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ${
                bulkOrder ? "bg-red-500" : "bg-gray-300"
            }`}>
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                bulkOrder ? "translate-x-6" : "translate-x-1"
            }`} />
            </button>
        </div>

        {bulkOrder && (
            <div className="flex flex-col gap-3">
            <div
                onClick={() => csvRef.current.click()}
                className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-8 cursor-pointer transition group ${
                errors.csvFile ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-red-300 hover:bg-red-50"
                }`}
            >
                <span className="text-4xl group-hover:scale-110 transition-transform">{csvFile ? "✅" : "📊"}</span>
                {csvFile ? (
                <p className="text-xs text-center text-green-700 font-semibold break-all">{csvFile.name}</p>
                ) : (
                <>
                    <p className="text-sm font-semibold text-gray-500">Upload CSV or Excel file</p>
                    <p className="text-xs text-gray-400">.csv, .xlsx, .xls accepted</p>
                </>
                )}
                <input ref={csvRef} type="file" accept=".csv,.xlsx,.xls"
                className="hidden" onChange={(e) => setCsvFile(e.target.files[0] || null)} />
            </div>
            {errors.csvFile && <p className="text-[11px] text-red-500">{errors.csvFile}</p>}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs text-blue-700">
                <p className="font-black uppercase tracking-wider mb-2">Required columns in your spreadsheet:</p>
                <div className="grid grid-cols-3 gap-2">
                {["Full Name", "Position / Title", "Photo Filename"].map((col) => (
                    <div key={col} className="bg-blue-100 rounded-lg px-3 py-1.5 text-center font-semibold text-blue-800">{col}</div>
                ))}
                </div>
                <p className="mt-2">Each row = one fan design. Total rows must match your quantity. Include all photos in a ZIP file together with the spreadsheet.</p>
            </div>
            </div>
        )}

        {!bulkOrder && (
            <div className="flex items-start gap-3 bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm text-gray-500">
            <span className="shrink-0">ℹ️</span>
            <p>Single design mode — all fans will be printed with the same design and photo.</p>
            </div>
        )}

        </div>
    </SectionCard>

    {/* F. Add-ons */}
    <SectionCard title="Add-ons & Finishing" icon="⭐">
        <div className="flex flex-col gap-3">
        <AddOnToggle label="Double-Sided Print" sublabel="Print on both front and back face of the fan"
            icon="🔄" priceLabel="+₱3/pc" checked={doubleSided} onChange={() => setDoubleSided(!doubleSided)} />
        <AddOnToggle label="Gloss Lamination" sublabel="Shiny protective film — vivid colors and glossy feel"
            icon="✨" priceLabel="+₱2/pc" checked={glossLam} onChange={handleGloss} />
        <AddOnToggle label="Matte Lamination" sublabel="Smooth non-reflective finish — clean and premium"
            icon="🖤" priceLabel="+₱2/pc" checked={matteLam} onChange={handleMatte} />
        {(glossLam || matteLam) && (
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-xl px-4 py-2 text-xs text-amber-700">
            <span>⚠️</span>
            <span>Gloss and Matte lamination are mutually exclusive — only one can be applied.</span>
            </div>
        )}
        <AddOnToggle label="UV Coating" sublabel="Protective UV layer — extends print life outdoors and in the sun"
            icon="🌞" priceLabel="+₱2/pc" checked={uvCoating} onChange={() => setUvCoating(!uvCoating)} />
        <AddOnToggle label="Individual Packaging" sublabel="Each fan wrapped in a clear OPP bag — perfect for distribution"
            icon="🛍️" priceLabel="+₱2/pc" checked={packaging} onChange={() => setPackaging(!packaging)} />
        </div>
    </SectionCard>

    {/* G. Delivery */}
    <SectionCard title="Delivery & Pickup" icon="📍">
        <div className="flex flex-col gap-5">

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
                rows={3} placeholder="Enter your full delivery address..."
                className={inputCls + " resize-none" + (errors.address ? " border-red-400 ring-1 ring-red-300" : "")} />
            {errors.address && <p className="text-[11px] text-red-500 mt-1">{errors.address}</p>}
            </Field>
        )}

        {delivery === "Pickup" && (
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
            <span className="shrink-0">📍</span>
            <p>You selected <strong>Pickup</strong>. We'll contact you when your order is ready at our store.</p>
            </div>
        )}

        </div>
    </SectionCard>

    </div>

    {/* ── RIGHT SIDEBAR ──────────────────────────────────── */}
    <div className="xl:col-span-1">
    <div className="sticky top-35 flex flex-col gap-4">

        {/* Live Preview */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-linear-to-r from-gray-50 to-white">
            <span className="text-xl">🪭</span>
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-600">Live Preview</h2>
        </div>
        <div className="px-6 py-6 flex flex-col items-center gap-3 bg-gray-50 min-h-56">
            <FanPreview
            rimHex={rimHex}
            size={size}
            fanStyle={fanStyle}
            edgeStyle={edgeStyle}
            printStyle={printStyle}
            />
            <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 border border-gray-100 w-full justify-center">
            <div className="w-4 h-4 rounded-full border border-gray-300 shrink-0" style={{ background: rimHex }} />
            <span className="text-xs text-gray-600 font-semibold">
                {BORDER_COLORS.find(c => c.hex === borderColor)?.label ?? "Custom"} rim
            </span>
            <span className="text-[11px] text-gray-400 font-mono">{rimHex}</span>
            </div>
        </div>
        </div>

        {/* Order Summary & Pricing */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-linear-to-r from-red-500 to-red-600">
            <h2 className="text-xs font-black uppercase tracking-widest text-white/90">Order Summary</h2>
        </div>
        <div className="px-6 py-4 flex flex-col gap-1.5">
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
            <span className="text-gray-400">Base price / fan</span>
            <span className="font-semibold text-gray-700">₱12.00</span>
            </div>
            {(size === "8 inches" || size === "10 inches") && (
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">Larger size ({size})</span>
                <span className="font-semibold text-gray-700">+₱3.00</span>
            </div>
            )}
            {(material === "PVC Board" || material === "Sintra Board") && (
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">{material}</span>
                <span className="font-semibold text-gray-700">+₱5.00</span>
            </div>
            )}
            {(printStyle === "Double-sided" || doubleSided) && (
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">Double-sided print</span>
                <span className="font-semibold text-gray-700">+₱3.00</span>
            </div>
            )}
            {(glossLam || matteLam) && (
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">{glossLam ? "Gloss" : "Matte"} lamination</span>
                <span className="font-semibold text-gray-700">+₱2.00</span>
            </div>
            )}
            {uvCoating && (
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">UV coating</span>
                <span className="font-semibold text-gray-700">+₱2.00</span>
            </div>
            )}
            {packaging && (
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">Individual packaging</span>
                <span className="font-semibold text-gray-700">+₱2.00</span>
            </div>
            )}
            <div className="flex justify-between text-sm border-t border-gray-100 pt-2 mt-1">
            <span className="text-gray-500 font-semibold">Price / fan</span>
            <span className="font-black text-gray-800">₱{pricePerFan.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
            <span className="text-gray-400">× {quantity.toLocaleString()} pcs</span>
            <span className="font-semibold text-gray-700">= ₱{total.toLocaleString()}</span>
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
            * Final price may vary. Our team will confirm and send a design proof before production.
            </p>
        </div>
        </div>

        {/* Help */}
        <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-5">
        <p className="text-xs font-black uppercase tracking-widest text-yellow-700 mb-2">Need Help?</p>
        <p className="text-xs text-yellow-700 leading-relaxed">
            Planning a campaign, election, or large event order? Message us on Facebook or email{" "}
            <a href="mailto:picktwoprint@gmail.com" className="underline font-semibold">
            picktwoprint@gmail.com
            </a>{" "}for bulk quotes, rush orders, and design assistance.
        </p>
        </div>

    </div>
    </div>

</div>
)
}