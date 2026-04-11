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

// ── Bag Tag SVG Preview ────────────────────────────────────────────────────────
function BagTagPreview({ shape, material, bgColor, printType, strapType, clipType, hasDesign, customDesign }) {
const colorMap = { White: "#ffffff", Black: "#1f2937", Custom: "#a855f7" }
const fill = colorMap[bgColor] || "#ffffff"
const isLight = bgColor === "White"
const stroke = isLight ? "#d1d5db" : "none"

const materialSheen = material === "Acrylic"
const isPVC = material === "PVC Plastic"

// Shape dimensions
const shapeProps = {
Rectangle: { w: 80, h: 48, rx: 6 },
Round:     { w: 56, h: 56, rx: 28 },
Oval:      { w: 80, h: 50, rx: 25 },
"Custom Die-Cut": { w: 78, h: 52, rx: 10 },
}
const sp = shapeProps[shape] || shapeProps["Rectangle"]
const svgW = sp.w + 40
const svgH = sp.h + 60
const cx = svgW / 2
const cy = sp.h / 2 + 14

// Hole position (top center of tag)
const holeY = 14
const holeX = cx

return (
<div className="flex flex-col items-center gap-1.5">
    <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} xmlns="http://www.w3.org/2000/svg">

    {/* Strap / ring above tag */}
    {strapType === "Plastic Loop" && (
        <ellipse cx={holeX} cy={8} rx={8} ry={5} fill="none" stroke="#9ca3af" strokeWidth={2} />
    )}
    {strapType === "Metal Ring" && (
        <ellipse cx={holeX} cy={8} rx={9} ry={5} fill="none" stroke="#6b7280" strokeWidth={2.5} />
    )}
    {strapType === "String" && (
        <line x1={holeX} y1={2} x2={holeX} y2={12} stroke="#b45309" strokeWidth={1.5} strokeLinecap="round" strokeDasharray="2 1" />
    )}

    {/* Tag body */}
    <rect
        x={cx - sp.w / 2}
        y={cy - sp.h / 2}
        width={sp.w}
        height={sp.h}
        rx={sp.rx}
        fill={fill}
        stroke={stroke}
        strokeWidth={isLight ? 1 : 0}
    />

    {/* Acrylic sheen */}
    {materialSheen && (
        <rect
        x={cx - sp.w / 2}
        y={cy - sp.h / 2}
        width={sp.w / 2}
        height={sp.h}
        rx={sp.rx}
        fill="white"
        opacity={0.15}
        />
    )}

    {/* PVC texture line */}
    {isPVC && (
        <line
        x1={cx - sp.w / 2 + 4}
        y1={cy + sp.h / 2 - 5}
        x2={cx + sp.w / 2 - 4}
        y2={cy + sp.h / 2 - 5}
        stroke={isLight ? "#e5e7eb" : "rgba(255,255,255,0.1)"}
        strokeWidth={1}
        />
    )}

    {/* Hole */}
    <circle cx={holeX} cy={cy - sp.h / 2 + 6} r={3} fill={isLight ? "#e5e7eb" : "rgba(0,0,0,0.3)"} />

    {/* Design content */}
    {(hasDesign || customDesign) ? (
        <>
        <rect x={cx - sp.w / 2 + 8} y={cy - 10} width={sp.w - 16} height={4} rx={2} fill={isLight ? "#ef4444" : "rgba(255,100,100,0.6)"} opacity={0.7} />
        {[0, 1, 2].map((i) => (
            <rect key={i} x={cx - sp.w / 2 + 8} y={cy - 3 + i * 6} width={[(sp.w - 16) * 0.8, (sp.w - 16) * 0.6, (sp.w - 16) * 0.7][i]} height={2.5} rx={1.2}
            fill={isLight ? "#9ca3af" : "rgba(255,255,255,0.35)"} />
        ))}
        </>
    ) : (
        <g opacity={0.2}>
        <rect x={cx - 10} y={cy - 8} width={20} height={14} rx={2} fill={isLight ? "#9ca3af" : "#ffffff"} />
        <line x1={cx - 6} y1={cy - 4} x2={cx + 6} y2={cy - 4} stroke={isLight ? "#ffffff" : "#9ca3af"} strokeWidth={1.5} />
        <line x1={cx - 6} y1={cy} x2={cx + 4} y2={cy} stroke={isLight ? "#ffffff" : "#9ca3af"} strokeWidth={1} />
        <line x1={cx - 6} y1={cy + 3} x2={cx + 5} y2={cy + 3} stroke={isLight ? "#ffffff" : "#9ca3af"} strokeWidth={1} />
        </g>
    )}

    {/* Double-sided badge */}
    {printType === "Double-sided" && (
        <g>
        <rect x={cx + sp.w / 2 - 22} y={cy + sp.h / 2 - 14} width={20} height={11} rx={3} fill="#3b82f6" opacity={0.85} />
        <text x={cx + sp.w / 2 - 12} y={cy + sp.h / 2 - 6} textAnchor="middle" fontSize={6} fontWeight="bold" fill="white">2-SD</text>
        </g>
    )}

    {/* Clip below tag */}
    {clipType === "Basic Clip" && (
        <rect x={cx - 5} y={cy + sp.h / 2 + 2} width={10} height={8} rx={2} fill="none" stroke="#9ca3af" strokeWidth={1.5} />
    )}
    {clipType === "Heavy-duty Clip" && (
        <rect x={cx - 7} y={cy + sp.h / 2 + 2} width={14} height={10} rx={2} fill="none" stroke="#374151" strokeWidth={2} />
    )}

    </svg>
    <p className="text-[9px] text-gray-400 italic">{shape} · {material}</p>
    <p className="text-[9px] text-gray-500 font-semibold">{bgColor} · {printType}</p>
</div>
)
}

