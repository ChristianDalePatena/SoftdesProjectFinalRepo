import { FiHome, FiPackage, FiTruck } from "react-icons/fi";
// ── Shared UI primitives for all product order forms ─────────────────────────

export const inputCls =
"w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none transition bg-white"

export const selectCls = inputCls + " cursor-pointer"

export function SectionCard({ title, icon, children }) {
return (
<div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50">
    <span className="text-lg">{icon}</span>
    <h3 className="font-bold text-gray-800 tracking-tight text-sm uppercase">{title}</h3>
    </div>
    <div className="p-6">{children}</div>
</div>
)
}

export function Field({ label, hint, children }) {
return (
<div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{label}</label>
    {hint && <p className="text-xs text-gray-400 -mt-1">{hint}</p>}
    {children}
</div>
)
}

export function Row({ label, value, bold }) {
return (
<div className="flex items-center justify-between gap-2">
    <span className="text-xs text-gray-500">{label}</span>
    <span
    className={`text-xs ${bold ? "font-bold text-gray-900" : "text-gray-700"} text-right max-w-[55%] wrap-break-words`}
    >
    {value}
    </span>
</div>
)
}

export function ToggleGroup({ options, value, onChange }) {
return (
<div className="flex gap-2 flex-wrap">
    {options.map((opt) => {
    const label = typeof opt === "string" ? opt : opt.label
    const val   = typeof opt === "string" ? opt : opt.value
    return (
        <button
        key={val}
        type="button"
        onClick={() => onChange(val)}
        className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition ${
            value === val
            ? "bg-red-500 text-white border-red-500"
            : "bg-white text-gray-600 border-gray-200 hover:border-red-300"
        }`}
        >
        {label}
        </button>
    )
    })}
</div>
)
}

export function DeliverySection({ delivery, setDelivery, address, setAddress, inputCls: cls }) {
return (
<div className="flex flex-col gap-4">
    <Field label="Delivery Method">
    <div className="flex gap-3">
        {["Pickup", "Delivery"].map((d) => (
        <button
            key={d}
            type="button"
            onClick={() => setDelivery(d)}
            className={`flex-1 py-3 rounded-xl text-sm font-bold border transition ${
            delivery === d
                ? "bg-red-500 text-white border-red-500"
                : "bg-white text-gray-600 border-gray-200 hover:border-red-300"
            }`}
        >
            <span className="flex items-center justify-center gap-2">
            {d === "Pickup" ? <FiPackage /> : <FiTruck />}
            {d}
            </span>
        </button>
        ))}
    </div>
    </Field>
    {delivery === "Delivery" && (
    <Field label="Delivery Address">
        <textarea
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        rows={2}
        placeholder="Enter your full delivery address..."
        className={(cls || inputCls) + " resize-none"}
        />
    </Field>
    )}
    {delivery === "Pickup" && (
    <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
        <span className="mt-0.5">📍</span>
        <p>
        You selected <strong>Pickup</strong>. We'll contact you when your order is ready at our store.
        </p>
    </div>
    )}
</div>
)
}

export function HelpCard() {
return (
<div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">💬</span>
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-600">Need Help?</h3>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed mb-3">
            Need help with design templates or bulk orders? We're happy to help you spec the perfect magnet.
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
)
}

export function SummaryCard({ title = "Order Summary", rows = [], total, onSubmit }) {
return (
<div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <div className="px-6 py-4 bg-red-500">
    <h3 className="font-black text-white tracking-tight text-base uppercase">{title}</h3>
    </div>
    <div className="p-6 flex flex-col gap-4">
    <div className="flex flex-col gap-2 pb-4 border-b border-gray-100">
        {rows.map(({ label, value, bold }) => (
        <Row key={label} label={label} value={value} bold={bold} />
        ))}
    </div>
    <div className="flex items-center justify-between">
        <span className="text-sm font-black text-gray-800 uppercase tracking-tight">Est. Total</span>
        <span className="text-xl font-black text-red-500">₱{total.toLocaleString()}</span>
    </div>
    <p className="text-xs text-gray-400 bg-gray-50 rounded-xl p-3 leading-relaxed">
        * Final price may vary based on design complexity and rush fees. Our team will confirm before production.
    </p>
    <button
        onClick={onSubmit}
        className="w-full mt-2 py-4 bg-red-500 hover:bg-red-600 active:scale-95 text-white font-black rounded-xl text-sm uppercase tracking-widest transition-all shadow-lg shadow-red-200"
    >
        Submit Order →
    </button>
    </div>
</div>
)
}