import { useState, useRef, useEffect } from "react"

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

function PillGroup({ options, value, onChange }) {
return (
<div className="flex flex-wrap gap-2">
    {options.map((opt) => {
    const val = opt.value ?? opt
    const lbl = opt.label ?? opt
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

function RadioCard({ label, sublabel, badge, active, onClick, children }) {
return (
<button
    type="button"
    onClick={onClick}
    className={`flex items-start gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all w-full ${
    active ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:border-red-300"
    }`}
>
    <div
    className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 ${
        active ? "border-red-500 bg-red-500" : "border-gray-300"
    }`}
    />
    <div className="flex-1 min-w-0">
    <div className="flex items-center gap-2 flex-wrap">
        <p className={`text-sm font-bold ${active ? "text-red-700" : "text-gray-700"}`}>{label}</p>
        {badge && (
        <span className="text-[10px] font-bold text-red-500 bg-red-50 border border-red-100 px-1.5 py-0.5 rounded-full">
            {badge}
        </span>
        )}
    </div>
    {sublabel && <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">{sublabel}</p>}
    {children}
    </div>
</button>
)
}

// ── Fold diagram SVG illustrations ────────────────────────────────────────────
function FoldDiagram({ type }) {
const base = "w-full h-16 rounded-lg border border-gray-100 overflow-hidden"

if (type === "None") {
return (
    <div className={`${base} bg-gray-50 flex items-center justify-center`}>
    <div className="w-20 h-10 bg-white border-2 border-gray-300 rounded flex items-center justify-center">
        <div className="flex flex-col gap-1 px-2 w-full">
        <div className="h-0.5 bg-gray-300 rounded" />
        <div className="h-0.5 bg-gray-300 rounded w-3/4" />
        <div className="h-0.5 bg-gray-300 rounded w-1/2" />
        </div>
    </div>
    </div>
)
}
if (type === "Half Fold") {
return (
    <div className={`${base} bg-gray-50 flex items-center justify-center gap-0.5`}>
    <div className="w-10 h-10 bg-white border-2 border-gray-300 rounded-l border-r-dashed flex items-center justify-center">
        <div className="flex flex-col gap-1 px-1 w-full">
        <div className="h-0.5 bg-gray-300 rounded" />
        <div className="h-0.5 bg-gray-300 rounded w-2/3" />
        </div>
    </div>
    <div className="w-10 h-10 bg-white border-2 border-gray-300 rounded-r border-l-0 flex items-center justify-center">
        <div className="flex flex-col gap-1 px-1 w-full">
        <div className="h-0.5 bg-gray-300 rounded w-2/3" />
        <div className="h-0.5 bg-gray-300 rounded" />
        </div>
    </div>
    </div>
)
}
if (type === "Tri-Fold") {
return (
    <div className={`${base} bg-gray-50 flex items-center justify-center gap-0.5`}>
    {[0, 1, 2].map((i) => (
        <div
        key={i}
        className={`w-7 h-10 bg-white border-2 border-gray-300 flex items-center justify-center
            ${i === 0 ? "rounded-l border-r-0" : i === 2 ? "rounded-r border-l-0" : "border-x-0"}
            ${i === 1 ? "border-x border-dashed border-gray-400" : ""}`}
        style={{ borderRightStyle: i === 0 ? "dashed" : undefined, borderLeftStyle: i === 2 ? "dashed" : undefined }}
        >
        <div className="flex flex-col gap-1 px-1 w-full">
            <div className="h-0.5 bg-gray-300 rounded" />
            <div className="h-0.5 bg-gray-300 rounded w-2/3" />
            <div className="h-0.5 bg-gray-300 rounded w-1/3" />
        </div>
        </div>
    ))}
    </div>
)
}
if (type === "Gate Fold") {
return (
    <div className={`${base} bg-gray-50 flex items-center justify-center gap-0.5`}>
    <div className="w-8 h-10 bg-white border-2 border-gray-300 rounded-l flex items-center justify-center" style={{ borderRightStyle: "dashed" }}>
        <div className="flex flex-col gap-1 px-1 w-full">
        <div className="h-0.5 bg-gray-300 rounded" />
        <div className="h-0.5 bg-gray-300 rounded w-1/2" />
        </div>
    </div>
    <div className="w-14 h-10 bg-red-50 border-2 border-red-200 flex items-center justify-center">
        <div className="flex flex-col gap-1 px-1 w-full">
        <div className="h-0.5 bg-red-200 rounded" />
        <div className="h-0.5 bg-red-200 rounded w-3/4" />
        <div className="h-0.5 bg-red-200 rounded w-1/2" />
        </div>
    </div>
    <div className="w-8 h-10 bg-white border-2 border-gray-300 rounded-r flex items-center justify-center" style={{ borderLeftStyle: "dashed" }}>
        <div className="flex flex-col gap-1 px-1 w-full">
        <div className="h-0.5 bg-gray-300 rounded w-1/2" />
        <div className="h-0.5 bg-gray-300 rounded" />
        </div>
    </div>
    </div>
)
}
return null
}

// ── Size presets ───────────────────────────────────────────────────────────────
const SIZE_PRESETS = [
{ label: "A5",     w: "5.8",  h: "8.3"  },
{ label: "A4",     w: "8.3",  h: "11.7" },
{ label: "Letter", w: "8.5",  h: "11"   },
{ label: "Custom", w: null,   h: null    },
]

// ── Pricing ────────────────────────────────────────────────────────────────────
const PAPER_BASE = { "Matte Paper": 5, "Glossy Paper": 6, "Art Paper": 7, Cardstock: 10 }
const FOLD_COST  = { None: 0, "Half Fold": 1, "Tri-Fold": 2, "Gate Fold": 3 }

function computePrice({ paperType, printType, sides, foldType, lamination, qty }) {
let unit = PAPER_BASE[paperType] ?? 5
if (printType === "Full Color") unit += 3
if (sides === "Double-sided") unit += 2
unit += FOLD_COST[foldType] ?? 0
if (lamination !== "None") unit += 2
return { unitPrice: unit, total: unit * qty }
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function LeafletsOrderForm() {
// A. Details
const [sizePreset, setSizePreset] = useState("A5")
const [width, setWidth]           = useState("5.8")
const [height, setHeight]         = useState("8.3")
const [dimUnit, setDimUnit]       = useState("in")
const [qty, setQty]               = useState(100)

// B. Paper
const [paperType, setPaperType] = useState("Matte Paper")
const [paperGsm, setPaperGsm]   = useState("120 GSM")

// C. Printing
const [printType, setPrintType] = useState("Full Color")
const [sides, setSides]         = useState("Single-sided")

// D. Folding
const [foldType, setFoldType] = useState("None")

// E. Finishing
const [lamination, setLamination] = useState("None")

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

// Sync preset → dimensions
useEffect(() => {
const p = SIZE_PRESETS.find((p) => p.label === sizePreset)
if (p && p.w !== null) { setWidth(p.w); setHeight(p.h) }
}, [sizePreset])

const validate = () => {
const e = {}
if (!parseFloat(width)  || parseFloat(width)  <= 0) e.width  = "Enter a valid width"
if (!parseFloat(height) || parseFloat(height) <= 0) e.height = "Enter a valid height"
if (!qty || qty < 1) e.qty = "Minimum quantity is 1"
if (delivery === "Delivery" && !address.trim()) e.address = "Please enter a delivery address"
setErrors(e)
return Object.keys(e).length === 0
}

const handleSubmit = () => {
if (!validate()) return
alert(`✅ Order submitted!\n\nLeaflets – ${sizePreset === "Custom" ? `${width}×${height} ${dimUnit}` : sizePreset}\nQty: ${qty.toLocaleString()} pcs\nPaper: ${paperType} (${paperGsm})\nFold: ${foldType}\nTotal: ₱${total.toLocaleString()}`)
}

const { unitPrice, total } = computePrice({ paperType, printType, sides, foldType, lamination, qty })

const sizeLabel = sizePreset === "Custom" ? `${width || "—"} × ${height || "—"} ${dimUnit}` : sizePreset

const summaryRows = [
{ label: "Size",       value: sizeLabel },
{ label: "Quantity",   value: `${qty.toLocaleString()} pc${qty > 1 ? "s" : ""}` },
{ label: "Paper Type", value: paperType },
{ label: "Paper Weight", value: paperGsm },
{ label: "Print Type", value: printType },
{ label: "Sides",      value: sides },
{ label: "Fold Type",  value: foldType },
{ label: "Lamination", value: lamination },
]

const FOLD_OPTIONS = [
{
    val: "None",
    icon: "📄",
    desc: "Flat, unfolded leaflet — full page layout.",
    panels: "1 panel",
},
{
    val: "Half Fold",
    icon: "📖",
    desc: "Folded once down the center — creates 4 panels (front, inside-left, inside-right, back). Great for menus and programs.",
    panels: "4 panels",
    badge: "+₱1/pc",
},
{
    val: "Tri-Fold",
    icon: "📃",
    desc: "Folded into thirds — Z-fold or C-fold creating 6 panels. The classic brochure layout for product info and promotions.",
    panels: "6 panels",
    badge: "+₱2/pc",
},
{
    val: "Gate Fold",
    icon: "🚪",
    desc: "Two outer panels fold inward like gates to reveal a wide center spread — 6 panels total. Ideal for dramatic reveals and high-impact presentations.",
    panels: "6 panels",
    badge: "+₱3/pc",
},
]

const PAPER_OPTIONS = [
{ val: "Matte Paper",   icon: "🎞️", desc: "Soft finish — no glare, easy to write on",  price: "₱5/pc" },
{ val: "Glossy Paper",  icon: "✨", desc: "Shiny finish — vibrant color reproduction",  price: "₱6/pc" },
{ val: "Art Paper",     icon: "🖼️", desc: "Premium coated stock — sharp image quality", price: "₱7/pc" },
{ val: "Cardstock",     icon: "🃏", desc: "Thick and sturdy — upscale, tactile feel",   price: "₱10/pc" },
]

const GSM_OPTIONS = [
{ val: "120 GSM", desc: "Lightweight — standard leaflet" },
{ val: "150 GSM", desc: "Medium weight — quality feel" },
{ val: "170 GSM", desc: "Heavyweight — premium marketing" },
{ val: "220 GSM", desc: "Cardstock-grade — very sturdy" },
]

return (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

    {/* ── LEFT: Form ───────────────────────────────────── */}
    <div className="xl:col-span-2 flex flex-col gap-6">

    {/* Leaflet Details */}
    <SectionCard title="Leaflet Details" icon="📋">
        <div className="flex flex-col gap-5">

        {/* Unit toggle */}
        <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Dimensions</span>
            <div className="flex border border-gray-200 rounded-xl overflow-hidden text-xs font-bold">
            {["in", "cm"].map((u) => (
                <button
                key={u} type="button" onClick={() => setDimUnit(u)}
                className={`px-4 py-1.5 transition-all ${dimUnit === u ? "bg-red-500 text-white" : "bg-white text-gray-500 hover:bg-red-50"}`}
                >
                {u}
                </button>
            ))}
            </div>
        </div>

        <Field label="Paper Size">
            <PillGroup
            options={SIZE_PRESETS.map((p) => ({ label: p.label, value: p.label }))}
            value={sizePreset}
            onChange={setSizePreset}
            />
        </Field>

        {sizePreset !== "Custom" && (
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-4 py-2.5 text-xs text-blue-700">
            <span>📐</span>
            <span><strong>{sizePreset}</strong> — {width} × {height} {dimUnit}</span>
            </div>
        )}

        {sizePreset === "Custom" && (
            <div className="grid grid-cols-2 gap-4">
            <Field label={`Width (${dimUnit})`} required>
                <input
                type="number" min={0.1} step={0.1} value={width}
                onChange={(e) => setWidth(e.target.value)}
                className={inputCls + (errors.width ? " border-red-400 ring-1 ring-red-300" : "")}
                placeholder="e.g. 5.8"
                />
                {errors.width && <p className="text-[11px] text-red-500 mt-0.5">{errors.width}</p>}
            </Field>
            <Field label={`Height (${dimUnit})`} required>
                <input
                type="number" min={0.1} step={0.1} value={height}
                onChange={(e) => setHeight(e.target.value)}
                className={inputCls + (errors.height ? " border-red-400 ring-1 ring-red-300" : "")}
                placeholder="e.g. 8.3"
                />
                {errors.height && <p className="text-[11px] text-red-500 mt-0.5">{errors.height}</p>}
            </Field>
            </div>
        )}

        <Field label="Quantity (pieces)" hint="Minimum 1 pc — bulk orders recommended for best value" required>
            <div className="flex flex-col gap-2">
            <input
                type="number" min={1} value={qty}
                onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                className={inputCls + (errors.qty ? " border-red-400 ring-1 ring-red-300" : "")}
                placeholder="e.g. 500"
            />
            {errors.qty && <p className="text-[11px] text-red-500 mt-0.5">{errors.qty}</p>}
            <div className="flex gap-2 flex-wrap">
                {[100, 250, 500, 1000, 2000, 5000].map((q) => (
                <button
                    key={q} type="button" onClick={() => setQty(q)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                    qty === q
                        ? "bg-red-500 text-white border-red-500"
                        : "bg-white text-gray-500 border-gray-200 hover:border-red-300 hover:text-red-500"
                    }`}
                >
                    {q.toLocaleString()}
                </button>
                ))}
            </div>
            </div>
        </Field>
        </div>
    </SectionCard>

    {/* Paper Options */}
    <SectionCard title="Paper Options" icon="🗂️">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <Field label="Paper Type">
            <div className="flex flex-col gap-2">
            {PAPER_OPTIONS.map(({ val, icon, desc, price }) => (
                <button
                key={val} type="button" onClick={() => setPaperType(val)}
                className={`flex items-start gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                    paperType === val ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:border-red-300"
                }`}
                >
                <span className="text-lg mt-0.5">{icon}</span>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className={`text-sm font-bold ${paperType === val ? "text-red-700" : "text-gray-700"}`}>{val}</p>
                    <span className="text-[10px] font-bold text-gray-400">{price} base</span>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>
                </div>
                <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 ${paperType === val ? "border-red-500 bg-red-500" : "border-gray-300"}`} />
                </button>
            ))}
            </div>
        </Field>

        <Field label="Paper Weight (GSM)" hint="Higher GSM = thicker paper">
            <div className="flex flex-col gap-2">
            {GSM_OPTIONS.map(({ val, desc }) => (
                <button
                key={val} type="button" onClick={() => setPaperGsm(val)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 transition-all ${
                    paperGsm === val ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:border-red-300"
                }`}
                >
                <div className={`w-4 h-4 rounded-full border-2 shrink-0 ${paperGsm === val ? "border-red-500 bg-red-500" : "border-gray-300"}`} />
                <div className="flex-1">
                    <p className={`text-sm font-bold ${paperGsm === val ? "text-red-700" : "text-gray-700"}`}>{val}</p>
                    <p className="text-[11px] text-gray-400">{desc}</p>
                </div>
                <div className="w-12 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                    className={`h-full rounded-full ${paperGsm === val ? "bg-red-400" : "bg-gray-300"}`}
                    style={{ width: val === "120 GSM" ? "25%" : val === "150 GSM" ? "50%" : val === "170 GSM" ? "75%" : "100%" }}
                    />
                </div>
                </button>
            ))}
            </div>
        </Field>
        </div>
    </SectionCard>

    {/* Printing Options */}
    <SectionCard title="Printing Options" icon="🖨️">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field label="Print Type">
            <div className="flex flex-col gap-2">
            <RadioCard
                label="Black & White"
                sublabel="Cost-effective — ideal for text-heavy leaflets"
                active={printType === "Black & White"}
                onClick={() => setPrintType("Black & White")}
            />
            <RadioCard
                label="Full Color"
                sublabel="Vivid CMYK printing — perfect for images and graphics"
                badge="+₱3/pc"
                active={printType === "Full Color"}
                onClick={() => setPrintType("Full Color")}
            />
            </div>
        </Field>
        <Field label="Print Sides">
            <div className="flex flex-col gap-2">
            <RadioCard
                label="Single-sided"
                sublabel="Print on front face only"
                active={sides === "Single-sided"}
                onClick={() => setSides("Single-sided")}
            />
            <RadioCard
                label="Double-sided"
                sublabel="Print on both front and back faces"
                badge="+₱2/pc"
                active={sides === "Double-sided"}
                onClick={() => setSides("Double-sided")}
            />
            </div>
        </Field>
        </div>
    </SectionCard>

    {/* Folding Options — KEY FEATURE */}
    <SectionCard title="Folding Options" icon="🗂️">
        <div className="flex flex-col gap-3">
        <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700 mb-1">
            <span className="shrink-0">ℹ️</span>
            <p>Folding transforms a flat leaflet into a structured multi-panel layout. Choose a fold style that matches your content flow and distribution method.</p>
        </div>

        {FOLD_OPTIONS.map(({ val, icon, desc, panels, badge }) => (
            <button
            key={val} type="button" onClick={() => setFoldType(val)}
            className={`flex flex-col gap-3 px-4 py-4 rounded-xl border-2 text-left transition-all w-full ${
                foldType === val ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:border-red-300"
            }`}
            >
            {/* Header row */}
            <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 shrink-0 ${foldType === val ? "border-red-500 bg-red-500" : "border-gray-300"}`} />
                <span className="text-base">{icon}</span>
                <div className="flex-1 min-w-0 flex items-center gap-2 flex-wrap">
                <p className={`text-sm font-bold ${foldType === val ? "text-red-700" : "text-gray-700"}`}>{val}</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    foldType === val ? "text-red-600 bg-red-100 border-red-200" : "text-gray-400 bg-gray-50 border-gray-200"
                }`}>
                    {panels}
                </span>
                {badge && (
                    <span className="text-[10px] font-bold text-red-500 bg-red-50 border border-red-100 px-1.5 py-0.5 rounded-full">{badge}</span>
                )}
                </div>
            </div>

            {/* Diagram */}
            <FoldDiagram type={val} />

            {/* Description */}
            <p className="text-[11px] text-gray-400 leading-relaxed pl-7">{desc}</p>
            </button>
        ))}
        </div>
    </SectionCard>

    {/* Finishing Options */}
    <SectionCard title="Finishing Options" icon="💎">
        <Field label="Lamination">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
            { val: "None",   icon: "🚫", desc: "No extra coating" },
            { val: "Matte",  icon: "🎞️", desc: "+₱2/pc — soft, non-glare" },
            { val: "Glossy", icon: "✨", desc: "+₱2/pc — shiny, vivid" },
            ].map(({ val, icon, desc }) => (
            <button
                key={val} type="button" onClick={() => setLamination(val)}
                className={`flex flex-col items-center gap-2 px-3 py-4 rounded-xl border-2 text-center transition-all ${
                lamination === val ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:border-red-300"
                }`}
            >
                <span className="text-xl">{icon}</span>
                <div>
                <p className={`text-xs font-black ${lamination === val ? "text-red-700" : "text-gray-700"}`}>{val}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{desc}</p>
                </div>
            </button>
            ))}
        </div>
        </Field>
    </SectionCard>

    {/* Design Section */}
    <SectionCard title="Design" icon="🎨">
        <div className="flex flex-col gap-5">

        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
            <span className="shrink-0">⚠️</span>
            <p>
            Provide a <strong>print-ready file at 300 DPI</strong> with <strong>3mm bleed</strong> on all sides.
            For folded leaflets, include panel guides matching your chosen fold layout.
            </p>
        </div>

        <Field label="Upload Design File" hint="PNG, JPG, PDF, AI, EPS accepted · PDF preferred for fold layouts">
            <div
            onClick={() => fileRef.current.click()}
            className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl p-6 cursor-pointer hover:border-red-300 hover:bg-red-50 transition group"
            >
            <span className="text-3xl group-hover:scale-110 transition-transform">{file ? "✅" : "📁"}</span>
            {file ? (
                <p className="text-xs text-center text-green-700 font-semibold break-all">{file.name}</p>
            ) : (
                <>
                <p className="text-xs text-gray-500 text-center font-semibold">Click to browse or drag & drop your artwork</p>
                <p className="text-[11px] text-gray-400">Multi-page PDF recommended for folded layouts</p>
                </>
            )}
            <input ref={fileRef} type="file" accept="image/*,.pdf,.ai,.eps" className="hidden"
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
                className="text-xs text-red-400 hover:text-red-600 font-bold ml-2 shrink-0">
                Remove
            </button>
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
            <p>Our design team will reach out to plan your panel layout, content flow, and fold guides. Additional fees may apply.</p>
            </div>
        )}

        <Field label="Special Instructions" hint="Notes on panel layout, content placement, fold direction, or brand guidelines">
            <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={3}
            placeholder="e.g. Panel 1 = cover, panels 2-3 = services, panel 4 = contact. Match brand colors #CC0000 and #333..."
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
            <p>Ready for pickup at our store. You'll receive an SMS notification when your order is ready.</p>
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
            <span>Base ({paperType})</span>
            <span>₱{PAPER_BASE[paperType]}/pc</span>
            </div>
            {printType === "Full Color" && (
            <div className="flex justify-between text-xs text-gray-500">
                <span>Full Color</span><span>+₱3/pc</span>
            </div>
            )}
            {sides === "Double-sided" && (
            <div className="flex justify-between text-xs text-gray-500">
                <span>Double-sided</span><span>+₱2/pc</span>
            </div>
            )}
            {foldType !== "None" && (
            <div className="flex justify-between text-xs text-gray-500">
                <span>{foldType}</span>
                <span>+₱{FOLD_COST[foldType]}/pc</span>
            </div>
            )}
            {lamination !== "None" && (
            <div className="flex justify-between text-xs text-gray-500">
                <span>{lamination} Lamination</span><span>+₱2/pc</span>
            </div>
            )}
            <div className="flex justify-between text-sm font-bold text-gray-700 border-t border-gray-100 pt-2 mt-1">
            <span>Price per piece</span>
            <span>₱{unitPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
            <span>× {qty.toLocaleString()} pcs</span>
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

        {/* Bulk nudge */}
        {qty < 500 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
            <span className="text-lg">📢</span>
            <div>
            <p className="text-xs font-bold text-amber-800 uppercase tracking-wide">Bulk Savings</p>
            <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
                Order 500+ pcs for better per-unit pricing. Ask us about volume discounts!
            </p>
            </div>
        </div>
        )}

        {/* Help Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">💬</span>
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-600">Need Help?</h3>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed mb-3">
            Not sure which fold style fits your content? We can walk you through panel layouts and sizing.
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