// ── Pricing ────────────────────────────────────────────────────────────────────
function computePrice({ material, printType, printQuality, clipType, shape, qty }) {
const base = { "PVC Plastic": 80, "Acrylic": 120, "Laminated Card": 50 }
let unit = base[material] || 80
if (printType === "Double-sided") unit += 20
if (printQuality === "High Resolution") unit += 30
if (clipType === "Heavy-duty Clip") unit += 25
if (shape === "Custom Die-Cut") unit += 40
return { unitPrice: unit, total: unit * Math.max(1, qty) }
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function BagTagOrderForm() {
// A. Tag Details
const [tagType, setTagType]   = useState("Luggage Tag")
const [shape, setShape]       = useState("Rectangle")
const [size, setSize]         = useState("Medium (8x5 cm)")
const [customSize, setCustomSize] = useState("")
const [qty, setQty]           = useState(1)

// B. Material
const [material, setMaterial]     = useState("PVC Plastic")
const [thickness, setThickness]   = useState("1mm")

// C. Print
const [printType, setPrintType]       = useState("Single-sided")
const [printQuality, setPrintQuality] = useState("Standard")

// D. Attachment
const [strapType, setStrapType] = useState("Plastic Loop")
const [clipType, setClipType]   = useState("None")

// E. Color & Design
const [bgColor, setBgColor]         = useState("White")
const [customColor, setCustomColor] = useState("")
const [fullCustomDesign, setFullCustomDesign] = useState(false)

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
if (size === "Custom Size" && !customSize.trim()) e.customSize = "Please specify your custom size"
setErrors(e)
return Object.keys(e).length === 0
}

const handleSubmit = () => {
if (!validate()) return
alert(`✅ Order submitted!\n\nBag Tag – ${tagType}\nMaterial: ${material}\nShape: ${shape}\nPrint: ${printType}\nQty: ${qty.toLocaleString()} pc${qty !== 1 ? "s" : ""}\nTotal: ₱${pricing.total.toLocaleString()}`)
}

const pricing = computePrice({ material, printType, printQuality, clipType, shape, qty })

const TAG_TYPES = [
{ val: "Luggage Tag",    icon: "🧳", desc: "Travel identification for suitcases" },
{ val: "School Bag Tag", icon: "🎒", desc: "Student ID & contact info tags" },
{ val: "ID Tag",         icon: "🪪", desc: "Branded identification cards" },
{ val: "Event Tag",      icon: "🎫", desc: "Event passes & wristband labels" },
]

const SHAPES = ["Rectangle", "Round", "Oval", "Custom Die-Cut"]
const SIZES  = ["Small (5x3 cm)", "Medium (8x5 cm)", "Large (10x6 cm)", "Custom Size"]

const summaryRows = [
{ label: "Tag Type",  value: tagType },
{ label: "Shape",     value: shape + (shape === "Custom Die-Cut" ? " (+₱40)" : "") },
{ label: "Size",      value: size === "Custom Size" ? (customSize || "Custom Size") : size },
{ label: "Material",  value: material },
{ label: "Thickness", value: thickness },
{ label: "Print",     value: printType + (printType === "Double-sided" ? " (+₱20)" : "") },
{ label: "Quality",   value: printQuality + (printQuality === "High Resolution" ? " (+₱30)" : "") },
{ label: "Strap",     value: strapType },
{ label: "Clip",      value: clipType + (clipType === "Heavy-duty Clip" ? " (+₱25)" : "") },
{ label: "Color",     value: bgColor === "Custom" ? (customColor || "Custom") : bgColor },
{ label: "Quantity",  value: `${qty.toLocaleString()} pc${qty !== 1 ? "s" : ""}` },
{ label: "Delivery",  value: delivery },
]

return (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

    {/* ── LEFT ───────────────────────────────────────── */}
    <div className="xl:col-span-2 flex flex-col gap-6">

    {/* Tag Details */}
    <SectionCard title="Tag Details" icon="🏷️">
        <div className="flex flex-col gap-5">

        <Field label="Tag Type" required>
            <div className="flex flex-col gap-2">
            {TAG_TYPES.map(({ val, icon, desc }) => (
                <OptionCard key={val} active={tagType === val} onClick={() => setTagType(val)}
                icon={icon} label={val} sublabel={desc} />
            ))}
            </div>
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
                {s}
                {s === "Custom Die-Cut" && (
                    <span className="ml-1 text-[10px] font-black text-gray-400">(+₱40)</span>
                )}
                </button>
            ))}
            </div>
        </Field>

        <Field label="Size" required>
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
            {size === "Custom Size" && (
            <div className="mt-2">
                <input
                type="text"
                value={customSize}
                onChange={(e) => setCustomSize(e.target.value)}
                placeholder="e.g. 9x4 cm"
                className={inputCls + (errors.customSize ? " border-red-400 ring-1 ring-red-300" : "")}
                />
                {errors.customSize && <p className="text-[11px] text-red-500 mt-1">{errors.customSize}</p>}
            </div>
            )}
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

    {/* Material Options */}
    <SectionCard title="Material Options" icon="🧱">
        <div className="flex flex-col gap-5">

        <Field label="Material Type">
            <div className="flex flex-col gap-2">
            <OptionCard active={material === "PVC Plastic"} onClick={() => setMaterial("PVC Plastic")}
                icon="💳" label="PVC Plastic" sublabel="Durable, waterproof, flexible — most popular choice" badge="₱80 base" />
            <OptionCard active={material === "Acrylic"} onClick={() => setMaterial("Acrylic")}
                icon="💎" label="Acrylic" sublabel="Clear, premium look — rigid and scratch-resistant" badge="₱120 base" />
            <OptionCard active={material === "Laminated Card"} onClick={() => setMaterial("Laminated Card")}
                icon="📄" label="Laminated Card" sublabel="Lightweight paper card with protective lamination" badge="₱50 base" />
            </div>
        </Field>

        <Field label="Thickness">
            <div className="flex gap-2">
            {["0.5mm", "1mm", "2mm"].map((t) => (
                <ToggleBtn key={t} active={thickness === t} onClick={() => setThickness(t)}>
                {t}
                </ToggleBtn>
            ))}
            </div>
            <p className="text-[11px] text-gray-400 mt-1">
            {thickness === "0.5mm" && "Ultra-thin — flexible, lightweight cards"}
            {thickness === "1mm"   && "Standard — most popular, good rigidity"}
            {thickness === "2mm"   && "Heavy-duty — rigid, premium feel"}
            </p>
        </Field>

        </div>
    </SectionCard>

    {/* Print Options */}
    <SectionCard title="Print Options" icon="🖨️">
        <div className="flex flex-col gap-5">

        <Field label="Print Type">
            <div className="flex gap-3">
            <ToggleBtn active={printType === "Single-sided"} onClick={() => setPrintType("Single-sided")}>
                ◻ Single-sided
            </ToggleBtn>
            <ToggleBtn active={printType === "Double-sided"} onClick={() => setPrintType("Double-sided")}>
                ◼ Double-sided
                <span className="ml-1 text-[10px] opacity-75">(+₱20)</span>
            </ToggleBtn>
            </div>
            {printType === "Double-sided" && (
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700 mt-2">
                <span>💡</span>
                <p>Double-sided allows different designs on front and back — useful for contact info on the reverse.</p>
            </div>
            )}
        </Field>

        <Field label="Print Quality">
            <div className="flex flex-col gap-2">
            <OptionCard active={printQuality === "Standard"} onClick={() => setPrintQuality("Standard")}
                icon="🖨️" label="Standard" sublabel="Sharp output suitable for text, logos, and simple graphics" />
            <OptionCard active={printQuality === "High Resolution"} onClick={() => setPrintQuality("High Resolution")}
                icon="🔬" label="High Resolution" sublabel="Photo-quality detail — ideal for photos and fine artwork" badge="+₱30" />
            </div>
        </Field>

        </div>
    </SectionCard>

    {/* Attachment Options */}
    <SectionCard title="Attachment Options" icon="🔗">
        <div className="flex flex-col gap-5">

        <Field label="Strap Type">
            <div className="flex flex-col gap-2">
            <OptionCard active={strapType === "Plastic Loop"} onClick={() => setStrapType("Plastic Loop")}
                icon="🔵" label="Plastic Loop" sublabel="Standard flexible loop — attaches to any bag handle" />
            <OptionCard active={strapType === "Metal Ring"} onClick={() => setStrapType("Metal Ring")}
                icon="⭕" label="Metal Ring" sublabel="Sturdy stainless ring — premium and long-lasting" badge="+₱15" />
            <OptionCard active={strapType === "String"} onClick={() => setStrapType("String")}
                icon="🪢" label="String" sublabel="Classic rope or twine tie — ideal for gift and event tags" />
            </div>
        </Field>

        <Field label="Clip Type">
            <div className="flex flex-col gap-2">
            <OptionCard active={clipType === "None"} onClick={() => setClipType("None")}
                icon="❌" label="None" sublabel="No clip — strap or ring only" />
            <OptionCard active={clipType === "Basic Clip"} onClick={() => setClipType("Basic Clip")}
                icon="📎" label="Basic Clip" sublabel="Small plastic clip for easy attachment" />
            <OptionCard active={clipType === "Heavy-duty Clip"} onClick={() => setClipType("Heavy-duty Clip")}
                icon="🔒" label="Heavy-duty Clip" sublabel="Metal carabiner-style clip — secure and durable" badge="+₱25" />
            </div>
        </Field>

        </div>
    </SectionCard>

    {/* Color & Design */}
    <SectionCard title="Color & Design" icon="🎨">
        <div className="flex flex-col gap-5">

        <Field label="Background Color">
            <div className="flex gap-2 flex-wrap">
            {["White", "Black", "Custom"].map((c) => {
                const dot = { White: "#f9fafb", Black: "#1f2937", Custom: "#a855f7" }
                return (
                <button key={c} type="button" onClick={() => setBgColor(c)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 text-sm font-bold transition-all ${
                    bgColor === c
                        ? "border-red-500 bg-red-50 text-red-700"
                        : "border-gray-200 bg-white text-gray-600 hover:border-red-300"
                    }`}>
                    <span className="w-4 h-4 rounded-full border border-gray-300 shrink-0"
                    style={{ background: dot[c] }} />
                    {c}
                </button>
                )
            })}
            </div>
            {bgColor === "Custom" && (
            <input
                type="text"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                placeholder="e.g. Pantone 485 Red, sky blue, mint green..."
                className={inputCls + " mt-2"}
            />
            )}
        </Field>

        <AddOnToggle
            label="Full Custom Design Upload"
            sublabel="Supply your own complete artwork — we print exactly as provided"
            icon="🖼️"
            priceLabel="Upload"
            checked={fullCustomDesign}
            onChange={() => setFullCustomDesign(!fullCustomDesign)}
        />

        </div>
    </SectionCard>

    {/* Design */}
    <SectionCard title="Design" icon="✏️">
        <div className="flex flex-col gap-5">

        {/* Preview */}
        <div className="flex justify-center py-6 bg-gray-50 rounded-xl border border-gray-100">
            <BagTagPreview
            shape={shape}
            material={material}
            bgColor={bgColor}
            printType={printType}
            strapType={strapType}
            clipType={clipType}
            hasDesign={!!designFile || needsDesign}
            customDesign={fullCustomDesign}
            />
        </div>

        <Field
            label="Upload Design File"
            hint="PNG, JPG, PDF, AI accepted · Ensure text is readable for small print sizes"
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
            <input ref={designRef} type="file" accept="image/*,.pdf,.ai,.eps"
                className="hidden"
                onChange={(e) => setDesignFile(e.target.files[0] || null)}
                disabled={needsDesign} />
            </div>
            {errors.design && <p className="text-[11px] text-red-500 mt-1">{errors.design}</p>}
            {!needsDesign && (
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-700 mt-1">
                <span>⚠️</span>
                <p>For small tags, keep text at <strong>minimum 8pt</strong> and avoid thin strokes below 0.5pt. Our team can advise on legibility.</p>
            </div>
            )}
        </Field>

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
            <p className="text-[11px] text-gray-400">Our team will create your artwork. A proof is sent before printing.</p>
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

        <Field label="Special Instructions" hint="Font preferences, color codes, content layout, etc.">
            <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={3}
            placeholder="e.g. Use Arial font, include QR code, keep logo top-right corner, add contact number..."
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

        {/* Tag Preview Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-linear-to-r from-gray-50 to-white">
            <span className="text-xl">🏷️</span>
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-600">Live Preview</h2>
        </div>
        <div className="px-6 py-6 flex justify-center bg-gray-50 min-h-50 not-only:items-center">
            <BagTagPreview
            shape={shape}
            material={material}
            bgColor={bgColor}
            printType={printType}
            strapType={strapType}
            clipType={clipType}
            hasDesign={!!designFile || needsDesign}
            customDesign={fullCustomDesign}
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
            Not sure about material or size? Message us on Facebook or email{" "}
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