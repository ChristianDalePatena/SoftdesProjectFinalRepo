import { useState, useRef } from "react"
import { 
  FiTag, FiScissors, FiImage, FiLayers, FiGrid, FiTruck, 
  FiUploadCloud, FiCheckCircle, FiInfo 
} from "react-icons/fi";

import {
SectionCard, Field, ToggleGroup, DeliverySection,
SummaryCard, HelpCard, inputCls, selectCls,
} from "../../shared"

const PRESETS = [
{ label: "2×2", w: "2", h: "2" },
{ label: "3×3", w: "3", h: "3" },
{ label: "4×4", w: "4", h: "4" },
{ label: "Custom", w: "", h: "" },
]

export default function StickerOrderForm() {
// A. Sticker Details
const [stickerType, setStickerType] = useState("Matte Sticker")
const [sizeUnit, setSizeUnit]       = useState("cm")
const [preset, setPreset]           = useState("3×3")
const [width, setWidth]             = useState("3")
const [height, setHeight]           = useState("3")
const [qty, setQty]                 = useState(50)

// B. Shape & Cutting
const [shape, setShape]             = useState("Square")
const [cuttingType, setCuttingType] = useState("Die Cut")

// C. Design
const [file, setFile]                 = useState(null)
const [needsDesign, setNeedsDesign]   = useState(false)
const [instructions, setInstructions] = useState("")
const fileRef = useRef()

// D. Finish
const [lamination, setLamination]   = useState("None")
const [waterproof, setWaterproof]   = useState("No")
const [uvResistant, setUvResistant] = useState("No")

// E. Sheet Layout
const [autoLayout, setAutoLayout]             = useState(true)
const [stickersPerSheet, setStickersPerSheet] = useState(9)

// F. Delivery
const [delivery, setDelivery] = useState("Pickup")
const [address, setAddress]   = useState("")

// ── Preset handler
const handlePreset = (p) => {
setPreset(p.label)
if (p.label !== "Custom") { setWidth(p.w); setHeight(p.h) }
}

// ── Pricing
const base       = 5
const wpAdd      = waterproof  === "Yes"  ? 1 : 0
const uvAdd      = uvResistant === "Yes"  ? 1 : 0
const lamAdd     = lamination  !== "None" ? 2 : 0
const priceEach  = base + wpAdd + uvAdd + lamAdd
const safeQty    = Math.max(0, parseInt(qty) || 0)
const totalPrice = safeQty * priceEach

const estimatedSheets = autoLayout
? "Auto"
: Math.ceil(safeQty / Math.max(1, stickersPerSheet))

// ── Submit
const handleSubmit = () => {
if (!width || !height || parseFloat(width) <= 0 || parseFloat(height) <= 0) {
    alert("Please enter a valid width and height.")
    return
}
if (safeQty <= 0) {
    alert("Please enter a valid quantity.")
    return
}
if (delivery === "Delivery" && !address.trim()) {
    alert("Please enter a delivery address.")
    return
}
alert(`✅ Order submitted!\n\n${stickerType}\nSize: ${width}×${height} ${sizeUnit}\nQty: ${safeQty}\nTotal: ₱${totalPrice.toLocaleString()}`)
}

const summaryRows = [
{ label: "Sticker Type",  value: stickerType },
{ label: "Size",          value: `${width || "–"} × ${height || "–"} ${sizeUnit}` },
{ label: "Shape",         value: shape },
{ label: "Cutting",       value: cuttingType },
{ label: "Quantity",      value: `${safeQty} pcs`, bold: true },
{ label: "Lamination",    value: lamination },
{ label: "Waterproof",    value: waterproof },
{ label: "UV Resistant",  value: uvResistant },
{ label: "Design Assist", value: needsDesign ? "Yes" : "No" },
{ label: "Est. Sheets",   value: String(estimatedSheets) },
{ label: "Delivery",      value: delivery },
{ label: "Base price",    value: `₱${base}/pc` },
...(wpAdd  ? [{ label: "Waterproof",   value: `+₱${wpAdd}/pc`  }] : []),
...(uvAdd  ? [{ label: "UV Resistant", value: `+₱${uvAdd}/pc`  }] : []),
...(lamAdd ? [{ label: "Lamination",   value: `+₱${lamAdd}/pc` }] : []),
{ label: "Price / pc",    value: `₱${priceEach}`, bold: true },
]

return (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
    {/* ── Left ── */}
    <div className="xl:col-span-2 flex flex-col gap-6">

    {/* A. Sticker Details */}
    <SectionCard title="Sticker Details" icon={<FiTag />}>
        <div className="flex flex-col gap-5">
        <Field label="Sticker Type">
            <select value={stickerType} onChange={(e) => setStickerType(e.target.value)} className={selectCls}>
            {["Matte Sticker", "Glossy Sticker", "Transparent Sticker", "Holographic Sticker"].map((t) => (
                <option key={t}>{t}</option>
            ))}
            </select>
        </Field>

        <Field label="Size Unit">
            <ToggleGroup options={["cm", "inches"]} value={sizeUnit} onChange={setSizeUnit} />
        </Field>

        <Field label="Preset Sizes" hint="Select a preset or choose Custom to enter your own">
            <div className="flex gap-2 flex-wrap">
            {PRESETS.map((p) => (
                <button
                key={p.label}
                type="button"
                onClick={() => handlePreset(p)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition ${
                    preset === p.label
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white text-gray-600 border-gray-200 hover:border-red-300"
                }`}
                >
                {p.label}
                </button>
            ))}
            </div>
        </Field>

        <div className="grid grid-cols-2 gap-4">
            <Field label={`Width (${sizeUnit})`} hint={preset !== "Custom" ? "Click 'Custom' to edit" : undefined}>
            <input
                type="number" min="0.1" step="0.1" value={width}
                disabled={preset !== "Custom"}
                onChange={(e) => setWidth(e.target.value)}
                className={inputCls + (preset !== "Custom" ? " opacity-60 cursor-not-allowed" : "")}
                placeholder="e.g. 3"
            />
            </Field>
            <Field label={`Height (${sizeUnit})`} hint={preset !== "Custom" ? "Click 'Custom' to edit" : undefined}>
            <input
                type="number" min="0.1" step="0.1" value={height}
                disabled={preset !== "Custom"}
                onChange={(e) => setHeight(e.target.value)}
                className={inputCls + (preset !== "Custom" ? " opacity-60 cursor-not-allowed" : "")}
                placeholder="e.g. 3"
            />
            </Field>
        </div>

        <Field label="Quantity" hint="Minimum order: 1 piece">
            <input
            type="number" min="1" value={qty}
            onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
            className={inputCls}
            />
        </Field>
        </div>
    </SectionCard>

    {/* B. Shape & Cutting */}
    <SectionCard title="Shape & Cutting" icon={<FiScissors />}>
        <div className="flex flex-col gap-5">
        <Field label="Shape">
            <ToggleGroup
            options={["Square", "Circle", "Rectangle", "Custom Die-Cut"]}
            value={shape}
            onChange={setShape}
            />
        </Field>
        <Field label="Cutting Type">
            <ToggleGroup
            options={[
                { label: "Kiss Cut",  value: "Kiss Cut"  },
                { label: "Die Cut",   value: "Die Cut"   },
                { label: "Sheet Cut", value: "Sheet Cut" },
            ]}
            value={cuttingType}
            onChange={setCuttingType}
            />
        </Field>
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs text-gray-500 leading-relaxed">
            <strong className="text-gray-700">Kiss Cut</strong> — cuts through vinyl only, backing stays intact. &nbsp;
            <strong className="text-gray-700">Die Cut</strong> — cuts through entire sticker, no backing. &nbsp;
            <strong className="text-gray-700">Sheet Cut</strong> — delivered as a full sheet.
        </div>
        </div>
    </SectionCard>

    {/* C. Design Upload */}
    <SectionCard title="Design & Files" icon={<FiImage />}>
        <div className="flex flex-col gap-5">
        <Field label="Upload Design File" hint="PNG, JPG, PDF, AI accepted — max 50 MB">
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
                    <p className="text-sm font-semibold text-gray-600">Click to upload your design</p>
                    <p className="text-xs text-gray-400">PNG, JPG, PDF, AI — max 50MB</p>
                </>
            }
            <input
                ref={fileRef} type="file" accept=".png,.jpg,.jpeg,.pdf,.ai"
                className="hidden"
                onChange={(e) => setFile(e.target.files || null)}
            />
            </div>
        </Field>

        <label className="flex items-start gap-3 cursor-pointer group">
            <input
            type="checkbox" checked={needsDesign}
            onChange={(e) => setNeedsDesign(e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-red-500 cursor-pointer"
            />
            <div>
            <p className="text-sm font-semibold text-gray-700 group-hover:text-red-500 transition">
                I need help with the design
            </p>
            <p className="text-xs text-gray-400 mt-0.5">Our team will contact you to discuss your layout and artwork.</p>
            </div>
        </label>

        {needsDesign && (
            <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-100 rounded-xl p-4 text-sm text-yellow-700">
            <FiInfo className="shrink-0 mt-0.5" />
            <p>Our design team will reach out to discuss your requirements before production.</p>
            </div>
        )}

        <Field label="Special Instructions" hint="Bleed area, Pantone colors, layout notes, etc.">
            <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={3}
            placeholder="e.g. Keep 3mm bleed, Pantone 485 red, logo centered..."
            className={inputCls + " resize-none"}
            />
        </Field>
        </div>
    </SectionCard>

    {/* D. Finish Options */}
    <SectionCard title="Finish Options" icon={<FiLayers />}>
        <div className="flex flex-col gap-5">
        <Field label="Lamination">
            <ToggleGroup
            options={[
                { label: "None",            value: "None"             },
                { label: "Matte (+₱2/pc)",  value: "Matte Lamination"  },
                { label: "Glossy (+₱2/pc)", value: "Glossy Lamination" },
            ]}
            value={lamination}
            onChange={setLamination}
            />
        </Field>
        <div className="grid grid-cols-2 gap-4">
            <Field label="Waterproof (+₱1/pc)">
            <ToggleGroup options={["Yes", "No"]} value={waterproof} onChange={setWaterproof} />
            </Field>
            <Field label="UV Resistant (+₱1/pc)">
            <ToggleGroup options={["Yes", "No"]} value={uvResistant} onChange={setUvResistant} />
            </Field>
        </div>
        </div>
    </SectionCard>

    {/* E. Sheet Layout */}
    <SectionCard title="Sheet Layout" icon={<FiGrid />}>
        <div className="flex flex-col gap-5">
        <label className="flex items-start gap-3 cursor-pointer group">
            <input
            type="checkbox" checked={autoLayout}
            onChange={(e) => setAutoLayout(e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-red-500 cursor-pointer"
            />
            <div>
            <p className="text-sm font-semibold text-gray-700 group-hover:text-red-500 transition">
                Auto-calculate layout (recommended)
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
                Our team optimizes sheet usage based on your size and quantity.
            </p>
            </div>
        </label>

        {!autoLayout && (
            <Field label="Stickers per Sheet" hint="How many stickers fit on one sheet">
            <input
                type="number" min="1" value={stickersPerSheet}
                onChange={(e) => setStickersPerSheet(Math.max(1, parseInt(e.target.value) || 1))}
                className={inputCls}
            />
            </Field>
        )}

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
            <span className="font-bold">Estimated sheets: </span>
            {autoLayout ? "Auto (calculated at production)" : estimatedSheets}
        </div>
        </div>
    </SectionCard>

    {/* F. Delivery */}
    <SectionCard title="Delivery Info" icon={<FiTruck />}>
        <DeliverySection
        delivery={delivery} setDelivery={setDelivery}
        address={address}   setAddress={setAddress}
        />
    </SectionCard>
    </div>

    {/* ── Right: Summary ── */}
    <div className="xl:col-span-1">
    <div className="sticky top-36 flex flex-col gap-4">
        <SummaryCard rows={summaryRows} total={totalPrice} onSubmit={handleSubmit} />
        <HelpCard />
    </div>
    </div>
</div>
)
}