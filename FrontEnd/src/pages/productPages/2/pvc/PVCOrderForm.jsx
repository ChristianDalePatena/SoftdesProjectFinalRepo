import { useState, useRef } from "react"
import { 
  FiCreditCard, FiMaximize, FiUser, FiUploadCloud, FiImage, FiPlusCircle, 
  FiTruck, FiMapPin, FiPackage, FiCheckCircle, FiMessageCircle, FiPhoneCall, 
  FiInfo, FiLayout, FiFileText, FiCamera, FiEdit3, FiLink 
} from "react-icons/fi"; // <-- FiLink is now safely imported here!

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

// ── ID Card Preview ────────────────────────────────────────────────────────────
function IDCardPreview({ orientation, finish, idType, thickness }) {
const isLandscape = orientation === "Landscape"
const isGlossy = finish === "Glossy"
const cardW = isLandscape ? 160 : 100
const cardH = isLandscape ? 100 : 160

return (
<div className="flex flex-col items-center gap-2">
    <div className="w-full h-44 rounded-xl bg-linear-to-br from-gray-100 to-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden">
    <div
        style={{ width: cardW, height: cardH }}
        className={`rounded-xl border-2 border-gray-300 flex flex-col overflow-hidden transition-all ${
        isGlossy ? "shadow-lg shadow-blue-100" : "shadow-sm"
        }`}
    >
        {/* Card header strip */}
        <div className="bg-red-500 h-8 flex items-center px-2 shrink-0">
        <div className="w-4 h-4 rounded-full bg-white/30 mr-1.5" />
        <div className="flex flex-col gap-0.5">
            <div className="w-10 h-1 bg-white/70 rounded" />
            <div className="w-7 h-1 bg-white/40 rounded" />
        </div>
        </div>
        {/* Card body */}
        <div className="flex-1 bg-white flex gap-2 p-2">
        <div className="w-8 h-10 rounded bg-gray-200 shrink-0 flex items-center justify-center">
            <FiUser className="text-gray-400 text-[10px]" />
        </div>
        <div className="flex flex-col gap-1 justify-center">
            <div className="w-12 h-1.5 bg-gray-300 rounded" />
            <div className="w-8 h-1 bg-gray-200 rounded" />
            <div className="w-10 h-1 bg-gray-200 rounded" />
        </div>
        </div>
        {/* Barcode strip */}
        <div className="bg-gray-50 border-t border-gray-100 h-5 flex items-center justify-center px-2">
        <div className="flex gap-0.5">
            {[...Array(16)].map((_, i) => (
            <div key={i} className="bg-gray-400 rounded-sm" style={{ width: i % 3 === 0 ? 2 : 1, height: 10 }} />
            ))}
        </div>
        </div>
    </div>
    </div>
    <div className="flex items-center gap-2">
    <span className="text-[10px] text-gray-400 italic">Live preview</span>
    {isGlossy && <span className="text-[10px] text-blue-400 font-semibold">✦ Glossy</span>}
    {thickness === "Thick (1mm)" && <span className="text-[10px] text-amber-500 font-semibold">⬛ Thick</span>}
    </div>
</div>
)
}

