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

// ── Flyer Preview ──────────────────────────────────────────────────────────────
function FlyerPreview({ size, orientation, sides, finish, designMode, businessName, tagline }) {
const baseW = size === "Letter (8.5 × 11 in)" ? 76 : 74
const baseH = size === "A6 (105 × 148 mm)" ? 95 : size === "Letter (8.5 × 11 in)" ? 98 : 105
const w = orientation === "Landscape" ? baseH : baseW
const h = orientation === "Landscape" ? baseW : baseH

const bgStyle = finish === "Glossy"
? { background: "#ffffff", boxShadow: "2px 2px 8px rgba(0,0,0,0.14)" }
: finish === "Matte"
? { background: "#f5f5f4", boxShadow: "1px 1px 4px rgba(0,0,0,0.08)" }
: { background: "#fafafa", boxShadow: "1px 1px 3px rgba(0,0,0,0.06)" }

return (
<div className="flex flex-col items-center gap-2">
    <div className="flex items-end gap-3">
    {/* Front */}
    <div className="flex flex-col items-center gap-1">
        <div
        className="relative border border-gray-200 rounded overflow-hidden flex flex-col items-center justify-center"
        style={{ width: w, height: h, ...bgStyle }}
        >
        {finish === "Glossy" && (
            <div className="absolute top-0 left-0 right-0 h-1/3 pointer-events-none"
            style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, transparent 100%)" }} />
        )}
        <div className="absolute inset-2 flex flex-col items-center justify-center gap-1 text-center">
            {designMode === "design" && businessName ? (
            <>
                <p className="text-[9px] font-black text-gray-800 leading-tight wrap-break-words w-full">{businessName}</p>
                {tagline && <p className="text-[7px] text-gray-500 leading-tight wrap-break-words w-full">{tagline}</p>}
                <div className="w-8 border-t border-red-300 my-0.5" />
                <div className="w-full flex flex-col gap-0.5 px-1">
                {[70, 50, 60, 45].map((pct, i) => (
                    <div key={i} className="h-0.75 bg-gray-200 rounded-full" style={{ width: `${pct}%`, margin: "0 auto" }} />
                ))}
                </div>
            </>
            ) : (
            <div className="flex flex-col items-center gap-1 opacity-40">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
                </svg>
                <span className="text-[8px] text-gray-400">Front</span>
            </div>
            )}
        </div>
        </div>
        <span className="text-[9px] text-gray-400">Front</span>
    </div>

    {/* Back */}
    {sides === "Double-sided" && (
        <div className="flex flex-col items-center gap-1">
        <div
            className="relative border border-gray-200 rounded overflow-hidden flex items-center justify-center opacity-60"
            style={{ width: Math.round(w * 0.72), height: Math.round(h * 0.72), background: "#f9fafb" }}
        >
            <div className="flex flex-col items-center gap-0.5 opacity-40">
            {[55, 70, 45, 60, 50].map((pct, i) => (
                <div key={i} className="h-0.5 bg-gray-300 rounded-full" style={{ width: `${pct}%` }} />
            ))}
            </div>
        </div>
        <span className="text-[9px] text-gray-400">Back</span>
        </div>
    )}
    </div>
    <p className="text-[10px] text-gray-400 italic">{size} · {orientation}</p>
</div>
)
}

