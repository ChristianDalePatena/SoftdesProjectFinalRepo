import { useState, useRef } from "react"
import {
  FiMaximize, FiLayers, FiImage, FiTool, FiGrid, FiTruck,
  FiUploadCloud, FiCheckCircle, FiInfo
} from "react-icons/fi";

import {
  SectionCard, Field, DeliverySection,
  SummaryCard, HelpCard, inputCls, selectCls,
} from "../../shared"

const PRESETS = [
  { label: "2×3 ft", w: 2, h: 3 },
  { label: "3×5 ft", w: 3, h: 5 },
  { label: "4×6 ft", w: 4, h: 6 },
  { label: "5×8 ft", w: 5, h: 8 },
  { label: "Custom", w: "", h: "" },
]

export default function TarpaulinOrderForm() {

  // Size
  const [preset, setPreset] = useState("2×3 ft")
  const [width, setWidth] = useState(2)
  const [height, setHeight] = useState(3)
  const [qty, setQty] = useState(1)

  // Material
  const [material, setMaterial] = useState("Standard Tarpaulin")
  const [thickness, setThickness] = useState("13oz")

  // Design upload (FIXED)
  const [file, setFile] = useState(null)
  const fileRef = useRef(null)

  const [needDesign, setNeedDesign] = useState(false)
  const [instructions, setInstructions] = useState("")

  // Delivery (FIXED IMPLEMENTATION)
  const [delivery, setDelivery] = useState("Pickup")
  const [address, setAddress] = useState("")

  // Accessories
  const [eyelets, setEyelets] = useState(false)
  const [rope, setRope] = useState(false)
  const [stand, setStand] = useState(false)

  const safeW = parseFloat(width) || 0
  const safeH = parseFloat(height) || 0
  const area = safeW * safeH

  const applyPreset = (p) => {
    setPreset(p.label)
    if (p.label !== "Custom") {
      setWidth(p.w)
      setHeight(p.h)
    }
  }

  // Pricing
  const BASE_RATE = 35

  const eyeletCost = eyelets ? 20 : 0
  const ropeCost = rope ? 30 : 0
  const standCost = stand ? 150 : 0

  const printCost = area * BASE_RATE * qty
  const addOnCost = eyeletCost + ropeCost + standCost
  const totalPrice = printCost + addOnCost

  // VALIDATION (UPDATED)
  const validate = () => {
    if (safeW <= 0 || safeH <= 0) {
      alert("Please enter valid dimensions.")
      return false
    }
    if (qty <= 0) {
      alert("Please enter valid quantity.")
      return false
    }
    if (delivery === "Delivery" && !address.trim()) {
      alert("Please enter a delivery address.")
      return false
    }
    return true
  }

  // SUBMIT
  const handleSubmit = () => {
    if (!validate()) return

    alert(
      `ORDER SUBMITTED\n\n` +
      `Size: ${safeW}×${safeH} ft\n` +
      `Area: ${area} sq ft\n` +
      `Qty: ${qty}\n` +
      `Delivery: ${delivery}\n` +
      `Total: ₱${totalPrice.toLocaleString()}`
    )
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

      {/* LEFT */}
      <div className="xl:col-span-2 flex flex-col gap-6">

        {/* SIZE */}
        <SectionCard title="Tarpaulin Details" icon={<FiMaximize />}>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => applyPreset(p)}
                className={`px-4 py-2 rounded-xl border text-sm font-semibold ${
                  preset === p.label
                    ? "bg-red-500 text-white"
                    : "bg-white"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </SectionCard>

        {/* FILE UPLOAD (FIXED + CLEAN) */}
        <SectionCard title="Design Upload" icon={<FiImage />}>
          <Field label="Upload File">
            <div
              onClick={() => fileRef.current.click()}
              className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-red-400"
            >
              <div className="flex flex-col items-center gap-2">
                {file ? (
                  <>
                    <FiCheckCircle className="text-green-500 text-2xl" />
                    <p className="text-sm font-semibold">{file.name}</p>
                  </>
                ) : (
                  <>
                    <FiUploadCloud className="text-gray-400 text-2xl" />
                    <p className="text-sm font-semibold">Click to upload design</p>
                    <p className="text-xs text-gray-400">PNG, JPG, PDF</p>
                  </>
                )}
              </div>
            </div>

            <input
              ref={fileRef}
              type="file"
              accept="image/*,.pdf,.ai,.eps"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </Field>
        </SectionCard>

        {/* DELIVERY (FULLY INTEGRATED) */}
        <SectionCard title="Delivery Info" icon={<FiTruck />}>
          <DeliverySection
            delivery={delivery}
            setDelivery={setDelivery}
            address={address}
            setAddress={setAddress}
          />

          {delivery === "Pickup" && (
            <div className="mt-4 bg-blue-50 border border-blue-100 p-3 rounded-xl text-sm text-blue-700">
              Pickup available at store after production.
            </div>
          )}
        </SectionCard>

      </div>

      {/* RIGHT */}
      <div className="xl:col-span-1">
        <SummaryCard
          rows={[
            { label: "Size", value: `${safeW}×${safeH} ft` },
            { label: "Quantity", value: qty },
            { label: "Area", value: `${area} sq ft` },
            { label: "Delivery", value: delivery },
          ]}
          total={totalPrice}
          onSubmit={handleSubmit}
        />

        <HelpCard />
      </div>

    </div>
  )
}