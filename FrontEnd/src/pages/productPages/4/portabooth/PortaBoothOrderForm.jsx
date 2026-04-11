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

function ToggleBtn({ active, onClick, children, disabled }) {
return (
<button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-bold border transition-all ${
    disabled
        ? "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed"
        : active
        ? "bg-red-500 text-white border-red-500 shadow-sm shadow-red-200"
        : "bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:text-red-500"
    }`}
>
    {children}
</button>
)
}

function OptionCard({ active, onClick, icon, label, sublabel, badge, disabled }) {
return (
<button
    type="button"
    onClick={() => !disabled && onClick()}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left w-full transition-all ${
    disabled
        ? "border-gray-100 bg-gray-50 opacity-40 cursor-not-allowed"
        : active
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
    <span className="text-xl shrink-0">{icon}</span>
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

function YesNoToggle({ label, sublabel, icon, value, onChange }) {
return (
<div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50">
    <span className="text-xl shrink-0">{icon}</span>
    <div className="flex-1 min-w-0">
    <p className="text-sm font-bold text-gray-700">{label}</p>
    {sublabel && <p className="text-[11px] text-gray-400 mt-0.5">{sublabel}</p>}
    </div>
    <div className="flex gap-2 shrink-0">
    <button
        type="button"
        onClick={() => onChange(true)}
        className={`px-4 py-1.5 rounded-lg text-xs font-black border transition-all ${
        value === true
            ? "bg-red-500 text-white border-red-500"
            : "bg-white text-gray-500 border-gray-200 hover:border-red-300"
        }`}
    >
        Yes
    </button>
    <button
        type="button"
        onClick={() => onChange(false)}
        className={`px-4 py-1.5 rounded-lg text-xs font-black border transition-all ${
        value === false
            ? "bg-gray-700 text-white border-gray-700"
            : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
        }`}
    >
        No
    </button>
    </div>
</div>
)
}

// ── Booth SVG Preview ──────────────────────────────────────────────────────────
function BoothPreview({ boothType, backdropStyle, boothTheme, duration }) {
const themeColors = {
Elegant:          { bg: "#fdf4ff", accent: "#a855f7", secondary: "#e9d5ff" },
"Fun & Colorful": { bg: "#fef9c3", accent: "#f59e0b", secondary: "#fde68a" },
Minimalist:       { bg: "#f8fafc", accent: "#64748b", secondary: "#e2e8f0" },
"Custom theme":   { bg: "#fff1f2", accent: "#ef4444", secondary: "#fecaca" },
}
const tc = themeColors[boothTheme] || themeColors["Minimalist"]

return (
<div className="flex flex-col items-center gap-2">
    <svg width={130} height={165} viewBox="0 0 130 165" xmlns="http://www.w3.org/2000/svg">

    {/* Ground shadow */}
    <ellipse cx={65} cy={152} rx={52} ry={6} fill="#e5e7eb" />

    {boothType === "Enclosed Booth" && (
        <>
        {/* Body */}
        <rect x={18} y={52} width={94} height={96} rx={6} fill={tc.bg} stroke={tc.accent} strokeWidth={2} />
        {/* Door */}
        <rect x={48} y={105} width={34} height={43} rx={4} fill={tc.secondary} stroke={tc.accent} strokeWidth={1.5} />
        <circle cx={76} cy={127} r={2} fill={tc.accent} />
        {/* Windows */}
        <rect x={26} y={66} width={26} height={22} rx={3} fill={tc.secondary} stroke={tc.accent} strokeWidth={1.5} />
        <rect x={78} y={66} width={26} height={22} rx={3} fill={tc.secondary} stroke={tc.accent} strokeWidth={1.5} />
        {/* Roof */}
        <polygon points="12,52 65,18 118,52" fill={tc.accent} opacity={0.85} />
        {/* Roof ridge */}
        <line x1={65} y1={18} x2={65} y2={52} stroke="white" strokeWidth={1.5} opacity={0.4} />
        </>
    )}

    {boothType === "360 Video Booth" && (
        <>
        {/* Platform */}
        <ellipse cx={65} cy={148} rx={50} ry={9} fill={tc.secondary} stroke={tc.accent} strokeWidth={1.5} />
        {/* Center pole */}
        <rect x={62} y={60} width={6} height={88} rx={3} fill={tc.accent} opacity={0.7} />
        {/* Horizontal arm */}
        <rect x={28} y={56} width={74} height={7} rx={3.5} fill={tc.accent} />
        {/* Camera housing */}
        <rect x={14} y={46} width={24} height={17} rx={4} fill="#1f2937" />
        <circle cx={26} cy={54} r={5.5} fill="#111827" />
        <circle cx={26} cy={54} r={3} fill="#374151" />
        <circle cx={24} cy={52} r={1} fill="#9ca3af" opacity={0.7} />
        {/* Person silhouette */}
        <circle cx={65} cy={96} r={9} fill={tc.secondary} stroke={tc.accent} strokeWidth={1.5} />
        <rect x={55} y={107} width={20} height={30} rx={6} fill={tc.secondary} stroke={tc.accent} strokeWidth={1.5} />
        {/* 360 badge */}
        <rect x={46} y={26} width={38} height={16} rx={8} fill={tc.accent} />
        <text x={65} y={37} textAnchor="middle" fontSize={8} fontWeight="bold" fill="white">360° VIDEO</text>
        </>
    )}

    {boothType === "Open-Air Booth" && (
        <>
        {/* Backdrop panel */}
        <rect x={18} y={38} width={94} height={106} rx={4} fill={tc.bg} stroke={tc.accent} strokeWidth={2} />
        {/* Left stand */}
        <rect x={20} y={144} width={6} height={14} rx={2} fill={tc.accent} opacity={0.65} />
        {/* Right stand */}
        <rect x={104} y={144} width={6} height={14} rx={2} fill={tc.accent} opacity={0.65} />
        {/* Backdrop content */}
        {backdropStyle === "Plain Color" && (
            <rect x={22} y={42} width={86} height={98} rx={2} fill={tc.secondary} />
        )}
        {backdropStyle === "Themed Backdrop" && (
            <>
            <rect x={22} y={42} width={86} height={98} rx={2} fill={tc.secondary} />
            {[0,1,2,3,4,5,6,7,8].map(i => (
                <circle key={i}
                cx={36 + (i % 3) * 30}
                cy={58 + Math.floor(i / 3) * 30}
                r={9} fill={tc.accent} opacity={0.2} />
            ))}
            </>
        )}
        {backdropStyle === "Custom Backdrop" && (
            <>
            <rect x={22} y={42} width={86} height={98} rx={2} fill={tc.secondary} />
            <text x={65} y={90} textAnchor="middle" fontSize={8} fill={tc.accent} fontWeight="bold">CUSTOM</text>
            <text x={65} y={101} textAnchor="middle" fontSize={7} fill={tc.accent} opacity={0.6}>BACKDROP</text>
            </>
        )}
        {/* Camera on stand */}
        <rect x={53} y={23} width={24} height={16} rx={3} fill="#374151" />
        <circle cx={65} cy={31} r={5.5} fill="#1f2937" />
        <circle cx={65} cy={31} r={3} fill="#4b5563" />
        <rect x={63} y={10} width={4} height={14} rx={2} fill="#6b7280" />
        </>
    )}

    {/* Duration badge */}
    <rect x={84} y={10} width={38} height={15} rx={7.5} fill={tc.accent} opacity={0.9} />
    <text x={103} y={21} textAnchor="middle" fontSize={7.5} fontWeight="bold" fill="white">{duration}hrs</text>

    </svg>

    <p className="text-[9px] text-gray-400 italic">{boothType}</p>
    <p className="text-[9px] text-gray-500 font-semibold">{backdropStyle} · {boothTheme}</p>
</div>
)
}

// ── Pricing ────────────────────────────────────────────────────────────────────
function computePrice({ duration, boothType, backdropStyle, printCopies, props, redCarpet, ledLighting, additionalStaff }) {
const hours = Math.max(2, parseFloat(duration) || 2)
let total = 5000
if (hours > 2) total += (hours - 2) * 1500
if (boothType === "360 Video Booth")    total += 3000
if (printCopies === "Unlimited Prints") total += 1000
if (backdropStyle === "Custom Backdrop") total += 1500
if (props)           total += 500
if (redCarpet)       total += 700
if (ledLighting)     total += 800
if (additionalStaff) total += 1000
return total
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function PortaBoothOrderForm() {
// A. Event Details
const [eventType, setEventType]           = useState("Wedding")
const [otherEvent, setOtherEvent]         = useState("")
const [eventDate, setEventDate]           = useState("")
const [duration, setDuration]             = useState("2")
const [customDuration, setCustomDuration] = useState("")
const [estimatedGuests, setEstimatedGuests] = useState(50)

// B. Booth Setup
const [boothType, setBoothType]           = useState("Open-Air Booth")
const [backdropStyle, setBackdropStyle]   = useState("Plain Color")
const [backdropFile, setBackdropFile]     = useState(null)
const [boothTheme, setBoothTheme]         = useState("Elegant")
const [customTheme, setCustomTheme]       = useState("")
const backdropRef = useRef()

// C. Photo Print Options
const [printSize, setPrintSize]           = useState("4×6 Photo")
const [printCopies, setPrintCopies]       = useState("1 Copy")
const [layoutMode, setLayoutMode]         = useState("upload")
const [layoutFile, setLayoutFile]         = useState(null)
const [layoutEventName, setLayoutEventName] = useState("")
const [layoutDate, setLayoutDate]         = useState("")
const [layoutThemeColors, setLayoutThemeColors] = useState("")
const layoutRef = useRef()

// D. Personalization & Media
const [onSiteCustom, setOnSiteCustom]   = useState(true)
const [digitalCopies, setDigitalCopies] = useState(true)
const [onlineGallery, setOnlineGallery] = useState(false)
const [qrStation, setQrStation]         = useState(false)

// E. Add-ons
const [props, setProps]                   = useState(false)
const [redCarpet, setRedCarpet]           = useState(false)
const [ledLighting, setLedLighting]       = useState(false)
const [customFrame, setCustomFrame]       = useState(false)
const [additionalStaff, setAdditionalStaff] = useState(false)

// F. Location
const [locationType, setLocationType]   = useState("Indoor")
const [address, setAddress]             = useState("")
const [setupTime, setSetupTime]         = useState("1")

const [errors, setErrors] = useState({})

const effectiveDuration = duration === "Custom"
? (parseFloat(customDuration) || 2)
: parseFloat(duration)

const validate = () => {
const e = {}
if (eventType === "Others" && !otherEvent.trim())
    e.otherEvent = "Please specify the event type"
if (!eventDate)
    e.eventDate = "Please select an event date"
else {
    const today = new Date(); today.setHours(0, 0, 0, 0)
    if (new Date(eventDate) < today)
    e.eventDate = "Event date must be today or in the future"
}
if (duration === "Custom" && (!customDuration || parseFloat(customDuration) < 2))
    e.customDuration = "Minimum 2 hours required"
if (estimatedGuests < 1)
    e.guests = "Must have at least 1 guest"
if (layoutMode === "upload" && !layoutFile)
    e.layout = "Please upload a layout file"
if (layoutMode === "request" && !layoutEventName.trim())
    e.layoutEventName = "Please enter the event name"
if (!address.trim())
    e.address = "Please enter the event address"
setErrors(e)
return Object.keys(e).length === 0
}

const handleSubmit = () => {
if (!validate()) return
alert(`✅ Booking submitted!\n\nEvent: ${eventType === "Others" ? otherEvent : eventType}\nDate: ${eventDate}\nBooth: ${boothType}\nDuration: ${effectiveDuration} hour${effectiveDuration !== 1 ? "s" : ""}\nTotal: ₱${total.toLocaleString()}`)
}

const total = computePrice({
duration: effectiveDuration, boothType, backdropStyle, printCopies,
props, redCarpet, ledLighting, additionalStaff
})

const extraHrsCost = effectiveDuration > 2 ? (effectiveDuration - 2) * 1500 : 0

const activeAddOns = [
props           && "Props & Accessories (+₱500)",
redCarpet       && "Red Carpet (+₱700)",
ledLighting     && "LED Lighting (+₱800)",
customFrame     && "Custom Frame Overlay",
additionalStaff && "Additional Staff (+₱1,000)",
].filter(Boolean)

const EVENT_TYPES    = ["Wedding", "Birthday", "Corporate Event", "School Event", "Others"]
const DURATION_OPTS  = ["2", "3", "4", "Custom"]
const BOOTH_TYPES    = [
{ val: "Open-Air Booth",  icon: "🏕️", desc: "Classic open setup — great for large events",  badge: "Base" },
{ val: "Enclosed Booth",  icon: "🎪", desc: "Private cabin — intimate, fully covered",        badge: "Base" },
{ val: "360 Video Booth", icon: "🎡", desc: "Rotating 360° video platform — ultra modern",   badge: "+₱3,000" },
]
const BACKDROP_STYLES = [
{ val: "Plain Color",     icon: "🎨", desc: "Solid-color vinyl — clean and modern" },
{ val: "Themed Backdrop", icon: "🖼️", desc: "Pre-made themed prints — elegant patterns" },
{ val: "Custom Backdrop", icon: "🖌️", desc: "Your custom design or reference image",        badge: "+₱1,500" },
]
const BOOTH_THEMES   = ["Elegant", "Fun & Colorful", "Minimalist", "Custom theme"]
const PRINT_SIZES    = ["2×6 Strip", "4×6 Photo", "Both"]
const PRINT_COPIES   = [
{ val: "1 Copy",           icon: "📄", desc: "One print per shot — standard" },
{ val: "2 Copies",         icon: "📋", desc: "Two prints per shot — share with guests" },
{ val: "Unlimited Prints", icon: "♾️", desc: "Print as many as you like per session",      badge: "+₱1,000" },
]

const summaryRows = [
{ label: "Event Type",    value: eventType === "Others" ? (otherEvent || "Others") : eventType },
{ label: "Event Date",    value: eventDate || "—" },
{ label: "Duration",      value: `${effectiveDuration} hr${effectiveDuration !== 1 ? "s" : ""}` },
{ label: "Guests (Est.)", value: estimatedGuests.toLocaleString() },
{ label: "Booth Type",    value: boothType },
{ label: "Backdrop",      value: backdropStyle },
{ label: "Theme",         value: boothTheme === "Custom theme" ? (customTheme || "Custom") : boothTheme },
{ label: "Print Size",    value: printSize },
{ label: "Print Copies",  value: printCopies },
{ label: "Layout",        value: layoutMode === "upload" ? "File Upload" : "Request Design" },
{ label: "Location",      value: locationType },
...(activeAddOns.length ? [{ label: "Add-ons", value: activeAddOns.join(", ") }] : []),
]

return (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

    {/* ── LEFT ─────────────────────────────────────── */}
    <div className="xl:col-span-2 flex flex-col gap-6">

    {/* Event Details */}
    <SectionCard title="Event Details" icon="📅">
        <div className="flex flex-col gap-5">

        <Field label="Event Type" required>
            <select value={eventType} onChange={(e) => setEventType(e.target.value)} className={selectCls}>
            {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
            {eventType === "Others" && (
            <div className="mt-2">
                <input type="text" value={otherEvent} onChange={(e) => setOtherEvent(e.target.value)}
                placeholder="e.g. Anniversary, Reunion, Launch Party..."
                className={inputCls + (errors.otherEvent ? " border-red-400 ring-1 ring-red-300" : "")} />
                {errors.otherEvent && <p className="text-[11px] text-red-500 mt-1">{errors.otherEvent}</p>}
            </div>
            )}
        </Field>

        <Field label="Event Date" required>
            <input type="date" value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className={inputCls + (errors.eventDate ? " border-red-400 ring-1 ring-red-300" : "")} />
            {errors.eventDate && <p className="text-[11px] text-red-500 mt-1">{errors.eventDate}</p>}
        </Field>

        <Field label="Event Duration" required>
            <div className="grid grid-cols-4 gap-2">
            {DURATION_OPTS.map((d) => (
                <button key={d} type="button" onClick={() => setDuration(d)}
                className={`py-2.5 px-3 rounded-xl border-2 text-sm font-bold text-center transition-all ${
                    duration === d
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-200 bg-white text-gray-500 hover:border-red-300"
                }`}>
                {d === "Custom" ? "Custom" : `${d} hrs`}
                </button>
            ))}
            </div>
            {duration === "Custom" && (
            <div className="mt-2">
                <input type="number" min={2} value={customDuration}
                onChange={(e) => setCustomDuration(e.target.value)}
                placeholder="Min. 2 hours"
                className={inputCls + (errors.customDuration ? " border-red-400 ring-1 ring-red-300" : "")} />
                {errors.customDuration && <p className="text-[11px] text-red-500 mt-1">{errors.customDuration}</p>}
            </div>
            )}
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-4 py-2 text-xs text-blue-700 mt-1">
            <span>💡</span>
            <span>Base rate: ₱5,000 for 2 hours · Additional hours at ₱1,500/hr</span>
            </div>
        </Field>

        <Field label="Estimated Guests" required>
            <input type="number" min={1} value={estimatedGuests}
            onChange={(e) => setEstimatedGuests(Math.max(1, parseInt(e.target.value) || 1))}
            className={inputCls + (errors.guests ? " border-red-400 ring-1 ring-red-300" : "")} />
            {errors.guests && <p className="text-[11px] text-red-500 mt-1">{errors.guests}</p>}
            {estimatedGuests >= 200 && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-4 py-2 text-xs text-green-700 mt-1">
                <span>🎉</span>
                <span className="font-semibold">Large event! Consider adding an extra operator for smooth flow.</span>
            </div>
            )}
        </Field>

        </div>
    </SectionCard>

    {/* Booth Setup */}
    <SectionCard title="Booth Setup Options" icon="🎪">
        <div className="flex flex-col gap-5">

        <Field label="Booth Type" required>
            <div className="flex flex-col gap-2">
            {BOOTH_TYPES.map(({ val, icon, desc, badge }) => (
                <OptionCard key={val} active={boothType === val} onClick={() => setBoothType(val)}
                icon={icon} label={val} sublabel={desc} badge={badge} />
            ))}
            </div>
        </Field>

        <Field label="Backdrop Style" required>
            <div className="flex flex-col gap-2">
            {BACKDROP_STYLES.map(({ val, icon, desc, badge }) => (
                <OptionCard key={val} active={backdropStyle === val} onClick={() => setBackdropStyle(val)}
                icon={icon} label={val} sublabel={desc} badge={badge} />
            ))}
            </div>
            {backdropStyle === "Custom Backdrop" && (
            <div className="mt-2">
                <div
                onClick={() => backdropRef.current.click()}
                className="flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-6 cursor-pointer transition group border-gray-200 hover:border-red-300 hover:bg-red-50"
                >
                <span className="text-3xl group-hover:scale-110 transition-transform">{backdropFile ? "✅" : "🖼️"}</span>
                {backdropFile ? (
                    <p className="text-xs text-center text-green-700 font-semibold break-all">{backdropFile.name}</p>
                ) : (
                    <>
                    <p className="text-sm font-semibold text-gray-500">Upload backdrop reference image</p>
                    <p className="text-xs text-gray-400">PNG, JPG, PDF accepted</p>
                    </>
                )}
                <input ref={backdropRef} type="file" accept="image/*,.pdf"
                    className="hidden" onChange={(e) => setBackdropFile(e.target.files[0] || null)} />
                </div>
            </div>
            )}
        </Field>

        <Field label="Booth Theme" required>
            <div className="grid grid-cols-2 gap-2">
            {BOOTH_THEMES.map((t) => (
                <button key={t} type="button" onClick={() => setBoothTheme(t)}
                className={`py-2.5 px-3 rounded-xl border-2 text-sm font-bold text-center transition-all ${
                    boothTheme === t
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-200 bg-white text-gray-500 hover:border-red-300"
                }`}>
                {t}
                </button>
            ))}
            </div>
            {boothTheme === "Custom theme" && (
            <div className="mt-2">
                <input type="text" value={customTheme} onChange={(e) => setCustomTheme(e.target.value)}
                placeholder="e.g. Rustic Boho, Pastel Garden, Neon City..."
                className={inputCls} />
            </div>
            )}
        </Field>

        </div>
    </SectionCard>

    {/* Photo Print Options */}
    <SectionCard title="Photo Print Options" icon="🖨️">
        <div className="flex flex-col gap-5">

        <Field label="Print Size" required>
            <div className="grid grid-cols-3 gap-2">
            {PRINT_SIZES.map((s) => (
                <button key={s} type="button" onClick={() => setPrintSize(s)}
                className={`py-2.5 px-3 rounded-xl border-2 text-sm font-bold text-center transition-all ${
                    printSize === s
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-200 bg-white text-gray-500 hover:border-red-300"
                }`}>
                {s}
                </button>
            ))}
            </div>
        </Field>

        <Field label="Print Copies per Shot" required>
            <div className="flex flex-col gap-2">
            {PRINT_COPIES.map(({ val, icon, desc, badge }) => (
                <OptionCard key={val} active={printCopies === val} onClick={() => setPrintCopies(val)}
                icon={icon} label={val} sublabel={desc} badge={badge} />
            ))}
            </div>
        </Field>

        <Field label="Layout Design">
            <div className="flex gap-3 mb-3">
            <ToggleBtn active={layoutMode === "upload"} onClick={() => setLayoutMode("upload")}>
                📁 Upload Layout
            </ToggleBtn>
            <ToggleBtn active={layoutMode === "request"} onClick={() => setLayoutMode("request")}>
                🎨 Request Design
            </ToggleBtn>
            </div>

            {layoutMode === "upload" && (
            <div className="flex flex-col gap-2">
                <div
                onClick={() => layoutRef.current.click()}
                className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-8 cursor-pointer transition group ${
                    errors.layout ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-red-300 hover:bg-red-50"
                }`}
                >
                <span className="text-4xl group-hover:scale-110 transition-transform">{layoutFile ? "✅" : "🖼️"}</span>
                {layoutFile ? (
                    <p className="text-xs text-center text-green-700 font-semibold break-all">{layoutFile.name}</p>
                ) : (
                    <>
                    <p className="text-sm font-semibold text-gray-500">Click to upload your layout file</p>
                    <p className="text-xs text-gray-400">PNG, JPG, PDF accepted · 300 DPI recommended</p>
                    </>
                )}
                <input ref={layoutRef} type="file" accept="image/*,.pdf"
                    className="hidden" onChange={(e) => setLayoutFile(e.target.files[0] || null)} />
                </div>
                {errors.layout && <p className="text-[11px] text-red-500">{errors.layout}</p>}
                <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-700 mt-1">
                <span>⚠️</span>
                <p>Use the correct print size dimensions. Transparent PNG or high-res PDF gives the best results.</p>
                </div>
            </div>
            )}

            {layoutMode === "request" && (
            <div className="flex flex-col gap-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Design Request Details</p>
                <Field label="Event Name" required>
                <input type="text" value={layoutEventName} onChange={(e) => setLayoutEventName(e.target.value)}
                    placeholder="e.g. Sarah & Miguel's Wedding, Batch 2025 Reunion"
                    className={inputCls + (errors.layoutEventName ? " border-red-400 ring-1 ring-red-300" : "")} />
                {errors.layoutEventName && <p className="text-[11px] text-red-500 mt-1">{errors.layoutEventName}</p>}
                </Field>
                <Field label="Date on Layout">
                <input type="text" value={layoutDate} onChange={(e) => setLayoutDate(e.target.value)}
                    placeholder="e.g. April 20, 2025"
                    className={inputCls} />
                </Field>
                <Field label="Theme Colors" hint="Describe or list hex codes">
                <input type="text" value={layoutThemeColors} onChange={(e) => setLayoutThemeColors(e.target.value)}
                    placeholder="e.g. Dusty rose, gold, ivory / #f4a7b9, #c9a227"
                    className={inputCls} />
                </Field>
                <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-700">
                <span>⚠️</span>
                <p>Our design team will send you a preview within <strong>48 hours</strong> for approval before your event.</p>
                </div>
            </div>
            )}
        </Field>

        </div>
    </SectionCard>

    {/* Personalization & Media */}
    <SectionCard title="Personalization & Media" icon="📱">
        <div className="flex flex-col gap-3">
        <YesNoToggle
            icon="🎭"
            label="On-Site Customization"
            sublabel="Operator adjusts props, layout, and print settings live at the venue"
            value={onSiteCustom}
            onChange={setOnSiteCustom}
        />
        <YesNoToggle
            icon="💾"
            label="Digital Copies Included"
            sublabel="All photos sent digitally via USB or file transfer after the event"
            value={digitalCopies}
            onChange={setDigitalCopies}
        />
        <YesNoToggle
            icon="🌐"
            label="Online Gallery Access"
            sublabel="Guests can view and download photos via a private gallery link"
            value={onlineGallery}
            onChange={setOnlineGallery}
        />
        <YesNoToggle
            icon="📲"
            label="QR Code Download Station"
            sublabel="Physical QR display lets guests scan and save their photos instantly"
            value={qrStation}
            onChange={setQrStation}
        />
        </div>
    </SectionCard>

    {/* Add-ons */}
    <SectionCard title="Add-ons & Upgrades" icon="⭐">
        <div className="flex flex-col gap-3">
        <AddOnToggle
            label="Props & Accessories"
            sublabel="Hats, glasses, signs, boas — curated prop box per event theme"
            icon="🎭" priceLabel="+₱500"
            checked={props} onChange={() => setProps(!props)}
        />
        <AddOnToggle
            label="Red Carpet Setup"
            sublabel="Velvet rope and red carpet roll-out at the booth entrance"
            icon="🟥" priceLabel="+₱700"
            checked={redCarpet} onChange={() => setRedCarpet(!redCarpet)}
        />
        <AddOnToggle
            label="LED Lighting Upgrade"
            sublabel="RGB ring lights and color-changing ambient booth LEDs"
            icon="💡" priceLabel="+₱800"
            checked={ledLighting} onChange={() => setLedLighting(!ledLighting)}
        />
        <AddOnToggle
            label="Custom Photo Frame Overlay"
            sublabel="Branded or personalized digital frame on every photo"
            icon="🖼️" priceLabel="Included"
            checked={customFrame} onChange={() => setCustomFrame(!customFrame)}
        />
        <AddOnToggle
            label="Additional Operator / Staff"
            sublabel="Extra trained staff for large events or dual-booth setups"
            icon="👤" priceLabel="+₱1,000"
            checked={additionalStaff} onChange={() => setAdditionalStaff(!additionalStaff)}
        />
        </div>
    </SectionCard>

    {/* Location & Setup */}
    <SectionCard title="Location & Setup" icon="📍">
        <div className="flex flex-col gap-5">

        <Field label="Event Location Type" required>
            <div className="flex gap-3">
            <ToggleBtn active={locationType === "Indoor"} onClick={() => setLocationType("Indoor")}>
                🏛️ Indoor
            </ToggleBtn>
            <ToggleBtn active={locationType === "Outdoor"} onClick={() => setLocationType("Outdoor")}>
                🌳 Outdoor
            </ToggleBtn>
            </div>
            {locationType === "Outdoor" && (
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-700 mt-2">
                <span>⚠️</span>
                <p>For outdoor events, please ensure a <strong>covered or shaded area</strong> is available. Confirm power source access with our team.</p>
            </div>
            )}
        </Field>

        <Field label="Full Event Address" hint="Include venue name, barangay, city, and province" required>
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={3}
            placeholder="e.g. Grand Ballroom, Shangri-La Hotel, Ortigas, Pasig City, Metro Manila"
            className={inputCls + " resize-none" + (errors.address ? " border-red-400 ring-1 ring-red-300" : "")} />
            {errors.address && <p className="text-[11px] text-red-500 mt-1">{errors.address}</p>}
        </Field>

        <Field label="Setup Time Before Event" hint="How many hours early should we arrive?">
            <div className="flex items-center gap-3">
            <input type="number" min={0.5} step={0.5} value={setupTime}
                onChange={(e) => setSetupTime(e.target.value)}
                className={inputCls + " max-w-28"} />
            <span className="text-sm text-gray-500">
                hour{parseFloat(setupTime) !== 1 ? "s" : ""} before event
            </span>
            </div>
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700 mt-2">
            <span>💡</span>
            <p>We recommend at least <strong>1–2 hours</strong> for full setup, testing, and backdrop alignment.</p>
            </div>
        </Field>

        </div>
    </SectionCard>

    </div>

    {/* ── RIGHT: Sidebar ─────────────────────────────── */}
    <div className="xl:col-span-1">
    <div className="sticky top-35 flex flex-col gap-4">

        {/* Live Preview */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-linear-to-r from-gray-50 to-white">
            <span className="text-xl">🎪</span>
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-600">Live Preview</h2>
        </div>
        <div className="px-6 py-6 flex justify-center bg-gray-50 min-h-52 items-center">
            <BoothPreview
            boothType={boothType}
            backdropStyle={backdropStyle}
            boothTheme={boothTheme === "Custom theme" ? "Custom theme" : boothTheme}
            duration={effectiveDuration}
            />
        </div>
        </div>

        {/* Booking Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-linear-to-r from-red-500 to-red-600">
            <h2 className="text-xs font-black uppercase tracking-widest text-white/90">Booking Summary</h2>
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

        {/* Price Breakdown */}
        <div className="px-6 py-4 flex flex-col gap-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Price Breakdown</p>
            <div className="flex justify-between text-sm">
            <span className="text-gray-400">Base package (2 hrs)</span>
            <span className="font-semibold text-gray-700">₱5,000</span>
            </div>
            {extraHrsCost > 0 && (
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">Extra {effectiveDuration - 2} hr{effectiveDuration - 2 !== 1 ? "s" : ""} × ₱1,500</span>
                <span className="font-semibold text-gray-700">+₱{extraHrsCost.toLocaleString()}</span>
            </div>
            )}
            {boothType === "360 Video Booth" && (
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">360° Booth upgrade</span>
                <span className="font-semibold text-gray-700">+₱3,000</span>
            </div>
            )}
            {printCopies === "Unlimited Prints" && (
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">Unlimited Prints</span>
                <span className="font-semibold text-gray-700">+₱1,000</span>
            </div>
            )}
            {backdropStyle === "Custom Backdrop" && (
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">Custom Backdrop</span>
                <span className="font-semibold text-gray-700">+₱1,500</span>
            </div>
            )}
            {props && (
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">Props & Accessories</span>
                <span className="font-semibold text-gray-700">+₱500</span>
            </div>
            )}
            {redCarpet && (
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">Red Carpet</span>
                <span className="font-semibold text-gray-700">+₱700</span>
            </div>
            )}
            {ledLighting && (
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">LED Lighting</span>
                <span className="font-semibold text-gray-700">+₱800</span>
            </div>
            )}
            {additionalStaff && (
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">Additional Staff</span>
                <span className="font-semibold text-gray-700">+₱1,000</span>
            </div>
            )}

            <div className="mt-2 flex items-center justify-between py-3 px-4 bg-red-50 rounded-xl border border-red-100">
            <span className="text-sm font-black text-gray-700 uppercase tracking-wide">Total</span>
            <span className="text-2xl font-black text-red-600">₱{total.toLocaleString()}</span>
            </div>
        </div>

        <div className="px-6 pb-6 flex flex-col gap-3">
            <button type="button" onClick={handleSubmit}
            className="w-full py-4 bg-red-500 hover:bg-red-600 active:scale-[.98] text-white text-sm font-black uppercase tracking-widest rounded-xl shadow-lg shadow-red-200 transition-all">
            Book Now →
            </button>
            <p className="text-[11px] text-gray-400 text-center">
            We'll confirm your booking and send a payment link within 24 hours.
            </p>
        </div>
        </div>

        {/* Help Card */}
        <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-5">
        <p className="text-xs font-black uppercase tracking-widest text-yellow-700 mb-2">Need Help?</p>
        <p className="text-xs text-yellow-700 leading-relaxed">
            Not sure which booth type suits your event? Message us on Facebook or email{" "}
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