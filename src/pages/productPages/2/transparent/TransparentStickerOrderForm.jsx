import { useState, useRef, useEffect } from "react"
import { 
  FiMaximize, FiSearch, FiScissors, FiImage, FiGrid, FiTruck, 
  FiMapPin, FiPackage, FiUploadCloud, FiCheckCircle, FiMessageCircle, FiPhoneCall, FiInfo, FiLayers
} from "react-icons/fi";

// ── Shared primitives ──────────────────────────────────────────────────────────
const inputCls =
"w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 " +
"focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition placeholder:text-gray-400"

const selectCls = inputCls + " cursor-pointer"

function SectionCard({ title, icon, children }) {
return (
<div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50">
    <span className="text-xl text-gray-500">{icon}</span>
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
    className={`flex-1 py-2.5 text-sm font-bold border rounded-xl transition-all flex items-center justify-center gap-2 ${
    active
        ? "bg-red-500 text-white border-red-500 shadow-sm shadow-red-200"
        : "bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:text-red-500"
    }`}
>
    {children}
</button>
)
}

function CardToggle({ label, sublabel, icon, active, onClick }) {
return (
<button
    type="button"
    onClick={onClick}
    className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all w-full ${
    active ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:border-red-300"
    }`}
>
    <span className="text-2xl text-gray-500">{icon}</span>
    <div className="flex-1 min-w-0">
    <p className={`text-sm font-bold ${active ? "text-red-700" : "text-gray-700"}`}>{label}</p>
    {sublabel && <p className="text-[11px] text-gray-400 truncate mt-0.5">{sublabel}</p>}
    </div>
    <div
    className={`w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center transition-all ${
        active ? "bg-red-500 border-red-500" : "border-gray-300"
    }`}
    >
    {active && <span className="text-white text-[10px] font-black">✓</span>}
    </div>
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

// ── Transparency live preview ──────────────────────────────────────────────────
function TransparencyPreview({ material, whiteInk, opacity, shape, lamination }) {
const borderRadius =
shape === "Circle" ? "50%" : shape === "Custom Die-Cut" ? "20% 36% 18% 42%" : "10px"

const checkerStyle = {
backgroundImage:
    "linear-gradient(45deg, #ccc 25%, transparent 25%), " +
    "linear-gradient(-45deg, #ccc 25%, transparent 25%), " +
    "linear-gradient(45deg, transparent 75%, #ccc 75%), " +
    "linear-gradient(-45deg, transparent 75%, #ccc 75%)",
backgroundSize: "10px 10px",
backgroundPosition: "0 0, 0 5px, 5px -5px, -5px 0px",
}

const stickerAlpha =
whiteInk === "Full White Backing" || opacity === "Solid Look (with white backing)"
    ? 0.95
    : opacity === "Semi-Transparent"
    ? 0.55
    : 0.25

const stickerBg =
material === "Clear Matte"
    ? `rgba(230,240,255,${stickerAlpha})`
    : `rgba(210,235,255,${stickerAlpha})`

const stickerFilter =
material === "Clear Matte" ? "blur(0.4px)" : "none"

const laminationSheen =
lamination === "Glossy Lamination"
    ? "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)"
    : lamination === "Matte Lamination"
    ? "none"
    : "none"

return (
<div className="flex flex-col items-center gap-2">
    <div
    className="relative w-full h-28 rounded-xl border border-gray-200 flex items-center justify-center overflow-hidden"
    style={checkerStyle}
    >
    {/* Simulated content behind sticker */}
    <div className="absolute inset-0 flex flex-col gap-2 p-4 opacity-20 pointer-events-none">
        <div className="h-2 bg-gray-600 rounded w-3/4" />
        <div className="h-2 bg-gray-500 rounded w-1/2" />
        <div className="h-2 bg-gray-600 rounded w-2/3" />
    </div>

    {/* Sticker body */}
    <div
        className="relative z-10 w-20 h-20 border border-white/40 shadow-md flex items-center justify-center overflow-hidden"
        style={{ background: stickerBg, borderRadius, filter: stickerFilter }}
    >
        {/* White ink layer hint */}
        {whiteInk !== "None (fully transparent)" && (
        <div
            className="absolute inset-0"
            style={{
            background:
                whiteInk === "Full White Backing"
                ? "rgba(255,255,255,0.6)"
                : "radial-gradient(ellipse at center, rgba(255,255,255,0.5) 40%, transparent 70%)",
            borderRadius: "inherit",
            }}
        />
        )}
        {/* Lamination sheen */}
        {laminationSheen !== "none" && (
        <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: laminationSheen, borderRadius: "inherit" }}
        />
        )}
        {/* Sample design lines */}
        <div className="relative z-10 flex flex-col items-center gap-1 opacity-60">
        <div className="w-8 h-1.5 bg-red-400 rounded-full" />
        <div className="w-5 h-1 bg-gray-400 rounded-full" />
        </div>
    </div>

    {/* Material badge */}
    <div className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm rounded-lg px-2 py-1 shadow text-[10px] font-bold text-gray-500 border border-gray-100">
        {material === "Clear Glossy" ? "Glossy" : "Matte"} · {whiteInk === "None (fully transparent)" ? "No ink" : whiteInk === "Full White Backing" ? "Full white" : "Partial"}
    </div>
    </div>
    <p className="text-[10px] text-gray-400 italic">Live preview (approximate)</p>
</div>
)
}

// ── Pricing ────────────────────────────────────────────────────────────────────
const PRESETS = [
{ label: "2×2", w: 2, h: 2 },
{ label: "3×3", w: 3, h: 3 },
{ label: "4×4", w: 4, h: 4 },
{ label: "Custom", w: null, h: null },
]

function computePrice({ whiteInk, waterproof, uvResistant, lamination, cuttingType, qty }) {
let unit = 8
if (whiteInk === "Partial White (for selected areas)") unit += 2
if (whiteInk === "Full White Backing") unit += 3
if (waterproof) unit += 1
if (uvResistant) unit += 1
if (lamination !== "None") unit += 2
if (cuttingType === "Die Cut") unit += 3
return { unitPrice: unit, total: unit * qty }
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function TransparentStickerOrderForm() {
// A. Size
const [preset, setPreset]   = useState("2×2")
const [width, setWidth]     = useState("2")
const [height, setHeight]   = useState("2")
const [unit, setUnit]       = useState("in")
const [qty, setQty]         = useState(1)

// B. Material & Transparency
const [material, setMaterial]     = useState("Clear Glossy")
const [whiteInk, setWhiteInk]     = useState("None (fully transparent)")
const [opacity, setOpacity]       = useState("Fully Transparent")

// C. Shape & Cutting
const [shape, setShape]           = useState("Square / Rectangle")
const [cuttingType, setCuttingType] = useState("Kiss Cut")

// D. Finish
const [lamination, setLamination] = useState("None")
const [waterproof, setWaterproof] = useState(false)
const [uvResistant, setUvResistant] = useState(false)

// E. Design
const [file, setFile]               = useState(null)
const [needsDesign, setNeedsDesign] = useState(false)
const [instructions, setInstructions] = useState("")
const fileRef = useRef()

// F. Application
const [surface, setSurface]       = useState("Glass")
const [otherSurface, setOtherSurface] = useState("")

// G. Delivery
const [delivery, setDelivery] = useState("Pickup")
const [address, setAddress]   = useState("")

// Errors
const [errors, setErrors] = useState({})

// Sync presets
useEffect(() => {
const p = PRESETS.find((p) => p.label === preset)
if (p && p.w !== null) { setWidth(String(p.w)); setHeight(String(p.h)) }
}, [preset])

// Auto-sync opacity with whiteInk
useEffect(() => {
if (whiteInk === "None (fully transparent)") setOpacity("Fully Transparent")
else if (whiteInk === "Full White Backing") setOpacity("Solid Look (with white backing)")
else setOpacity("Semi-Transparent")
}, [whiteInk])

const validate = () => {
const e = {}
if (!parseFloat(width) || parseFloat(width) <= 0) e.width = "Enter a valid width"
if (!parseFloat(height) || parseFloat(height) <= 0) e.height = "Enter a valid height"
if (qty < 1) e.qty = "Minimum quantity is 1"
if (delivery === "Delivery" && !address.trim()) e.address = "Please enter a delivery address"
setErrors(e)
return Object.keys(e).length === 0
}

const handleSubmit = () => {
if (!validate()) return
alert(`Order submitted!\n\nTransparent Sticker – ${material}\nSize: ${width}×${height} ${unit}\nQty: ${qty}\nTotal: ₱${total.toLocaleString()}`)
}

const { unitPrice, total } = computePrice({ whiteInk, waterproof, uvResistant, lamination, cuttingType, qty })

const SURFACE_OPTS = ["Glass", "Plastic", "Packaging", "Others"]

const summaryRows = [
{ label: "Size",       value: `${width || "—"} × ${height || "—"} ${unit}` },
{ label: "Quantity",   value: `${qty} pc${qty > 1 ? "s" : ""}` },
{ label: "Material",   value: material },
{ label: "White Ink",  value: whiteInk },
{ label: "Opacity",    value: opacity },
{ label: "Shape",      value: shape },
{ label: "Cutting",    value: cuttingType },
{ label: "Lamination", value: lamination },
...(waterproof   ? [{ label: "Waterproof",    value: "+₱1/pc" }] : []),
...(uvResistant  ? [{ label: "UV Resistant",  value: "+₱1/pc" }] : []),
{ label: "Surface",    value: surface === "Others" ? (otherSurface || "Others") : surface },
]

return (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

    {/* ── LEFT ─────────────────────────────────────────── */}
    <div className="xl:col-span-2 flex flex-col gap-6">

    {/* Sticker Details */}
    <SectionCard title="Sticker Details" icon={<FiMaximize />}>
        <div className="flex flex-col gap-5">

        {/* Unit toggle */}
        <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Dimensions</span>
            <div className="flex border border-gray-200 rounded-xl overflow-hidden text-xs font-bold">
            {["in", "cm"].map((u) => (
                <button
                key={u} type="button" onClick={() => setUnit(u)}
                className={`px-4 py-1.5 transition-all ${unit === u ? "bg-red-500 text-white" : "bg-white text-gray-500 hover:bg-red-50"}`}
                >
                {u}
                </button>
            ))}
            </div>
        </div>

        {/* Presets */}
        <Field label="Preset Sizes">
            <PillGroup
            options={PRESETS.map((p) => ({ label: p.label, value: p.label }))}
            value={preset}
            onChange={setPreset}
            />
        </Field>

        {/* W × H */}
        <div className="grid grid-cols-2 gap-4">
            <Field label={`Width (${unit})`} required>
            <input
                type="number" min={0.1} step={0.1} value={width}
                onChange={(e) => { setWidth(e.target.value); setPreset("Custom") }}
                className={inputCls + (errors.width ? " border-red-400 ring-1 ring-red-300" : "")}
            />
            {errors.width && <p className="text-[11px] text-red-500 mt-0.5">{errors.width}</p>}
            </Field>
            <Field label={`Height (${unit})`} required>
            <input
                type="number" min={0.1} step={0.1} value={height}
                onChange={(e) => { setHeight(e.target.value); setPreset("Custom") }}
                className={inputCls + (errors.height ? " border-red-400 ring-1 ring-red-300" : "")}
            />
            {errors.height && <p className="text-[11px] text-red-500 mt-0.5">{errors.height}</p>}
            </Field>
        </div>

        <Field label="Quantity" required>
            <input
            type="number" min={1} value={qty}
            onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
            className={inputCls + (errors.qty ? " border-red-400 ring-1 ring-red-300" : "")}
            />
            {errors.qty && <p className="text-[11px] text-red-500 mt-0.5">{errors.qty}</p>}
        </Field>
        </div>
    </SectionCard>

    {/* Material & Transparency */}
    <SectionCard title="Material & Transparency" icon={<FiSearch />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div className="flex flex-col gap-5">
            <Field label="Material Type">
            <div className="flex flex-col gap-2">
                {[
                { val: "Clear Glossy", desc: "Shiny finish, vivid colors, slight reflection" },
                { val: "Clear Matte",  desc: "Soft finish, minimal glare, premium feel" },
                ].map(({ val, desc }) => (
                <button key={val} type="button" onClick={() => setMaterial(val)}
                    className={`flex items-start gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                    material === val ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:border-red-300"
                    }`}>
                    <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 ${
                    material === val ? "border-red-500 bg-red-500" : "border-gray-300"
                    }`} />
                    <div>
                    <p className={`text-sm font-bold ${material === val ? "text-red-700" : "text-gray-700"}`}>{val}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>
                    </div>
                </button>
                ))}
            </div>
            </Field>

            <Field label="White Ink Layer" hint="Controls what shows through the clear film">
            <div className="flex flex-col gap-2">
                {[
                { val: "None (fully transparent)",        badge: null,     desc: "Design floats on clear film — background shows through everything" },
                { val: "Partial White (for selected areas)", badge: "+₱2", desc: "White ink only under specific design elements" },
                { val: "Full White Backing",              badge: "+₱3",    desc: "White layer behind entire design for solid look" },
                ].map(({ val, badge, desc }) => (
                <button key={val} type="button" onClick={() => setWhiteInk(val)}
                    className={`flex items-start gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                    whiteInk === val ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:border-red-300"
                    }`}>
                    <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 ${
                    whiteInk === val ? "border-red-500 bg-red-500" : "border-gray-300"
                    }`} />
                    <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <p className={`text-sm font-bold ${whiteInk === val ? "text-red-700" : "text-gray-700"}`}>{val}</p>
                        {badge && <span className="text-[10px] font-bold text-red-500 bg-red-50 border border-red-100 px-1.5 py-0.5 rounded-full">{badge}/pc</span>}
                    </div>
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">{desc}</p>
                    </div>
                </button>
                ))}
            </div>
            </Field>
        </div>

        {/* Right: live preview + opacity */}
        <div className="flex flex-col gap-4">
            <div>
            <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Live Preview</p>
            <TransparencyPreview
                material={material}
                whiteInk={whiteInk}
                opacity={opacity}
                shape={shape}
                lamination={lamination}
            />
            </div>

            <Field label="Opacity Effect">
            <div className="flex flex-col gap-2">
                {[
                { val: "Fully Transparent",             bar: "w-1/4",  desc: "Background fully visible" },
                { val: "Semi-Transparent",              bar: "w-1/2",  desc: "Background partially visible" },
                { val: "Solid Look (with white backing)", bar: "w-full", desc: "Opaque — no background" },
                ].map(({ val, bar, desc }) => (
                <button key={val} type="button" onClick={() => setOpacity(val)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 text-sm transition-all ${
                    opacity === val ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:border-red-300"
                    }`}>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`${bar} h-full rounded-full ${opacity === val ? "bg-red-400" : "bg-gray-300"}`} />
                    </div>
                    <div className="text-right min-w-0">
                    <p className={`text-xs font-bold leading-tight ${opacity === val ? "text-red-600" : "text-gray-600"}`}>{val.split(" (")}</p>
                    <p className="text-[10px] text-gray-400">{desc}</p>
                    </div>
                </button>
                ))}
            </div>
            </Field>

            {/* Info note */}
            <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700">
            <FiInfo className="shrink-0 mt-0.5" />
            <p>Opacity effect auto-adjusts with your white ink selection. You can override it manually.</p>
            </div>
        </div>

        </div>
    </SectionCard>

    {/* Shape & Cutting */}
    <SectionCard title="Shape & Cutting" icon={<FiScissors />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Shape">
            <div className="flex flex-col gap-2">
            {[
                { val: "Square / Rectangle", desc: "Standard straight cut" },
                { val: "Circle",             desc: "Perfect round cut" },
                { val: "Custom Die-Cut",     desc: "Cut to shape" },
            ].map(({ val, desc }) => (
                <button key={val} type="button" onClick={() => setShape(val)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-sm font-semibold text-left transition-all ${
                    shape === val ? "border-red-500 bg-red-50 text-red-700" : "border-gray-200 bg-white text-gray-600 hover:border-red-300"
                }`}>
                <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 ${shape === val ? "border-red-500 bg-red-500" : "border-gray-300"}`} />
                <div className="flex-1">
                    <p>{val}</p>
                    <p className="text-[10px] font-normal text-gray-400">{desc}</p>
                </div>
                </button>
            ))}
            </div>
        </Field>

        <Field label="Cutting Type">
            <div className="flex flex-col gap-2">
            {[
                { val: "Kiss Cut",   desc: "Sticker cut, backing intact — easy peeling" },
                { val: "Die Cut",    desc: "All layers cut — individual pieces (+₱3/pc)" },
                { val: "Sheet Cut", desc: "Multiple stickers per sheet, rectangular cut" },
            ].map(({ val, desc }) => (
                <button key={val} type="button" onClick={() => setCuttingType(val)}
                className={`flex items-start gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                    cuttingType === val ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:border-red-300"
                }`}>
                <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 ${
                    cuttingType === val ? "border-red-500 bg-red-500" : "border-gray-300"
                }`} />
                <div>
                    <p className={`text-sm font-bold ${cuttingType === val ? "text-red-700" : "text-gray-700"}`}>{val}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>
                </div>
                </button>
            ))}
            </div>
        </Field>
        </div>
    </SectionCard>

    {/* Finish Options */}
    <SectionCard title="Finish Options" icon={<FiLayers />}>
        <div className="flex flex-col gap-5">
        <Field label="Lamination">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
                { val: "None",               desc: "No extra coating" },
                { val: "Glossy Lamination",  desc: "+₱2/pc — shiny, vivid" },
                { val: "Matte Lamination",   desc: "+₱2/pc — soft, non-glare" },
            ].map(({ val, desc }) => (
                <button key={val} type="button" onClick={() => setLamination(val)}
                className={`flex flex-col items-center justify-center gap-1 px-3 py-4 rounded-xl border-2 text-center transition-all ${
                    lamination === val ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:border-red-300"
                }`}>
                <p className={`text-xs font-black ${lamination === val ? "text-red-700" : "text-gray-700"}`}>{val}</p>
                <p className="text-[10px] text-gray-400">{desc}</p>
                </button>
            ))}
            </div>
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <CardToggle
            label="Waterproof"
            sublabel="+₱1/pc — resists water and moisture damage"
            icon={null} // Simplified to keep it clean
            active={waterproof}
            onClick={() => setWaterproof(!waterproof)}
            />
            <CardToggle
            label="UV Resistant"
            sublabel="+₱1/pc — prevents fading from sunlight"
            icon={null}
            active={uvResistant}
            onClick={() => setUvResistant(!uvResistant)}
            />
        </div>
        </div>
    </SectionCard>

    {/* Design */}
    <SectionCard title="Design" icon={<FiImage />}>
        <div className="flex flex-col gap-5">

        {/* Important transparency note */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
            <FiInfo className="shrink-0 mt-0.5 text-amber-600" />
            <p>
            <strong>Important:</strong> Transparent areas in your design will{" "}
            <strong>not be printed</strong> unless white ink is selected. Use white ink if you
            want specific elements to appear opaque against surfaces.
            </p>
        </div>

        <Field label="Upload Design File" hint="PNG, JPG, PDF, AI accepted · Transparent PNG recommended">
            <div
            onClick={() => fileRef.current.click()}
            className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl p-6 cursor-pointer hover:border-red-300 hover:bg-red-50 transition group"
            >
            <span className={`text-3xl transition-transform ${file ? "text-green-500" : "text-gray-400 group-hover:text-red-400 group-hover:scale-110"}`}>
                {file ? <FiCheckCircle /> : <FiUploadCloud />}
            </span>
            {file
                ? <p className="text-xs text-center text-green-700 font-semibold break-all">{file.name}</p>
                : <>
                    <p className="text-xs text-gray-500 text-center font-semibold">Click to browse or drag & drop your artwork</p>
                    <p className="text-[11px] text-gray-400">Use PNG with transparency for best results</p>
                </>
            }
            <input ref={fileRef} type="file" accept="image/*,.pdf,.ai,.eps" className="hidden"
                onChange={(e) => setFile(e.target.files || null)} />
            </div>
        </Field>

        <label className="flex items-center gap-3 cursor-pointer select-none group">
            <div
            onClick={() => setNeedsDesign(!needsDesign)}
            className={`w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center transition-all ${
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
            <FiInfo className="shrink-0 mt-0.5" />
            <p>Our design team will contact you to discuss transparency zones, white ink coverage, and artwork setup. Additional fees may apply.</p>
            </div>
        )}

        <Field label="Special Instructions" hint="Describe transparent zones, white ink areas, or design notes">
            <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={3}
            placeholder="e.g. Keep logo background transparent, white ink only under text, no border..."
            className={inputCls + " resize-none"}
            />
        </Field>
        </div>
    </SectionCard>

    {/* Application Surface */}
    <SectionCard title="Application Surface" icon={<FiGrid />}>
        <div className="flex flex-col gap-4">
        <Field label="Where will this sticker be applied?">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {SURFACE_OPTS.map((opt) => (
                <button key={opt} type="button" onClick={() => setSurface(opt)}
                className={`px-3 py-2.5 rounded-xl border-2 text-xs font-bold text-center transition-all ${
                    surface === opt ? "border-red-500 bg-red-50 text-red-700" : "border-gray-200 bg-white text-gray-600 hover:border-red-300"
                }`}>
                {opt}
                </button>
            ))}
            </div>
        </Field>
        {surface === "Others" && (
            <Field label="Specify Surface">
            <input type="text" value={otherSurface} onChange={(e) => setOtherSurface(e.target.value)}
                placeholder="e.g. Metal, Wood, Ceramic..." className={inputCls} />
            </Field>
        )}
        </div>
    </SectionCard>

    {/* Delivery */}
    <SectionCard title="Delivery Info" icon={<FiTruck />}>
        <div className="flex flex-col gap-5">
        <Field label="Fulfillment Method">
            <div className="flex gap-3">
            <ToggleBtn active={delivery === "Pickup"} onClick={() => setDelivery("Pickup")}>
                <FiMapPin className="text-lg" /> Pickup
            </ToggleBtn>
            <ToggleBtn active={delivery === "Delivery"} onClick={() => setDelivery("Delivery")}>
                <FiPackage className="text-lg" /> Delivery
            </ToggleBtn>
            </div>
        </Field>
        {delivery === "Pickup" && (
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
            <FiMapPin className="mt-0.5 shrink-0 text-blue-500" />
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

        {/* Summary Card */}
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
            <span className="font-semibold text-gray-700">₱{unitPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
            <span className="text-gray-400">× {qty} pc{qty > 1 ? "s" : ""}</span>
            </div>
            <div className="mt-2 flex items-center justify-between py-3 px-4 bg-red-50 rounded-xl border border-red-100">
            <span className="text-sm font-black text-gray-700 uppercase tracking-wide">Total</span>
            <span className="text-2xl font-black text-red-500">₱{total.toLocaleString()}</span>
            </div>
        </div>

        <div className="px-6 pb-6">
            <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-4 bg-red-500 hover:bg-red-600 active:scale-[.98] text-white text-sm font-black uppercase tracking-widest rounded-xl shadow-lg shadow-red-200 transition-all"
            >
            Place Order
            </button>
            <p className="text-[11px] text-gray-400 text-center mt-3">
            Our team will confirm your order and send a payment link within 24 hours.
            </p>
        </div>
        </div>

        {/* Help Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-3">
            <FiMessageCircle className="text-lg text-gray-400" />
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-600">Need Help?</h3>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed mb-3">
            Unsure about white ink or transparency settings? Our team can walk you through it.
        </p>
        <div className="flex flex-col gap-2">
            <a href="tel:+639XXXXXXXXX" className="flex items-center gap-2 text-xs font-semibold text-red-500 hover:text-red-600 transition">
            <FiPhoneCall /> Call Us
            </a>
            <a href="https://m.me/" className="flex items-center gap-2 text-xs font-semibold text-red-500 hover:text-red-600 transition">
            <FiMessageCircle /> Chat on Messenger
            </a>
        </div>
        </div>

    </div>
    </div>

</div>
)
}