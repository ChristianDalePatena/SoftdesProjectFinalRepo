import { useState, useRef } from "react"
import { 
  FiMinimize, FiImage, FiSettings, FiTruck, 
  FiUploadCloud, FiCheckCircle 
} from "react-icons/fi";
import { TbShirt } from "react-icons/tb"; // Using Tabler icons for a specific shirt icon

import {
SectionCard, Field, ToggleGroup, DeliverySection,
SummaryCard, HelpCard, inputCls, selectCls,
} from "../../shared"

export default function TShirtOrderForm() {
// A. Details
const [type, setType]       = useState("Round Neck")
const [color, setColor]     = useState("")
const [baseQty, setBaseQty] = useState(1)

// B. Sizes
const [sizes, setSizes] = useState({ XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 })

// C. Design
const [file, setFile]           = useState(null)
const [placement, setPlacement] = useState("Front")
const [printSize, setPrintSize] = useState("Medium")
const fileRef = useRef()

// D. Additional
const [method, setMethod]             = useState("Screen Print")
const [instructions, setInstructions] = useState("")

// E. Delivery
const [delivery, setDelivery] = useState("Pickup")
const [address, setAddress]   = useState("")

// Computed
const sizeTotal   = Object.values(sizes).reduce((a, b) => a + b, 0)
const totalQty    = sizeTotal > 0 ? sizeTotal : baseQty
const pricePerUnit = method === "DTG" ? 220 : method === "Heat Press" ? 180 : 150
const totalPrice  = totalQty * pricePerUnit

const handleSizeChange = (sz, val) =>
setSizes((prev) => ({ ...prev, [sz]: Math.max(0, parseInt(val) || 0) }))

const handleSubmit = () =>
alert(`✅ Order submitted!\n\nT-Shirt (${type})\nColor: ${color || "—"}\nQty: ${totalQty}\nTotal: ₱${totalPrice.toLocaleString()}`)

const summaryRows = [
{ label: "Product",    value: `T-Shirt (${type})` },
{ label: "Color",      value: color || "—" },
{ label: "Placement",  value: placement },
{ label: "Print Size", value: printSize },
{ label: "Method",     value: method },
...(sizeTotal > 0
    ? Object.entries(sizes).filter(([, v]) => v > 0).map(([sz, qty]) => ({ label: sz, value: `${qty} pcs` }))
    : []),
{ label: "Qty",        value: `${totalQty} pcs`, bold: true },
{ label: "Price / pc", value: `₱${pricePerUnit}` },
]

return (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
    {/* ── Left ── */}
    <div className="xl:col-span-2 flex flex-col gap-6">

    <SectionCard title="T-Shirt Details" icon={<TbShirt />}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Field label="Shirt Type">
            <select value={type} onChange={(e) => setType(e.target.value)} className={selectCls}>
            {["Round Neck", "V-Neck", "Polo", "Oversized"].map((t) => <option key={t}>{t}</option>)}
            </select>
        </Field>
        <Field label="Color" hint="e.g. White, Black, Navy">
            <input type="text" value={color} onChange={(e) => setColor(e.target.value)} placeholder="White" className={inputCls} />
        </Field>
        <Field label="Base Quantity" hint="Override with sizes below">
            <input
            type="number" min={1} value={baseQty}
            onChange={(e) => setBaseQty(Math.max(1, parseInt(e.target.value) || 1))}
            className={inputCls}
            />
        </Field>
        </div>
    </SectionCard>

    <SectionCard title="Size Breakdown" icon={<FiMinimize />}>
        <p className="text-xs text-gray-400 mb-4">Fill in quantities per size (leave at 0 to use base quantity above)</p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {Object.keys(sizes).map((sz) => (
            <div key={sz} className="flex flex-col items-center gap-2">
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">{sz}</span>
            <input
                type="number" min={0} value={sizes[sz]}
                onChange={(e) => handleSizeChange(sz, e.target.value)}
                className="w-full text-center px-2 py-2.5 text-sm border border-gray-200 rounded-xl focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none transition"
            />
            </div>
        ))}
        </div>
        {sizeTotal > 0 && (
        <div className="mt-4 flex items-center gap-2 text-sm text-green-700 bg-green-50 rounded-xl px-4 py-2.5 border border-green-100">
            <FiCheckCircle className="shrink-0" />
            <span>Size total: <strong>{sizeTotal} pcs</strong></span>
        </div>
        )}
    </SectionCard>

    <SectionCard title="Design Upload" icon={<FiImage />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Upload Design File" hint="PNG, JPG, PDF accepted">
            <div
            onClick={() => fileRef.current.click()}
            className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl p-5 cursor-pointer hover:border-red-300 hover:bg-red-50 transition group"
            >
            <span className={`text-2xl transition-transform ${file ? "text-green-500 group-hover:scale-110" : "text-gray-400 group-hover:text-red-400 group-hover:scale-110"}`}>
                {file ? <FiCheckCircle /> : <FiUploadCloud />}
            </span>
            {file
                ? <p className="text-xs text-center text-green-700 font-semibold break-all">{file.name}</p>
                : <p className="text-xs text-gray-400 text-center font-semibold">Click to browse file</p>}
            <input ref={fileRef} type="file" accept="image/*,.pdf" className="hidden"
                onChange={(e) => setFile(e.target.files || null)} />
            </div>
        </Field>
        <div className="flex flex-col gap-5">
            <Field label="Print Placement">
            <ToggleGroup options={["Front", "Back", "Both"]} value={placement} onChange={setPlacement} />
            </Field>
            <Field label="Print Size">
            <ToggleGroup options={["Small", "Medium", "Large"]} value={printSize} onChange={setPrintSize} />
            </Field>
        </div>
        </div>
    </SectionCard>

    <SectionCard title="Printing Method" icon={<FiSettings />}>
        <div className="flex flex-col gap-5">
        <Field label="Method">
            <div className="grid grid-cols-3 gap-3">
            {[
                { label: "Screen Print", price: "₱150/pc", desc: "Best for bulk" },
                { label: "Heat Press",   price: "₱180/pc", desc: "Vibrant colors" },
                { label: "DTG",          price: "₱220/pc", desc: "Full-color photos" },
            ].map(({ label, price, desc }) => (
                <button key={label} type="button" onClick={() => setMethod(label)}
                className={`flex flex-col items-start gap-1 p-3.5 rounded-xl border text-left transition ${
                    method === label
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white text-gray-700 border-gray-200 hover:border-red-300"
                }`}
                >
                <span className="text-xs font-bold">{label}</span>
                <span className={`text-xs font-semibold ${method === label ? "text-red-100" : "text-red-500"}`}>{price}</span>
                <span className={`text-xs ${method === label ? "text-red-100" : "text-gray-400"}`}>{desc}</span>
                </button>
            ))}
            </div>
        </Field>
        <Field label="Special Instructions" hint="Specific details about your design or shirt">
            <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)}
            rows={3} placeholder="e.g. Please print logo centered, 8 inches wide..."
            className={inputCls + " resize-none"} />
        </Field>
        </div>
    </SectionCard>

    <SectionCard title="Delivery Info" icon={<FiTruck />}>
        <DeliverySection delivery={delivery} setDelivery={setDelivery} address={address} setAddress={setAddress} />
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