// ── Pricing ────────────────────────────────────────────────────────────────────
function computePrice({ finish, thickness, lanyard, idHolder, qrCode, qty }) {
let unit = 50
if (finish === "Matte") unit += 5
if (thickness === "Thick (1mm)") unit += 10
if (lanyard) unit += 20
if (idHolder) unit += 15
if (qrCode) unit += 5
return { unitPrice: unit, total: unit * qty }
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function PVCOrderForm() {
// A. ID Details
const [idType, setIdType]           = useState("School ID")
const [orientation, setOrientation] = useState("Portrait")
const [qty, setQty]                 = useState(10)

// B. Card Specs
const [cardSize, setCardSize]     = useState("Standard CR80")
const [customSize, setCustomSize] = useState("")
const [finish, setFinish]         = useState("Glossy")
const [thickness, setThickness]   = useState("Standard (0.76mm)")

// C. Personalization
const [bulkMode, setBulkMode]         = useState(false)
const [csvFile, setCsvFile]           = useState(null)
const [singleName, setSingleName]     = useState("")
const [singleIdNum, setSingleIdNum]   = useState("")
const [singlePosition, setSinglePosition] = useState("")
const [singlePhoto, setSinglePhoto]   = useState(null)
const csvRef  = useRef()
const photoRef = useRef()

// D. Design
const [layoutFile, setLayoutFile]       = useState(null)
const [needsDesign, setNeedsDesign]     = useState(false)
const [instructions, setInstructions]   = useState("")
const layoutRef = useRef()

// E. Add-ons
const [lanyard, setLanyard]     = useState(false)
const [idHolder, setIdHolder]   = useState(false)
const [holePunch, setHolePunch] = useState(false)
const [qrCode, setQrCode]       = useState(false)

// F. Delivery
const [delivery, setDelivery] = useState("Pickup")
const [address, setAddress]   = useState("")

// Errors
const [errors, setErrors] = useState({})

const { unitPrice, total } = computePrice({ finish, thickness, lanyard, idHolder, qrCode, qty })

const validate = () => {
const e = {}
if (qty < 1) e.qty = "Minimum quantity is 1"
if (cardSize === "Custom size" && !customSize.trim()) e.customSize = "Please enter a custom size"
if (!bulkMode && !singleName.trim()) e.singleName = "Name is required"
if (!bulkMode && !singleIdNum.trim()) e.singleIdNum = "ID Number is required"
if (bulkMode && !csvFile) e.csvFile = "Please upload a CSV or Excel file"
if (delivery === "Delivery" && !address.trim()) e.address = "Please enter a delivery address"
setErrors(e)
return Object.keys(e).length === 0
}

const handleSubmit = () => {
if (!validate()) return
alert(`Order submitted!\n\nPVC ${idType} – ${finish} / ${thickness}\nQty: ${qty}\nTotal: ₱${total.toLocaleString()}`)
}

const addOnsLabel = [
lanyard && "Lanyard (+₱20)",
idHolder && "ID Holder (+₱15)",
holePunch && "Hole Punch",
qrCode && "QR Code (+₱5)",
].filter(Boolean).join(", ") || "None"

const summaryRows = [
{ label: "ID Type",      value: idType },
{ label: "Orientation",  value: orientation },
{ label: "Quantity",     value: `${qty} pcs` },
{ label: "Card Size",    value: cardSize === "Custom size" ? customSize || "Custom" : cardSize },
{ label: "Finish",       value: finish },
{ label: "Thickness",    value: thickness },
{ label: "Personalization", value: bulkMode ? "Bulk Upload" : "Single ID" },
{ label: "Add-ons",      value: addOnsLabel },
{ label: "Delivery",     value: delivery },
]

return (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

    {/* ── LEFT ──────────────────────────────────────── */}
    <div className="xl:col-span-2 flex flex-col gap-6">

    {/* ID Details */}
    <SectionCard title="ID Details" icon={<FiCreditCard />}>
        <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="ID Type" required>
            <select
                value={idType}
                onChange={(e) => setIdType(e.target.value)}
                className={selectCls}
            >
                {["School ID", "Company ID", "Event ID", "Custom ID"].map((t) => (
                <option key={t}>{t}</option>
                ))}
            </select>
            </Field>

            <Field label="Quantity" required>
            <input
                type="number" min={1} value={qty}
                onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                className={inputCls + (errors.qty ? " border-red-400 ring-1 ring-red-300" : "")}
            />
            {errors.qty && <p className="text-[11px] text-red-500 mt-0.5">{errors.qty}</p>}
            </Field>
        </div>

        <Field label="Orientation">
            <div className="flex gap-3">
            {[
                { val: "Portrait",  icon: <FiLayout className="rotate-90" />, desc: "Tall layout" },
                { val: "Landscape", icon: <FiLayout />, desc: "Wide layout" },
            ].map(({ val, icon, desc }) => (
                <button
                key={val} type="button" onClick={() => setOrientation(val)}
                className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                    orientation === val
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 bg-white hover:border-red-300"
                }`}
                >
                <span className={`text-2xl ${orientation === val ? "text-red-500" : "text-gray-400"}`}>{icon}</span>
                <div>
                    <p className={`text-sm font-bold ${orientation === val ? "text-red-700" : "text-gray-700"}`}>{val}</p>
                    <p className="text-[11px] text-gray-400">{desc}</p>
                </div>
                </button>
            ))}
            </div>
        </Field>
        </div>
    </SectionCard>

    {/* Card Specifications */}
    <SectionCard title="Card Specifications" icon={<FiMaximize />}>
        <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <Field label="Card Size">
            <div className="flex flex-col gap-2">
                {[
                { val: "Standard CR80", desc: "85.6 × 54mm — credit card size", tag: "Most common" },
                { val: "Custom size",   desc: "Enter your own dimensions",       tag: null },
                ].map(({ val, desc, tag }) => (
                <button
                    key={val} type="button" onClick={() => setCardSize(val)}
                    className={`flex items-start gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                    cardSize === val
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 bg-white hover:border-red-300"
                    }`}
                >
                    <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 ${
                    cardSize === val ? "border-red-500 bg-red-500" : "border-gray-300"
                    }`} />
                    <div className="flex-1">
                    <p className={`text-sm font-bold ${cardSize === val ? "text-red-700" : "text-gray-700"}`}>{val}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>
                    </div>
                    {tag && <span className="text-[10px] font-bold text-gray-400 shrink-0">{tag}</span>}
                </button>
                ))}
            </div>
            {cardSize === "Custom size" && (
                <div className="mt-2">
                <input
                    type="text" value={customSize}
                    onChange={(e) => setCustomSize(e.target.value)}
                    placeholder="e.g. 90 × 60mm"
                    className={inputCls + (errors.customSize ? " border-red-400 ring-1 ring-red-300" : "")}
                />
                {errors.customSize && <p className="text-[11px] text-red-500 mt-0.5">{errors.customSize}</p>}
                </div>
            )}
            </Field>

            <div className="flex flex-col gap-4">
            <Field label="Finish">
                <div className="flex flex-col gap-2">
                {[
                    { val: "Glossy", desc: "Shiny surface, vibrant colors" },
                    { val: "Matte",  desc: "Smooth, anti-glare (+₱5/pc)" },
                ].map(({ val, desc }) => (
                    <button
                    key={val} type="button" onClick={() => setFinish(val)}
                    className={`flex items-start gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                        finish === val
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 bg-white hover:border-red-300"
                    }`}
                    >
                    <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 ${
                        finish === val ? "border-red-500 bg-red-500" : "border-gray-300"
                    }`} />
                    <div>
                        <p className={`text-sm font-bold ${finish === val ? "text-red-700" : "text-gray-700"}`}>{val}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>
                    </div>
                    </button>
                ))}
                </div>
            </Field>

            <Field label="Thickness">
                <div className="flex flex-col gap-2">
                {[
                    { val: "Standard (0.76mm)", desc: "Standard PVC card" },
                    { val: "Thick (1mm)",       desc: "Extra durable (+₱10/pc)" },
                ].map(({ val, desc }) => (
                    <button
                    key={val} type="button" onClick={() => setThickness(val)}
                    className={`flex items-start gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                        thickness === val
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 bg-white hover:border-red-300"
                    }`}
                    >
                    <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 ${
                        thickness === val ? "border-red-500 bg-red-500" : "border-gray-300"
                    }`} />
                    <div>
                        <p className={`text-sm font-bold ${thickness === val ? "text-red-700" : "text-gray-700"}`}>{val}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>
                    </div>
                    </button>
                ))}
                </div>
            </Field>
            </div>
        </div>

        {/* Preview */}
        <div>
            <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Card Preview</p>
            <IDCardPreview
            orientation={orientation}
            finish={finish}
            idType={idType}
            thickness={thickness}
            />
        </div>
        </div>
    </SectionCard>

    {/* Personalization */}
    <SectionCard title="Personalization" icon={<FiUser />}>
        <div className="flex flex-col gap-5">

        {/* Mode toggle */}
        <div className="flex flex-col gap-2">
            <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">Production Mode</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
                type="button" onClick={() => setBulkMode(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                !bulkMode ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:border-red-300"
                }`}
            >
                <span className="text-2xl text-gray-500"><FiCreditCard /></span>
                <div>
                <p className={`text-sm font-bold ${!bulkMode ? "text-red-700" : "text-gray-700"}`}>Single ID</p>
                <p className="text-[11px] text-gray-400">Enter details manually</p>
                </div>
                <div className={`ml-auto w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center ${
                !bulkMode ? "bg-red-500 border-red-500" : "border-gray-300"
                }`}>
                {!bulkMode && <span className="text-white text-[10px] font-black">✓</span>}
                </div>
            </button>

            <button
                type="button" onClick={() => setBulkMode(true)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                bulkMode ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:border-red-300"
                }`}
            >
                <span className="text-2xl text-gray-500"><FiFileText /></span>
                <div>
                <p className={`text-sm font-bold ${bulkMode ? "text-red-700" : "text-gray-700"}`}>Bulk Upload</p>
                <p className="text-[11px] text-gray-400">CSV / Excel file</p>
                </div>
                <div className={`ml-auto w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center ${
                bulkMode ? "bg-red-500 border-red-500" : "border-gray-300"
                }`}>
                {bulkMode && <span className="text-white text-[10px] font-black">✓</span>}
                </div>
            </button>
            </div>
        </div>

        {/* Bulk upload */}
        {bulkMode && (
            <div className="flex flex-col gap-3">
            <Field label="Upload CSV / Excel File" hint="Each row = one ID. Columns: Name, ID Number, Position/Course" required>
                <div
                onClick={() => csvRef.current.click()}
                className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-5 cursor-pointer hover:border-red-300 hover:bg-red-50 transition group ${
                    errors.csvFile ? "border-red-400" : "border-gray-200"
                }`}
                >
                <span className={`text-2xl transition-transform ${csvFile ? "text-green-500 group-hover:scale-110" : "text-gray-400 group-hover:text-red-400 group-hover:scale-110"}`}>
                    {csvFile ? <FiCheckCircle /> : <FiUploadCloud />}
                </span>
                {csvFile
                    ? <p className="text-xs text-center text-green-700 font-semibold break-all">{csvFile.name}</p>
                    : <p className="text-xs text-gray-400 text-center font-semibold">Click to upload CSV or Excel file</p>
                }
                <input
                    ref={csvRef} type="file" accept=".csv,.xlsx,.xls" className="hidden"
                    onChange={(e) => setCsvFile(e.target.files || null)}
                />
                </div>
                {errors.csvFile && <p className="text-[11px] text-red-500">{errors.csvFile}</p>}
            </Field>

            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
                <FiInfo className="mt-0.5 shrink-0" />
                <div>
                <p className="font-bold text-xs mb-1">Required columns in your file:</p>
                <p className="text-[11px] leading-relaxed">Name · ID Number · Position or Course · Photo filename (optional)</p>
                </div>
            </div>
            </div>
        )}

        {/* Single entry */}
        {!bulkMode && (
            <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full Name" required>
                <input
                    type="text" value={singleName}
                    onChange={(e) => setSingleName(e.target.value)}
                    placeholder="e.g. Juan Dela Cruz"
                    className={inputCls + (errors.singleName ? " border-red-400 ring-1 ring-red-300" : "")}
                />
                {errors.singleName && <p className="text-[11px] text-red-500 mt-0.5">{errors.singleName}</p>}
                </Field>

                <Field label="ID Number" required>
                <input
                    type="text" value={singleIdNum}
                    onChange={(e) => setSingleIdNum(e.target.value)}
                    placeholder="e.g. 2024-00123"
                    className={inputCls + (errors.singleIdNum ? " border-red-400 ring-1 ring-red-300" : "")}
                />
                {errors.singleIdNum && <p className="text-[11px] text-red-500 mt-0.5">{errors.singleIdNum}</p>}
                </Field>
            </div>

            <Field label="Position / Course" hint="e.g. BSCS 3-A or Marketing Manager">
                <input
                type="text" value={singlePosition}
                onChange={(e) => setSinglePosition(e.target.value)}
                placeholder="e.g. BS Computer Science 3-A"
                className={inputCls}
                />
            </Field>

            <Field label="ID Photo" hint="JPG or PNG, at least 300×300px recommended">
                <div
                onClick={() => photoRef.current.click()}
                className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl p-5 cursor-pointer hover:border-red-300 hover:bg-red-50 transition group"
                >
                {singlePhoto ? (
                    <div className="flex items-center gap-3">
                    <img
                        src={URL.createObjectURL(singlePhoto)}
                        alt="preview"
                        className="w-14 h-14 rounded-xl object-cover border border-gray-200"
                    />
                    <p className="text-xs text-green-700 font-semibold break-all">{singlePhoto.name}</p>
                    </div>
                ) : (
                    <>
                    <span className="text-2xl text-gray-400 group-hover:scale-110 transition-transform"><FiCamera /></span>
                    <p className="text-xs text-gray-400 text-center font-semibold">Click to upload ID photo</p>
                    </>
                )}
                <input
                    ref={photoRef} type="file" accept="image/*" className="hidden"
                    onChange={(e) => setSinglePhoto(e.target.files || null)}
                />
                </div>
            </Field>
            </div>
        )}
        </div>
    </SectionCard>

    {/* Design Section */}
    <SectionCard title="Design & Layout" icon={<FiImage />}>
        <div className="flex flex-col gap-5">
        <Field label="Upload Layout / Template" hint="PNG, JPG, PDF, or AI file accepted · Max 50MB">
            <div
            onClick={() => layoutRef.current.click()}
            className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-200 rounded-xl p-5 cursor-pointer hover:border-red-300 hover:bg-red-50 transition group"
            >
            <span className={`text-2xl transition-transform ${layoutFile ? "text-green-500 group-hover:scale-110" : "text-gray-400 group-hover:text-red-400 group-hover:scale-110"}`}>
                {layoutFile ? <FiCheckCircle /> : <FiUploadCloud />}
            </span>
            {layoutFile
                ? <p className="text-xs text-center text-green-700 font-semibold break-all">{layoutFile.name}</p>
                : <p className="text-xs text-gray-400 text-center font-semibold">Click to browse or drag & drop your layout</p>
            }
            <input
                ref={layoutRef} type="file" accept="image/*,.pdf,.ai,.eps" className="hidden"
                onChange={(e) => setLayoutFile(e.target.files || null)}
            />
            </div>
        </Field>

        <label className="flex items-start gap-3 cursor-pointer select-none group">
            <div
            onClick={() => setNeedsDesign(!needsDesign)}
            className={`mt-0.5 w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center transition-all ${
                needsDesign
                ? "bg-red-500 border-red-500"
                : "bg-white border-gray-300 group-hover:border-red-400"
            }`}
            >
            {needsDesign && <span className="text-white text-[10px] font-black">✓</span>}
            </div>
            <span className="text-sm text-gray-700 leading-snug">
            I need <strong>design assistance</strong> — please help me create or refine my ID layout.
            </span>
        </label>

        {needsDesign && (
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-700">
            <FiInfo className="mt-0.5 shrink-0 text-amber-500" />
            <p>Our design team will reach out to collect your branding materials. Additional design fees may apply.</p>
            </div>
        )}

        <Field label="Special Instructions" hint="Font preferences, color codes, logo placement, data fields, etc.">
            <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={3}
            placeholder="e.g. Use school colors (blue & gold), place QR on the back, logo top-left..."
            className={inputCls + " resize-none"}
            />
        </Field>
        </div>
    </SectionCard>

    {/* Add-ons */}
    <SectionCard title="Add-ons" icon={<FiPlusCircle />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <CardToggle
            label="Lanyard"
            sublabel="+₱20/pc — standard polyester neck strap"
            icon={<FiLink />}
            active={lanyard}
            onClick={() => setLanyard(!lanyard)}
        />
        <CardToggle
            label="ID Case / Holder"
            sublabel="+₱15/pc — clear PVC sleeve with snap"
            icon={<FiCreditCard />}
            active={idHolder}
            onClick={() => setIdHolder(!idHolder)}
        />
        <CardToggle
            label="Hole Punch"
            sublabel="Pre-punched for lanyard attachment"
            icon={<FiMaximize />}
            active={holePunch}
            onClick={() => setHolePunch(!holePunch)}
        />
        <CardToggle
            label="QR Code Printing"
            sublabel="+₱5/pc — custom QR on front or back"
            icon={<FiFileText />}
            active={qrCode}
            onClick={() => setQrCode(!qrCode)}
        />
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
                placeholder="e.g. 123 Rizal Ave., Brgy. Poblacion, Makati City, Metro Manila"
                className={inputCls + " resize-none" + (errors.address ? " border-red-400 ring-1 ring-red-300" : "")}
            />
            {errors.address && <p className="text-[11px] text-red-500 mt-0.5">{errors.address}</p>}
            </Field>
        )}
        </div>
    </SectionCard>

    </div>

    {/* ── RIGHT: Summary ────────────────────────────── */}
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
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Price Breakdown</p>
            <div className="flex justify-between text-xs text-gray-500">
            <span>Base price</span><span className="font-semibold text-gray-700">₱50/pc</span>
            </div>
            {finish === "Matte" && (
            <div className="flex justify-between text-xs text-gray-500">
                <span>Matte finish</span><span className="font-semibold text-gray-700">+₱5/pc</span>
            </div>
            )}
            {thickness === "Thick (1mm)" && (
            <div className="flex justify-between text-xs text-gray-500">
                <span>Thick card</span><span className="font-semibold text-gray-700">+₱10/pc</span>
            </div>
            )}
            {lanyard && (
            <div className="flex justify-between text-xs text-gray-500">
                <span>Lanyard</span><span className="font-semibold text-gray-700">+₱20/pc</span>
            </div>
            )}
            {idHolder && (
            <div className="flex justify-between text-xs text-gray-500">
                <span>ID Holder</span><span className="font-semibold text-gray-700">+₱15/pc</span>
            </div>
            )}
            {qrCode && (
            <div className="flex justify-between text-xs text-gray-500">
                <span>QR Code</span><span className="font-semibold text-gray-700">+₱5/pc</span>
            </div>
            )}
            <div className="flex justify-between text-xs text-gray-500 pt-1 border-t border-gray-100 mt-1">
            <span>Price per ID</span><span className="font-bold text-gray-800">₱{unitPrice}/pc</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
            <span>× {qty} pcs</span>
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
            Not sure which finish or thickness to pick? Message us and we'll guide you.
        </p>
        <div className="flex flex-col gap-2">
            <a href="tel:+639474631561" className="flex items-center gap-2 text-xs font-semibold text-red-500 hover:text-red-600 transition">
            <FiPhoneCall /> Call Us
            </a>
            <a href="https://m.me/p2printing" className="flex items-center gap-2 text-xs font-semibold text-red-500 hover:text-red-600 transition">
            <FiMessageCircle /> Chat on Messenger
            </a>
        </div>
        </div>

    </div>
    </div>

</div>
)
}