// ── Pricing ────────────────────────────────────────────────────────────────────
function computePrice({ qty, sides, paperWeight, finish, folding, uvCoating, lamination, roundedCorners, express }) {
let base = 5
if (sides === "Double-sided") base += 2
if (paperWeight === "200 gsm" || paperWeight === "250 gsm") base += 2
if (finish === "Glossy" || finish === "Matte") base += 1
if (folding === "Bi-fold" || folding === "Tri-fold") base += 2
if (uvCoating) base += 2
if (lamination) base += 3
if (roundedCorners) base += 1
if (express) base += 3
return { unitPrice: base, total: base * Math.max(1, qty) }
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function FlyersOrderForm() {
// A. Flyer Details
const [flyerSize, setFlyerSize]     = useState("A5 (148 × 210 mm)")
const [customSize, setCustomSize]   = useState("")
const [orientation, setOrientation] = useState("Portrait")
const [sides, setSides]             = useState("Single-sided")
const [qty, setQty]                 = useState(100)

// B. Paper & Finish
const [paperType, setPaperType]     = useState("Glossy Paper")
const [paperWeight, setPaperWeight] = useState("120 gsm")
const [finish, setFinish]           = useState("Glossy")

// C. Design
const [designMode, setDesignMode]         = useState("upload")
const [designFile, setDesignFile]         = useState(null)
const [businessName, setBusinessName]     = useState("")
const [tagline, setTagline]               = useState("")
const [description, setDescription]       = useState("")
const [contactDetails, setContactDetails] = useState("")
const [colorScheme, setColorScheme]       = useState("")
const designRef = useRef()

// D. Multiple Versions
const [multiVersion, setMultiVersion] = useState(false)
const [csvFile, setCsvFile]           = useState(null)
const csvRef = useRef()

// E. Add-ons
const [folding, setFolding]               = useState("None")
const [uvCoating, setUvCoating]           = useState(false)
const [lamination, setLamination]         = useState(false)
const [roundedCorners, setRoundedCorners] = useState(false)
const [express, setExpress]               = useState(false)

// F. Delivery
const [delivery, setDelivery] = useState("Pickup")
const [address, setAddress]   = useState("")

const [errors, setErrors] = useState({})

const validate = () => {
const e = {}
if (!qty || qty < 1) e.qty = "Quantity must be at least 1"
if (flyerSize === "Custom" && !customSize.trim()) e.customSize = "Please enter a custom size"
if (designMode === "upload" && !designFile) e.design = "Please upload a design file"
if (designMode === "design" && !businessName.trim()) e.businessName = "Please enter your business name"
if (multiVersion && !csvFile) e.csv = "Please upload a CSV/Excel file"
if (delivery === "Delivery" && !address.trim()) e.address = "Please enter a delivery address"
setErrors(e)
return Object.keys(e).length === 0
}

const handleSubmit = () => {
if (!validate()) return
alert(`✅ Order submitted!\n\nFlyer – ${flyerSize}\nPaper: ${paperType} · ${paperWeight}\nQty: ${qty.toLocaleString()} pcs\nTotal: ₱${pricing.total.toLocaleString()}`)
}

const pricing = computePrice({ qty, sides, paperWeight, finish, folding, uvCoating, lamination, roundedCorners, express })

const FLYER_SIZES   = ["A6 (105 × 148 mm)", "A5 (148 × 210 mm)", "A4 (210 × 297 mm)", "Letter (8.5 × 11 in)", "Custom"]
const PAPER_TYPES   = [
{ val: "Glossy Paper",   icon: "✨", desc: "Shiny, vibrant colors" },
{ val: "Matte Paper",    icon: "🪵", desc: "Smooth, no-glare finish" },
{ val: "Cardstock",      icon: "🗂️", desc: "Thick, premium feel" },
{ val: "Recycled Paper", icon: "♻️", desc: "Eco-friendly option" },
]
const PAPER_WEIGHTS = ["90 gsm", "120 gsm", "150 gsm", "200 gsm", "250 gsm"]
const FINISHES      = [
{ val: "Glossy",     desc: "High-shine coating",  badge: "+₱1" },
{ val: "Matte",      desc: "Soft flat coating",   badge: "+₱1" },
{ val: "No coating", desc: "Standard uncoated",   badge: null  },
]
const FOLDING_OPTS  = [
{ val: "None",     icon: "📄", label: "None" },
{ val: "Bi-fold",  icon: "📰", label: "Bi-fold" },
{ val: "Tri-fold", icon: "🗞️", label: "Tri-fold" },
]

const summaryRows = [
{ label: "Size",        value: flyerSize === "Custom" ? `Custom (${customSize || "—"})` : flyerSize },
{ label: "Orientation", value: orientation },
{ label: "Print Sides", value: sides + (sides === "Double-sided" ? " (+₱2)" : "") },
{ label: "Paper",       value: `${paperType} · ${paperWeight}` },
{ label: "Finish",      value: finish + (finish !== "No coating" ? " (+₱1)" : "") },
{ label: "Quantity",    value: `${qty.toLocaleString()} pc${qty !== 1 ? "s" : ""}` },
...(folding !== "None"  ? [{ label: "Folding",          value: `${folding} (+₱2)` }] : []),
...(uvCoating           ? [{ label: "UV Coating",       value: "+₱2/pc" }]           : []),
...(lamination          ? [{ label: "Lamination",       value: "+₱3/pc" }]           : []),
...(roundedCorners      ? [{ label: "Rounded Corners",  value: "+₱1/pc" }]           : []),
...(express             ? [{ label: "Express Printing", value: "+₱3/pc" }]           : []),
{ label: "Delivery",    value: delivery },
]

return (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

    {/* ── LEFT ────────────────────────────────────────── */}
    <div className="xl:col-span-2 flex flex-col gap-6">

    {/* Flyer Details */}
    <SectionCard title="Flyer Details" icon="📄">
        <div className="flex flex-col gap-5">

        <Field label="Flyer Size" required>
            <select value={flyerSize} onChange={(e) => setFlyerSize(e.target.value)} className={selectCls}>
            {FLYER_SIZES.map((s) => <option key={s}>{s}</option>)}
            </select>
        </Field>

        {flyerSize === "Custom" && (
            <Field label="Custom Size" hint="e.g. 5×7 in, 130×180 mm" required>
            <input
                type="text" value={customSize}
                onChange={(e) => setCustomSize(e.target.value)}
                placeholder="Enter width × height"
                className={inputCls + (errors.customSize ? " border-red-400 ring-1 ring-red-300" : "")}
            />
            {errors.customSize && <p className="text-[11px] text-red-500 mt-1">{errors.customSize}</p>}
            </Field>
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

        <Field label="Print Sides">
            <div className="flex gap-3">
            <ToggleBtn active={sides === "Single-sided"} onClick={() => setSides("Single-sided")}>
                ▢ Single-sided
            </ToggleBtn>
            <ToggleBtn active={sides === "Double-sided"} onClick={() => setSides("Double-sided")}>
                ⬡ Double-sided &nbsp;<span className="text-[10px] font-black opacity-80">+₱2</span>
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
            {qty >= 500 && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-4 py-2 text-xs text-green-700 mt-1">
                <span>🎉</span>
                <span className="font-semibold">Bulk order! Discount may apply — our team will confirm.</span>
            </div>
            )}
        </Field>
        </div>
    </SectionCard>

    {/* Paper & Finish */}
    <SectionCard title="Paper & Finish" icon="🗒️">
        <div className="flex flex-col gap-5">

        <Field label="Paper Type">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PAPER_TYPES.map(({ val, icon, desc }) => (
                <OptionCard key={val} active={paperType === val} onClick={() => setPaperType(val)}
                icon={icon} label={val} sublabel={desc} />
            ))}
            </div>
        </Field>

        <Field label="Paper Weight">
            <PillGroup
            options={PAPER_WEIGHTS.map((w) => ({
                value: w,
                label: w + (w === "200 gsm" || w === "250 gsm" ? " ↑" : ""),
            }))}
            value={paperWeight}
            onChange={setPaperWeight}
            />
            {(paperWeight === "200 gsm" || paperWeight === "250 gsm") && (
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-xl px-4 py-2 text-xs text-amber-700 mt-2">
                <span>📌</span>
                <span className="font-semibold">Premium weight — +₱2/pc added to base price.</span>
            </div>
            )}
        </Field>

        <Field label="Surface Finish">
            <div className="flex flex-col gap-2">
            {FINISHES.map(({ val, desc, badge }) => (
                <OptionCard key={val} active={finish === val} onClick={() => setFinish(val)}
                label={val} sublabel={desc} badge={badge} />
            ))}
            </div>
        </Field>
        </div>
    </SectionCard>

    {/* Design */}
    <SectionCard title="Design" icon="🎨">
        <div className="flex flex-col gap-5">

        <div className="flex justify-center py-2 bg-gray-50 rounded-xl border border-gray-100">
            <FlyerPreview
            size={flyerSize} orientation={orientation} sides={sides} finish={finish}
            designMode={designMode} businessName={businessName} tagline={tagline}
            />
        </div>

        <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
            <button type="button" onClick={() => setDesignMode("upload")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${designMode === "upload" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
            📁 Upload Design File
            </button>
            <button type="button" onClick={() => setDesignMode("design")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${designMode === "design" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
            ✏️ Request Design Assistance
            </button>
        </div>

        {designMode === "upload" ? (
            <Field label="Upload Your Artwork" hint="PNG, JPG, PDF, AI accepted · 300 DPI recommended · Max 100MB" required>
            <div
                onClick={() => designRef.current.click()}
                className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-8 cursor-pointer transition group ${
                errors.design ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-red-300 hover:bg-red-50"
                }`}
            >
                <span className="text-4xl group-hover:scale-110 transition-transform">{designFile ? "✅" : "🖼️"}</span>
                {designFile
                ? <p className="text-xs text-center text-green-700 font-semibold break-all">{designFile.name}</p>
                : <>
                    <p className="text-sm font-semibold text-gray-500">Click to browse or drag & drop</p>
                    <p className="text-xs text-gray-400">PNG, JPG, PDF, AI — print-ready preferred</p>
                    </>
                }
                <input ref={designRef} type="file" accept="image/*,.pdf,.ai,.eps" className="hidden"
                onChange={(e) => setDesignFile(e.target.files[0] || null)} />
            </div>
            {errors.design && <p className="text-[11px] text-red-500 mt-1">{errors.design}</p>}
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700 mt-1">
                <span>💡</span>
                <p>For best results, supply files at <strong>300 DPI</strong> in CMYK color mode with <strong>3mm bleed</strong> on all sides.</p>
            </div>
            </Field>
        ) : (
            <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-700">
                <span>🎨</span>
                <p>Our design team will create your flyer based on the details below. <strong>Additional design fees may apply.</strong> A proof will be sent for approval before printing.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Business / Event Name" required>
                <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Sunset Cafe"
                    className={inputCls + (errors.businessName ? " border-red-400 ring-1 ring-red-300" : "")} />
                {errors.businessName && <p className="text-[11px] text-red-500 mt-1">{errors.businessName}</p>}
                </Field>
                <Field label="Tagline / Title">
                <input type="text" value={tagline} onChange={(e) => setTagline(e.target.value)}
                    placeholder="e.g. Grand Opening Sale!" className={inputCls} />
                </Field>
            </div>
            <Field label="Description / Main Content" hint="Key details to include on the flyer">
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                rows={3} placeholder="e.g. 50% off all drinks this Saturday, June 14 · Live music from 6 PM"
                className={inputCls + " resize-none"} />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Contact Details">
                <input type="text" value={contactDetails} onChange={(e) => setContactDetails(e.target.value)}
                    placeholder="Phone, email, website, address…" className={inputCls} />
                </Field>
                <Field label="Preferred Color Scheme">
                <input type="text" value={colorScheme} onChange={(e) => setColorScheme(e.target.value)}
                    placeholder="e.g. Red & black, warm earthy tones…" className={inputCls} />
                </Field>
            </div>
            </div>
        )}
        </div>
    </SectionCard>

    {/* Multiple Versions */}
    <SectionCard title="Versions" icon="📋">
        <div className="flex flex-col gap-4">
        <div className="flex gap-3">
            <ToggleBtn active={!multiVersion} onClick={() => setMultiVersion(false)}>🔹 Single Version</ToggleBtn>
            <ToggleBtn active={multiVersion} onClick={() => setMultiVersion(true)}>📊 Multiple Versions (CSV)</ToggleBtn>
        </div>
        {multiVersion ? (
            <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
                <span className="text-lg">📋</span>
                <div>
                <p className="font-bold mb-1">Multiple Versions — CSV Upload</p>
                <p className="text-xs leading-relaxed">
                    Upload a file with columns:{" "}
                    <code className="bg-blue-100 px-1 rounded">Name</code>,{" "}
                    <code className="bg-blue-100 px-1 rounded">Branch</code>,{" "}
                    <code className="bg-blue-100 px-1 rounded">Content</code>.
                    Each row = one unique flyer version.
                </p>
                </div>
            </div>
            <Field label="Upload CSV / Excel File" required>
                <div
                onClick={() => csvRef.current.click()}
                className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-6 cursor-pointer transition group ${errors.csv ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-red-300 hover:bg-red-50"}`}
                >
                <span className="text-3xl group-hover:scale-110 transition-transform">{csvFile ? "✅" : "📊"}</span>
                {csvFile
                    ? <p className="text-xs text-center text-green-700 font-semibold">{csvFile.name}</p>
                    : <p className="text-xs text-gray-400 text-center">Click to upload .csv or .xlsx</p>
                }
                <input ref={csvRef} type="file" accept=".csv,.xlsx,.xls" className="hidden"
                    onChange={(e) => setCsvFile(e.target.files[0] || null)} />
                </div>
                {errors.csv && <p className="text-[11px] text-red-500 mt-1">{errors.csv}</p>}
            </Field>
            </div>
        ) : (
            <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-xl p-4 text-sm text-green-700">
            <span>🔹</span>
            <p><strong>Single version</strong> — all {qty.toLocaleString()} flyer{qty !== 1 ? "s" : ""} will be printed with the same design.</p>
            </div>
        )}
        </div>
    </SectionCard>

    {/* Add-ons */}
    <SectionCard title="Add-ons & Finishing" icon="⭐">
        <div className="flex flex-col gap-5">
        <Field label="Folding Option">
            <div className="grid grid-cols-3 gap-2">
            {FOLDING_OPTS.map(({ val, icon, label }) => (
                <button key={val} type="button" onClick={() => setFolding(val)}
                className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border-2 text-xs font-bold text-center transition-all ${
                    folding === val
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-red-300"
                }`}
                >
                <span className="text-xl">{icon}</span>
                {label}
                {val !== "None" && <span className={`text-[9px] font-black ${folding === val ? "text-red-400" : "text-gray-400"}`}>+₱2</span>}
                </button>
            ))}
            </div>
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <AddOnToggle label="UV Coating" sublabel="High-gloss spot UV for premium look" icon="🔆" price={2} checked={uvCoating} onChange={() => setUvCoating(!uvCoating)} />
            <AddOnToggle label="Lamination" sublabel="Protective film over entire surface" icon="🛡️" price={3} checked={lamination} onChange={() => setLamination(!lamination)} />
            <AddOnToggle label="Rounded Corners" sublabel="Smooth 4mm radius on all corners" icon="🔲" price={1} checked={roundedCorners} onChange={() => setRoundedCorners(!roundedCorners)} />
            <AddOnToggle label="Express Printing" sublabel="Priority — 24–48 hr turnaround" icon="⚡" price={3} checked={express} onChange={() => setExpress(!express)} />
        </div>
        </div>
    </SectionCard>

    {/* Delivery */}
    <SectionCard title="Delivery" icon="🚚">
        <div className="flex flex-col gap-4">
        <Field label="Fulfillment Method">
            <div className="flex gap-3">
            <ToggleBtn active={delivery === "Pickup"} onClick={() => setDelivery("Pickup")}>🏪 Pickup</ToggleBtn>
            <ToggleBtn active={delivery === "Delivery"} onClick={() => setDelivery("Delivery")}>📦 Delivery</ToggleBtn>
            </div>
        </Field>
        {delivery === "Pickup" && (
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
            <span>📍</span>
            <p>You'll receive an SMS when your flyers are ready for pickup at our store.</p>
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

        {/* Flyer Preview Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-linear-to-r from-gray-50 to-white">
            <span className="text-xl">📄</span>
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-600">Flyer Preview</h2>
        </div>
        <div className="px-6 py-5 flex justify-center bg-gray-50">
            <FlyerPreview
            size={flyerSize} orientation={orientation} sides={sides} finish={finish}
            designMode={designMode} businessName={businessName} tagline={tagline}
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
//Not yet done
