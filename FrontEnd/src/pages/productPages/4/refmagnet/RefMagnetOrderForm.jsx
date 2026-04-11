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

// ── Magnet Preview ─────────────────────────────────────────────────────────────
function MagnetPreview({ shape, size, finish, material, thickness, roundedCorners,
                        metallicFinish, designMode, title, subtitle, date, colorTheme,
                        designFile, photoFile }) {

const dims = {
"Small (2\" × 2\")":  { w: 70,  h: 70  },
"Medium (3\" × 4\")": { w: 72,  h: 96  },
"Large (4\" × 6\")":  { w: 80,  h: 120 },
"Custom":             { w: 80,  h: 100 },
}
const { w, h } = dims[size] || dims["Medium (3\" × 4\")"]
const pw = shape === "Square" ? Math.min(w, h) : w
const ph = shape === "Square" ? Math.min(w, h) : h

const radius = shape === "Circle"
? "50%"
: roundedCorners || shape === "Die-cut (custom shape)"
? "12px"
: "6px"

const bgColor = colorTheme || "#ffffff"
const isLight = !colorTheme || colorTheme === "#ffffff" || colorTheme.toLowerCase() === "#fff"

const glossy = finish === "Glossy" || finish === "Laminated"
const shimmer = metallicFinish

const matColor = material === "Acrylic Magnet"
? "rgba(200,230,255,0.18)"
: material === "Rigid Magnet Board"
? "rgba(0,0,0,0.07)"
: "transparent"

const shadow = thickness === "Thick"
? "4px 6px 16px rgba(0,0,0,0.18)"
: "2px 4px 10px rgba(0,0,0,0.12)"

const hasContent = (designMode === "manual" && title) || designFile || photoFile

return (
<div className="flex flex-col items-center gap-2">
    <div
    className="relative overflow-hidden flex flex-col items-center justify-center"
    style={{
        width: pw,
        height: ph,
        borderRadius: radius,
        background: hasContent && colorTheme ? colorTheme : "#f9fafb",
        boxShadow: shadow,
        border: "1px solid rgba(0,0,0,0.08)",
    }}
    >
    {/* Metallic sheen */}
    {shimmer && (
        <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(120deg, rgba(255,215,0,0.18) 0%, rgba(255,255,255,0.55) 40%, rgba(192,192,192,0.18) 100%)",
        }} />
    )}
    {/* Glossy reflection */}
    {glossy && (
        <div className="absolute top-0 left-0 right-0 h-1/3 pointer-events-none" style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, transparent 100%)",
        }} />
    )}
    {/* Material tint */}
    <div className="absolute inset-0 pointer-events-none" style={{ background: matColor }} />

    {/* Content */}
    <div className="relative z-10 flex flex-col items-center justify-center gap-0.5 px-2 w-full text-center">
        {hasContent ? (
        designMode === "manual" && title ? (
            <>
            {date && <p className="text-[7px] font-bold text-red-400 uppercase tracking-widest leading-tight">{date}</p>}
            <p className="text-[9px] font-black leading-tight wrap-break-words w-full" style={{ color: isLight ? "#1f2937" : "#ffffff" }}>
                {title}
            </p>
            {subtitle && (
                <p className="text-[7px] leading-tight mt-0.5 wrap-break-words w-full" style={{ color: isLight ? "#6b7280" : "rgba(255,255,255,0.75)" }}>
                {subtitle}
                </p>
            )}
            <div className="w-6 h-0.5 rounded-full mt-1" style={{ background: isLight ? "#ef4444" : "rgba(255,255,255,0.4)" }} />
            </>
        ) : (
            <div className="flex flex-col items-center gap-1 opacity-50">
            <span className="text-lg">🖼️</span>
            <span className="text-[7px] text-gray-500 font-semibold">Design Ready</span>
            </div>
        )
        ) : (
        <div className="flex flex-col items-center gap-0.5 opacity-25">
            <span className="text-base">🧲</span>
            <span className="text-[7px] text-gray-500">Preview</span>
        </div>
        )}
    </div>

    {/* QR code hint dot */}
    {false && (
        <div className="absolute bottom-1 right-1 w-4 h-4 bg-gray-800 rounded-sm opacity-60" />
    )}
    </div>

    <div className="flex flex-col items-center gap-0.5">
    <p className="text-[9px] text-gray-400 italic">{shape} · {size}</p>
    <div className="flex items-center gap-1">
        {finish !== "Matte" && (
        <span className="text-[8px] bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded-full font-bold">
            {finish}
        </span>
        )}
        {metallicFinish && (
        <span className="text-[8px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full font-bold">
            Metallic
        </span>
        )}
        {thickness === "Thick" && (
        <span className="text-[8px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full font-bold">
            Thick
        </span>
        )}
    </div>
    </div>
