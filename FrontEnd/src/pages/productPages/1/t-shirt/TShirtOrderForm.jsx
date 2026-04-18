import { useState, useRef } from "react"
import { 
  FiMinimize, FiImage, FiTruck, 
  FiUploadCloud, FiCheckCircle 
} from "react-icons/fi";
import { TbShirt } from "react-icons/tb";

import {
SectionCard, Field, ToggleGroup, DeliverySection,
SummaryCard, inputCls, selectCls,
} from "../../shared"

export default function TShirtOrderForm() {

  // A. Details
  const [type, setType]       = useState("T-Shirt")
  const [color, setColor]     = useState("")
  const [baseQty, setBaseQty] = useState(1)

  // B. Sizes
  const [sizes, setSizes] = useState({ XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 })

  // C. Design
  const [file, setFile]           = useState(null)
  const [placement, setPlacement] = useState("Front")
  const [printSize, setPrintSize] = useState("A4")
  const fileRef = useRef()

  // D. Additional
  const [instructions, setInstructions] = useState("")

  // E. Delivery
  const [delivery, setDelivery] = useState("Pickup")
  const [address, setAddress]   = useState("")

  // Computed
  const sizeTotal   = Object.values(sizes).reduce((a, b) => a + b, 0)
  const totalQty    = sizeTotal > 0 ? sizeTotal : baseQty

  // ✅ PRICING LOGIC (FINAL)
  let pricePerUnit = 0

  if (type === "T-Shirt" || type === "Drifit") {
    pricePerUnit = printSize === "A3" ? 450 : 300
  } 
  else if (type === "Polo Shirt") {
    pricePerUnit = placement === "Both" ? 500 : 300
  }
  else if (type === "Print Only") {
    pricePerUnit = printSize === "A3" ? 300 : 150
  }

  const totalPrice  = totalQty * pricePerUnit

  const handleSizeChange = (sz, val) =>
    setSizes((prev) => ({ ...prev, [sz]: Math.max(0, parseInt(val) || 0) }))

  const handleSubmit = () =>
    alert(`✅ Order submitted!\n\n${type}\nColor: ${color || "—"}\nQty: ${totalQty}\nTotal: ₱${totalPrice.toLocaleString()}`)

  const summaryRows = [
    { label: "Product", value: type },
    ...(type !== "Print Only" ? [{ label: "Color", value: color || "—" }] : []),
    { label: "Placement", value: placement },
    ...(type !== "Polo Shirt"
      ? [{ label: "Print Size", value: printSize }]
      : []),
    ...(sizeTotal > 0
      ? Object.entries(sizes)
          .filter(([, v]) => v > 0)
          .map(([sz, qty]) => ({ label: sz, value: `${qty} pcs` }))
      : []),
    { label: "Qty", value: `${totalQty} pcs`, bold: true },
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
                {["T-Shirt", "Drifit", "Polo Shirt", "Print Only"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>

            {type !== "Print Only" && (
              <Field label="Color">
                <input 
                  type="text" 
                  value={color} 
                  onChange={(e) => setColor(e.target.value)} 
                  placeholder="White" 
                  className={inputCls} 
                />
              </Field>
            )}

            <Field label="Base Quantity">
              <input
                type="number"
                min={1}
                value={baseQty}
                onChange={(e) => setBaseQty(Math.max(1, parseInt(e.target.value) || 1))}
                className={inputCls}
              />
            </Field>

          </div>
        </SectionCard>

        <SectionCard title="Size Breakdown" icon={<FiMinimize />}>
          <p className="text-xs text-gray-400 mb-4">
            Fill in quantities per size (leave at 0 to use base quantity above)
          </p>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {Object.keys(sizes).map((sz) => (
              <div key={sz} className="flex flex-col items-center gap-2">
                <span className="text-xs font-bold text-gray-600 uppercase">{sz}</span>
                <input
                  type="number"
                  min={0}
                  value={sizes[sz]}
                  onChange={(e) => handleSizeChange(sz, e.target.value)}
                  className="w-full text-center px-2 py-2.5 text-sm border border-gray-200 rounded-xl focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none transition"
                />
              </div>
            ))}
          </div>

          {sizeTotal > 0 && (
            <div className="mt-4 flex items-center gap-2 text-sm text-green-700 bg-green-50 rounded-xl px-4 py-2.5 border border-green-100">
              <FiCheckCircle />
              <span>Size total: <strong>{sizeTotal} pcs</strong></span>
            </div>
          )}
        </SectionCard>

        <SectionCard title="Design Upload" icon={<FiImage />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <Field label="Upload Design File">
              <div
                onClick={() => fileRef.current.click()}
                className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl p-5 cursor-pointer hover:border-red-300 hover:bg-red-50 transition group"
              >
                <span className={`text-2xl ${file ? "text-green-500" : "text-gray-400"}`}>
                  {file ? <FiCheckCircle /> : <FiUploadCloud />}
                </span>

                {file
                  ? <p className="text-xs text-green-700 font-semibold break-all">{file.name}</p>
                  : <p className="text-xs text-gray-400 font-semibold">Click to browse file</p>
                }

                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files || null)}
                />
              </div>
            </Field>

            <div className="flex flex-col gap-5">

              <Field label="Print Placement">
                <ToggleGroup
                  options={["Front", "Back", "Both"]}
                  value={placement}
                  onChange={setPlacement}
                />
              </Field>

              <Field label="Print Size">
                <ToggleGroup
                  options={["A4", "A3"]}
                  value={printSize}
                  onChange={setPrintSize}
                />
              </Field>

            </div>

          </div>
        </SectionCard>

        <SectionCard title="Special Instructions">
          <Field>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              rows={3}
              placeholder="e.g. Please center logo..."
              className={inputCls + " resize-none"}
            />
          </Field>
        </SectionCard>

        <SectionCard title="Delivery Info" icon={<FiTruck />}>
          <DeliverySection
            delivery={delivery}
            setDelivery={setDelivery}
            address={address}
            setAddress={setAddress}
          />
        </SectionCard>

      </div>

      {/* ── Right ── */}
      <div className="xl:col-span-1">
        <div className="sticky top-24 flex flex-col gap-4 max-h-[calc(100vh-6rem)] overflow-y-auto pr-1">

          <SummaryCard rows={summaryRows} total={totalPrice} onSubmit={handleSubmit} />

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">💬</span>
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-600">
                Need Help?
              </h3>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed mb-3">
              Not sure about the materials or artwork setup? We're happy to help you spec the perfect order.
            </p>

            <div className="flex flex-col gap-2">
              <a href="tel:+639474631561" className="text-xs font-semibold text-red-500 hover:text-red-600">
                📞 0947-463-1561
              </a>

              <a href="https://m.me/p2printing" target="_blank" rel="noreferrer"
                className="text-xs font-semibold text-red-500 hover:text-red-600">
                💬 Chat on Messenger
              </a>

              <a href="mailto:picktwoprint@gmail.com"
                className="text-xs font-semibold text-red-500 hover:text-red-600">
                ✉️ picktwoprint@gmail.com
              </a>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}