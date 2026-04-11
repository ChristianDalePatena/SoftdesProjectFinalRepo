import { useState, useRef } from "react"

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
    {icon && <span className="text-lg mt-0.5 shrink-0">{icon}</span>}
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
    className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all w-full ${
    active ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:border-red-300"
    }`}
>
    <span className="text-2xl shrink-0">{icon}</span>
    <div className="flex-1 min-w-0">
    <div className="flex items-center gap-2 flex-wrap">
        <p className={`text-sm font-bold ${active ? "text-red-700" : "text-gray-700"}`}>{label}</p>
        {badge && <span className="text-[10px] font-bold text-red-500 bg-red-50 border border-red-100 px-1.5 py-0.5 rounded-full">{badge}</span>}
    </div>
    {sublabel && <p className="text-[11px] text-gray-400 mt-0.5">{sublabel}</p>}
    </div>
    <div className={`w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center transition-all ${active ? "bg-red-500 border-red-500" : "border-gray-300"}`}>
    {active && <span className="text-white text-[10px] font-black">✓</span>}
    </div>
</button>
)
}

// ── Mousepad live preview ──────────────────────────────────────────────────────
function MousepadPreview({ size, shape, surface, thickness, stitched, waterproof }) {
const shapeStyle = {
Rectangle: { borderRadius: "8px", width: "80px", height: "60px" },
Square:    { borderRadius: "8px", width: "68px", height: "68px" },
Circle:    { borderRadius: "50%", width: "68px", height: "68px" },
"Custom Die-Cut": { borderRadius: "30% 10% 25% 15%", width: "72px", height: "64px" },
}[shape] || { borderRadius: "8px", width: "80px", height: "60px" }

const surfaceColor = {
"Cloth (smooth)":    "#4B5563",
"Textured Fabric":   "#374151",
"Hard Surface":      "#1F2937",
}[surface] || "#4B5563"

const sizeLabel = {
"Small (8×7 in)":   "S",
"Medium (10×8 in)": "M",
"Large (12×10 in)": "L",
"Extended (Desk)":  "XL",
}[size] || "M"

const thicknessPx = thickness === "3mm (standard)" ? 4 : thickness === "5mm (thick)" ? 7 : 10

return (
<div className="flex flex-col items-center gap-3">
    <div className="relative w-full h-36 rounded-xl border border-gray-200 bg-linear-to-br from-gray-100 to-gray-50 flex items-center justify-center overflow-hidden">
    {/* Desk surface hint */}
    <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "linear-gradient(45deg, #ccc 1px, transparent 1px), linear-gradient(-45deg, #ccc 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

    {/* Mousepad body */}
    <div className="relative flex flex-col items-center gap-1.5">
        {/* Shadow */}
        <div style={{ ...shapeStyle, background: "rgba(0,0,0,0.15)", transform: "translate(4px,4px)", position: "absolute", top: 0, left: 0 }} />

        {/* Pad surface */}
        <div
        className="relative flex items-center justify-center"
        style={{ ...shapeStyle, background: surfaceColor, boxShadow: stitched ? `0 0 0 3px #EF4444, 0 0 0 5px ${surfaceColor}` : "none" }}
        >
        {/* Design area */}
        <div className="flex flex-col items-center gap-1 opacity-40">
            <div className="w-6 h-1 bg-red-400 rounded-full" />
            <div className="w-4 h-0.5 bg-gray-300 rounded-full" />
            <div className="text-white text-[8px] font-black">{sizeLabel}</div>
        </div>
        {/* Waterproof badge */}
        {waterproof && (
            <div className="absolute top-1 right-1 w-3 h-3 bg-blue-400 rounded-full flex items-center justify-center">
            <span className="text-white text-[6px]">💧</span>
            </div>
        )}
        </div>

        {/* Thickness bar */}
        <div className="flex items-center gap-1 mt-1">
        <div className="rounded-sm bg-gray-400" style={{ width: shapeStyle.width, height: `${thicknessPx}px` }} />
        </div>
    </div>

    {/* Labels */}
    <div className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm rounded-lg px-2 py-1 shadow text-[9px] font-bold text-gray-500 border border-gray-100">
        {shape} · {thickness.split(" ")[0]}
    </div>
    </div>
    <p className="text-[10px] text-gray-400 italic">Live preview (approximate)</p>