</div>
)
}

// ── Pricing ────────────────────────────────────────────────────────────────────
function computePrice({ qty, material, thickness, size, shape, finish, qrCode, metallicFinish, packaging }) {
let base = 20
if (material === "Acrylic Magnet") base += 10
if (thickness === "Thick") base += 5
if (size === "Large (4\" × 6\")") base += 5
if (shape === "Die-cut (custom shape)") base += 5
if (finish === "Laminated") base += 3
if (qrCode) base += 2
if (metallicFinish) base += 4
if (packaging) base += 3
return { unitPrice: base, total: base * Math.max(1, qty) }
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function RefMagnetOrderForm() {
// A. Magnet Details
const [magnetType, setMagnetType]   = useState("Photo Magnet")
const [shape, setShape]             = useState("Rectangle")
const [size, setSize]               = useState("Medium (3\" × 4\")")
const [customSize, setCustomSize]   = useState("")
const [qty, setQty]                 = useState(10)

// B. Material & Finish
const [material, setMaterial]       = useState("Flexible Magnet Sheet")
const [finish, setFinish]           = useState("Glossy")
const [thickness, setThickness]     = useState("Standard")

// C. Design
const [designMode, setDesignMode]   = useState("upload")  // "upload" | "manual"
const [designFile, setDesignFile]   = useState(null)
const [photoFile, setPhotoFile]     = useState(null)
const [title, setTitle]             = useState("")
const [subtitle, setSubtitle]       = useState("")
const [date, setDate]               = useState("")
const [colorTheme, setColorTheme]   = useState("#ffffff")
const designRef = useRef()
const photoRef  = useRef()

// D. Bulk Order
const [bulkOrder, setBulkOrder]     = useState(false)
const [csvFile, setCsvFile]         = useState(null)
const csvRef = useRef()

// E. Add-ons
const [roundedCorners, setRoundedCorners]   = useState(false)
const [glossLamination, setGlossLamination] = useState(false)
const [qrCode, setQrCode]                   = useState(false)
const [metallicFinish, setMetallicFinish]   = useState(false)
const [packaging, setPackaging]             = useState(false)

// F. Delivery
const [delivery, setDelivery]       = useState("Pickup")
const [address, setAddress]         = useState("")

const [errors, setErrors] = useState({})

const validate = () => {
const e = {}
if (!qty || qty < 1) e.qty = "Quantity must be at least 1"
if (size === "Custom" && !customSize.trim()) e.customSize = "Please enter a custom size"
if (designMode === "upload" && !designFile) e.design = "Please upload a design file"
if (designMode === "manual" && !title.trim()) e.title = "Please enter a title or event name"
if (bulkOrder && !csvFile) e.csv = "Please upload a CSV/Excel file for bulk personalization"
if (delivery === "Delivery" && !address.trim()) e.address = "Please enter a delivery address"
setErrors(e)
return Object.keys(e).length === 0
}

const handleSubmit = () => {
if (!validate()) return
alert(`✅ Order submitted!\n\nRef Magnet – ${magnetType}\nShape: ${shape} · ${size}\nMaterial: ${material}\nQty: ${qty.toLocaleString()} pcs\nTotal: ₱${pricing.total.toLocaleString()}`)
}

const pricing = computePrice({ qty, material, thickness, size, shape, finish, qrCode, metallicFinish, packaging })

const SHAPES = [
{ val: "Rectangle",               icon: "▬", desc: "Classic landscape layout" },
{ val: "Square",                  icon: "■", desc: "Balanced, modern look" },
{ val: "Circle",                  icon: "●", desc: "Elegant round design" },
{ val: "Die-cut (custom shape)",  icon: "✂️", desc: "Custom silhouette cutout", badge: "+₱5" },
]

const SIZES = [
{ val: "Small (2\" × 2\")",   desc: "Compact collector size" },
{ val: "Medium (3\" × 4\")",  desc: "Most popular — great detail" },
{ val: "Large (4\" × 6\")",   desc: "Maximum visual impact", badge: "+₱5" },
{ val: "Custom",              desc: "Your exact dimensions" },
]

const MATERIALS = [
{ val: "Flexible Magnet Sheet", icon: "🧲", desc: "Lightweight, thin, and durable" },
{ val: "Rigid Magnet Board",    icon: "🪨", desc: "Firm backing, premium feel" },
{ val: "Acrylic Magnet",        icon: "💎", desc: "Crystal-clear luxury finish",    badge: "+₱10" },
]

const selectedAddons = [
roundedCorners  && "Rounded Corners",
glossLamination && "Gloss Lamination",
qrCode          && "QR Code",
metallicFinish  && "Metallic Finish",
packaging       && "Individual Wrap",
].filter(Boolean)

const summaryRows = [
{ label: "Type",         value: magnetType },
{ label: "Shape",        value: shape },
{ label: "Size",         value: size === "Custom" ? `Custom (${customSize || "—"})` : size },
{ label: "Material",     value: material },
{ label: "Finish",       value: finish },
{ label: "Thickness",    value: thickness },
{ label: "Quantity",     value: `${qty.toLocaleString()} pcs` },
{ label: "Design",       value: designMode === "upload" ? (designFile ? designFile.name : "—") : title || "—" },
...(selectedAddons.length ? [{ label: "Add-ons", value: selectedAddons.join(", ") }] : []),
{ label: "Delivery",     value: delivery },
]

return (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

    {/* ── LEFT ───────────────────────────────────────── */}
    <div className="xl:col-span-2 flex flex-col gap-6">

    {/* Magnet Details */}
    <SectionCard title="Magnet Details" icon="🧲">
        <div className="flex flex-col gap-5">

        <Field label="Magnet Type" required>
            <select value={magnetType} onChange={(e) => setMagnetType(e.target.value)} className={selectCls}>
            {["Photo Magnet", "Souvenir Magnet", "Calendar Magnet", "Business Promo Magnet", "Custom Magnet"].map((t) => (
                <option key={t}>{t}</option>
            ))}
            </select>
        </Field>

        <Field label="Shape">
            <div className="grid grid-cols-2 gap-2">
            {SHAPES.map(({ val, icon, desc, badge }) => (
                <OptionCard key={val} active={shape === val} onClick={() => setShape(val)}
                icon={icon} label={val} sublabel={desc} badge={badge} />
            ))}
            </div>
        </Field>

        <Field label="Size">
            <div className="grid grid-cols-2 gap-2">
            {SIZES.map(({ val, desc, badge }) => (
                <button
                key={val}
                type="button"
                onClick={() => setSize(val)}
                className={`py-2.5 px-3 rounded-xl border-2 text-left transition-all ${
                    size === val
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-red-300"
                }`}
                >
                <div className="flex items-center justify-between gap-1">
                    <p className="text-sm font-bold">{val}</p>
                    {badge && (
                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                        size === val ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"
                    }`}>{badge}</span>
                    )}
                </div>
                <p className="text-[10px] text-gray-400 mt-0.5">{desc}</p>
                </button>
            ))}
            </div>
        </Field>

        {size === "Custom" && (
            <Field label="Custom Size" hint='e.g. 3.5" × 5", 90mm × 60mm' required>
            <input
                type="text" value={customSize}
                onChange={(e) => setCustomSize(e.target.value)}
                placeholder="Enter width × height"
                className={inputCls + (errors.customSize ? " border-red-400 ring-1 ring-red-300" : "")}
            />
            {errors.customSize && <p className="text-[11px] text-red-500 mt-1">{errors.customSize}</p>}
            </Field>
        )}

        <Field label="Quantity" required>
            <input
            type="number" min={1} value={qty}
            onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
            className={inputCls + (errors.qty ? " border-red-400 ring-1 ring-red-300" : "")}
            />
            {errors.qty && <p className="text-[11px] text-red-500 mt-1">{errors.qty}</p>}
            {qty >= 100 && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-4 py-2 text-xs text-green-700 mt-1">
                <span>🎉</span>
                <span className="font-semibold">Bulk order! Volume discount may apply — our team will confirm.</span>
            </div>
            )}
        </Field>

        </div>
    </SectionCard>

    {/* Material & Finish */}
    <SectionCard title="Material & Finish" icon="✨">
        <div className="flex flex-col gap-5">

        <Field label="Material">
            <div className="flex flex-col gap-2">
            {MATERIALS.map(({ val, icon, desc, badge }) => (
                <OptionCard key={val} active={material === val} onClick={() => setMaterial(val)}
                icon={icon} label={val} sublabel={desc} badge={badge} />
            ))}
            </div>
        </Field>

        <Field label="Surface Finish">
            <div className="grid grid-cols-3 gap-2">
            {[
                { val: "Glossy",    icon: "✨", desc: "Shiny & vibrant" },
                { val: "Matte",     icon: "🪵", desc: "Soft, no-glare" },
                { val: "Laminated", icon: "🛡️", desc: "Protective film", badge: "+₱3" },
            ].map(({ val, icon, desc, badge }) => (
                <button
                key={val}
                type="button"
                onClick={() => setFinish(val)}
                className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border-2 text-xs font-bold text-center transition-all ${
                    finish === val
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-red-300"
                }`}
                >
                <span className="text-xl">{icon}</span>
                <span>{val}</span>
                <span className="text-[9px] text-gray-400 font-normal">{desc}</span>
                {badge && (
                    <span className={`text-[9px] font-black ${finish === val ? "text-red-400" : "text-gray-400"}`}>{badge}</span>
                )}
                </button>
            ))}
            </div>
        </Field>

        <Field label="Thickness">
            <div className="flex gap-3">
            <ToggleBtn active={thickness === "Standard"} onClick={() => setThickness("Standard")}>
                📄 Standard
            </ToggleBtn>
            <ToggleBtn active={thickness === "Thick"} onClick={() => setThickness("Thick")}>
                📦 Thick <span className="text-[10px] font-black opacity-75 ml-1">+₱5</span>
            </ToggleBtn>
            </div>
        </Field>

        </div>
    </SectionCard>

    {/* Customization */}
    <SectionCard title="Customization" icon="🎨">
        <div className="flex flex-col gap-5">

        {/* Live preview */}
        <div className="flex justify-center py-5 bg-gray-50 rounded-xl border border-gray-100">
            <MagnetPreview
            shape={shape} size={size} finish={finish} material={material}
            thickness={thickness} roundedCorners={roundedCorners}
            metallicFinish={metallicFinish} designMode={designMode}
            title={title} subtitle={subtitle} date={date}
            colorTheme={colorTheme} designFile={designFile} photoFile={photoFile}
            />
        </div>

        {/* Toggle: Upload vs Manual */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
            <button
            type="button"
            onClick={() => setDesignMode("upload")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                designMode === "upload" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
            >
            📁 Upload Design File
            </button>
            <button
            type="button"
            onClick={() => setDesignMode("manual")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                designMode === "manual" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
            >
            ✏️ Manual Design
            </button>
        </div>

        {designMode === "upload" ? (
            <>
            <Field label="Upload Design File" hint="PNG, JPG, PDF, AI accepted · 300 DPI recommended · Max 50MB" required>
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
                <input
                    ref={designRef} type="file"
                    accept="image/*,.pdf,.ai,.eps"
                    className="hidden"
                    onChange={(e) => setDesignFile(e.target.files[0] || null)}
                />
                </div>
                {errors.design && <p className="text-[11px] text-red-500 mt-1">{errors.design}</p>}
                <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700 mt-1">
                <span>💡</span>
                <p>Supply files at <strong>300 DPI</strong> minimum. Ensure your design canvas matches the magnet dimensions with a <strong>2mm bleed</strong> on all sides.</p>
                </div>
            </Field>

            {/* Photo upload for photo magnets */}
            {magnetType === "Photo Magnet" && (
                <Field label="Photo Upload (Optional)" hint="Upload your photo to be printed on the magnet">
                <div
                    onClick={() => photoRef.current.click()}
                    className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 hover:border-red-300 hover:bg-red-50 rounded-xl p-6 cursor-pointer transition group"
                >
                    <span className="text-3xl group-hover:scale-110 transition-transform">{photoFile ? "📸" : "🤳"}</span>
                    {photoFile ? (
                    <p className="text-xs text-center text-green-700 font-semibold break-all">{photoFile.name}</p>
                    ) : (
                    <>
                        <p className="text-sm font-semibold text-gray-500">Upload your photo</p>
                        <p className="text-xs text-gray-400">JPG, PNG — high resolution preferred</p>
                    </>
                    )}
                    <input
                    ref={photoRef} type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setPhotoFile(e.target.files[0] || null)}
                    />
                </div>
                </Field>
            )}
            </>
        ) : (
            /* Manual Design */
            <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-700">
                <span>🎨</span>
                <p className="text-xs leading-relaxed">Fill in the details below and our design team will create your magnet layout. A digital proof will be sent for approval before printing.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Title / Event Name" required>
                <input
                    type="text" value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Wedding of John & Jane"
                    className={inputCls + (errors.title ? " border-red-400 ring-1 ring-red-300" : "")}
                />
                {errors.title && <p className="text-[11px] text-red-500 mt-1">{errors.title}</p>}
                </Field>
                <Field label="Subtitle / Message">
                <input
                    type="text" value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="e.g. Thank you for being there!"
                    className={inputCls}
                />
                </Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Date" hint="Event or souvenir date">
                <input
                    type="text" value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="e.g. June 14, 2025"
                    className={inputCls}
                />
                </Field>
                <Field label="Color Theme" hint="Main background color">
                <div className="flex gap-2 items-center">
                    <input
                    type="color" value={colorTheme}
                    onChange={(e) => setColorTheme(e.target.value)}
                    className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-1 shrink-0"
                    />
                    <input
                    type="text" value={colorTheme}
                    onChange={(e) => setColorTheme(e.target.value)}
                    placeholder="#ffffff"
                    className={inputCls}
                    />
                </div>
                </Field>
            </div>
            {/* Photo for manual mode too */}
            {magnetType === "Photo Magnet" && (
                <Field label="Photo Upload (Optional)">
                <div
                    onClick={() => photoRef.current.click()}
                    className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 hover:border-red-300 hover:bg-red-50 rounded-xl p-6 cursor-pointer transition group"
                >
                    <span className="text-3xl group-hover:scale-110 transition-transform">{photoFile ? "📸" : "🤳"}</span>
                    {photoFile
                    ? <p className="text-xs text-center text-green-700 font-semibold break-all">{photoFile.name}</p>
                    : <p className="text-sm font-semibold text-gray-500">Upload your photo (optional)</p>
                    }
                    <input ref={photoRef} type="file" accept="image/*" className="hidden"
                    onChange={(e) => setPhotoFile(e.target.files[0] || null)} />
                </div>
                </Field>
            )}
            </div>
        )}

        </div>
    </SectionCard>

    {/* Bulk Order */}
    <SectionCard title="Order Type" icon="📋">
        <div className="flex flex-col gap-4">
        <div className="flex gap-3">
            <ToggleBtn active={!bulkOrder} onClick={() => setBulkOrder(false)}>🔹 Single Design</ToggleBtn>
            <ToggleBtn active={bulkOrder} onClick={() => setBulkOrder(true)}>📊 Bulk / Personalized</ToggleBtn>
        </div>

        {bulkOrder ? (
            <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
                <span className="text-lg shrink-0">📋</span>
                <div>
                <p className="font-bold mb-1">Bulk Personalization — CSV Upload</p>
                <p className="text-xs leading-relaxed">
                    Upload a spreadsheet with columns:{" "}
                    <code className="bg-blue-100 px-1 rounded">Name</code>,{" "}
                    <code className="bg-blue-100 px-1 rounded">Date</code>,{" "}
                    <code className="bg-blue-100 px-1 rounded">Message</code>.
                    Each row = one unique magnet.
                </p>
                </div>
            </div>
            <Field label="Upload CSV / Excel File" required>
                <div
                onClick={() => csvRef.current.click()}
                className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-6 cursor-pointer transition group ${
                    errors.csv ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-red-300 hover:bg-red-50"
                }`}
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
            <p><strong>Single design</strong> — all {qty.toLocaleString()} magnet{qty !== 1 ? "s" : ""} will be printed with the same layout.</p>
            </div>
        )}
        </div>
    </SectionCard>

    {/* Add-ons */}
    <SectionCard title="Add-ons" icon="⭐">
        <div className="flex flex-col gap-3">
        <AddOnToggle
            label="Rounded Corners"
            sublabel="Smooth 4mm radius — polished souvenir look"
            icon="🔲"
            priceLabel="Free"
            checked={roundedCorners}
            onChange={() => setRoundedCorners(!roundedCorners)}
        />
        <AddOnToggle
            label="Gloss Lamination"
            sublabel="Extra protective gloss film — enhances vibrancy"
            icon="✨"
            priceLabel="Free"
            checked={glossLamination}
            onChange={() => setGlossLamination(!glossLamination)}
        />
        <AddOnToggle
            label="QR Code Printing"
            sublabel="Link to a URL, social page, or event photo album"
            icon="📱"
            priceLabel="+₱2/pc"
            checked={qrCode}
            onChange={() => setQrCode(!qrCode)}
        />
        <AddOnToggle
            label="Metallic Finish"
            sublabel="Gold or silver foil effect on select areas"
            icon="🥇"
            priceLabel="+₱4/pc"
            checked={metallicFinish}
            onChange={() => setMetallicFinish(!metallicFinish)}
        />
        <AddOnToggle
            label="Individual Packaging"
            sublabel="Each magnet wrapped in a clear OPP pouch"
            icon="🎁"
            priceLabel="+₱3/pc"
            checked={packaging}
            onChange={() => setPackaging(!packaging)}
        />
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
            <p>You'll receive an SMS when your magnets are ready for pickup at our store.</p>
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
    <div className="sticky top-6 flex flex-col gap-4">

        {/* Magnet Preview Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-linear-to-r from-gray-50 to-white">
            <span className="text-xl">🧲</span>
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-600">Magnet Preview</h2>
        </div>
        <div className="px-6 py-6 flex justify-center bg-gray-50 min-h-45 items-center">
            <MagnetPreview
            shape={shape} size={size} finish={finish} material={material}
            thickness={thickness} roundedCorners={roundedCorners}
            metallicFinish={metallicFinish} designMode={designMode}
            title={title} subtitle={subtitle} date={date}
            colorTheme={colorTheme} designFile={designFile} photoFile={photoFile}
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
                <span className="text-right text-gray-700 font-semibold text-xs max-w-[55%] wrap-break-words">{value}</span>
            </div>
            ))}
        </div>
        <div className="mx-6 border-t border-gray-100" />
        <div className="px-6 py-4 flex flex-col gap-2">
            <div className="flex justify-between text-sm">
            <span className="text-gray-400">Price / pc</span>
            <span className="font-semibold text-gray-700">₱{pricing.unitPrice}</span>
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
            Need help with design templates or bulk orders? Message us on Facebook or email{" "}
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