</div>
)
}

// ── Pricing ────────────────────────────────────────────────────────────────────
const SIZE_BASE = {
"Small (8×7 in)":   150,
"Medium (10×8 in)": 200,
"Large (12×10 in)": 300,
"Extended (Desk)":  500,
}

function computePrice({ size, thickness, stitched, waterproof, shape, qty }) {
let unit = SIZE_BASE[size] ?? 200
if (thickness === "5mm (thick)")       unit += 50
if (thickness === "8mm (extra thick)") unit += 100
if (stitched)    unit += 30
if (waterproof)  unit += 20
if (shape === "Custom Die-Cut") unit += 50
return { unitPrice: unit, total: unit * qty }
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function MousePadOrderForm() {
// A. Details
const [size, setSize]   = useState("Medium (10×8 in)")
const [qty, setQty]     = useState(1)

// B. Material
const [surface, setSurface]   = useState("Cloth (smooth)")
const [baseType, setBaseType] = useState("Rubber Base")

// C. Thickness
const [thickness, setThickness] = useState("3mm (standard)")

// D. Shape
const [shape, setShape] = useState("Rectangle")

// E. Edge & Finish
const [stitched, setStitched]     = useState(false)
const [waterproof, setWaterproof] = useState(false)

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

const validate = () => {
const e = {}
if (!qty || qty < 1) e.qty = "Minimum quantity is 1"
if (delivery === "Delivery" && !address.trim()) e.address = "Please enter a delivery address"
setErrors(e)
return Object.keys(e).length === 0
}

const handleSubmit = () => {
if (!validate()) return
alert(`✅ Order submitted!\n\nMousepad – ${size}\nSurface: ${surface}\nShape: ${shape}\nThickness: ${thickness}\nQty: ${qty}\nTotal: ₱${total.toLocaleString()}`)
}

const { unitPrice, total } = computePrice({ size, thickness, stitched, waterproof, shape, qty })

const summaryRows = [
{ label: "Size",      value: size },
{ label: "Quantity",  value: `${qty} pc${qty > 1 ? "s" : ""}` },
{ label: "Surface",   value: surface },
{ label: "Base",      value: baseType },
{ label: "Thickness", value: thickness },
{ label: "Shape",     value: shape },
{ label: "Edges",     value: stitched ? "Stitched" : "Standard Cut" },
{ label: "Waterproof",value: waterproof ? "Yes (+₱20)" : "No" },
]

const SIZE_OPTIONS = [
{ val: "Small (8×7 in)",   icon: "🟫", desc: "Compact — ideal for tight desks and gaming peripherals" },
{ val: "Medium (10×8 in)", icon: "🟧", desc: "Standard — most popular size for everyday use" },
{ val: "Large (12×10 in)", icon: "🟥", desc: "Large — great for wide monitors and creative setups" },
{ val: "Extended (Desk)",  icon: "🗂️", desc: "Full desk coverage — keyboard + mouse on one pad" },
]

const THICKNESS_OPTIONS = [
{ val: "3mm (standard)",    bar: "w-1/3", desc: "Slim profile — standard gaming and office use" },
{ val: "5mm (thick)",       bar: "w-2/3", desc: "+₱50 — extra cushion, ergonomic comfort",    badge: "+₱50" },
{ val: "8mm (extra thick)", bar: "w-full", desc: "+₱100 — maximum padding, premium feel",     badge: "+₱100" },
]

const SHAPE_OPTIONS = [
{ val: "Rectangle",       icon: "▬",  desc: "Classic landscape orientation" },
{ val: "Square",          icon: "⬛",  desc: "Symmetrical — great for portrait layouts" },
{ val: "Circle",          icon: "⭕",  desc: "Unique, eye-catching desk accent" },
{ val: "Custom Die-Cut",  icon: "✦",  desc: "Any shape — logo, character, or custom outline",  badge: "+₱50" },
]

return (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

    {/* ── LEFT: Form ───────────────────────────────────── */}
    <div className="xl:col-span-2 flex flex-col gap-6">

    {/* Mousepad Details */}
    <SectionCard title="Mousepad Details" icon="🖱️">
        <div className="flex flex-col gap-5">

        <Field label="Size">
            <div className="flex flex-col gap-2">
            {SIZE_OPTIONS.map(({ val, icon, desc }) => (
                <button
                key={val} type="button" onClick={() => setSize(val)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                    size === val ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:border-red-300"
                }`}
                >
                <span className="text-xl shrink-0">{icon}</span>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className={`text-sm font-bold ${size === val ? "text-red-700" : "text-gray-700"}`}>{val}</p>
                    <span className="text-[10px] font-bold text-gray-400">₱{SIZE_BASE[val].toLocaleString()} base</span>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 shrink-0 ${size === val ? "border-red-500 bg-red-500" : "border-gray-300"}`} />
                </button>
            ))}
            </div>
        </Field>

        <Field label="Quantity" required>
            <div className="flex flex-col gap-2">
            <input
                type="number" min={1} value={qty}
                onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                className={inputCls + (errors.qty ? " border-red-400 ring-1 ring-red-300" : "")}
            />
            {errors.qty && <p className="text-[11px] text-red-500 mt-0.5">{errors.qty}</p>}
            <div className="flex gap-2 flex-wrap">
                {[1, 5, 10, 25, 50, 100].map((q) => (
                <button
                    key={q} type="button" onClick={() => setQty(q)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                    qty === q ? "bg-red-500 text-white border-red-500" : "bg-white text-gray-500 border-gray-200 hover:border-red-300 hover:text-red-500"
                    }`}
                >
                    {q}
                </button>
                ))}
            </div>
            </div>
        </Field>
        </div>
    </SectionCard>

    {/* Material & Surface */}
    <SectionCard title="Material & Surface" icon="🧵">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <Field label="Surface Type" hint="Affects print texture and mouse glide">
            <div className="flex flex-col gap-2">
            {[
                { val: "Cloth (smooth)",   icon: "🟤", desc: "Soft woven surface — precise tracking, comfortable wrist feel" },
                { val: "Textured Fabric",  icon: "🔶", desc: "Micro-texture weave — increased friction for controlled movements" },
                { val: "Hard Surface",     icon: "⬛", desc: "Rigid acrylic/plastic top — fast glide, ultra-precise tracking" },
            ].map(({ val, icon, desc }) => (
                <button
                key={val} type="button" onClick={() => setSurface(val)}
                className={`flex items-start gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                    surface === val ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:border-red-300"
                }`}
                >
                <span className="text-lg mt-0.5 shrink-0">{icon}</span>
                <div className="flex-1 min-w-0">
                    <p className={`text-sm font-bold ${surface === val ? "text-red-700" : "text-gray-700"}`}>{val}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>
                </div>
                <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 ${surface === val ? "border-red-500 bg-red-500" : "border-gray-300"}`} />
                </button>
            ))}
            </div>
        </Field>

        <Field label="Base Type" hint="Bottom layer grip and stability">
            <div className="flex flex-col gap-2">
            {[
                { val: "Rubber Base",    icon: "⚫", desc: "Natural rubber — strong grip on most surfaces, prevents sliding" },
                { val: "Anti-slip Base", icon: "🔒", desc: "Premium grip coating — superior non-slip even on glass desks" },
            ].map(({ val, icon, desc }) => (
                <button
                key={val} type="button" onClick={() => setBaseType(val)}
                className={`flex items-start gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                    baseType === val ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:border-red-300"
                }`}
                >
                <span className="text-lg mt-0.5 shrink-0">{icon}</span>
                <div className="flex-1 min-w-0">
                    <p className={`text-sm font-bold ${baseType === val ? "text-red-700" : "text-gray-700"}`}>{val}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>
                </div>
                <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 ${baseType === val ? "border-red-500 bg-red-500" : "border-gray-300"}`} />
                </button>
            ))}
            </div>
        </Field>
        </div>
    </SectionCard>

    {/* Thickness */}
    <SectionCard title="Thickness" icon="📏">
        <Field label="Pad Thickness" hint="Thicker pads offer more cushioning and a premium feel">
        <div className="flex flex-col gap-2">
            {THICKNESS_OPTIONS.map(({ val, bar, desc, badge }) => (
            <button
                key={val} type="button" onClick={() => setThickness(val)}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl border-2 transition-all ${
                thickness === val ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:border-red-300"
                }`}
            >
                <div className={`w-4 h-4 rounded-full border-2 shrink-0 ${thickness === val ? "border-red-500 bg-red-500" : "border-gray-300"}`} />
                <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className={`text-sm font-bold ${thickness === val ? "text-red-700" : "text-gray-700"}`}>{val}</p>
                    {badge && <span className="text-[10px] font-bold text-red-500 bg-red-50 border border-red-100 px-1.5 py-0.5 rounded-full">{badge}/pc</span>}
                </div>
                <p className="text-[11px] text-gray-400">{desc}</p>
                </div>
                {/* Thickness visual bar */}
                <div className="shrink-0 flex flex-col justify-end w-16 h-8 gap-0.5">
                <div className="w-full bg-gray-100 rounded-sm h-2 overflow-hidden">
                    <div className={`${bar} h-full rounded-sm ${thickness === val ? "bg-red-400" : "bg-gray-300"} transition-all`} />
                </div>
                <div className={`w-full h-1 rounded-sm ${thickness === val ? "bg-red-900/30" : "bg-gray-200"}`} />
                </div>
            </button>
            ))}
        </div>
        </Field>
    </SectionCard>

    {/* Shape Options */}
    <SectionCard title="Shape" icon="🔷">
        <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SHAPE_OPTIONS.map(({ val, icon, desc, badge }) => (
            <button
                key={val} type="button" onClick={() => setShape(val)}
                className={`flex items-start gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                shape === val ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:border-red-300"
                }`}
            >
                <span className="text-2xl shrink-0 mt-0.5">{icon}</span>
                <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                    <p className={`text-sm font-bold ${shape === val ? "text-red-700" : "text-gray-700"}`}>{val}</p>
                    {badge && <span className="text-[10px] font-bold text-red-500 bg-red-50 border border-red-100 px-1.5 py-0.5 rounded-full">{badge}</span>}
                </div>
                <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>
                </div>
                <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 ${shape === val ? "border-red-500 bg-red-500" : "border-gray-300"}`} />
            </button>
            ))}
        </div>
        {shape === "Custom Die-Cut" && (
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
            <span className="shrink-0">✂️</span>
            <p>Custom Die-Cut requires a vector outline file (AI, EPS, or SVG). Upload your shape guide in the Design section below, or request design assistance.</p>
            </div>
        )}
        </div>
    </SectionCard>

    {/* Edge & Finish */}
    <SectionCard title="Edge & Finish" icon="💎">
        <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <CardToggle
            label="Stitched Edges"
            sublabel="+₱30/pc — reinforced border stitching for durability and a premium, professional finish"
            icon="🧵"
            badge="+₱30"
            active={stitched}
            onClick={() => setStitched(!stitched)}
            />
            <CardToggle
            label="Waterproof Coating"
            sublabel="+₱20/pc — protective layer that repels spills and moisture damage"
            icon="💧"
            badge="+₱20"
            active={waterproof}
            onClick={() => setWaterproof(!waterproof)}
            />
        </div>

        <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700">
            <span className="shrink-0">ℹ️</span>
            <p>Stitched edges extend the lifespan of your mousepad by preventing fraying and delamination at the borders — recommended for long-term daily use.</p>
        </div>
        </div>
    </SectionCard>

    {/* Live Preview */}
    <SectionCard title="Preview" icon="👁️">
        <MousepadPreview
        size={size}
        shape={shape}
        surface={surface}
        thickness={thickness}
        stitched={stitched}
        waterproof={waterproof}
        />
    </SectionCard>

    {/* Design */}
    <SectionCard title="Design" icon="🎨">
        <div className="flex flex-col gap-5">
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
            <span className="shrink-0">⚠️</span>
            <p>
            Provide your artwork at <strong>300 DPI</strong> matching the pad dimensions. For best print quality, use RGB color mode with a <strong>3mm bleed</strong> on all edges.
            </p>
        </div>

        <Field label="Upload Design File" hint="PNG, JPG, PDF, AI, EPS · 300 DPI recommended">
            <div
            onClick={() => fileRef.current.click()}
            className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl p-6 cursor-pointer hover:border-red-300 hover:bg-red-50 transition group"
            >
            <span className="text-3xl group-hover:scale-110 transition-transform">{file ? "✅" : "🖼️"}</span>
            {file ? (
                <p className="text-xs text-center text-green-700 font-semibold break-all">{file.name}</p>
            ) : (
                <>
                <p className="text-xs text-gray-500 text-center font-semibold">Click to browse or drag & drop your artwork</p>
                <p className="text-[11px] text-gray-400">Full-resolution PNG or PDF recommended</p>
                </>
            )}
            <input ref={fileRef} type="file" accept="image/*,.pdf,.ai,.eps,.svg" className="hidden"
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
            <p>Our team will contact you to discuss your concept, layout boundaries, and shape guides. Design fees may apply based on complexity.</p>
            </div>
        )}

        <Field label="Special Instructions" hint="Describe placement, colors, safe zones, or any design notes">
            <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={3}
            placeholder="e.g. Logo centered, white border 5mm from edges, no bleed on left side..."
            className={inputCls + " resize-none"}
            />
        </Field>
        </div>
    </SectionCard>

    {/* Delivery */}
    <SectionCard title="Delivery Info" icon="🚚">
        <div className="flex flex-col gap-5">
        <Field label="Fulfillment Method">
            <div className="flex gap-3">
            <ToggleBtn active={delivery === "Pickup"} onClick={() => setDelivery("Pickup")}>🏪 Pickup</ToggleBtn>
            <ToggleBtn active={delivery === "Delivery"} onClick={() => setDelivery("Delivery")}>📦 Delivery</ToggleBtn>
            </div>
        </Field>
        {delivery === "Pickup" && (
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
            <span>📍</span>
            <p>Ready for pickup at our store. You'll receive an SMS when your order is ready.</p>
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
            <span>Base ({size})</span>
            <span>₱{SIZE_BASE[size].toLocaleString()}/pc</span>
            </div>
            {thickness === "5mm (thick)" && (
            <div className="flex justify-between text-xs text-gray-500"><span>5mm Thickness</span><span>+₱50/pc</span></div>
            )}
            {thickness === "8mm (extra thick)" && (
            <div className="flex justify-between text-xs text-gray-500"><span>8mm Thickness</span><span>+₱100/pc</span></div>
            )}
            {stitched && (
            <div className="flex justify-between text-xs text-gray-500"><span>Stitched Edges</span><span>+₱30/pc</span></div>
            )}
            {waterproof && (
            <div className="flex justify-between text-xs text-gray-500"><span>Waterproof Coating</span><span>+₱20/pc</span></div>
            )}
            {shape === "Custom Die-Cut" && (
            <div className="flex justify-between text-xs text-gray-500"><span>Custom Die-Cut Shape</span><span>+₱50/pc</span></div>
            )}
            <div className="flex justify-between text-sm font-bold text-gray-700 border-t border-gray-100 pt-2 mt-1">
            <span>Price per piece</span>
            <span>₱{unitPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
            <span>× {qty} pc{qty > 1 ? "s" : ""}</span>
            </div>
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
            Not sure about surface type, thickness, or artwork setup? We're happy to help you spec the perfect pad.
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